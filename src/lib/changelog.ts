import type { ImageMetadata } from 'astro';
import wideLayout from '../assets/changelog/wide-layout.webp';
import coverDisplay from '../assets/changelog/cover-display.webp';
import taskDetail from '../assets/changelog/task-detail.webp';
import checklists from '../assets/changelog/checklists.webp';
import settings from '../assets/changelog/settings.webp';
import funnelIphone from '../assets/changelog/funnel-iphone.webp';
import funnelIpad from '../assets/changelog/funnel-ipad.webp';
import analyticsAppStore from '../assets/changelog/analytics-app-store.webp';
import analyticsMonetization from '../assets/changelog/analytics-monetization.webp';
import sidebar from '../assets/changelog/sidebar.webp';
import taskImport from '../assets/changelog/task-import.webp';

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
    version: '7.4.0',
    date: '2026-11-18',
    title: 'LaunchBuddy finds the leak',
    summary:
      'Analytics now opens on a conversion funnel that shows where people drop off between seeing your app and paying for it. Plus App Store KPIs, subscription health, a tidier sidebar, and task import from Jira, Linear, and GitHub.',
    preview: funnelIphone,
    sections: [
      {
        heading: 'Follow the funnel',
        body: 'Analytics now opens on a Funnel tab: impressions, page views, downloads, first opens, trials, and subscriptions, stacked in one place. Every step is held up against published benchmarks, and the step that dropped the most gets the spotlight. Tap any rate to see how it changed over time. Finally, a good reason to stare at numbers.',
        shots: [
          {
            image: funnelIpad,
            alt: 'LaunchBuddy Analytics on iPad showing the conversion funnel beside cards for typical-app benchmarks, the biggest drop, and changes since version 2.3',
            caption: 'Benchmarks, the biggest drop, and what changed since your last release.',
          },
          {
            image: funnelIphone,
            alt: 'LaunchBuddy Analytics on iPhone with the Funnel tab open, showing a conversion funnel from 353K impressions down to 710 subscriptions, with the trial-to-subscription step flagged in red',
            caption: 'Six steps, from impression to subscription.',
          },
        ],
      },
      {
        heading: 'Analytics got a glow-up',
        body: 'The App Store tab leads with a KPI grid that switches the main chart, and release and experiment markers now show up on every chart. A new section shows where your downloads actually come from: App Store search, browse, referrers, and your top countries. Over on Monetization, Subscription Health from RevenueCat tracks trial to paid, churn, and refund rate. You can also share the funnel as an image or export the daily numbers as CSV.',
        shots: [
          {
            image: analyticsAppStore,
            alt: 'App Store tab on iPad with KPI cards for impressions, page views, conversion, and downloads, a downloads chart with release and experiment markers, and download sources and top countries',
            caption: 'KPIs, release markers, and where downloads come from.',
          },
          {
            image: analyticsMonetization,
            alt: 'Monetization tab on iPad with MRR, active subscriptions, revenue, and a Subscription Health row for trial to paid, churn, and refund rate',
            caption: 'Subscription Health, straight from RevenueCat.',
          },
        ],
      },
      {
        heading: 'A tidier sidebar',
        body: 'On Mac, iPad, and unfolded iPhone Duo, the sidebar is sorted into Workspace, Build, Audience, and Library. The app you are working on gets the regular selection highlight, and its header doubles as a switcher, so jumping to another app takes one click and zero hunting.',
        shots: [
          {
            image: sidebar,
            alt: 'LaunchBuddy on iPad with the sidebar grouped into Workspace, Build, Audience, and Library sections next to the 2.4 release board',
            caption: 'Sections for everything, and the app switcher up top.',
          },
        ],
      },
      {
        heading: 'Moving in? Bring your tasks',
        body: 'Import Tasks lives in Settings now. Pick an app, export your issues from Jira, Linear, or GitHub, and drop in the file. You review where every issue goes, releases or backlog, before anything is imported.',
        shots: [
          {
            image: taskImport,
            alt: 'Import Tasks screen on iPhone with Jira, Linear, and GitHub source cards and setup steps for choosing an app, exporting from Jira, and adding the export file',
            caption: 'Jira, Linear, or GitHub, in three steps.',
          },
        ],
      },
      {
        heading: 'Bugfixes',
        body: 'Fixed a crash on launch that hit some Macs while iCloud sync was starting up, and a widget crash during the same setup. Plus a handful of smaller bugs nobody will miss.',
        shots: [],
      },
    ],
  },
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
