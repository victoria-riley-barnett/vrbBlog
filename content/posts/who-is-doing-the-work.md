---
title: 'Who is doing the work when an agent runs bash?'
slug: 'who-is-doing-the-work'
publishDate: '2026-11-09'
description: 'The harness, the model, and where the engineering went.'
tags: ['machine learning', 'agents', 'analysis']
kind: 'analysis'
draft: true
---
<!--
SEED from the middle of your post `cel` (doc-cel-d3608c958bf3), sections "Paradigm Broke", "Semantic Overload", "Global QKV".
Verbatim, trimmed. The physics and Hegel tangents at the end of that post are left out on purpose. Rewrite; this is the "analysis" register.
-->

When I was growing up, bash commands on websites, especially ones that invoked `sudo`, came with a *large* set of disclaimers. The idea was that the user should be able to *reason* about what they were doing. That is no longer the case: the command line is now a tool for *doing*, and the user is expected to *trust* the commands they are given. Worse, a user is now expected to trust an agent that reasons about the system for them.

When you read an LLM chat, something some people call magical happens. The model seems to understand the user's intent, execute on it effectively, do it better than the user could have, without breaking anything, and without being inefficient. Yet even highly capable engineers believe the model *is* doing all of the above. I'd say it only looks that way because they are highly capable engineers.

I hold that harnesses, the applications LLMs are used in, have been built to obscure the line between model and agent. The more the work is imagined to happen inside the representational dimensions of the model itself, the higher a lab's value. And they reaccomplish external tooling at invocation time: the harness is a huge context machine wrapped around a poorly understood component. The implication is that we are paying heavily to redo software engineering work that already exists.

There is a funny class of papers I call "global QKV" papers. Either resolve the representational issue by accumulating a single global model, or use a system outside the model. Every fix I see offered is *more LLM use*: another file or text the model has to read and attend to.

[V: one concrete case where a harness did something a plain function would have done. Names and logs welcome; no client details.]
