---
title: 'Show every hole'
slug: 'show-every-hole'
publishDate: '2026-11-09'
description: 'A display rule for partially evaluated programs: never fill a hole silently. A hypothesis, not a result.'
tags: ['cairn', 'partial evaluation', 'interfaces']
kind: 'note'
series: 'Cairn'
seriesOrder: 2
draft: true
---
<!--
SEED. Passages are verbatim from your Garden note "Conformal Attention - Author-marked Proposals" (the ones you marked as yours and untested).
They stay labeled as proposals. The AI-written synthesis the note came from is not used. Rewrite in your voice.
-->

Partial evaluation already produces a persistent state that survives between interactions, and the UI can render it. The user is the environment stream. The hidden part is what remains private. Holes are where the machine says "my work tape cannot continue without the stream." That turns an incompleteness claim into a display rule: **show every hole, never fill one silently.**

Four design consequences, all mine and untested:

1. Persist the residual, not a transcript, so history is a term that can be rewritten.
2. Make a macrostep equal one hole-fill, so the interaction stream is a list of fills that can be replayed.
3. Treat the amnesic case as a test: if dropping the residual between steps loses nothing, the persistence is decorative.
4. Ask for bisimulation-style equivalence on residuals rather than trace equivalence.

A test I could run: replay logged agent failures and check whether each one is a hole that was filled silently.

[V: what "hole" means in one concrete example, before the list. And what this has to do with data work: a label that was filled in without anyone seeing the gap is the same failure.]
