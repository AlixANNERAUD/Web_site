import { LocaleSpecificConfig, type DefaultTheme } from "vitepress";

export const FRENCH_CONFIGURATION: LocaleSpecificConfig = {
  description: "Un portfolio de développeur frontend construit avec VitePress.",

  themeConfig: {
    nav: nav(),
    footer: {
      message:
        "Alix ANNERAUD - <a href='https://mit-license.org/'>Licence MIT</a> - Conçu avec <a href='https://vitepress.dev/'>VitePress</a>",
    },
    docFooter: {
      prev: "Précédent",
      next: "Suivant",
    },
    outline: {
      label: "Sur cette page",
    },
    lastUpdated: {
      text: "Mis à jour le",
    },
    notFound: {
      title: "PAGE NON TROUVÉE",
      quote:
        "Mais si vous ne changez pas de direction et continuez à chercher, vous pourriez finir là où vous vous dirigez.",
      linkLabel: "aller à l'accueil",
      linkText: "Ramenez-moi à l'accueil",
    },
    langMenuLabel: "Changer de langue",
    returnToTopLabel: "Retour en haut",
    sidebarMenuLabel: "Menu latéral",
    darkModeSwitchLabel: "Thème sombre",
    lightModeSwitchTitle: "Passer en mode clair",
    darkModeSwitchTitle: "Passer en mode sombre",
    skipToContentLabel: "Aller au contenu",
  },
};

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "Expériences",
      link: "/fr/experiences/",
      activeMatch: "^/fr/experiences",
    },
    {
      text: "Projets",
      link: "/fr/projects/",
      activeMatch: "^/fr/projects",
    },
    {
      text: "Compétences",
      link: "/fr/skills/",
      activeMatch: "^/fr/skills",
    },
    {
      text: "CV",
      link: "/fr/resume/",
      activeMatch: "^/fr/resume",
    },
  ];
}
