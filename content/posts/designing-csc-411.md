---
title: 'Designing an intermediate ML course for students who are not CS majors'
slug: 'designing-csc-411'
publishDate: '2026-10-07'
description: 'Notes on building CSC 411 at SF State: lectures that derive, labs that build, and a course that ends at a transformer encoder.'
tags: ['teaching', 'machine-learning', 'csc-411', 'sfsu']
author: 'Victoria Barnett'
draft: true
---

<!--
DRAFT v1 scaffold. Everything outside [V: ...] brackets comes from your lesson-plan.md, plan-weeks-06-15.md, and the intermediate-ml repo.
Delete this comment before publishing; flip draft to false when it's ready.
-->

I teach CSC 411, Intermediate Machine Learning, at San Francisco State, in the PINC program. I designed the course, and this is the first time it's being taught.

[V: who the students are. Which majors, what they already know, what they came wanting. One or two concrete people or types, not a demographic.]

## The goal

The course ends at a transformer encoder. By week 13 a student has implemented one from scratch, derived queries, keys, and values, read an attention map, and trained and evaluated a model with proper train, validation, and test splits. Everything before that is a path to it. The decoder side and everything after belongs to the follow-up course, 511.

[V: why that endpoint. Why an encoder and not "an LLM"? What do you want a student to be able to say when they leave?]

## Lectures derive, labs build

The course runs on two channels:

- **Lecture derives.** Old theory becomes new theory, on the board, by hand.
- **Lab builds.** Old objects become new objects, in code.

A line in the lecture, a class in the lab. When a move happens in both, it's one idea shown twice.

[V: why you split it this way. What goes wrong when a lecture shows code, or a lab introduces new math?]

## Four places an idea can live

Every concept in the course is filed under one of four buckets, at the moment it's introduced:

- **Representation:** how the data, and the model's inside, are written down.
- **Evaluation:** how wrong it is, measured.
- **Optimization:** how the model improves.
- **Tools:** machinery the course builds and reuses.

Week 5's slide says it as three things every learning system needs: representation (what the model is), evaluation (how wrong it is), and optimization (how it improves), repeated. Every equation and every block of code that week carries one of those labels.

[V: what the labels do for a student who is lost. Does it work? Evidence from the room.]

## Arrived at, not announced

Take gradient descent in week 2. It doesn't show up as a named algorithm. The lesson starts with scanning for the best weights and watches that approach die. Then nudging, then the derivative three ways: by hand, by measurement, by PyTorch. Then the loop, with a learning rate. The student arrives at it.

Week 3 is the same move for backpropagation: a small toy (a weight, times two, plus one, squared), the chain rule applied where the values were recorded, then the backward pass in one call. By the end of the week the student has trained a two-layer network of 12,577 parameters on MNIST threes and sevens.

[V: a moment when this worked, or when it didn't. What did a student say or do?]

## A week is a container, not a topic

The failure mode I fought was one topic per week. A week that "does MLPs" isn't doing the other things students need that week. So the plan is organized by *moves*, one thing the course does, and a week carries several. Week 4, for example, is both "why a network is a representation" (one problem in three representations: a line, hand-crossed features, and a small network) and a five-step climb from a plain class to `nn.Module`, `DataLoader`, and optimizers.

I also keep the plan honest by leaving the future empty. The lesson plan only records moves that happened. A blank week is honest; a plausible one is poison.

[V: why that rule exists. A specific time a filled-in plan went wrong.]

## What I'd tell another instructor

[V: three or four things you'd say to someone building a course like this for a different audience. Keep them concrete.]

## What I don't know yet

[V: what's still unresolved. Which week are you least sure about? What would you change for the next offering?]

The course materials are at [github.com/victoria-riley-barnett/intermediate-ml](https://github.com/victoria-riley-barnett/intermediate-ml).
