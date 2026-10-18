---
title: Mini Train Store — commerce et automatisation
description: Une étude de cas autour d'Odoo auto-hébergé et d'une extension Vue/WXT pour gérer les annonces Leboncoin.
---

# Mini Train Store : relier une boutique en ligne à la gestion des annonces

**Odoo · Vue 3 · WXT · TypeScript · Docker** · Depuis 2026

> Transformer un besoin familial concret en outils logiciels : boutique, gestion du catalogue et automatisation autour des annonces existantes.

## Le problème

Le commerce de trains miniatures de mon père reposait notamment sur des annonces publiées sur Leboncoin. Pour disposer d'une boutique indépendante, il fallait une solution permettant de présenter les produits tout en réduisant la ressaisie et les manipulations de stock.

J'ai déployé **Odoo en auto-hébergement** et développé une **extension de navigateur** dédiée aux annonces Leboncoin. L'objectif est de rendre le travail quotidien plus simple, sans construire de zéro un moteur e-commerce.

## Architecture

<ArchitectureFlow title="De l'annonce au catalogue e-commerce" :steps="[{ title: 'Leboncoin', detail: 'Annonces consultées dans le navigateur.' }, { title: 'Extension WXT', detail: 'Content script, collecte des fiches et stockage local par profil.' }, { title: 'Interface Vue', detail: 'Vérification, tri et préparation des informations.' }, { title: 'Odoo', detail: 'API produits, catégories, prix et publication de la boutique.' }]" />

L'extension associe des **content scripts** pour lire les annonces, un **background script** pour gérer les données et un **popup Vue 3** pour consulter les éléments collectés. La couche d'intégration Odoo possède ses propres modèles de données et requêtes API pour la gestion des produits.

La boutique est déployée sur mon infrastructure, au lieu de déléguer toute la gestion à un fournisseur SaaS.

## Arbitrages techniques

- **Réutiliser Odoo plutôt que recoder un commerce complet.** Le cœur métier bénéficie d'un logiciel établi ; l'extension se concentre sur les opérations propres au commerce.
- **Isoler l'extraction dans une extension.** Elle travaille sur les pages que l'utilisateur consulte, stocke les annonces par profil et fournit une interface de vérification.
- **Contrôler les données avant publication.** Les annonces et les produits ne partagent pas nécessairement tous leurs champs : prix, statut, description, catégories et images exigent une étape de correspondance.
- **Assumer la fragilité des sélecteurs externes.** Les changements HTML du site tiers peuvent casser l'extraction ; l'extension doit donc rester testable et maintenable.

## Résultat et perspectives

La boutique est accessible sur **[minitrainstore.fr](https://www.minitrainstore.fr/)** et le dépôt contient le code de l'extension. Les fonctions couvrent notamment la collecte, le tri, le filtrage et l'intégration avec Odoo. Je ne publie pas de chiffres de vente ni de gain de temps sans mesure établie.

## Explorer le projet

- [Boutique Mini Train Store](https://www.minitrainstore.fr/)
- [Code source et ressources](https://github.com/AlixANNERAUD/MiniTrainStore)
- [Architecture de l'extension](https://github.com/AlixANNERAUD/MiniTrainStore/blob/main/code/extension/README.md)

[← Tous les projets](/fr/projects)
