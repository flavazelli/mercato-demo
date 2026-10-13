import type { Copy } from '../i18n/en';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { cateringCategories, cateringItems } from '../data/cateringMenu';
import { SEO } from '../components/SEO';
import { FoodPhoto } from '../components/FoodPhoto';

const categoryLabels: Record<'en' | 'fr', string[]> = {
  en: ['All', 'Staff Lunch', 'Pizza', 'Sandwich Platters', 'Deli & Cheese', 'Trays & Pasta', 'Salads & Sides', 'Desserts & Coffee'],
  fr: ['Tout', 'Repas du personnel', 'Pizza', 'Plateaux de sandwichs', 'Charcuterie et fromages', 'Plateaux et pâtes', 'Salades et accompagnements', 'Desserts et café'],
};

export function MenuPage({ lang, t }: { lang: 'en' | 'fr'; t: Copy }) {
  const [searchParams] = useSearchParams();
  const requested = searchParams.get('category');
  const [active, setActive] = useState(() => cateringCategories.includes(requested as (typeof cateringCategories)[number]) ? requested! : 'All');
  const pre = lang === 'fr' ? '/fr' : '';
  const items = cateringItems.filter(item => active === 'All' || item.category === active);
  return <><SEO lang={lang} path={`${pre}/menu`} title="Mercato Montagna Catering Menu" description="Browse Mercato Montagna catering packages, serving sizes and prices."/><PageIntro title={t.menu.title} text={t.menu.intro}/><div className="container menu-page">
    <div className="category-nav" aria-label={lang === 'fr' ? 'Catégories du menu traiteur' : 'Catering menu categories'}>
      {['All', ...cateringCategories].map((category, i) => <button key={category} className={active === category ? 'selected' : ''} onClick={() => setActive(category)}>{categoryLabels[lang][i]}</button>)}
    </div>
    <div className="menu-list">{items.map(item => <article className="menu-row" key={item.id}>
      <FoodArt type={item.image} id={item.id} alt={lang === 'fr' ? item.frName : item.name}/>
      <div className="menu-copy"><h3>{lang === 'fr' ? item.frName : item.name}</h3><p>{lang === 'fr' ? item.frDetails : item.details}</p></div>
    </article>)}</div>
    <div className="menu-bottom"><p>{t.menu.note}</p><Link to={`${pre}/order`} className="button">{t.menu.order} ↗</Link></div>
  </div></>;
}

export function PageIntro({ title, text }: { title: string; text: string }) { return <section className="page-intro"><div className="container"><h1 className="serif">{title}</h1><p>{text}</p></div></section>; }
export function FoodArt({ type, id, alt = '' }: { type: string; id?: string; alt?: string }) { return <div className={`food-art art-${type}`}><FoodPhoto type={type} id={id} alt={alt}/></div>; }
