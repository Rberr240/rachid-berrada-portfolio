# Manual Actions — Accounts, Domain, Analytics

Internal reference. See [MASTER_BLUEPRINT.md](./MASTER_BLUEPRINT.md) for canonical facts this document must stay consistent with, and [BRAND_SYSTEM.md](./BRAND_SYSTEM.md) for the positioning language reused below.

> This document lists exactly what Rachid needs to personally go create or configure. None of it can or should be done by Claude/Claude Code — see the note at the end.

## Handle priority (applies to every platform below)

Per the handle priority defined in `SOCIAL_BRAND_PACK.md`, try usernames in this order on each platform, in order of preference, and use the first one that's actually available:

1. `@rachidberrada`
2. `@rachidberrada.dev`
3. `@rachidberrada.ai`
4. `@rberrada.dev`

**These are marked unverified** — nobody has confirmed availability on any specific platform yet. Check availability manually at account-creation time on each platform; do not assume a handle is free just because it's first in this list. If none of the four are available on a given platform, fall back to the closest reasonable variant (e.g. adding a short suffix) and record what was actually used somewhere central (e.g. `DOMAIN_AND_HANDLES.md`) so all profile links stay consistent across platforms.

## Shared details (same across every platform unless noted)

- **Display name:** Rachid Berrada
- **Profile link:** `https://rachid-berrada-portfolio.netlify.app` — use this exact URL until a custom domain is purchased and confirmed live (see §7 below and MASTER_BLUEPRINT.md §3: do not invent or pre-announce a domain).
- **Primary CTA:** "Start a project" — pointing at the profile link above (or, where a platform supports multiple links, at the site's contact section).
- **Short bio (reusable across platforms with length limits):** "AI & Digital Solutions Engineer. I design and build intelligent digital systems, automations and custom software for businesses." (from BRAND_SYSTEM.md §1 — trim further per platform character limits, keep the first sentence intact since it's the identity line.)

## 1. Instagram

- **Username:** first available from the handle priority list above.
- **Display name:** Rachid Berrada
- **Bio (short):** "AI & Digital Solutions Engineer. Intelligent digital systems, AI automations & custom software for businesses. Available for international projects."
- **Profile link:** `https://rachid-berrada-portfolio.netlify.app`
- **CTA:** "Start a project" via link in bio.
- **First content to publish:** one or two short-form pieces from [content/SHORTS_001_030.md](./content/SHORTS_001_030.md) adapted to Reels format, plus a pinned intro post/carousel introducing who Rachid is and what he builds (use the positioning statement and differentiator from BRAND_SYSTEM.md §1 as the core message).

## 2. TikTok

- **Username:** first available from the handle priority list above (independently checked — availability on Instagram does not guarantee availability on TikTok).
- **Display name:** Rachid Berrada
- **Bio (short):** "AI & Digital Solutions Engineer. I build intelligent systems, automations & custom software." (TikTok's bio limit is shorter — keep to the identity + positioning line only, drop the "available for international projects" clause if space is tight.)
- **Profile link:** `https://rachid-berrada-portfolio.netlify.app`
- **CTA:** "Start a project" via link in bio.
- **First content to publish:** the same short-form scripts as Instagram ([content/SHORTS_001_030.md](./content/SHORTS_001_030.md)) — TikTok and Instagram Reels can generally share the same source video with minimal re-editing.

## 3. LinkedIn

- **Username / profile URL slug:** first available from the handle priority list above, adapted to LinkedIn's `linkedin.com/in/...` format.
- **Display name:** Rachid Berrada
- **Headline:** "AI & Digital Solutions Engineer" (BRAND_SYSTEM.md §1) — this is the single most important field on LinkedIn, keep it exactly matching the canonical title.
- **About section (short version):** Use the commercial promise and differentiator together: "I help businesses automate operations, improve customer experience and build smarter digital products. I don't just build interfaces — I build complete systems." Expand with 2–3 sentences on the four service pillars (OFFERS_AND_PRICING.md §1) if the format allows more length.
- **Profile link (featured/contact section):** `https://rachid-berrada-portfolio.netlify.app`
- **CTA:** "Start a project" — LinkedIn allows a custom button/contact info field; point it at the profile link above.
- **First content to publish:** the first 2–3 posts from [content/LINKEDIN_POSTS_001_010.md](./content/LINKEDIN_POSTS_001_010.md) — LinkedIn is the primary B2B-credibility platform for this brand (BRAND_SYSTEM.md §5 target markets skew B2B/professional), so prioritize getting this profile fully filled in (experience, featured case studies) before high-volume posting.

**Note:** MASTER_BLUEPRINT.md §3 confirms no LinkedIn URL exists yet and none should be invented anywhere else in the codebase or docs until this account is actually created — once it exists, update `socialLinks` in `src/data/profile.ts` (currently `{ label: "LinkedIn", href: "", enabled: false }`) as a separate, explicit follow-up task, not silently.

## 4. YouTube

- **Channel handle:** first available from the handle priority list above, in YouTube's `@handle` format.
- **Display name:** Rachid Berrada
- **Channel description (short):** Same as the shared short bio above, expanded with one line on content focus, e.g.: "AI & Digital Solutions Engineer. I build intelligent digital systems, AI automations and custom software for businesses — sharing the process here."
- **Profile link:** `https://rachid-berrada-portfolio.netlify.app`
- **CTA:** "Start a project" via the channel's link section.
- **First content to publish:** longer-form versions or a compilation of the Shorts scripts, or a single intro video walking through the positioning statement and one verified case study (e.g. the portfolio's own lead-automation system, per MASTER_BLUEPRINT.md §4 — "the strongest public automation case study because it is Rachid's own system and fully verifiable").

## 5. X (optional)

- **Username:** first available from the handle priority list above, only if Rachid chooses to activate this platform — it is explicitly optional per the mission scope, unlike the four platforms above.
- **Display name:** Rachid Berrada
- **Bio (short):** Same short bio as Instagram/TikTok, trimmed to X's character limit.
- **Profile link:** `https://rachid-berrada-portfolio.netlify.app`
- **CTA:** "Start a project" via link in bio.
- **First content to publish:** repurpose short text-based excerpts from the LinkedIn posts ([content/LINKEDIN_POSTS_001_010.md](./content/LINKEDIN_POSTS_001_010.md)) rather than writing X-specific content from scratch initially — validate whether this platform is worth sustained effort before investing in dedicated content for it.

## 6. Domain purchase

- **What to check:** availability of `rachidberrada.com`, `rachidberrada.dev`, and `rachidberrada.ai` (mirroring the handle priority order above) at a reputable registrar (e.g. Namecheap, Google Domains successor/Squarespace Domains, Cloudflare Registrar, OVH).
- **Do not purchase on Rachid's behalf** — this requires payment details and account ownership that must stay entirely in Rachid's hands.
- **After purchase:** point the domain's DNS at Netlify per Netlify's custom-domain instructions (Netlify dashboard → Domain management → Add a domain), then set `NEXT_PUBLIC_SITE_URL` in Netlify's environment variables to the new domain (see `.env.example` for the existing documented pattern) and redeploy. This also unlocks the DNS TXT verification option in [ANALYTICS_SETUP.md](./ANALYTICS_SETUP.md) §6 (Option B) and the domain-level Search Console property.
- Until a domain is purchased and confirmed, every reference in this document, the site, and all other docs must keep using `https://rachid-berrada-portfolio.netlify.app` — never invent or pre-announce a domain (MASTER_BLUEPRINT.md §3, §5).

## 7. Google Analytics

- Full step-by-step is in [ANALYTICS_SETUP.md](./ANALYTICS_SETUP.md) §2–3. Summary of what Rachid needs to personally do:
  1. Create a GA4 property at [analytics.google.com](https://analytics.google.com) under a Google account Rachid controls.
  2. Create a Web data stream pointed at `https://rachid-berrada-portfolio.netlify.app`.
  3. Copy the resulting Measurement ID (`G-XXXXXXXXXX`).
  4. Add it as `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Netlify's Site configuration → Environment variables, then redeploy.
- This is optional but recommended before the first content push, so acquisition data starts accumulating from day one of [90_DAY_ROADMAP.md](./90_DAY_ROADMAP.md).

## 8. Google Search Console

- Full step-by-step is in [ANALYTICS_SETUP.md](./ANALYTICS_SETUP.md) §5–6. Summary of what Rachid needs to personally do:
  1. Add a URL-prefix property at [search.google.com/search-console](https://search.google.com/search-console) for `https://rachid-berrada-portfolio.netlify.app`.
  2. Verify using whichever method is easiest right now — the HTML file upload option (ANALYTICS_SETUP.md §6, Option A) requires no domain and no DNS access.
  3. Once a custom domain exists, add a second, domain-level property (Option B, DNS TXT) rather than replacing the URL-prefix one.

## Credentials note

**Claude/Claude Code should never be asked to handle passwords, OTPs, or credentials for these accounts — all of the above must be completed manually by Rachid.** This includes account creation, sign-in, two-factor/OTP codes, domain purchase and payment, and entering any password or API secret anywhere. Any environment variable values referenced above (e.g. the GA4 Measurement ID) should be typed directly into the Netlify dashboard by Rachid, not shared with or routed through an AI assistant.
