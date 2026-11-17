"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Globe, Menu, X } from "lucide-react";
import { LOCALE_META, type Locale } from "@/lib/i18n";
import { paths } from "@/lib/paths";
import { button } from "@/components/ui/styles";
import { LanguageLinks, type LanguageLabels } from "./LanguageLinks";

export interface HeaderLabels extends LanguageLabels {
  ariaLabel: string;
  openMenu: string;
  closeMenu: string;
  requestQuote: string;
  items: { id: string; label: string }[];
}

export function Header({ lang, name, monogram, labels }: { lang: Locale; name: string; monogram: string; labels: HeaderLabels }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen && !langOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setLangOpen(false);
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (langOpen && langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    if (menuOpen) document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      document.body.style.overflow = "";
    };
  }, [menuOpen, langOpen]);

  const navLink = "rounded-full px-3 py-2 text-[0.95rem] text-fg-muted transition-colors hover:text-fg";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-8">
        <Link href={paths.home(lang)} className="flex min-h-11 items-center gap-3">
          <span className="display flex size-9 items-center justify-center rounded-lg border border-gold/50 text-[0.95rem] text-gold">
            {monogram}
          </span>
          <span className="whitespace-nowrap text-[0.95rem] font-semibold tracking-tight text-fg">{name}</span>
        </Link>

        <nav aria-label={labels.ariaLabel} className="hidden items-center lg:flex">
          {labels.items.map((item) => (
            <a key={item.id} href={paths.section(lang, item.id)} className={navLink}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div ref={langRef} className="relative">
            <button
              type="button"
              aria-expanded={langOpen}
              aria-controls="language-menu"
              onClick={() => setLangOpen((v) => !v)}
              className="flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-fg-muted transition-colors hover:text-fg"
            >
              <Globe className="size-4" aria-hidden="true" />
              {LOCALE_META[lang].short}
              <span className="sr-only">— {labels.language}</span>
            </button>
            {langOpen ? (
              <div
                id="language-menu"
                className="absolute end-0 top-full mt-2 w-60 rounded-2xl border border-line-strong bg-surface p-2 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.7)]"
              >
                <LanguageLinks lang={lang} labels={labels} onNavigate={() => setLangOpen(false)} />
              </div>
            ) : null}
          </div>

          <div className="hidden lg:block">
            <Link href={paths.quote(lang)} className={`${button.primary} min-h-10 px-4 text-sm`}>
              {labels.requestQuote}
            </Link>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? labels.closeMenu : labels.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex size-11 items-center justify-center rounded-full border border-line-strong text-fg lg:hidden"
          >
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Portail : hors du header (backdrop-filter casserait le position:fixed). */}
      {menuOpen
        ? createPortal(
            <div id="mobile-menu" className="fixed inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] overflow-y-auto bg-ink lg:hidden">
              <nav aria-label={labels.ariaLabel} className="flex flex-col px-4 pt-4">
                {labels.items.map((item) => (
                  <a
                    key={item.id}
                    href={paths.section(lang, item.id)}
                    onClick={() => setMenuOpen(false)}
                    className="display border-b border-line py-4 text-[1.75rem] text-fg"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="px-4 py-6">
                <Link href={paths.quote(lang)} onClick={() => setMenuOpen(false)} className={`${button.primary} w-full`}>
                  {labels.requestQuote}
                </Link>
                <p className="mt-8 px-3 text-sm font-semibold text-fg-subtle">{labels.language}</p>
                <div className="mt-2">
                  <LanguageLinks lang={lang} labels={labels} onNavigate={() => setMenuOpen(false)} />
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}
