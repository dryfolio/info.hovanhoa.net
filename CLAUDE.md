# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm start        # Start production server
```

No test runner is configured. Linting uses ESLint with `next/core-web-vitals` (`eslint` runs automatically during `next build`).

## Architecture

**Next.js 14 personal bio-links site** (based on the "Nxt Lnk" template). No tests. TypeScript is configured but `strict` is off — most files are `.js`.

### Content is data-driven

All customizable content lives in two files:
- `data/BioData.js` — profile info (name, avatar, description, social handles, NFT avatar toggle)
- `data/LinksData.js` — link objects with `{ title, url, type, icon, on }` fields; `type` is one of `social | checkout | nft | other`; `on: false` hides a link without deleting it

`components/WebLinks.js` consumes these and filters by type to render sections.

### Styling

Styled-components v5 with SWC compiler plugin. Theme variables (colors, breakpoints, font sizes) live in `styles/theme.config.js` for light/dark modes. Global CSS variables are set in `styles/GlobalStyle.js`. SSR is handled via `ServerStyleSheet` in `pages/_document.js`.

Dark mode uses `use-dark-mode` with system preference detection. Toggle between hex (NFT) and oval avatar via `bioData[0].nftAvatar` boolean — this switches between SVG clip-paths defined in `components/icons/index.js`.

### URL rewrites

`/links`, `/lnk`, and `/l` all rewrite to `/` (configured in `next.config.js`).

### SEO

- `next-seo.config.js` — site-wide OG/Twitter metadata
- `pages/sitemap.ts` and `pages/robots.ts` — generated at request time
- `pages/llms.txt.ts` — LLM metadata endpoint
- `components/Seo.js` — per-page SEO wrapper
