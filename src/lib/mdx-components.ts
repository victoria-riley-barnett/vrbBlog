import Atom from '../components/Atom.astro';
import PdfPreview from '../components/PdfPreview.astro';
import ThemePicker from '../components/ThemePicker.astro';

/**
 * Components available to every .mdx entry without an explicit import.
 * Pass this to `<Content components={...} />` wherever content is rendered.
 */
export const mdxComponents = { Atom, PdfPreview, ThemePicker };
