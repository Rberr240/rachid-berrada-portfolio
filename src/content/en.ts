import type { Dictionary } from "./types";

export const en: Dictionary = {
  meta: {
    title: "Rachid Berrada — Web & Digital Solutions Developer",
    description:
      "Mobile-first websites, automation and custom web applications for shops, restaurants and small businesses. Verifiable work, a clear process and direct contact.",
    keywords: [
      "Rachid Berrada",
      "web developer",
      "business website",
      "digital menu",
      "QR code",
      "business automation",
      "custom web application",
    ],
  },

  person: {
    title: "Web & digital solutions developer",
    valueProp:
      "I help businesses grow their digital presence and automate their operations with web solutions built around their actual needs.",
    portraitAlt: "Portrait of Rachid Berrada in a light suit",
    aboutPortraitAlt: "Rachid Berrada, profile portrait",
  },

  common: {
    skipToContent: "Skip to content",
    whatsapp: "WhatsApp",
    call: "Call",
    email: "Email",
    saveContact: "Save contact",
    share: "Share",
    shareCopied: "Link copied",
    shareFailed: "Couldn’t copy — the address is rachidberrada.com",
    requestQuote: "Request a quote",
    github: "GitHub",
    externalHint: "(opens in a new tab)",
  },

  nav: {
    ariaLabel: "Main navigation",
    services: "Services",
    work: "Work",
    method: "Process",
    about: "About",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    autoLanguage: "Automatic",
    autoLanguageHint: "based on your country",
  },

  whatsapp: {
    defaultMessage:
      "Hello Rachid, I found your website rachidberrada.com and I’d like to talk about a project.",
    cardMessage: "Hello Rachid, I scanned your business card and I’d like to talk about a project.",
    quoteMessage: "Hello Rachid, I’d like a quote for a project.",
    floatingLabel: "Message Rachid on WhatsApp",
  },

  hero: {
    viewWork: "See the work",
    viewServices: "Services",
    secondaryAriaLabel: "Quick links",
  },

  card: {
    metaTitle: "Contact card",
    metaDescription:
      "Rachid Berrada’s contact details: WhatsApp, phone, email and a contact card to save.",
    fullSite: "Visit the full website",
  },

  services: {
    title: "What I do for businesses",
    intro:
      "Four service families, each tied to a concrete problem and, where it exists, to a project you can check for yourself.",
    audienceLabel: "Who it’s for",
    deliverableLabel: "What you get",
    includedLabel: "Can include",
    proofLabel: "Example:",
    cta: "Discuss this need",
    items: {
      presence: {
        title: "Digital presence",
        problem:
          "Customers look you up on their phone and find nothing clear: no website, scattered information, a menu or catalog they can’t reach.",
        audience: "Shops, restaurants, gyms, independent professionals and small businesses.",
        deliverable:
          "A professional, mobile-first website where calling, messaging on WhatsApp or finding your address takes one tap.",
        included: [
          "Business website or landing page",
          "Digital menu or product catalog",
          "Business-card QR code linked to the site",
          "Publishing, hosting and domain name",
        ],
      },
      automation: {
        title: "Business automation",
        problem:
          "Requests come in through WhatsApp, email and phone calls, get copied into Excel by hand, and some get lost.",
        audience: "Businesses that handle requests, sign-ups or documents repetitively.",
        deliverable:
          "Forms and automated workflows that centralize requests, notify the right person and produce the documents you need.",
        included: [
          "Forms and request collection",
          "Email notifications",
          "Sync to a spreadsheet or database",
          "PDF document generation",
        ],
        note: "My references in this area are technical prototypes: every automation starts with a clearly scoped, tested pilot.",
      },
      apps: {
        title: "Custom web applications",
        problem:
          "Your operations run on shared spreadsheets, notebooks or generic tools that don’t match the way you work.",
        audience:
          "Small and mid-sized companies, residences, schools and teams that manage business data.",
        deliverable:
          "A web application built for you: a client or member portal, a dashboard, an internal tool connected to a database.",
        included: [
          "Needs and data analysis",
          "User accounts and secure access",
          "Database and dashboards",
          "Deployment and documentation",
        ],
      },
      ai: {
        title: "AI and pilot projects",
        problem:
          "You keep hearing about AI but don’t know what it can actually do for your business, or where to start.",
        audience: "Businesses that want to test one specific use case before investing.",
        deliverable:
          "A small pilot you can evaluate: an assistant, search across your documents, or an AI API added to an existing tool.",
        included: [
          "Choosing a realistic use case",
          "A prototype on data you provide, with your consent",
          "AI API integration",
          "A clear review: what works and what doesn’t",
        ],
        note: "Pilot-stage offer: my AI experience comes from personal R&D projects, not yet from client deployments.",
      },
    },
  },

  problems: {
    title: "Problems I solve",
    intro: "Everyday problems, and the simplest answer that works.",
    items: [
      {
        situation: "“People keep asking for my opening hours, prices or address.”",
        solution: "A mobile page that answers those questions, linked to your QR code and WhatsApp.",
        service: "presence",
      },
      {
        situation: "“My printed menu is hard to keep up to date.”",
        solution: "A digital menu opened from a QR code, updated without reprinting anything.",
        service: "presence",
      },
      {
        situation: "“Customer requests get lost between WhatsApp, calls and emails.”",
        solution: "One form that centralizes requests and notifies you each time.",
        service: "automation",
      },
      {
        situation: "“My team spends hours copying data into Excel.”",
        solution: "An internal tool or an automation that removes the double entry.",
        service: "apps",
      },
      {
        situation: "“I’d like to use AI, but I don’t know if it’s worth it.”",
        solution: "A short pilot on one specific case, so you decide based on facts.",
        service: "ai",
      },
    ],
  },

  work: {
    title: "Selected work",
    intro:
      "Each project shows its real status: client work, demo, prototype or personal R&D. Images are real screenshots; with no screenshot, there is no image.",
    viewCase: "Read the case study",
    viewDemo: "View live",
    viewRepo: "View the code",
    roleLabel: "Role",
    stackLabel: "Technologies",
    status: {
      client: "Live client project",
      demo: "Live demo",
      prototype: "Technical prototype",
      rd: "Personal R&D",
    },
  },

  projects: {
    "gold-fitness": {
      title: "Gold Fitness",
      category: "Mobile website and QR code for a gym",
      tagline: "A mobile page linked to the gym’s business card through a QR code.",
      summary:
        "A mobile-first website for a gym in Martil: call, WhatsApp, Instagram and directions are one tap away after scanning the card.",
      context: "Built for Gold Fitness, a gym in Martil, Morocco. The site is live.",
      role: "Design, development, publishing and QR code redirect.",
      problem: [
        "The gym needed a simple digital point of contact, reachable straight from its printed business card.",
        "Someone scanning the QR code should find the useful information immediately, without complicated navigation.",
      ],
      solution: [
        "A single mobile-first page hosted on GitHub Pages.",
        "The main actions are visible on arrival: call, message on WhatsApp, open directions in Google Maps.",
        "A second repository acts only as a technical redirect between the printed QR code and the page, so the card never needs reprinting when the page changes.",
      ],
      features: [
        "Call and WhatsApp buttons",
        "Google Maps location and social links",
        "Video gallery of the gym",
        "Layout designed for viewing right after a scan",
      ],
      evidence: ["Public live website", "Public source code on GitHub", "Screenshots taken from the live site"],
      limitations: [
        "Static site: content is updated by editing the code.",
        "No audience measurement is in place, so business impact is not quantified.",
      ],
      flow: ["Card with QR code", "Redirect", "Mobile page", "Call, WhatsApp or directions"],
      screenshotAlt: {
        mobile: "Gold Fitness mobile page with call and contact buttons",
        desktop: "Gold Fitness website on a desktop screen",
      },
      metaDescription:
        "Case study: a mobile-first website for Gold Fitness gym, linked to its business card through a QR code.",
    },
    "menu-chez-bassou": {
      title: "Menu Chez Bassou",
      category: "Digital menu for a restaurant",
      tagline: "A menu built for phones, with filters, search and WhatsApp contact.",
      summary:
        "A responsive digital menu demo: category filters, instant dish search, and orders or questions sent straight through WhatsApp.",
      context:
        "A demo built for a restaurant concept (“Chez Bassou — La Ferme de Loisirs”). It is not a confirmed client delivery: some contact details shown are placeholder values.",
      role: "Design, development and publishing.",
      problem: [
        "A restaurant menu has to open quickly on a phone, for example from a QR code on the table, and stay readable as the menu grows.",
      ],
      solution: [
        "A static page in plain HTML, CSS and JavaScript, with no framework, hosted on GitHub Pages.",
        "A sticky filter bar jumps straight to a category, and a search field filters dishes as you type.",
        "A WhatsApp button opens a pre-filled conversation from the menu.",
      ],
      features: [
        "Category filters and live search",
        "Price-by-weight table for grilled dishes",
        "Call and WhatsApp buttons",
        "Responsive layout for phone, tablet and desktop",
      ],
      evidence: ["Public live demo", "Public source code on GitHub"],
      limitations: [
        "Placeholder phone number and social links, to be replaced for real use.",
        "Dishes and prices are written in the code: there is no admin interface.",
      ],
      flow: ["QR code on the table", "Digital menu", "Filter or search", "WhatsApp contact"],
      screenshotAlt: {
        mobile: "Menu Chez Bassou on mobile with category filters",
        desktop: "Menu Chez Bassou on a desktop screen",
      },
      metaDescription:
        "Case study: a responsive digital menu demo with filters, search and WhatsApp contact.",
    },
    "residence-mirador": {
      title: "Residence owner portal",
      category: "Secure sign-up web application",
      tagline: "A secure sign-up flow for the owners of a residential complex.",
      summary:
        "A prototype that lets owners identify themselves with an access code and submit their details and availability for owners’ meetings.",
      context:
        "A prototype developed for a residential complex (Mirador Golf). Production use is not confirmed.",
      role: "Design and development of the interface and the Supabase back end.",
      problem: [
        "The residence needed to centralize owner registration: a unique access code, contact details, meeting availability and topics to raise.",
      ],
      solution: [
        "A multi-step flow that checks the access code on the server before any data is entered.",
        "Data is stored in PostgreSQL (Supabase) with row-level security, and written only by server functions that sign access codes instead of comparing them in plain text.",
      ],
      features: [
        "Owner access-code check",
        "Form for contact details, availability and proposed topics",
        "Explicit consent to data collection",
        "No direct database access from the browser",
      ],
      evidence: ["Sign-up flow verified in the source code", "Six SQL migrations and two server functions"],
      limitations: [
        "The planned admin area has not been built yet.",
        "Source code is not published: it describes a system that may handle personal data.",
        "No screenshot or public demo is presented for now.",
      ],
      metaDescription:
        "Case study: a secure sign-up prototype for residence owners, built with Supabase and access-code verification.",
    },
    "gestion-attestations": {
      title: "Certificate management",
      category: "Full-stack application with document generation",
      tagline: "An application to centralize and produce an institution’s certificates.",
      summary:
        "Manages students, teachers and interns with authentication and PDF certificate generation, containerized and tested automatically.",
      context: "A full-stack technical prototype. It is not used in production.",
      role: "Full-stack development: Laravel API, React interface, Docker containers and continuous integration.",
      problem: [
        "An institution manages several profiles (students, teachers, interns) and must issue certificates reliably and traceably.",
      ],
      solution: [
        "An authenticated Laravel API (Sanctum / JWT) that generates the PDF documents.",
        "A React interface (Vite, Chakra UI) to manage the different profiles.",
        "A Docker environment and a GitHub Actions pipeline that runs tests and builds the image on every push.",
      ],
      features: [
        "Sign-in and registration",
        "Student, teacher and intern management",
        "PDF certificate generation",
        "Automated tests and Docker builds",
      ],
      evidence: ["Public source code on GitHub", "Continuous integration pipeline in the repository"],
      limitations: [
        "No live demo.",
        "Repository documentation still to be written.",
        "No public screenshots yet.",
      ],
      metaDescription:
        "Case study: a React and Laravel full-stack application for certificate management, with Docker and continuous integration.",
    },
    jarvis: {
      title: "JARVIS",
      category: "R&D in AI orchestration",
      tagline: "A personal, multi-model AI orchestrator with vector memory.",
      summary:
        "A personal research project: orchestrating several language models, long-term memory, and voice and vision pipelines.",
      context: "A personal research and development project with no client. It is not a commercial product.",
      role: "Architecture design and development.",
      problem: [
        "Explore, hands-on, language-model orchestration, long-term memory and voice and vision interfaces.",
      ],
      solution: [
        "A central orchestrator (LangGraph) that routes each request to the right model provider.",
        "Two-level memory: SQLite storage and a Qdrant vector database for similarity search (RAG).",
        "Voice (wake word, transcription, speech synthesis) and vision (screen capture, OCR, image analysis) pipelines, independent from the core.",
      ],
      features: [
        "Multi-model orchestration",
        "Persistent and vector memory with RAG",
        "Voice and vision pipelines",
        "Permission controls",
      ],
      evidence: ["Public source code (V2, frozen)", "Architecture documents in the repository"],
      limitations: [
        "Research prototype, not used in production.",
        "Documentation partially written.",
        "The next version is developed privately and is not shown here.",
      ],
      metaDescription:
        "Case study: JARVIS, a personal AI R&D project — multi-model orchestration, vector memory and RAG.",
    },
  },

  method: {
    title: "How I work",
    intro: "Four steps, from the first conversation to launch.",
    steps: [
      {
        title: "Understand the need",
        body: "A conversation about your business, your constraints and the problem to solve. No solution is proposed before the problem is understood.",
      },
      {
        title: "Define the solution",
        body: "A written proposal: scope, features, technologies and milestones. You know exactly what will be delivered.",
      },
      {
        title: "Design and build",
        body: "Development in stages, with regular check-ins on versions you can actually try.",
      },
      {
        title: "Test and deliver",
        body: "Testing on phones and computers, launch, then handover of access and documentation.",
      },
    ],
    supportNote: "Follow-up and maintenance after delivery are defined in each proposal, based on your needs.",
  },

  about: {
    title: "About",
    paragraphs: [
      "I’m Rachid Berrada. I design and build web solutions for businesses: websites, business applications and automation.",
      "I always start from the ground: understanding how the business really works, spotting what costs time or customers, then building the simplest tool that fixes the problem.",
      "My projects range from a mobile site linked to a business card to full-stack applications with databases, containers and continuous integration, as well as R&D in artificial intelligence. Every project shown here states its real status.",
    ],
    githubCta: "See my code on GitHub",
  },

  contact: {
    title: "Let’s talk about your project",
    intro:
      "The fastest way is a WhatsApp message. You can also call, send an email or save my details to your phone.",
    quoteTitle: "Need a quote?",
    quoteBody: "Describe your project in two minutes. I’ll get back to you with questions or a first proposal.",
  },

  quote: {
    metaTitle: "Request a quote",
    metaDescription:
      "Describe your website, automation or application project and Rachid Berrada will get back to you to discuss it.",
    title: "Request a quote",
    intro: "A few details are enough. Fields marked with an asterisk are required.",
    directTitle: "Prefer to talk directly?",
    directBody: "WhatsApp, phone or email: pick whichever suits you.",
    fields: {
      name: "Name",
      company: "Company",
      email: "Email",
      phone: "Phone or WhatsApp",
      contactHint: "Provide at least an email address or a phone number.",
      service: "Type of need",
      description: "Your project",
      descriptionPlaceholder: "Your business, what you want to improve, what already exists…",
      timeline: "Preferred timeframe",
      contactPreference: "How would you like to be contacted?",
      budget: "Expected budget",
      budgetPlaceholder: "An amount or a range, if you have one",
      optional: "optional",
      choose: "Choose…",
      consent: "I agree that this information may be used to respond to my request, as described in the",
      privacyLink: "privacy policy",
      honeypot: "Leave this field empty",
    },
    options: {
      service: {
        presence: "Digital presence (website, menu, QR code)",
        automation: "Business automation",
        apps: "Custom web application",
        ai: "AI or pilot project",
        other: "Something else, or not sure yet",
      },
      timeline: {
        asap: "As soon as possible",
        "1-3-months": "Within 1 to 3 months",
        "3-plus-months": "In more than 3 months",
        unsure: "Not decided yet",
      },
      contactPreference: {
        whatsapp: "WhatsApp",
        phone: "Phone",
        email: "Email",
      },
    },
    errors: {
      name: "Enter your name.",
      contact: "Enter an email address or a phone number.",
      email: "This email doesn’t look valid (example: name@domain.com).",
      phone: "This phone number doesn’t look valid.",
      service: "Choose a type of need.",
      description: "Describe your project in a few words (at least 10 characters).",
      consent: "Your consent is required to process the request.",
      summary: "Some fields need your attention.",
    },
    submit: "Send request",
    submitting: "Sending…",
    successTitle: "Request sent",
    successBody: "Thank you. Rachid will get back to you through the channel you chose.",
    failure:
      "Sending failed and your request was not delivered. Try again, or message Rachid directly on WhatsApp or by email.",
    faqTitle: "Frequently asked questions",
    faq: [
      {
        question: "How much does a project cost?",
        answer:
          "It depends on scope, complexity and timeline. After a first conversation, you receive a written proposal detailing the content and the price.",
      },
      {
        question: "Do you work with small businesses?",
        answer:
          "Yes. The solution is sized to your business: a well-built mobile page is often enough to start.",
      },
      {
        question: "Can you take over an existing website or tool?",
        answer: "Yes, after reviewing what exists to decide whether it’s better to improve it or replace it.",
      },
      {
        question: "What happens after delivery?",
        answer: "Follow-up and maintenance are defined in the proposal, based on your needs. Nothing is imposed.",
      },
    ],
  },

  caseStudy: {
    back: "All work",
    statusLabel: "Status",
    contextLabel: "Context",
    roleLabel: "Rachid’s role",
    problemLabel: "The problem",
    solutionLabel: "The solution",
    featuresLabel: "Implemented features",
    flowLabel: "User flow",
    evidenceLabel: "What you can verify",
    limitationsLabel: "Known limitations",
    stackLabel: "Technologies",
    linksLabel: "Links",
    noLinks: "No public link for this project.",
    screenshotsLabel: "Screenshots",
    noScreenshots: "No public screenshot is available for this project. No image was invented to replace it.",
    ctaTitle: "A similar need?",
    ctaBody: "Explain your situation and we’ll look at what is realistic together.",
    otherProjects: "More work",
  },

  footer: {
    rights: "All rights reserved.",
    legal: "Legal notice",
    privacy: "Privacy",
    languages: "Languages",
  },

  legal: {
    notice: {
      title: "Legal notice",
      description: "Publisher, hosting and ownership of rachidberrada.com.",
      updated: "Last updated: November 17, 2026",
      sections: [
        {
          heading: "Publisher",
          body: [
            "rachidberrada.com is published by Rachid Berrada, as an individual.",
            "Contact: rachid.berrada20@gmail.com — +212 6 48 55 22 22.",
            "Business registration details will be added to this page as soon as they are available.",
          ],
        },
        {
          heading: "Hosting",
          body: ["The website is hosted by Netlify, Inc. (United States) — www.netlify.com."],
        },
        {
          heading: "Intellectual property",
          body: [
            "The text, photographs and graphics on this website belong to Rachid Berrada unless stated otherwise. Project screenshots are reproduced to present the work carried out.",
            "Reproduction without prior permission is prohibited.",
          ],
        },
        {
          heading: "Personal data",
          body: ["How data sent through the website is handled is described in the privacy policy."],
        },
      ],
    },
    privacy: {
      title: "Privacy policy",
      description: "What data this website collects, why, for how long, and how to exercise your rights.",
      updated: "Last updated: November 17, 2026",
      sections: [
        {
          heading: "Data controller",
          body: ["Rachid Berrada, reachable at rachid.berrada20@gmail.com."],
        },
        {
          heading: "Data collected by the quote form",
          body: [
            "Name, company (optional), email and/or phone number, type of need, project description, preferred timeframe, preferred contact method and budget (optional).",
            "The form also adds the page language, the first page visited and the source of the visit (for example “business card”, “search” or “direct”), to understand how you found the website.",
          ],
        },
        {
          heading: "Purpose and legal basis",
          body: [
            "This data is used only to respond to your request and prepare a possible proposal. It is never sold or used for advertising.",
            "Processing is based on your consent, given by ticking the form checkbox, and on the steps taken before a possible contract.",
          ],
        },
        {
          heading: "Recipients and hosting",
          body: [
            "Requests are received through Netlify’s form service (United States). When an automation is enabled, a copy is sent to Make (an automation platform), then stored in Google Sheets and notified through Gmail.",
            "These providers may process data outside Morocco and the European Union, under their own contractual safeguards.",
          ],
        },
        {
          heading: "Retention",
          body: [
            "Requests are kept for up to three years after the last exchange, then deleted, unless an ongoing collaboration requires longer retention.",
          ],
        },
        {
          heading: "Language selection by country",
          body: [
            "When you open the home page, the hosting provider determines your country from your IP address, on the server, only to show the appropriate language.",
            "The website stores neither this country nor your IP address. No precise location is requested from your device. The hosting provider may process IP addresses in its technical logs under its own policy.",
          ],
        },
        {
          heading: "Cookies and local storage",
          body: [
            "“rb_locale” cookie: set only if you choose a language manually, to remember it for twelve months. The “Automatic” option in the language menu removes it.",
            "“rb_attribution” session storage: remembers the source of your visit for the session, and is sent only if you submit the form.",
            "No advertising cookies or audience-measurement tools are active today. If a privacy-friendly analytics tool is added, this page will be updated before it is enabled.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "You can request access to, correction or deletion of your data, and object to its processing, by writing to rachid.berrada20@gmail.com.",
            "These rights apply in particular under Moroccan Law No. 09-08 and, for people in the European Union, under the General Data Protection Regulation (GDPR).",
            "You can also file a complaint with the relevant authority: the CNDP in Morocco, the CNIL in France or the CNPD in Portugal.",
          ],
        },
        {
          heading: "External services",
          body: [
            "Links to WhatsApp, GitHub or project websites open third-party services governed by their own privacy policies.",
          ],
        },
      ],
    },
  },
};
