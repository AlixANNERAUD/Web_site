import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(root, ".vitepress/theme/data/portfolioProjects.ts"), "utf8");
const opening = "export const portfolioProjects: PortfolioProject[] = ";
const start = source.indexOf(opening);
const end = source.indexOf(";\n\nexport function projectDetailUrl", start);
if (start < 0 || end < 0) {
  throw new Error("Project data declaration not found; update this check if the schema changes.");
}

const projects = JSON.parse(source.slice(start + opening.length, end));
if (!Array.isArray(projects) || projects.length === 0) {
  throw new Error("Project catalogue is empty.");
}

const ids = new Set();
let featured = 0;
for (const project of projects) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.id) || ids.has(project.id)) {
    throw new Error("Missing, invalid or duplicate project ID: " + project.id);
  }
  ids.add(project.id);
  if (project.featured) featured++;
  if (!["personal", "library", "competition", "academic"].includes(project.group)) {
    throw new Error("Unknown project group: " + project.id);
  }
  if (!["systems", "web", "infrastructure", "embedded", "security", "data"].includes(project.category)) {
    throw new Error("Unknown category: " + project.id);
  }
  if (project.externalUrl) {
    const url = new URL(project.externalUrl);
    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error("Invalid external project URL: " + project.id);
    }
  }
  if (!Array.isArray(project.tags) || project.tags.length === 0) {
    throw new Error("Missing tags: " + project.id);
  }
  for (const tag of project.tags) {
    if (
      typeof tag !== "string" ||
      tag.trim() !== tag ||
      tag.length > 32 ||
      /[<>\[\]"=]/.test(tag) || /https?:/i.test(tag)
    ) {
      throw new Error("Malformed project technology tag for " + project.id + ": " + tag);
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

if (featured !== 3) throw new Error("Expected exactly three featured projects.");

for (const lang of ["fr", "en"]) {
  const markdown = readFileSync(join(root, "src", lang, "projects", "archive.md"), "utf8");
  const found = [...markdown.matchAll(/<PortfolioProjectDetail project-id="([a-z0-9-]+)"/g)]
    .map((match) => match[1]);
  if (found.length !== ids.size || new Set(found).size !== found.length) {
    throw new Error("Archive count or uniqueness mismatch (" + lang + ").");
  }
  for (const id of ids) {
    if (!found.includes(id)) throw new Error("Project " + id + " missing in " + lang + " archive.");
  }
}

const caseStudies = ["xila", "mini-train-store", "infrastructure"];
for (const lang of ["fr", "en"]) {
  for (const id of caseStudies) {
    const markdown = readFileSync(join(root, "src", lang, "projects", id + ".md"), "utf8");
    if (!markdown.includes("<ArchitectureFlow") || !markdown.includes("description:")) {
      throw new Error("Missing case study diagram or SEO description: " + lang + "/" + id);
    }
  }
}

console.log("Validated " + projects.length + " projects, both archives and six case studies.");
