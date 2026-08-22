import type { ReactNode } from "react";

export function Badge({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "accent" | "warning";
}) {
  const tones: Record<string, string> = {
    default: "border-border-strong text-fg-muted",
    accent: "border-accent-2/40 text-accent-2 bg-accent-soft",
    warning: "border-gold/40 text-gold bg-gold/10",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
