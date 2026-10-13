import { useEffect } from 'react';

export function SEO({ title, description, path, lang }: { title: string; description: string; path: string; lang: 'en' | 'fr' }) {
  const localized: Record<string, [string, string]> = {
    '/fr/': ['Mercato Montagna | Épicerie fine et café italien à Dollard-des-Ormeaux', 'Sandwichs italiens, pâtisseries fraîches et plats préparés au Mercato Montagna à Dollard-des-Ormeaux.'],
    '/fr/menu': ['Menu du Mercato | Mercato Montagna', 'Découvrez les sandwichs italiens, pizzas, plats préparés, pâtisseries et cafés du Mercato Montagna.'],
    '/fr/order': ['Commande à emporter | Mercato Montagna', 'Parcourez les favoris du Mercato et préparez une commande à emporter à Dollard-des-Ormeaux.'],
    '/fr/catering': ['Service traiteur | Mercato Montagna', 'Planifiez lunchs au bureau, repas en famille et célébrations avec le traiteur italien du Mercato Montagna.'],
    '/fr/notre-histoire': ['Notre histoire | Mercato Montagna', 'Découvrez Mercato Montagna, épicerie fine italienne, boulangerie et comptoir de plats préparés à Dollard-des-Ormeaux.'],
    '/fr/contact': ['Contact et heures | Mercato Montagna', 'Visitez Mercato Montagna au 4701 boulevard Saint-Jean à Dollard-des-Ormeaux. Consultez les heures, le téléphone et l’itinéraire.'],
  };
  const [localizedTitle, localizedDescription] = lang === 'fr' ? (localized[path] || [title, description]) : [title, description];
  useEffect(() => {
    document.title = localizedTitle;
    document.documentElement.lang = lang;
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.setAttribute('name', 'description');
      document.head.append(descriptionTag);
    }
    descriptionTag.setAttribute('content', localizedDescription);
  }, [localizedTitle, localizedDescription, lang]);
  return <><title>{localizedTitle}</title><meta name="description" content={localizedDescription}/><meta name="robots" content="noindex, nofollow, noarchive, nosnippet"/></>;
}
