# vrbBlog
## Node
```bash
npm install
npm run dev       # http://localhost:4321
npm run build
npm run check
```

Posts are `content/posts/<slug>.mdx` with `title`, `slug`, `date`, `description` frontmatter; everything
there is published. Work in progress lives only in `drafts/` — gitignored, served at `/draft/<slug>`
in dev, never built. Projects are `content/projects.json`; a `content/reports/<slug>.md` with
`project: '<slug>'` replaces that project's paragraphs.

Theme icon: Font Awesome circle-half-stroke by Fonticons, Inc.
([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)).
