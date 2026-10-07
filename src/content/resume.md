---
title: Victoria Barnett — Resume
---

# Victoria Barnett

victoria.022@proton.me · 415-930-2560 · San Francisco, CA<br>
[vb4r.com](https://vb4r.com) · [github.com/victoria-riley-barnett](https://github.com/victoria-riley-barnett) · [linkedin.com/in/victoriabarnett0](https://linkedin.com/in/victoriabarnett0)

Software Engineer · Machine Learning Engineer · Systems

## Summary

I build practical software and machine-learning systems, and I teach others how to understand and improve them. At San Francisco State University, I designed and currently teach a 15-week intermediate machine learning course that takes students from matrix multiplication and gradient descent to a working transformer encoder. Before and alongside teaching, I worked in R&D operations for a physical-AI company, coordinating operators, devices, telemetry, and dataset quality into alignment with the ML team. I enjoy tracing problems to their source, making complex systems easier to use, and leaving behind tools and documentation that others can rely on.

## Experience

**Lecturer and Course Developer — [CSC 411: Intermediate Machine Learning](https://github.com/victoria-riley-barnett/intermediate-ml)**<br>
San Francisco State University, San Francisco, CA · May 2026 – Present

- Designed and teach the first offering of a fifteen-week course for the PINC interdisciplinary computing minor, with no calculus prerequisite.
- Teach students to derive and implement gradient descent, backpropagation, multilayer perceptrons, and attention from scratch before using PyTorch and Lightning to build a working transformer encoder.
- Created 18 lecture and lab notebooks, rubrics, and a checkpointed capstone; built notebook-to-Markdown conversion and PDF-export tooling to support course delivery.
- Replaced a 12 year old curriculum with a FastAi / SmolML-inspired curriculum that emphasizes architectural understanding, evaluation, debugging models, and extensive hands-on toy model and Pytorch work, rather than using pre-built architectures. Supplements with historical and contemporary research papers, including Domingos' "12 Lessons," and Vaswani et al.'s "Attention is All You Need."

**R&D Operations Coordinator (Contract, via Lumicity)**<br>
Confidential AI/robotics client, San Francisco, CA · February 2026 – August 2026

- Supervised the data operation behind a physical-AI training pipeline, coordinating hundreds of collection devices, the operators running them, and the QA standards used to accept or reject data.
- Used SQL and Retool to trace 80% of logged device faults—approximately 40,000 events—to a single upstream cause, and helped analyze and fix the underlying issue in software to operator interaction.
- When dataset diversity collapsed mid-season, pinpointed the collection process as the cause, and experimented with new collection strategies to restore it.
- Turned operator and telemetry findings into collection, system, hardware, and process improvements across the startup, including a rapid quality-assurance pipeline for external partner data.

**Instructional Assistant — CSC 511: Protein Modeling with Deep Learning**<br>
PINC Program, San Francisco State University · December 2025 – May 2026

- Led twice-weekly recitations for approximately 40 life-science students building protein-property-prediction models in PyTorch and Lightning.
- Wrote Jupyter notebook tutorials for AlphaFold2-inspired architectures and helped students debug model logic, CUDA, GPU-memory, and environment failures.
- Designed and graded assignments, quizzes, and exams, and provided feedback on student code and reports.

**Chapter Co-Chair, Technical Infrastructure (Volunteer)**<br>
Democratic Socialists of America, San Francisco · 2021 – 2024

- Ran technical infrastructure without an engineering team: three servers across DigitalOcean and AWS, fifteen Docker services managed with Portainer, Auth0 single sign-on, and CRM and publishing integrations.
- Trained non-technical volunteers on data pipelines and campaign tools including NationBuilder, Action Network, Mobilize, CallHub, and Google Workspace.

**Crew Chief, then Inspector — Munitions Systems**<br>
United States Air Force · 2016 – 2021

- Led maintenance and production teams of 2–8 while maintaining and inspecting aircraft munitions systems.
- Found data-integrity errors across databases tracking $400 million in guided munitions, traced the errors to their source, and drove a technical-data correction that propagated globally in coordination with Boeing and Raytheon engineers.
- Wrote SQL report scripts over an Access reporting layer, replacing a weekly report that took three to four hours to compile by hand.
- Authored, managed, and maintained more than 120 technical and operational documents to formal standards.

## Selected Projects

**[Tailscale for KOReader](https://github.com/victoria-riley-barnett/koreader-tailscale)** — VPN Support for ARM E-Ink Readers

- Ported Tailscale to ARM e-ink readers (Kindle, Kobo, PocketBook, reMarkable) and wrote the Lua plugin that integrates it into KOReader, which previously had no VPN support.
- Maintain the project, which has shipped seven releases, merged 11 pull requests from outside contributors, and drawn 223 GitHub stars and 24 forks.
- Root-caused a routing failure to forced userspace networking and moved the project to kernel TUN with a userspace fallback; also fixed an installer that could report success after failed extraction.

**Cairn** — Desktop IDE and Orchestration Tool

- Building a desktop IDE around a small programming language, a graph-backed file system, and an experimental partial-evaluation engine.
- Modeling org-mode documents and live program state as first-class, queryable data.
- Developing dispatch, evaluation, and context-management tooling for combined human-ML workflows within the IDE.

**[SerialPM](https://github.com/victoria-riley-barnett/serialpm)** — Visual project-management platform

- Led a five-person capstone team building Node/Express and React/TypeScript microservices with MySQL, Redis, Docker, AWS, and CI/CD.
- Authored 16 merged pull requests spanning schema, API, and dashboard work.

**[Alzheimer’s Screening Classifier](https://github.com/victoria-riley-barnett/r-alzheimers-rf)** — Recall-first machine-learning project

- Led a three-person team building a Random Forest classifier in R, using cross-validated grid search to optimize sensitivity rather than accuracy.
- Shifted the voting cutoff toward detection, reducing missed diagnoses by 68% at a cost of 0.65 points of accuracy.

**[Auto Child Education](https://steamcommunity.com/sharedfiles/filedetails/?id=3607293096)** — Europa Universalis V mod

- Created one of the ten most-subscribed Europa Universalis V mods on the Steam Workshop, with about 25,000 subscribers.
- Kept the mod compatible through three game updates and shipped fixes for trait detection and performance.

## Open Source Contributions

- **[D2R Reimagined](https://github.com/D2R-Reimagined/d2r-reimagined-mod):** Contributed nine merged pull requests to a 150-star community game mod, covering item and recipe data, balance tuning, localization, and diagnosed bug reports.
- **[DSA Planet](https://github.com/dsa-ntc/dsa-planet):** Authored the “DSA Light” theme and landed six merged pull requests in the national organization’s RSS aggregator.
- **[md-advanced-tables](https://github.com/tgrosinger/md-advanced-tables):** Fixed a formula reference in a 190-star Markdown table editor (merged upstream).

## Education

**B.S., Computer Science** — San Francisco State University, December 2025<br>
Data structures and algorithms, operating systems, compilers, computer architecture, database systems, software engineering, system administration, and AI ethics. Prior coursework at City College of San Francisco; Dean’s Honor List, Fall 2022.

## Skills

**Machine Learning and Data:** PyTorch, Lightning, scikit-learn, pandas, NumPy, R, neural architectures from scratch, LLM evaluation, failure taxonomies, agent transcript scoring, model evaluation, dataset QA, acceptance standards, telemetry pipelines, embeddings, graph inference, retrieval, knowledge graphs, SPARQL

**Programming Languages:** Python, TypeScript, JavaScript, C, C++, Rust, Java, Common Lisp, SQL, R, Lua, Fennel, Bash

**Web and Applications:** React, SolidJS, Node/Express, REST APIs, Astro, PostgreSQL, PostGIS, MySQL, SQLite, Redis, MapLibre, GeoJSON

**Systems and Infrastructure:** Linux, systemd, Docker, Docker Compose, Portainer, AWS, DigitalOcean, Cloudflare, CI/CD, release automation, cross-compilation, embedded ARM, WireGuard/Tailscale VPN

**Tools:** Jupyter, Retool, Auth0, Google Workspace, LaTeX, Cargo, uv, Make, SBCL/ASDF
