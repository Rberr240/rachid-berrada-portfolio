export {};

declare global {
  interface Window {
    /** Défini uniquement si Plausible est activé (voir components/site/Analytics.tsx). */
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}
