import type { ImageMetadata } from 'astro';
import wideLayout from '../assets/changelog/wide-layout.webp';
import coverDisplay from '../assets/changelog/cover-display.webp';
import taskDetail from '../assets/changelog/task-detail.webp';
import checklists from '../assets/changelog/checklists.webp';
import settings from '../assets/changelog/settings.webp';

export interface ChangelogShot {
  image: ImageMetadata;
  alt: string;
  caption: string;
}

export interface ChangelogSection {
  heading: string;
  body: string;
  shots: ChangelogShot[];
}

export interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  summary: string;
  preview: ImageMetadata;
  sections: ChangelogSection[];
}

export const changelog: ChangelogEntry[] = [
  {
    version: '7.3.0',
    date: '2026-11-06',
    title: 'LaunchBuddy unfolds',
    summary:
      'Unfold iPhone Duo, or open LaunchBuddy on iPad, and the Mac layout is waiting. Plus Break Down, a clearer task sheet, and checklists that finally know where they live.',
    preview: coverDisplay,
    sections: [
      {
        heading: 'Two panes, one less excuse',
        body: 'Unfold iPhone Duo, or open LaunchBuddy on iPad, and you get the Mac layout: your apps in a colored sidebar, the workspace right beside them. The cover display stays a proper phone, with the release version as the title.',
        shots: [
          {
            image: wideLayout,
            alt: 'LaunchBuddy on iPad with a colored sidebar of apps and sections beside a three-column release board',
            caption: 'iPad, and the inner display of iPhone Duo, share the Mac sidebar.',
          },
          {
            image: coverDisplay,
            alt: 'LaunchBuddy on the iPhone Duo cover display, with version 2.4 as the title and a vertical toolbar',
            caption: 'Folded, it stays a phone. The version is the title.',
          },
        ],
      },
      {
        heading: 'Break a big task into smaller ones',
        body: 'Open a task and tap Break Down. LaunchBuddy AI drops a handful of smaller tasks right underneath, so future-you can stop staring at the chunky one. The sheet is easier to scan, too: attachments sit with the details, and the agent actions are a button grid.',
        shots: [
          {
            image: taskDetail,
            alt: 'Task detail for Shared notebooks, with an Attach Image row, a Break Down button, and actions to open the task in Cursor, Codex, or Claude Code',
            caption: 'Break Down, attachments, and the agent buttons, in one sheet.',
          },
        ],
      },
      {
        heading: 'Checklists found a home',
        body: 'On iPhone, checklists moved into the library switcher, next to your apps and ideas. Same place you would go looking for them.',
        shots: [
          {
            image: checklists,
            alt: 'iPhone Checklists screen listing Accessibility, App Review Preparations, App Store Release, and other checklists',
            caption: 'The library switcher, now with Checklists.',
          },
        ],
      },
      {
        heading: 'Settings got a wardrobe',
        body: 'Settings and the sidebar now share a set of colored icons. On Mac, the Roadmap lives in Settings.',
        shots: [
          {
            image: settings,
            alt: 'LaunchBuddy Settings list with colored icons for General, LaunchBuddy Pro, App Store Connect, RevenueCat, AI Usage, Approvals, and Archived Apps',
            caption: 'The same colored icons as the sidebar.',
          },
        ],
      },
      {
        heading: 'Smaller touches',
        body: 'Creating a release, finishing a task, and shipping all feel a little more like they meant it. On Mac, dragging a card on the taskboard now lands where you drop it.',
        shots: [],
      },
    ],
  },
];

export const changelogPath = (entry: ChangelogEntry) => `/changelog/${entry.version}/`;

export const formatChangelogDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
