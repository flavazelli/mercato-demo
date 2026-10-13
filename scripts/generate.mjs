import {readFile,writeFile,mkdir,rm} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const {render}=await import(pathToFileURL(path.resolve('.ssr/entry-server.js')).href);
const routes=['/','/menu','/order','/catering','/our-story','/contact','/fr/','/fr/menu','/fr/order','/fr/catering','/fr/notre-histoire','/fr/contact'];
const template=await readFile('dist/index.html','utf8');
for(const route of routes){
 const html=render(route);
 const metadata=[...html.matchAll(/<title>[\s\S]*?<\/title>|<meta\b[^>]*\/?\s*>|<link rel="canonical"[^>]*\/?\s*>|<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g)].map(m=>m[0]).join('');
 const content=html.replace(/<title>[\s\S]*?<\/title>|<meta\b[^>]*\/?\s*>|<link rel="canonical"[^>]*\/?\s*>|<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g,'');
 const lang=route.startsWith('/fr')?'fr':'en';
 const cleanTemplate=template.replace(/<title>[\s\S]*?<\/title>/,'');
 const doc=cleanTemplate.replace('<html lang="en">',`<html lang="${lang}">`).replace('</head>',`${metadata}</head>`).replace('<!--app-html-->',content);
 const output=route==='/'||route==='/fr/'?path.join('dist',route==='/'?'index.html':'fr/index.html'):path.join('dist',route.slice(1),'index.html');
 await mkdir(path.dirname(output),{recursive:true});await writeFile(output,doc);
}
await rm('.ssr',{recursive:true,force:true});

