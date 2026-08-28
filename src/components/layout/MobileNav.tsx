"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Languages, Menu, X } from "lucide-react";
import type { NavItem, UiCopy } from "@/data/types";

interface MobileNavProps {
  nav: NavItem[];
  whatsappHref: string;
  email: string;
  copy: UiCopy["nav"];
  localeSwitch: { href: string; label: string };
}

export function MobileNav({ nav, whatsappHref, email, copy, localeSwitch }: MobileNavProps) {
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
                <Link
                  href={localeSwitch.href}
                  onClick={() => setOpen(false)}
                  className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border-strong bg-white/[0.03] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-fg transition-colors hover:border-accent-2/60 hover:text-accent-2"
                >
                  <Languages className="size-3.5" aria-hidden="true" />
                  {localeSwitch.label}
                </Link>

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
                <a href={`mailto:${email}`} className="mt-4 px-3 text-sm text-fg-subtle">
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
