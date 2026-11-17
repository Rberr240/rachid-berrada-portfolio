import type { Dictionary } from "./types";

export const fr: Dictionary = {
  meta: {
    title: "Rachid Berrada — Développeur web & solutions digitales",
    description:
      "Sites web mobiles, automatisations et applications sur mesure pour commerces, restaurants et PME. Réalisations vérifiables, méthode claire et contact direct.",
    keywords: [
      "Rachid Berrada",
      "développeur web",
      "site web professionnel",
      "menu digital",
      "QR code",
      "automatisation",
      "application web sur mesure",
    ],
  },

  person: {
    title: "Développeur web & solutions digitales",
    valueProp:
      "J’aide les entreprises à développer leur présence digitale et à automatiser leurs opérations grâce à des solutions web adaptées à leurs besoins.",
    portraitAlt: "Portrait de Rachid Berrada en costume clair",
    aboutPortraitAlt: "Rachid Berrada, portrait de profil",
  },

  common: {
    skipToContent: "Aller au contenu",
    whatsapp: "WhatsApp",
    call: "Appeler",
    email: "E-mail",
    saveContact: "Enregistrer le contact",
    share: "Partager",
    shareCopied: "Lien copié",
    shareFailed: "Copie impossible : notez rachidberrada.com",
    requestQuote: "Demander un devis",
    github: "GitHub",
    externalHint: "(nouvel onglet)",
  },

  nav: {
    ariaLabel: "Navigation principale",
    services: "Services",
    work: "Réalisations",
    method: "Méthode",
    about: "À propos",
    contact: "Contact",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    language: "Langue",
    autoLanguage: "Automatique",
    autoLanguageHint: "selon votre pays",
  },

  whatsapp: {
    defaultMessage:
      "Bonjour Rachid, je viens de votre site rachidberrada.com et j’aimerais parler d’un projet.",
    cardMessage:
      "Bonjour Rachid, j’ai scanné votre carte de visite et j’aimerais parler d’un projet.",
    quoteMessage: "Bonjour Rachid, j’aimerais obtenir un devis pour un projet.",
    floatingLabel: "Écrire à Rachid sur WhatsApp",
  },

  hero: {
    viewWork: "Voir les réalisations",
    viewServices: "Services",
    secondaryAriaLabel: "Accès rapides",
  },

  card: {
    metaTitle: "Carte de contact",
    metaDescription:
      "Coordonnées de Rachid Berrada : WhatsApp, téléphone, e-mail et fiche contact à enregistrer.",
    fullSite: "Voir le site complet",
  },

  services: {
    title: "Ce que je fais pour les entreprises",
    intro:
      "Quatre familles de services, chacune reliée à un problème concret et, quand elle existe, à une réalisation que vous pouvez vérifier.",
    audienceLabel: "Pour qui",
    deliverableLabel: "Ce que vous obtenez",
    includedLabel: "Peut inclure",
    proofLabel: "Exemple :",
    cta: "Parler de ce besoin",
    items: {
      presence: {
        title: "Présence digitale",
        problem:
          "Vos clients vous cherchent sur leur téléphone et ne trouvent rien de clair : pas de site, des informations dispersées, un menu ou un catalogue introuvable.",
        audience: "Commerces, restaurants, salles de sport, indépendants et PME.",
        deliverable:
          "Un site professionnel pensé d’abord pour le mobile, où appeler, écrire sur WhatsApp ou trouver l’adresse se fait en un geste.",
        included: [
          "Site vitrine ou page de présentation",
          "Menu digital ou catalogue de produits",
          "QR code de carte de visite relié au site",
          "Mise en ligne, hébergement et nom de domaine",
        ],
      },
      automation: {
        title: "Automatisation",
        problem:
          "Les demandes arrivent par WhatsApp, e-mail et téléphone, sont recopiées à la main dans Excel, et certaines se perdent.",
        audience:
          "Entreprises qui traitent des demandes, des inscriptions ou des documents de façon répétitive.",
        deliverable:
          "Des formulaires et des flux automatisés qui centralisent les demandes, préviennent la bonne personne et produisent les documents utiles.",
        included: [
          "Formulaires et collecte de demandes",
          "Notifications par e-mail",
          "Synchronisation vers un tableur ou une base de données",
          "Génération de documents PDF",
        ],
        note: "Mes références sur ce sujet sont des prototypes techniques : chaque automatisation est d’abord cadrée et testée sur un périmètre réduit.",
      },
      apps: {
        title: "Applications web sur mesure",
        problem:
          "Votre activité repose sur des fichiers Excel partagés, des cahiers ou des outils génériques qui ne suivent pas votre façon de travailler.",
        audience: "PME, résidences, établissements et équipes qui gèrent des données métier.",
        deliverable:
          "Une application web adaptée : espace client ou membre, tableau de bord, outil interne relié à une base de données.",
        included: [
          "Analyse du besoin et des données",
          "Comptes utilisateurs et accès sécurisés",
          "Base de données et tableaux de bord",
          "Déploiement et documentation",
        ],
      },
      ai: {
        title: "IA et projets pilotes",
        problem:
          "Vous entendez parler d’IA sans savoir ce qu’elle peut réellement faire pour votre activité, ni par où commencer.",
        audience: "Entreprises qui veulent tester un cas d’usage précis avant d’investir.",
        deliverable:
          "Un pilote limité et évaluable : assistant, recherche dans vos documents ou intégration d’une API d’IA dans un outil existant.",
        included: [
          "Choix d’un cas d’usage réaliste",
          "Prototype sur des données fournies avec votre accord",
          "Intégration d’API d’intelligence artificielle",
          "Bilan clair : ce qui fonctionne, ce qui ne fonctionne pas",
        ],
        note: "Offre au stade pilote : mon expérience en IA vient de projets de R&D personnels, pas encore de déploiements chez des clients.",
      },
    },
  },

  problems: {
    title: "Des situations que je résous",
    intro: "Des problèmes de tous les jours, et la réponse la plus simple qui fonctionne.",
    items: [
      {
        situation: "« On me demande sans arrêt mes horaires, mes prix ou mon adresse. »",
        solution:
          "Une page mobile qui répond à ces questions, reliée à votre QR code et à WhatsApp.",
        service: "presence",
      },
      {
        situation: "« Mon menu papier est difficile à tenir à jour. »",
        solution:
          "Un menu digital consultable par QR code, mis à jour sans réimprimer de cartes.",
        service: "presence",
      },
      {
        situation: "« Les demandes de mes clients se perdent entre WhatsApp, les appels et les e-mails. »",
        solution: "Un formulaire unique qui centralise les demandes et vous prévient à chaque envoi.",
        service: "automation",
      },
      {
        situation: "« Mon équipe passe des heures à recopier des données dans Excel. »",
        solution: "Un outil interne ou une automatisation qui supprime la double saisie.",
        service: "apps",
      },
      {
        situation: "« Je voudrais utiliser l’IA, mais je ne sais pas si ça vaut le coup. »",
        solution: "Un pilote court sur un cas précis, pour décider sur des faits.",
        service: "ai",
      },
    ],
  },

  work: {
    title: "Réalisations",
    intro:
      "Chaque projet indique son statut réel : réalisation client, démonstration, prototype ou R&D personnelle. Les visuels sont des captures réelles ; sans capture, il n’y a pas d’image.",
    viewCase: "Lire l’étude de cas",
    viewDemo: "Voir en ligne",
    viewRepo: "Voir le code",
    roleLabel: "Rôle",
    stackLabel: "Technologies",
    status: {
      client: "Réalisation client en ligne",
      demo: "Démonstration en ligne",
      prototype: "Prototype technique",
      rd: "R&D personnelle",
    },
  },

  projects: {
    "gold-fitness": {
      title: "Gold Fitness",
      category: "Site mobile et QR code pour une salle de sport",
      tagline: "Une page mobile reliée à la carte de visite de la salle par un QR code.",
      summary:
        "Site mobile-first pour une salle de sport de Martil : appel, WhatsApp, Instagram et itinéraire accessibles en un geste après avoir scanné la carte.",
      context: "Projet réalisé pour Gold Fitness, salle de sport à Martil (Maroc). Le site est en ligne.",
      role: "Conception, développement, mise en ligne et redirection du QR code.",
      problem: [
        "La salle avait besoin d’un point de contact numérique simple, accessible directement depuis sa carte de visite physique.",
        "Un visiteur qui scanne le QR code doit trouver immédiatement les informations utiles, sans navigation complexe.",
      ],
      solution: [
        "Une page unique, pensée pour le mobile et hébergée sur GitHub Pages.",
        "Les actions principales sont visibles dès l’arrivée : appeler, écrire sur WhatsApp, ouvrir l’itinéraire dans Google Maps.",
        "Un second dépôt sert uniquement de redirection technique entre le QR code imprimé et la page : la carte n’a jamais besoin d’être réimprimée si la page évolue.",
      ],
      features: [
        "Boutons d’appel et de contact WhatsApp",
        "Localisation Google Maps et réseaux sociaux",
        "Galerie vidéo de la salle",
        "Mise en page conçue pour une consultation juste après le scan",
      ],
      evidence: [
        "Site public en ligne",
        "Code source public sur GitHub",
        "Captures réalisées sur le site en ligne",
      ],
      limitations: [
        "Site statique : les contenus se mettent à jour en modifiant le code.",
        "Aucune mesure d’audience n’est en place : l’impact commercial n’est pas chiffré.",
      ],
      flow: ["Carte avec QR code", "Redirection", "Page mobile", "Appel, WhatsApp ou itinéraire"],
      screenshotAlt: {
        mobile: "Page mobile de Gold Fitness avec les boutons d’appel et de contact",
        desktop: "Site de Gold Fitness affiché sur ordinateur",
      },
      metaDescription:
        "Étude de cas : site mobile-first de la salle Gold Fitness, relié à sa carte de visite par un QR code.",
    },
    "menu-chez-bassou": {
      title: "Menu Chez Bassou",
      category: "Menu digital pour un restaurant",
      tagline: "Un menu consultable sur téléphone, avec filtres, recherche et contact WhatsApp.",
      summary:
        "Démonstration de menu digital responsive : filtres par catégorie, recherche instantanée des plats et commande ou question directe via WhatsApp.",
      context:
        "Démonstration réalisée pour un concept de restaurant (« Chez Bassou — La Ferme de Loisirs »). Ce n’est pas une livraison client confirmée : certaines coordonnées affichées sont des valeurs d’exemple.",
      role: "Conception, développement et mise en ligne.",
      problem: [
        "Un menu de restaurant doit s’ouvrir vite sur un téléphone, par exemple depuis un QR code posé sur la table, et rester lisible à mesure que la carte s’étoffe.",
      ],
      solution: [
        "Une page statique en HTML, CSS et JavaScript natifs, sans framework, hébergée sur GitHub Pages.",
        "Une barre de filtres fixe permet d’aller directement à une catégorie, et un champ de recherche filtre les plats pendant la saisie.",
        "Un bouton WhatsApp ouvre une conversation pré-remplie depuis le menu.",
      ],
      features: [
        "Filtres par catégorie et recherche en direct",
        "Tableau de prix au poids pour les grillades",
        "Boutons d’appel et de contact WhatsApp",
        "Mise en page responsive : téléphone, tablette, ordinateur",
      ],
      evidence: ["Démonstration publique en ligne", "Code source public sur GitHub"],
      limitations: [
        "Numéro de téléphone et liens de réseaux sociaux d’exemple, à remplacer pour un usage réel.",
        "Plats et prix saisis dans le code : pas d’interface d’administration.",
      ],
      flow: ["QR code sur la table", "Menu digital", "Filtre ou recherche", "Contact WhatsApp"],
      screenshotAlt: {
        mobile: "Menu Chez Bassou sur mobile avec les filtres de catégories",
        desktop: "Menu Chez Bassou affiché sur ordinateur",
      },
      metaDescription:
        "Étude de cas : démonstration de menu digital responsive avec filtres, recherche et contact WhatsApp.",
    },
    "residence-mirador": {
      title: "Espace propriétaires de résidence",
      category: "Application web d’inscription sécurisée",
      tagline: "Un parcours d’inscription sécurisé pour les propriétaires d’une résidence.",
      summary:
        "Prototype permettant aux propriétaires de s’identifier avec un code d’accès et de transmettre leurs coordonnées et disponibilités pour les réunions de copropriété.",
      context:
        "Prototype développé dans le contexte d’une résidence (Mirador Golf). Son utilisation en production n’est pas confirmée.",
      role: "Conception et développement de l’interface et du back-end Supabase.",
      problem: [
        "La résidence devait centraliser l’inscription de ses propriétaires : identification par code unique, coordonnées, disponibilités pour les réunions et sujets à proposer.",
      ],
      solution: [
        "Un parcours en plusieurs étapes, avec vérification du code d’accès côté serveur avant toute saisie.",
        "Les données sont stockées dans PostgreSQL (Supabase) avec des règles de sécurité par ligne, et écrites uniquement par des fonctions serveur qui signent les codes d’accès au lieu de les comparer en clair.",
      ],
      features: [
        "Identification par code d’accès propriétaire",
        "Formulaire de coordonnées, disponibilités et sujets proposés",
        "Consentement explicite à la collecte des données",
        "Aucun accès direct à la base depuis le navigateur",
      ],
      evidence: [
        "Parcours d’inscription vérifié dans le code source",
        "Six migrations SQL et deux fonctions serveur",
      ],
      limitations: [
        "L’espace administrateur prévu n’est pas encore développé.",
        "Code source non publié : il décrit un système qui peut traiter des données personnelles.",
        "Pas de capture ni de démo publique présentée pour l’instant.",
      ],
      metaDescription:
        "Étude de cas : prototype d’inscription sécurisée pour les propriétaires d’une résidence, avec Supabase et vérification par code d’accès.",
    },
    "gestion-attestations": {
      title: "Gestion des attestations",
      category: "Application full-stack avec génération de documents",
      tagline: "Une application pour centraliser et produire les attestations d’un établissement.",
      summary:
        "Gestion des étudiants, enseignants et stagiaires avec authentification et génération d’attestations PDF, conteneurisée et testée automatiquement.",
      context: "Prototype technique full-stack. Il n’est pas exploité en production.",
      role: "Développement full-stack : API Laravel, interface React, conteneurs Docker et intégration continue.",
      problem: [
        "Un établissement gère plusieurs profils (étudiants, enseignants, stagiaires) et doit produire des attestations de façon fiable et traçable.",
      ],
      solution: [
        "Une API Laravel authentifiée (Sanctum / JWT) qui génère les documents PDF.",
        "Une interface React (Vite, Chakra UI) pour gérer les différents profils.",
        "Un environnement Docker et un pipeline GitHub Actions qui lance les tests et construit l’image à chaque envoi.",
      ],
      features: [
        "Connexion et inscription",
        "Gestion des étudiants, enseignants et stagiaires",
        "Génération d’attestations PDF",
        "Tests et build Docker automatiques",
      ],
      evidence: ["Code source public sur GitHub", "Pipeline d’intégration continue dans le dépôt"],
      limitations: [
        "Pas de démo en ligne.",
        "Documentation du dépôt à compléter.",
        "Aucune capture publique pour l’instant.",
      ],
      metaDescription:
        "Étude de cas : application full-stack React et Laravel pour la gestion d’attestations, avec Docker et intégration continue.",
    },
    jarvis: {
      title: "JARVIS",
      category: "R&D en orchestration d’intelligence artificielle",
      tagline: "Un orchestrateur d’IA personnel, multi-modèles, avec mémoire vectorielle.",
      summary:
        "Projet personnel de recherche : orchestration de plusieurs modèles de langage, mémoire à long terme et pipelines voix et vision.",
      context:
        "Projet personnel de recherche et développement, sans client. Ce n’est pas un produit commercial.",
      role: "Conception de l’architecture et développement.",
      problem: [
        "Explorer concrètement l’orchestration de modèles de langage, la mémoire à long terme et les interfaces voix et vision.",
      ],
      solution: [
        "Un orchestrateur central (LangGraph) qui oriente chaque requête vers le fournisseur de modèle adapté.",
        "Une mémoire à deux niveaux : stockage SQLite et base vectorielle Qdrant pour la recherche par similarité (RAG).",
        "Des pipelines voix (mot d’activation, transcription, synthèse) et vision (capture, OCR, analyse d’image) indépendants du cœur.",
      ],
      features: [
        "Orchestration multi-modèles",
        "Mémoire persistante et vectorielle avec RAG",
        "Pipelines voix et vision",
        "Contrôle des permissions",
      ],
      evidence: ["Code source public (version V2, gelée)", "Documents d’architecture dans le dépôt"],
      limitations: [
        "Prototype de recherche, non utilisé en production.",
        "Documentation partiellement rédigée.",
        "La version suivante est développée en privé et n’est pas présentée ici.",
      ],
      metaDescription:
        "Étude de cas : JARVIS, projet personnel de R&D en IA — orchestration multi-modèles, mémoire vectorielle et RAG.",
    },
  },

  method: {
    title: "Comment je travaille",
    intro: "Quatre étapes, de la première discussion à la mise en ligne.",
    steps: [
      {
        title: "Comprendre le besoin",
        body: "Un échange sur votre activité, vos contraintes et le problème à résoudre. Aucune solution n’est proposée avant d’avoir compris.",
      },
      {
        title: "Définir la solution",
        body: "Une proposition écrite : périmètre, fonctionnalités, technologies et étapes. Vous savez exactement ce qui sera livré.",
      },
      {
        title: "Concevoir et développer",
        body: "Un développement par étapes, avec des points réguliers sur des versions que vous pouvez essayer.",
      },
      {
        title: "Tester et livrer",
        body: "Des tests sur téléphone et ordinateur, la mise en ligne, puis la remise des accès et de la documentation.",
      },
    ],
    supportNote:
      "Le suivi et la maintenance après livraison sont définis dans chaque proposition, selon vos besoins.",
  },

  about: {
    title: "À propos",
    paragraphs: [
      "Je m’appelle Rachid Berrada. Je conçois et développe des solutions web pour les entreprises : sites, applications métier et automatisations.",
      "Je pars toujours du terrain : comprendre comment l’activité fonctionne vraiment, repérer ce qui fait perdre du temps ou des clients, puis construire l’outil le plus simple qui règle le problème.",
      "Mes projets vont du site mobile relié à une carte de visite jusqu’aux applications full-stack avec base de données, conteneurs et intégration continue, en passant par de la R&D en intelligence artificielle. Chaque réalisation présentée ici indique son statut réel.",
    ],
    githubCta: "Voir mon code sur GitHub",
  },

  contact: {
    title: "Parlons de votre projet",
    intro:
      "Le plus rapide : un message WhatsApp. Vous pouvez aussi appeler, écrire un e-mail ou enregistrer mes coordonnées dans votre téléphone.",
    quoteTitle: "Besoin d’un devis ?",
    quoteBody:
      "Décrivez votre projet en deux minutes. Je reviens vers vous avec des questions ou une première proposition.",
  },

  quote: {
    metaTitle: "Demande de devis",
    metaDescription:
      "Décrivez votre projet de site, d’automatisation ou d’application : Rachid Berrada vous recontacte pour en discuter.",
    title: "Demander un devis",
    intro: "Quelques informations suffisent. Les champs marqués d’un astérisque sont obligatoires.",
    directTitle: "Vous préférez en parler directement ?",
    directBody: "WhatsApp, téléphone ou e-mail : choisissez le canal qui vous convient.",
    fields: {
      name: "Nom",
      company: "Entreprise",
      email: "E-mail",
      phone: "Téléphone ou WhatsApp",
      contactHint: "Indiquez au moins un e-mail ou un numéro de téléphone.",
      service: "Type de besoin",
      description: "Votre projet",
      descriptionPlaceholder: "Votre activité, ce que vous voulez améliorer, ce qui existe déjà…",
      timeline: "Délai souhaité",
      contactPreference: "Comment préférez-vous être recontacté ?",
      budget: "Budget envisagé",
      budgetPlaceholder: "Montant ou fourchette, si vous en avez une",
      optional: "facultatif",
      choose: "Choisir…",
      consent:
        "J’accepte que ces informations soient utilisées pour répondre à ma demande, comme décrit dans la",
      privacyLink: "politique de confidentialité",
      honeypot: "Ne pas remplir ce champ",
    },
    options: {
      service: {
        presence: "Présence digitale (site, menu, QR code)",
        automation: "Automatisation",
        apps: "Application web sur mesure",
        ai: "IA ou projet pilote",
        other: "Autre, ou je ne sais pas encore",
      },
      timeline: {
        asap: "Dès que possible",
        "1-3-months": "D’ici 1 à 3 mois",
        "3-plus-months": "Dans plus de 3 mois",
        unsure: "Pas encore défini",
      },
      contactPreference: {
        whatsapp: "WhatsApp",
        phone: "Téléphone",
        email: "E-mail",
      },
    },
    errors: {
      name: "Indiquez votre nom.",
      contact: "Indiquez un e-mail ou un numéro de téléphone.",
      email: "Cet e-mail ne semble pas valide (exemple : nom@domaine.com).",
      phone: "Ce numéro ne semble pas valide.",
      service: "Choisissez un type de besoin.",
      description: "Décrivez votre projet en quelques mots (10 caractères minimum).",
      consent: "Votre accord est nécessaire pour traiter la demande.",
      summary: "Certains champs sont à corriger.",
    },
    submit: "Envoyer la demande",
    submitting: "Envoi en cours…",
    successTitle: "Demande envoyée",
    successBody: "Merci. Rachid vous recontacte par le moyen que vous avez choisi.",
    failure:
      "L’envoi a échoué et votre demande n’a pas été transmise. Réessayez, ou écrivez directement à Rachid sur WhatsApp ou par e-mail.",
    faqTitle: "Questions fréquentes",
    faq: [
      {
        question: "Combien coûte un projet ?",
        answer:
          "Cela dépend du périmètre, de la complexité et du délai. Après un premier échange, vous recevez une proposition écrite qui détaille le contenu et le prix.",
      },
      {
        question: "Travaillez-vous avec les petites entreprises ?",
        answer:
          "Oui. La solution est dimensionnée selon votre activité : une page mobile bien faite suffit souvent pour commencer.",
      },
      {
        question: "Pouvez-vous reprendre un site ou un outil existant ?",
        answer:
          "Oui, après une analyse de l’existant pour décider s’il vaut mieux l’améliorer ou le remplacer.",
      },
      {
        question: "Que se passe-t-il après la livraison ?",
        answer:
          "Le suivi et la maintenance sont définis dans la proposition, selon vos besoins. Rien n’est imposé.",
      },
    ],
  },

  caseStudy: {
    back: "Toutes les réalisations",
    statusLabel: "Statut",
    contextLabel: "Contexte",
    roleLabel: "Rôle de Rachid",
    problemLabel: "Le problème",
    solutionLabel: "La solution",
    featuresLabel: "Fonctionnalités implémentées",
    flowLabel: "Parcours",
    evidenceLabel: "Éléments vérifiables",
    limitationsLabel: "Limites connues",
    stackLabel: "Technologies",
    linksLabel: "Liens",
    noLinks: "Aucun lien public pour ce projet.",
    screenshotsLabel: "Captures",
    noScreenshots:
      "Aucune capture publique n’est disponible pour ce projet. Aucun visuel n’a été inventé pour la remplacer.",
    ctaTitle: "Un besoin similaire ?",
    ctaBody: "Expliquez votre situation : on regarde ensemble ce qui est réaliste.",
    otherProjects: "Autres réalisations",
  },

  footer: {
    rights: "Tous droits réservés.",
    legal: "Mentions légales",
    privacy: "Confidentialité",
    languages: "Langues",
  },

  legal: {
    notice: {
      title: "Mentions légales",
      description: "Éditeur, hébergement et propriété du site rachidberrada.com.",
      updated: "Mise à jour : 17 novembre 2026",
      sections: [
        {
          heading: "Éditeur du site",
          body: [
            "Le site rachidberrada.com est édité par Rachid Berrada, à titre personnel.",
            "Contact : rachid.berrada20@gmail.com — +212 6 48 55 22 22.",
            "Les informations d’immatriculation professionnelle seront ajoutées sur cette page dès qu’elles seront disponibles.",
          ],
        },
        {
          heading: "Hébergement",
          body: [
            "Le site est hébergé par Netlify, Inc. (États-Unis) — www.netlify.com.",
          ],
        },
        {
          heading: "Propriété intellectuelle",
          body: [
            "Les textes, photographies et éléments graphiques de ce site appartiennent à Rachid Berrada, sauf mention contraire. Les captures de projets sont reproduites pour présenter le travail réalisé.",
            "Toute reproduction sans autorisation préalable est interdite.",
          ],
        },
        {
          heading: "Données personnelles",
          body: [
            "Le traitement des données transmises via le site est décrit dans la politique de confidentialité.",
          ],
        },
      ],
    },
    privacy: {
      title: "Politique de confidentialité",
      description:
        "Quelles données le site collecte, pourquoi, pendant combien de temps, et comment exercer vos droits.",
      updated: "Mise à jour : 17 novembre 2026",
      sections: [
        {
          heading: "Responsable du traitement",
          body: [
            "Rachid Berrada, joignable à l’adresse rachid.berrada20@gmail.com.",
          ],
        },
        {
          heading: "Données collectées par le formulaire de devis",
          body: [
            "Nom, entreprise (facultatif), e-mail et/ou téléphone, type de besoin, description du projet, délai souhaité, moyen de contact préféré et budget (facultatif).",
            "Le formulaire ajoute aussi la langue de la page, la première page visitée et la source de la visite (par exemple « carte de visite », « recherche » ou « accès direct »), afin de savoir comment vous avez découvert le site.",
          ],
        },
        {
          heading: "Finalité et base légale",
          body: [
            "Ces données servent uniquement à répondre à votre demande et à préparer une éventuelle proposition. Elles ne sont ni vendues ni utilisées pour de la publicité.",
            "Le traitement repose sur votre consentement, donné en cochant la case du formulaire, et sur les échanges préalables à un éventuel contrat.",
          ],
        },
        {
          heading: "Destinataires et hébergement",
          body: [
            "Les demandes sont reçues via le service de formulaires de Netlify (États-Unis). Lorsqu’une automatisation est activée, une copie est transmise à Make (plateforme d’automatisation) puis enregistrée dans Google Sheets et notifiée par Gmail.",
            "Ces prestataires peuvent traiter les données hors du Maroc et de l’Union européenne, selon leurs propres garanties contractuelles.",
          ],
        },
        {
          heading: "Durée de conservation",
          body: [
            "Les demandes sont conservées au maximum trois ans après le dernier échange, puis supprimées, sauf si une collaboration nécessite une conservation plus longue.",
          ],
        },
        {
          heading: "Choix de la langue selon le pays",
          body: [
            "Lors d’une visite sur la page d’accueil, l’hébergeur détermine le pays à partir de l’adresse IP, côté serveur, uniquement pour afficher la langue adaptée.",
            "Le site n’enregistre ni ce pays ni votre adresse IP. Aucune géolocalisation précise n’est demandée à votre appareil. L’hébergeur peut traiter l’adresse IP dans ses journaux techniques, selon sa propre politique.",
          ],
        },
        {
          heading: "Cookies et stockage local",
          body: [
            "Cookie « rb_locale » : déposé uniquement si vous choisissez une langue manuellement, pour la mémoriser pendant douze mois. Le choix « Automatique » du sélecteur de langue le supprime.",
            "Stockage de session « rb_attribution » : mémorise la source de votre visite le temps de la session, et n’est transmis que si vous envoyez le formulaire.",
            "Aucun cookie publicitaire ni outil de mesure d’audience n’est actif à ce jour. Si un outil de mesure respectueux de la vie privée est ajouté, cette page sera mise à jour avant son activation.",
          ],
        },
        {
          heading: "Vos droits",
          body: [
            "Vous pouvez demander l’accès, la rectification ou la suppression de vos données, et vous opposer à leur traitement, en écrivant à rachid.berrada20@gmail.com.",
            "Ces droits s’appliquent notamment au titre de la loi marocaine n° 09-08 et, pour les personnes situées dans l’Union européenne, du Règlement général sur la protection des données (RGPD).",
            "Vous pouvez aussi adresser une réclamation à l’autorité compétente : la CNDP au Maroc, la CNIL en France ou la CNPD au Portugal.",
          ],
        },
        {
          heading: "Services externes",
          body: [
            "Les liens vers WhatsApp, GitHub ou les sites de projets ouvrent des services tiers soumis à leurs propres politiques de confidentialité.",
          ],
        },
      ],
    },
  },
};
