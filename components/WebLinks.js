// One-screen link page for the hovanhoa.net family. Content comes from
// data/BioData.js and data/LinksData.js; everything is sized against the
// viewport height so the page never needs to scroll.

import { useEffect, useState } from "react";
import styled from "styled-components";
import allLinks from "../data/LinksData";
import bioData from "../data/BioData";

const bio = bioData[0];
const social = allLinks.filter((l) => l.type === "social" && l.on);
const family = allLinks.filter((l) => l.type === "checkout" && l.on);

function hostOf(url) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const read = () => setDark(root.classList.contains("dark"));
    read();
    // follow theme changes made on another family site
    const obs = new MutationObserver(read);
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    const v = next ? "dark" : "light";
    try {
      // one cookie for every *.hovanhoa.net site (host-only on localhost)
      const family = /(^|\.)hovanhoa\.net$/.test(location.hostname);
      document.cookie = `theme=${v}; path=/; max-age=31536000; samesite=lax${family ? "; domain=.hovanhoa.net" : ""}`;
    } catch {}
  };

  return (
    <Toggle
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      aria-pressed={dark}
    >
      {dark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </Toggle>
  );
}

export default function Links() {
  return (
    <Page>
      <ThemeToggle />
      <Card>
        <Intro>
          <Avatar src={bio.avatar} alt={bio.name} width={112} height={112} />
          <div>
            <Name>Hồ Văn Hòa</Name>
            <Handle>
              <a href={bio.url}>@{bio.username}</a> · {bio.description}
            </Handle>
          </div>
          <Lead>
            Backend systems, microservices and AI agents. Everything I make
            lives somewhere below.
          </Lead>
          <Socials aria-label="Elsewhere">
            {social.map((s) => (
              <SocialLink
                key={s.title}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.title}
                title={s.title}
              >
                <Glyph style={{ "--icon": `url(${s.icon})` }} />
              </SocialLink>
            ))}
          </Socials>
        </Intro>

        <Family>
          <Label>The family</Label>
          <Grid>
            {family.map((f, i) => (
              <Tile
                key={f.title}
                href={f.url}
                $wide={i === 0}
                style={{ "--tone": f.tone || "var(--text-2)" }}
              >
                <Chip>
                  <Glyph style={{ "--icon": `url(${f.icon})` }} />
                </Chip>
                <TileText>
                  <TileName>{f.title}</TileName>
                  <TileDesc>{f.desc || hostOf(f.url)}</TileDesc>
                </TileText>
                <Arrow aria-hidden>↗</Arrow>
              </Tile>
            ))}
          </Grid>
        </Family>
      </Card>
      <Foot>
        <a href={bio.url}>hovanhoa.net</a> · © {new Date().getFullYear()}
      </Foot>
    </Page>
  );
}

// ---------- layout ----------

const Page = styled.div`
  position: relative;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(12px, 2.4vh, 28px);
  padding: clamp(16px, 4vh, 48px) clamp(16px, 5vw, 56px);
`;

const Card = styled.div`
  width: 100%;
  max-width: 1040px;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  align-items: center;
  gap: clamp(24px, 5vw, 72px);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: clamp(14px, 2.6vh, 28px);
    max-width: 520px;
  }
`;

// ---------- intro ----------

const Intro = styled.section`
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 2vh, 20px);

  @media (max-width: 860px) {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    column-gap: 14px;
    row-gap: clamp(8px, 1.6vh, 14px);
  }
`;

const Avatar = styled.img`
  width: clamp(72px, 12vh, 112px);
  height: clamp(72px, 12vh, 112px);
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--border);
  background: var(--surface);

  @media (max-width: 860px) {
    width: clamp(52px, 8vh, 72px);
    height: clamp(52px, 8vh, 72px);
  }
`;

const Name = styled.h1`
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(2.2rem, min(5.4vw, 7vh), 3.6rem);
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--text);

  @media (max-width: 860px) {
    font-size: clamp(1.7rem, min(8vw, 5vh), 2.3rem);
  }
`;

