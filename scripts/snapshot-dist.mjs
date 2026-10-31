import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";

/**
 * Reference snapshot of the SEO-relevant shape of the built site.
 *
 *   node scripts/snapshot-dist.mjs --write
 *   node scripts/snapshot-dist.mjs --compare [--allow-added=a.html,b.html] [--fields=file,canonical,hreflang]
 *
 * One record per HTML file in dist/, plus every <loc> from dist/sitemap-*.xml.
 * --compare exits 1 when files were added (unless allowed) or removed, when a
 * compared field differs, or when the sitemap locations differ.
 */

const DIST = resolve("dist");
const REFERENCE = resolve("scripts/reference/dist-snapshot.json");
const FIELDS = [
  "file",
  "lang",
  "title",
  "canonical",
  "hreflang",
  "robots",
  "h1Count",
  "ogType",
];

function parseArgs(argv) {
  const options = { mode: null, allowAdded: [], fields: FIELDS };
  for (const arg of argv) {
    const [name, value = ""] = arg.split("=", 2);
    const list = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    if (name === "--write" || name === "--compare")
      options.mode = name.slice(2);
    else if (name === "--allow-added") options.allowAdded = list;
    else if (name === "--fields") options.fields = list;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!options.mode) throw new Error("Pass --write or --compare");
  const unknown = options.fields.filter((field) => !FIELDS.includes(field));
  if (unknown.length)
    throw new Error(`Unknown field(s): ${unknown.join(", ")}`);
  return options;
}

function listFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? listFiles(path) : [path];
  });
}

function decodeEntities(text) {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(parseInt(code, 16)),
    )
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

/** Attributes of one start tag, e.g. `<link rel="canonical" href="...">`. */
function attributes(tag) {
  const result = {};
  for (const [, name, , quoted, , singleQuoted, bare] of tag.matchAll(
    /([\w:-]+)(?:\s*=\s*(?:("([^"]*)")|('([^']*)')|([^\s>]+)))?/g,
  )) {
    result[name.toLowerCase()] = decodeEntities(
      quoted ?? singleQuoted ?? bare ?? "",
    );
  }
  return result;
}

function tagsNamed(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((m) =>
    attributes(m[0].slice(name.length + 1)),
  );
}

function snapshotPage(file, html) {
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
  const links = tagsNamed(head, "link");
  const metas = tagsNamed(head, "meta");
  const alternate = (lang) =>
    links.find((link) => link.rel === "alternate" && link.hreflang === lang)
      ?.href ?? null;
  const title = head.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1];

  return {
    file,
    lang: tagsNamed(html, "html")[0]?.lang ?? null,
    title: title === undefined ? null : decodeEntities(title.trim()),
    canonical: links.find((link) => link.rel === "canonical")?.href ?? null,
    hreflang: {
      en: alternate("en"),
      fr: alternate("fr"),
      "x-default": alternate("x-default"),
    },
    robots: metas.find((meta) => meta.name === "robots")?.content ?? null,
    h1Count: (html.match(/<h1\b/gi) ?? []).length,
    ogType: metas.find((meta) => meta.property === "og:type")?.content ?? null,
  };
}

function buildSnapshot() {
  if (!existsSync(DIST))
    throw new Error("dist/ not found: run `npm run build` first");
  const files = listFiles(DIST)
    .map((path) => relative(DIST, path).split(sep).join("/"))
    .sort();

  const pages = files
    .filter((file) => file.endsWith(".html"))
    .map((file) => snapshotPage(file, readFileSync(join(DIST, file), "utf8")));

  const sitemapLocs = files
    .filter((file) => /^sitemap-.*\.xml$/.test(file))
    .flatMap((file) => [
      ...readFileSync(join(DIST, file), "utf8").matchAll(
        /<loc>([^<]*)<\/loc>/g,
      ),
    ])
    .map((m) => decodeEntities(m[1].trim()))
    .sort();

  return { pages, sitemapLocs };
}

function compare(reference, current, { allowAdded, fields }) {
  const problems = [];
  const before = new Map(reference.pages.map((page) => [page.file, page]));
  const after = new Map(current.pages.map((page) => [page.file, page]));

  for (const file of before.keys()) {
    if (!after.has(file)) problems.push(`removed: ${file}`);
  }
  for (const file of after.keys()) {
    if (!before.has(file) && !allowAdded.includes(file))
      problems.push(`added: ${file}`);
  }

  for (const [file, old] of before) {
    const now = after.get(file);
    if (!now) continue;
    for (const field of fields) {
      const was = JSON.stringify(old[field]);
      const is = JSON.stringify(now[field]);
      if (was !== is)
        problems.push(
          `${file}: ${field} changed\n    was: ${was}\n    now: ${is}`,
        );
    }
  }

  const oldLocs = new Set(reference.sitemapLocs);
  const newLocs = new Set(current.sitemapLocs);
  const allowedLocs = new Set(
    allowAdded.map(
      (file) =>
        "https://alix.anneraud.fr/" + file.replace(/(index)?\.html$/, ""),
    ),
  );
  for (const loc of oldLocs)
    if (!newLocs.has(loc)) problems.push(`sitemap: removed ${loc}`);
  for (const loc of newLocs) {
    if (!oldLocs.has(loc) && !allowedLocs.has(loc))
      problems.push(`sitemap: added ${loc}`);
  }

  return problems;
}

const options = parseArgs(process.argv.slice(2));
const current = buildSnapshot();

if (options.mode === "write") {
  mkdirSync(dirname(REFERENCE), { recursive: true });
  writeFileSync(REFERENCE, JSON.stringify(current, null, 2) + "\n");
  console.log(
    `Wrote ${relative(process.cwd(), REFERENCE)}: ${current.pages.length} pages, ${current.sitemapLocs.length} sitemap URLs.`,
  );
} else {
  const reference = JSON.parse(readFileSync(REFERENCE, "utf8"));
  const problems = compare(reference, current, options);
  if (problems.length) {
    console.error(`Snapshot differs from reference (${problems.length}):`);
    for (const problem of problems) console.error("  " + problem);
    process.exit(1);
  }
  console.log(
    `Snapshot matches reference: ${current.pages.length} pages, ${current.sitemapLocs.length} sitemap URLs (fields: ${options.fields.join(", ")}).`,
  );
}
