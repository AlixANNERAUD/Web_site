import { LocaleSpecificConfig, type DefaultTheme } from "vitepress";

export const ENGLISH_CONFIGURATION: LocaleSpecificConfig = {
  description: "Vite & Vue powered static site generator.",

  themeConfig: {
    nav: nav(),

    footer: {
      message:
        "Alix ANNERAUD - <a href='https://mit-license.org/'>MIT License</a> - Powered by <a href='https://vitepress.dev/'>VitePress</a>",
    },
  },
};

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "Experiences",
      link: "/experiences/",
      activeMatch: "^/experiences",
    },
    {
      text: "Projects",
      link: "/projects/",
      activeMatch: "^/projects",
    },
    {
      text: "Skills",
      link: "/skills/",
      activeMatch: "^/skills",
    },
    {
      text: "Resume",
      link: "/resume/",
      activeMatch: "^/resume",
    },
  ];
}
