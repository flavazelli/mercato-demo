import {useEffect} from 'react';
import { business } from '../data/business';
export function SEO({title,description,path,lang}:{title:string;description:string;path:string;lang:'en'|'fr'}) {
 const localized:Record<string,[string,string]>={
 '/fr/':['Mercato Montagna | Épicerie fine et café italien à Dollard-des-Ormeaux','Sandwichs italiens, pâtisseries fraîches et plats préparés au Mercato Montagna à Dollard-des-Ormeaux.'],
 '/fr/menu':['Menu du Mercato | Mercato Montagna','Découvrez les sandwichs italiens, pizzas, plats préparés, pâtisseries et cafés du Mercato Montagna.'],
 '/fr/order':['Commande à emporter | Mercato Montagna','Parcourez les favoris du Mercato et préparez une commande à emporter à Dollard-des-Ormeaux.'],
 '/fr/catering':['Service traiteur | Mercato Montagna','Planifiez lunchs au bureau, repas en famille et célébrations avec le traiteur italien du Mercato Montagna.'],
 '/fr/notre-histoire':['Notre histoire | Mercato Montagna','Découvrez Mercato Montagna, épicerie fine italienne, boulangerie et comptoir de plats préparés à Dollard-des-Ormeaux.'],
 '/fr/contact':['Contact et heures | Mercato Montagna','Visitez Mercato Montagna au 4701 boulevard Saint-Jean à Dollard-des-Ormeaux. Consultez les heures, le téléphone et l’itinéraire.']
 };
 const [localizedTitle,localizedDescription]=lang==='fr'?(localized[path]||[title,description]):[title,description];
 const url=`https://www.mercatomontagna.ca${path}`;
 const schema={'@context':'https://schema.org','@type':'Restaurant','name':business.name,'telephone':business.phone,'email':business.email,'address':{'@type':'PostalAddress','streetAddress':'4701 Boulevard Saint-Jean','addressLocality':'Dollard-des-Ormeaux','addressRegion':'QC','postalCode':'H9H 2A7','addressCountry':'CA'},'servesCuisine':'Italian','url':'https://www.mercatomontagna.ca'};
 useEffect(()=>{document.title=localizedTitle;document.documentElement.lang=lang;let descriptionTag=document.querySelector('meta[name="description"]');if(!descriptionTag){descriptionTag=document.createElement('meta');descriptionTag.setAttribute('name','description');document.head.append(descriptionTag)}descriptionTag.setAttribute('content',localizedDescription);let canonical=document.querySelector('link[rel="canonical"]');if(!canonical){canonical=document.createElement('link');canonical.setAttribute('rel','canonical');document.head.append(canonical)}canonical.setAttribute('href',url)},[localizedTitle,localizedDescription,url,lang]);
 return <><title>{localizedTitle}</title><meta name="description" content={localizedDescription}/><link rel="canonical" href={url}/><meta property="og:title" content={localizedTitle}/><meta property="og:description" content={localizedDescription}/><meta property="og:type" content="website"/><meta property="og:image" content="https://www.mercatomontagna.ca/images/mercato-preview.svg"/><meta property="og:url" content={url}/><meta property="og:locale" content={lang==='fr'?'fr_CA':'en_CA'}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></>;
}
