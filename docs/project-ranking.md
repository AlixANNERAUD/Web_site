# Pondération éditoriale des projets — Project editorial ranking

*Révision : 18 octobre 2026 · 26 projets du catalogue.*

> **Ce classement mesure la pertinence d'une réalisation dans un portfolio technique**, pas la valeur intrinsèque de son auteur, sa qualité objective ni le résultat officiel d'une compétition. Les notes sont des évaluations éditoriales subjectives, à réviser lorsque les projets évoluent.

## Grille commune

Chaque dimension est notée de **0 à 5**, puis pondérée pour obtenir un score indicatif sur 100 :

| Dimension | Poids | Ce qui compte |
| --- | ---: | --- |
| **Profondeur technique** (`technicalDepth`) | **40 %** | Complexité d'architecture, contraintes système/embarquées, choix techniques, travail logiciel effectif |
| **Originalité / autonomie** (`originality`) | **20 %** | Initiative, conception personnelle, singularité, problèmes non triviaux résolus |
| **Impact pratique** (`practicalImpact`) | **25 %** | Usage réel, démonstration, utilité, résultat vérifiable ou reconnaissance extérieure — sans inventer de KPI |
| **Preuves et présentation** (`evidence`) | **15 %** | Documentation, code public, tests, exemples, démonstration, qualité explicative |

```text
score = (technicalDepth × 40
       + originality × 20
       + practicalImpact × 25
       + evidence × 15) / 5
```

Pour interpréter une note : **5** = élément remarquable et clairement démontré ; **4** = travail solide ; **3** = bon projet spécialisé ou pédagogique ; **2** = portée limitée ou preuves partielles ; **1** = embryonnaire. Une absence de preuve publique ne signifie pas une absence de travail.

Les projets d'équipes/compétitions sont évalués sur **ce qui est publiquement démontré**, sans supposer que l'intégralité de la réalisation est individuelle.

## Classement de référence

