import type { LegalDoc } from "@/content/types";
import { Container } from "@/components/ui/Container";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <Container className="py-14 sm:py-20">
      <article className="max-w-3xl">
        <h1 className="display text-[2.75rem] text-fg sm:text-6xl">{doc.title}</h1>
        <p className="mt-4 text-fg-subtle">{doc.updated}</p>
        <div className="mt-10 space-y-10">
          {doc.sections.map((section) => (
            <section key={section.heading} className="border-t border-line pt-6">
              <h2 className="text-xl font-semibold text-fg">{section.heading}</h2>
              <div className="mt-3 space-y-3 text-pretty leading-relaxed text-fg-muted">
                {section.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </Container>
  );
}
