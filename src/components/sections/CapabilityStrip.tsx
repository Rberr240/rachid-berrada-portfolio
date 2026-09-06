import { Container } from "@/components/ui/Container";
import { tagLabel, type CapabilityFamilyId, type ProjectItem, type ProjectTag, type UiCopy } from "@/data/types";

interface CapabilityStripProps {
  copy: UiCopy["capabilities"];
  projects: ProjectItem[];
}

type FeaturedTag = Exclude<ProjectTag, string>;

function isFeatured(tag: ProjectTag): tag is FeaturedTag {
  return typeof tag !== "string";
}

const MAX_ITEMS_PER_GROUP = 2;

/**
 * Chaque nom affiché ici vient directement de projects[].tags — un tag
 * marqué `featured` (voir profile.*.ts) y est écrit une seule fois dans
 * tout le codebase. Rien n'est retapé : un tag renommé ou retiré change
 * automatiquement, ou vide, le groupe correspondant.
 */
function groupItems(familyId: CapabilityFamilyId, projects: ProjectItem[]): string[] {
  return projects
    .filter((project) => !project.placeholder)
    .flatMap((project) => project.tags)
    .filter(isFeatured)
    .filter((tag) => tag.featured === familyId)
    .sort((a, b) => a.order - b.order)
    .map(tagLabel)
    .slice(0, MAX_ITEMS_PER_GROUP);
}

export function CapabilityStrip({ copy, projects }: CapabilityStripProps) {
  return (
    <div className="border-t border-border py-7 sm:py-8">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-8 sm:gap-y-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
            {copy.intro}
          </p>
          {copy.groups.map((group) => {
            const items = groupItems(group.id, projects);
            if (items.length === 0) return null;
            return (
              <div
                key={group.id}
                className="flex flex-wrap items-baseline gap-x-2 sm:border-l sm:border-border sm:pl-8"
              >
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent-2">
                  {group.label}
                </span>
                <span className="text-sm text-fg-muted">{items.join(", ")}</span>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
