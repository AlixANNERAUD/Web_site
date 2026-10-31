import assert from "node:assert/strict";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { chromium, firefox } from "playwright";

const base = process.env.TEST_BASE_URL || "http://127.0.0.1:4173";
const output = resolve("artifacts/browser");
mkdirSync(output, { recursive: true });

const targets = [
  "/",
  "/fr/",
  "/projects",
  "/fr/projects",
  "/projects/xila",
  "/fr/projects/xila",
  "/experiences",
  "/fr/experiences",
  "/skills",
  "/fr/skills",
  "/resume",
  "/fr/resume",
];
const widths = [320, 375, 768, 1440];
const failures = [];
let checked = 0;

for (const [engineName, engine] of [
  ["chromium", chromium],
  ["firefox", firefox],
]) {
  const browser = await engine.launch({ headless: true });
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();

    for (const path of targets) {
      const url = base + path;
      try {
        // Load each page only once; resizing is enough to test each breakpoint.
        await page.setViewportSize({ width: 1440, height: 900 });
        const response = await page.goto(url, {
          waitUntil: "domcontentloaded",
          timeout: 10000,
        });
        assert.equal(response?.status(), 200, url + " should resolve");
        await page.locator("main").first().waitFor({ timeout: 7000 });

        for (const width of widths) {
          await page.setViewportSize({ width, height: 900 });
          await page.waitForTimeout(60);
          const horizontalOverflow = await page.evaluate(
            () => document.documentElement.scrollWidth > window.innerWidth + 2,
          );
          if (
            horizontalOverflow &&
            width === 320 &&
            path.includes("/experiences")
          ) {
            const offenders = await page.evaluate(() =>
              [...document.body.querySelectorAll("*")]
                .filter((node) => {
                  const box = node.getBoundingClientRect();
                  return (
                    box.width > 0 &&
                    (box.right > window.innerWidth + 2 || box.left < -2)
                  );
                })
                .slice(0, 18)
                .map((node) => ({
                  tag: node.tagName.toLowerCase(),
                  id: node.id,
                  className:
                    typeof node.className === "string"
                      ? node.className.slice(0, 90)
                      : "",
                  rect: (() => {
                    const r = node.getBoundingClientRect();
                    return {
                      left: Math.round(r.left),
                      right: Math.round(r.right),
                      width: Math.round(r.width),
                    };
                  })(),
                })),
            );
            console.error(
              engineName +
                " " +
                url +
                " width=320 overflow diagnostics: " +
                JSON.stringify(offenders),
            );
          }
          assert.equal(
            horizontalOverflow,
            false,
            url + " horizontal overflow at " + width,
          );

          if (
            (path === "/" || path === "/fr/" || path.endsWith("/projects")) &&
            (width === 375 || width === 1440)
          ) {
            const name = path.replace(/\W+/g, "-") || "home";
            await page.screenshot({
              path: resolve(
                output,
                engineName + "-" + name + "-" + width + ".png",
              ),
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
        await page.goto(base + path, {
          waitUntil: "domcontentloaded",
          timeout: 10000,
        });
        const library = page.getByRole("button", { name, exact: true });
        await library.waitFor({ timeout: 10000 });
        await library.click();
        const cards = page.locator(".showcase-card");
        await page.waitForTimeout(100);
        assert.equal(
          await cards.count(),
          6,
          "Expected six open-source libraries",
        );
        const search = page.locator('input[type="search"]');
        await search.fill("nanoexpr");
        assert.equal(
          await cards.count(),
          1,
          "Expected a single matching library",
        );
        assert.match(await cards.first().innerText(), /nanoexpr/i);
        checked++;
      } catch (error) {
        failures.push(engineName + " " + path + " filters: " + error);
      }
    }

    // Immersive typographic homepage, keyboard-friendly scroll navigation and
    // reduced-motion fallback. The intro is static Astro HTML, not a Vue island.
    for (const path of ["/", "/fr/"]) {
      try {
        for (const [width, height] of [
          [1440, 900],
          [768, 900],
          [375, 812],
          [320, 640],
        ]) {
          await page.setViewportSize({ width, height });
          await page.goto(base + path, {
            waitUntil: "domcontentloaded",
            timeout: 10000,
          });
          const intro = page.locator(".home-hero");
          const title = intro.locator("#home-hero-title");
          assert.equal(
            await intro.count(),
            1,
            path + " hero should render once",
          );
          assert.equal(
            await title.count(),
            1,
            path + " must have one typographic title",
          );
          assert.equal(
            await intro.locator("img").count(),
            0,
            path + " should not load the removed pixel portrait",
          );
          assert.equal(await intro.locator(".home-hero-title-mask").count(), 2);
          assert.equal(
            await intro.locator(".home-hero-scroll").getAttribute("href"),
            "#career-highlights",
            path + " scroll cue should target career",
          );
          assert.equal(
            await intro.locator(".home-action").count(),
            3,
            path + " should preserve professional, project and contact CTAs",
          );

          const rect = await intro.boundingBox();
          assert.ok(
            rect && rect.height >= height - 119,
            path +
              " hero should nearly fill the viewport at " +
              width +
              "×" +
              height +
              " (height=" +
              rect?.height +
              ")",
          );
          assert.ok(
            rect.width <= width + 2,
            path + " hero must not overflow at " + width,
          );
          const overflow = await page.evaluate(
            () => document.documentElement.scrollWidth > window.innerWidth + 2,
          );
          assert.equal(
            overflow,
            false,
            path + " horizontal overflow at " + width,
          );
          checked++;

          if (width === 1440 || width === 375) {
            // Capture the final visual state, not a mid-animation text reveal.
            await page.waitForTimeout(1250);
            await page.screenshot({
              path: resolve(
                output,
                engineName +
                  "-" +
                  (path === "/" ? "en" : "fr") +
                  "-hero-animated-" +
                  width +
                  ".png",
              ),
              fullPage: false,
              timeout: 15000,
            });
          }
        }

        await page.setViewportSize({ width: 1440, height: 900 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(base + path, {
          waitUntil: "domcontentloaded",
          timeout: 10000,
        });
        const reduced = await page
          .locator(".home-hero-title-line")
          .first()
          .evaluate((node) => ({
            animation: getComputedStyle(node).animationName,
            opacity: getComputedStyle(node).opacity,
          }));
        assert.equal(
          reduced.animation,
          "none",
          path + " must disable title animation for reduced motion",
        );
        assert.equal(
          reduced.opacity,
          "1",
          path + " title remains readable without animation",
        );
        checked++;

        // Same-page anchor works with either motion preference.
        await page.locator(".home-hero-scroll").click();
        await page.waitForFunction(
          () =>
            location.hash === "#career-highlights" &&
            document
              .querySelector("#career-highlights")
              ?.getBoundingClientRect().top <
              window.innerHeight * 0.65,
          null,
          { timeout: 6000 },
        );
        checked++;
        await page.emulateMedia({ reducedMotion: "no-preference" });
      } catch (error) {
        failures.push(engineName + " " + path + " immersive hero: " + error);
        await page.emulateMedia({ reducedMotion: "no-preference" });
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
        await page.goto(base + path, {
          waitUntil: "domcontentloaded",
          timeout: 10000,
        });
        const experience = page.locator(".home-experience");
        const featuredCards = experience.locator(".home-experience-card");
        assert.equal(
          await featuredCards.count(),
          4,
          path + " must surface four professional roles",
        );
        const employers = await featuredCards
          .locator(".home-experience-organization")
          .allTextContents();
        for (const company of [
          "Memo Bank",
          "Linkt",
          "Amazon",
          "New York University",
        ]) {
          assert.ok(
            employers.includes(company),
            path + " missing employer: " + company,
          );
        }
        for (const id of ["memo-bank", "linkt", "amazon", "nyu"]) {
          const link = experience.locator(
            'a[href="' + careerUrl + "#" + id + '-title"]',
          );
          assert.equal(
            await link.count(),
            1,
            path + " role needs a link to its timeline entry",
          );
        }
        const sections = await page.evaluate(() => ({
          hero: document.querySelector(".home-hero")?.getBoundingClientRect()
            .top,
          career: document
            .querySelector(".home-experience")
            ?.getBoundingClientRect().top,
          projects: document
            .querySelector(".portfolio-showcase")
            ?.getBoundingClientRect().top,
          xila: document
            .querySelector(".xila-topology")
            ?.getBoundingClientRect().top,
        }));
        assert.ok(
          Object.values(sections).every((value) => typeof value === "number") &&
            sections.hero < sections.career &&
            sections.career < sections.projects &&
            sections.projects < sections.xila,
          path +
            " homepage sections are out of order: " +
            JSON.stringify(sections),
        );
        assert.match(
          await page.locator(".xila-topology-heading").innerText(),
          /Xila/i,
        );

        for (const [width, columns] of [
          [1440, 2],
          [375, 1],
        ]) {
          await page.setViewportSize({ width, height: 900 });
          const grid = await experience
            .locator(".home-experience-grid")
            .evaluate(
              (el) =>
                getComputedStyle(el)
                  .gridTemplateColumns.split(" ")
                  .filter(Boolean).length,
            );
          assert.equal(
            grid,
            columns,
            path + " experience grid columns at " + width,
          );
          checked++;
        }
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.screenshot({
          path: resolve(
            output,
            engineName +
              "-" +
              (path === "/" ? "home" : "fr-home") +
              "-career-1440.png",
          ),
          fullPage: true,
          timeout: 15000,
        });
      } catch (error) {
        failures.push(engineName + " " + path + " homepage balance: " + error);
      }
    }

    // Astro migration must preserve the centered editorial layout on wide screens.
    for (const path of [
      "/experiences",
      "/fr/experiences",
      "/skills",
      "/fr/skills",
    ]) {
      try {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto(base + path, {
          waitUntil: "domcontentloaded",
          timeout: 10000,
        });
        const container = page.locator(".editorial-page").first();
        await container.waitFor();
        const bounds = await container.boundingBox();
        assert.ok(bounds, path + " editorial container missing");
        assert.ok(
          bounds.width <= 1181,
          path + " editorial content is too wide: " + bounds.width,
        );
        assert.ok(
          Math.abs(bounds.x - (1440 - bounds.width) / 2) <= 2,
          path + " editorial content is not centered",
        );
        checked++;
      } catch (error) {
        failures.push(engineName + " " + path + " editorial width: " + error);
      }
    }

    // Each section hides entire older cards by default and has ONE section
    // toggle. All five older cards must show their full descriptions and tags
    // after expansion, with independent state for professional vs education.
    for (const [path, labels] of [
      [
        "/experiences",
        [
          "Show earlier experience",
          "Hide earlier experience",
          "Show earlier education",
          "Hide earlier education",
        ],
      ],
      [
        "/fr/experiences",
        [
          "Voir les expériences précédentes",
          "Masquer les expériences précédentes",
          "Voir les formations précédentes",
          "Masquer les formations précédentes",
        ],
      ],
    ]) {
      try {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto(base + path, {
          waitUntil: "domcontentloaded",
          timeout: 10000,
        });
        await page.waitForFunction(
          () => document.querySelectorAll("astro-island[ssr]").length === 0,
        );

        const groups = [
          {
            id: "professional",
            entries: ["insa-relations", "renault-cleon", "guenola-sahut"],
            show: labels[0],
            hide: labels[1],
          },
          {
            id: "education",
            entries: ["baccalaureat", "cambridge-b1"],
            show: labels[2],
            hide: labels[3],
          },
        ];
        assert.equal(
          await page.locator(".career-earlier-toggle").count(),
          2,
          path + " should have exactly two section-level toggles",
        );
        assert.equal(
          await page.locator(".career-expand-button").count(),
          0,
          path + " should have no per-card toggle buttons",
        );

        for (const group of groups) {
          const list = page.locator("#earlier-" + group.id);
          const revealButton = page.getByRole("button", {
            name: group.show,
            exact: true,
          });
          assert.equal(
            await revealButton.getAttribute("aria-controls"),
            "earlier-" + group.id,
          );
          assert.equal(
            await revealButton.getAttribute("aria-expanded"),
            "false",
          );
          assert.equal(
            await list.isVisible(),
            false,
            path + " " + group.id + " initially visible",
          );
          assert.equal(
            await list.locator(".career-card").count(),
            group.entries.length,
          );

          for (const id of group.entries) {
            const card = list.locator('[aria-labelledby="' + id + '-title"]');
            assert.equal(
              await card.count(),
              1,
              path + " must contain " + id + " in SSR",
            );
            assert.equal(
              await card.isVisible(),
              false,
              id + " initially visible",
            );
          }

          await revealButton.click();
          assert.equal(
            await list.isVisible(),
            true,
            group.id + " must be shown",
          );
          const hideButton = page.getByRole("button", {
            name: group.hide,
            exact: true,
          });
          assert.equal(await hideButton.getAttribute("aria-expanded"), "true");

          for (const id of group.entries) {
            const card = list.locator('[aria-labelledby="' + id + '-title"]');
            assert.equal(
              await card.isVisible(),
              true,
              id + " must be visible after expansion",
            );
            assert.equal(
              await card.locator(".career-summary").isVisible(),
              true,
              id + " must show the complete description",
            );
            assert.ok(
              (await card.locator(".career-highlights li").count()) >= 1,
              id + " should retain full detail bullets",
            );
          }

          // Expanding professional entries must not reveal older education cards.
          const otherId =
            group.id === "professional" ? "education" : "professional";
          assert.equal(
            await page.locator("#earlier-" + otherId).isVisible(),
            false,
            "Expanding " + group.id + " should not reveal " + otherId,
          );

          await hideButton.click();
          assert.equal(
            await hideButton.count(),
            0,
            group.id + " must return to 'show' state",
          );
          assert.equal(
            await list.isVisible(),
            false,
            group.id + " must collapse again",
          );
          checked++;
        }
        await page.screenshot({
          path: resolve(
            output,
            engineName +
              "-" +
              (path.startsWith("/fr/") ? "fr-" : "") +
              "experiences-1440.png",
          ),
          fullPage: true,
          timeout: 15000,
        });
      } catch (error) {
        failures.push(
          engineName + " " + path + " earlier experience groups: " + error,
        );
      }
    }

    await context.close();
  } finally {
    await browser.close();
  }
}

console.log(
  "Validated " + checked + " browser scenarios in Chromium and Firefox.",
);
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
}
