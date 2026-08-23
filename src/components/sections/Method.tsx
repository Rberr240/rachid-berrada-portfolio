import { Container } from "@/components/ui/Container";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { methodSteps } from "@/data/profile";

export function Method() {
  return (
    <section className="border-t border-border bg-navy/30 py-20 sm:py-28">
      <Container>
        <SectionIndex number="07" label="Ma méthode" />
        <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          Une méthode claire, du besoin à la solution
        </h2>

        <ol className="mt-14 grid gap-0 divide-y divide-border border-y border-border sm:grid-cols-5 sm:divide-x sm:divide-y-0">
          {methodSteps.map((step) => (
            <li key={step.number} className="relative px-0 py-6 sm:px-6 sm:py-0">
              <span className="font-mono text-3xl font-semibold text-accent-2/70">
                {step.number}
              </span>
              <h3 className="mt-4 text-base font-semibold tracking-tight text-fg">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
