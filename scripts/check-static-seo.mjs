import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Build-output smoke tests for the bilingual VitePress site.
 * The test intentionally parses generated HTML instead of trusting only config.
 */
const dist = resolve(".vitepress/dist");
const cases = [
  ["index.html", "/", "/fr/"],
  ["fr/index.html", "/fr/", "/"],
  ["projects.html", "/projects", "/fr/projects"],
  ["fr/projects.html", "/fr/projects", "/projects"],
  ["projects/xila.html", "/projects/xila", "/fr/projects/xila"],
  ["fr/projects/xila.html", "/fr/projects/xila", "/projects/xila"],
  ["experiences.html", "/experiences", "/fr/experiences"],
  ["fr/experiences.html", "/fr/experiences", "/experiences"],
  ["skills.html", "/skills", "/fr/skills"],
  ["fr/skills.html", "/fr/skills", "/skills"],
];

// Test EVERY static detail route, including alternate locale metadata.
const catalogueSource = readFileSync(resolve(".vitepress/theme/data/portfolioProjects.ts"), "utf8");
const declaration = "export const portfolioProjects: PortfolioProject[] = ";
const catalogueStart = catalogueSource.indexOf(declaration) + declaration.length;
const catalogueEnd = catalogueSource.indexOf(";\n\nexport function projectDetailUrl", catalogueStart);
if (catalogueStart < declaration.length || catalogueEnd < 0) {
  throw new Error("Could not find catalogue in portfolioProjects.ts");
}
const projectIds = JSON.parse(catalogueSource.slice(catalogueStart, catalogueEnd))
  .map((project) => project.id);
for (const id of projectIds) {
  if (id !== "xila") {
    cases.push([`projects/${id}.html`, `/projects/${id}`, `/fr/projects/${id}`]);
    cases.push([`fr/projects/${id}.html`, `/fr/projects/${id}`, `/projects/${id}`]);
  }
}
for (const removed of ["projects/archive.html", "fr/projects/archive.html"]) {
  if (existsSync(resolve(dist, removed))) {
    throw new Error("The old project archive was published: " + removed);
  }
}

const required = [
  /<meta[^>]+property="og:title"/,
  /<meta[^>]+property="og:description"/,
  /<meta[^>]+property="og:image"/,
  /<meta[^>]+name="twitter:card"/,
  /<meta[^>]+name="description"/,
];

const failed = [];
for (const [file, canonicalPath, translationPath] of cases) {
  const filename = resolve(dist, file);
  if (!existsSync(filename)) {
    failed.push("Missing output: " + file);
    continue;
  }
  const html = readFileSync(filename, "utf8");
  if (file.startsWith("projects/") || file.startsWith("fr/projects/")) {
    const headings = [...html.matchAll(/<h1(?:\s|>)/g)];
    if (headings.length !== 1) {
      failed.push(file + ": expected exactly one project H1, found " + headings.length);
    }
    if (html.includes("/projects/archive")) {
      failed.push(file + ": legacy archive link found");
    }
  }
  for (const pattern of required) {
    if (!pattern.test(html)) failed.push(file + ": missing " + pattern);
  }
  for (const [kind, path] of [
    ["canonical", canonicalPath],
    ["translation", translationPath],
  ]) {
    const url = "https://alix.anneraud.fr" + path;
    if (!html.includes(url)) failed.push(file + ": missing " + kind + " URL " + url);
  }
  if (!html.includes('hreflang="fr"') || !html.includes('hreflang="en"')) {
    failed.push(file + ": incomplete language alternates");
  }
}
for (const file of ["index.html", "fr/index.html"]) {
  const html = readFileSync(resolve(dist, file), "utf8");
  if (!html.includes("application/ld+json") || !html.includes("schema.org")) {
    failed.push(file + ": missing Person structured data");
  }
}
// Structural regressions: these pages use one page-level heading and a
// purpose-built layout rather than the legacy Markdown/document components.
for (const [file, marker] of [
  ["projects.html", "portfolio-showcase--catalogue"],
  ["fr/projects.html", "portfolio-showcase--catalogue"],
  ["experiences.html", "career-timeline"],
  ["fr/experiences.html", "career-timeline"],
  ["skills.html", "skills-domain-grid"],
  ["fr/skills.html", "skills-domain-grid"],
]) {
  const filename = resolve(dist, file);
  if (!existsSync(filename)) continue;
  const html = readFileSync(filename, "utf8");
  const h1Count = [...html.matchAll(/<h1(?:\s|>)/g)].length;
  if (h1Count !== 1) {
    failed.push(file + ": expected exactly one h1, found " + h1Count);
  }
  if (!html.includes(marker)) {
    failed.push(file + ": new portfolio layout not SSR-rendered (" + marker + ")");
  }
}

// Shared visual primitives must render as HTML in both locales.
for (const file of [
  "projects.html", "fr/projects.html", "experiences.html",
  "fr/experiences.html", "skills.html", "fr/skills.html",
]) {
  const html = readFileSync(resolve(dist, file), "utf8");
  if (!html.includes("editorial-hero")) {
    failed.push(file + ": shared editorial hero missing");
  }
  if (!html.includes("editorial-card") || !html.includes("editorial-tags")) {
    failed.push(file + ": shared editorial cards/tags missing");
  }
}
for (const file of ["experiences.html", "fr/experiences.html", "skills.html", "fr/skills.html"]) {
  const html = readFileSync(resolve(dist, file), "utf8");
  if (!html.includes("editorial-section-heading") || !html.includes("editorial-next")) {
    failed.push(file + ": shared section/CTA missing");
  }
}

// Skills must be real SSR content rather than hidden client-only cards.
for (const [file, projectPrefix] of [
  ["skills.html", "/projects/"],
  ["fr/skills.html", "/fr/projects/"],
]) {
  const html = readFileSync(resolve(dist, file), "utf8");
  const cards = [...html.matchAll(/<article[^>]+class="[^"]*skills-domain-card[^"]*"/g)].length;
  if (cards !== 6) {
    failed.push(file + ": expected six skill domain cards, found " + cards);
  }
  if (!html.includes("skills-language-grid") || !html.includes("TOEIC 975")) {
    failed.push(file + ": language proficiency section missing");
  }
  for (const id of ["xila", "nanoexpr", "deez-nalyzer", "infrastructure", "mini-train-store"]) {
    if (!html.includes(projectPrefix + id)) {
      failed.push(file + ": missing evidence link to " + id);
    }
  }
  if (html.includes("class=\"skill-domain\"")) {
    failed.push(file + ": legacy SkillDomain layout still rendered");
  }
}

// Experience logos must appear in both generated locales. This is a
// structural check; browser/network verification of remote assets is separate.
for (const file of ["experiences.html", "fr/experiences.html"]) {
  const html = readFileSync(resolve(dist, file), "utf8");
  if (!html.includes("career-company-logo") || !html.includes("logo-becquerel-blanc_tournant.jpg")) {
    failed.push(file + ": experience company logo markup missing from SSR");
  }
}

if (failed.length) {
  console.error("Static SEO checks failed:\n" + failed.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Verified canonical, hreflang, Open Graph and structured data on " + cases.length + " built pages.");
}
