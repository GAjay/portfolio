# Portfolio design & architecture

Professional portfolio for **Ajay Kumar Maheshwari** — full-stack AI engineer, writer, mentor.

## Source of truth (read in order)

| Priority | Resource | Role |
| --- | --- | --- |
| 1 | `design/reference/portfolio-ui-reference.jpg` | Visual layout, hierarchy, spacing |
| 2 | `design/reference/AGENT-UI.md` | Section map, agent checklist |
| 3 | **This file** | Architecture, tokens, DOM order, content |
| 4 | `src/shared/styles/portfolio-template.css` | Core CSS variables (`--bg`, `--ink`, …) |
| 5 | `src/shared/styles/portfolio.css` | Overrides, dark elevated cards, section polish |
| 6 | `src/shared/styles/portfolio-asriui.css` | AsriUI token bridge + form/contact overrides |
| 7 | `.cursor/rules/ponytail.mdc` | Cursor agent conventions |

## Architecture

```
src/
  app/                    # Next.js App Router (page shell, metadata, PWA routes)
    page.tsx              # Composes sections only — no business logic
    layout.tsx            # Fonts, styles, Providers, color-scheme bootstrap script
    blog/ offline/        # Secondary routes
  features/<name>/        # Vertical slices
    components/
    data/                 # *.ts + optional *.generated.json from sync scripts
    hooks/
    index.ts              # Public exports
  shared/
    config/site.ts        # Copy, URLs, socialLinks, SEO helpers
    config/base-path.ts   # GitHub Pages basePath
    components/           # RefSection, ripple CTAs, portfolio-typography, JSON-LD
    lib/                    # site-url, color-scheme, metadata, scroll
    styles/                 # portfolio*.css (imported from layout)
scripts/                  # sync-external-data, Instagram, GitHub Pages export
public/assets/            # Images, company/tech SVGs, resume PDF
```

**Data flow**

- **Copy & links:** `src/shared/config/site.ts` (+ `profile.generated.json` for GitHub metrics).
- **Live sync:** `npm run sync:data` / prebuild → `scripts/sync-external-data.mjs` (GitHub, Medium RSS, content channels).
- **Instagram:** optional crawl + `public/data/instagram-feed.json`; seed fallbacks in `features/content/data/`.

**UI stack**

- **Chrome:** custom CSS (`portfolio-template.css` + `portfolio.css`) — nav, hero, cards, carousels, `btn` / `chip`.
- **AsriUI:** `AsriUIProvider`, `ToastProvider`, `Form` (contact), `Typography` / `Badge` / `Quote` via `portfolio-typography.tsx` and section kickers.
- **Motion:** scroll-reveal hooks, theme ripple, hero typewriter; respect `prefers-reduced-motion`.

## Page map (DOM order)

Matches `src/app/page.tsx`.

| Block | Feature | Notes |
| --- | --- | --- |
| — | `header` | Nav pill, theme toggle, Topmate CTA |
| — | `hero` | Greeting, typewriter H1, bio, CTAs (work + resume), portrait, code card, reach |
| — | `about` | Quote band + portrait overlap (`about-quote-section`) |
| **01** | `tech-stack` | Tools marquee / strip (white tiles in dark mode) |
| **03** | `journey` | Experience split layout, role nav, LinkedIn primary CTA |
| **02** | `companies` | Logo carousel (Publicis, Lloyds, Vymo, Apollo, CapBridge, …) |
| **04** | `projects` | Horizontal project carousel |
| **05** | `content` | Instagram → YouTube → Medium (`RefSection` + carousels) |
| **06** | `open-source` | Repo carousel |
| **07** | `mentorship` | Session cards + Topmate |
| — | `recommendations` | Testimonials carousel |
| **08** | `contact` | Profile, AsriUI mailto form, details, footer nav |

`SectionBand` alternates background on selected blocks. Legacy `skills` / `experience` / `writing` feature modules exist but are **not** mounted on the home page.

## Design tokens

Defined in `portfolio-template.css` (`:root` / `html[data-theme="dark"]`):

| Token | Light | Usage |
| --- | --- | --- |
| `--bg` | `#fbfbfc` | Page canvas |
| `--card` | `#fff` | Cards, inputs |
| `--ink` | `#0e0e11` | Primary text |
| `--muted` | `#6b6b74` | Secondary text |
| `--line` | `#ececf0` | Borders |
| `--soft` | `#f4f4f7` | Muted bands, chip bg |
| `--btn` / `--on-btn` | black / white | Primary pills |
| `--f` | Inter Tight | UI typography |

Dark mode adds elevated card tokens in `portfolio.css` (`--elevated-card-*`) for section carousels; **tech** and **companies** strips keep **white** logo tiles.

**Typography:** Inter Tight (UI), Caveat (hero handwritten labels only).

**Theme:** defaults to **system** (`prefers-color-scheme`); user toggle persists in `localStorage` (`portfolio-color-scheme`). Inline script in `layout.tsx` avoids flash.

**Buttons:** `RippleAnchor` / `RippleButton` with `btn` (primary), `btn o` (outline). Primary section CTAs use `btn s` + arrow icon.

**Tags:** `.chip` or AsriUI `Badge` with `chip` class for section kickers (platform + stat chips).

## Content checklist

- Profile: `site.ts` — role, headline, bio, email, resume path, social, Topmate, SEO/AEO.
- Resume file: `public/resume/ajay-kumar-maheshwari-resume.pdf`.
- Companies: `features/companies/data/companies.ts` + `public/assets/companies/`.
- Projects / journey / mentorship: feature `data/` + generated JSON where applicable.

## Build & deploy

```bash
npm run dev      # PWA off
npm run build    # sync (best-effort) + static export path per next.config
```

Production URL: `NEXT_PUBLIC_SITE_URL` (see `.env.production`). GitHub Pages: workflow sets `NEXT_PUBLIC_BASE_PATH` when needed.

## Quality bar

- Match reference mock before inventing new patterns.
- Update tokens in CSS before one-off component styles.
- Run `npm run build` before merging UI work.
