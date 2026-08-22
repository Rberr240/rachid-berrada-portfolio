import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { problems } from "@/data/profile";

export function Problems() {
  return (
    <section className="border-t border-border bg-navy/30 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Situations fréquentes"
          title="Des problèmes concrets, des solutions concrètes"
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {problems.map((problem) => (
            <div
              key={problem.question}
              className="rounded-2xl border border-border bg-surface/40 p-6"
            >
              <p className="text-base font-medium leading-snug text-fg">
                {problem.question}
              </p>
              <p className="mt-3 flex items-start gap-2 text-sm font-medium leading-relaxed text-accent-2">
                <ArrowRight className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {problem.answer}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