const Handle = styled.p`
  margin-top: 8px;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-3);

  a {
    color: var(--text-2);
  }
  a:hover {
    color: var(--accent-ink);
  }

  @media (max-width: 860px) {
    margin-top: 4px;
    font-size: 0.72rem;
  }
`;

const Lead = styled.p`
  max-width: 34ch;
  font-size: clamp(0.95rem, 1.9vh, 1.08rem);
  line-height: 1.6;
  color: var(--text-2);

  @media (max-width: 860px) {
    grid-column: 1 / -1;
    max-width: none;
    font-size: 0.92rem;
    line-height: 1.5;
  }
  @media (max-height: 640px) {
    display: none;
  }
`;

const Socials = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  @media (max-width: 860px) {
    grid-column: 1 / -1;
  }
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: clamp(34px, 5vh, 40px);
  height: clamp(34px, 5vh, 40px);
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-2);
  --glyph: 17px;

  &:hover {
    color: var(--text);
    border-color: var(--border-2);
    transform: translateY(-1px);
  }
`;

// a link's icon file, painted in the current colour via a CSS mask
const Glyph = styled.span`
  display: block;
  width: var(--glyph, 18px);
  height: var(--glyph, 18px);
  background: currentColor;
  -webkit-mask: var(--icon) center / contain no-repeat;
  mask: var(--icon) center / contain no-repeat;
`;

// ---------- family grid ----------

const Family = styled.section`
  min-width: 0;
`;

const Label = styled.p`
  margin-bottom: clamp(8px, 1.4vh, 14px);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent-ink);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(6px, 1.2vh, 10px);
`;

const Tile = styled.a`
  grid-column: ${({ $wide }) => ($wide ? "1 / -1" : "auto")};
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  height: clamp(48px, 8.2vh, 72px);
  padding: 0 clamp(10px, 1.6vw, 16px);
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);

  &:hover {
    border-color: color-mix(in srgb, var(--tone) 45%, var(--border));
    background: color-mix(in srgb, var(--tone) 6%, var(--surface));
    transform: translateY(-1px);
  }
  &:focus-visible {
    outline: 2px solid var(--text);
    outline-offset: 2px;
  }
`;

const Chip = styled.span`
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: clamp(30px, 4.6vh, 38px);
  height: clamp(30px, 4.6vh, 38px);
  border-radius: 10px;
  background: color-mix(in srgb, var(--tone) 14%, var(--surface));
  color: var(--tone);
  --glyph: clamp(15px, 2.2vh, 18px);

  ${Tile}:hover & {
    transform: rotate(-6deg) scale(1.06);
  }
  html.dark & {
    background: color-mix(in srgb, var(--tone) 24%, var(--surface));
    color: color-mix(in srgb, var(--tone) 55%, #ffffff);
  }
`;

const TileText = styled.span`
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 2px;
`;

const TileName = styled.span`
  font-size: clamp(0.88rem, 1.8vh, 0.98rem);
  font-weight: 500;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TileDesc = styled.span`
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-height: 700px) and (max-width: 860px) {
    display: none;
  }
`;

const Arrow = styled.span`
  flex: none;
  font-size: 0.85rem;
  color: var(--text-3);

  ${Tile}:hover & {
    color: var(--tone);
    transform: translate(1px, -1px);
  }
  @media (max-width: 420px) {
    display: none;
  }
`;

// ---------- chrome ----------

const Toggle = styled.button`
  position: absolute;
  top: clamp(12px, 2.4vh, 24px);
  right: clamp(12px, 3vw, 32px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: transparent;
  color: var(--text-2);
  cursor: pointer;

  &:hover {
    background: var(--surface-2);
    color: var(--text);
  }
`;

const Foot = styled.p`
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-3);

  a {
    color: var(--text-2);
  }
  a:hover {
    color: var(--accent-ink);
  }
  @media (max-height: 600px) {
    display: none;
  }
`;
