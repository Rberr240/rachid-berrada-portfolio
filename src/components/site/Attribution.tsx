"use client";

import { useEffect } from "react";
import { ATTRIBUTION_KEY, classifyVisit, withWhatsAppMessage, type Attribution } from "@/lib/attribution";

function readAttribution(): Attribution | null {
  try {
    const raw = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

/** Événement de mesure — ne fait rien tant que Plausible n'est pas activé. */
function track(event: string) {
  window.plausible?.(event);
}

/**
 * 1. Mémorise, pour la session, d'où vient la visite (carte de visite,
 *    organique, direct) — transmis seulement si le formulaire est envoyé.
 * 2. Pour un visiteur venu de la carte de visite, remplace le message
 *    WhatsApp pré-rempli au moment du clic.
 * 3. Mesure les clics de contact à partir des liens eux-mêmes.
 */
export function AttributionTracker({ cardMessage }: { cardMessage: string }) {
  useEffect(() => {
    let attribution = readAttribution();
    if (!attribution) {
      attribution = classifyVisit({
        search: window.location.search,
        referrer: document.referrer,
        host: window.location.hostname,
        pathname: window.location.pathname,
      });
      try {
        window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
      } catch {
        // Stockage indisponible (navigation privée stricte) : sans conséquence.
      }
      if (attribution.channel === "business_card") track("qr_entry");
    }
    const fromCard = attribution.channel === "business_card";

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (href.startsWith("https://wa.me/")) {
        if (fromCard) anchor.href = withWhatsAppMessage(anchor.href, cardMessage);
        track("whatsapp_click");
      } else if (href.startsWith("tel:")) track("phone_click");
      else if (href.startsWith("mailto:")) track("email_click");
      else if (href.endsWith(".vcf")) track("vcard_download");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [cardMessage]);

  return null;
}
