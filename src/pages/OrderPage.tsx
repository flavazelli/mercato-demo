import type { Copy } from '../i18n/en';
import { useEffect, useReducer, useState } from 'react';
import { cateringCategories, cateringItems, cateringPrices } from '../data/cateringMenu';
import { business } from '../data/business';
import { SEO } from '../components/SEO';
import { FoodArt, PageIntro } from './MenuPage';

type Cart = Record<string, number>;
type Action = { id?: string; delta?: number; hydrate?: Cart };
function reducer(cart: Cart, action: Action) {
  if (action.hydrate) return action.hydrate;
  const { id, delta = 0 } = action;
  if (!id) return cart;
  const n = (cart[id] || 0) + delta;
  const next = { ...cart };
  if (n <= 0) delete next[id]; else next[id] = n;
  return next;
}
function getPickupSlots(date: string, today: string) {
  if (!date) return [];
  const weekday = new Date(`${date}T12:00:00`).getDay();
  const hours = business.pickupHours.find(row => row.day === weekday);
  if (!hours) return [];
  const toMinutes = (value: string) => {
    const [hour, minute] = value.split(':').map(Number);
    return hour * 60 + minute;
  };
  let firstSlot = toMinutes(hours.open);
  if (date === today) {
    const now = new Date();
    firstSlot = Math.max(firstSlot, Math.ceil((now.getHours() * 60 + now.getMinutes()) / 15) * 15);
  }
  const closingTime = toMinutes(hours.close);
  const slots: string[] = [];
  for (let minute = firstSlot; minute < closingTime; minute += 15) {
    slots.push(`${String(Math.floor(minute / 60)).padStart(2, '0')}:${String(minute % 60).padStart(2, '0')}`);
  }
  return slots;
}

