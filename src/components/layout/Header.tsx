import Link from "next/link";
import { nav, siteConfig } from "@/data/profile";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-[68px] w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-lg border border-border-strong bg-surface font-mono text-sm font-bold tracking-tight text-fg">
            {siteConfig.monogram}
          </span>
          <span className="hidden text-sm font-medium tracking-tight text-fg sm:block">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-2 md:inline-flex"
          >
            Discuter de mon projet
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
