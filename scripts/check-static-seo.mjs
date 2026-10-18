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

if (failed.length) {
  console.error("Static SEO checks failed:\n" + failed.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Verified canonical, hreflang, Open Graph and structured data on " + cases.length + " built pages.");
}
