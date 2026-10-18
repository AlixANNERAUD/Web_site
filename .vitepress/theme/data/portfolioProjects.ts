export type ProjectCategory = "systems" | "web" | "infrastructure" | "embedded";
export type PortfolioLanguage = "fr" | "en";

export interface PortfolioProject {
  id: string;
  title: string;
  year: string;
  category: ProjectCategory;
  symbol: string;
  tags: string[];
  url: string;
  text: Record<PortfolioLanguage, string>;
  linkLabel: Record<PortfolioLanguage, string>;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "xila",
    title: "Xila",
    year: "2019 —",
    category: "systems",
    symbol: "X",
    tags: ["Rust", "WebAssembly", "ESP32"],
    url: "https://www.xila.dev",
    text: {
      fr: "Un système d'exploitation léger pour microcontrôleurs, avec noyau Rust, applications WebAssembly et démonstration dans le navigateur.",
      en: "A lightweight operating system for microcontrollers, combining a Rust kernel, WebAssembly applications and a browser demo.",
    },
    linkLabel: { fr: "Découvrir Xila", en: "Explore Xila" },
  },
  {
    id: "mini-train-store",
    title: "Mini Train Store",
    year: "2026 —",
    category: "web",
    symbol: "M",
    tags: ["Odoo", "Vue", "Docker"],
    url: "https://www.minitrainstore.fr",
    text: {
      fr: "Une boutique e-commerce auto-hébergée et une extension de navigateur pour simplifier la gestion des annonces et du stock.",
      en: "A self-hosted online store and custom browser extension to simplify listings and inventory management.",
    },
    linkLabel: { fr: "Voir la boutique", en: "Visit the store" },
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    year: "2020 —",
    category: "infrastructure",
    symbol: "↗",
    tags: ["Linux", "Ansible", "Docker"],
    url: "https://github.com/AlixANNERAUD/Infrastructure",
    text: {
      fr: "Une infrastructure personnelle auto-hébergée, reproductible et orientée souveraineté des données.",
      en: "A reproducible self-hosted infrastructure built around Linux, automation and data sovereignty.",
    },
    linkLabel: { fr: "Voir le dépôt", en: "View repository" },
  },
  {
    id: "dera",
    title: "dera.page",
    year: "2022 —",
    category: "web",
    symbol: "d.",
    tags: ["Rust", "Docker", "Web"],
    url: "https://dera.page",
    text: {
      fr: "Une plateforme de services pour étudiants, avec agenda, messagerie et réseau social, conçue autour du respect de la vie privée.",
      en: "A privacy-focused student services platform with a calendar, messaging and a social network.",
    },
    linkLabel: { fr: "Voir le site", en: "Visit website" },
  },
  {
    id: "model-railway",
    title: "Réseau ferroviaire / Model railway",
    year: "2019 —",
    category: "embedded",
    symbol: "≋",
    tags: ["DCC", "Électronique", "Embarqué"],
    url: "https://github.com/AlixANNERAUD",
    text: {
      fr: "Conception de cartes électroniques pour la détection d'occupation et la signalisation automatisée d'un réseau H0.",
      en: "Custom electronics for occupancy detection and automated signalling on an H0-scale railway.",
    },
    linkLabel: { fr: "Voir mon GitHub", en: "Explore my GitHub" },
  },
  {
    id: "connected-speaker",
    title: "Enceinte connectée / Connected speaker",
    year: "2023",
    category: "embedded",
    symbol: "◉",
    tags: ["ESP32", "C++", "JavaScript"],
    url: "https://github.com/AlixANNERAUD/Connected_speaker",
    text: {
      fr: "Une interface de commande Wi-Fi pour un amplificateur audio, pilotée par un ESP32.",
      en: "An ESP32-powered Wi-Fi control interface for a hi-fi amplifier.",
    },
    linkLabel: { fr: "Voir le code", en: "View source" },
  },
];
