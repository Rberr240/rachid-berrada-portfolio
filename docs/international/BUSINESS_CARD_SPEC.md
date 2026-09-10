# Business Card Spec

Internal reference. See [BRAND_SYSTEM.md](./BRAND_SYSTEM.md) for the visual language this spec must stay consistent with, [MASTER_BLUEPRINT.md](./MASTER_BLUEPRINT.md) for canonical contact facts, and [DOMAIN_AND_HANDLES.md](./DOMAIN_AND_HANDLES.md) for the domain status referenced in the QR strategy below.

## 1. Recommended card content

- **Name:** Rachid Berrada
- **Title:** AI & Digital Solutions Engineer
- **Subtitle:** Web Applications · AI Automation · Custom Software
- **Email:** rachid.berrada20@gmail.com (canonical public contact email, per `profile.ts`)
- **Portfolio link:** `https://rachid-berrada-portfolio.netlify.app` — this is the current production URL and the correct one to print until a custom domain is confirmed (see `DOMAIN_AND_HANDLES.md`). Do not print a domain that hasn't been purchased.
- **QR code:** encodes the portfolio link (with tracking parameters — see Section 4).
- **Optional:** WhatsApp number `+212 6 48 55 22 22` (canonical per `MASTER_BLUEPRINT.md`) — include only if Rachid wants direct WhatsApp contact on the physical card; not required.

Do not include a LinkedIn URL, a custom domain, or a GitHub handle unless/until each is confirmed — see the open questions at the end of this document.

## 2. Canva-ready copy block

Paste directly into a Canva business card template as a starting point; adjust line breaks to fit whichever template is chosen.

**Front:**
```
RACHID BERRADA
AI & Digital Solutions Engineer
Web Applications · AI Automation · Custom Software
```

**Back:**
```
[QR CODE]

rachid-berrada-portfolio.netlify.app
rachid.berrada20@gmail.com
+212 6 48 55 22 22 (WhatsApp) — optional

"I don't just build interfaces. I build complete systems."
```

## 3. Layout specification

### Card size
Two common standards apply across the target markets (France, Belgium, Switzerland, Canada, Morocco, UAE):
- **US/Canada standard:** 3.5 × 2 in (88.9 × 50.8 mm)
- **ISO/European standard:** 85 × 55 mm

Neither is objectively correct for a business operating across both — **default recommendation: 85 × 55 mm (ISO)**, since most European and Moroccan print vendors use this as their standard template size and it avoids an odd-size surcharge. If printing primarily through a North American vendor, switch to 3.5 × 2 in instead. This is a vendor-dependent decision Rachid should confirm before finalizing print files — flagged as an open question below.

### Bleed and safe margins
- **Bleed:** 3 mm (roughly 1/8 in) beyond the trim edge on all sides — required by most print vendors regardless of which size standard is used.
- **Safe margin:** keep all text and the QR code at least 5 mm inside the trim edge, so nothing critical is at risk from trimming tolerance.

### Front layout
- Name: largest text on the card, top or vertically centered depending on template, left-aligned for a clean technical look.
- Title directly beneath the name, smaller weight.
- Subtitle (three pillars) beneath the title, smallest of the three text tiers — this line can be dropped first if space is tight.
- Optional: a small monogram mark ("RB", matching `siteConfig.monogram` in `profile.ts`) in a corner, if a matching mark already exists in the site's visual system — do not design a new logo mark as part of this spec.

### Back layout
- QR code centered or in one clear quadrant (avoid dead-center placement that visually competes with the closing line if both are present).
- The plain URL printed in small text beneath or beside the QR code, as a fallback for anyone who can't scan.
- Contact line(s): email, and WhatsApp only if included.
- Optional closing line: the differentiator line "I don't just build interfaces. I build complete systems." — reinforces `BRAND_SYSTEM.md` positioning without adding new copy.

## 4. QR code URL strategy

**Recommended URL to encode:**
```
https://rachid-berrada-portfolio.netlify.app/?utm_source=business_card&utm_medium=qr
```

Important constraints on this recommendation:

