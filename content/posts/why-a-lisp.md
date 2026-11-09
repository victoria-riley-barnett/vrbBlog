---
title: 'Why I am writing a Lisp'
slug: 'why-a-lisp'
publishDate: '2026-11-09'
description: 'I like org-mode and hate Emacs. A language where the notes and the program are the same thing.'
tags: ['cairn', 'programming languages', 'lisp']
kind: 'note'
series: 'Cairn'
seriesOrder: 1
draft: true
---
<!--
SEED. Every sentence below is yours, from the Garden doc `intro` (doc-intro-007f48d31ca9), trimmed and reordered.
Nothing is added except the [V: ...] prompts. Rewrite freely; delete this comment before publishing.
-->

I *really* like org-mode. But I really hate *emacs*.

Learning some arcane keyboard chord scheme is *exactly the same* as learning a type system based on how someone else thinks "global objects" work. I would vastly prefer that when I was programming, I was implicitly in a kind of org-mode environment that remembers how I do things.

I have always been vastly more at home in my terminal. I was comfortable with gcc before I was entirely sure about algorithmic complexity. It shows you what you want to know, rather than making me think about what I want in terms of someone else's preexisting concepts.

Even at its best, there is a fundamental problem with tying development state, our evolving understanding of a project, to the state of the project *as* a tool. Note-taking is treated as the solution, and it works about as well as you can be disciplined to follow it. A personal note-taking system is a literalization of some order of your thought, which introduces the frailty of category logic: we are now keeping track of *two* things, and they must necessarily diverge.

Wouldn't it be nice if we had a programming language where we could just think about both:

- the things we want to impart effect on
- the methods we use to impart effects

[V: here is where "Enter Vau" goes. Two or three sentences on what a vau/operative is for someone who has never seen a fexpr. Shutt's Kernel is the reference; say what you took from it.]

Making it explicit makes for a hell of a REPL: interactive debugging with *extremely* few applied abstractions. An IDE-shape lets us specialize to real compiled use cases (partial evaluation), and the first-class environments we can interact with are the goal.

[V: what exists today. The CEK in WebAssembly, the small Rust interpreter. One concrete thing a reader could see run.]
