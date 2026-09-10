"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Languages, Menu, X } from "lucide-react";
import type { Locale, NavItem, UiCopy } from "@/data/types";
import type { LocaleLink } from "./Header";

interface MobileNavProps {
  nav: NavItem[];
  whatsappHref: string;
  email: string;
  copy: UiCopy["nav"];
  lang: Locale;
  localeLinks: LocaleLink[];
}

export function MobileNav({ nav, whatsappHref, email, copy, lang, localeLinks }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? copy.closeMenu : copy.openMenu}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="flex size-10 items-center justify-center rounded-full border border-border-strong text-fg"
      >
        {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
      </button>

      {open
        ? createPortal(
            <div
              id="mobile-menu"
              className="fixed left-0 right-0 top-[68px] z-40 h-[calc(100dvh-68px)] overflow-y-auto bg-ink"
            >
              <div className="flex flex-col gap-1 px-6 py-8">
                <div className="mb-6 inline-flex w-fit items-center gap-1 rounded-full border border-border-strong bg-white/[0.03] p-1">
                  <Languages className="ms-2 size-3.5 shrink-0 text-fg-subtle" aria-hidden="true" />
                  {localeLinks.map((link) => (
                    <Link
                      key={link.code}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={link.code === lang ? "true" : undefined}
                      className={`rounded-full px-2.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider transition-colors ${
                        link.code === lang ? "bg-white/[0.08] text-accent-2" : "text-fg hover:text-accent-2"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <nav className="flex flex-col gap-1" aria-label={copy.ariaLabel}>
                  {nav.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-3.5 text-lg font-medium text-fg transition-colors hover:bg-white/5"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white"
                >
                  {copy.ctaLabel}
                </a>
                <a href={`mailto:${email}`} dir="ltr" className="mt-4 px-3 text-sm text-fg-subtle">
                  {email}
                </a>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
