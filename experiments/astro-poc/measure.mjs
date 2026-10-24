import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { resolve, join } from "node:path";
import { gzipSync } from "node:zlib";

function getFiles(path) {
  if (!existsSync(path)) throw new Error("Missing build output: " + path);
  const files = [];
  for (const item of readdirSync(path, { withFileTypes: true })) {
    const file = join(path, item.name);
    if (item.isDirectory()) files.push(...getFiles(file));
    else if (item.isFile()) files.push(file);
  }
  return files;
}

function summarize(label, dir) {
  const files = getFiles(dir);
  const result = { label, files: files.length, html: 0, css: 0, js: 0, other: 0, total: 0 };
  for (const file of files) {
    const size = statSync(file).size;
    result.total += size;
    if (file.endsWith(".html")) result.html += size;
    else if (file.endsWith(".css")) result.css += size;
    else if (file.endsWith(".js")) result.js += size;
    else result.other += size;
  }
  const home = readFileSync(join(dir, "index.html"));
  const french = readFileSync(join(dir, "fr/index.html"));
  result.homeHTML = home.length;
  result.homeGzip = gzipSync(home).length;
  result.frenchHomeHTML = french.length;
  result.frenchHomeGzip = gzipSync(french).length;
  return result;
}

const current = summarize("VitePress (full portfolio)", resolve(".vitepress/dist"));
const astro = summarize("Astro (2-page POC only)", resolve("experiments/astro-poc/dist"));

console.log(JSON.stringify({ current, astro }, null, 2));
console.log(
  "NOTE: Full-site totals are NOT comparable because the POC only builds two landing pages. " +
  "Homepage HTML/gzip numbers are an indicative build artifact comparison, NOT " +
  "a page load, JS hydration, CWV, accessibility or framework superiority benchmark.",
);
