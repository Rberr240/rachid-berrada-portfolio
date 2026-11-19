import type { ProjectStatus } from "@/content/types";

// Le statut est une information, pas une décoration : chaque niveau de
// preuve a sa propre forme, lisible même sans la couleur.
const styles: Record<ProjectStatus, string> = {
  client: "border-gold/60 text-gold",
  demo: "border-accent-text/50 text-accent-text",
  prototype: "border-line-strong text-fg-muted",
  rd: "border-dashed border-line-strong text-fg-muted",
};

export function StatusBadge({ status, label }: { status: ProjectStatus; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.8rem] font-medium ${styles[status]}`}
    >
      <span
        className={`size-1.5 rounded-full ${status === "client" ? "bg-gold" : status === "demo" ? "bg-accent-text" : "bg-fg-subtle"}`}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
