import { Container } from "@/components/ui/Container";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { AbstractFigure } from "@/components/ui/AbstractFigure";
import type { ServiceItem, UiCopy } from "@/data/types";

interface AiAutomationProps {
  services: ServiceItem[];
  copy: UiCopy["aiAutomation"];
}

export function AiAutomation({ services, copy }: AiAutomationProps) {
  // Contenu entièrement dérivé des services "ai" et "automation" du profil
  // localisé — aucune compétence ni label n'est ajouté ici.
  const ai = services.find((s) => s.id === "ai")!;
  const automation = services.find((s) => s.id === "automation")!;
  const orbitLabels = [ai.bullets[0], automation.bullets[0], ai.bullets[5], automation.bullets[4]];

  return (
    <section className="relative overflow-hidden border-t border-border py-20 sm:py-28">
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />

      <Container className="relative">
        <SectionIndex number="06" label={copy.eyebrow} />
        <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          {ai.title} &amp; {automation.title}
        </h2>

        <div className="mt-16 grid items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <AbstractFigure className="absolute -inset-6" />
            <div className="halo-blue absolute -inset-10 -z-10" aria-hidden="true" />

            {orbitLabels.map((label, i) => {
              const positions = [
                "left-0 top-6",
                "right-0 top-1/4",
                "left-2 bottom-10",
                "right-2 bottom-0",
              ];
              return (
                <span
                  key={label}
                  aria-hidden="true"
                  className={`absolute hidden max-w-[9.5rem] rounded-full border border-border-strong bg-ink/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-subtle backdrop-blur-sm sm:block ${positions[i]}`}
                >
                  {label}
                </span>
              );
            })}
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-fg">{ai.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{ai.description}</p>
              <ul className="mt-5 space-y-2">
                {ai.bullets.map((bullet) => (
                  <li key={bullet} className="text-sm leading-relaxed text-fg-muted">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-fg">{automation.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{automation.description}</p>
              <ul className="mt-5 space-y-2">
                {automation.bullets.map((bullet) => (
                  <li key={bullet} className="text-sm leading-relaxed text-fg-muted">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
