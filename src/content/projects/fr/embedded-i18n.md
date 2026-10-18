---
title: "embedded-i18n — projet d'ingénierie"
description: "Internationalisation compilée dans le firmware Rust : traductions en ROM, validation à la compilation et fonctionnement sans allocateur."
---

[← Tous les projets](/fr/projects)

# embedded-i18n

**Rust · Macros · no_std · i18n** · 2026 – présent

> Internationalisation compilée dans le firmware Rust : traductions en ROM, validation à la compilation et fonctionnement sans allocateur.

## Présentation

Outil d'internationalisation pour firmware Rust : les traductions sont résolues à la compilation et intégrées en ROM, sans parseur ni allocation au runtime. Les macros vérifient les clés et les paramètres de format, avec gestion des pluriels et plusieurs formats de fichiers. [Code et guide](https://github.com/AlixANNERAUD/embedded-i18n).

## Démarche technique

Les ressources de langue deviennent des chaînes statiques au moment de la compilation, stockées dans la ROM. Les macros vérifient les clés et les paramètres de format pour déplacer les erreurs de traduction du runtime vers la compilation.

## Portée et limites

Bibliothèque conçue pour être réutilisée indépendamment d'une application. Les API et exemples à jour figurent dans le dépôt source ; les contraintes d'environnement et les versions supportées doivent y être vérifiées.

## Explorer le projet

[Dépôt, documentation ou résultat officiel](https://github.com/AlixANNERAUD/embedded-i18n) ↗

**Dans le même domaine :** [Réseau ferroviaire miniature](/fr/projects/model-railway) · [Enceinte connectée](/fr/projects/connected-speaker)
