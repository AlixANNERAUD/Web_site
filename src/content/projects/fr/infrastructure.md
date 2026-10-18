---
title: Infrastructure — auto-hébergement et automatisation
description: Étude de cas sur l'exploitation de services auto-hébergés avec TrueNAS, Docker Compose, Ansible et supervision.
---

# Infrastructure : rendre l'auto-hébergement exploitable

**Linux · TrueNAS · Docker Compose · Ansible · Monitoring** · Depuis 2020

> Exploiter de vrais services pour ma famille et mes proches, avec une préférence pour l'autonomie, la reproductibilité et la souveraineté des données.

## Le problème

Héberger quelques applications sur une machine est assez simple. Les maintenir dans la durée demande en revanche de gérer les mises à jour, la configuration, les accès, la disponibilité et les incidents.

L'infrastructure a progressivement évolué vers un ensemble de services : cloud personnel, messagerie, outils collaboratifs, médiathèque, surveillance et applications métier.

## Architecture

<ArchitectureFlow title="De la configuration aux services" :steps="[{ title: 'Inventaire et secrets', detail: 'Inventaire Ansible et fichiers de configuration ; secrets gérés séparément.' }, { title: 'Provisionnement', detail: 'Playbooks Ansible et déploiements sur les hôtes.' }, { title: 'Exécution', detail: 'TrueNAS Apps et services déployés via Compose.' }, { title: 'Supervision', detail: 'Statuts de service, métriques et alertes.' }]" />

Le dépôt contient les **playbooks Ansible**, les fichiers **Docker Compose** des services gérés de cette manière, ainsi que l'inventaire et la documentation de déploiement. Certains services sont exécutés comme **applications TrueNAS**, d'autres sont gérés par Ansible.

Une pile de supervision documentée dans le dépôt utilise notamment **Prometheus, Grafana et Alertmanager** pour suivre l'état des services et faciliter la détection de problèmes.

## Choix et compromis

- **Automatiser plutôt qu'accumuler les installations manuelles.** Chaque service déployé par Ansible dispose de fichiers permettant de retrouver sa configuration.
- **Séparer les secrets.** Le dépôt documente un coffre distinct pour les éléments sensibles, plutôt que de les intégrer aux playbooks publics.
- **Composer avec plusieurs modes de déploiement.** TrueNAS Apps et Ansible ne sont pas identiques ; cette hétérogénéité reste un coût de maintenance.
- **Superviser l'existant.** Les indicateurs et alertes aident à détecter les erreurs, sans remplacer les tests de restauration et de reprise après incident.

## Services et résultats

L'infrastructure héberge notamment des services tels que **Nextcloud, Vaultwarden, Matrix, Jellyfin et Gitea**, en plus de projets personnels. L'inventaire évolue continuellement ; les liens et le statut de ces services sont documentés dans le dépôt.

L'intérêt du projet n'est pas un nombre de conteneurs, mais la capacité à **déployer, diagnostiquer et faire évoluer** des services réels.

## Explorer le projet

- [Dépôt Infrastructure](https://github.com/AlixANNERAUD/Infrastructure)
- [Organisation des services et déploiements](https://github.com/AlixANNERAUD/Infrastructure#structure)
- [Pile de supervision Vigie](https://github.com/AlixANNERAUD/Infrastructure/blob/main/services/vigie/readme.md)

[← Tous les projets](/fr/projects)
