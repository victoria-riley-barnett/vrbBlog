---
title: 'What a fixed-size input cannot learn'
slug: 'what-a-fixed-input-cannot-learn'
publishDate: '2026-11-09'
description: 'A string task where order is the whole answer, three ways to read it, and why one of them fails before training starts.'
tags: ['machine learning', 'teaching', 'csc-411']
kind: 'teaching'
series: 'Teaching CSC 411'
seriesOrder: 1
draft: true
---
<!--
SEED from chapter 8 of the CSC 411 book (08-sequence-failure). Sentences are condensed from your chapter text.
The chapter's run_log provenance should be checked before any number is quoted; none are quoted here.
-->

Every example in this task is a short string of symbols: exactly one `S`, exactly one `T`, and filler `x` elsewhere. The answer is `yes` when the `S` sits to the left of the `T`. `SxxT` and `TxxS` hold the same symbols in a different order, and the order is the whole of the answer.

A model's answer is a function of the numbers it receives, so two examples that arrive as the same numbers get the same answer. A representation that sends two examples to the same numbers is **many-to-one**, and whatever it dropped is gone before a weight is touched.

The check needs no training: name a pair the question treats differently and ask whether the representation separates them. Reverse every training string and flip every answer, and a count of symbols is unchanged while the answers become their opposites. Counting cannot answer an order question. It answers a presence question perfectly, even on strings longer than any it saw.

Three readers were built on the task: symbol counts; the string in twelve slots read as one row; and the same slots read in order, with a summary carried forward. Their failures are different kinds. The counting reader's is a limit of its representation. The flattened reader's is a limit of its frame: training strings were padded on the right, so the high slots only ever held pads. The recurrent reader's is neither, and a padding convention it never saw in training costs it most of its accuracy.

[V: the moment in class when this landed or didn't. One student, one sentence.]
[V: a figure. `compare-three-readers` exists in admin/diagrams; decide whether to export it for the web.]
