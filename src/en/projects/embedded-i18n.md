---
title: "embedded-i18n — engineering project"
description: "Compile-time localization for embedded Rust: translations stored in firmware, compile-time checks and allocator-free operation."
---

[← All projects](/projects)

# embedded-i18n

**Rust · Macros · no_std · i18n** · 2026 – present

> Compile-time localization for embedded Rust: translations stored in firmware, compile-time checks and allocator-free operation.

## Overview

Localization for Rust firmware with translations resolved at compile time and stored in ROM rather than parsed at runtime. Its macros validate translation keys and formatting arguments, support plural rules, and read several established translation file formats. [Source and guide](https://github.com/AlixANNERAUD/embedded-i18n).

## Engineering approach

Translations become static strings at build time and reside in firmware ROM. Macros validate keys and formatting placeholders, turning potential runtime translation failures into build-time errors.

## Scope and limitations

Designed as a reusable library independent of one application. Refer to the upstream repository for current APIs, examples, platform constraints and supported versions.

## Explore the project

[Source repository, documentation or official result](https://github.com/AlixANNERAUD/embedded-i18n) ↗

**Related work:** [Model railway network](/projects/model-railway) · [Connected speaker](/projects/connected-speaker)
