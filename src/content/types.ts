export type ServiceId = "presence" | "automation" | "apps" | "ai";
export type ProjectId =
  | "gold-fitness"
  | "menu-chez-bassou"
  | "residence-mirador"
  | "gestion-attestations"
  | "jarvis";

/**
 * Statut honnête d'un projet, affiché visiblement :
 * - client  : réalisé pour un client réel et en ligne
 * - demo    : démonstration / concept publié, pas une livraison client confirmée
 * - prototype : prototype technique fonctionnel, non exploité en production
 * - rd      : projet personnel de recherche et développement
 */
export type ProjectStatus = "client" | "demo" | "prototype" | "rd";

export interface ProjectFacts {
  id: ProjectId;
  status: ProjectStatus;
  services: ServiceId[];
  stack: string[];
  demoUrl?: string;
  repoUrl?: string;
  /** Captures réelles uniquement. Absent = aucun visuel (jamais de maquette inventée). */
  screenshots?: { src: string; kind: "desktop" | "mobile" }[];
}

export interface ServiceText {
  title: string;
  problem: string;
  audience: string;
  deliverable: string;
  included: string[];
  /** Précision d'honnêteté affichée (ex. : offre en phase pilote). */
  note?: string;
}

export interface ProjectText {
  title: string;
  category: string;
  tagline: string;
  summary: string;
  context: string;
  role: string;
  problem: string[];
  solution: string[];
  features: string[];
  evidence: string[];
  limitations: string[];
  flow?: string[];
  screenshotAlt?: { desktop?: string; mobile?: string };
  metaDescription: string;
}

export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalDoc {
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
}

export interface Dictionary {
  meta: { title: string; description: string; keywords: string[] };
  person: {
    title: string;
    valueProp: string;
    portraitAlt: string;
    aboutPortraitAlt: string;
  };
  common: {
    skipToContent: string;
    whatsapp: string;
    call: string;
    email: string;
    saveContact: string;
    share: string;
    shareCopied: string;
    shareFailed: string;
    requestQuote: string;
    github: string;
    externalHint: string;
  };
  nav: {
    ariaLabel: string;
    services: string;
    work: string;
    method: string;
    about: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
    language: string;
    autoLanguage: string;
    autoLanguageHint: string;
  };
  whatsapp: {
    defaultMessage: string;
    cardMessage: string;
    quoteMessage: string;
    floatingLabel: string;
  };
  hero: {
    viewWork: string;
    viewServices: string;
    secondaryAriaLabel: string;
  };
  card: {
    metaTitle: string;
    metaDescription: string;
    fullSite: string;
  };
  services: {
    title: string;
    intro: string;
    audienceLabel: string;
    deliverableLabel: string;
    includedLabel: string;
    proofLabel: string;
    cta: string;
    items: Record<ServiceId, ServiceText>;
  };
  problems: {
    title: string;
    intro: string;
    items: { situation: string; solution: string; service: ServiceId }[];
  };
  work: {
    title: string;
    intro: string;
    viewCase: string;
    viewDemo: string;
    viewRepo: string;
    roleLabel: string;
    stackLabel: string;
    status: Record<ProjectStatus, string>;
  };
  projects: Record<ProjectId, ProjectText>;
  method: {
    title: string;
    intro: string;
    steps: { title: string; body: string }[];
    supportNote: string;
  };
  about: {
    title: string;
    paragraphs: string[];
    githubCta: string;
  };
  contact: {
    title: string;
    intro: string;
    quoteTitle: string;
    quoteBody: string;
  };
  quote: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    intro: string;
    directTitle: string;
    directBody: string;
    fields: {
      name: string;
      company: string;
      email: string;
      phone: string;
      contactHint: string;
      service: string;
      description: string;
      descriptionPlaceholder: string;
      timeline: string;
      contactPreference: string;
      budget: string;
      budgetPlaceholder: string;
      optional: string;
      choose: string;
      consent: string;
      privacyLink: string;
      honeypot: string;
    };
    options: {
      service: Record<ServiceId | "other", string>;
      timeline: Record<"asap" | "1-3-months" | "3-plus-months" | "unsure", string>;
      contactPreference: Record<"whatsapp" | "phone" | "email", string>;
    };
    errors: {
      name: string;
      contact: string;
      email: string;
      phone: string;
      service: string;
      description: string;
      consent: string;
      summary: string;
    };
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    failure: string;
    faqTitle: string;
    faq: { question: string; answer: string }[];
  };
  caseStudy: {
    back: string;
    statusLabel: string;
    contextLabel: string;
    roleLabel: string;
    problemLabel: string;
    solutionLabel: string;
    featuresLabel: string;
    flowLabel: string;
    evidenceLabel: string;
    limitationsLabel: string;
    stackLabel: string;
    linksLabel: string;
    noLinks: string;
    screenshotsLabel: string;
    noScreenshots: string;
    ctaTitle: string;
    ctaBody: string;
    otherProjects: string;
  };
  footer: {
    rights: string;
    legal: string;
    privacy: string;
    languages: string;
  };
  legal: { notice: LegalDoc; privacy: LegalDoc };
}
