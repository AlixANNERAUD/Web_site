import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { portfolioProjects } from "../src/data/portfolioProjects.ts";

/**
 * Build-output smoke tests for the bilingual Astro site.
 * The test intentionally parses generated HTML instead of trusting only config.
 */
const dist = resolve("dist");
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
  ["resume.html", "/resume", "/fr/resume"],
  ["fr/resume.html", "/fr/resume", "/resume"],
  ["legal-notice.html", "/legal-notice", "/fr/legal-notice"],
  ["fr/legal-notice.html", "/fr/legal-notice", "/legal-notice"],
];

// Test EVERY static detail route, including alternate locale metadata.
const projectIds = portfolioProjects.map((project) => project.id);
for (const id of projectIds) {
  {
    cases.push([
      `projects/${id}.html`,
      `/projects/${id}`,
      `/fr/projects/${id}`,
    ]);
    cases.push([
      `fr/projects/${id}.html`,
      `/fr/projects/${id}`,
      `/projects/${id}`,
    ]);
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
      failed.push(
        file + ": expected exactly one project H1, found " + headings.length,
      );
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
    if (!html.includes(url))
      failed.push(file + ": missing " + kind + " URL " + url);
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
// Home is an engineering portfolio, not an Xila-only landing page.
// Professional experience and a broad project selection must precede
// the explicitly labelled Xila architecture deep dive in both locales.
for (const [file, experienceUrl] of [
  ["index.html", "/experiences"],
  ["fr/index.html", "/fr/experiences"],
]) {
  const html = readFileSync(resolve(dist, file), "utf8");
  const marks = [
    'class="home-hero"',
    'class="home-experience"',
    'class="home-experience-grid"',
    'class="portfolio-showcase"',
    'class="xila-topology"',
  ];
  const positions = marks.map((part) => html.indexOf(part));
  if (
    positions.some((index) => index < 0) ||
    positions.some((index, i) => i > 0 && index <= positions[i - 1])
  ) {
    failed.push(file + ": homepage sections missing or in the wrong order");
  }
  if ([...html.matchAll(/class="home-experience-card"/g)].length !== 4) {
    failed.push(file + ": expected four featured professional cards");
  }
  for (const id of ["memo-bank", "linkt", "amazon", "nyu"]) {
    if (!html.includes(experienceUrl + "#" + id + "-title")) {
      failed.push(file + ": missing professional milestone link for " + id);
    }
  }
  for (const project of ["xila", "infrastructure", "mini-train-store"]) {
    const prefix = file.startsWith("fr/") ? "/fr/projects/" : "/projects/";
    if (!html.includes(prefix + project)) {
      failed.push(file + ": missing selected project " + project);
    }
  }
  if (!/Xila[^<]{0,140}/i.test(html) || !html.includes("xila-topology-link")) {
    failed.push(
      file + ": Xila graph must be presented as a named project deep dive",
    );
  }
  if ([...html.matchAll(/<h1(?:\s|>)/g)].length !== 1) {
    failed.push(file + ": homepage should have exactly one H1");
  }
}

// The immersive introduction must be purely typographic, full-height styled
// and provide an accessible path to the real career content in BOTH locales.
for (const [file, language, careerLink] of [
  ["index.html", "en", "/experiences"],
  ["fr/index.html", "fr", "/fr/experiences"],
]) {
  const html = readFileSync(resolve(dist, file), "utf8");
  const heroStart = html.indexOf('<section class="home-hero"');
  const careerStart = html.indexOf('<section class="home-experience"');
  const hero =
    heroStart >= 0 && careerStart > heroStart
      ? html.slice(heroStart, careerStart)
      : "";
  if (
    !hero.includes("home-hero-title-mask") ||
    !hero.includes("home-hero-title-line--accent")
  ) {
    failed.push(file + ": animated editorial title is missing");
  }
  if (
    !hero.includes('href="#career-highlights"') ||
    !hero.includes("home-hero-scroll")
  ) {
    failed.push(file + ": accessible scroll cue to career section is missing");
  }
  if (
    !hero.includes('href="' + careerLink + '"') ||
    !hero.includes(language === "fr" ? "/fr/projects" : "/projects") ||
    !hero.includes("mailto:alix@anneraud.fr")
  ) {
    failed.push(file + ": professional, projects or contact CTAs missing");
  }
  if (/<img(?:\s|>)/.test(hero) || hero.includes("home-hero-portrait")) {
    failed.push(file + ": homepage hero must not embed the old pixel portrait");
  }
  if (heroStart < 0 || careerStart < 0 || careerStart <= heroStart) {
    failed.push(
      file + ": homepage introduction must come before professional work",
    );
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
    failed.push(
      file + ": new portfolio layout not SSR-rendered (" + marker + ")",
    );
  }
}

// Shared visual primitives must render as HTML in both locales.
for (const file of [
  "projects.html",
  "fr/projects.html",
  "experiences.html",
  "fr/experiences.html",
  "skills.html",
  "fr/skills.html",
]) {
  const html = readFileSync(resolve(dist, file), "utf8");
  if (!html.includes("editorial-hero")) {
    failed.push(file + ": shared editorial hero missing");
  }
  if (!html.includes("editorial-card") || !html.includes("editorial-tags")) {
    failed.push(file + ": shared editorial cards/tags missing");
  }
}
for (const file of [
  "experiences.html",
  "fr/experiences.html",
  "skills.html",
  "fr/skills.html",
]) {
  const html = readFileSync(resolve(dist, file), "utf8");
  if (
    !html.includes("editorial-section-heading") ||
    !html.includes("editorial-next")
  ) {
    failed.push(file + ": shared section/CTA missing");
  }
}

// Skills must be real SSR content rather than hidden client-only cards.
for (const [file, projectPrefix] of [
  ["skills.html", "/projects/"],
  ["fr/skills.html", "/fr/projects/"],
]) {
  const html = readFileSync(resolve(dist, file), "utf8");
  const cards = [
    ...html.matchAll(/<article[^>]+class="[^"]*skills-domain-card[^"]*"/g),
  ].length;
  if (cards !== 6) {
    failed.push(file + ": expected six skill domain cards, found " + cards);
  }
  if (!html.includes("skills-language-grid") || !html.includes("TOEIC 975")) {
    failed.push(file + ": language proficiency section missing");
  }
  for (const id of [
    "xila",
    "nanoexpr",
    "deez-nalyzer",
    "infrastructure",
    "mini-train-store",
  ]) {
    if (!html.includes(projectPrefix + id)) {
      failed.push(file + ": missing evidence link to " + id);
    }
  }
  if (html.includes('class="skill-domain"')) {
    failed.push(file + ": legacy SkillDomain layout still rendered");
  }
}

// Older experiences are complete cards, initially hidden by one toggle per section.
// All content remains SSR-rendered; Vue handles accessible group visibility.
for (const [file, professionalLabel, educationLabel] of [
  ["experiences.html", "Show earlier experience", "Show earlier education"],
  [
    "fr/experiences.html",
    "Voir les expériences précédentes",
    "Voir les formations précédentes",
  ],
]) {
  const html = readFileSync(resolve(dist, file), "utf8");
  for (const group of ["professional", "education"]) {
    if (
      !html.includes('id="earlier-' + group + '"') ||
      !html.includes('aria-controls="earlier-' + group + '"')
    ) {
      failed.push(
        file + ": missing earlier " + group + " list or accessible toggle",
      );
    }
  }
  for (const id of [
    "insa-relations",
    "renault-cleon",
    "guenola-sahut",
    "baccalaureat",
    "cambridge-b1",
  ]) {
    if (!html.includes(id + "-title")) {
      failed.push(file + ": older card not present in SSR: " + id);
    }
  }
  if (!html.includes(professionalLabel) || !html.includes(educationLabel)) {
    failed.push(file + ": missing translated group toggle labels");
  }
  if (
    html.includes("career-expand-button") ||
    html.includes("career-card--compact") ||
    html.includes("experience-details-")
  ) {
    failed.push(file + ": old per-card expansion controls must be removed");
  }
}

// Experience logos must appear in both generated locales. This is a
// structural check; browser/network verification of remote assets is separate.
for (const file of ["experiences.html", "fr/experiences.html"]) {
  const html = readFileSync(resolve(dist, file), "utf8");
  if (
    !html.includes("career-company-logo") ||
    !html.includes("logo-becquerel-blanc_tournant.jpg")
  ) {
    failed.push(file + ": experience company logo markup missing from SSR");
  }
}

if (failed.length) {
  console.error("Static SEO checks failed:\n" + failed.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    "Verified canonical, hreflang, Open Graph and structured data on " +
      cases.length +
      " built pages.",
  );
}
