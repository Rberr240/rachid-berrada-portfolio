import type { Dictionary } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "./SectionHead";

/** Une vraie séquence : la numérotation est ici une information. */
export function Method({ t }: { t: Dictionary }) {
  const m = t.method;
  return (
    <section id="methode" aria-labelledby="method-title" className="border-t border-line py-20 sm:py-28">
      <Container>
        <SectionHead id="method-title" title={m.title} intro={m.intro} />
        <ol className="mt-14 grid gap-10 md:grid-cols-4 md:gap-8">
          {m.steps.map((step, i) => (
            <li key={step.title} className="relative border-t border-line-strong pt-6">
              <span className="absolute -top-px start-0 h-px w-10 bg-gold" aria-hidden="true" />
              <span className="display block text-5xl text-gold/90" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-fg">{step.title}</h3>
              <p className="mt-2 text-pretty leading-relaxed text-fg-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-12 max-w-2xl text-sm leading-relaxed text-fg-subtle">{m.supportNote}</p>
      </Container>
    </section>
  );
}
