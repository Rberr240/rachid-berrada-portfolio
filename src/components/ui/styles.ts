/** Classes partagées des liens-boutons (un seul endroit pour les variantes). */
const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-[0.95rem] font-semibold transition-colors duration-150";

export const button = {
  primary: `${base} bg-accent text-white hover:bg-accent-hover`,
  secondary: `${base} border border-line-strong text-fg hover:border-fg-subtle hover:bg-white/[0.04]`,
};

export const textLink =
  "inline-flex min-h-11 items-center font-medium text-accent-text underline decoration-accent-text/40 underline-offset-4 transition-colors hover:decoration-accent-text";
