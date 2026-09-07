import { Container } from "@/components/ui/Container";
import { SectionIndex } from "@/components/ui/SectionIndex";
import type { MethodStep, UiCopy } from "@/data/types";

interface MethodProps {
  methodSteps: MethodStep[];
  copy: UiCopy["method"];
}

function StepBody({ step }: { step: MethodStep }) {
  return (
    <div>
      <span className="font-serif text-4xl italic text-accent-2/80 sm:text-5xl">{step.number}</span>
      <h3 className="mt-3 text-base font-semibold tracking-tight text-fg">{step.title}</h3>
      <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-fg-muted">{step.description}</p>
    </div>
  );
}

export function Method({ methodSteps, copy }: MethodProps) {
  return (
    <section className="border-t border-border bg-navy/30 py-20 sm:py-28">
      <Container>
        <SectionIndex number="07" label={copy.eyebrow} />
        <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          {copy.title}
        </h2>

        {/* Mobile / tablette : rail vertical simple */}
        <ol className="relative mt-14 space-y-9 border-l border-border-strong pl-7 sm:hidden">
          {methodSteps.map((step) => (
            <li key={step.number} className="relative">
              <span
                className="absolute -left-[calc(1.75rem_+_4.5px)] top-1.5 size-[9px] rounded-full border-2 border-accent-2 bg-ink"
                aria-hidden="true"
              />
              <StepBody step={step} />
            </li>
          ))}
        </ol>

        {/* Desktop : progression alternée le long d'une ligne horizontale
            unique — chaque étape en dit plus qu'une simple colonne parmi
            cinq identiques. */}
        <ol
          className="mt-24 hidden sm:grid sm:gap-x-8"
          style={{ gridTemplateColumns: `repeat(${methodSteps.length}, minmax(0, 1fr))` }}
        >
          {methodSteps.map((step, i) => (
            <li key={step.number} className="grid grid-rows-[1fr_auto_1fr]">
              <div className="flex items-end pb-8">{i % 2 === 0 ? <StepBody step={step} /> : null}</div>
              <div className="relative flex items-center">
                <span className="h-px w-full bg-border-strong" aria-hidden="true" />
                <span
                  className="absolute left-0 size-[9px] -translate-x-1/2 rounded-full border-2 border-accent-2 bg-ink"
                  aria-hidden="true"
                />
              </div>
              <div className="pt-8">{i % 2 === 1 ? <StepBody step={step} /> : null}</div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
