import { ArrowRight, ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionIndex } from "@/components/ui/SectionIndex";
import type { ServiceItem, UiCopy } from "@/data/types";

interface AiAutomationProps {
  services: ServiceItem[];
  copy: UiCopy["aiAutomation"];
}

function Node({ service, align }: { service: ServiceItem; align: "start" | "end" }) {
  return (
    <div className={`rounded-2xl border border-border-strong bg-surface/70 px-6 py-5 ${align === "end" ? "sm:text-end" : ""}`}>
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-2">{service.icon}</p>
      <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-fg">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{service.description}</p>
    </div>
  );
}

export function AiAutomation({ services, copy }: AiAutomationProps) {
  // Contenu entièrement dérivé des services "ai" et "automation" du profil
  // localisé — aucune compétence ni label n'est ajouté ici.
  const ai = services.find((s) => s.id === "ai")!;
  const automation = services.find((s) => s.id === "automation")!;

  return (
    <section className="relative overflow-hidden border-t border-border py-20 sm:py-28">
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />

      <Container className="relative">
        <SectionIndex number="06" label={copy.eyebrow} />
        <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          {ai.title} &amp; {automation.title}
        </h2>

        {/* Diagramme "pipeline" : deux blocs de service reliés par une ligne
            unique — relation d'architecture plutôt qu'illustration d'IA
            générique (halo/orbe). */}
        <div className="mt-16 flex flex-col items-stretch gap-0 sm:flex-row sm:items-center">
          <div className="sm:flex-1">
            <Node service={ai} align="start" />
          </div>
          <div className="flex h-10 items-center justify-center sm:h-auto sm:w-16 sm:flex-none">
            <ArrowDown className="size-4 text-accent-2 sm:hidden" aria-hidden="true" />
            <div className="hidden h-px w-full bg-gradient-to-r from-border-strong via-accent-2/50 to-border-strong sm:block" aria-hidden="true" />
            <ArrowRight className="hidden size-4 shrink-0 text-accent-2 rtl:rotate-180 sm:block" aria-hidden="true" />
          </div>
          <div className="sm:flex-1">
            <Node service={automation} align="end" />
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-border pt-10 sm:grid-cols-2">
          <ul className="space-y-2">
            {ai.bullets.map((bullet) => (
              <li key={bullet} className="text-sm leading-relaxed text-fg-muted">
                {bullet}
              </li>
            ))}
          </ul>
          <ul className="space-y-2 sm:text-end">
            {automation.bullets.map((bullet) => (
              <li key={bullet} className="text-sm leading-relaxed text-fg-muted">
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
