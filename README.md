# The Ski Awards

Marketing site for **The Ski Awards** — the 2026 ski & snowboard resort rankings.
Live at [www.theskiawards.com](https://www.theskiawards.com/).

## Stack

- [Vite](https://vite.dev/) + [React 19](https://react.dev/) + TypeScript
- [React Router](https://reactrouter.com/) for client-side routing
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Motion](https://motion.dev/) for page/scroll animations
- [lucide-react](https://lucide.dev/) icons

## Run locally

**Prerequisites:** Node.js ≥ 20.19

```bash
npm install
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

## Scripts

| Script          | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server (port 3000).    |
| `npm run build` | Type-check + production build.       |
| `npm run preview` | Serve the production build.        |
| `npm run lint`  | TypeScript type check (`tsc --noEmit`). |
| `npm run clean` | Remove the `dist/` output.           |

## Structure

```
public/               Static assets served at site root (sitemap, robots, favicon)
src/
├── App.tsx           Router
├── main.tsx          Entry point
├── index.css         Tailwind + global styles
├── constants.ts      Resort + awards data
├── types.ts          Shared TS types
├── hooks/useSEO.ts   Per-route <head> updater (title, meta, OG, JSON-LD)
├── components/       Reusable sections (Hero, RankingsTable, Footer, …)
└── pages/            Route-level components
```

## SEO

- Per-route titles, descriptions, canonical URLs, Open Graph and Twitter cards are set via `useSEO` ([`src/hooks/useSEO.ts`](src/hooks/useSEO.ts)).
- Resort detail pages emit `SkiResort` + `BreadcrumbList` JSON-LD.
- [`public/sitemap.xml`](public/sitemap.xml) lists every indexable URL.
- [`public/robots.txt`](public/robots.txt) points crawlers at the sitemap.
