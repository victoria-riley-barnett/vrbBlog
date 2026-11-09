// Projects shown on the home page (featured) and on /projects/.
// Blurbs are short on purpose: a card says what it is, what it proves, and where to look.

export type Project = {
  title: string;
  href: string;
  image: string;
  alt: string;
  kind: string;
  summary: string;
  detail?: string[];
  stack: string[];
  stat?: string;
  links: { label: string; href: string }[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: 'Tailscale for KOReader',
    href: 'https://github.com/victoria-riley-barnett/koreader-tailscale',
    image: '/assets/projects/koreader-tailscale.png',
    alt: 'Tailscale plugin menu in KOReader on an e-reader',
    kind: 'Open source · embedded Linux',
    summary:
      'A Lua plugin for KOReader that brings VPN support to Kindle, Kobo, and PocketBook ARM e-ink devices.',
    detail: [
      'Paired with Syncthing and an iOS shortcut, it is my replacement for Calibre and Send to Kindle: my library is distributed, rolling, and always available on any network.',
      'It detects the device architecture at runtime, uses kernel networking where /dev/net/tun exists, and falls back to userspace networking with a local HTTP and SOCKS5 proxy where it does not.',
    ],
    stack: ['Lua', 'Shell', 'Tailscale', 'Syncthing'],
    stat: '7 releases · 223 stars · outside contributors',
    links: [{ label: 'Code', href: 'https://github.com/victoria-riley-barnett/koreader-tailscale' }],
    featured: true,
  },
  {
    title: 'CSC 411: Intermediate Machine Learning',
    href: 'https://github.com/victoria-riley-barnett/intermediate-ml',
    image: '/assets/projects/intermediate-ml.png',
    alt: 'Lecture slide on evaluation from CSC 411',
    kind: 'Course design · SF State',
    summary:
      'The course I designed and teach at SF State for the PINC program. Students implement gradient descent, backpropagation, and attention from scratch, then build a transformer encoder in PyTorch and Lightning.',
    detail: [
      'The course follows a simple order: theoretical foundations adequate for a domain application, then practical experience in that application.',
      'We work with representations students already meet in their own majors, and with the historical reason each technique exists. That builds a general and current understanding of the field without assuming everyone wants to be an ML engineer.',
    ],
    stack: ['Python', 'PyTorch', 'Lightning', 'Jupyter'],
    stat: 'First offering · 30 students',
    links: [
      { label: 'Materials', href: 'https://github.com/victoria-riley-barnett/intermediate-ml' },
    ],
    featured: true,
  },
  {
    title: "Recall-first Alzheimer's screening",
    href: '/blog/alzheimers-screening-recall-optimization/',
    image: '/assets/projects/alzheimers-rf.jpg',
    alt: "Random forest results for the Alzheimer's screening classifier",
    kind: 'Applied ML · team project, CSC 859',
    summary:
      'A random forest screening classifier where the cost of a missed diagnosis set the decision threshold, not the overall score.',
    detail: [
      'Moving the cutoff toward detection cut missed diagnoses from 51 to 16, 68% fewer, for 0.56 points of accuracy.',
    ],
    stack: ['R', 'randomForest'],
    stat: '51 → 16 missed diagnoses',
    links: [
      { label: 'Write-up', href: '/blog/alzheimers-screening-recall-optimization/' },
      { label: 'Code', href: 'https://github.com/victoria-riley-barnett/r-alzheimers-rf' },
    ],
    featured: true,
  },
  {
    title: 'SerialPM',
    href: 'https://github.com/victoria-riley-barnett/serialpm',
    image: '/assets/projects/serialpm.jpg',
    alt: 'SerialPM project timeline view',
    kind: 'Team capstone · full stack',
    summary:
      'A project-management app with organisations, tasks, team management, and real-time chat, built around one continuous visual timeline. I led the team through the full software lifecycle.',
    detail: [
      'The backend ran on real AWS resources, which were retired after the course. The front end (React, Vite, Tailwind) still runs as a showcase, and the backend API can be read in the repo.',
    ],
    stack: ['React', 'Vite', 'Tailwind', 'AWS'],
    links: [
      { label: 'Code', href: 'https://github.com/victoria-riley-barnett/serialpm' },
      { label: 'Write-up', href: '/blog/serial-project-management/' },
    ],
    featured: true,
  },
  {
    title: 'geomat',
    href: 'https://github.com/victoria-riley-barnett/geomat',
    image: '/assets/projects/geomat.jpg',
    alt: 'geomat map showing Cold War division, 1980',
    kind: 'Data visualization',
    summary:
      'A MapLibre map with a timeline from late feudalism to the Cold War, historical boundaries, and notes on how geography shaped each era.',
    stack: ['TypeScript', 'MapLibre GL'],
    links: [{ label: 'Code', href: 'https://github.com/victoria-riley-barnett/geomat' }],
  },
  {
    title: 'Auto Child Education',
    href: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3607293096',
    image: '/assets/projects/auto-child-education.jpg',
    alt: 'Auto Child Education README',
    kind: 'Game mod',
    summary:
      'A Europa Universalis V mod that assigns each child the education that fits their strongest trait match. I implemented the model and tweaked it based on in-game performance.',
    stack: ['Paradox script'],
    stat: '~25,000 Steam Workshop subscribers',
    links: [
      { label: 'Steam Workshop', href: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3607293096' },
    ],
  },
  {
    title: 'Cairn (in development)',
    href: '/projects/#cairn-in-development',
    image: '/assets/projects/cairn.png',
    alt: 'Cairn showing an org-style outline note with a command line below',
    kind: 'Language and IDE research',
    summary:
      'A desktop IDE built around a small programming language, a graph-backed file system, and an experimental partial-evaluation engine. Org-mode documents and live program state are first-class, queryable data.',
    detail: [
      'Inspired by Kernel, Kraken, and Arc. So far: a CEK machine in WebAssembly and a small interpreter in Rust.',
    ],
    stack: ['Rust', 'WebAssembly', 'Lisp'],
    links: [],
  },
];
