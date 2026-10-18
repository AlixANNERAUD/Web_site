---
title: Xila — Rust embedded operating system
description: Engineering decisions behind the Xila operating system, including Rust modules, drivers, WebAssembly and LVGL.
---

# Xila: building a modular embedded operating system

**Rust · WebAssembly · LVGL · embedded systems** · Since 2019

> A long-running open-source project combining portable operating-system services with isolated applications on resource-constrained devices.

## The challenge

Microcontrollers impose tight memory, storage and CPU budgets. I wanted to build a modular development environment nonetheless: separate drivers, hardware abstraction, storage, tasks, graphics and applications that do not always need to be compiled into the host system.

The central challenge is to **define reusable contracts** between operating-system services, hardware and programs rather than targeting just one board.

## Architecture

<ArchitectureFlow title="Main layers of Xila" :steps="[{ title: 'Drivers', detail: 'Adaptation to hardware, native Linux and browser targets.' }, { title: 'Rust modules', detail: 'Tasks, users, VFS, networking, graphics and OS services.' }, { title: 'Execution boundary', detail: 'ABI contracts, guest/host bindings and the WebAssembly virtual machine.' }, { title: 'Applications', detail: 'Bundled programs, shell and Wasm applications.' }]" />

The repository distinguishes **modules** holding runtime behavior, **crates** defining contracts and utilities, **drivers** adapting to a platform, and **executables**. A file request goes through the VFS for namespace and access checks before reaching a LittleFS backend or a device endpoint.

Guest applications currently use the **Wasmi** runtime; guest calls cross an explicit binding layer before reaching the same Xila services available to native programs. The graphics stack uses **LVGL**.

## Engineering decisions

- **Rust host, WebAssembly guests.** Rust implements the operating-system services, while Wasm provides a separate application format and an explicit execution boundary.
- **Portable contracts, target-specific drivers.** The filesystem and device interfaces can be reused while each driver handles its target environment.
- **Native and browser development environments.** Linux and browser examples enable iteration before hardware validation. Browser persistence combines an image-based disk and OPFS.
- **Explicit costs.** The Wasm interpreter, abstraction layers and graphics stack all have memory and performance implications that need to be measured on the intended device.

## Try Xila in WebAssembly

<XilaBrowserDemo lang="en" />

## Status and limitations

Xila is **actively developed**. Running a native or browser example does not establish compatibility with a particular board. I avoid claiming near-native execution performance without reproducible benchmarks.

## Explore the project

- [Xila Core source code](https://github.com/xila-project/core)
- [Documentation and component map](https://www.xila.dev/explanation/architecture/components)
- [Browser tutorial](https://www.xila.dev/tutorials/browser)
- [Native tutorial](https://www.xila.dev/tutorials/native)

[← All projects](/projects)
