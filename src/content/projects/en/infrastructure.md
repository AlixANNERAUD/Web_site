---
title: Infrastructure — self-hosting and automation
description: A case study on running self-hosted services with TrueNAS, Docker Compose, Ansible and observability.
---

# Infrastructure: making self-hosting maintainable

**Linux · TrueNAS · Docker Compose · Ansible · Monitoring** · Since 2020

> Running real services for family and friends, prioritizing autonomy, reproducibility and control over data.

## The challenge

Running a few applications on a server is straightforward. Maintaining them over years requires managing updates, configuration, access, availability and incidents.

This project has grown into a collection of services including cloud storage, messaging, collaboration tools, media applications, monitoring and business software.

## Architecture

<ArchitectureFlow title="From configuration to operating services" :steps="[{ title: 'Inventory and secrets', detail: 'Ansible inventory and configuration files; separate secret storage.' }, { title: 'Provisioning', detail: 'Ansible playbooks and deployments across hosts.' }, { title: 'Runtime', detail: 'TrueNAS Apps and services deployed with Compose.' }, { title: 'Observability', detail: 'Service status, metrics and alerts.' }]" />

The repository contains **Ansible playbooks**, **Docker Compose** definitions for services deployed that way, plus an inventory and deployment documentation. Some services run as **TrueNAS Apps**, while others are deployed through Ansible.

The documented monitoring stack uses **Prometheus, Grafana and Alertmanager** to monitor services and help detect incidents.

## Decisions and trade-offs

- **Automate instead of accumulating manual installs.** Services managed with Ansible keep their configuration in version-controlled deployment files.
- **Separate secrets.** The repository documents a distinct vault for sensitive values rather than embedding them into public playbooks.
- **Manage multiple deployment models.** TrueNAS Apps and Ansible do not share identical lifecycles; this adds maintenance complexity.
- **Make observability actionable.** Monitoring can detect errors, but it is not a substitute for restoring backups or testing recovery procedures.

## Services and outcome

The environment runs services such as **Nextcloud, Vaultwarden, Matrix, Jellyfin and Gitea**, alongside personal applications. The service inventory evolves over time and is documented in the repository.

What matters is not the number of containers but the ability to **deploy, troubleshoot and evolve** real services.

## Explore the project

- [Infrastructure repository](https://github.com/AlixANNERAUD/Infrastructure)
- [Service organization and deployments](https://github.com/AlixANNERAUD/Infrastructure#structure)
- [Vigie monitoring stack](https://github.com/AlixANNERAUD/Infrastructure/blob/main/services/vigie/readme.md)

[← All projects](/projects)