- This is a **fallback URL**, not a confirmed permanent one. Once a custom domain is purchased and confirmed (see `DOMAIN_AND_HANDLES.md`), regenerate the QR code to point at the new domain with the same UTM parameters. The QR code image itself will need to change — the card layout does not.
- **Naming note (resolved):** `UTM_TRACKING_V2.md` originally proposed a different `utm_source` spelling (`qrcode`/`businesscard`) for this same channel — an artifact of two parallel workstreams choosing independently. It has been reconciled to use `business_card` as the single canonical value across both documents, matching the value on this page. Use `business_card` everywhere this channel is referenced.
- **The UTM parameters are a tracking design only — they are not yet wired into the live site.** No analytics integration in this codebase currently reads or stores `utm_source`/`utm_medium` from the URL. The parameters will pass through in the visitor's browser URL bar when they scan the code, but nothing on the site currently captures or attributes them. Implementation of that capture is tracked separately in `UTM_TRACKING_V2.md`, owned by a different workstream — **do not represent this as implemented** in any card copy, proposal, or conversation with Rachid until that workstream confirms it's live.
- Recommend a **static QR code** (one that encodes the URL directly) rather than a "dynamic"/redirect QR service for the first print run. Dynamic QR services let the destination be changed after printing without a reprint, but most require a paid subscription. Since the fallback URL is stable production infrastructure (the Netlify deployment isn't going away), a static QR is the zero-cost choice for now. Revisit dynamic QR only if the domain is expected to change again soon after this print run.

## 5. Color & typography direction (qualitative — do not invent new values)

Per `BRAND_SYSTEM.md` Section 3, the card should feel like an extension of the existing site, not a new design language:

- **Base:** dark, high-contrast, matching the site's existing premium/technical dark UI — do not introduce a light/pastel card design that breaks from the site.
- **Typography:** clean, modern sans-serif, consistent with "elegant, technical, international, credible B2B" — avoid decorative, script, or novelty fonts.
- **Restraint:** no neon glow, no gradients, no "AI startup" visual clichés, no stock imagery — this mirrors the explicit "avoid" list in `BRAND_SYSTEM.md` Section 3.
- **Accent color:** if an accent is used (e.g. for the pillar line or a thin rule), pull the exact value directly from the live site's design tokens/CSS (`src/app/globals.css`) when producing final artwork. This document intentionally does not specify a hex value — that would risk inventing a color not actually in the brand system.

## 6. Print production notes

- **Finish:** a premium matte or soft-touch laminate finish fits the "premium/technical" positioning better than high-gloss; final stock choice is a budget/vendor decision, not specified further here.
- **QR legibility:** keep the QR module large enough to scan reliably at typical arm's-length distance — as a rule of thumb, aim for roughly 15–18 mm square minimum at 300 dpi print resolution on a dark background with sufficient contrast against the surrounding fill.
- **Before bulk printing:** order a single physical proof and test-scan the QR code with at least two different phone cameras/QR apps before committing to a full print run.

## Open questions / placeholders

- **Card size standard (3.5 × 2 in vs. 85 × 55 mm)** is not finalized — depends on which print vendor Rachid ultimately uses. Default recommendation above is 85 × 55 mm; confirm before generating final print-ready files.
- **Custom domain not yet confirmed** — the card must launch with the Netlify fallback URL. Revisit the QR target once `DOMAIN_AND_HANDLES.md` status changes.
- **UTM tracking is a design, not a live feature.** The QR URL strategy above is ready to encode today, but the parameters won't be captured or reported on anywhere until `UTM_TRACKING_V2.md`'s workstream ships. Do not tell prospects or Rachid that scan analytics exist yet.
- **WhatsApp number on the card** is optional and not decided — flagged for Rachid to choose.
- **Exact accent color/typeface family** is deliberately not specified numerically here; pull from the live site's CSS/design tokens when producing final Canva or print artwork.
- **Monogram mark ("RB")** is referenced as a nice-to-have corner element only if a matching mark already exists in the site's visual system — this spec does not commission a new logo.
