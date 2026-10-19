---
title: "battery-percent"
description: "Estimation de charge par courbes de décharge et interpolation, avec filtrage ADC : bibliothèque C99 et bindings Rust no_std."
---

[← Tous les projets](/fr/projects)

# battery-percent

**C99 · Rust · Battery · MCU** · 2026 - présent

> Estimation de charge par courbes de décharge et interpolation, avec filtrage ADC : bibliothèque C99 et bindings Rust no_std.

## Présentation

Petite bibliothèque C99 et Rust `no_std` qui estime l'état de charge d'une batterie à partir de courbes de décharge et de mesures de tension. Elle gère diverses chimies, les packs en série ainsi que le lissage des mesures ADC, sans dépendance à un microcontrôleur spécifique. [Code et courbes](https://github.com/AlixANNERAUD/battery-percent).

## Démarche technique

L'estimation repose sur des courbes de décharge et de l'interpolation plutôt que sur une règle linéaire valable pour une seule chimie. La bibliothèque distingue l'acquisition ADC du calcul pour rester portable entre différents microcontrôleurs.

## Portée et limites

Bibliothèque conçue pour être réutilisée indépendamment d'une application. Les API et exemples à jour figurent dans le dépôt source ; les contraintes d'environnement et les versions supportées doivent y être vérifiées.

## Explorer le projet

[Dépôt, documentation ou résultat officiel](https://github.com/AlixANNERAUD/battery-percent) ↗

**Dans le même domaine :** [Réseau ferroviaire miniature](/fr/projects/model-railway) · [Enceinte connectée](/fr/projects/connected-speaker)
