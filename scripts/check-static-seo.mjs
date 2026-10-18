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
if (failed.length) {
  console.error("Static SEO checks failed:\n" + failed.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Verified canonical, hreflang, Open Graph and structured data on " + cases.length + " built pages.");
}
