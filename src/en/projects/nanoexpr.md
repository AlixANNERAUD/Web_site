---
title: "nanoexpr — engineering project"
description: "Heap-free mathematical expression parser and evaluator for embedded Rust with bounded stack usage."
---

[← All projects](/projects)

# nanoexpr

**Rust · no_std · Parser · C ABI** · 2026 – present

> Heap-free mathematical expression parser and evaluator for embedded Rust with bounded stack usage.

## Overview

A `no_std` mathematical expression evaluator for microcontrollers that does not allocate heap memory. Its parser evaluates expressions directly without a heap-allocated syntax tree, limits nesting depth, and reports precise errors. It supports several numeric representations, variables, and functions. [Source and documentation](https://github.com/AlixANNERAUD/nanoexpr).

## Engineering approach

The parser evaluates expressions without building a heap-allocated syntax tree, making it relevant to MCUs with tight memory limits. Bounded nesting, error reporting and Rust/C interfaces make it reusable outside its original context.

## Scope and limitations

Designed as a reusable library independent of one application. Refer to the upstream repository for current APIs, examples, platform constraints and supported versions.

## Explore the project

[Source repository, documentation or official result](https://github.com/AlixANNERAUD/nanoexpr) ↗

**Related work:** [Xila](/projects/xila) · [getargs-derive](/projects/getargs-derive)
