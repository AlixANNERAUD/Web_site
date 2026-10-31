/** Single source of truth for project metadata shared by the FR/EN pages. */
export type PortfolioLanguage = "fr" | "en";
export type ProjectCategory =
  "systems" | "web" | "infrastructure" | "embedded" | "security" | "data";
export type ProjectGroup = "personal" | "library" | "competition" | "academic";
export type Translation = Record<PortfolioLanguage, string>;

export interface ProjectRanking {
  technicalDepth: number;
  originality: number;
  practicalImpact: number;
  evidence: number;
}

export interface PortfolioProject {
  id: string;
  title: Translation;
  period: Translation;
  group: ProjectGroup;
  category: ProjectCategory;
  symbol: string;
  tags: string[];
  description: Translation;
  /** Human-reviewed editorial factors, scored 0-5; not external quality metrics. */
  ranking: ProjectRanking;
  featured?: boolean;
  externalUrl?: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "xila",
    title: {
      fr: "Xila",
      en: "Xila",
    },
    period: {
      fr: "2019 - Présent",
      en: "2019 - Present",
    },
    group: "personal",
    category: "systems",
    symbol: "X",
    tags: ["Rust", "WebAssembly"],
    description: {
      fr: "Un système d'exploitation léger pour microcontrôleurs avec noyau Rust, applications WebAssembly et démonstration dans le navigateur.",
      en: "A lightweight operating system for microcontrollers, combining a Rust kernel, WebAssembly applications and a browser demo.",
    },
    featured: true,
    externalUrl: "https://www.xila.dev",
    ranking: {
      technicalDepth: 5,
      originality: 5,
      practicalImpact: 4.5,
      evidence: 5,
    },
  },
  {
    id: "infrastructure",
    title: {
      fr: "Infrastructure",
      en: "Infrastructure",
    },
    period: {
      fr: "2020 - Présent",
      en: "2020 - Present",
    },
    group: "personal",
    category: "infrastructure",
    symbol: "↗",
    tags: ["Docker", "Ansible", "Debian"],
    description: {
      fr: "Une infrastructure personnelle auto-hébergée, automatisée et orientée souveraineté des données.",
      en: "A reproducible self-hosted infrastructure built around Linux, automation and data sovereignty.",
    },
    featured: true,
    externalUrl: "https://github.com/AlixANNERAUD/Infrastructure",
    ranking: {
      technicalDepth: 4.5,
      originality: 4.2,
      practicalImpact: 5,
      evidence: 4.5,
    },
  },
  {
    id: "mini-train-store",
    title: {
      fr: "Mini Train Store",
      en: "Mini Train Store",
    },
    period: {
      fr: "2026 - Présent",
      en: "2026 - Present",
    },
    group: "personal",
    category: "web",
    symbol: "M",
    tags: ["Odoo", "Docker", "Vue.js", "Wxt", "Tailwind", "PostgreSQL"],
    description: {
      fr: "Une boutique e-commerce auto-hébergée et une extension de navigateur pour simplifier la gestion des annonces et du stock.",
      en: "A self-hosted online store and custom browser extension to simplify listings and inventory management.",
    },
    featured: true,
    externalUrl: "https://github.com/AlixANNERAUD/MiniTrainStore",
    ranking: {
      technicalDepth: 4,
      originality: 4,
      practicalImpact: 5,
      evidence: 4.6,
    },
  },
  {
    id: "model-railway",
    title: {
      fr: "Réseau ferroviaire miniature",
      en: "Model railway network",
    },
    period: {
      fr: "2019 - Présent",
      en: "2019 - Present",
    },
    group: "personal",
    category: "embedded",
    symbol: "≋",
    tags: ["ESP32", "S88", "DCC", "Électronique"],
    description: {
      fr: "Cartes électroniques de détection d'occupation et commande de signalisation pour un réseau H0 numérique.",
      en: "Custom electronics for occupancy detection and automated signalling on an H0-scale railway.",
    },
    externalUrl: "https://github.com/AlixANNERAUD/S88-Wireless-Feedback-System",
    ranking: {
      technicalDepth: 4.2,
      originality: 4.3,
      practicalImpact: 3.7,
      evidence: 3.5,
    },
  },
  {
    id: "connected-speaker",
    title: {
      fr: "Enceinte connectée",
      en: "Connected speaker",
    },
    period: {
      fr: "2023",
      en: "2023",
    },
    group: "personal",
    category: "embedded",
    symbol: "◉",
    tags: ["C++", "JavaScript"],
    description: {
      fr: "Commande Wi-Fi d'un amplificateur hi-fi avec microcontrôleur ESP32 et interface web.",
      en: "An ESP32-powered Wi-Fi control interface for a hi-fi amplifier.",
    },
    externalUrl: "https://github.com/AlixANNERAUD/Connected_speaker",
    ranking: {
      technicalDepth: 3.2,
      originality: 3.3,
      practicalImpact: 3.4,
      evidence: 3.7,
    },
  },
  {
    id: "dera",
    title: {
      fr: "dera.page",
      en: "dera.page",
    },
    period: {
      fr: "2022 - Présent",
      en: "2022 - Present",
    },
    group: "personal",
    category: "web",
    symbol: "d.",
    tags: ["Rust", "Docker"],
    description: {
      fr: "Plateforme de services étudiants auto-hébergée, avec agenda, messagerie et réseau social.",
      en: "A privacy-focused student services platform with a calendar, messaging and a social network.",
    },
    externalUrl: "https://dera.page",
    ranking: {
      technicalDepth: 4.2,
      originality: 4.1,
      practicalImpact: 4.3,
      evidence: 3.8,
    },
  },
  {
    id: "lvgl-theme-shadcn",
    title: {
      fr: "lvgl_theme_shadcn",
      en: "lvgl_theme_shadcn",
    },
    period: {
      fr: "2026 - présent",
      en: "2026 - present",
    },
    group: "library",
    category: "embedded",
    symbol: "UI",
    tags: ["C99", "LVGL", "Rust", "UI"],
    description: {
      fr: "Un thème inspiré de shadcn/ui pour LVGL 9 : widgets, palettes claires/sombres et personnalisation sur microcontrôleurs.",
      en: "A shadcn/ui-inspired LVGL 9 theme: widget styling, light/dark palettes and customizable embedded interfaces.",
    },
    externalUrl: "https://github.com/AlixANNERAUD/lvgl_theme_shadcn",
    ranking: {
      technicalDepth: 3.9,
      originality: 4.1,
      practicalImpact: 3.5,
      evidence: 4.1,
    },
  },
  {
    id: "nanoexpr",
    title: {
      fr: "nanoexpr",
      en: "nanoexpr",
    },
    period: {
      fr: "2026 - présent",
      en: "2026 - present",
    },
    group: "library",
    category: "systems",
    symbol: "ƒ",
    tags: ["Rust", "no_std", "Parser", "C ABI"],
    description: {
      fr: "Parseur et évaluateur d'expressions mathématiques pour Rust embarqué, sans allocation dynamique et avec taille de pile bornée.",
      en: "Heap-free mathematical expression parser and evaluator for embedded Rust with bounded stack usage.",
    },
    externalUrl: "https://github.com/AlixANNERAUD/nanoexpr",
    ranking: {
      technicalDepth: 4.7,
      originality: 4.4,
      practicalImpact: 3.4,
      evidence: 4.8,
    },
  },
  {
    id: "nanoaudio",
    title: {
      fr: "nanoaudio",
      en: "nanoaudio",
    },
    period: {
      fr: "2026 - présent",
      en: "2026 - present",
    },
    group: "library",
    category: "embedded",
    symbol: "♫",
    tags: ["Rust", "no_std", "Audio", "DSP"],
    description: {
      fr: "Bibliothèque audio embarquée sans allocation : traitement PCM, mixage, buffers circulaires et codecs avec buffers fournis par l'appelant.",
      en: "Allocation-free embedded audio processing: PCM conversion, mixing, ring buffers and codecs using caller-owned memory.",
    },
    externalUrl: "https://github.com/AlixANNERAUD/nanoaudio",
    ranking: {
      technicalDepth: 4.6,
      originality: 4.3,
      practicalImpact: 3.3,
      evidence: 4.5,
    },
  },
  {
    id: "embedded-i18n",
    title: {
      fr: "embedded-i18n",
      en: "embedded-i18n",
    },
    period: {
      fr: "2026 - présent",
      en: "2026 - present",
    },
    group: "library",
    category: "embedded",
    symbol: "文",
    tags: ["Rust", "Macros", "no_std", "i18n"],
    description: {
      fr: "Internationalisation compilée dans le firmware Rust : traductions en ROM, validation à la compilation et fonctionnement sans allocateur.",
      en: "Compile-time localization for embedded Rust: translations stored in firmware, compile-time checks and allocator-free operation.",
    },
    externalUrl: "https://github.com/AlixANNERAUD/embedded-i18n",
    ranking: {
      technicalDepth: 4.3,
      originality: 4,
      practicalImpact: 3.2,
      evidence: 4.2,
    },
  },
  {
    id: "getargs-derive",
    title: {
      fr: "getargs-derive",
      en: "getargs-derive",
    },
    period: {
      fr: "2026 - présent",
      en: "2026 - present",
    },
    group: "library",
    category: "systems",
    symbol: ">_",
    tags: ["Rust", "Proc macros", "CLI", "no_std"],
    description: {
      fr: "Macros procédurales pour décrire des interfaces CLI en Rust embarqué, avec analyse sans allocation et aide générée à la compilation.",
      en: "Procedural macros for embedded Rust command-line interfaces, with allocation-free parsing and compile-time help generation.",
    },
    externalUrl: "https://github.com/AlixANNERAUD/getargs-derive",
    ranking: {
      technicalDepth: 4.1,
      originality: 3.8,
      practicalImpact: 3,
      evidence: 4.3,
    },
  },
  {
    id: "battery-percent",
    title: {
      fr: "battery-percent",
      en: "battery-percent",
    },
    period: {
      fr: "2026 - présent",
      en: "2026 - present",
    },
    group: "library",
    category: "embedded",
    symbol: "▰",
    tags: ["C99", "Rust", "Battery", "MCU"],
    description: {
      fr: "Estimation de charge par courbes de décharge et interpolation, avec filtrage ADC : bibliothèque C99 et bindings Rust no_std.",
      en: "Battery state-of-charge estimation from discharge curves and interpolation, with ADC filtering, in C99 and no_std Rust.",
    },
    externalUrl: "https://github.com/AlixANNERAUD/battery-percent",
    ranking: {
      technicalDepth: 3.7,
      originality: 3.9,
      practicalImpact: 3,
      evidence: 4.2,
    },
  },
  {
    id: "jeanne-hack-2026",
    title: {
      fr: "Jeanne d'Hack CTF (Université de Rouen)",
      en: "Jeanne d'Hack CTF (University of Rouen)",
    },
    period: {
      fr: "2026",
      en: "2026",
    },
    group: "competition",
    category: "security",
    symbol: "#1",
    tags: ["CTF"],
    description: {
      fr: "Première place ex æquo au classement général du CTF Jeanne d'Hack 2026.",
      en: "Joint first place in the overall ranking of the 2026 Jeanne d'Hack CTF.",
    },
    externalUrl: "https://www.jeanne-hack-ctf.org/post/2026/",
    ranking: {
      technicalDepth: 3,
      originality: 3.7,
      practicalImpact: 4.5,
      evidence: 5,
    },
  },
  {
    id: "codinsa-2025",
    title: {
      fr: "Cod'INSA",
      en: "Cod'INSA",
    },
    period: {
      fr: "2025",
      en: "2025",
    },
    group: "competition",
    category: "systems",
    symbol: "</>",
    tags: ["Algorithmique"],
    description: {
      fr: "Première place au concours de programmation compétitive Cod'INSA 2025.",
      en: "First place in the 2025 Cod'INSA competitive programming contest.",
    },
    externalUrl: "https://codinsa.org/static/past",
    ranking: {
      technicalDepth: 3.2,
      originality: 3.4,
      practicalImpact: 4.2,
      evidence: 4.5,
    },
  },
  {
    id: "jeanne-hack-2025",
    title: {
      fr: "Jeanne d'Hack CTF (Université de Rouen)",
      en: "Jeanne d'Hack CTF (University of Rouen)",
    },
    period: {
      fr: "2025",
      en: "2025",
    },
    group: "competition",
    category: "security",
    symbol: "#3",
    tags: ["CTF"],
    description: {
      fr: "Troisième place au classement général du CTF Jeanne d'Hack 2025.",
      en: "Third place in the overall ranking of the 2025 Jeanne d'Hack CTF.",
    },
    externalUrl: "https://www.jeanne-hack-ctf.org/post/2025/",
    ranking: {
      technicalDepth: 3,
      originality: 3.2,
      practicalImpact: 3.4,
      evidence: 4,
    },
  },
  {
    id: "tracs-2024",
    title: {
      fr: "TRACS (DGSE)",
      en: "TRACS (DGSE)",
    },
    period: {
      fr: "2024",
      en: "2024",
    },
    group: "competition",
    category: "security",
    symbol: "36",
    tags: ["CTF"],
    description: {
      fr: "Participation au challenge TRACS de la DGSE, avec une 36e place au classement étudiant.",
      en: "Participated in the DGSE TRACS challenge, placing 36th in the student ranking.",
    },
    externalUrl:
      "https://tracs.viarezo.fr/edition_results/show_student_ranking/2024/",
    ranking: {
      technicalDepth: 2.8,
      originality: 3.2,
      practicalImpact: 3,
      evidence: 3.8,
    },
  },
  {
    id: "deez-nalyzer",
    title: {
      fr: "Deez'Nalyzer",
      en: "Deez'Nalyzer",
    },
    period: {
      fr: "2024",
      en: "2024",
    },
    group: "academic",
    category: "data",
    symbol: "♫",
    tags: ["Django", "Vue.js", "ML"],
    description: {
      fr: "Application Django/Vue utilisant l'analyse audio et l'apprentissage automatique pour classifier des genres musicaux.",
      en: "A Django/Vue application using audio analysis and machine learning to classify music genres.",
    },
    externalUrl: "https://github.com/AlixANNERAUD/Deez_Nalyzer",
    ranking: {
      technicalDepth: 4.4,
      originality: 3.9,
      practicalImpact: 3.7,
      evidence: 4.8,
    },
  },
  {
    id: "eogm",
    title: {
      fr: "Cartographie d'occupation évidentielle (EOGM)",
      en: "Evidential Occupancy Grid Map (EOGM)",
    },
    period: {
      fr: "2024",
      en: "2024",
    },
    group: "academic",
    category: "embedded",
    symbol: "▦",
    tags: ["C++", "ROS"],
    description: {
      fr: "Cartographie d'occupation robotique à partir de capteurs embarqués, basée sur la théorie de Dempster-Shafer.",
      en: "Robotic occupancy mapping from onboard sensors, using Dempster-Shafer evidence theory.",
    },
    externalUrl: "https://github.com/AlixANNERAUD/Evidential_occupancy_map",
    ranking: {
      technicalDepth: 4.4,
      originality: 4.2,
      practicalImpact: 3.4,
      evidence: 3,
    },
  },
  {
    id: "iti-adventure",
    title: {
      fr: "ITI Aventure",
      en: "ITI Adventure",
    },
    period: {
      fr: "2024",
      en: "2024",
    },
    group: "academic",
    category: "web",
    symbol: "{ }",
    tags: ["Java"],
    description: {
      fr: "Jeu de rôle textuel Java appliquant programmation objet et patrons de conception.",
      en: "A text-based Java RPG exploring object-oriented design and software patterns.",
    },
    externalUrl: "https://github.com/AlixANNERAUD/ITI_aventure",
    ranking: {
      technicalDepth: 2.8,
      originality: 2.7,
      practicalImpact: 2.2,
      evidence: 2.8,
    },
  },
  {
    id: "huffman",
    title: {
      fr: "Compresseur/décompresseur Huffman",
      en: "Huffman (de)compressor",
    },
    period: {
      fr: "2023",
      en: "2023",
    },
    group: "academic",
    category: "systems",
    symbol: "01",
    tags: ["C"],
    description: {
      fr: "Compresseur/décompresseur Huffman écrit en C, avec manipulation des flux de bits.",
      en: "A Huffman compressor/decompressor written in C with bitstream processing.",
    },
    externalUrl: "https://github.com/AlixANNERAUD/Huffman_compressor",
    ranking: {
      technicalDepth: 3.3,
      originality: 2.8,
      practicalImpact: 2.5,
      evidence: 3.7,
    },
  },
  {
    id: "robot-mouche",
    title: {
      fr: "Robot mouche",
      en: "Robot mouche",
    },
    period: {
      fr: "2023",
      en: "2023",
    },
    group: "academic",
    category: "embedded",
    symbol: "⚙",
    tags: ["C++"],
    description: {
      fr: "Robot C++ pilotable en Wi-Fi ou autonome avec suivi de ligne et détection d'obstacles.",
      en: "A C++ robot combining Wi-Fi remote control, line following and obstacle avoidance.",
    },
    externalUrl: "https://github.com/AlixANNERAUD/Robot_Mouche",
    ranking: {
      technicalDepth: 3.2,
      originality: 3,
      practicalImpact: 2.7,
      evidence: 3.3,
    },
  },
  {
    id: "music-danceability",
    title: {
      fr: "Prédiction de la dansabilité musicale",
      en: "Music danceability",
    },
    period: {
      fr: "2023",
      en: "2023",
    },
    group: "academic",
    category: "data",
    symbol: "♪",
    tags: ["Python"],
    description: {
      fr: "Expérimentation en machine learning pour prédire la dansabilité d'un titre à partir de données Spotify.",
      en: "Machine-learning experiments predicting song danceability from Spotify audio features.",
    },
    externalUrl:
      "https://github.com/AlixANNERAUD/Music_danceability_prediction",
    ranking: {
      technicalDepth: 2.9,
      originality: 2.7,
      practicalImpact: 2.4,
      evidence: 3,
    },
  },
  {
    id: "insatram",
    title: {
      fr: "INSAtram",
      en: "INSAtram",
    },
    period: {
      fr: "2022",
      en: "2022",
    },
    group: "academic",
    category: "web",
    symbol: "T",
    tags: ["Free pascal"],
    description: {
      fr: "Jeu Free Pascal/SDL de gestion de réseau de tramway et de simulation de voyageurs.",
      en: "A Free Pascal/SDL tram network management and passenger-flow simulation game.",
    },
    externalUrl: "https://github.com/AlixANNERAUD/INSAtram",
    ranking: {
      technicalDepth: 3.2,
      originality: 3.4,
      practicalImpact: 2.5,
      evidence: 2.7,
    },
  },
  {
    id: "linear-equations",
    title: {
      fr: "Solveur de systèmes d'équations linéaires",
      en: "System of linear equations calculator",
    },
    period: {
      fr: "2022",
      en: "2022",
    },
    group: "academic",
    category: "data",
    symbol: "Σ",
    tags: ["C", "Algèbre linéaire"],
    description: {
      fr: "Résolution de systèmes linéaires en C par élimination de Gauss avec pivot partiel.",
      en: "A C implementation of Gaussian elimination with partial pivoting for linear systems.",
    },
    externalUrl:
      "https://github.com/AlixANNERAUD/System_of_linear_equations_solver",
    ranking: {
      technicalDepth: 2,
      originality: 2.2,
      practicalImpact: 2.2,
      evidence: 3.1,
    },
  },
  {
    id: "odor-localization",
    title: {
      fr: "Localisation de sources de gaz",
      en: "Gas source localization",
    },
    period: {
      fr: "2024",
      en: "2024",
    },
    group: "academic",
    category: "embedded",
    symbol: "◎",
    tags: ["ESP32", "MQTT", "Capteurs", "Recherche"],
    description: {
      fr: "Prototype de collecte de mesures de capteurs MQ via ESP32 et MQTT pour explorer la localisation de sources de gaz lors d'un stage de recherche.",
      en: "ESP32/MQ sensor acquisition and MQTT pipeline prototype for exploring gas source localization during a research internship.",
    },
    externalUrl: "https://github.com/AlixANNERAUD/Odor_localization",
    ranking: {
      technicalDepth: 4.1,
      originality: 4,
      practicalImpact: 3.4,
      evidence: 3,
    },
  },
  {
    id: "medical-image-deep-learning",
    title: {
      fr: "Segmentation d'images médicales",
      en: "Medical image segmentation",
    },
    period: {
      fr: "Projet académique",
      en: "Academic project",
    },
    group: "academic",
    category: "data",
    symbol: "▤",
    tags: ["Python", "Deep Learning", "nnU-Net", "CellViT"],
    description: {
      fr: "Expérimentation de segmentation et classification de tissus et cellules histopathologiques avec nnU-Net, CellViT++ et HoVer-Net.",
      en: "Histopathology tissue and cell segmentation/classification experiments using nnU-Net, CellViT++ and HoVer-Net.",
    },
    externalUrl: "https://github.com/AlixANNERAUD/Deep_learning_project",
    ranking: {
      technicalDepth: 4,
      originality: 3,
      practicalImpact: 3.3,
      evidence: 3.6,
    },
  },
];

export function projectDetailUrl(
  project: PortfolioProject,
  lang: PortfolioLanguage,
): string {
  const prefix = lang === "fr" ? "/fr" : "";
  return `${prefix}/projects/${project.id}`;
}

/** Portfolio editorial priorities (percent). Not universal project quality scores. */
export const PROJECT_RANK_WEIGHTS = {
  technicalDepth: 40,
  originality: 20,
  practicalImpact: 25,
  evidence: 15,
} as const satisfies Record<keyof ProjectRanking, number>;

/** Normalized 0-100 editorial relevance, higher first. */
export function projectScore(project: PortfolioProject): number {
  const weighted = (
    Object.keys(PROJECT_RANK_WEIGHTS) as (keyof ProjectRanking)[]
  ).reduce(
    (sum, factor) =>
      sum + project.ranking[factor] * PROJECT_RANK_WEIGHTS[factor],
    0,
  );
  return Math.round((weighted / 5) * 10) / 10;
}