| Rang | Projet | Technique | Originalité | Impact | Preuves | Total / 100 | Motivation |
| ---: | --- | ---: | ---: | ---: | ---: | ---: | --- |
| 1 | [Xila](/fr/projects/xila) | 5 | 5 | 4.5 | 5 | **97.5** | OS Rust, pilotes/VFS, runtime Wasm, démonstrations |
| 2 | [Infrastructure](/fr/projects/infrastructure) | 4.5 | 4.2 | 5 | 4.5 | **91.3** | Services réellement exploités, déploiement reproductible |
| 3 | [Mini Train Store](/fr/projects/mini-train-store) | 4 | 4 | 5 | 4.6 | **86.8** | Produit utilisé, e-commerce et outillage métier |
| 4 | [nanoexpr](/fr/projects/archive#nanoexpr) | 4.7 | 4.4 | 3.4 | 4.8 | **86.6** | Parser no_std publié, sans allocations, tests et benchmarks |
| 5 | [nanoaudio](/fr/projects/archive#nanoaudio) | 4.6 | 4.3 | 3.3 | 4.5 | **84.0** | DSP/codecs embarqués no_std, API et tests |
| 6 | [Deez'Nalyzer](/fr/projects/archive#deez-nalyzer) | 4.4 | 3.9 | 3.7 | 4.8 | **83.7** | Chaîne full-stack et analyse audio/ML documentée |
| 7 | [dera.page](/fr/projects/archive#dera) | 4.2 | 4.1 | 4.3 | 3.8 | **82.9** | Plateforme de services étudiants auto-hébergée |
| 8 | [Réseau ferroviaire miniature](/fr/projects/archive#model-railway) | 4.2 | 4.3 | 3.7 | 3.5 | **79.8** | Électronique, protocole DCC/S88 et matériel réel |
| 9 | [embedded-i18n](/fr/projects/archive#embedded-i18n) | 4.3 | 4 | 3.2 | 4.2 | **79.0** | Macros et localisation firmware compile-time |
| 10 | [Cartographie d'occupation évidentielle (EOGM)](/fr/projects/archive#eogm) | 4.4 | 4.2 | 3.4 | 3 | **78.0** | Fusion cartographique ROS/C++, optimisation AVX2 |
| 11 | [lvgl_theme_shadcn](/fr/projects/archive#lvgl-theme-shadcn) | 3.9 | 4.1 | 3.5 | 4.1 | **77.4** | Composants graphiques LVGL réutilisables |
| 12 | [Jeanne d'Hack CTF (Université de Rouen)](/fr/projects/archive#jeanne-hack-2026) | 3 | 3.7 | 4.5 | 5 | **76.3** | 1re place ex æquo ; preuve de résolution sous contrainte |
| 13 | [getargs-derive](/fr/projects/archive#getargs-derive) | 4.1 | 3.8 | 3 | 4.3 | **75.9** | Macros procédurales CLI no_std |
| 14 | [Localisation de sources de gaz](/fr/projects/archive#odor-localization) | 4.1 | 4 | 3.4 | 3 | **74.8** | Prototype expérimental de recherche NYU |
| 15 | [Cod'INSA](/fr/projects/archive#codinsa-2025) | 3.2 | 3.4 | 4.2 | 4.5 | **73.7** | 1re place en programmation compétitive |
| 16 | [battery-percent](/fr/projects/archive#battery-percent) | 3.7 | 3.9 | 3 | 4.2 | **72.8** | C99/Rust embarqué, mesure et interpolation ADC |
| 17 | [Segmentation d'images médicales](/fr/projects/archive#medical-image-deep-learning) | 4 | 3 | 3.3 | 3.6 | **71.3** | Pipelines de segmentation sur modèles existants |
| 18 | [Enceinte connectée](/fr/projects/archive#connected-speaker) | 3.2 | 3.3 | 3.4 | 3.7 | **66.9** | ESP32 et interface de contrôle utile |
| 19 | [Jeanne d'Hack CTF (Université de Rouen)](/fr/projects/archive#jeanne-hack-2025) | 3 | 3.2 | 3.4 | 4 | **65.8** | 3e place au CTF ; réalisation compétitive |
| 20 | [TRACS (DGSE)](/fr/projects/archive#tracs-2024) | 2.8 | 3.2 | 3 | 3.8 | **61.6** | Challenge de cybersécurité, classement étudiant |
| 21 | [Compresseur/décompresseur Huffman](/fr/projects/archive#huffman) | 3.3 | 2.8 | 2.5 | 3.7 | **61.2** | Algorithme C et manipulation de flux binaires |
| 22 | [Robot mouche](/fr/projects/archive#robot-mouche) | 3.2 | 3 | 2.7 | 3.3 | **61.0** | Robot autonome et Wi-Fi en C++ |
| 23 | [INSAtram](/fr/projects/archive#insatram) | 3.2 | 3.4 | 2.5 | 2.7 | **59.8** | Simulation/jeu Free Pascal SDL |
| 24 | [Prédiction de la dansabilité musicale](/fr/projects/archive#music-danceability) | 2.9 | 2.7 | 2.4 | 3 | **55.0** | Prédiction ML sur données musicales |
| 25 | [ITI Aventure](/fr/projects/archive#iti-adventure) | 2.8 | 2.7 | 2.2 | 2.8 | **52.6** | Projet pédagogique Java orienté objet |
| 26 | [Solveur de systèmes d'équations linéaires](/fr/projects/archive#linear-equations) | 2 | 2.2 | 2.2 | 3.1 | **45.1** | Solveur algorithmique ciblé en C |

## Décisions de présentation

- **Accueil :** conserve les trois projets mis en avant, Xila, Infrastructure et Mini Train Store, qui constituent les trois meilleurs scores selon cette grille.
- **Catalogue :** tri par **importance** par défaut sur tous les projets, indépendamment de leur groupe (personnel, bibliothèque, compétition ou académique). La recherche et les filtres s'appliquent avant le tri.
- **Alternative :** le visiteur peut choisir **Nom (A → Z)**. Aucune note numérique subjective n'est affichée directement sur les cartes : leur ordre reflète le choix éditorial.
- **Révisions :** modifier uniquement `ranking` dans [`portfolioProjects.ts`](../.vitepress/theme/data/portfolioProjects.ts) ; le score est recalculé par `projectScore()`. Modifier les quatre poids en un endroit (`PROJECT_RANK_WEIGHTS`) si les priorités éditoriales changent. Les tests vérifient la complétude et la cohérence des projets mis en avant.
- **Maintenance :** ce tableau est un instantané éditorial ; il doit être actualisé si les facteurs ou poids changent. Les données TypeScript sont la source de vérité.

## English summary

The score is an **editorial portfolio relevance score**, not an objective measure of project quality. It weights technical depth (40%), originality/autonomy (20%), practical impact (25%) and publicly available evidence/presentation (15%). Every factor is scored from 0 to 5, giving a 0–100 weighted score. The catalogue defaults to importance order, with an alphabetical alternative; scores are *not* shown as badges to visitors. Update `ranking` on each project to revise priorities, and keep this snapshot synchronized.
