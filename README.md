# Decentralize AI Hackathon — Website Starter Kit

A modern hackathon website built with Next.js (App Router), React, TypeScript, and Tailwind CSS. It ships with everything you need to run a hackathon-style event: a landing page, prize breakdowns, judges, FAQ, sponsor showcase, a "claim credits" form, and an optional AI-assisted blog draft generator.

This repository was originally built for the *Decentralize AI Hackathon* and is now handed over as an open-source starter kit. Everything below is a placeholder or example you're expected to replace with your own event's details, links, and branding.

**Version:** 0.0.1

## Tech Stack

- **Next.js** ^16.1.6 — The React framework for production (App Router)
- **React** ^19.2.4 / **React DOM** ^19.2.4
- **TypeScript** ^5 — Type-safe JavaScript
- **Tailwind CSS** ^4 — Utility-first CSS framework
- **Three.js** (`three`, `@types/three`) — used for the animated hero background
- **Zod** — schema validation (form input, API payloads)
- **@next/third-parties** — Google Analytics integration
- **ESLint** ^9

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Copy the environment variable template and fill in your own values (see [Environment Variables](#environment-variables) below):

```bash
cp .env.example .env.local
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Environment Variables

All environment variables are optional for local development — the app degrades gracefully (features are simply disabled) when a variable is missing. Copy `.env.example` to `.env.local` and fill in what you need:

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Your production URL. Used for canonical links, `sitemap.xml`, `robots.txt`, Open Graph tags, and JSON-LD structured data. |
| `NEXT_PUBLIC_SITE_DOMAIN` | Optional | Domain string sent to your email-verification backend (if you use one). |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | Enables Google Analytics via `@next/third-parties`. Leave empty to disable analytics. |
| `GOOGLE_SHEET_WEBHOOK` | Optional | A webhook URL (e.g. a Google Apps Script Web App) that the `/api/claim/nosana` route forwards form submissions to. Leave empty to disable that integration. |
| `NEXT_PUBLIC_VERIFICATION_API_URL` | Optional | Base URL of your own email-OTP verification backend, used by the Blog Generator flow. |
| `NEXT_PUBLIC_DECENTRALIZE_API_URL` | Optional | Base URL of your own "draft generator" backend, used by the Blog Generator flow. |
| `NEXT_PUBLIC_PUBLISHING_PLATFORM_URL` | Optional | Base URL of the blog/CMS platform where generated drafts live. Used as a fallback to build a draft link (`{url}/articles/{draftId}`) when your backend doesn't already return one. |

> **Note on the Blog Generator (`/blog-generator`) and email verification:** this starter kit ships the *frontend* for a two-step flow (email OTP → AI-assisted blog draft), but the backend services that power it (`lib/verificationApi.ts` and `lib/decentralizeApi.ts`) are **not included** in this repository — they originally called a private, organization-specific backend (HackerNoon's own publishing platform). As the new owner, you will **not** have access to that backend or be able to create drafts on HackerNoon.
>
> To use this flow, build/host your own equivalent API (email OTP + AI draft generation) and point the two `NEXT_PUBLIC_*_API_URL` variables at it. Your backend's `/create-draft` response can return its own `draftUrl`/`loginUrl`, or — if it only returns a `draftId` — set `NEXT_PUBLIC_PUBLISHING_PLATFORM_URL` to your own blogging platform's base URL and the app will build a link like `{url}/articles/{draftId}` automatically. If none of these are configured, the UI still completes the flow but shows a placeholder message instead of a broken HackerNoon link. Alternatively, remove/replace the `/blog-generator` page entirely if you don't need this feature.

## Customizing This Repo for Your Own Event

Almost everything specific to the original hackathon lives in a handful of well-organized config files under `lib/`, plus site metadata in `app/layout.tsx`. Update these to make the site your own:

| What to change | Where |
| --- | --- |
| Event name, description, SEO metadata, social preview | `app/layout.tsx`, `app/page.tsx` (`metadata` exports), `app/manifest.ts` |
| Prize pool amounts, timeline/rounds, prize breakdown | `lib/prizes.ts` |
| Sponsors (name, logo, links, blurb) | `lib/sponsors.ts` + logo files in `public/sponsors/` |
| Judges (name, photo, title, LinkedIn) | `lib/judges.ts` + photos in `public/judges/` |
| FAQ content | `lib/faqs.ts` |
| Suggested/related reading links | `lib/articleLinks.ts` |
| Entry tags / categories | `lib/tags.ts` (currently generates `hackernoon.com/tagged/...` URLs — update `tagUrl()` if you're not using HackerNoon) |
| Footer links (About, Resources, Powered By) | `app/components/Footer.tsx` |
| Logo, favicon, app icons, OG image | `public/logo.svg`, `public/logo-with-tagline.svg`, `public/favicon.svg`, `public/apple-icon.png`, `public/og-image.jpg` |
| Google Search Console site verification | Add your own `public/google<your-id>.html` file (the original was removed) |
| Colors / theme | Tailwind utility classes throughout components use a `#00ff88` (green) accent — search and replace, or introduce CSS variables in `app/globals.css` |

Two feature pages are tightly coupled to the original organizers' infrastructure and are the most likely things you'll want to rework or remove:

- **`/claim/nosana`** — a "claim compute credits" form (`app/components/NosanaClaimForm.tsx`) that posts to `app/api/claim/nosana/route.ts`, which forwards to a `GOOGLE_SHEET_WEBHOOK` you control. Update the copy/eligibility rules, or point the webhook at your own sheet/CRM.
- **`/blog-generator`** — the AI blog-draft flow described above, which depends on a private backend not included here.

## Project Structure

```
├── app/                        # Next.js App Router
│   ├── layout.tsx               # Root layout, global SEO metadata
│   ├── page.tsx                 # Home page (hero, prizes, timeline, articles)
│   ├── prizes/page.tsx          # Prize breakdown page
│   ├── judges/page.tsx          # Judges page
│   ├── faq/page.tsx             # FAQ page
│   ├── blog-generator/page.tsx  # AI-assisted blog draft flow (needs your own backend)
│   ├── claim/nosana/page.tsx    # Compute-credit claim form page
│   ├── api/claim/nosana/route.ts# Server route that forwards claim submissions to a webhook
│   ├── components/              # Shared UI components
│   ├── hooks/                   # Custom React hooks
│   ├── sitemap.ts / robots.ts / manifest.ts
│   └── globals.css              # Global styles (Tailwind)
├── lib/                         # Event content & config (see table above)
├── public/                      # Static assets (logos, judge/sponsor images, icons)
├── .env.example                 # Environment variable template
├── next.config.ts               # Next.js configuration (security headers, image domains)
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

## Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

## Deploying

This is a standard Next.js app and deploys cleanly to [Vercel](https://vercel.com/), or any host that supports Next.js (Node server or static export where applicable). Remember to set your environment variables (see above) in your hosting provider's dashboard.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
