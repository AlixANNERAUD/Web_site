/** Public, bilingual technical skills grounded in actual portfolio projects. */
export type SkillLanguage = "fr" | "en";
export type SkillTranslation = Record<SkillLanguage, string>;

export interface SkillEvidence {
  /** Links to a dedicated FR/EN project page, or to an explicit external resource. */
  projectId?: string;
  href?: string;
  label?: SkillTranslation;
  detail: SkillTranslation;
}

export interface SkillDomain {
  id: string;
  icon: "cpu" | "database" | "code" | "server" | "shield" | "bot";
  title: SkillTranslation;
  description: SkillTranslation;
  technologies: string[];
  examples: SkillEvidence[];
}

export const skillDomains: SkillDomain[] = [
  {
    id: "systems",
    icon: "cpu",
    title: { fr: "Systèmes, Rust et embarqué", en: "Systems, Rust & embedded" },
    description: {
      fr: "Du matériel aux applications : pilotes, abstractions, mémoire, tâches et exécution WebAssembly sur des machines aux ressources limitées.",
      en: "From hardware to applications: drivers, abstractions, memory, tasks and WebAssembly on resource-constrained systems.",
    },
    technologies: ["Rust", "C / C++", "WebAssembly", "ESP32", "LVGL", "Linux"],
    examples: [
      {
        projectId: "xila",
        detail: {
          fr: "Noyau, pilotes, VFS et runtime WebAssembly.",
          en: "Kernel, drivers, VFS and WebAssembly runtime.",
        },
      },
      {
        projectId: "nanoexpr",
        detail: {
          fr: "Parseur mathématique sans allocation.",
          en: "Allocation-free expression parser.",
        },
      },
      {
        projectId: "nanoaudio",
        detail: {
          fr: "Traitement audio et codecs no_std.",
          en: "no_std audio processing and codecs.",
        },
      },
    ],
  },
  {
    id: "backend",
    icon: "database",
    title: {
      fr: "Backend, API et données",
      en: "Backend, APIs & data",
    },
    description: {
      fr: "Conception d'API, intégration de données et pipelines de traitement. J'aime relier le modèle métier à une implémentation simple et maintenable.",
      en: "API design, data integration and processing pipelines. I focus on connecting domain needs to simple, maintainable implementations.",
    },
    technologies: [
      "Python",
      "Django REST",
      "Java",
      "SQL",
      "PostgreSQL",
      "Rust / Actix",
      "NumPy",
    ],
    examples: [
      {
        projectId: "deez-nalyzer",
        detail: {
          fr: "API musicale, analyse audio et ML.",
          en: "Music APIs, audio analysis and ML.",
        },
      },
      {
        projectId: "dera",
        detail: {
          fr: "Plateforme étudiante en Rust.",
          en: "Student platform built with Rust.",
        },
      },
    ],
  },
  {
    id: "frontend",
    icon: "code",
    title: {
      fr: "Interfaces et applications web",
      en: "Web interfaces & applications",
    },
    description: {
      fr: "Interfaces Vue et React, applications web interactives et extensions navigateur. Le design doit servir l'usage autant que le code.",
      en: "Vue and React interfaces, interactive web applications and browser extensions. Design should serve the user as much as the code.",
    },
    technologies: [
      "Vue 3",
      "TypeScript",
      "JavaScript",
      "React",
      "Vite",
      "WXT",
      "Tailwind CSS",
    ],
    examples: [
      {
        projectId: "mini-train-store",
        detail: {
          fr: "Boutique en ligne et extension WXT.",
          en: "Storefront and WXT browser extension.",
        },
      },
      {
        projectId: "deez-nalyzer",
        detail: {
          fr: "Exploration et visualisation de données musicales.",
          en: "Interactive exploration of music data.",
        },
      },
    ],
  },
  {
    id: "infrastructure",
    icon: "server",
    title: {
      fr: "Infrastructure et DevOps",
      en: "Infrastructure & DevOps",
    },
    description: {
      fr: "Auto-hébergement, déploiements reproductibles, CI/CD, supervision et maintenance de services utilisés au quotidien.",
      en: "Self-hosting, reproducible deployments, CI/CD, monitoring and maintaining services used every day.",
    },
    technologies: [
      "Debian / Linux",
      "Docker",
      "Ansible",
      "AWS",
      "GitHub Actions",
      "Git",
      "Networking",
    ],
    examples: [
      {
        projectId: "infrastructure",
        detail: {
          fr: "Services, déploiements Ansible et supervision.",
          en: "Services, Ansible deployments and observability.",
        },
      },
      {
        projectId: "mini-train-store",
        detail: {
          fr: "Odoo auto-hébergé pour un usage réel.",
          en: "Self-hosted Odoo for a real business.",
        },
      },
    ],
  },
  {
    id: "security",
    icon: "shield",
    title: {
      fr: "Réseaux et sécurité",
      en: "Networking & security",
    },
    description: {
      fr: "Diagnostic réseau L2/L3, téléphonie IP et cybersécurité. Une pratique nourrie par l'exploitation télécom et les CTF en équipe.",
      en: "L2/L3 network diagnostics, IP telephony and cybersecurity, informed by telecom operations and team-based CTFs.",
    },
    technologies: [
      "L2/L3",
      "MPLS / VPN",
      "SIP",
      "Cisco",
      "Juniper",
      "CTF",
      "Linux",
    ],
    examples: [
      {
        projectId: "jeanne-hack-2026",
        detail: {
          fr: "Première place ex æquo en équipe.",
          en: "Joint first place as a team.",
        },
      },
      {
        href: "/experiences#professional",
        label: { fr: "Expérience chez Linkt", en: "Linkt experience" },
        detail: {
          fr: "Support réseau, diagnostic et automatisation.",
          en: "Network operations, diagnostics and automation.",
        },
      },
    ],
  },
  {
    id: "agents",
    icon: "bot",
    title: {
      fr: "Outils de développement agentiques",
      en: "Agent-assisted development",
    },
    description: {
      fr: "J'utilise les agents de code pour explorer, implémenter et relire, sans déléguer la validation : tests, revues Git et CI restent essentiels.",
      en: "I use coding agents to explore, implement and review, while keeping validation in the loop through tests, Git reviews and CI.",
    },
    technologies: [
      "OpenCode",
      "Claude Code",
      "Codex",
      "MCP",
      "Testing",
      "Git / CI",
    ],
    examples: [
      {
        href: "https://github.com/AlixANNERAUD/Web_site/blob/main/AGENTS.md",
        label: {
          fr: "Instructions multi-agents",
          en: "Shared agent guidelines",
        },
        detail: {
          fr: "Une seule convention pour plusieurs assistants.",
          en: "One shared convention across coding assistants.",
        },
      },
      {
        projectId: "xila",
        detail: {
          fr: "Projet Rust avec tests et intégration continue.",
          en: "Rust project with tests and continuous integration.",
        },
      },
    ],
  },
];

export interface SpokenLanguage {
  id: string;
  name: SkillTranslation;
  proficiency: SkillTranslation;
  detail?: SkillTranslation;
}

export const spokenLanguages: SpokenLanguage[] = [
  {
    id: "french",
    name: { fr: "Français", en: "French" },
    proficiency: { fr: "Langue maternelle", en: "Native" },
  },
  {
    id: "english",
    name: { fr: "Anglais", en: "English" },
    proficiency: { fr: "Courant", en: "Fluent" },
    detail: { fr: "TOEIC 975 · C1", en: "TOEIC 975 · C1" },
  },
  {
    id: "spanish",
    name: { fr: "Espagnol", en: "Spanish" },
    proficiency: { fr: "Notions", en: "Basic" },
    detail: { fr: "A2", en: "A2" },
  },
  {
    id: "german",
    name: { fr: "Allemand", en: "German" },
    proficiency: { fr: "Notions", en: "Basic" },
    detail: { fr: "A2", en: "A2" },
  },
];
