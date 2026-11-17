import { LOCALE_COOKIE, readCookie, resolveRootLocale } from "../../src/lib/i18n.ts";

/**
 * Point d'entrée "/" (destination du QR code imprimé) : redirection
 * temporaire vers la page d'accueil localisée.
 *
 * - Pays lu côté serveur via la GeoIP native de Netlify (context.geo),
 *   jamais via le navigateur ni un service tiers. Aucune IP n'est stockée.
 * - Ne s'exécute QUE sur "/" : /fr, /pt, /en, /ar ne sont jamais redirigés,
 *   donc aucune boucle possible.
 * - La query string (UTM, source QR…) est conservée telle quelle.
 * - 302 + Cache-Control: private, no-store : la redirection d'un visiteur
 *   n'est jamais mise en cache ni servie à un autre.
 */

// Sous-ensemble du Context Netlify utilisé ici (évite une dépendance de types).
export interface GeoContext {
  geo?: { country?: { code?: string } };
}

export default function localeRedirect(request: Request, context: GeoContext): Response | undefined {
  if (request.method !== "GET" && request.method !== "HEAD") return undefined;

  const url = new URL(request.url);
  const locale = resolveRootLocale({
    preference: readCookie(request.headers.get("cookie"), LOCALE_COOKIE),
    country: context.geo?.country?.code,
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: `/${locale}${url.search}`,
      "Cache-Control": "private, no-store",
      Vary: "Cookie",
    },
  });
}

// "bypass" : si la fonction échoue, la requête continue vers Next.js, qui
// redirige "/" vers /en (repli anglais, voir next.config.ts).
export const config = { path: "/", onError: "bypass" };
