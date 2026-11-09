---
title: 'A loop with no exit condition'
slug: 'dimensionally-speaking'
date: '2026-11-09'
description: 'Representation, attention, and interpretability keep chasing each other. A short note on why.'
tags: ['machine learning']
garden: 'doc-dimensionally-speaking-78d410480b0d'
---
Machine learning was always concerned with our most general linear and our most general non-linear ways to model things, and with combining the two coherently into *models*, along with a plan for how to judge the combination.

Once you see it that way, the levels of abstraction start to look slightly strange. Why did we stop where we did? Following that question gets you an arms race that goes roughly like this:

1. Let's represent something so we can model it.
2. Let's represent that something more dynamically.
3. Now we can attend to it, with queries, keys, and values.
4. But because of *that*, we flattened something, so we have to get it back out: mechanistic interpretability.

When you *know* how to get something back out, that is relatively close to knowing how to put it back in, which means making the representation more dynamic again. That's step 2.

So it's a loop, and it has no exit condition. It only accrues from the steps before it.

Is machine learning trivial, then? Yes, in one sense. Strictly no in another.

<!-- V: your Garden note goes on to Hilbert space, bash tool calls as function application, and set vs category theory. Each could be its own short piece later. -->
