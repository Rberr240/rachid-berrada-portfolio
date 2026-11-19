import type { LegalDoc } from "@/content/types";
import { person } from "@/content/facts";
import { Container } from "@/components/ui/Container";

// Les textes légaux citent {email} et {phone} : les valeurs viennent de
// facts.ts, jamais recopiées dans les quatre dictionnaires.
const tokens: Record<string, string> = { "{email}": person.email, "{phone}": person.phoneDisplay };

function withContacts(text: string) {
  return text.split(/(\{email\}|\{phone\})/).map((part, i) =>
    tokens[part] ? (
      <bdi key={i} dir="ltr">
        {tokens[part]}
      </bdi>
    ) : (
      part
    ),
  );
}

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
                {section.body.map((p, i) => (
                  <p key={i}>{withContacts(p)}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </Container>
  );
}
