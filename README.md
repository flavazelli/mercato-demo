# Mercato Montagna Concept

A bilingual static website prototype for Mercato Montagna, built with React, TypeScript and Vite. Menu prices and products used in ordering are illustrative; forms and checkout are frontend demonstrations only.

## Requirements

Node.js 20+ and npm.

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

## Static build

```bash
npm run generate
```

`generate` first builds the browser assets with Vite, then bundles the app for server rendering. A small TypeScript script renders each English and French route to HTML, inserts the rendered content and page metadata into the built template, and writes route `index.html` files under `dist`. The temporary server bundle is removed afterward. The result hydrates in the browser and needs no Node.js server at runtime.

## Preview

```bash
npm run preview
```

## Project structure

- `src/pages` contains the homepage and route pages.
- `src/components` contains shared layout and SEO metadata.
- `src/data` contains business details and menu items.
- `src/i18n` contains English and French copy.
- `src/styles` contains global tokens, responsive rules and page styling.
- `scripts/generate.ts` prerenders the supported routes.
- `public` contains static assets, robots.txt and sitemap.xml.

## Replacing images

Replace `src/assets/images/market.svg` with approved Mercato photography and update the imports in `src/pages/HomePage.tsx`. Food illustration styles are in `src/styles/site.css`. Files in `public/images` can be referenced with root-relative paths. The prototype does not hotlink image hosts.

## Updating menu items

Edit `src/data/menu.ts`. Menu names, descriptions, categories, sample prices and image style keys are centralized there. Replace the sample prices and confirm availability with the business before using ordering commercially.

## Updating business details

Edit `src/data/business.ts`. Address, phone, email and listed business hours are shared across pages and structured data.

## Adding/changing translations

Update matching keys in `src/i18n/en.ts` and `src/i18n/fr.ts`. French routes are under `/fr`; the French story route is `/fr/notre-histoire`.

## Deployment

The contents of `dist/` can be deployed to Firebase Hosting, Netlify, Vercel static hosting, Cloudflare Pages, GitHub Pages or another static host. Configure the host to serve the generated route directories as-is.
