# Portfolio (Next.js + AsriUI + PWA)

Single-page portfolio for **Ajay Kumar Maheshwari** — Next.js App Router, custom reference UI, [AsriUI](https://gajay.github.io/asriui/) for forms/typography primitives, and PWA via `@ducanh2912/next-pwa`.

## Docs

| File | Contents |
| --- | --- |
| [`design.md`](design.md) | Architecture, tokens, section map, data flow |
| [`design/reference/AGENT-UI.md`](design/reference/AGENT-UI.md) | Visual reference + agent UI checklist |
| [`.cursor/rules/ponytail.mdc`](.cursor/rules/ponytail.mdc) | Cursor conventions |
| [`AGENTS.md`](AGENTS.md) | Next.js + portfolio agent notes |

## Feature modules

```
src/
  app/                 page.tsx, layout, blog, offline, manifest, SEO routes
  features/
    about/ header/ hero/ tech-stack/ companies/ journey/
    projects/ content/ open-source/ mentorship/ recommendations/ contact/
  shared/
    config/site.ts     copy, links, resumeHref(), socialLinks
    components/        RefSection, portfolio-typography, providers
    styles/            portfolio-template.css, portfolio.css, portfolio-asriui.css
```

Home section order is defined in `src/app/page.tsx` (see `design.md`).

## Customize

- **Copy & URLs:** `src/shared/config/site.ts`
- **Resume:** replace `public/resume/ajay-kumar-maheshwari-resume.pdf`
- **Per-section data:** `src/features/<name>/data/`
- **Sync GitHub / Medium / content stats:** `npm run sync:data` (also runs on prebuild)

## Scripts

```bash
npm run dev
npm run build
npm run start
```

After `npm run build`, check Chrome DevTools → Application → Manifest / Service Workers.

## GitHub Pages

Push to **`main`** runs [`.github/workflows/deploy-github-pages.yml`](.github/workflows/deploy-github-pages.yml).

1. Repo **Settings → Pages → Build and deployment**: source **GitHub Actions**.
2. Project site: `https://<user>.github.io/<repo>/` — set `NEXT_PUBLIC_BASE_PATH=/repo` (CI or env).
3. Custom domain: set `NEXT_PUBLIC_SITE_URL` in `.env.production` or repo variables.

Local export example:

```bash
GITHUB_PAGES=1 NEXT_PUBLIC_BASE_PATH=/portfolio NEXT_PUBLIC_SITE_URL=https://you.github.io/portfolio npm run build
```

## PWA

- Manifest: `src/app/manifest.ts`
- Offline: `src/app/offline/page.tsx`
- Service worker: production build only (`public/sw.js` generated)
