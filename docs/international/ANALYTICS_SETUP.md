# Analytics Setup — Google Analytics 4 & Google Search Console

Internal reference. See [MASTER_BLUEPRINT.md](./MASTER_BLUEPRINT.md) for canonical facts this document must stay consistent with.

> **This document is manual human setup steps only.** It does not contain code. The actual conditional GA4-loading code (load the GA4 script only when a Measurement ID is configured) is implemented separately in the application codebase, not here. Nothing in this document should be treated as an instruction to write that code as part of a documentation task.

## 1. Before you start

- Domain is **not yet confirmed** (see MASTER_BLUEPRINT §3). You can complete GA4 property creation and Search Console verification against the current Netlify URL (`https://rachid-berrada-portfolio.netlify.app`) and update the property/verification later if a custom domain is purchased — neither Google tool requires the final domain to be locked in first.
- Do not invent a Measurement ID or verification code anywhere in code, docs, or `.env` files. Every value in this document must come from Rachid actually creating the resource in Google's console.

## 2. Google Analytics 4 — creating the property

1. Go to [analytics.google.com](https://analytics.google.com) and sign in with the Google account Rachid wants to own this data long-term (recommend a dedicated business/portfolio Google account rather than a personal one, if one exists).
2. Click **Admin** (gear icon, bottom left) → under the **Account** column, create an account if none exists yet (e.g. name it "Rachid Berrada" or "Rachid Berrada Portfolio").
3. Under the **Property** column, click **Create Property**.
   - Property name: e.g. `Rachid Berrada Portfolio`
   - Reporting time zone and currency: set to whatever is most relevant to Rachid's primary market (see BRAND_SYSTEM.md §5 for target markets) — this only affects how GA4 displays dates/amounts, it can be changed later.
4. Fill in basic business information when prompted (industry category, business size) — this only affects Google's default report suggestions, not tracking behavior.
5. Under **Data Streams**, click **Add stream** → **Web**.
   - Website URL: the current live URL, `https://rachid-berrada-portfolio.netlify.app` (update later if/when a custom domain goes live).
   - Stream name: e.g. `Portfolio — Web`.
6. After creating the stream, GA4 shows a **Measurement ID** in the format `G-XXXXXXXXXX`. This is the only value needed for the app integration — copy it.

## 3. Where the Measurement ID goes

- **Local development:** add it to `.env.example` as a documented, empty placeholder (matching the existing style of `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_WHATSAPP_NUMBER` in that file) — e.g. a new line:
  ```
  NEXT_PUBLIC_GA_MEASUREMENT_ID=
  ```
  with a comment explaining it's optional and analytics stays off if it's unset. (Adding this line to `.env.example` is a small, separate, low-risk documentation/config change — not part of the seven docs in this task, and not something to do as a side effect of writing this file.)
- **Production (Netlify):** in the Netlify dashboard, go to **Site configuration → Environment variables**, and add:
  - Key: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
  - Value: the real `G-XXXXXXXXXX` value copied from GA4 in step 2.6 above.
  - Scope: Production (and Deploy Previews / Branch deploys too, if Rachid wants analytics on preview builds — usually not recommended, since it pollutes GA4 data with non-real-visitor traffic from testing).
- After setting the environment variable, trigger a new deploy (environment variable changes on Netlify do not apply to already-built deploys).

## 4. Expected behavior once implemented (for context only)

The application code (implemented separately, not in this document) is expected to:

- Only load the GA4 script when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set and non-empty.
- No-op silently (no console errors, no broken tracking calls) when the variable is unset — the same defensive pattern already used for `LEADS_AUTOMATION_WEBHOOK_URL` in `lead-automation.mts`.
- Never hardcode or fall back to a placeholder/example Measurement ID.

This means: nothing needs to happen in the codebase before Rachid creates the GA4 property. GA4 simply stays inactive until the real ID is set in Netlify.

## 5. Google Search Console — adding the property

1. Go to [search.google.com/search-console](https://search.google.com/search-console) and sign in with the same Google account used for GA4 (recommended, for easier GA4 ↔ Search Console linking later, though not required).
2. Click **Add property**. Two property types are offered:
   - **Domain property** — requires DNS access, verifies the whole domain (all subdomains, http and https). Only usable once a custom domain is purchased and Rachid has access to its DNS settings.
   - **URL-prefix property** — verifies just one URL prefix (e.g. `https://rachid-berrada-portfolio.netlify.app`). This is the one to use **today**, before a custom domain exists. Add a second, domain-level property later once a custom domain is live — Search Console properties are additive, adding one doesn't remove or affect another.
3. Enter the current site URL: `https://rachid-berrada-portfolio.netlify.app`.

## 6. Search Console verification — three options

Pick whichever is easiest given Netlify hosting (no DNS access needed for the site today, since there's no custom domain yet):

### Option A — HTML file upload (simplest for a Netlify site without a custom domain yet)
1. Search Console gives you a file like `google1234567890abcdef.html`.
2. Place that exact file in the project's `public/` directory (so it's served at `https://rachid-berrada-portfolio.netlify.app/google1234567890abcdef.html`) and deploy.
3. Click **Verify** in Search Console.
4. This is a one-time static file — it can be committed to the repo since it contains no secret, only a Google-issued verification token tied to this specific property.

### Option B — DNS TXT record (only once a custom domain exists)
1. Search Console gives you a TXT record value.
2. Add it as a TXT record at the domain registrar's DNS settings for the domain root.
3. DNS propagation can take anywhere from minutes to ~48 hours before **Verify** succeeds.
4. Best long-term option once a domain exists, since it verifies domain-wide rather than one specific URL prefix — but not usable until [DOMAIN_AND_HANDLES.md](./DOMAIN_AND_HANDLES.md)'s domain purchase step is complete.

### Option C — Meta tag (recommended if the app already supports injecting one via env var)
1. Search Console gives you a tag like:
   ```html
   <meta name="google-site-verification" content="AbCdEfGhIjKlMnOpQrStUvWxYz1234567890" />
   ```
2. Only the `content` value (the token) is secret-adjacent enough to keep out of hardcoded source — it should be supplied via an environment variable, e.g. `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, set in Netlify's environment variables the same way as the GA4 Measurement ID in §3 above.
3. The app would then conditionally render the meta tag in `<head>` only when that variable is set (implementation is separate from this document, same pattern as GA4).
4. Click **Verify** in Search Console once the deploy with the meta tag is live.

**Recommendation:** use Option A (HTML file) right now since it requires no code change and no domain, then optionally add Option C later if the app's head-tag injection pattern is already convenient for it. Move to Option B once a custom domain is confirmed, since a domain-level property covers the whole site more durably than a URL-prefix property.

## 7. After verification

- In Search Console, submit the sitemap (if the site has one) under **Sitemaps** — e.g. `https://rachid-berrada-portfolio.netlify.app/sitemap.xml`, if that route exists.
- Revisit both GA4 and Search Console properties once a custom domain is confirmed (see [DOMAIN_AND_HANDLES.md](./DOMAIN_AND_HANDLES.md)) — update the GA4 data stream URL and add a domain-level Search Console property (Option B above) rather than deleting the existing ones.
- This entire setup is independent of, and does not require, the CRM V2 / UTM tracking design in [CRM_V2_SPEC.md](./CRM_V2_SPEC.md) and [UTM_TRACKING_V2.md](./UTM_TRACKING_V2.md) — GA4 will see UTM parameters in its own standard acquisition reports regardless of whether UTM data is ever additionally wired into the lead form payload.
