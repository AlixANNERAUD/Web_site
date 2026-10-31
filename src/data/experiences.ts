/** Bilingual, public-safe experience highlights for the portfolio timeline. */
export type ExperienceLanguage = "fr" | "en";
export type ExperienceTranslation = Record<ExperienceLanguage, string>;
export type ExperienceGroup = "professional" | "education";

export interface PortfolioExperience {
  id: string;
  group: ExperienceGroup;
  company: string;
  companyUrl?: string;
  monogram: string;
  /** Verified public logo URL; only shown alongside the organization name. */
  logo?: string;
  /** Logo whose artwork is intentionally white (on a dark card). */
  logoOnDark?: boolean;
  role: ExperienceTranslation;
  period: ExperienceTranslation;
  location: ExperienceTranslation;
  summary: ExperienceTranslation;
  highlights: ExperienceTranslation[];
  technologies: string[];
  ongoing?: boolean;
  /** Earlier milestone: hide its complete card until the section is expanded. */
  earlier?: boolean;
}

export const experiences: PortfolioExperience[] = [
  {
    id: "memo-bank",
    logo: "https://memo.bank/logo-footer.svg",
    logoOnDark: true,
    group: "professional",
    company: "Memo Bank",
    companyUrl: "https://memo.bank/",
    monogram: "M",
    role: { fr: "Ingénieur sécurité", en: "Security Engineer" },
    period: { fr: "Sept. 2026 - Août 2027", en: "Sep 2026 - Aug 2027" },
    location: { fr: "Paris, France", en: "Paris, France" },
    summary: {
      fr: "Ingénierie sécurité dans l'environnement d'une banque.",
      en: "Security engineering in a banking environment.",
    },
    highlights: [],
    technologies: ["Security", "Software engineering"],
    ongoing: true,
  },
  {
    id: "linkt",
    logo: "https://www.linkt.fr/wp-content/uploads/2026/05/logo-linkt-bleu-marine.svg",
    group: "professional",
    company: "Linkt",
    companyUrl: "https://linkt.fr/",
    monogram: "L",
    role: {
      fr: "Technicien réseau et télécoms",
      en: "Network & Telecom Technician",
    },
    period: { fr: "Déc. 2025 - Sept. 2026", en: "Dec 2025 - Sep 2026" },
    location: {
      fr: "Mont-Saint-Aignan, France",
      en: "Mont-Saint-Aignan, France",
    },
    summary: {
      fr: "Diagnostic d'incidents, exploitation réseau et automatisation des outils de support.",
      en: "Incident investigation, network operations and support-tool automation.",
    },
    highlights: [
      {
        fr: "Diagnostic des accès FTTH/FTTO, xDSL et 4G/5G, VPN MPLS et téléphonie SIP, en coordination avec les opérateurs.",
        en: "Investigated FTTH/FTTO, xDSL and 4G/5G connectivity, MPLS VPNs and SIP telephony alongside upstream operators.",
      },
      {
        fr: "Dépannage d'équipements Cisco, Juniper, MikroTik et Keenetic : routage, VLAN, DHCP et redondance.",
        en: "Troubleshot Cisco, Juniper, MikroTik and Keenetic equipment: routing, VLANs, DHCP and failover.",
      },
      {
        fr: "Création d'une extension Vue/WXT pour enrichir les tickets et accélérer les diagnostics.",
        en: "Built a Vue/WXT browser extension to enrich support tickets and streamline diagnostics.",
      },
    ],
    technologies: ["Network L2/L3", "MPLS", "VoIP", "Vue", "WXT"],
  },
  {
    id: "amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    group: "professional",
    company: "Amazon",
    companyUrl: "https://www.amazon.jobs/",
    monogram: "a",
    role: {
      fr: "Stagiaire en ingénierie logicielle",
      en: "Software Engineering Intern",
    },
    period: { fr: "Mai - Août 2025", en: "May - Aug 2025" },
    location: { fr: "Madrid, Espagne", en: "Madrid, Spain" },
    summary: {
      fr: "Modernisation d'un outil interne d'investigation de contenus pour des équipes marketing.",
      en: "Modernized an internal content discovery and investigation tool for marketing teams.",
    },
    highlights: [
      {
        fr: "Amélioration des parcours utilisateurs et de la performance des recherches.",
        en: "Improved user-facing workflows and search performance.",
      },
      {
        fr: "Extension de la prise en charge de plusieurs régions, sur une pile Java, Python, TypeScript et AWS.",
        en: "Extended multi-region support across a Java, Python, TypeScript and AWS stack.",
      },
    ],
    technologies: ["Java", "Python", "React", "AWS", "Redshift"],
  },
  {
    id: "nyu",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Nyu_short_color.svg",
    group: "professional",
    company: "New York University",
    companyUrl: "https://www.nyu.edu/",
    monogram: "NYU",
    role: { fr: "Stagiaire en recherche", en: "Research Intern" },
    period: { fr: "Juin - Août 2024", en: "Jun - Aug 2024" },
    location: { fr: "New York, États-Unis", en: "New York, USA" },
    summary: {
      fr: "Recherche sur la localisation de sources de gaz à partir de réseaux de capteurs.",
      en: "Research on gas source localization with distributed sensor networks.",
    },
    highlights: [
      {
        fr: "Simulation de la diffusion et exploration d'algorithmes de localisation en présence de bruit.",
        en: "Simulated diffusion and explored source-localization algorithms under noisy measurements.",
      },
      {
        fr: "Prototypage d'acquisition et analyse statistique des données.",
        en: "Prototyped data acquisition and statistical analysis.",
      },
    ],
    technologies: ["Python", "C++", "Simulation", "Signal processing"],
  },
  {
    id: "insa-relations",
    earlier: true,
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Logo_INSA_RN.jpg",
    group: "professional",
    company: "INSA Rouen Normandie",
    companyUrl: "https://www.insa-rouen.fr/",
    monogram: "IN",
    role: {
      fr: "Assistant aux relations entreprises",
      en: "Corporate Relations Assistant",
    },
    period: { fr: "2021 - 2024", en: "2021 - 2024" },
    location: { fr: "Rouen, France", en: "Rouen, France" },
    summary: {
      fr: "Gestion de données partenaires et appui aux campagnes de relations entreprises.",
      en: "Partner-data management and support for corporate-relations campaigns.",
    },
    highlights: [
      {
        fr: "Collecte, nettoyage et maintenance des données entreprises et anciens élèves.",
        en: "Collected, cleaned and maintained partner-company and alumni data.",
      },
      {
        fr: "Appui au suivi administratif et aux campagnes de taxe d'apprentissage.",
        en: "Supported administrative follow-up and apprenticeship-tax outreach.",
      },
    ],
    technologies: ["Data management", "Partner relations"],
  },
  {
    id: "therapic",
    logo: "https://www.becquerel.fr/wp-content/uploads/2022/10/logo-becquerel-blanc_tournant.jpg",
    group: "education",
    company: "INSA Rouen × Centre Henri Becquerel",
    companyUrl: "https://www.becquerel.fr/",
    monogram: "T",
    role: {
      fr: "Chef de projet / Product Owner - ThéraPIC",
      en: "Project Lead / Product Owner - ThéraPIC",
    },
    period: { fr: "2025", en: "2025" },
    location: { fr: "Rouen, France", en: "Rouen, France" },
    summary: {
      fr: "Projet d'ingénierie avec des pharmaciens cliniciens pour centraliser les données utiles à la validation pharmaceutique.",
      en: "Engineering project with clinical pharmacists to centralize information used for pharmaceutical prescription review.",
    },
    highlights: [
      {
        fr: "Coordination de l'équipe, recueil des besoins et pilotage des livrables.",
        en: "Coordinated the team, requirements and delivery milestones.",
      },
      {
        fr: "Architecture Django REST / Vue.js, environnement Docker, tests et CI.",
        en: "Developed a Django REST / Vue.js architecture with Docker, testing and CI.",
      },
    ],
    technologies: ["Django", "Vue", "TypeScript", "PostgreSQL", "Docker"],
  },
  {
    id: "insa-engineering",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Logo_INSA_RN.jpg",
    group: "education",
    company: "INSA Rouen Normandie",
    companyUrl: "https://www.insa-rouen.fr/",
    monogram: "IN",
    role: {
      fr: "Diplôme d'ingénieur informatique",
      en: "Computer Engineering Degree",
    },
    period: { fr: "2021 - 2027", en: "2021 - 2027" },
    location: { fr: "Rouen, France", en: "Rouen, France" },
    summary: {
      fr: "Formation en algorithmique, systèmes d'exploitation, informatique embarquée, réseaux, génie logiciel et intelligence artificielle.",
      en: "Studies in algorithms, operating systems, embedded computing, networks, software engineering and AI.",
    },
    highlights: [],
    technologies: ["Systems", "Networks", "Software engineering"],
    ongoing: true,
  },
  // Earlier milestones remain first-class timeline entries, but show their
  // extended details on demand to keep the page focused on recent experience.
  {
    id: "renault-cleon",
    group: "professional",
    earlier: true,
    company: "Renault Cléon",
    companyUrl: "https://www.renaultgroup.com/",
    monogram: "R",
    role: {
      fr: "Stagiaire en production",
      en: "Production Intern",
    },
    period: { fr: "2022", en: "2022" },
    location: { fr: "Cléon, France", en: "Cléon, France" },
    summary: {
      fr: "Stage ouvrier d'un mois sur une ligne de production de rotors et de stators.",
      en: "One-month production internship on a rotor and stator manufacturing line.",
    },
    highlights: [
      {
        fr: "Immersion dans un environnement industriel de fabrication automobile.",
        en: "Gained first-hand exposure to an automotive manufacturing environment.",
      },
      {
        fr: "Découverte des contraintes et de l'organisation du travail sur une ligne de production.",
        en: "Observed the constraints and organization of work on a production line.",
      },
    ],
    technologies: ["Industrial production"],
  },
  {
    id: "guenola-sahut",
    group: "professional",
    earlier: true,
    company: "Guenola Sahut",
    monogram: "GS",
    role: {
      fr: "Assistant en communication",
      en: "Communication Assistant",
    },
    period: { fr: "2019", en: "2019" },
    location: { fr: "France", en: "France" },
    summary: {
      fr: "Expérience d'assistance en communication auprès de Guenola Sahut.",
      en: "Early experience assisting Guenola Sahut with communication work.",
    },
    highlights: [
      {
        fr: "Appui aux activités de communication et à leur organisation.",
        en: "Assisted with communication activities and their organization.",
      },
    ],
    technologies: ["Communication"],
  },
  {
    id: "baccalaureat",
    group: "education",
    earlier: true,
    company: "Enseignement secondaire",
    monogram: "BAC",
    role: {
      fr: "Baccalauréat scientifique - section européenne",
      en: "Scientific Baccalaureate - European Section",
    },
    period: { fr: "2021", en: "2021" },
    location: { fr: "France", en: "France" },
    summary: {
      fr: "Baccalauréat scientifique obtenu avec un parcours en section européenne.",
      en: "Scientific baccalaureate with a European-section curriculum.",
    },
    highlights: [
      {
        fr: "Enseignement général scientifique complété par la section européenne.",
        en: "Science-focused secondary education including a European section.",
      },
    ],
    technologies: [],
  },
  {
    id: "cambridge-b1",
    group: "education",
    earlier: true,
    company: "Cambridge English",
    companyUrl: "https://www.cambridgeenglish.org/",
    monogram: "B1",
    role: {
      fr: "Certification Cambridge B1 Preliminary",
      en: "Cambridge B1 Preliminary Certificate",
    },
    period: { fr: "2018", en: "2018" },
    location: { fr: "", en: "" },
    summary: {
      fr: "Certification d'anglais attestant le niveau B1.",
      en: "English-language certification at B1 level.",
    },
    highlights: [
      {
        fr: "Certification Cambridge English Preliminary obtenue en 2018.",
        en: "Cambridge English Preliminary certification earned in 2018.",
      },
    ],
    technologies: ["English · B1"],
  },
];
