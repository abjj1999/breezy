# Part 3 — Overview

- **GitHub repo:** https://github.com/abjj1999/breez
- **Live site:** https://breez-azure.vercel.app/

**Summary of decisions:**

- **Stack:** Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Motion. All three routes prerender to static HTML.
- **Pages:** `/` (hero, logos, features, How It Works timeline, newsletter), `/pricing` (Plan Finder quiz, tiers, stats, testimonials), `/about` (about blurb, searchable FAQ, newsletter).
- **Component architecture:** all copy in one typed data file (`lib/content.ts`); reusable primitives (`Button`, `SectionHeader`, `Reveal`, `Toast`) shared across pages; server components by default, client components only where interactive.
- **New feature: Plan Finder quiz** — 3 questions score the three tiers, recommend one, scroll to and badge the matching card, and persist the result in `localStorage` (with retake). Chosen because a 3-tier pricing page's main UX problem is choice paralysis.
- **Second feature: dark/light mode** — header toggle, persisted in `localStorage`, defaults to the OS preference, applied before first paint (no flash) via an inline `beforeInteractive` script and Tailwind's class-based `dark:` variant.
- **Design fidelity:** same palette (Tailwind's sky/slate/violet — the original's hex values are literally Tailwind colors), same fonts (DM Sans + Playfair Display via `next/font`), same section order and styling, plus the Part 2 timeline carried over.
- **Deploy target:** Vercel (zero-config for Next.js, free tier, PR previews).
