export type MenuCategory = 'Sandwiches' | 'Pizza' | 'Prepared Foods' | 'Pastries' | 'Drinks' | 'Mercato';
export type MenuItem = { id: string; name: string; frName: string; description: string; frDescription: string; price: number; category: MenuCategory; featured?: boolean; image: string };
export const categories: MenuCategory[] = ['Sandwiches','Pizza','Prepared Foods','Pastries','Drinks','Mercato'];
export const menuItems: MenuItem[] = [
 {id:'porchetta',name:'Porchetta Primo',frName:'Porchetta Primo',description:'Porchetta, caciocavallo, arugula, sun-dried tomato and black garlic mayo on ciabatta.',frDescription:'Porchetta, caciocavallo, roquette, tomates séchées et mayo à l’ail noir sur ciabatta.',price:16.5,category:'Sandwiches',featured:true,image:'sandwich'},
 {id:'straccia',name:'Straccia Bella',frName:'Straccia Bella',description:'Mortadella, stracciatella, arugula, lemon and cracked pepper on ciabatta.',frDescription:'Mortadelle, stracciatella, roquette, citron et poivre concassé sur ciabatta.',price:16,category:'Sandwiches',featured:true,image:'sandwich'},
 {id:'polllo-rosso',name:'Pollo Rosso',frName:'Pollo Rosso',description:'Breaded chicken, tomato sauce, whipped ricotta and mild chili on Nonna bread.',frDescription:'Poulet pané, sauce tomate, ricotta fouettée et piment doux sur pain Nonna.',price:15.5,category:'Sandwiches',image:'sandwich'},
 {id:'soppressata',name:'Soppresata',frName:'Soppressata',description:'Spicy soppressata, whipped ricotta, bomba, hot honey and arugula on French bread.',frDescription:'Soppressata piquante, ricotta fouettée, bomba, miel épicé et roquette sur pain français.',price:15,category:'Sandwiches',image:'sandwich'},
 {id:'margherita',name:'Margherita Pizza',frName:'Pizza Margherita',description:'Tomato, mozzarella and basil.',frDescription:'Tomates, mozzarella et basilic.',price:18,category:'Pizza',featured:true,image:'pizza'},
 {id:'seasonal-pizza',name:'Pizza of the Day',frName:'Pizza du jour',description:'Ask the store about today’s selection.',frDescription:'Informez-vous sur la sélection du jour.',price:19,category:'Pizza',image:'pizza'},
 {id:'lasagna',name:'Lasagna',frName:'Lasagne',description:'Pasta layers with tomato sauce and cheese.',frDescription:'Pâtes, sauce tomate et fromage.',price:17,category:'Prepared Foods',featured:true,image:'prepared'},
 {id:'arancini',name:'Arancini',frName:'Arancini',description:'Fried risotto balls.',frDescription:'Bouchées de risotto frites.',price:9,category:'Prepared Foods',image:'prepared'},
 {id:'cannoli',name:'Sicilian Cannoli',frName:'Cannoli sicilien',description:'Crisp pastry shells filled with sweetened ricotta.',frDescription:'Coquilles croustillantes garnies de ricotta sucrée.',price:5.5,category:'Pastries',featured:true,image:'pastry'},
 {id:'sfogliatella',name:'Sfogliatella',frName:'Sfogliatella',description:'Flaky pastry with a sweet filling.',frDescription:'Pâtisserie feuilletée avec une garniture sucrée.',price:5,category:'Pastries',image:'pastry'},
 {id:'espresso',name:'Espresso',frName:'Espresso',description:'Italian espresso.',frDescription:'Espresso italien.',price:3.5,category:'Drinks',image:'coffee'},
 {id:'cappuccino',name:'Cappuccino',frName:'Cappuccino',description:'Espresso with steamed milk.',frDescription:'Espresso avec du lait moussé.',price:5,category:'Drinks',image:'coffee'},
];
