/**
 * Attribution de la visite, calculée dans le navigateur à l'arrivée.
 * Aucune donnée personnelle : seulement le canal, un détail court
 * (utm_source ou domaine référent) et la page d'entrée.
 */

export type Channel = "business_card" | "organic" | "direct";

export interface Attribution {
  channel: Channel;
  detail: string;
  entryPage: string;
}

export const ATTRIBUTION_KEY = "rb_attribution";

const CARD_SOURCES = new Set(["business_card", "business-card", "businesscard", "card", "carte", "qr", "qrcode", "qr_code"]);

export function classifyVisit(input: {
  search: string;
  referrer: string;
  host: string;
  pathname: string;
}): Attribution {
  const params = new URLSearchParams(input.search);
  const utmSource = (params.get("utm_source") ?? "").toLowerCase();
  const utmMedium = (params.get("utm_medium") ?? "").toLowerCase();
  const source = (params.get("source") ?? "").toLowerCase();
  const entryPage = input.pathname.slice(0, 300);

  if (CARD_SOURCES.has(utmSource) || CARD_SOURCES.has(source) || utmMedium === "qr") {
    return { channel: "business_card", detail: utmSource || source || "qr", entryPage };
  }

  let referrerHost = "";
  try {
    referrerHost = input.referrer ? new URL(input.referrer).hostname : "";
  } catch {
    referrerHost = "";
  }

  if (utmSource) return { channel: "organic", detail: `utm:${utmSource}`.slice(0, 200), entryPage };
  if (referrerHost && referrerHost !== input.host) {
    return { channel: "organic", detail: `ref:${referrerHost}`.slice(0, 200), entryPage };
  }
  return { channel: "direct", detail: "", entryPage };
}

/** Remplace le message pré-rempli d'un lien wa.me. */
export function withWhatsAppMessage(href: string, message: string): string {
  const url = new URL(href);
  url.searchParams.set("text", message);
  return url.toString();
}
