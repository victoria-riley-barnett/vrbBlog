---
title: 'Building dispatch-agents: Structured AI task dispatch from the command line'
slug: dispatch-agents
publishDate: '2026-03-21'
description: A Python tool for dispatching structured tasks to DeepSeek AI agents with typed output, scoped file access, and MCP notifications.
tags: ['ai', 'agents', 'python', 'tools', 'deepseek']
---

I've been using AI agents for coding and writing tasks for a while, but I kept hitting the same friction points. I'd pipe text to `aichat` sessions, copy-paste results, try to parse unstructured output, and manually check when long-running tasks finished. It worked, but it felt like using a Swiss Army knife as a screwdriver — possible, but not what it was designed for.

So I built `dispatch-agents`: a Python tool that lets me send structured tasks to DeepSeek models from the command line or programmatically and get typed, validated output back.

## What it does

Install it with `pipx install dispatch-agent` [VERIFY: command name; title uses 'dispatch-agents'] and you get a CLI:

```bash
dispatch-agent --type blog --model reasoner --agent tech-writer --scope ./src 'Write a post about Pydantic AI'
```

The key features:

- **Structured output via Pydantic models**: The model must return valid JSON matching a schema (TaskResult, BlogDraft, ReleasePlan, or ResearchSummary)
- **Named agents with system prompts**: `--agent communist` uses deepseek-reasoner with Marxist analysis; `--agent tech-writer` uses a journalism-adjacent prompt
- **Scoped file access**: `--scope ./src` gives the agent read-only access to that directory (jailed, can't escape)
- **Web tools**: `web_search` (DuckDuckGo) and `fetch_url` always available
- **MCP notification**: `--notify claire` drops the result in an agent inbox when done
- **Results logged to JSON** with timing and token counts

## The core trick: Pydantic AI's output_type

The real magic is Pydantic AI's `output_type` parameter. When you define an agent with:

```python
agent = Agent(
    model=deepseek_reasoner,
    system_prompt=system_prompt,
    output_type=BlogDraft,
    tools=[read_file, list_dir, find_files, web_search, fetch_url]
)
```

The model *must* return valid JSON matching the `BlogDraft` schema. No more "here's some markdown, hope it's what you wanted." It's either a valid `BlogDraft` or an error.

The schemas look like this:

```python
class BlogDraft(BaseModel):
    title: str
    slug: str
    publishDate: str
    description: str
    tags: list[str]
    body: str
    notes: str = ""
```

If the model tries to return something that doesn't match — wrong field names, missing required fields, invalid types — Pydantic AI retries with validation errors. After a few attempts, it either succeeds or fails cleanly.

## Named agents are just system prompt registries

I wanted different "personas" for different tasks. The communist agent analyzes technical decisions through a Marxist lens; the tech-writer agent writes in the voice of this blog. But I didn't want separate processes or complex agent hierarchies.

The approach was simple: named agents are just system prompt registries. The `--agent communist` flag loads:

```python
AGENTS = {
    "communist": {
        "model": "deepseek-reasoner" [VERIFY: DeepSeek model name accuracy],
        "system_prompt": """You are a Marxist technical analyst. Analyze technical systems 
        through the lens of labor, ownership, and power dynamics...""",
    },
    "tech-writer": {
        "model": "deepseek-chat" [VERIFY: DeepSeek model name accuracy], 
        "system_prompt": """You write about technology the way a good journalist covers a beat: 
        accurately, accessibly, with enough context... Avoid: 'exciting', 'powerful', 
        'game-changing', 'seamless'...""",
    }
}
```

No separate processes, just different instructions. Simple but effective.

## Scoped file access with path jailing

When an agent needs to read code to write about it, I give it `--scope ./src`. Under the hood, this creates a jailed filesystem:

```python
def scoped_read_file(path: str, scope_root: Path) -> str:
    resolved = (scope_root / path).resolve()
    if not str(resolved).startswith(str(scope_root.resolve())):
        raise ValueError(f"Path escape attempt: {path}")
    return read_file(resolved)
```

Every path is resolved and checked against the scope root. The agent gets `read_file`, `list_dir`, and `find_files` tools, but they all go through this jail. It can't escape to `../../etc/passwd` or `~/.ssh`.

## The MCP notification method

For long-running tasks (research agents that do web searches, code analysis that reads entire repos), I wanted to be notified when they finish. But I didn't want to poll or set up a webhook server.

The method uses [mcp-dispatch](https://github.com/sophia-labs/mcp-dispatch) [VERIFY: repo exists and path is correct], a local inter-agent messaging system that works via filesystem relay. When you run `--notify claire`, the tool writes directly to `~/.config/mcp-dispatch/messages/claire/` [VERIFY: standard path for mcp-dispatch]:

```python
def notify_mcp(recipient: str, result: dict):
    inbox_path = Path.home() / ".config/mcp-dispatch/messages" / recipient
    inbox_path.mkdir(parents=True, exist_ok=True)
    
    message_file = inbox_path / f"{int(time.time())}.json"
    message_file.write_text(json.dumps({
        "from": "dispatch-agent",
        "task": result["task"],
        "result": result["data"],
        "timestamp": result["timestamp"]
    }))
```

The result shows up in my Claude Code session as a piggyback message. No server process, no ports, no network — just directories and JSON files with atomic writes.

## Lessons learned

### DeepSeek fabricates technical details

When DeepSeek doesn't have exact information, it makes things up. Give it a command to run or a file to read, and it might hallucinate the output. The fix: either provide the exact command/path or tell it to leave placeholders marked with `TODO` or `[placeholder]`.

### Raw JSON dumps cause hallucination

Early versions had agents return raw JSON dumps of file contents or search results. This burned tokens and led to hallucinations as the model tried to summarize from memory. Curated summaries with real quotes and code snippets work much better.

### Token budget matters

A web search agent once burned 200k tokens on one query by fetching too many pages. Not solved yet, but I'm adding pagination and "summarize before fetching more" logic.

### Voice samples work for creative/writing agents

The tech-writer agent matched this blog's style closely when I gave it real blog examples as part of the system prompt. A few concrete examples ("write like this") worked better than abstract instructions ("be concise, be technical").

## Why this matters

The shift from unstructured text to typed data changes how you use AI. When the output is a `BlogDraft`, I can:

1. Validate it immediately (is the slug valid? are the tags in the allowed set?)
2. Transform it (convert markdown to HTML, add frontmatter)
3. Store it in a database or file system
4. Pipe it to the next tool (render template, deploy to CMS)

It's not just "AI wrote some text" — it's "AI produced data I can actually use."

The CLI interface means I can use it from scripts, cron jobs, or other tools. The MCP notification means I can start a research task and forget about it until it pings me. The scoped file access means agents can actually read the codebase they're writing about.

It's still early — the token budget problem is real, and DeepSeek's tendency to fabricate requires careful prompting. But having structured output transforms the interaction. The model isn't just generating text; it's filling out a form. And forms are much easier to work with.

*Code available at [github.com/victoria-riley-barnett/dispatch-agents](https://github.com/victoria-riley-barnett/dispatch-agents) [VERIFY: repo exists]*