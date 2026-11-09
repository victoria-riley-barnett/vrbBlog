# Theme hooks

`theme/style.css` is yours. This lists the markup and class names the pages emit, so the
theme can style them. Nothing here is styled by the build.

**Layout** (`src/layouts/BaseLayout.astro`): `.site-header`, `.brand`, `.site-nav` (Projects, Teaching, Writing, About), `.site-tools`, `main.wrap`, `.site-footer`.

**Home** (`src/pages/index.astro`): `.intro` (`h1`, `.lede`, `.links`), `.featured` > `.section-head` + `.project-grid`, `.latest` > `.section-head` + `.post-list`.

**Projects** (`src/components/ProjectCard.astro`, data in `src/data/projects.ts`):
`.project-card` (`--full` on /projects/), `.project-thumb`, `.project-body`, `.project-kind`, `h3`, `.project-summary`, `.project-detail`, `.project-stat`, `.project-stack > li`, `.project-links`.
`.project-list` wraps the cards on /projects/.

**Teaching** (`src/pages/teaching.astro`): `.teaching`, `.chapter-list > .chapter` (`.chapter-no`, `.chapter-title`, `.chapter-summary`).

**Posts**: `.post`, `.post-meta`, `.post-series`, `.prose`, `.tags`. Headings carry `a.anchor` (appended `#`). Math renders with KaTeX; add `katex.min.css` to the theme or the layout `<head>` (see below).

**Math.** Posts can use `$inline$` and `$$display$$`. KaTeX's stylesheet is not loaded yet: add
`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">` to `BaseLayout.astro` when a post needs it.

**Code.** Shiki runs with two themes (`github-light`, `github-dark`), so each token carries `--shiki-light` and `--shiki-dark` variables. The theme chooses between them, e.g.
`.astro-code span { color: var(--shiki-light); }` and the same with `--shiki-dark` under your dark selector.
