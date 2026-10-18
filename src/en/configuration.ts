import { LocaleSpecificConfig, type DefaultTheme } from "vitepress";

export const ENGLISH_CONFIGURATION: LocaleSpecificConfig = {
  description:
    "Alix ANNERAUD's portfolio: Rust systems engineering, embedded software, security and open-source projects.",

  themeConfig: {
    nav: nav(),

    footer: {
      message:
        "Alix ANNERAUD - <a href='https://mit-license.org/'>MIT License</a> - Powered by <a href='https://vitepress.dev/'>VitePress</a> - <a href='/legal-notice'>Legal Notice</a>",
    },
  },
};

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "Experiences",
      link: "/experiences",
      activeMatch: "^/experiences",
    },
    {
      text: "Projects",
      link: "/projects",
      activeMatch: "^/projects",
    },
    {
      text: "Skills",
      link: "/skills",
      activeMatch: "^/skills",
    },
    {
      text: "Resume",
      link: "/resume",
      activeMatch: "^/resume",
    },
  ];
}
