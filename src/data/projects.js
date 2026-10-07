// draft: true hides an entry from /projects until it's ready (or the repo is public).
export const projects = [
  {
    name: 'SerialPM',
    href: 'https://github.com/victoria-riley-barnett/serialpm',
    image: '/assets/projects/serialpm.png',
    alt: 'SerialPM project timeline view',
    blurb: 'Front end of a project-management app with organisations, tasks, team management, and real-time chat. Built as a team capstone at SF State, which I led. The backend was removed for publication, so this is a front-end showcase (React, Vite, Tailwind).',
  },
  {
    name: 'geomat',
    href: 'https://github.com/victoria-riley-barnett/geomat',
    image: '/assets/projects/geomat.jpg',
    alt: 'geomat map showing Cold War division, 1980',
    blurb: 'Interactive historical-geography explorer: a MapLibre map with a timeline from late feudalism to the Cold War, historical boundaries, and notes on how geography shaped each era\'s political economy.',
  },
  {
    name: 'Cairn',
    image: '/assets/projects/cairn.png',
    alt: 'Cairn interface',
    blurb: 'TODO: one-line description.',
    draft: true, // repo is private
  },
];
