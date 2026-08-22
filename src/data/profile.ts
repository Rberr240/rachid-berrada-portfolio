import type {
  NavItem,
  ServiceItem,
  ProblemItem,
  IndustryItem,
  MethodStep,
  ProjectItem,
  Testimonial,
  FaqItem,
  SocialLink,
} from "./types";

/**
 * Toutes les informations du site sont centralisées ici.
 * Nom, titre, téléphone, WhatsApp, email et GitHub sont les informations réelles
 * fournies par Rachid. Restent à fournir avant publication : localisation, domaine
 * définitif, réalisations réelles et témoignages réels (voir README, section 9).
 */

export const siteConfig = {
  name: "Rachid Berrada",
  title: "Ingénieur en solutions digitales",
  tagline: "Web • Applications • IA • Automatisation",
  monogram: "RB",
  locale: "fr_FR",
  language: "fr" as const,

  email: "rachid.berrada20@gmail.com",
  phoneDisplay: "+212 6 48 55 22 22",
  // Numéro WhatsApp au format international, chiffres uniquement (sans +, sans espaces).
  // Configurable via la variable d'environnement NEXT_PUBLIC_WHATSAPP_NUMBER.
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212648552222",
  // Non fournie : ne pas inventer de ville. Reste vide tant qu'elle n'est pas
  // communiquée explicitement — les composants masquent ce champ quand il est vide.
  location: "",
  // Domaine non confirmé : ne pas inventer d'URL publique. "hasConfirmedDomain"
  // reste false tant que NEXT_PUBLIC_SITE_URL n'est pas défini, et les composants
  // n'affichent le domaine que lorsque ce flag est vrai. Le fallback local ne sert
  // qu'à satisfaire les besoins techniques (metadataBase, sitemap) avant déploiement.
  website:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000",
  hasConfirmedDomain: Boolean(process.env.NEXT_PUBLIC_SITE_URL),

  whatsappDefaultMessage:
    "Bonjour Rachid, j'ai découvert vos services et je souhaiterais discuter d'un projet.",

  heroHeadline: "Je transforme vos besoins en solutions digitales performantes.",
  heroSubtitle:
    "J'accompagne les entreprises et entrepreneurs dans la création de sites web, applications, automatisations et solutions basées sur l'intelligence artificielle.",

  metaDescription:
    "Création de sites web, applications, solutions IA et automatisations pour entreprises et entrepreneurs. Découvrez les services de Rachid Berrada.",

  aboutText: [
    "Je suis ingénieur en solutions digitales. Mon travail consiste à comprendre le fonctionnement réel d'une entreprise, à identifier ce qui peut être amélioré, puis à concevoir et développer les outils qui répondent concrètement à ce besoin.",
    "Mon approche s'appuie sur le développement web et applicatif, l'intelligence artificielle et l'automatisation, avec un objectif simple : livrer des solutions utiles, fiables et adaptées à la réalité du terrain — pas des projets technologiques pour le principe.",
    "Chaque projet suit la même exigence : comprendre le besoin métier, proposer une solution réaliste, la développer proprement, la tester sérieusement, puis l'améliorer dans le temps.",
  ],
};

// Préfixées par "/" pour rester valides depuis les pages de réalisations
// (/realisations/[slug]), qui ne sont pas la page d'accueil.
export const nav: NavItem[] = [
  { label: "Accueil", href: "/#accueil" },
  { label: "Services", href: "/#services" },
  { label: "Solutions", href: "/#solutions" },
  { label: "À propos", href: "/#a-propos" },
  { label: "Réalisations", href: "/#realisations" },
  { label: "Contact", href: "/#contact" },
];

export const socialLinks: SocialLink[] = [
  // LinkedIn sera ajouté plus tard — ne pas inventer de lien en attendant.
  { label: "LinkedIn", href: "", enabled: false },
  { label: "GitHub", href: "https://github.com/Rberr240", enabled: true },
];

