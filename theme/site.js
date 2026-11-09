// Header behaviour for vrbBlog: the contents menu, reading preferences, the
// theme switch, and incremental search. The generator writes the markup and
// the bootstrap in <head>; nothing here is needed to read a page, and the
// search form still posts to /search/ without it.

const root = document.documentElement;

const store = {
  set(key, value) {
    try { localStorage.setItem(key, value); } catch { /* private mode */ }
  },
  drop(key) {
    try { localStorage.removeItem(key); } catch { /* private mode */ }
  },
};

// A tool opens on hover for the pointer and on click or keyboard for the
// button; aria-expanded follows whichever is showing it.
function wireTool(button, { hover = false } = {}) {
  const tool = button.closest('.site-tool');
  if (!tool) return null;
  const set = (open) => {
    tool.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
  };
  if (hover) {
    tool.addEventListener('mouseenter', () => button.setAttribute('aria-expanded', 'true'));
    tool.addEventListener('mouseleave', () => {
      button.setAttribute('aria-expanded', String(tool.classList.contains('is-open')));
    });
  }
  button.addEventListener('click', () => set(!tool.classList.contains('is-open')));
  tool.addEventListener('focusout', (event) => {
    if (!tool.contains(event.relatedTarget)) set(false);
  });
  tool.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { set(false); button.blur(); }
  });
  document.addEventListener('click', (event) => {
    if (!tool.contains(event.target)) set(false);
  });
  return tool;
}

// ---- contents -------------------------------------------------------------

const outlineButton = document.querySelector('[aria-controls="outline-menu"]');
const outlineMenu = document.getElementById('outline-menu');

if (outlineButton && outlineMenu) {
  const headings = [...document.querySelectorAll('main h2[id], main h3[id]')];
  if (headings.length < 2) {
    outlineButton.closest('.site-tool').remove();
  } else {
    for (const heading of headings) {
      const copy = heading.cloneNode(true);
      copy.querySelector('.anchor')?.remove();
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = copy.textContent.trim();
      link.className = heading.tagName === 'H3' ? 'outline-3' : 'outline-2';
      outlineMenu.append(link);
    }
    wireTool(outlineButton, { hover: true });
  }
}

// ---- theme ----------------------------------------------------------------

const THEMES = ['auto', 'light', 'dark'];
const THEME_GLYPH = { auto: '◐', light: '☀', dark: '☾' };
const themeButton = document.querySelector('.theme-toggle');

if (themeButton) {
  const current = () => root.dataset.theme || 'auto';
  const paint = () => {
    const theme = current();
    themeButton.textContent = THEME_GLYPH[theme];
    const label = `Theme: ${theme}`;
    themeButton.setAttribute('aria-label', label);
    themeButton.title = `${label} — click to change`;
  };
  themeButton.addEventListener('click', () => {
    const next = THEMES[(THEMES.indexOf(current()) + 1) % THEMES.length];
    if (next === 'auto') {
      delete root.dataset.theme;
      store.drop('theme');
    } else {
      root.dataset.theme = next;
      store.set('theme', next);
    }
    paint();
  });
  paint();
}

// ---- reading preferences --------------------------------------------------

const readerButton = document.querySelector('[aria-controls="reader-menu"]');
const readerMenu = document.getElementById('reader-menu');
const READER = {
  font: ['sans', 'serif'],
  size: ['s', 'm', 'l'],
  width: ['narrow', 'normal', 'wide'],
};

if (readerButton && readerMenu) {
  wireTool(readerButton);

  const prefs = {};
  for (const key of Object.keys(READER)) {
    const set = root.dataset[key];
    prefs[key] = READER[key].includes(set) ? set : null;
  }

  const paint = () => {
    for (const [key, value] of Object.entries(prefs)) {
      if (value) root.dataset[key] = value;
    }
    for (const button of readerMenu.querySelectorAll('button[data-value]')) {
      const key = button.closest('[data-reader]')?.dataset.reader;
      if (key) button.setAttribute('aria-pressed', String(prefs[key] === button.dataset.value));
    }
  };

  readerMenu.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-value]');
    const key = button?.closest('[data-reader]')?.dataset.reader;
    if (!key) return;
    prefs[key] = button.dataset.value;
    paint();
    store.set('reader', JSON.stringify(prefs));
  });

  paint();
}

// ---- search ---------------------------------------------------------------

const searchForm = document.querySelector('.site-search');
const searchInput = searchForm?.querySelector('input[type="search"]');
const searchResults = searchForm?.querySelector('.search-results');

if (searchForm && searchInput && searchResults) {
  let pagefind = null;
  let latest = 0;

  const load = () => {
    pagefind ??= import('/pagefind/pagefind.js')
      .then((module) => module)
      .catch(() => null);
    return pagefind;
  };

  const close = () => {
    searchResults.classList.remove('open');
    searchResults.replaceChildren();
  };

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  const show = async () => {
    const query = searchInput.value.trim();
    const mine = ++latest;
    if (query.length < 2) return close();

    const index = await load();
    if (mine !== latest) return;
    if (!index) {
      searchResults.replaceChildren(
        el('p', 'search-empty', 'Search is indexed by a build: npm run build.'),
      );
      searchResults.classList.add('open');
      return;
    }

    const found = await index.search(query);
    const rows = await Promise.all(found.results.slice(0, 6).map((result) => result.data()));
    if (mine !== latest) return;

    if (rows.length === 0) {
      searchResults.replaceChildren(el('p', 'search-empty', 'No matches.'));
    } else {
      const list = document.createDocumentFragment();
      for (const row of rows) {
        const link = el('a', 'search-result');
        link.href = row.url;
        link.append(el('span', 'search-title', row.meta?.title || row.url));
        const excerpt = el('span', 'search-excerpt');
        excerpt.innerHTML = row.excerpt;
        link.append(excerpt);
        list.append(link);
      }
      searchResults.replaceChildren(list);
    }
    searchResults.classList.add('open');
  };

  let timer;
  searchInput.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(show, 140);
  });
  searchInput.addEventListener('focus', () => load());
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { close(); searchInput.blur(); }
  });
  searchForm.addEventListener('focusout', (event) => {
    if (!searchForm.contains(event.relatedTarget)) close();
  });
  document.addEventListener('click', (event) => {
    if (!searchForm.contains(event.target)) close();
  });
}

// ---- /search/ -------------------------------------------------------------

// Pagefind draws its own box, late, and does not read ?q=, so the form's
// arrival hands the query to it once the box exists.
const query = new URLSearchParams(location.search).get('q');
const searchPage = document.getElementById('search');

if (query) {
  const apply = () => {
    const input = document.querySelector('.pagefind-ui__search-input');
    if (!input) return false;
    if (input.value !== query) {
      input.value = query;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
    return true;
  };
  if (!apply()) {
    const observer = new MutationObserver(() => {
      if (apply()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 5000);
  }
}

// The dev server writes no Pagefind index, so its /search/ has no box at all.
if (searchPage && !searchPage.childElementCount && !window.PagefindUI) {
  searchPage.innerHTML =
    '<p class="search-empty">The search index is written by <code>npm run build</code>.</p>';
}
