---
title: "getargs-derive — projet d'ingénierie"
description: "Macros procédurales pour décrire des interfaces CLI en Rust embarqué, avec analyse sans allocation et aide générée à la compilation."
---

[← Tous les projets](/fr/projects)

# getargs-derive

**Rust · Proc macros · CLI · no_std** · 2026 – présent

> Macros procédurales pour décrire des interfaces CLI en Rust embarqué, avec analyse sans allocation et aide générée à la compilation.

## Présentation

Macros procédurales Rust pour décrire des interfaces en ligne de commande avec une syntaxe proche de Clap, tout en ciblant `no_std`. L'analyse des arguments et la génération des messages d'aide peuvent fonctionner sans allocation dynamique. [Code et exemples](https://github.com/AlixANNERAUD/getargs-derive).

## Démarche technique

L'API de dérivation décrit commandes et options directement dans des structures Rust, puis génère un analyseur léger à la compilation. Le compromis recherché est une ergonomie inspirée de Clap sans imposer d'allocateur aux exécutables embarqués.

## Portée et limites

Bibliothèque conçue pour être réutilisée indépendamment d'une application. Les API et exemples à jour figurent dans le dépôt source ; les contraintes d'environnement et les versions supportées doivent y être vérifiées.

## Explorer le projet

[Dépôt, documentation ou résultat officiel](https://github.com/AlixANNERAUD/getargs-derive) ↗

**Dans le même domaine :** [Xila](/fr/projects/xila) · [nanoexpr](/fr/projects/nanoexpr)
