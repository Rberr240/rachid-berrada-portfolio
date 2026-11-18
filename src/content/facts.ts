import type { ProjectFacts, ServiceId } from "./types";

/**
 * Faits partagés par toutes les langues — à modifier ICI uniquement.
 * Aucune donnée inventée : LinkedIn, adresse et ville restent vides tant
 * qu'elles ne sont pas confirmées par Rachid (les blocs correspondants
 * sont alors masqués automatiquement).
 */
export const person = {
  name: "Rachid Berrada",
  givenName: "Rachid",
  familyName: "Berrada",
  monogram: "RB",
  email: "rachid.berrada20@gmail.com",
  // Numéro professionnel confirmé par Rachid (18/11/2026). Affichage au
  // format national ; format international uniquement pour tel:, wa.me et vCard.
  // Volontairement non surchargeable par variable d'environnement : une
  // ancienne valeur restée sur Netlify ne peut plus réintroduire un autre numéro.
  phoneDisplay: "0661857517",
  phoneE164: "+212661857517",
  whatsappNumber: "212661857517",
  githubUrl: "https://github.com/Rberr240",
  linkedinUrl: "",
  location: "",
  // Photos authentiques fournies par Rachid (dérivés optimisés de
  // hero-rachid.jpg : portrait web, avatar vCard, visuel Open Graph).
  portraits: {
    hero: "/images/rachid/portrait.jpg",
    heroMobile: "/images/rachid/portrait-mobile.jpg",
    square: "/images/rachid/portrait-square.jpg",
    og: "/images/rachid/og-portrait.jpg",
    about: "/images/rachid/about-rachid.jpg",
  },
} as const;

export const SITE_URL_FALLBACK = "https://rachidberrada.com";

/** URL canonique (sans slash final). Le domaine imprimé sur la carte ne change pas. */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || SITE_URL_FALLBACK;
}

export const SERVICE_IDS: ServiceId[] = ["presence", "automation", "apps", "ai"];

/** Ordre d'affichage = ordre de preuve : réalisations client d'abord, R&D en dernier. */
export const projects: ProjectFacts[] = [
  {
    id: "gold-fitness",
    status: "client",
    services: ["presence"],
    stack: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    demoUrl: "https://gold-fitness.github.io/gold-fitness/",
    repoUrl: "https://github.com/Gold-Fitness/gold-fitness",
    screenshots: [
      { src: "/portfolio/gold-fitness/mobile.webp", kind: "mobile" },
      { src: "/portfolio/gold-fitness/desktop.webp", kind: "desktop" },
    ],
  },
  {
    id: "menu-chez-bassou",
    status: "demo",
    services: ["presence"],
    stack: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    demoUrl: "https://gold-fitness.github.io/menu-chez-bassou/",
    repoUrl: "https://github.com/Gold-Fitness/menu-chez-bassou",
    screenshots: [
      { src: "/portfolio/menu-chez-bassou/mobile.webp", kind: "mobile" },
      { src: "/portfolio/menu-chez-bassou/desktop.webp", kind: "desktop" },
    ],
  },
  {
    id: "residence-mirador",
    status: "prototype",
    services: ["apps", "automation"],
    stack: ["HTML", "CSS", "JavaScript", "Supabase", "PostgreSQL", "Edge Functions (Deno)"],
    // Démo publique (rberr240.github.io/mirador-golf-demo) volontairement non
    // liée : ses accents sont corrompus (double encodage UTF-8 dans le dépôt,
    // constaté le 2026-11-17). Ajouter demoUrl + captures une fois corrigée.
  },
  {
    id: "gestion-attestations",
    status: "prototype",
    services: ["apps", "automation"],
    stack: ["React", "Vite", "Chakra UI", "Laravel 12", "PHP 8.2", "Docker", "GitHub Actions"],
    repoUrl: "https://github.com/Rberr240/gestion-attestations",
  },
  {
    id: "jarvis",
    status: "rd",
    services: ["ai"],
    stack: ["Node.js", "LangChain / LangGraph", "Qdrant", "SQLite"],
    repoUrl: "https://github.com/Rberr240/JARVIS-V2",
  },
];

export function getProjectFacts(id: string) {
  return projects.find((p) => p.id === id);
}
