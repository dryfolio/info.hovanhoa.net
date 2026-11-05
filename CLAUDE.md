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

Styled-components v5 with SWC compiler plugin; SSR via `ServerStyleSheet` in `pages/_document.js`. The page uses the same editorial tokens as the rest of the hovanhoa.net family (`--bg`, `--surface`, `--text*`, `--accent*`, Geist + Libertinus Serif), defined in `styles/GlobalStyle.js` with a `html.dark` override.

Dark mode follows the family-wide `theme` cookie (set on `.hovanhoa.net`): a boot script in `_document.js` adds `html.dark` before first paint, and the toggle in `WebLinks.js` writes the cookie.

The page is a single screen with no scrolling: `WebLinks.js` sizes everything against the viewport height (`dvh`/`vh` clamps, plus `max-height` media queries that hide secondary text on short screens). Check new links at short heights (e.g. 375×667) before shipping. Family links take an optional `desc` and `tone` (icon colour) in `LinksData.js`; icons are painted with a CSS mask, so any single-colour SVG/PNG works.

### URL rewrites

`/links`, `/lnk`, and `/l` all rewrite to `/` (configured in `next.config.js`).

### SEO

- `next-seo.config.js` — site-wide OG/Twitter metadata
- `pages/sitemap.ts` and `pages/robots.ts` — generated at request time
- `pages/llms.txt.ts` — LLM metadata endpoint
- `components/Seo.js` — per-page SEO wrapper
