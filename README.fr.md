# Alix ANNERAUD - Portfolio

**Du noyau au navigateur.** Ingénierie logicielle · Systèmes Rust · Embarqué · Sécurité

[Portfolio](https://alix.anneraud.fr/fr/) · [Projets](https://alix.anneraud.fr/fr/projects) · [English](./README.md)

Ce site est un portfolio bilingue généré statiquement avec **Astro**, complété par des îlots **Vue 3** pour les fonctionnalités réellement interactives. Chaque projet possède sa fiche en Markdown ou MDX.

## Architecture

- **Astro 7** : génération HTML, routes, pages FR/EN, SEO et sitemap.
- **Vue 3 + TypeScript** : filtres des projets, fallback des logos d'expérience, démo Xila et animation WebGL facultative.
- **MDX** : diagrammes et composants intégrés aux études de cas Xila, Infrastructure et Mini Train Store.
- **Tailwind CSS 4** et CSS scoped : styles responsive de l'interface.
- **GitHub Pages** : hébergement de `dist/`, sans backend.

## Développement local

```sh
npm ci
npm run dev
npm run validate:portfolio
npm run build
npm run verify:static
npm run preview
```

Lancer `npm run check` (format, types, validation, build et vérification statique) avant de fusionner.

## Structure

```text
astro.config.mjs              Configuration d'Astro (sortie HTML, Vue, MDX, sitemap)
src/
  components/                 Composants Vue mutualisés et îlots interactifs
  content.config.ts           Collection de projets typée
  content/projects/en/        26 fiches en anglais
  content/projects/fr/        26 fiches en français
  content/legal/              Mentions légales et crédits des logos
  data/                       Projets, expériences et compétences bilingues
  layouts/BaseLayout.astro    Navigation, couleurs, langues, SEO
  pages/                      Routes anglaises / et françaises /fr/
  styles/                     Styles partagés et animations
public/                       Images, CNAME, robots.txt
scripts/                      Vérification des données et du HTML généré
```

**Page d’accueil :** le parcours professionnel (Memo Bank, Linkt, Amazon et NYU) précède les projets sélectionnés. Le schéma WebGL apparaît plus bas, clairement identifié comme une présentation de l’architecture de Xila, et non de l’ensemble du parcours. Les cartes d’expérience sont générées statiquement depuis les données partagées.

Pour ajouter un projet, modifier les données dans [`portfolioProjects.ts`](./src/data/portfolioProjects.ts), puis ajouter une fiche dans **les deux langues**. Réserver MDX aux composants nécessaires ; pour les cartes et en-têtes, réutiliser les composants partagés `EditorialHero`, `EditorialSectionHeading`, `EditorialCard`, `TechnologyTags` et `EditorialNext`.

Les URL existantes (dont `/fr/projects/xila` et les fichiers `.html`) restent conservées. Les anciennes archives de projets ne sont pas recréées.

La CI GitHub Actions vérifie les 52 fiches, les pages FR/EN, les composants SSR et les métadonnées SEO. Le déploiement sur GitHub Pages se fait depuis `dist/` après fusion sur `main`.
