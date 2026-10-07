// draft: true hides an entry from /projects until it's ready (or the repo is public).
export const projects = [
  {
    name: 'Tailscale for KOReader',
    href: 'https://github.com/victoria-riley-barnett/koreader-tailscale',
    image: '/assets/projects/koreader-tailscale.png',
    alt: 'Tailscale plugin menu in KOReader on an e-reader',
    blurb: 'A KOReader plugin that puts an ARM e-reader on your Tailscale network, so OPDS catalogs, progress sync, and file sync work from anywhere. Seven releases, outside contributors, and 223 stars.',
  },
  {
    name: 'CSC 411: Intermediate Machine Learning',
    href: 'https://github.com/victoria-riley-barnett/intermediate-ml',
    image: '/assets/projects/intermediate-ml.png',
    alt: 'Lecture slide on evaluation from CSC 411',
    blurb: 'The course I designed and teach at SF State for the PINC program: lectures and labs that keep the representation and optimization math intact for students coming from other disciplines.',
  },
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
