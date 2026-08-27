import type { ReactNode } from "react";
import { Mail, MapPin, MessageCircle, Phone, Globe, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { ProjectForm } from "@/components/forms/ProjectForm";
import type { Profile, UiCopy } from "@/data/types";

interface ContactProps {
  siteConfig: Profile["siteConfig"];
  whatsappHref: string;
  copy: UiCopy["contact"];
  formCopy: UiCopy["form"];
  projectTypes: readonly string[];
}

export function Contact({ siteConfig, whatsappHref, copy, formCopy, projectTypes }: ContactProps) {
  const phoneHref = `tel:+${siteConfig.whatsappNumber}`;

  return (
    <section id="contact" className="scroll-mt-[68px] border-t border-border py-20 sm:py-28">
      <Container>
        <SectionIndex number="10" label={copy.eyebrow} />

        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div>
            <h2 className="text-balance text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-fg sm:text-5xl">
              {copy.titleLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < copy.titleLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </h2>
            <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-fg-muted">
              {copy.intro}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CtaLink href={whatsappHref} variant="primary">
                {copy.ctaWhatsapp}
              </CtaLink>
              <a
                href={phoneHref}
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-border-strong bg-white/[0.02] px-6 py-3.5 text-sm font-semibold text-fg transition-all duration-200 hover:border-accent-2/60 hover:bg-white/[0.05] active:scale-[0.98]"
              >
                {copy.ctaCall}
                <ArrowUpRight
                  className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>

            <div className="mt-10 space-y-5 border-t border-border pt-8">
              <ContactRow icon={MessageCircle} label={copy.rowWhatsapp}>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                  {siteConfig.phoneDisplay}
                </a>
              </ContactRow>
              <ContactRow icon={Phone} label={copy.rowPhone}>
                <a href={phoneHref} className="hover:text-fg">
                  {siteConfig.phoneDisplay}
                </a>
              </ContactRow>
              <ContactRow icon={Mail} label={copy.rowEmail}>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-fg">
                  {siteConfig.email}
                </a>
              </ContactRow>
              {siteConfig.location ? (
                <ContactRow icon={MapPin} label={copy.rowLocation}>
                  {siteConfig.location}
                </ContactRow>
              ) : null}
              {siteConfig.hasConfirmedDomain ? (
                <ContactRow icon={Globe} label={copy.rowSite}>
                  {siteConfig.website.replace(/^https?:\/\//, "")}
                </ContactRow>
              ) : null}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface/60 p-6 sm:p-8">
            <h3 className="mb-1 text-lg font-semibold tracking-tight text-fg">{copy.formHeading}</h3>
            <p className="mb-6 text-sm text-fg-muted">{copy.formIntro}</p>
            <ProjectForm projectTypes={projectTypes} copy={formCopy} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Mail;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border-strong bg-white/[0.03] text-accent-2">
        <Icon className="size-4" aria-hidden="true" />
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-fg-subtle">{label}</p>
        <p className="text-sm font-medium text-fg-muted">{children}</p>
      </div>
    </div>
  );
}
