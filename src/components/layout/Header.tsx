"use client";

import { useMemo, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale, NavItem, UiCopy } from "@/data/types";
import { useHeroScrollProgress, lerp } from "@/lib/useHeroScrollProgress";
import { caseStudyBasePath } from "@/lib/locale-path";
import { MobileNav } from "./MobileNav";

const CASE_STUDY_PATH = /^\/(?:(fr|ar)\/)?realisations\/([^/]+)\/?$/;

export interface LocaleLink {
  code: Locale;
  href: string;
  label: string;
}

/**
 * Les liens reçus du layout ne connaissent que le fallback "page d'accueil"
 * (calculé côté serveur, sans le pathname). Sur une case-study, on préfère
 * rester sur le même projet plutôt que renvoyer vers l'accueil des autres
 * langues — les case studies existent dans les 3 locales avec le même id.
 */
function useResolvedLocaleLinks(localeLinks: LocaleLink[]) {
  const pathname = usePathname();
  return useMemo(() => {
    const match = pathname.match(CASE_STUDY_PATH);
    if (!match) return localeLinks;
    const slug = match[2];
    return localeLinks.map((link) => ({
      ...link,
      href: `${caseStudyBasePath(link.code)}/${slug}`,
    }));
  }, [pathname, localeLinks]);
}

function useActiveSection(nav: NavItem[]) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = nav
      .map((item) => item.href.split("#")[1])
      .filter((id): id is string => Boolean(id));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return active;
}

interface HeaderProps {
  nav: NavItem[];
  monogram: string;
  name: string;
  whatsappHref: string;
  email: string;
  copy: UiCopy["nav"];
  lang: Locale;
  localeLinks: LocaleLink[];
}

export function Header({ nav, monogram, name, whatsappHref, email, copy, lang, localeLinks }: HeaderProps) {
  const progress = useHeroScrollProgress();
  const active = useActiveSection(nav);
  const resolvedLocaleLinks = useResolvedLocaleLinks(localeLinks);

  const outerPadTop = lerp(0, 12, progress);
  const barMaxWidth = lerp(1152, 880, progress);
  const barPadInline = lerp(0, 20, progress);
  const barPadBlock = lerp(16, 10, progress);

  // Le fond opaque/flou doit devenir solide BIEN AVANT la fin de l'animation
  // de forme : sinon, tant qu'il reste translucide, le contenu du Hero qui
  // défile en dessous du header fixe devient visible/peu lisible à travers.
  // On découple donc une progression "opacité" plus rapide de la progression
  // "forme" (largeur/coins/padding), plus lente et continue sur tout le scroll.
  const opacityProgress = Math.min(1, progress * 2.4);
  const bgAlpha = lerp(0, 0.85, opacityProgress);
  const borderAlpha = lerp(0, 0.14, opacityProgress);
  const blurPx = lerp(0, 20, opacityProgress);
  const shadowAlpha = lerp(0, 0.6, opacityProgress);

  return (
    <>
      {/*
        La pilule flottante n'occupe pas toute la largeur : sans ce voile,
        le contenu qui défile dans les marges de part et d'autre resterait
        visible sans obstruction, même une fois la pilule totalement opaque.
      */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-28"
        style={{
          opacity: opacityProgress,
          background: "linear-gradient(to bottom, rgba(2,3,7,0.75) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <header
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 transition-[padding] duration-150 ease-out sm:px-6"
        style={{ paddingTop: outerPadTop }}
      >
        <div
          className="flex w-full items-center justify-between gap-4 rounded-full border transition-[padding,background-color,border-color,box-shadow,backdrop-filter,max-width] duration-150 ease-out"
          style={{
            maxWidth: barMaxWidth,
            paddingInline: barPadInline,
            paddingBlock: barPadBlock,
            backgroundColor: `rgba(2, 3, 7, ${bgAlpha})`,
            borderColor: `rgba(255, 255, 255, ${borderAlpha})`,
            backdropFilter: `blur(${blurPx}px)`,
            WebkitBackdropFilter: `blur(${blurPx}px)`,
            boxShadow: `0 10px 40px -12px rgba(0, 0, 0, ${shadowAlpha})`,
          }}
        >
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-lg border border-border-strong bg-surface font-serif text-base text-fg">
              {monogram}
            </span>
            <span className="hidden text-sm font-medium tracking-tight text-fg sm:block">
              {name}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label={copy.ariaLabel}>
            {nav.map((item) => {
              const hash = item.href.split("#")[1];
              const isActive = Boolean(hash) && hash === active;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors duration-200 lg:px-4 ${
                    isActive ? "text-fg" : "text-fg-muted hover:text-fg"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3 bottom-1 h-px bg-accent-2 transition-opacity duration-200 lg:inset-x-4 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-1 rounded-full border border-border-strong px-1 py-1 lg:flex">
              {resolvedLocaleLinks.map((link) => (
                <Link
                  key={link.code}
                  href={link.href}
                  aria-current={link.code === lang ? "true" : undefined}
                  className={`rounded-full px-2.5 py-1 font-mono text-xs font-medium uppercase tracking-wider transition-colors ${
                    link.code === lang ? "bg-white/[0.06] text-fg" : "text-fg-subtle hover:text-fg"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center justify-center whitespace-nowrap rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-2 lg:inline-flex"
            >
              {copy.ctaLabel}
            </a>
            <MobileNav nav={nav} whatsappHref={whatsappHref} email={email} copy={copy} lang={lang} localeLinks={resolvedLocaleLinks} />
          </div>
        </div>
      </header>
    </>
  );
}
