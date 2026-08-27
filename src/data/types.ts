export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  icon: "web" | "app" | "ai" | "automation" | "digital";
  title: string;
  description: string;
  bullets: string[];
  benefits: string[];
}

export interface ProblemItem {
  question: string;
  answer: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  icon: "restaurant" | "hotel" | "realestate" | "gym" | "business" | "shop";
  items: string[];
}

export interface MethodStep {
  number: string;
  title: string;
  description: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  // Identifie le rôle du lien indépendamment de son libellé traduit (label),
  // pour permettre à l'UI de retrouver "le lien démo" / "le lien repo" sans
  // comparer une chaîne localisée (fragile dès qu'on a plusieurs langues).
  type?: "demo" | "repo";
}

export interface ProjectImage {
  desktop: string;
  mobile: string;
  alt: string;
}

export interface CaseStudy {
  heroSubtitle: string;
  need: string[];
  solution: string[];
  experience?: string[];
  features: string[];
  technologies: { name: string; note?: string }[];
  gallery?: { src: string; alt: string }[];
  metaDescription: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  statusLabel: string;
  summary: string;
  result: string;
  tags: string[];
  technologies: string[];
  image?: ProjectImage;
  links: ProjectLink[];
  placeholder: boolean;
  caseStudy?: CaseStudy;
}

export interface Testimonial {
  name: string;
  role: string;
  company?: string;
  quote: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SocialLink {
  label: string;
  href: string;
  enabled: boolean;
}

export type Locale = "en" | "fr";

/**
 * Toutes les chaînes d'interface qui ne proviennent pas d'un tableau de
 * contenu (services, projects, faqs, ...) et qui sont pourtant en dur dans
 * les composants — regroupées ici pour rester traduisibles par locale sans
 * toucher à la logique/l'animation des composants eux-mêmes.
 */
export interface UiCopy {
  skipToContent: string;
  nav: {
    ariaLabel: string;
    ctaLabel: string;
    openMenu: string;
    closeMenu: string;
  };
  footer: {
    navHeading: string;
    contactHeading: string;
    whatsappLabel: string;
    githubLabel: string;
    rights: string;
  };
  whatsapp: {
    floatingButtonAriaLabel: string;
    linkAriaLabel: string;
  };
  hero: {
    ctaPrimary: string;
    ctaSecondary: string;
    portraitAlt: string;
  };
  services: { eyebrow: string; title: string; intro: string };
  problems: { eyebrow: string; title: string };
  industries: { eyebrow: string; title: string; intro: string };
  projects: {
    eyebrow: string;
    title: string;
    intro: string;
    viewProject: string;
    viewSite: string;
    viewRepo: string;
    placeholderBadge: string;
  };
  aiAutomation: { eyebrow: string };
  method: { eyebrow: string; title: string };
  about: {
    eyebrow: string;
    title: string;
    tags: string[];
    githubCta: string;
    portraitAlt: string;
  };
  testimonials: { eyebrow: string; title: string };
  faq: { eyebrow: string; title: string };
  contact: {
    eyebrow: string;
    titleLines: string[];
    intro: string;
    ctaWhatsapp: string;
    ctaCall: string;
    rowWhatsapp: string;
    rowPhone: string;
    rowEmail: string;
    rowLocation: string;
    rowSite: string;
    formHeading: string;
    formIntro: string;
  };
  form: {
    nameLabel: string;
    companyLabel: string;
    phoneLabel: string;
    emailLabel: string;
    projectTypeLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    successTitle: string;
    successBody: string;
    errorBody: string;
    honeypotLabel: string;
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    messageRequired: string;
  };
  caseStudy: {
    titleSuffix: string;
    back: string;
    technologies: string;
    links: string;
    noPublicLink: string;
    similarProjectTitle: string;
    similarProjectBody: string;
    ctaWhatsapp: string;
    need: string;
    solution: string;
    experience: string;
    gallery: string;
    result: string;
    qrCardAltPrefix: string;
    qrCardAltSuffix: string;
  };
}

export interface Profile {
  locale: Locale;
  siteConfig: {
    name: string;
    title: string;
    tagline: string;
    monogram: string;
    localeTag: string;
    language: Locale;
    email: string;
    phoneDisplay: string;
    whatsappNumber: string;
    location: string;
    website: string;
    hasConfirmedDomain: boolean;
    whatsappDefaultMessage: string;
    heroHeadline: string;
    heroHighlight: string;
    heroSubtitle: string;
    metaDescription: string;
    aboutText: string[];
    knowsAbout: string[];
  };
  nav: NavItem[];
  socialLinks: SocialLink[];
  services: ServiceItem[];
  problems: ProblemItem[];
  industries: IndustryItem[];
  methodSteps: MethodStep[];
  projects: ProjectItem[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
  projectTypes: readonly string[];
  ui: UiCopy;
}
