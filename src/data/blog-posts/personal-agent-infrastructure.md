---
title: "How I Built a Personal AI Agent Infrastructure That Actually Works"
slug: 'personal-agent-infrastructure'
publishDate: '2026-03-21'
description: "A practical breakdown of the AI agent stack I use daily — Claude Code with MCP servers, Sophia memory system, dispatch-agents, and how they fit together."
tags: ['ai', 'agents', 'infrastructure', 'claude', 'tools']
---

My AI agent infrastructure tackles context loss, cost inefficiency, and isolated agents. It combines Claude Code with MCP servers, Sophia memory, and dispatch-agents for cheap task delegation.

## The Core: Claude Code with MCP Servers

I use Claude Code in a terminal (Ghostty + tmux + nvim) with access to my `~/work` directory. It connects to several MCP (Model Context Protocol) servers:

- **mnemosyne**: A knowledge graph database for the Sophia memory system. [VERIFY: Is mnemosyne publicly available? Provide repository link.]
- **mcp-dispatch**: A filesystem-based message relay for agent communication.
- **mcp-context-monitor**: Tracks context window usage.
- **maeve**: Manages project state within Sophia.

This setup makes Claude a persistent agent with tools, memory, and communication.

## Sophia: Persistent Memory

Sophia is a knowledge graph powered by Mnemosyne. [VERIFY: Is Mnemosyne an open-source project? Confirm availability.] Each project has its own graph, with a meta-graph called 'work'. During sessions, Claude writes key decisions, discoveries, and hypotheses to Sophia. At the start of a new session, I type "recall last 5 memories" to reload context. This avoids reliance on chat history and context window limits. The key is consistent writing; if I neglect it, context can be lost during compression.

## Dispatch-Agents: Cost-Effective Task Handling

Claude Sonnet/Opus is expensive, so I use `dispatch-agents` to send tasks like drafting or research to DeepSeek, a cheaper model. [VERIFY: DeepSeek API pricing and performance as of publish date?] Completed tasks are written to a dispatch directory, and Claude notifies me. This reduces my API costs by approximately 70%. [VERIFY: Cost reduction claim based on personal usage; may vary.]

## The Rest of the Stack

- **AICHAT**: A terminal REPL for quick queries and RAG against local files, using local models via Ollama for private tasks.
- **Ollama**: Runs local models like Qwen2.5 and Llama 3.1. They're too slow for real-time work but suitable for offline analysis.

## Design Philosophy

1. **Use cheap models for cheap tasks** — DeepSeek for drafting, Claude for reasoning.
2. **Store persistent state in Sophia** — not in chat history.
3. **Enable asynchronous agent communication** — via the dispatch MCP server.
4. **Treat everything as a composable tool** — not a proprietary system.

MCP's standardization allows component swapping, avoiding lock-in.

## What Works (and What Doesn't)

### What works surprisingly well:
- **Sophia memory**: Querying "recall last 5 memories" quickly restores context.
- **Dispatch-agents for writing**: With good prompts, DeepSeek produces drafts needing minimal edits.
- **MCP notification pattern**: Async completions via inbox messages eliminate polling.

### What doesn't work yet:
- **Token budgets**: Web search tasks can consume 200k tokens without careful controls. [VERIFY: Typical token usage for web search tasks?]
- **Context compaction**: State loss occurs if I fail to write to Sophia before compression.
- **Local model speed**: Even on an M3 Max, local models aren't fast enough for real-time agentic work.

## The Terminal Setup

For reference: Ghostty with three panes (Claude Code, nvim, shell), managed by tmux with vim-style keybindings. This keeps all work in one window.

## Why Build This Instead of Using a Platform?

Platforms like Cursor or Windsurf are opinionated and often costly. My stack is modifiable and cost-optimized, using DeepSeek ($0.10/1M tokens) instead of Claude Opus ($15/1M tokens) where possible. [VERIFY: Current pricing may vary; confirm rates.]

## The Code

Most components are open source: MCP servers on GitHub, Sophia on Mnemosyne, and dispatch-agents as a ~200-line Python script. [VERIFY: Provide specific repository links for MCP servers and Sophia.]

This isn't the definitive way to build agent infrastructure, but it works for my needs as an engineer seeking persistent, composable, and cost-effective AI assistance. The future lies in specialized, communicating agents, and this stack is a step toward that.