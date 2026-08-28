import { Mail, MapPin, MessageCircle } from "lucide-react";
import type { NavItem, SocialLink, UiCopy } from "@/data/types";
import { GithubIcon } from "@/components/ui/GithubIcon";

interface FooterProps {
  nav: NavItem[];
  socialLinks: SocialLink[];
  name: string;
  monogram: string;
  title: string;
  tagline: string;
  email: string;
  location: string;
  whatsappHref: string;
  copy: UiCopy["footer"];
}

export function Footer({
  nav,
  socialLinks,
  name,
  monogram,
  title,
  tagline,
  email,
  location,
  whatsappHref,
  copy,
}: FooterProps) {
  const year = new Date().getFullYear();
  const github = socialLinks.find((s) => s.label === "GitHub" && s.enabled);

  return (
    <footer className="border-t border-border bg-navy/40">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-lg border border-border-strong bg-surface font-mono text-sm font-bold tracking-tight text-fg">
                {monogram}
              </span>
              <span className="text-sm font-medium tracking-tight text-fg">{name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
              {title}
              <br />
              {tagline}
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-fg-subtle">
              {copy.navHeading}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-fg-subtle">
              {copy.contactHeading}
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  <Mail className="size-4 shrink-0" aria-hidden="true" />
                  {email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
                  {copy.whatsappLabel}
                </a>
              </li>
              {github ? (
                <li>
                  <a
                    href={github.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    <GithubIcon className="size-4 shrink-0" />
                    {copy.githubLabel}
                  </a>
                </li>
              ) : null}
              {location ? (
                <li className="flex items-center gap-2 text-sm text-fg-muted">
                  <MapPin className="size-4 shrink-0" aria-hidden="true" />
                  {location}
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-fg-subtle">
            © {year} {name}. {copy.rights}
          </p>
          <p className="font-mono text-xs uppercase tracking-wider text-fg-subtle">{tagline}</p>
        </div>
      </div>
    </footer>
  );
}
