import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  portfolioProjects,
  projectScore,
  PROJECT_RANK_WEIGHTS,
} from "../src/data/portfolioProjects.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const projects = portfolioProjects;
if (!Array.isArray(projects) || projects.length === 0) {
  throw new Error("Project catalogue is empty.");
}

const ids = new Set();
let featured = 0;

// Editorial ranking weights are defined only in portfolioProjects.ts.
const weightFactors = [
  "technicalDepth",
  "originality",
  "practicalImpact",
  "evidence",
];
const weights = PROJECT_RANK_WEIGHTS;
if (
  Object.keys(weights).length !== weightFactors.length ||
  weightFactors.some((factor) => !Number.isFinite(weights[factor])) ||
  weightFactors.reduce((sum, factor) => sum + weights[factor], 0) !== 100
) {
  throw new Error("Ranking weights must contain four factors totaling 100%.");
}
for (const project of projects) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.id) || ids.has(project.id)) {
    throw new Error("Missing, invalid or duplicate project ID: " + project.id);
  }
  ids.add(project.id);
  if (project.featured) featured++;
  if (
    !["personal", "library", "competition", "academic"].includes(project.group)
  ) {
    throw new Error("Unknown project group: " + project.id);
  }
  if (
    ![
      "systems",
      "web",
      "infrastructure",
      "embedded",
      "security",
      "data",
    ].includes(project.category)
  ) {
    throw new Error("Unknown category: " + project.id);
  }
  if (project.externalUrl) {
    const url = new URL(project.externalUrl);
    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error("Invalid external project URL: " + project.id);
    }
  }
  if (
    !project.ranking ||
    weightFactors.some(
      (factor) =>
        typeof project.ranking[factor] !== "number" ||
        !Number.isFinite(project.ranking[factor]) ||
        project.ranking[factor] < 0 ||
        project.ranking[factor] > 5,
    ) ||
    Object.keys(project.ranking).length !== weightFactors.length
  ) {
    throw new Error("Missing/invalid editorial ranking factors: " + project.id);
  }
  if (!Array.isArray(project.tags) || project.tags.length === 0) {
    throw new Error("Missing tags: " + project.id);
  }
  for (const tag of project.tags) {
    if (
      typeof tag !== "string" ||
      tag.trim() !== tag ||
      tag.length > 32 ||
      /[<>\[\]"=]/.test(tag) ||
      /https?:/i.test(tag)
    ) {
      throw new Error(
        "Malformed project technology tag for " + project.id + ": " + tag,
      );
    }
  }
  for (const lang of ["fr", "en"]) {
    for (const field of ["title", "period", "description"]) {
      if (!project[field]?.[lang]?.trim()) {
        throw new Error("Missing " + field + "." + lang + " for " + project.id);
      }
    }
  }
}

if (featured !== 3)
  throw new Error("Expected exactly three featured projects.");
const topFeatured = [...projects]
  .sort((a, b) => projectScore(b) - projectScore(a) || a.id.localeCompare(b.id))
  .slice(0, featured);
if (topFeatured.some((project) => !project.featured)) {
  throw new Error(
    "Featured projects must be the highest-ranked editorial picks.",
  );
}

// Every catalogue item must have its own public page in BOTH languages.
for (const lang of ["fr", "en"]) {
  const archivePath = join(
    root,
    "src",
    "content",
    "projects",
    lang,
    "archive.md",
  );
  if (existsSync(archivePath)) {
    throw new Error(
      "Obsolete project archive must not be restored: " + archivePath,
    );
  }

  for (const project of projects) {
    const basePath = join(root, "src", "content", "projects", lang, project.id);
    const markdownPath = basePath + ".md";
    const mdxPath = basePath + ".mdx";
    if (existsSync(markdownPath) === existsSync(mdxPath)) {
      throw new Error(
        "Expected exactly one .md/.mdx project page: " +
          lang +
          "/" +
          project.id,
      );
    }
    const markdown = readFileSync(
      existsSync(mdxPath) ? mdxPath : markdownPath,
      "utf8",
    );
    if (!markdown.startsWith("---\n")) {
      throw new Error("Missing page frontmatter: " + lang + "/" + project.id);
    }
    if (!/^title: /m.test(markdown) || !/^description: /m.test(markdown)) {
      throw new Error(
        "Missing project page SEO metadata: " + lang + "/" + project.id,
      );
    }
    if ([...markdown.matchAll(/^# (.+)$/gm)].length !== 1) {
      throw new Error(
        "Expected exactly one page H1: " + lang + "/" + project.id,
      );
    }
    if (markdown.includes("/projects/archive")) {
      throw new Error(
        "Old archive URL in project page: " + lang + "/" + project.id,
      );
    }
  }
}
if (existsSync(join(root, "docs")) || existsSync(join(root, ".vitepress"))) {
  throw new Error("The obsolete docs/ directory must not be restored.");
}

const caseStudies = ["xila", "mini-train-store", "infrastructure"];
for (const lang of ["fr", "en"]) {
  for (const id of caseStudies) {
    const markdown = readFileSync(
      join(root, "src", "content", "projects", lang, id + ".mdx"),
      "utf8",
    );
    if (
      !markdown.includes("<ArchitectureFlow") ||
      !markdown.includes("description:")
    ) {
      throw new Error(
        "Missing case study diagram or SEO description: " + lang + "/" + id,
      );
    }
  }
}

console.log(
  "Validated " +
    projects.length +
    " dedicated FR/EN pages and six case studies.",
);

// Markdown pages and Vue islands are referenced from typed content, not VitePress config.
const config = readFileSync(join(root, "astro.config.mjs"), "utf8");
if (
  !config.includes("vue()") ||
  !config.includes("mdx()") ||
  !config.includes('format: "preserve"')
) {
  throw new Error(
    "Astro integrations and preserved .html route format are required.",
  );
}
