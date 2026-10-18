---
title: "nanoexpr — projet d'ingénierie"
description: "Parseur et évaluateur d'expressions mathématiques pour Rust embarqué, sans allocation dynamique et avec taille de pile bornée."
---

[← Tous les projets](/fr/projects)

# nanoexpr

**Rust · no_std · Parser · C ABI** · 2026 – présent

> Parseur et évaluateur d'expressions mathématiques pour Rust embarqué, sans allocation dynamique et avec taille de pile bornée.

## Présentation

Évaluateur d'expressions mathématiques `no_std` pour microcontrôleurs, fonctionnant sans allocation dynamique. Son analyseur traite les expressions sans construire d'arbre syntaxique sur le tas ; il limite la profondeur d'imbrication et signale les erreurs précisément. La bibliothèque prend en charge différents types numériques, des fonctions et des variables. [Code et documentation](https://github.com/AlixANNERAUD/nanoexpr).

## Démarche technique

Le parseur évalue des expressions sans construire d'arbre sur le tas, une décision particulièrement adaptée aux MCU où RAM et pile sont limitées. Les bornes de profondeur, la remontée d'erreurs et l'interface Rust/C permettent de le réutiliser comme brique indépendante.

## Portée et limites

Bibliothèque conçue pour être réutilisée indépendamment d'une application. Les API et exemples à jour figurent dans le dépôt source ; les contraintes d'environnement et les versions supportées doivent y être vérifiées.

## Explorer le projet

[Dépôt, documentation ou résultat officiel](https://github.com/AlixANNERAUD/nanoexpr) ↗

**Dans le même domaine :** [Xila](/fr/projects/xila) · [getargs-derive](/fr/projects/getargs-derive)
