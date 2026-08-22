import type { ReactNode } from "react";
import { Mail, MapPin, MessageCircle, Globe } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { ProjectForm } from "@/components/forms/ProjectForm";
import { siteConfig } from "@/data/profile";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-[68px] border-t border-border bg-navy/30 py-20 sm:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div>
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent-2">
              Contact
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              Vous avez un projet ? Parlons-en.
            </h2>
            <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-fg-muted">
              Que vous ayez déjà une idée précise ou simplement un problème à résoudre,
              nous pouvons commencer par en discuter.
            </p>

            <div className="mt-8">
              <CtaLink href={getWhatsAppLink()} variant="primary">
                Discuter sur WhatsApp
              </CtaLink>
            </div>

            <div className="mt-10 space-y-5 border-t border-border pt-8">
              <ContactRow icon={MessageCircle} label="WhatsApp">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-fg"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </ContactRow>
              <ContactRow icon={Mail} label="Email">
                <a href={`mailto:${siteConfig.email}`} className="hover:text-fg">
                  {siteConfig.email}
                </a>
              </ContactRow>
              {siteConfig.location ? (
                <ContactRow icon={MapPin} label="Localisation">
                  {siteConfig.location}
                </ContactRow>
              ) : null}
              {siteConfig.hasConfirmedDomain ? (
                <ContactRow icon={Globe} label="Site">
                  {siteConfig.website.replace(/^https?:\/\//, "")}
                </ContactRow>
              ) : null}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface/60 p-6 sm:p-8">
            <h3 className="mb-1 text-lg font-semibold tracking-tight text-fg">
              Parlez-moi de votre projet
            </h3>
            <p className="mb-6 text-sm text-fg-muted">
              Quelques informations suffisent pour démarrer la discussion.
            </p>
            <ProjectForm />
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
