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
      for (const width of widths) {
        await page.setViewportSize({ width, height: 900 });
        const url = base + path;
        try {
          const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
          assert.equal(response?.status(), 200, url + " should resolve");
          await page.locator("main").first().waitFor({ timeout: 10000 });
          const horizontalOverflow = await page.evaluate(
            () => document.documentElement.scrollWidth > window.innerWidth + 2,
          );
          assert.equal(horizontalOverflow, false, url + " horizontal overflow at " + width);

          if ((path === "/" || path === "/fr/" || path.endsWith("/projects")) && (width === 375 || width === 1440)) {
            const name = path.replace(/\W+/g, "-") || "home";
            await page.screenshot({
              path: resolve(output, engineName + "-" + name + "-" + width + ".png"),
              fullPage: true,
            });
          }
          checked++;
        } catch (error) {
          failures.push(engineName + " " + path + " " + width + "px: " + error);
        }
      }
    }

    for (const [path, name] of [
      ["/projects", "Libraries"],
      ["/fr/projects", "Bibliothèques"],
    ]) {
      try {
        await page.goto(base + path, { waitUntil: "domcontentloaded" });
        const library = page.getByRole("button", { name, exact: true });
        await library.waitFor({ timeout: 10000 });
        await library.click();
        const cards = page.locator(".showcase-card");
        await page.waitForTimeout(250);
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
