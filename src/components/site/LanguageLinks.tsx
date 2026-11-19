"use client";

import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
import { LOCALES, LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, LOCALE_META, type Locale } from "@/lib/i18n";
import { switchLocalePath } from "@/lib/paths";

/** Mémorise (ou oublie) un choix de langue manuel — cookie first-party minimal. */
function writeLocaleCookie(value: Locale | null) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = value
    ? `${LOCALE_COOKIE}=${value}; Path=/; Max-Age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax${secure}`
    : `${LOCALE_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
}

export interface LanguageLabels {
  language: string;
  autoLanguage: string;
  autoLanguageHint: string;
}

/**
 * Liens de langue : navigation complète (pas de transition client) pour que
 * <html lang/dir> et les polices changent proprement. « Automatique »
 * supprime le cookie et repasse par "/" (détection par pays).
 */
export function LanguageLinks({ lang, labels, onNavigate }: { lang: Locale; labels: LanguageLabels; onNavigate?: () => void }) {
  const pathname = usePathname() || `/${lang}`;
  const item =
    "flex min-h-11 items-center justify-between gap-4 rounded-xl px-3 text-[0.95rem] transition-colors hover:bg-white/[0.06]";

  return (
    <ul className="space-y-0.5">
      {LOCALES.map((code) => (
        <li key={code}>
          <a
            href={switchLocalePath(pathname, code)}
            hrefLang={LOCALE_META[code].htmlLang}
            lang={LOCALE_META[code].htmlLang}
            aria-current={code === lang ? "true" : undefined}
            onClick={() => {
              writeLocaleCookie(code);
              onNavigate?.();
            }}
            className={`${item} ${code === lang ? "text-fg" : "text-fg-muted"}`}
          >
            {LOCALE_META[code].label}
            {code === lang ? <Check className="size-4 text-accent-text" aria-hidden="true" /> : null}
          </a>
        </li>
      ))}
      <li className="mt-1 border-t border-line pt-1">
        {/* Navigation complète obligatoire : "/" doit repasser par l'Edge Function GeoIP. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/"
          onClick={() => {
            writeLocaleCookie(null);
            onNavigate?.();
          }}
          className={`${item} text-fg-muted`}
        >
          <span>
            {labels.autoLanguage}
            <span className="block text-xs text-fg-subtle">{labels.autoLanguageHint}</span>
          </span>
        </a>
      </li>
    </ul>
  );
}
