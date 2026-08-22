import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { methodSteps } from "@/data/profile";

export function Method() {
  return (
    <section className="border-t border-border bg-navy/30 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Ma méthode"
          title="Une méthode claire, du besoin à la solution"
        />

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {methodSteps.map((step) => (
            <li
              key={step.number}
              className="relative rounded-2xl border border-border bg-surface/40 p-6"
            >
              <span className="font-mono text-2xl font-semibold text-accent-2/70">
                {step.number}
              </span>
              <h3 className="mt-3 text-base font-semibold tracking-tight text-fg">
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
