# Domain & Handles

Internal reference. See [MASTER_BLUEPRINT.md](./MASTER_BLUEPRINT.md) for canonical facts and [SOCIAL_BRAND_PACK.md](./SOCIAL_BRAND_PACK.md) for the social handle list this document cross-references.

## 1. Current status

- **No domain is purchased or confirmed.** Per `MASTER_BLUEPRINT.md` and `src/data/profile.ts`, the site resolves via `NEXT_PUBLIC_SITE_URL`, with `hasConfirmedDomain` staying `false` until that environment variable is set.
- **Fallback link, to be used everywhere until a domain is confirmed:** `https://rachid-berrada-portfolio.netlify.app`
- Nothing in this document should be read as "this domain is available" or "this domain is registered." Every candidate below requires a manual availability check on a registrar before any decision is made.

## 2. Candidate domains (unverified — check manually via a registrar)

Primary candidates, all built around the canonical name "Rachid Berrada":

- `rachidberrada.com`
- `rachidberrada.dev`
- `rachidberrada.ai`

Secondary/fallback candidates if the primary name is taken on a given TLD:

- `rberrada.dev`
- `rachid-berrada.com` (hyphenated variant — less clean, last resort)

Check availability manually at any standard registrar (e.g. Namecheap, Google Domains' successor registrar, OVH, Cloudflare Registrar, GoDaddy). None of these have been checked as part of writing this document.

## 3. TLD positioning fit

| TLD | Positioning rationale |
|---|---|
| **.com** | Broadest trust and recognition across every target market (France, Belgium, Switzerland, Canada, Morocco, UAE). The safest default for a B2B credibility signal — clients don't have to think about it. No positioning risk. |
| **.dev** | Signals technical/engineering credibility specifically — a strong secondary or complementary domain given the "AI & Digital Solutions Engineer" title. Popular in software/developer circles, reinforces the "engineer, not generic freelancer" positioning from `BRAND_SYSTEM.md`. Note: `.dev` domains enforce HTTPS by default (HSTS-preloaded TLD), which is a non-issue for a Netlify-hosted site already on HTTPS. |
| **.ai** | Directly signals the AI Systems Engineering pillar — useful if leaning harder into AI positioning for a specific campaign or audience. Two considerations to weigh, not conclusions: `.ai` domains typically cost more to register and renew than `.com`/`.dev`, and `BRAND_SYSTEM.md` explicitly warns against reading as a generic "AI startup" — a domain choice alone doesn't create that risk, but it's worth keeping in mind if `.ai` becomes the *primary* public-facing link rather than a secondary one. |

## 4. Recommended fallback order

1. **`rachidberrada.com`** — first choice if available. Broadest trust, works cleanly across every target market, no explaining required.
2. **`rachidberrada.dev`** — second choice, or acquire alongside `.com` as a technical-credibility signal (e.g. for developer-facing content, GitHub README links, technical case studies).
3. **`rachidberrada.ai`** — third choice, or acquire alongside `.com` specifically to anchor AI-focused campaigns or content.
4. **`rberrada.dev`** — fallback only if the primary name is unavailable across the TLDs above.

If budget allows registering more than one, the common pattern is: buy the primary (`.com` if available), then redirect secondary TLDs to it. That redirect is a technical/DNS task, out of scope for this document — flag for a future implementation pass once a domain is actually purchased.

## 5. Cross-reference with social handles

For brand consistency, the domain choice and the social handle list in `SOCIAL_BRAND_PACK.md` should point at the same underlying name wherever platform rules allow it:

| Source | Recommended string | Status |
|---|---|---|
| Domain (primary) | `rachidberrada.com` | Unverified — check registrar |
| Domain (secondary options) | `rachidberrada.dev`, `rachidberrada.ai` | Unverified — check registrar |
| Social handles (Instagram, TikTok, YouTube, X) | `@rachidberrada` → `@rachidberrada.dev` → `@rachidberrada.ai` → `@rberrada.dev` (priority order) | Unverified — check each platform manually, see `SOCIAL_BRAND_PACK.md` §2 |
| LinkedIn vanity URL | `linkedin.com/in/rachidberrada` (target, once profile exists) | Not created yet |
| GitHub | `github.com/Rberr240` (existing, live) | Already in production — not part of this naming exercise, see note below |

**Note on GitHub:** the existing GitHub account (`Rberr240`) predates this naming exercise and is already linked from production (`profile.ts`, deployed site, project repository links). This document does not recommend acquiring a domain-matching GitHub rename as part of the domain decision — that's a separate, optional decision tracked as an open question in `SOCIAL_BRAND_PACK.md`.

## 6. Manual verification checklist (for Rachid)

- [ ] Check `rachidberrada.com` availability at a registrar
- [ ] Check `rachidberrada.dev` availability at a registrar
- [ ] Check `rachidberrada.ai` availability at a registrar (and compare renewal pricing — `.ai` renewals run higher than `.com`/`.dev`)
- [ ] Check `rberrada.dev` as a fallback if the above are unavailable
- [ ] Decide how many TLDs to actually purchase (one primary is sufficient to launch; additional TLDs are optional brand protection, not a requirement)
- [ ] Once a domain is purchased: set `NEXT_PUBLIC_SITE_URL` in the deployment environment so `hasConfirmedDomain` flips to `true` and the site stops relying on the Netlify fallback URL — this is a deployment-configuration step, not a content change, and is out of scope for this document
- [ ] Cross-check the final domain choice against whichever social handles actually turn out to be available (see `SOCIAL_BRAND_PACK.md`) and keep them aligned where possible

## Open questions / placeholders

- No domain has been purchased or reserved. Everything in Section 2 is a naming candidate only.
- No registrar has been chosen.
- Whether to buy more than one TLD (budget/priority decision) is left to Rachid.
- DNS/redirect setup for secondary domains pointing at the primary is not designed in this document — flag for a future technical pass once a domain is confirmed.
