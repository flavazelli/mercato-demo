import breadcounter from '../assets/images/breadcounter.png';
import coffees from '../assets/images/coffees.png';
import cheeses from '../assets/images/cheeses.png';
import deli from '../assets/images/deli.png';
import preparedfoods from '../assets/images/preparedfoods.png';
import pastas from '../assets/images/pastas.png';
import marketGraphic from '../assets/images/market.svg';

type Props = { type: string; id?: string; alt?: string; generic?: boolean };

const photos: Record<string, string> = {
  sandwich: deli,
  pizza: preparedfoods,
  deli,
  prepared: preparedfoods,
  pasta: pastas,
  pastry: breadcounter,
  coffee: coffees,
  market: cheeses,
};

export function FoodPhoto({ type, alt = '', generic = false }: Props) {
  const src = generic ? marketGraphic : photos[type];
  if (!src) return null;
  return <img className="food-photo" src={src} alt={alt} loading="lazy" />;
}
