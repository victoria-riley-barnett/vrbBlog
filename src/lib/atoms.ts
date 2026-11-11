// Atoms are HTML fragments emitted by CSC 411 course tooling (diagram design skill as forms)
const fragments = import.meta.glob('/src/atoms/*.html', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export interface Atom {
  name: string;
  html: string;
}

export const ATOMS_SLUG = 'atoms';

export const atoms: Atom[] = Object.entries(fragments)
  .map(([path, html]) => ({ name: path.replace(/^.*\//, '').replace(/\.html$/, ''), html }))
  .sort((a, b) => a.name.localeCompare(b.name));

export function findAtom(name: string) {
  return atoms.find((atom) => atom.name === name);
}
