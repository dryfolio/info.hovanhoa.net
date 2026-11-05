import { createGlobalStyle } from "styled-components";

// Same editorial tokens as the rest of the hovanhoa.net family. Dark mode
// follows the shared `theme` cookie (see the boot script in _document.js).
const GlobalStyle = createGlobalStyle`
:root {
  --bg: #f7f7f5;
  --surface: #ffffff;
  --surface-2: #f3f3f0;
  --border: #e4e4e0;
  --border-2: #d4d4cf;
  --text: #0c0c0c;
  --text-2: #5c5b56;
  --text-3: #8a8983;
  --accent: #d8602f;
  --accent-ink: #b54a1f;
  --font-sans: 'Geist', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'Geist Mono', ui-monospace, monospace;
  --font-display: 'Libertinus Serif', 'Noto Serif', Georgia, serif;
  color-scheme: light;
}

html.dark {
  --bg: #0a0a0a;
  --surface: #141414;
  --surface-2: #1a1a1a;
  --border: #222222;
  --border-2: #2e2e2e;
  --text: #f5f5f4;
  --text-2: #a1a1aa;
  --text-3: #71717a;
  --accent: #f0743f;
  --accent-ink: #f59568;
  color-scheme: dark;
}

* {
  margin: 0;
  padding: 0;
  border: 0;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
  transition: color .15s ease, background-color .15s ease, border-color .15s ease, transform .2s ease;
}

html, body {
  background: var(--bg);
  overflow: hidden;
}

body {
  font-family: var(--font-sans);
  color: var(--text);
  line-height: 1.5;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
}

@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
  }
}
`;

export default GlobalStyle;