export const services: ServiceItem[] = [
  {
    id: "web",
    icon: "web",
    title: "Sites web professionnels",
    description:
      "Un site qui donne immédiatement confiance et transforme vos visiteurs en clients.",
    bullets: [
      "Sites vitrines et sites d'entreprise",
      "Landing pages orientées conversion",
      "Espaces clients et tableaux de bord",
      "Sites événementiels",
      "Optimisation de sites existants",
      "Responsive design et amélioration UX/UI",
    ],
    benefits: [
      "Gagner en crédibilité",
      "Attirer de nouveaux clients",
      "Présenter vos services clairement",
      "Faciliter les demandes de contact",
    ],
  },
  {
    id: "app",
    icon: "app",
    title: "Applications sur mesure",
    description:
      "Des outils pensés pour votre activité, pas des solutions génériques mal adaptées.",
    bullets: [
      "Applications web",
      "Outils internes et espaces collaborateurs",
      "Espaces propriétaires / clients",
      "Dashboards et plateformes métier",
      "Systèmes de gestion",
      "Applications mobiles lorsque pertinent",
    ],
    benefits: [
      "Centraliser vos informations",
      "Gagner en productivité",
      "Simplifier vos opérations",
      "Réduire les tâches manuelles",
    ],
  },
  {
    id: "ai",
    icon: "ai",
    title: "Intelligence Artificielle",
    description:
      "Une IA intégrée là où elle apporte une valeur réelle — pas un gadget.",
    bullets: [
      "Assistants IA et chatbots",
      "Recherche intelligente",
      "Traitement de documents",
      "Génération assistée de contenu",
      "Analyse de données",
      "Intégration de modèles IA et systèmes RAG",
    ],
    benefits: [
      "Automatiser les réponses répétitives",
      "Retrouver l'information plus vite",
      "Réduire le temps de traitement",
      "Aider vos équipes au quotidien",
    ],
  },
  {
    id: "automation",
    icon: "automation",
    title: "Automatisation",
    description: "Moins de tâches répétitives. Plus de temps pour votre activité.",
    bullets: [
      "Automatisation de tâches répétitives",
      "Notifications automatiques",
      "Génération de documents",
      "Traitement automatique de données",
      "Intégration entre outils",
      "Workflows, formulaires, e-mails, reporting",
    ],
    benefits: [
      "Gagner un temps précieux",
      "Réduire les erreurs manuelles",
      "Fiabiliser vos processus",
      "Libérer vos équipes des tâches à faible valeur",
    ],
  },
  {
    id: "digital",
    icon: "digital",
    title: "Digitalisation d'entreprise",
    description:
      "Une approche globale : comprendre, puis équiper votre entreprise des bons outils.",
    bullets: [
      "Analyse du fonctionnement existant",
      "Identification des pertes de temps",
      "Recommandations d'amélioration",
      "Création des outils adaptés",
      "Centralisation des informations",
      "Automatisation des processus utiles",
    ],
    benefits: [
      "Une vision claire de vos priorités",
      "Des outils réellement utilisés",
      "Une transformation progressive et maîtrisée",
      "Un accompagnement dans la durée",
    ],
  },
];

export const problems: ProblemItem[] = [
  {
    question: "Vous n'avez pas encore de présence professionnelle en ligne ?",
    answer: "Création d'un site adapté à votre activité.",
  },
  {
    question:
      "Votre équipe perd du temps avec Excel, WhatsApp et des opérations manuelles ?",
    answer: "Création d'outils et d'automatisations.",
  },
  {
    question: "Vos clients doivent toujours appeler pour obtenir des informations ?",
    answer: "Mise en place de formulaires, portails ou assistants.",
  },
  {
    question: "Vos données sont dispersées ?",
    answer: "Centralisation dans une interface adaptée.",
  },
  {
    question: "Vous voulez intégrer l'IA mais ne savez pas par où commencer ?",
    answer: "Analyse du besoin puis création d'une solution réaliste et utile.",
  },
];

export const industries: IndustryItem[] = [
  {
    id: "restaurants",
    name: "Restaurants / cafés",
    icon: "restaurant",
    items: [
      "Site professionnel",
      "Menu numérique",
      "QR code",
      "Réservation",
      "Demandes WhatsApp",
      "Automatisation de certaines demandes",
    ],
  },
  {
    id: "hotels",
    name: "Hôtels / résidences",
    icon: "hotel",
    items: [
      "Site",
      "Espace client",
      "Demandes de services",
      "Informations visiteurs",
      "Outils de gestion",
      "Notifications",
    ],
  },
  {
    id: "realestate",
    name: "Immobilier",
    icon: "realestate",
    items: [
      "Présentation des biens",
      "Formulaires prospects",
      "Espace clients",
      "Gestion des demandes",
      "Automatisation des contacts",
    ],
  },
  {
    id: "gyms",
    name: "Salles de sport",
    icon: "gym",
    items: [
      "Abonnements",
      "Planning",
      "Espace membres",
      "Notifications",
      "Inscriptions",
      "Site marketing",
    ],
  },
  {
    id: "business",
    name: "PME / entreprises",
    icon: "business",
    items: [
      "Portail interne",
      "Automatisation",
      "Tableaux de bord",
      "CRM léger",
      "Gestion documentaire",
      "Outils IA",
    ],
  },
  {
    id: "shops",
    name: "Commerces",
    icon: "shop",
    items: [
      "Catalogue",
      "Présence digitale",
      "Demandes WhatsApp",
      "Formulaires",
      "Commandes ou réservations selon le besoin",
    ],
  },
];

