---
title: "battery-percent — engineering project"
description: "Battery state-of-charge estimation from discharge curves and interpolation, with ADC filtering, in C99 and no_std Rust."
---

[← All projects](/projects)

# battery-percent

**C99 · Rust · Battery · MCU** · 2026 – present

> Battery state-of-charge estimation from discharge curves and interpolation, with ADC filtering, in C99 and no_std Rust.

## Overview

A small C99 and `no_std` Rust library that estimates battery charge using voltage-to-state-of-charge curves. It supports several cell chemistries, series packs, and ADC smoothing without tying the implementation to a particular microcontroller. [Source and curves](https://github.com/AlixANNERAUD/battery-percent).

## Engineering approach

Charge estimation uses discharge curves and interpolation instead of a linear mapping tied to one chemistry. The library separates ADC acquisition from the computation to remain portable across microcontrollers.

## Scope and limitations

Designed as a reusable library independent of one application. Refer to the upstream repository for current APIs, examples, platform constraints and supported versions.

## Explore the project

[Source repository, documentation or official result](https://github.com/AlixANNERAUD/battery-percent) ↗

**Related work:** [Model railway network](/projects/model-railway) · [Connected speaker](/projects/connected-speaker)
