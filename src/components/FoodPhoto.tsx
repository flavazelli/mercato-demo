import breadcounter from '../assets/images/breadcounter.png';
import coffees from '../assets/images/coffees.png';
import cheeses from '../assets/images/cheeses.png';
import deli from '../assets/images/deli.png';
import preparedfoods from '../assets/images/preparedfoods.png';

type Props = { type: string; id?: string; alt?: string };

const photos: Record<string, string> = {
  sandwich: deli,
  deli,
  prepared: preparedfoods,
  pastry: breadcounter,
  coffee: coffees,
  market: cheeses,
};

export function FoodPhoto({ type, alt = '' }: Props) {
  const src = photos[type];
  if (!src) return null;
  return <img className="food-photo" src={src} alt={alt} loading="lazy" />;
}