export const methodSteps: MethodStep[] = [
  {
    number: "01",
    title: "Comprendre",
    description:
      "Nous discutons de votre besoin, de votre activité et du problème à résoudre.",
  },
  {
    number: "02",
    title: "Concevoir",
    description: "Je propose une solution simple, adaptée et réaliste.",
  },
  {
    number: "03",
    title: "Développer",
    description: "Création de la solution avec des technologies adaptées.",
  },
  {
    number: "04",
    title: "Tester",
    description:
      "Vérification du fonctionnement, de la sécurité, de la performance et de l'expérience utilisateur.",
  },
  {
    number: "05",
    title: "Améliorer",
    description: "Évolutions et améliorations selon les besoins.",
  },
];

// Réalisations réelles, vérifiées lors d'un audit des dépôts GitHub concernés
// (voir PORTFOLIO_GITHUB_AUDIT.md à la racine du projet pour le détail de l'audit).
// Rien n'est inventé : chaque fonctionnalité listée est vérifiée dans le code ou sur le
// site en ligne. Les projets sans preuve suffisante ne sont pas mis en avant ici.
export const projects: ProjectItem[] = [
  {
    id: "gold-fitness",
    title: "Gold Fitness",
    category: "Digitalisation / Site web / Expérience QR",
    statusLabel: "Réalisation en ligne",
    summary:
      "Un site mobile-first pensé pour être découvert par QR code : appel, WhatsApp et Instagram accessibles en un geste depuis une carte physique.",
    result: "Site en ligne et fonctionnel, relié à un support physique par QR code.",
    tags: ["Web", "Mobile First", "QR Code", "GitHub Pages"],
    technologies: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    image: {
      desktop: "/portfolio/gold-fitness/desktop.webp",
      mobile: "/portfolio/gold-fitness/mobile.webp",
      alt: "Aperçu du site Gold Fitness sur desktop et mobile",
    },
    links: [
      { label: "Voir le site", href: "https://gold-fitness.github.io/gold-fitness/" },
      { label: "Voir le repository", href: "https://github.com/Gold-Fitness/gold-fitness" },
    ],
    placeholder: false,
    caseStudy: {
      heroSubtitle: "Une expérience digitale accessible depuis une carte physique, via QR code.",
      need: [
        "Gold Fitness, salle de sport basée à Martil, avait besoin d'un point de contact numérique simple, directement accessible depuis sa carte de visite physique.",
        "L'objectif : qu'un visiteur scannant le QR code arrive immédiatement sur les informations utiles, sans navigation complexe ni recherche préalable.",
      ],
      solution: [
        "Conception d'une page unique, mobile-first, hébergée sur GitHub Pages.",
        "Les actions principales sont mises en avant dès l'arrivée : appeler directement, contacter via WhatsApp, ouvrir la localisation sur Google Maps.",
        "Un second dépôt (gold-fitness-qr) sert uniquement de redirection technique depuis le QR code physique vers cette page — les deux ne forment qu'une seule expérience.",
      ],
      experience: [
        "Carte physique (QR code) → redirection automatique → page mobile Gold Fitness → appel, WhatsApp, Instagram ou localisation en un geste.",
      ],
      features: [
        "Boutons d'action directs : appeler, voir la salle",
        "Bloc contact : téléphone, localisation (Google Maps), réseaux sociaux",
        "Lien WhatsApp direct",
        "Galerie vidéo de la salle",
        "Design mobile-first adapté à une consultation juste après avoir scanné le QR code",
      ],
      technologies: [
        { name: "HTML / CSS / JavaScript" },
        { name: "GitHub Pages", note: "hébergement statique" },
        { name: "gold-fitness-qr", note: "dépôt de redirection QR dédié" },
      ],
      gallery: [
        { src: "/portfolio/gold-fitness/desktop.webp", alt: "Site Gold Fitness affiché en version desktop" },
        {
          src: "/portfolio/gold-fitness/mobile.webp",
          alt: "Site Gold Fitness affiché en version mobile, format d'usage principal depuis le QR code",
        },
      ],
      metaDescription:
        "Case study : conception d'une expérience digitale mobile-first pour Gold Fitness, accessible par QR code depuis une carte physique.",
    },
  },
  {
    id: "residence-mirador",
    title: "Plateforme digitale de gestion de résidence",
    category: "Application web / Digitalisation",
    statusLabel: "Réalisation — contexte résidence",
    summary:
      "Un parcours d'inscription sécurisé permettant aux propriétaires de s'identifier par code d'accès et de transmettre leurs disponibilités pour les réunions de copropriété.",
    result:
      "Parcours d'inscription et de collecte fonctionnel, avec vérification de code d'accès et enregistrement sécurisé côté serveur.",
    tags: ["Web", "Supabase", "Sécurité"],
    technologies: ["HTML", "CSS", "JavaScript", "Supabase (PostgreSQL)", "Edge Functions (Deno)"],
    links: [],
    placeholder: false,
    caseStudy: {
      heroSubtitle: "Un parcours d'inscription sécurisé pour les propriétaires d'une résidence.",
      need: [
        "Une résidence (contexte Mirador Golf) avait besoin de centraliser l'inscription de ses propriétaires : identification par code unique, coordonnées, disponibilités pour les réunions et sujets à proposer.",
      ],
      solution: [
        "Un parcours d'inscription en plusieurs étapes, avec validation du code d'accès propriétaire côté serveur avant toute saisie de données.",
        "Les données sont stockées dans une base PostgreSQL (Supabase), avec des règles de sécurité au niveau des lignes (Row Level Security) et des fonctions serveur dédiées (Edge Functions) qui signent les codes d'accès plutôt que de les comparer en clair.",
      ],
      features: [
        "Identification par code d'accès propriétaire",
        "Formulaire d'inscription (coordonnées, disponibilités réunions, sujets proposés)",
        "Consentement explicite à la collecte des données",
        "Vérification et écriture des données via des fonctions serveur dédiées, sans accès direct à la base depuis le navigateur",
      ],
      technologies: [
        { name: "HTML / CSS / JavaScript" },
        { name: "Supabase", note: "PostgreSQL + Edge Functions (Deno)" },
        { name: "Row Level Security" },
        { name: "Signature HMAC des codes d'accès" },
      ],
      metaDescription:
        "Case study : plateforme d'inscription sécurisée pour les propriétaires d'une résidence, avec validation par code d'accès et infrastructure Supabase.",
    },
  },
  {
    id: "gestion-attestations",
    title: "Gestion des attestations",
    category: "Application full-stack",
    statusLabel: "Projet technique",
    summary:
      "Centralisation de la gestion des attestations (étudiants, enseignants, stagiaires) avec authentification et génération de documents PDF, containerisée et intégrée en CI/CD.",
    result: "Application fonctionnelle avec pipeline d'intégration continue (tests et build de l'image Docker à chaque envoi).",
    tags: ["React", "Laravel", "Docker", "CI/CD"],
    technologies: ["React", "Vite", "Chakra UI", "Laravel 12", "PHP 8.2", "Sanctum / JWT", "Docker", "GitHub Actions"],
    links: [{ label: "Voir le repository", href: "https://github.com/Rberr240/gestion-attestations" }],
    placeholder: false,
    caseStudy: {
      heroSubtitle: "Une application full-stack pour centraliser la gestion des attestations.",
      need: [
        "Un établissement gère plusieurs profils (étudiants, enseignants, stagiaires) et doit produire des attestations de façon fiable et traçable.",
      ],
      solution: [
        "Backend Laravel exposant une API authentifiée (Sanctum / JWT), avec génération de documents PDF (DOMPDF).",
        "Frontend React (Vite, Chakra UI) consommant cette API pour la gestion des étudiants, enseignants et stagiaires.",
        "Environnement containerisé avec Docker, et pipeline GitHub Actions exécutant les tests et construisant l'image à chaque envoi sur la branche principale.",
      ],
      features: [
        "Authentification (connexion / inscription)",
        "Gestion des étudiants, enseignants et stagiaires",
        "Génération d'attestations au format PDF",
        "Environnement Docker prêt à l'emploi",
        "Pipeline CI/CD (tests automatiques et build de l'image Docker)",
      ],
      technologies: [
        { name: "React", note: "Vite + Chakra UI" },
        { name: "Laravel 12", note: "PHP 8.2, Sanctum / JWT, DOMPDF" },
        { name: "Docker" },
        { name: "GitHub Actions", note: "CI/CD" },
      ],
      metaDescription:
        "Case study : application full-stack React + Laravel pour la gestion d'attestations, avec Docker et pipeline CI/CD.",
    },
  },
  {
    id: "jarvis",
    title: "JARVIS",
    category: "R&D • Intelligence Artificielle",
    statusLabel: "Projet personnel",
    summary:
      "Projet personnel de recherche autour d'un orchestrateur d'IA multi-modèles, avec mémoire vectorielle et pipelines voix/vision.",
    result:
      "Base de code fonctionnelle et documentée, gelée comme socle avant une nouvelle itération actuellement en développement privé.",
    tags: ["Node.js", "LangGraph", "RAG", "R&D"],
    technologies: ["Node.js", "LangChain / LangGraph", "Multi-fournisseurs LLM", "Qdrant", "SQLite"],
    links: [{ label: "Voir le repository", href: "https://github.com/Rberr240/JARVIS-V2" }],
    placeholder: false,
    caseStudy: {
      heroSubtitle: "Un orchestrateur d'IA personnel, multi-modèles, avec mémoire vectorielle.",
      need: [
        "Un projet personnel de recherche et développement, sans commande client, pour explorer l'orchestration de modèles de langage, la mémoire long-terme et les interfaces voix/vision.",
      ],
      solution: [
        "Un orchestrateur central (LangGraph) route les requêtes vers plusieurs fournisseurs de modèles (Anthropic, Google Gemini, Groq, OpenAI) selon la tâche.",
        "Un système de mémoire à deux niveaux : stockage persistant SQLite et base vectorielle Qdrant, avec indexation et récupération RAG (recherche par similarité).",
        "Des pipelines voix (détection de mot d'activation, transcription Whisper, synthèse vocale) et vision (capture d'écran, OCR, analyse d'image) fonctionnels et indépendants du cœur d'orchestration.",
        "L'architecture est documentée — les décisions clés (architecture générale, modèle cognitif, système de mémoire) sont rédigées ; le reste de la documentation prévue reste à compléter.",
      ],
      features: [
        "Orchestration multi-modèles (LangGraph)",
        "Mémoire persistante + mémoire vectorielle (SQLite, Qdrant) avec RAG",
        "Pipeline voix : mot d'activation, transcription, synthèse",
        "Pipeline vision : capture d'écran, OCR, analyse d'image",
        "Portail de permissions / sécurité applicative",
      ],
      technologies: [
        { name: "Node.js" },
        { name: "LangChain / LangGraph" },
        { name: "Multi-LLM", note: "Anthropic, Google, Groq, OpenAI" },
        { name: "Qdrant", note: "mémoire vectorielle / RAG" },
        { name: "SQLite" },
      ],
      metaDescription:
        "Case study : JARVIS, projet personnel de R&D en intelligence artificielle — orchestration multi-modèles, mémoire vectorielle et RAG.",
    },
  },
];

