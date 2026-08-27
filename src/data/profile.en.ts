import type { Profile } from "./types";

/**
 * Contenu anglais — expérience principale (English-first), servie sur /.
 * Traduction fidèle du contenu français historique (profile.fr.ts), sans
 * rien inventer : mêmes faits, mêmes projets, mêmes limites de périmètre.
 */
export const profileEn: Profile = {
  locale: "en",
  siteConfig: {
    name: "Rachid Berrada",
    title: "AI & Digital Solutions Engineer",
    tagline: "Web • AI • Automation",
    monogram: "RB",
    localeTag: "en_US",
    language: "en",

    email: "rachid.berrada20@gmail.com",
    phoneDisplay: "+212 6 48 55 22 22",
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212648552222",
    location: "",
    website:
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000",
    hasConfirmedDomain: Boolean(process.env.NEXT_PUBLIC_SITE_URL),

    whatsappDefaultMessage:
      "Hi Rachid, I came across your work and I'd like to talk about a project.",

    heroHeadline: "I design and build intelligent digital systems, AI automations and custom software for businesses.",
    heroHighlight: "custom software",
    heroSubtitle:
      "Available for international projects and collaborations — web applications, AI automation and custom software for businesses.",

    metaDescription:
      "Rachid Berrada — AI & Digital Solutions Engineer. Web applications, AI automation and custom software for businesses, built end to end from architecture to production.",

    aboutText: [
      "I'm an AI & Digital Solutions Engineer. My work is to understand how a business actually operates, identify what can be improved, then design and build the systems that address that need directly.",
      "My approach combines web and application development, artificial intelligence and automation, with one goal: deliver solutions that are useful, reliable and grounded in how the business really works — not technology for its own sake.",
      "Every project follows the same discipline: understand the real business need, propose a realistic solution, build it properly, test it seriously, then improve it over time.",
    ],

    knowsAbout: [
      "Web development",
      "Custom software applications",
      "Artificial intelligence",
      "Business automation",
      "Business digitalization",
    ],
  },

  nav: [
    { label: "Home", href: "/#accueil" },
    { label: "Services", href: "/#services" },
    { label: "Solutions", href: "/#solutions" },
    { label: "About", href: "/#a-propos" },
    { label: "Work", href: "/#realisations" },
    { label: "Contact", href: "/#contact" },
  ],

  socialLinks: [
    { label: "LinkedIn", href: "", enabled: false },
    { label: "GitHub", href: "https://github.com/Rberr240", enabled: true },
  ],

  services: [
    {
      id: "web",
      icon: "web",
      title: "Web & Digital Experiences",
      description:
        "A site that builds instant credibility and turns visitors into customers.",
      bullets: [
        "Business and marketing websites",
        "Conversion-focused landing pages",
        "Client portals and dashboards",
        "Event websites",
        "Optimization of existing sites",
        "Responsive design and UX/UI improvements",
      ],
      benefits: [
        "Build credibility",
        "Attract new customers",
        "Present your services clearly",
        "Make it easy for people to reach you",
      ],
    },
    {
      id: "app",
      icon: "app",
      title: "Custom Software",
      description:
        "Tools designed around your business, not generic software you have to work around.",
      bullets: [
        "Web applications",
        "Internal tools and staff portals",
        "Owner / client areas",
        "Dashboards and operational platforms",
        "Management systems",
        "Mobile applications where relevant",
      ],
      benefits: [
        "Centralize your information",
        "Increase productivity",
        "Simplify your operations",
        "Reduce manual work",
      ],
    },
    {
      id: "ai",
      icon: "ai",
      title: "AI Systems Engineering",
      description: "AI integrated where it delivers real value — never a gimmick.",
      bullets: [
        "AI assistants and chatbots",
        "Intelligent search",
        "Document processing",
        "AI-assisted content generation",
        "Data analysis",
        "AI model integration and RAG systems",
      ],
      benefits: [
        "Automate repetitive replies",
        "Find information faster",
        "Reduce processing time",
        "Support your team day to day",
      ],
    },
    {
      id: "automation",
      icon: "automation",
      title: "AI & Business Automation",
      description: "Less repetitive work. More time for what actually grows your business.",
      bullets: [
        "Automation of repetitive tasks",
        "Automatic notifications",
        "Document generation",
        "Automated data processing",
        "Integration between tools",
        "Workflows, forms, email, reporting",
      ],
      benefits: [
        "Save valuable time",
        "Reduce manual errors",
        "Make your processes reliable",
        "Free your team from low-value tasks",
      ],
    },
    {
      id: "digital",
      icon: "digital",
      title: "Business Digitalization",
      description:
        "A holistic approach: understand how the business runs, then equip it with the right tools.",
      bullets: [
        "Analysis of current operations",
        "Identifying time sinks",
        "Improvement recommendations",
        "Building the right tools",
        "Centralizing information",
        "Automating the processes that matter",
      ],
      benefits: [
        "A clear view of your priorities",
        "Tools your team actually uses",
        "A gradual, controlled transformation",
        "Ongoing support over time",
      ],
    },
  ],

  problems: [
    {
      question: "You don't have a professional online presence yet?",
      answer: "A site built around your actual business.",
    },
    {
      question: "Your team loses time to spreadsheets, WhatsApp and manual work?",
      answer: "Tools and automations built for how you actually work.",
    },
    {
      question: "Customers always have to call to get basic information?",
      answer: "Forms, portals or assistants that answer for you.",
    },
    {
      question: "Your data is scattered across tools?",
      answer: "Centralized into one interface built for your workflow.",
    },
    {
      question: "You want to use AI but don't know where to start?",
      answer: "A needs analysis, followed by a realistic, useful solution.",
    },
  ],

  industries: [
    {
      id: "restaurants",
      name: "Restaurants / Cafés",
      icon: "restaurant",
      items: [
        "Professional website",
        "Digital menu",
        "QR code",
        "Booking",
        "WhatsApp inquiries",
        "Automation of routine requests",
      ],
    },
    {
      id: "hotels",
      name: "Hotels / Residences",
      icon: "hotel",
      items: [
        "Website",
        "Client area",
        "Service requests",
        "Visitor information",
        "Management tools",
        "Notifications",
      ],
    },
    {
      id: "realestate",
      name: "Real Estate",
      icon: "realestate",
      items: [
        "Property showcases",
        "Prospect forms",
        "Client area",
        "Request management",
        "Contact automation",
      ],
    },
    {
      id: "gyms",
      name: "Gyms & Fitness",
      icon: "gym",
      items: [
        "Memberships",
        "Schedules",
        "Member area",
        "Notifications",
        "Sign-ups",
        "Marketing site",
      ],
    },
    {
      id: "business",
      name: "SMEs / Businesses",
      icon: "business",
      items: [
        "Internal portal",
        "Automation",
        "Dashboards",
        "Lightweight CRM",
        "Document management",
        "AI tools",
      ],
    },
    {
      id: "shops",
      name: "Retail",
      icon: "shop",
      items: [
        "Catalog",
        "Digital presence",
        "WhatsApp inquiries",
        "Forms",
        "Orders or bookings depending on the need",
      ],
    },
  ],

  methodSteps: [
    {
      number: "01",
      title: "Discover",
      description: "Understand the business, users and problem.",
    },
    {
      number: "02",
      title: "Design",
      description: "Define architecture, workflow and product direction.",
    },
    {
      number: "03",
      title: "Build",
      description: "Develop the product and integrations.",
    },
    {
      number: "04",
      title: "Automate",
      description: "Connect tools and eliminate repetitive work.",
    },
    {
      number: "05",
      title: "Deploy",
      description: "Ship to production and validate.",
    },
  ],

  projects: [
    {
      id: "gold-fitness",
      title: "Gold Fitness",
      category: "Digitalization / Website / QR Experience",
      statusLabel: "Live project",
      summary:
        "A mobile-first site designed to be discovered by QR code: calling, WhatsApp and Instagram all one tap away from a physical card.",
      result: "Live, functioning site linked to a physical card via QR code.",
      tags: ["Web", "Mobile First", "QR Code", "GitHub Pages"],
      technologies: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
      image: {
        desktop: "/portfolio/gold-fitness/desktop.webp",
        mobile: "/portfolio/gold-fitness/mobile.webp",
        alt: "Gold Fitness site preview on desktop and mobile",
      },
      links: [
        { label: "View the site", href: "https://gold-fitness.github.io/gold-fitness/", type: "demo" },
        { label: "View the repository", href: "https://github.com/Gold-Fitness/gold-fitness", type: "repo" },
      ],
      placeholder: false,
      caseStudy: {
        heroSubtitle: "A digital experience reachable from a physical card, via QR code.",
        need: [
          "Gold Fitness, a gym based in Martil, needed a simple digital point of contact reachable directly from its physical business card — one location, one straightforward front door.",
          "The goal: a visitor scanning the QR code should land immediately on the information they need, with no navigation or searching required.",
        ],
        solution: [
          "A single mobile-first page, hosted on GitHub Pages.",
          "The main actions are surfaced immediately on arrival: call directly, message on WhatsApp, or open the location in Google Maps.",
          "A second repository (gold-fitness-qr) exists purely as the technical redirect from the physical QR code to this page — together they form one single experience.",
        ],
        experience: [
          "Physical card (QR code) → automatic redirect → Gold Fitness mobile page → call, WhatsApp, Instagram or location in one tap.",
        ],
        features: [
          "Direct action buttons: call, view the gym",
          "Contact block: phone, location (Google Maps), social links",
          "Direct WhatsApp link",
          "Video gallery of the gym",
          "Mobile-first design built for the moment right after scanning the QR code",
        ],
        technologies: [
          { name: "HTML / CSS / JavaScript" },
          { name: "GitHub Pages", note: "static hosting" },
          { name: "gold-fitness-qr", note: "dedicated QR redirect repository" },
        ],
        gallery: [
          { src: "/portfolio/gold-fitness/desktop.webp", alt: "Gold Fitness site shown on desktop" },
          {
            src: "/portfolio/gold-fitness/mobile.webp",
            alt: "Gold Fitness site shown on mobile, the primary format used right after scanning the QR code",
          },
        ],
        metaDescription:
          "Case study: a mobile-first digital experience for Gold Fitness, one gym location reachable by QR code from a physical card.",
      },
    },
    {
      id: "residence-mirador",
      title: "Residence Owner Registration Platform",
      category: "Web Application / Digitalization",
      statusLabel: "Delivered — residence context",
      summary:
        "A secure registration flow letting owners identify themselves with an access code and submit their availability for co-ownership meetings.",
      result:
        "A working registration and data-collection flow, with access-code verification and secure server-side storage.",
      tags: ["Web", "Supabase", "Security"],
      technologies: ["HTML", "CSS", "JavaScript", "Supabase (PostgreSQL)", "Edge Functions (Deno)"],
      links: [],
      placeholder: false,
      caseStudy: {
        heroSubtitle: "A secure owner registration and meeting-coordination system for a residence.",
        need: [
          "A residence (Mirador Golf context) needed to centralize owner registration: identification by a unique code, contact details, meeting availability, and topics owners wanted to propose. This is a registration and meeting-coordination system, not a full property-management platform — no billing or maintenance-ticket features were built.",
        ],
        solution: [
          "A multi-step registration flow that validates the owner's access code server-side before any data is entered.",
          "Data is stored in a PostgreSQL database (Supabase) with Row Level Security, and dedicated server-side functions (Edge Functions) that sign access codes with HMAC rather than comparing them in plain text.",
        ],
        features: [
          "Owner identification via access code",
          "Registration form (contact details, meeting availability, proposed topics)",
          "Explicit consent to data collection",
          "Data verification and writes handled entirely through dedicated server-side functions, with no direct database access from the browser",
        ],
        technologies: [
          { name: "HTML / CSS / JavaScript" },
          { name: "Supabase", note: "PostgreSQL + Edge Functions (Deno)" },
          { name: "Row Level Security" },
          { name: "HMAC-signed access codes" },
        ],
        metaDescription:
          "Case study: a secure owner registration and meeting-coordination system for a residence, with access-code verification on Supabase.",
      },
    },
    {
      id: "gestion-attestations",
      title: "Certificate Management System",
      category: "Full-Stack Application",
      statusLabel: "Technical project",
      summary:
        "Centralized certificate management for students, teachers and interns, with authentication and PDF generation, containerized and wired into CI/CD.",
      result: "A working application with a continuous-integration pipeline (tests and Docker image build on every push).",
      tags: ["React", "Laravel", "Docker", "CI/CD"],
      technologies: ["React", "Vite", "Chakra UI", "Laravel 12", "PHP 8.2", "Sanctum / JWT", "Docker", "GitHub Actions"],
      links: [{ label: "View the repository", href: "https://github.com/Rberr240/gestion-attestations", type: "repo" }],
      placeholder: false,
      caseStudy: {
        heroSubtitle: "A full-stack application to centralize certificate management.",
        need: [
          "An institution manages several profiles (students, teachers, interns) and needs to issue certificates reliably and with a clear audit trail.",
        ],
        solution: [
          "A Laravel backend exposing an authenticated API (Sanctum / JWT), with PDF generation (DOMPDF).",
          "A React frontend (Vite, Chakra UI) consuming that API to manage students, teachers and interns.",
          "A containerized environment with Docker, and a GitHub Actions pipeline running tests and building the image on every push to the main branch.",
        ],
        features: [
          "Authentication (sign in / sign up)",
          "Management of students, teachers and interns",
          "PDF certificate generation",
          "Ready-to-run Docker environment",
          "CI/CD pipeline (automated tests and Docker image build)",
        ],
        technologies: [
          { name: "React", note: "Vite + Chakra UI" },
          { name: "Laravel 12", note: "PHP 8.2, Sanctum / JWT, DOMPDF" },
          { name: "Docker" },
          { name: "GitHub Actions", note: "CI/CD" },
        ],
        metaDescription:
          "Case study: a full-stack React + Laravel application for certificate management, with Docker and a CI/CD pipeline.",
      },
    },
    {
      id: "jarvis",
      title: "JARVIS",
      category: "R&D • Artificial Intelligence",
      statusLabel: "Personal project",
      summary:
        "A personal research project building a multi-model AI orchestrator with vector memory and voice/vision pipelines.",
      result:
        "A working, documented codebase, frozen as a stable base ahead of a new iteration currently in private development.",
      tags: ["Node.js", "LangGraph", "RAG", "R&D"],
      technologies: ["Node.js", "LangChain / LangGraph", "Multi-provider LLMs", "Qdrant", "SQLite"],
      links: [{ label: "View the repository", href: "https://github.com/Rberr240/JARVIS-V2", type: "repo" }],
      placeholder: false,
      caseStudy: {
        heroSubtitle: "A personal, multi-model AI orchestrator with vector memory.",
        need: [
          "A personal R&D project, with no client brief, exploring LLM orchestration, long-term memory and voice/vision interfaces.",
        ],
        solution: [
          "A central orchestrator (LangGraph) routes requests across several model providers (Anthropic, Google Gemini, Groq, OpenAI) depending on the task.",
          "A two-tier memory system: persistent SQLite storage and a Qdrant vector database, with RAG-style indexing and similarity retrieval.",
          "Independent voice (wake-word detection, Whisper transcription, speech synthesis) and vision (screen capture, OCR, image analysis) pipelines, decoupled from the orchestration core.",
          "The architecture is documented — the key decisions (overall architecture, cognitive model, memory system) are written up; the rest of the planned documentation is still in progress.",
        ],
        features: [
          "Multi-model orchestration (LangGraph)",
          "Persistent + vector memory (SQLite, Qdrant) with RAG",
          "Voice pipeline: wake word, transcription, speech synthesis",
          "Vision pipeline: screen capture, OCR, image analysis",
          "Application-level permissions / security portal",
        ],
        technologies: [
          { name: "Node.js" },
          { name: "LangChain / LangGraph" },
          { name: "Multi-LLM", note: "Anthropic, Google, Groq, OpenAI" },
          { name: "Qdrant", note: "vector memory / RAG" },
          { name: "SQLite" },
        ],
        metaDescription:
          "Case study: JARVIS, a personal AI R&D project — multi-model orchestration, vector memory and RAG.",
      },
    },
  ],

  testimonials: [],

  faqs: [
    {
      question: "Do you work with small businesses?",
      answer: "Yes — the solution should scale to fit the size and needs of the business.",
    },
    {
      question: "Can you improve an existing site or application?",
      answer: "Yes, after an audit of what's already there.",
    },
    {
      question: "Can you bring AI into a business?",
      answer: "Yes, wherever AI adds real value to the process.",
    },
    {
      question: "How does a project start?",
      answer: "With a conversation to understand the need.",
    },
    {
      question: "Do you build custom solutions?",
      answer: "Yes.",
    },
    {
      question: "What are your rates?",
      answer:
        "Every project is different: price depends on scope, complexity and timeline. We discuss it together once your need is clear.",
    },
  ],

  projectTypes: [
    "Website",
    "Application",
    "Artificial intelligence",
    "Automation",
    "Digitalization",
    "Other",
  ],

  ui: {
    skipToContent: "Skip to main content",
    nav: {
      ariaLabel: "Main navigation",
      ctaLabel: "Start a project",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    footer: {
      navHeading: "Navigation",
      contactHeading: "Contact",
      whatsappLabel: "WhatsApp",
      githubLabel: "GitHub",
      rights: "All rights reserved.",
    },
    whatsapp: {
      floatingButtonAriaLabel: "Chat on WhatsApp",
      linkAriaLabel: "Chat on WhatsApp",
    },
    hero: {
      ctaPrimary: "Start a project",
      ctaSecondary: "View my work",
      portraitAlt: "Rachid Berrada, AI & Digital Solutions Engineer",
    },
    services: {
      eyebrow: "What I build",
      title: "Solutions built around your business",
      intro:
        "From a marketing site to advanced automation, every solution is built to solve a real problem in your business.",
    },
    problems: {
      eyebrow: "Common situations",
      title: "Real problems, real solutions",
    },
    industries: {
      eyebrow: "Solutions by industry",
      title: "Examples of what I can build for your industry",
      intro:
        "Every industry has its own constraints. Here are concrete directions by business type — adapted to your actual situation from there.",
    },
    projects: {
      eyebrow: "Work",
      title: "Selected work",
      intro:
        "Problem, solution, features and technologies — shown only for what's genuinely verified.",
      viewProject: "View project",
      viewSite: "View the site",
      viewRepo: "View the repository",
      placeholderBadge: "To be completed",
    },
    aiAutomation: { eyebrow: "AI & Automation" },
    method: {
      eyebrow: "My process",
      title: "A clear process, from need to solution",
    },
    about: {
      eyebrow: "About",
      title: "A results-driven approach",
      tags: ["Web Development", "Applications", "Artificial Intelligence", "Automation"],
      githubCta: "See my code on GitHub",
      portraitAlt: "Rachid Berrada, editorial portrait",
    },
    testimonials: {
      eyebrow: "Testimonials",
      title: "What clients say",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Frequently asked questions",
    },
    contact: {
      eyebrow: "Contact",
      titleLines: ["Have a project?", "Let's talk."],
      intro:
        "Whether you already have a clear idea or just a problem to solve, we can start by talking it through.",
      ctaWhatsapp: "Chat on WhatsApp",
      ctaCall: "Call now",
      rowWhatsapp: "WhatsApp",
      rowPhone: "Phone",
      rowEmail: "Email",
      rowLocation: "Location",
      rowSite: "Site",
      formHeading: "Tell me about your project",
      formIntro: "A few details are enough to start the conversation.",
    },
    form: {
      nameLabel: "Name",
      companyLabel: "Company",
      phoneLabel: "Phone / WhatsApp (optional)",
      emailLabel: "Email",
      projectTypeLabel: "Project type",
      messageLabel: "Message",
      messagePlaceholder:
        "Tell me about your project, your business and the problem you need solved.",
      submit: "Send my request",
      successTitle: "Message sent, thank you!",
      successBody:
        "I'll get back to you shortly. For a faster reply, you can also reach me directly on WhatsApp.",
      errorBody:
        "Something went wrong while sending. Please try again or reach me directly on WhatsApp.",
      honeypotLabel: "Leave this empty if you're human",
      nameRequired: "Please enter your name.",
      emailRequired: "Please enter your email.",
      emailInvalid: "That email address doesn't look valid.",
      messageRequired: "Briefly describe your project.",
    },
    caseStudy: {
      titleSuffix: "Case Study",
      back: "Back to work",
      technologies: "Technologies",
      links: "Links",
      noPublicLink:
        "No public link is shared for this project: it handles real data, and the source code stays private as a precaution.",
      similarProjectTitle: "Have something similar in mind?",
      similarProjectBody: "Let's talk about your need and what's realistic to build.",
      ctaWhatsapp: "Chat on WhatsApp",
      need: "The need",
      solution: "The solution",
      experience: "Experience",
      gallery: "Gallery",
      result: "Result",
      qrCardAltPrefix: "Physical card for",
      qrCardAltSuffix: "with QR code",
    },
  },
};
