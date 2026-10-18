import assert from "node:assert/strict";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { chromium, firefox } from "playwright";

const base = process.env.TEST_BASE_URL || "http://127.0.0.1:4173";
const output = resolve("artifacts/browser");
mkdirSync(output, { recursive: true });

const targets = [
  "/", "/fr/",
  "/projects", "/fr/projects",
  "/projects/xila", "/fr/projects/xila",
  "/experiences", "/fr/experiences",
  "/skills", "/fr/skills",
  "/resume", "/fr/resume",
];
const widths = [320, 375, 768, 1440];
const failures = [];
let checked = 0;

for (const [engineName, engine] of [["chromium", chromium], ["firefox", firefox]]) {
  const browser = await engine.launch({ headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();

    for (const path of targets) {
      const url = base + path;
      try {
        // Load each page only once; resizing is enough to test each breakpoint.
        await page.setViewportSize({ width: 1440, height: 900 });
        const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 10000 });
        assert.equal(response?.status(), 200, url + " should resolve");
        await page.locator("main").first().waitFor({ timeout: 7000 });

        for (const width of widths) {
          await page.setViewportSize({ width, height: 900 });
          await page.waitForTimeout(60);
          const horizontalOverflow = await page.evaluate(
            () => document.documentElement.scrollWidth > window.innerWidth + 2,
          );
          assert.equal(horizontalOverflow, false, url + " horizontal overflow at " + width);

          if ((path === "/" || path === "/fr/" || path.endsWith("/projects")) && (width === 375 || width === 1440)) {
            const name = path.replace(/\W+/g, "-") || "home";
            await page.screenshot({
              path: resolve(output, engineName + "-" + name + "-" + width + ".png"),
              fullPage: false,
              timeout: 10000,
            });
          }
          checked++;
        }
      } catch (error) {
        failures.push(engineName + " " + path + ": " + error);
      }
    }

    for (const [path, name] of [
      ["/projects", "Libraries"],
      ["/fr/projects", "Bibliothèques"],
    ]) {
      try {
        await page.goto(base + path, { waitUntil: "domcontentloaded", timeout: 10000 });
        const library = page.getByRole("button", { name, exact: true });
        await library.waitFor({ timeout: 10000 });
        await library.click();
        const cards = page.locator(".showcase-card");
        await page.waitForTimeout(100);
        assert.equal(await cards.count(), 6, "Expected six open-source libraries");
        const search = page.locator('input[type="search"]');
        await search.fill("nanoexpr");
        assert.equal(await cards.count(), 1, "Expected a single matching library");
        assert.match(await cards.first().innerText(), /nanoexpr/i);
        checked++;
      } catch (error) {
        failures.push(engineName + " " + path + " filters: " + error);
      }
    }

    // A balanced homepage must show professional experience first, then
    // multiple projects, with Xila's topology as a clearly labelled deep dive.
    for (const [path, careerUrl] of [
      ["/", "/experiences"],
      ["/fr/", "/fr/experiences"],
    ]) {
      try {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto(base + path, { waitUntil: "domcontentloaded", timeout: 10000 });
        const experience = page.locator(".home-experience");
        const featuredCards = experience.locator(".home-experience-card");
        assert.equal(await featuredCards.count(), 4, path + " must surface four professional roles");
        const employers = await featuredCards.locator(".home-experience-organization").allTextContents();
        for (const company of ["Memo Bank", "Linkt", "Amazon", "New York University"]) {
          assert.ok(employers.includes(company), path + " missing employer: " + company);
        }
        for (const id of ["memo-bank", "linkt", "amazon", "nyu"]) {
          const link = experience.locator('a[href="' + careerUrl + "#" + id + '-title"]');
          assert.equal(await link.count(), 1, path + " role needs a link to its timeline entry");
        }
        const sections = await page.evaluate(() => ({
          hero: document.querySelector(".home-hero")?.getBoundingClientRect().top,
          career: document.querySelector(".home-experience")?.getBoundingClientRect().top,
          projects: document.querySelector(".portfolio-showcase")?.getBoundingClientRect().top,
          xila: document.querySelector(".xila-topology")?.getBoundingClientRect().top,
        }));
        assert.ok(
          Object.values(sections).every((value) => typeof value === "number") &&
          sections.hero < sections.career &&
          sections.career < sections.projects &&
          sections.projects < sections.xila,
          path + " homepage sections are out of order: " + JSON.stringify(sections),
        );
        assert.match(await page.locator(".xila-topology-heading").innerText(), /Xila/i);

        for (const [width, columns] of [[1440, 2], [375, 1]]) {
          await page.setViewportSize({ width, height: 900 });
          const grid = await experience.locator(".home-experience-grid").evaluate((el) =>
            getComputedStyle(el).gridTemplateColumns.split(" ").filter(Boolean).length,
          );
          assert.equal(grid, columns, path + " experience grid columns at " + width);
          checked++;
        }
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.screenshot({
          path: resolve(output, engineName + "-" + (path === "/" ? "home" : "fr-home") + "-career-1440.png"),
          fullPage: true,
          timeout: 15000,
        });
      } catch (error) {
        failures.push(engineName + " " + path + " homepage balance: " + error);
      }
    }

    // Astro migration must preserve the centered editorial layout on wide screens.
    for (const path of ["/experiences", "/fr/experiences", "/skills", "/fr/skills"]) {
      try {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto(base + path, { waitUntil: "domcontentloaded", timeout: 10000 });
        const container = page.locator(".editorial-page").first();
        await container.waitFor();
        const bounds = await container.boundingBox();
        assert.ok(bounds, path + " editorial container missing");
        assert.ok(bounds.width <= 1181, path + " editorial content is too wide: " + bounds.width);
        assert.ok(Math.abs(bounds.x - (1440 - bounds.width) / 2) <= 2,
          path + " editorial content is not centered");
        checked++;
      } catch (error) {
        failures.push(engineName + " " + path + " editorial width: " + error);
      }
    }

    // Earlier milestones are real, independent timeline cards, collapsed by default
    // and individually expandable with keyboard-accessible native buttons.
    for (const [path, more, less] of [
      ["/experiences", "Show more", "Show less"],
      ["/fr/experiences", "Voir plus", "Voir moins"],
    ]) {
      try {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto(base + path, { waitUntil: "domcontentloaded", timeout: 10000 });
        await page.waitForFunction(() => document.querySelectorAll("astro-island[ssr]").length === 0);
        const cards = page.locator(".career-card--compact");
        assert.equal(await cards.count(), 4, path + " must contain four earlier milestone cards");

        const ids = ["renault-cleon", "guenola-sahut", "baccalaureat", "cambridge-b1"];
        for (const id of ids) {
          const card = page.locator('[aria-labelledby="' + id + '-title"]');
          const button = card.getByRole("button", { name: more, exact: true });
          const details = page.locator("#experience-details-" + id);
          assert.equal(await button.getAttribute("aria-expanded"), "false");
          assert.equal(await details.isVisible(), false, id + " must initially be collapsed");

          await button.click();
          assert.equal(await details.isVisible(), true, id + " must expand");
          const close = card.getByRole("button", { name: less, exact: true });
          assert.equal(await close.getAttribute("aria-expanded"), "true");
          await close.click();
          assert.equal(await details.isVisible(), false, id + " must collapse again");
          checked++;
        }
        // A snapshot captures the restored compact cards and page width.
        await page.screenshot({
          path: resolve(output, engineName + "-" + (path.startsWith("/fr/") ? "fr-" : "") + "experiences-1440.png"),
          fullPage: true,
          timeout: 15000,
        });
      } catch (error) {
        failures.push(engineName + " " + path + " earlier milestones: " + error);
      }
    }

    await context.close();
  } finally {
    await browser.close();
  }
}

console.log("Validated " + checked + " browser scenarios in Chromium and Firefox.");
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
}
