# Alix ANNERAUD — Portfolio

<p align="center">
  <strong>Du noyau au navigateur.</strong><br />
  Génie logiciel · Systèmes Rust · Embarqué · Sécurité
</p>

<p align="center">
  <a href="https://alix.anneraud.fr/fr/">Visiter le portfolio</a>
  · <a href="https://alix.anneraud.fr/fr/projects">Découvrir les projets</a>
  · <a href="./README.md">Read in English 🇬🇧</a>
</p>

<p align="center">
  <a href="https://github.com/AlixANNERAUD/Web_site/actions/workflows/ci.yml">
    <img alt="Intégration continue" src="https://github.com/AlixANNERAUD/Web_site/actions/workflows/ci.yml/badge.svg" />
  </a>
  <a href="https://github.com/AlixANNERAUD/Web_site/actions/workflows/deploy.yml">
    <img alt="Déploiement GitHub Pages" src="https://github.com/AlixANNERAUD/Web_site/actions/workflows/deploy.yml/badge.svg" />
  </a>
</p>

---

Code source de **[alix.anneraud.fr](https://alix.anneraud.fr/fr/)**, mon portfolio personnel. Le site met en avant la démarche d'ingénierie derrière mes réalisations, de **[Xila](https://www.xila.dev/)**, un système d'exploitation en Rust, aux applications web, bibliothèques embarquées, travaux de recherche et projets d'auto-hébergement.

Il est construit en **VitePress + Vue 3**, avec un rendu HTML statique. Les éléments interactifs sont ajoutés progressivement pour conserver un site rapide, lisible et accessible.

## Contenu

| Section | Présentation |
| --- | --- |
| **[Accueil](https://alix.anneraud.fr/fr/)** | Introduction, visualisation de l'architecture Xila et projets mis en avant |
| **[Projets](https://alix.anneraud.fr/fr/projects)** | Catalogue avec recherche et filtres : projets personnels, bibliothèques, compétitions et travaux académiques |
| **[Études de cas](https://alix.anneraud.fr/fr/projects/xila)** | Décisions, contraintes et compromis techniques de Xila, [Mini Train Store](https://alix.anneraud.fr/fr/projects/mini-train-store) et de l'[Infrastructure](https://alix.anneraud.fr/fr/projects/infrastructure) |
| **[Expériences](https://alix.anneraud.fr/fr/experiences)** | Chronologie des expériences professionnelles, de la formation et des projets d'ingénierie |
| **[Compétences](https://alix.anneraud.fr/fr/skills)** | Compétences techniques illustrées par des réalisations concrètes |

Le site existe également [en anglais](https://alix.anneraud.fr/). La fiche Xila propose une [démonstration dans le navigateur](https://alix.anneraud.fr/fr/projects/xila), chargée uniquement à la demande et hébergée séparément.

## Technologies

- **VitePress 1.x** : Markdown, génération statique, navigation et GitHub Pages.
- **Vue 3 + TypeScript** : catalogue filtrable, chronologie des expériences et composants interactifs.
- **Tailwind CSS 4 + CSS scoped** : mise en page responsive et prise en charge des thèmes.
- **Lucide** et un rendu **WebGL2** léger, chargé seulement lorsque nécessaire.
- **GitHub Actions** : compilation, vérifications des contenus et publication.

Le portfolio lui-même ne nécessite ni backend ni base de données.

## Démarrage local

Avec une version LTS récente de Node.js et npm :

```sh
git clone https://github.com/AlixANNERAUD/Web_site.git
cd Web_site

npm ci
npm run docs:dev
```

Ouvre ensuite l'adresse locale affichée par VitePress.

| Commande | Utilité |
| --- | --- |
| `npm run docs:dev` | Serveur de développement |
| `npm run docs:build` | Génère le site dans `.vitepress/dist/` |
| `npm run docs:preview` | Prévisualise le site généré |
| `npm run validate:portfolio` | Vérifie projets, identifiants, traductions et fiches |
| `npm run verify:static` | Vérifie les métadonnées SEO du HTML généré (après build) |
| `npm run format:check` | Vérifie le formatage Prettier |

## Organisation du dépôt

```text
.vitepress/
  config.mts                 Configuration VitePress et langues
  seo.mts                    Canonical, Open Graph et hreflang
  theme/
    components/              Composants Vue, fiches, démos et visualisations
    data/
      portfolioProjects.ts   Métadonnées des projets FR/EN
      experiences.ts         Expériences et formation FR/EN
      skills.ts              Compétences FR/EN, réalisations liées et langues
    style.css                Styles globaux
src/
  en/                        Contenus anglais
  fr/                        Contenus français
  public/                    Assets statiques
scripts/
  validate-portfolio.mjs     Validation du catalogue
  check-static-seo.mjs       Contrôles SEO du site généré
.github/workflows/
  ci.yml                     Build et vérifications des PR
  deploy.yml                 Publication GitHub Pages
```

### Modifier le contenu

**Classement des projets :** le catalogue trie par importance éditoriale (profondeur technique, originalité, impact concret et preuves publiques), avec un tri alphabétique alternatif. Les poids sont définis dans [`portfolioProjects.ts`](./.vitepress/theme/data/portfolioProjects.ts) (technique 40 %, originalité 20 %, impact 25 %, preuves publiques 15 %).

**Projets :** les métadonnées sont centralisées dans [`portfolioProjects.ts`](./.vitepress/theme/data/portfolioProjects.ts). Chaque réalisation possède sa **propre fiche Markdown en FR et en EN**, dans `src/fr/projects/<project-id>.md` et `src/en/projects/<project-id>.md`. Les trois principaux projets bénéficient d'études de cas plus approfondies. Exécuter `npm run validate:portfolio` après modification.

**Expériences :** modifier [`experiences.ts`](./.vitepress/theme/data/experiences.ts). Dates, employeurs, descriptions et réalisations sont renseignés une seule fois, dans les deux langues.

**Interface :** les composants se trouvent dans [`.vitepress/theme/components/`](./.vitepress/theme/components). Privilégier les animations CSS légères, respecter `prefers-reduced-motion` et conserver un rendu statique de secours pour les visualisations informatives.

## CI et déploiement

Les PR vers `main` déclenchent la [CI du portfolio](./.github/workflows/ci.yml). Un merge dans `main` lance le [déploiement GitHub Pages](./.github/workflows/deploy.yml), qui publie `.vitepress/dist/`.

Domaine public : **[alix.anneraud.fr](https://alix.anneraud.fr/)**. Les outils de mesure d'audience et la démo Xila sont des services externes, indépendants du build du dépôt.

## Contact

- [Portfolio](https://alix.anneraud.fr/fr/)
- [GitHub](https://github.com/AlixANNERAUD)
- [LinkedIn](https://www.linkedin.com/in/alix-anneraud/)
- [Email](mailto:alix@anneraud.fr)

Ce dépôt contient des textes personnels, des descriptions de projets et des éléments d'identité visuelle. Me contacter avant de les réutiliser.
