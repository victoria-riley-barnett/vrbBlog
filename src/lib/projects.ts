import data from '../../content/projects.json';

export interface Project {
  slug: string;
  order: number;
  title: string;
  summary: string;
  repo?: string;
  site?: string;
  paragraphs?: string[];
  image?: { src: string; alt: string; fit?: 'cover' | 'contain' };
}

export const projects = data as Project[];

export function projectHref(project: Project) {
  return `/projects/${project.slug}/`;
}

export function isBrief(project: Project) {
  return !project.paragraphs?.length && !project.image;
}

export function projectRepo(project: Project) {
  return project.repo && `https://github.com/victoria-riley-barnett/${project.repo}`;
}

export function siteHost(url: string) {
  return new URL(url).hostname.replace(/^www\./, '');
}
