---
title: "Cartographie d'occupation évidentielle (EOGM) — projet d'ingénierie"
description: "Cartographie d'occupation robotique à partir de capteurs embarqués, basée sur la théorie de Dempster-Shafer."
---

[← Tous les projets](/fr/projects)

# Cartographie d'occupation évidentielle (EOGM)

**C++ · ROS** · 2024

> Cartographie d'occupation robotique à partir de capteurs embarqués, basée sur la théorie de Dempster-Shafer.

## Présentation

Basé sur le <a href="https://www.researchgate.net/publication/337171728_25D_Evidential_Grids_for_Dynamic_Object_Detection">document de recherche de notre professeur sur l'application pratique de la théorie de Dempster-Shafer en robotique</a>, nous avons développé un algorithme en temps réel qui crée des cartes d'espaces libres et occupés dans l'environnement d'un robot en utilisant des capteurs LiDAR, IMU et GPS embarqués. Il a été développé pour le <a href="https://en.wikipedia.org/wiki/Robot_Operating_System">Robot Operating System (ROS)</a>. Il est rapide et efficace grâce à diverses optimisations de mémoire, techniques de vectorisation et de parallélisation.

## Démarche technique

Les cartes d'occupation provenant de capteurs sont fusionnées par un nœud ROS, selon un modèle évidentiel. Le code documente notamment des optimisations AVX2 : c'est un exemple de compromis entre calcul scientifique, robotique temps réel et performances bas niveau.

## Portée et limites

Travail réalisé dans un cadre académique ou de recherche, pouvant être collectif. Il illustre une démarche d'ingénierie ou une expérimentation et n'est pas présenté comme un produit commercial déployé.

## Explorer le projet

[Dépôt, documentation ou résultat officiel](https://github.com/AlixANNERAUD/Evidential_occupancy_map) ↗

**Dans le même domaine :** [Réseau ferroviaire miniature](/fr/projects/model-railway) · [Enceinte connectée](/fr/projects/connected-speaker)
