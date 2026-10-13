import '@fontsource/cormorant-garamond/500.css';
import React from 'react';import{hydrateRoot}from'react-dom/client';import{BrowserRouter}from'react-router-dom';import{App}from'./App';import'./styles/global.css';import'./styles/responsive.css';import'./styles/site.css';
hydrateRoot(document.getElementById('root')!,<React.StrictMode><BrowserRouter basename={import.meta.env.BASE_URL}><App/></BrowserRouter></React.StrictMode>);
