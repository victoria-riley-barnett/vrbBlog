// draft: true hides an entry from /projects until it's ready (or the repo is public).
export const projects = [
  {
    name: 'Tailscale for KOReader',
    href: 'https://github.com/victoria-riley-barnett/koreader-tailscale',
    image: '/assets/projects/koreader-tailscale.png',
    alt: 'Tailscale plugin menu in KOReader on an e-reader',
    blurb: 'A Lua plugin for KOReader that brings VPN support to Kindle and Kobo ARM e-ink devices. Paired with Syncthing and an iOS shortcut, it\'s my replacement for Calibre and Send to Kindle: my library stays backed up across my home server, laptop, and Paperwhite on any network. Seven releases, outside contributors, and 223 stars.',
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
    name: 'Auto Child Education',
    href: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3607293096',
    image: '/assets/projects/auto-child-education.jpg',
    alt: 'Auto Child Education GitHub README',
    blurb: 'A Europa Universalis V mod that assigns each child to the education that fits their strongest trait every month. I updated the original by victoriaposting for the 1.3.x game versions and maintain it; it\'s among the most-subscribed EU5 mods on the Steam Workshop, with about 25,000 subscribers.',
  },
  {
    name: 'Alzheimer\'s Screening Classifier',
    href: 'https://github.com/victoria-riley-barnett/r-alzheimers-rf',
    image: '/assets/projects/alzheimers-rf.jpg',
    alt: 'r-alzheimers-rf GitHub repository',
    blurb: 'A Random Forest classifier in R for early Alzheimer\'s screening from widely available clinical data. I led a three-person team to tune for recall instead of accuracy: shifting the voting cutoff cut missed diagnoses by 68% for a 0.65-point accuracy cost.',
  },
  {
    name: 'geomat',
    href: 'https://github.com/victoria-riley-barnett/geomat',
    image: '/assets/projects/geomat.jpg',
    alt: 'geomat map showing Cold War division, 1980',
    blurb: 'Interactive historical-geography explorer: a MapLibre map with a timeline from late feudalism to the Cold War, historical boundaries, and notes on how geography shaped each era\'s political economy.',
  },
  {
    name: 'Cairn (in development)',
    image: '/assets/projects/cairn.png',
    alt: 'Cairn showing an org-style outline note with a command line below',
    blurb: 'A desktop IDE and orchestration tool built around a small programming language, a graph-backed file system, and an experimental partial-evaluation engine. Org-mode documents and live program state are first-class, queryable data, and the dispatch, evaluation, and context-management tooling is meant for workflows that people and ML models share. Still in development; I\'ll link the repo at v1.',
  },
];
