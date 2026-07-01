# AI Coding Agent Instructions

## Project Overview
This is an Astro-based personal blog built with TypeScript, Svelte components, and MDX support. The project follows a content-first approach with blog posts stored as markdown files.

## Architecture & Key Patterns

### Content Management
- **Blog Posts**: Located in `src/data/blog-posts/` as `.md` files with frontmatter
- **Frontmatter Schema**: Each post requires:
  - `title: string`
  - `slug: string` 
  - `publishDate: string | Date`
  - `description: string`
  - `tags: string[]` (optional)
- **Content Collections**: Defined in `src/content.config.js` using Astro's content layer

### Component Structure
- **Layouts**: `src/layouts/BaseLayout.astro` provides the main page wrapper
- **Pages**: `src/pages/` contains Astro pages with `.astro` extension
- **Components**: `src/components/` contains reusable UI components
  - `.astro` files for static components
  - `.svelte` files for interactive components (like ThemeToggleButton)

### Styling System
- **CSS Variables**: Uses Catppuccin color scheme with light/dark mode support
- **Fonts**: Merriweather (serif) for body, Fira Sans (sans-serif) for headings
- **Responsive Design**: Mobile-first approach with media queries

## Development Workflows

### Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run astro    # Run Astro CLI commands
```

### Adding New Blog Posts
1. Create `.md` file in `src/data/blog-posts/`
2. Include required frontmatter fields
3. Posts automatically appear in blog listing sorted by publishDate

### Component Development
- **Static Components**: Use `.astro` files for performance
- **Interactive Components**: Use `.svelte` files with `client:load` directive
- **Props**: Define TypeScript interfaces for component props

## Key Files & Patterns

### Core Configuration
- `astro.config.mjs` - Astro configuration with MDX and Svelte integrations
- `src/content.config.js` - Content collection definitions
- `tsconfig.json` - TypeScript configuration for ESM modules

### Theme System
- Dark/light mode toggle via `ThemeToggleButton.svelte`
- CSS custom properties for theme colors
- Automatic theme persistence in localStorage

### Content Rendering
- Blog posts use `reading-time` package for read time estimates
- MDX content rendered with remark/rehype plugins
- External links open in new tabs via rehype-external-links

## Important Conventions

### File Organization
- Blog content: `src/data/blog-posts/`
- Static content: `src/content/` (resume, work_history)
- Public assets: `public/assets/` (fonts, images)

### Styling Approach
- Use CSS custom properties for colors
- Maintain consistent spacing with CSS variables
- Follow mobile-first responsive design

### Component Patterns
- Use Astro slots for content injection
- Implement proper TypeScript interfaces
- Follow Astro's island architecture for interactivity

## Integration Points
- **GitHub**: Links to external repositories in blog posts
- **Social Media**: Open Graph meta tags for sharing
- **Analytics**: Ready for integration (currently commented out)

## Common Tasks

### Adding New Pages
1. Create `.astro` file in `src/pages/`
2. Import and use `BaseLayout` component
3. Add navigation link in `src/components/Nav.astro`

### Creating New Components
1. Place in `src/components/`
2. Export TypeScript interface for props
3. Use CSS variables for styling
4. Add `client:load` directive for interactive components

### Modifying Styles
- Update CSS custom properties in `src/styles/global.css`
- Maintain Catppuccin color scheme consistency
- Test both light and dark mode variants