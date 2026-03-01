import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";
import { ENGLISH_CONFIGURATION } from "../src/en/configuration";
import { FRENCH_CONFIGURATION } from "../src/fr/configuration";
import tailwindcss from "@tailwindcss/vite";

// https://vitepress.dev/reference/site-config
const configuration = defineConfig({
  title: "Alix ANNERAUD",
  srcDir: "./src",
  sitemap: {
    hostname: "https://alix.anneraud.fr",
  },
  rewrites: {
    "en/:rest*": ":rest*",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  lastUpdated: false,

  locales: {
    root: {
      label: "English",
      lang: "en-US",
      ...ENGLISH_CONFIGURATION,
    },
    fr: {
      label: "Français",
      lang: "fr-FR",
      link: "/fr/",

      ...FRENCH_CONFIGURATION,
    },
  },
  head: [
    [
      "script",
      {
        defer: "",
        src: "https://s.anneraud.fr/script.js",
        "data-website-id": "89a5e147-d520-4293-aa35-f80eb903ae3a",
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    i18nRouting: true,

    footer: {
      message:
        "Administré par <a href='https://alix.anneraud.fr'>Alix ANNERAUD</a> - Sous licence <a href='https://mit-license.org/'>MIT</a> - Conçu avec <a href='https://vitepress.dev/'>VitePress</a>",
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/AlixANNERAUD",
      },
      {
        icon: "linkedin",
        link: "https://www.linkedin.com/in/alix-anneraud/",
      },
      {
        icon: "matrix",
        link: "https://matrix.to/#/@alix:anneraud.fr",
      },
      {
        icon: "maildotru",
        link: "mailto:alix@anneraud.fr",
      },
    ],
  },
});

export default withMermaid(configuration);
