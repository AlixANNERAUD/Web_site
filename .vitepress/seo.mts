import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type { PageData, HeadConfig } from "vitepress";

/**
 * SEO metadata from the same locale-aware routes used by VitePress.
 * English source pages are under src/en but are published at the site root.
 */
const SOURCE_DIRECTORY = fileURLToPath(new URL("../src/", import.meta.url));
const SITE_ORIGIN = "https://alix.anneraud.fr";
const IMAGE_URL = SITE_ORIGIN + "/images/alix.webp";

export function pagePublicPath(relativePath: string): string {
  const source = relativePath.replaceAll("\\", "/").replace(/^(en|fr)\//, "");
  const localePrefix = relativePath.startsWith("fr/") ? "/fr" : "";
  const bare = source.replace(/\.md$/, "").replace(/(^|\/)index$/, "$1");
  if (!bare || bare === "/") return localePrefix ? "/fr/" : "/";
  return localePrefix + "/" + bare.replace(/^\/|\/$/g, "");
}

/**
 * VitePress calls this for SSR and client-side navigation, unlike transformHead.
 */
export function applyPortfolioSEO(pageData: PageData): void {
  if (pageData.relativePath === "404.md") return;

  const pagePath = pageData.relativePath.replaceAll("\\", "/");
  const isFrench = pagePath.startsWith("fr/");
  const lang = isFrench ? "fr" : "en";
  const counterpartLang = isFrench ? "en" : "fr";
  const bare = pagePath.replace(/^(en|fr)\//, "");
  const canonical = SITE_ORIGIN + pagePublicPath(pagePath);
  const counterpartPath = counterpartLang + "/" + bare;
  const translated = existsSync(new URL(counterpartPath, "file://" + SOURCE_DIRECTORY));

  const title = pageData.frontmatter.layout === "home"
    ? isFrench
      ? "Alix ANNERAUD — Logiciel, Rust et systèmes embarqués"
      : "Alix ANNERAUD — Software, Rust and embedded systems"
    : (pageData.title ? `${pageData.title} | Alix ANNERAUD` : "Alix ANNERAUD");

  const description = typeof pageData.frontmatter.description === "string"
    ? pageData.frontmatter.description
    : isFrench
      ? "Portfolio d'Alix ANNERAUD : systèmes Rust, logiciel embarqué, sécurité, projets open source et ingénierie logicielle."
      : "Alix ANNERAUD's portfolio: Rust systems, embedded software, security, open source and software engineering.";

  const seoHead: HeadConfig[] = [
    ["link", { rel: "canonical", href: canonical }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: "Alix ANNERAUD" }],
    ["meta", { property: "og:locale", content: isFrench ? "fr_FR" : "en_US" }],
    ["meta", { property: "og:title", content: title }],
    ["meta", { property: "og:description", content: description }],
    ["meta", { property: "og:url", content: canonical }],
    ["meta", { property: "og:image", content: IMAGE_URL }],
    ["meta", { property: "og:image:alt", content: isFrench ? "Portrait d'Alix ANNERAUD" : "Portrait of Alix ANNERAUD" }],
    ["meta", { name: "twitter:card", content: "summary" }],
    ["meta", { name: "twitter:title", content: title }],
    ["meta", { name: "twitter:description", content: description }],
    ["meta", { name: "twitter:image", content: IMAGE_URL }],
  ];

  if (translated) {
    const englishPath = lang === "en" ? pagePath : counterpartPath;
    const frenchPath = lang === "fr" ? pagePath : counterpartPath;
    const englishURL = SITE_ORIGIN + pagePublicPath(englishPath);
    seoHead.push(
      ["link", { rel: "alternate", hreflang: "en", href: englishURL }],
      ["link", { rel: "alternate", hreflang: "fr", href: SITE_ORIGIN + pagePublicPath(frenchPath) }],
      ["link", { rel: "alternate", hreflang: "x-default", href: englishURL }],
    );
  }

  if (bare === "index.md") {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Alix ANNERAUD",
      url: SITE_ORIGIN + "/",
      image: IMAGE_URL,
      sameAs: [
        "https://github.com/AlixANNERAUD",
        "https://www.linkedin.com/in/alix-anneraud/",
      ],
      knowsAbout: ["Rust", "WebAssembly", "Embedded software", "Systems programming", "Security"],
    };
    seoHead.push(["script", { type: "application/ld+json" }, JSON.stringify(jsonLd)]);
  }

  pageData.frontmatter.head ??= [];
  pageData.frontmatter.head.push(...seoHead);
}
