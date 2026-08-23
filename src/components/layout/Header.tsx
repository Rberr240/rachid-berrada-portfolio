"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nav, siteConfig } from "@/data/profile";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { MobileNav } from "./MobileNav";

const SCROLL_THRESHOLD = 32;

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrolled;
}

function useActiveSection() {
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
  }, []);

  return active;
}

export function Header() {
  const scrolled = useScrolled();
  const active = useActiveSection();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex justify-center px-4 transition-[padding] duration-500 ease-out sm:px-6 ${
        scrolled ? "pt-3" : "pt-0"
      }`}
    >
      <div
        className={`flex w-full items-center justify-between gap-4 transition-all duration-500 ease-out ${
          scrolled
            ? "max-w-5xl rounded-full border border-white/10 bg-ink/75 px-5 py-2.5 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            : "max-w-6xl rounded-full border border-transparent bg-transparent px-0 py-4"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-lg border border-border-strong bg-surface font-mono text-sm font-bold tracking-tight text-fg">
            {siteConfig.monogram}
          </span>
          <span className="hidden text-sm font-medium tracking-tight text-fg sm:block">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
          {nav.map((item) => {
            const hash = item.href.split("#")[1];
            const isActive = Boolean(hash) && hash === active;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200 lg:px-4 ${
                  isActive ? "bg-white/[0.07] text-fg" : "text-fg-muted hover:text-fg"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center justify-center whitespace-nowrap rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-2 md:inline-flex"
          >
            Discuter de mon projet
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