// Aucun témoignage n'a été fourni : la liste reste vide et la section
// correspondante ne s'affiche pas tant qu'elle n'est pas alimentée.
export const testimonials: Testimonial[] = [];

export const faqs: FaqItem[] = [
  {
    question: "Travaillez-vous avec les petites entreprises ?",
    answer:
      "Oui, les solutions doivent pouvoir être adaptées à la taille et aux besoins de l'entreprise.",
  },
  {
    question: "Pouvez-vous améliorer un site ou une application existante ?",
    answer: "Oui, après analyse de l'existant.",
  },
  {
    question: "Pouvez-vous intégrer de l'intelligence artificielle dans une entreprise ?",
    answer: "Oui, lorsque l'IA apporte réellement une valeur au processus.",
  },
  {
    question: "Comment débute un projet ?",
    answer: "Par une discussion permettant de comprendre le besoin.",
  },
  {
    question: "Travaillez-vous sur des solutions personnalisées ?",
    answer: "Oui.",
  },
  {
    question: "Quels sont vos tarifs ?",
    answer:
      "Chaque projet est différent : le tarif dépend du périmètre, de la complexité et des délais. Nous en discutons ensemble une fois votre besoin compris.",
  },
];

export const projectTypes = [
  "Site web",
  "Application",
  "Intelligence artificielle",
  "Automatisation",
  "Digitalisation",
  "Autre",
] as const;
