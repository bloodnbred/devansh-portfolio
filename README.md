# Devansh Yadav — Portfolio

Single-page portfolio for Devansh Yadav (Computer Science Engineering, Vidyalankar
Institute of Technology). Scroll-driven layout in the spirit of the athlete-brand
sites: a pinned horizontal project rail, fluid display type, and a single loud accent
colour.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build to dist/
npm run preview
npm run lint
npm run typecheck
```

## Stack

| Concern | Choice |
| --- | --- |
| Build | Vite 8 |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) |
| Animation | GSAP 3 + ScrollTrigger |
| Smooth scroll | Lenis, bridged to ScrollTrigger |
| Icons | lucide-react |
| Fonts | Archivo Variable (display, `wght` + `wdth` axes), Geist Variable (body), JetBrains Mono Variable (labels) — all self-hosted via `@fontsource-variable` |

Framer Motion was dropped in favour of GSAP: the pinned rail and scrubbed reveals
need `ScrollTrigger` pinning and `containerAnimation`, which Framer cannot express.

## Structure

```
src/
  data/site.ts        all copy — edit here, never inside components
  lib/
    gsap.ts           plugin registration + reduced-motion helper
    lenis.ts          Lenis ↔ ScrollTrigger bridge, scroll lock, scrollTo
    useMedia.ts       reactive media queries (desktop / touch / reduced motion)
    utils.ts          cn()
  components/         Cursor, ProgressBar, Nav, Preloader, Marquee,
                      Reveal (+RevealMask), SplitText, Counter, ProjectDetail
  sections/           Hero, Ticker, About, Stats, Projects, Skills,
                      Journey, Resume, Contact
```

## Design system

Everything is authored in `rem`, and the root font-size scales with the viewport:

```css
:root { font-size: clamp(10px, calc(100vw / 1600 * 16px), 16px); }
```

So the whole layout scales as one unit from ~1000px to 1600px, then clamps. Below
1024px the hero column goes full-bleed and `--text-hero` switches to a `vw`-based
value per breakpoint (measured, not guessed — see the comment in `index.css`).

Motion is governed by two tokens, used everywhere:

```css
--ease-brand: cubic-bezier(0.65, 0.05, 0, 1);
--dur: 0.75s;
```

Palette: `--color-void #0b0b0c`, `--color-ink #111112`, `--color-lime #d2ff00`
(accent), `--color-orange #ff6b00`, `--color-cream #efefe5`.

> **Gotcha worth keeping:** all CSS resets must live inside `@layer base`.
> An unlayered `* { padding: 0 }` outranks every layered rule, including Tailwind's
> own utilities, and will silently zero out things like `.shell`'s `padding-inline`.

## Motion behaviour

- **Projects** — desktop pins a full-height stage and scrubs the panel rail
  horizontally (`distance = railWidth - viewportWidth`). The per-panel depth tween
  uses `containerAnimation`, since those panels live inside a transformed parent.
  Touch and narrow viewports get a native `scroll-snap` rail instead of the pin.
- **Reduced motion** — `prefers-reduced-motion: reduce` skips the preloader, the
  custom cursor, smooth scroll, the pin, and every entrance animation. Content
  renders in its final state rather than being left at an animated starting value.
- **Custom cursor** — only engages after a real `pointermove` with
  `pointerType === 'mouse'`, so touch users never lose their cursor.

## Content

All copy lives in `src/data/site.ts`, extracted verbatim from the previous build.
Projects carry a typed `stages` array (problem → architecture → flow → features →
stack → live link) which `ProjectDetail` renders into the case-study overlay.

## Assets

- `public/media/portrait.jpg` — hero portrait, greyscale + lime duotone in CSS
- `public/resume.pdf` — served from the Résumé card
- `public/favicon.png`

## Deploy

`vercel.json` is included (`outputDirectory: dist`, immutable caching for hashed
assets). Push the repo and import it in Vercel, or run `vercel` from the project
root. The live site at `buildwithdevansh.vercel.app` is a separate deployment and
is unaffected until you point a domain at this build.