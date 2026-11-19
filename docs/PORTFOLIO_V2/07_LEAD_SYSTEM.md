# 07 — Système de leads

## Chaîne

```
/[lang]/devis (QuoteForm) ──POST urlencoded──► Netlify Forms (formulaire "contact")
                                                     │ événement formSubmitted
                                                     ▼
                         netlify/functions/lead-automation.mts
                           validation serveur (src/lib/lead.ts) ──invalide──► journal, pas de relais
                                                     │ valide
                                                     ▼
                         LEADS_AUTOMATION_WEBHOOK_URL (Make) → Google Sheets / Gmail
```

## Champs (`src/lib/lead.ts`, `public/netlify-forms/contact.html`)

| Champ | Statut | Remarque |
|---|---|---|
| `name`, `company`, `email`, `phone`, `projectType`, `message` | historiques | noms inchangés : mapping Make existant préservé |
| `timeline`, `contactPreference`, `budget`, `consent` | nouveaux | `projectType` / `timeline` / `contactPreference` = identifiants stables (`presence`, `1-3-months`, `whatsapp`…) |
| `locale`, `channel`, `sourceDetail`, `entryPage` | nouveaux, cachés | `channel` ∈ `business_card`, `organic`, `direct` |

Payload Make : champs historiques + `status: "Nouveau"`, `source: "Portfolio"`, puis champs V2 et `isTest`. **Colonnes Google Sheets à ajouter à droite** pour les nouveaux champs.

## Règles

- [IMPLEMENTED] Obligatoires : nom, e-mail **ou** téléphone, type de besoin, description ≥ 10 caractères, consentement.
- [IMPLEMENTED] Même fonction de validation dans le navigateur et dans la fonction Netlify (une requête forgée n'est jamais relayée).
- [IMPLEMENTED] Anti-spam : champ piège `bot-field` (`data-netlify-honeypot`) + filtrage Netlify.
- [IMPLEMENTED] Neutralisation tableur (`=`, `+`, `-`, `@` en tête).
- [IMPLEMENTED] Aucun succès affiché si la requête échoue ; le message d'échec propose WhatsApp, téléphone et e-mail.
- [IMPLEMENTED] Demande de test : nom ou message commençant par `[TEST]` → `isTest: true` dans le payload (filtrable dans Make).

## Attribution

- [IMPLEMENTED] `src/lib/attribution.ts` : carte de visite si `utm_source` ∈ {business_card, qr, carte…}, `source=business-card` ou `utm_medium=qr` ; organique si UTM autre ou site référent externe ; sinon direct. Stocké en `sessionStorage` (`rb_attribution`), envoyé seulement avec le formulaire.
- [IMPLEMENTED] Visiteur « carte de visite » : le message WhatsApp devient « …j'ai scanné votre carte de visite… » au moment du clic.
- [BLOCKED] Si le QR imprimé encode l'URL nue, les scans sont classés « direct » : impossible de les distinguer sans changer le QR (interdit). À vérifier en scannant une carte.

## Tests

- [TESTED] `tests/lead.test.ts` : validation, limites, payload, champs historiques, parité stricte entre `LEAD_FIELDS` et le HTML de détection Netlify.
- [TESTED] Navigateur local : erreurs + focus ; échec réseau → message d'échec ; réponse 200 simulée (fetch mocké, aucun envoi) → succès et payload complet.
- [NOT VERIFIED] Réception réelle Netlify Forms → fonction → Make → Sheets/Gmail. Procédure : 11, étape « prévisualisation ».
