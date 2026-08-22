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