export function OrderPage({ lang, t }: { lang: 'en' | 'fr'; t: Copy }) {
  const [category, setCategory] = useState('All');
  const [cart, dispatch] = useReducer(reducer, {});
  const [checkout, setCheckout] = useState(false);
  const [cartReady, setCartReady] = useState(false);
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [priceOptionIds, setPriceOptionIds] = useState<Record<string, string>>(() => Object.fromEntries(cateringItems.map(item => [item.id, cateringPrices[item.id][0].id])));
  const [confirmed, setConfirmed] = useState(false);
  const pre = lang === 'fr' ? '/fr' : '';
  const now = new Date();
  const minDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const pickupSlots = getPickupSlots(pickupDate, minDate);
  const isClosedDay = Boolean(pickupDate && !business.pickupHours.some(row => row.day === new Date(`${pickupDate}T12:00:00`).getDay()));
  const labels = lang === 'fr'
    ? ['Tout', 'Repas du personnel', 'Pizza', 'Plateaux de sandwichs', 'Charcuterie et fromages', 'Plateaux et pâtes', 'Salades et accompagnements', 'Desserts et café']
    : ['All', ...cateringCategories];

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mercato-catering-cart');
      if (saved) {
        const parsed = JSON.parse(saved) as Cart;
        const valid = Object.fromEntries(Object.entries(parsed).filter(([id, qty]) => cateringItems.some(item => item.id === id) && Number.isFinite(qty) && qty > 0));
        dispatch({ hydrate: valid });
      }
    } catch { /* Browser storage may be unavailable. */ }
    finally { setCartReady(true); }
  }, []);
  useEffect(() => {
    if (!cartReady) return;
    try { localStorage.setItem('mercato-catering-cart', JSON.stringify(cart)); }
    catch { /* Browser storage may be unavailable. */ }
  }, [cart, cartReady]);

  const visible = cateringItems.filter(item => category === 'All' || item.category === category);
  const chosen = cateringItems.filter(item => cart[item.id]);
  const itemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const scheduleReady = Boolean(pickupDate && pickupDate >= minDate && pickupSlots.includes(pickupTime));
  const selectedPrice = (itemId: string) => cateringPrices[itemId].find(option => option.id === priceOptionIds[itemId]) ?? cateringPrices[itemId][0];
  const subtotal = chosen.reduce((sum, item) => sum + selectedPrice(item.id).price * cart[item.id], 0);
  const gst = Math.round((subtotal * 0.05 + Number.EPSILON) * 100) / 100;
  const qst = Math.round((subtotal * 0.09975 + Number.EPSILON) * 100) / 100;
  const total = subtotal + gst + qst;
  const currency = new Intl.NumberFormat(lang === 'fr' ? 'fr-CA' : 'en-CA', { style: 'currency', currency: 'CAD' });
  const addItem = (id: string) => dispatch({ id, delta: cart[id] ? 1 : (selectedPrice(id).minQuantity ?? 1) });
  const decreaseItem = (id: string) => {
    const min = selectedPrice(id).minQuantity ?? 1;
    dispatch({ id, delta: cart[id] <= min ? -cart[id] : -1 });
  };
  return <>
    <SEO lang={lang} path={`${pre}/order`} title="Order Catering | Mercato Montagna" description="Browse Mercato Montagna's published catering menu and build a pickup request." />
    <PageIntro title={t.order.title} text={t.order.intro} />
    <div className="container order-page">
      <div className="order-main">
        <div className="category-nav" aria-label={lang === 'fr' ? 'Catégories du menu traiteur' : 'Catering menu categories'}>
          {['All', ...cateringCategories].map((key, i) => <button key={key} className={category === key ? 'selected' : ''} onClick={() => setCategory(key)}>{labels[i]}</button>)}
        </div>
        <div className="order-products">
          {visible.map(item => <article className="order-product" key={item.id}>
            <FoodArt type={item.image} id={item.id} alt={lang === 'fr' ? item.frName : item.name} />
            <div className="order-product-copy">
              <h3>{lang === 'fr' ? item.frName : item.name}</h3>
              <p>{lang === 'fr' ? item.frDetails : item.details}</p>
              <div className="order-product-actions">
                {cateringPrices[item.id].length > 1 && <label className="price-option-label">{lang === 'fr' ? 'Format' : 'Size'}<select value={priceOptionIds[item.id]} onChange={e => setPriceOptionIds(current => ({ ...current, [item.id]: e.target.value }))}>{cateringPrices[item.id].map(option => <option key={option.id} value={option.id}>{lang === 'fr' ? option.frLabel : option.label} · {currency.format(option.price)}</option>)}</select></label>}
                <button className="add-button" onClick={() => addItem(item.id)}>{cart[item.id] ? `${t.order.added} · ${cart[item.id]}` : `+ ${t.order.add}`}</button>
              </div>
            </div>
          </article>)}
        </div>
      </div>
      <aside className="cart-panel">
        <div className="cart-head"><div><h2 className="serif">{t.order.cart}</h2></div><span className="cart-count">{itemCount}</span></div>
        {chosen.length === 0 ? <p className="cart-empty">{t.order.empty}</p> : <div className="cart-lines">{chosen.map(item => <div className="cart-line" key={item.id}>
          <div><b>{lang === 'fr' ? item.frName : item.name}</b><small>{lang === 'fr' ? item.frDetails : item.details}</small><small>{lang === 'fr' ? selectedPrice(item.id).frLabel : selectedPrice(item.id).label} · {currency.format(selectedPrice(item.id).price)} / {lang === 'fr' ? selectedPrice(item.id).frUnit : selectedPrice(item.id).unit}</small></div>
          <div className="quantity"><button aria-label={lang === 'fr' ? 'Diminuer la quantité' : 'Decrease quantity'} onClick={() => decreaseItem(item.id)}>−</button><span>{cart[item.id]}</span><button aria-label={lang === 'fr' ? 'Augmenter la quantité' : 'Increase quantity'} onClick={() => addItem(item.id)}>+</button></div>
        </div>)}</div>}
        <div className="pickup-schedule">
          <label>{t.order.pickupDate}<input type="date" required min={minDate} value={pickupDate} onChange={e => { setPickupDate(e.target.value); setPickupTime(''); }} /></label>
          <label>{t.order.pickupTime}<span className="pickup-time-control"><select required disabled={!pickupDate || isClosedDay || !pickupSlots.length} value={pickupTime} onChange={e => setPickupTime(e.target.value)}><option value="">{t.order.selectPickupTime}</option>{pickupSlots.map(slot => <option key={slot} value={slot}>{new Intl.DateTimeFormat(lang === 'fr' ? 'fr-CA' : 'en-CA', { hour: 'numeric', minute: '2-digit', hour12: lang === 'en' }).format(new Date(`2000-01-01T${slot}:00`))}</option>)}</select><span aria-hidden="true">⌄</span></span></label>
          {pickupDate && (isClosedDay || !pickupSlots.length) && <small className="pickup-time-note">{isClosedDay ? t.order.closedPickupDay : t.order.noPickupTimes}</small>}
        </div>
        <div className="cart-total"><span>{lang === 'fr' ? 'Articles sélectionnés' : 'Selected items'}</span><b>{itemCount}</b></div>
        <button className="button checkout-button" disabled={!chosen.length || !scheduleReady} onClick={() => { setConfirmed(false); setCheckout(true); }}>{t.order.checkout} ↗</button>
        <p className="cart-note">{t.common.cartNote}</p>
      </aside>
    </div>
    {checkout && <div className="modal-backdrop" role="presentation" onClick={() => setCheckout(false)}><section className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title" onClick={e => e.stopPropagation()}>
      <button className="modal-close" aria-label={t.order.close} onClick={() => setCheckout(false)}>×</button>
      <h2 id="checkout-title" className="serif">{confirmed ? t.order.confirmationTitle : t.order.checkoutTitle}</h2>
      {confirmed ? <><p>{t.order.confirmationBody}</p><button className="button" onClick={() => setCheckout(false)}>{t.order.close}</button></> : <>
        <p>{t.order.checkoutBody}</p>
        <div className="price-summary">{chosen.map(item => <div key={item.id}><span>{lang === 'fr' ? item.frName : item.name} × {cart[item.id]}</span><b>{currency.format(selectedPrice(item.id).price * cart[item.id])}</b></div>)}
          <div><span>{t.order.taxableSubtotal}</span><b>{currency.format(subtotal)}</b></div>
          <div><span>{t.order.gst}</span><b>{currency.format(gst)}</b></div>
          <div><span>{t.order.qst}</span><b>{currency.format(qst)}</b></div>
          <div className="price-grand-total"><span>{t.order.total}</span><b>{currency.format(total)}</b></div>
        </div>
        <p><b>{t.order.pickupDate}:</b> {new Intl.DateTimeFormat(lang === 'fr' ? 'fr-CA' : 'en-CA', { dateStyle: 'long' }).format(new Date(`${pickupDate}T00:00:00`))}<br /><b>{t.order.pickupTime}:</b> {new Intl.DateTimeFormat(lang === 'fr' ? 'fr-CA' : 'en-CA', { hour: 'numeric', minute: '2-digit', hour12: lang === 'en' }).format(new Date(`2000-01-01T${pickupTime}:00`))}</p>
        <div className="checkout-actions"><button className="button" onClick={() => setConfirmed(true)}>{t.order.confirmRequest}</button><button className="button outline" onClick={() => setCheckout(false)}>{t.order.close}</button></div>
      </>}
    </section></div>}
  </>;
}
