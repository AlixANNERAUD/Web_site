---
title: "getargs-derive — engineering project"
description: "Procedural macros for embedded Rust command-line interfaces, with allocation-free parsing and compile-time help generation."
---

[← All projects](/projects)

# getargs-derive

**Rust · Proc macros · CLI · no_std** · 2026 – present

> Procedural macros for embedded Rust command-line interfaces, with allocation-free parsing and compile-time help generation.

## Overview

Rust procedural macros for declaring command-line parsers using Clap-like syntax while targeting `no_std`. Parsing and help text generation are designed to work without heap allocation. [Code and examples](https://github.com/AlixANNERAUD/getargs-derive).

## Engineering approach

Derive macros describe commands and options in Rust structs and generate parsers at compile time. The trade-off is Clap-like ergonomics without imposing an allocator on embedded binaries.

## Scope and limitations

Designed as a reusable library independent of one application. Refer to the upstream repository for current APIs, examples, platform constraints and supported versions.

## Explore the project

[Source repository, documentation or official result](https://github.com/AlixANNERAUD/getargs-derive) ↗

**Related work:** [Xila](/projects/xila) · [nanoexpr](/projects/nanoexpr)
