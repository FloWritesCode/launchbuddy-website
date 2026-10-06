export const SITE_URL = 'https://launchbuddy.app';
export const SITE_NAME = 'LaunchBuddy';
export const AUTHOR_NAME = 'Florian Schweizer';
export const AUTHOR_URL = 'https://twitter.com/FloWritesCode';
export const X_URL = 'https://twitter.com/LaunchBuddy_App';

export const APP_STORE_ID = '1615169630';
export const APP_STORE_NAME = 'LaunchBuddy: App Planner';
export const APP_STORE_URL = 'https://apple.co/3iFcjjW';
export const APP_STORE_LISTING_URL =
  'https://apps.apple.com/us/app/launchbuddy-app-planner/id1615169630';
export const APP_STORE_REVIEWS_URL =
  'https://apps.apple.com/us/app/launchbuddy/id1615169630?see-all=reviews';
export const PRIVACY_POLICY_URL = 'https://flowritesco.de/launchbuddy/privacy-policy.html';
export const TERMS_URL = 'https://flowritesco.de/launchbuddy/tos.html';
export const SUPPORT_URL = 'https://twitter.com/FloWritesCode';

export const PRO_MONTHLY_PRICE = '$2.99';
export const PRO_YEARLY_PRICE = '$19.99';
export const APP_STORE_RATING = '4.8';
export const APP_STORE_REVIEW_COUNT = 107;
export const USER_COUNT = '20,000+';
export const FREE_TIER_APPS = 2;
export const FREE_TIER_RELEASES = 2;

export const VSL_YOUTUBE_ID = '7CpJthlRuaI';
export const VSL_TITLE = 'LaunchBuddy: The Shipping Command Center for Indie Developers';
export const VSL_DESCRIPTION =
  'LaunchBuddy is the release command center for indie devs. Plan releases, run App Store submission checklists, reply to reviews, and talk to AI that knows your apps, on iPhone, iPad and Mac.';
export const VSL_DURATION_ISO = 'PT1M28S';
export const VSL_DURATION_LABEL = '1:28';
export const VSL_UPLOAD_DATE = '2026-10-01T04:53:14-07:00';

export const PRIMARY_CTA_LABEL = 'Start shipping';
export const SECONDARY_CTA_LABEL = 'Download on the App Store';

export const DEFAULT_TITLE = 'LaunchBuddy — iOS App Release Manager for Indie Developers';
export const DEFAULT_DESCRIPTION =
  'Plan iOS releases, run App Store submission checklists, and reply to App Store reviews on iPhone, iPad, and Mac. Free for 2 apps, Pro from $2.99/mo.';
export const DEFAULT_OG_IMAGE = {
  src: '/images/preview.png',
  width: 1200,
  height: 630,
  alt: 'Two iPhones running LaunchBuddy, one showing a release timeline and one showing a list of apps',
};
export const HERO_KICKER = 'iOS app release manager for indie developers';

export const DEFAULT_KEYWORDS =
  'App Store Connect, iOS app release manager, App Store submission tracker, LaunchBuddy AI, ASO experiments, indie iOS developer, Xcode project manager, TestFlight release management';

export const CHECKLIST_PATH = '/checklist/';

export const CHECKLIST_FAQ = [
  {
    question: 'Is the App Launch Checklist actually free?',
    answer:
      'Yes. Enter your email, confirm the subscription, and the PDF is sent to your inbox. No credit card and no LaunchBuddy account required.',
  },
  {
    question: 'What do I get when I subscribe?',
    answer:
      'A five-page first-submission field guide: 25 actions across first run, purchases, accounts and personal data, listing accuracy, and a final rehearsal. Every check includes what to do and a PASS WHEN so you know it is done. You will also hear from LaunchBuddy occasionally with shipping tips. Unsubscribe anytime.',
  },
  {
    question: 'Why do I have to confirm my email?',
    answer:
      'Kit (the email provider) uses double opt-in so nobody can subscribe you without permission. After you confirm, the checklist PDF is delivered automatically.',
  },
  {
    question: 'Is this for a first launch or an update?',
    answer:
      'It is written for your first App Store submission — a fresh install, the first purchases of a type, reviewer access, and the listing that ships with the app. If you are shipping an update, the same checks still catch leftovers, but the field guide assumes a first review.',
  },
  {
    question: 'How is this different from LaunchBuddy?',
    answer:
      'The PDF is a printable first-submission field guide you can keep next to App Store Connect. LaunchBuddy is the app that turns checks like these into reusable submission checklists on iPhone and Mac, tied to each release. Grab the PDF either way — you do not need the app to use it.',
  },
] as const;

export type FeatureTierValue = boolean | string;

export type FeatureComparisonRow = {
  name: string;
  hint?: string;
  free: FeatureTierValue;
  pro: FeatureTierValue;
};

export type FeatureComparisonCategory = {
  title: string;
  features: FeatureComparisonRow[];
};

export const FEATURE_COMPARISON: FeatureComparisonCategory[] = [
  {
    title: 'Core workflow',
    features: [
      {
        name: 'Release planning & taskboards',
        hint: 'Organize tasks by version and track what ships next.',
        free: true,
        pro: true,
      },
      {
        name: 'App Store submission checklists',
        hint: 'Reusable checklists that auto-add tasks to every release.',
        free: 'Default',
        pro: 'Custom',
      },
      {
        name: 'iCloud sync',
        hint: 'Projects stay current across iPhone, iPad, and Mac.',
        free: true,
        pro: true,
      },
      {
        name: 'iPhone, iPad & Mac',
        free: true,
        pro: true,
      },
    ],
  },
  {
    title: 'Portfolio',
    features: [
      {
        name: 'Apps',
        free: String(FREE_TIER_APPS),
        pro: 'Unlimited',
      },
      {
        name: 'Releases',
        free: String(FREE_TIER_RELEASES),
        pro: 'Unlimited',
      },
      {
        name: 'Project notes',
        free: 'Limited',
        pro: 'Unlimited',
      },
    ],
  },
  {
    title: 'App Store Connect',
    features: [
      {
        name: 'Reviews inbox',
        hint: 'Read and reply to App Store reviews without opening a browser.',
        free: false,
        pro: true,
      },
      {
        name: 'Analytics dashboard',
        hint: 'Downloads, revenue, and subscription metrics from ASC.',
        free: false,
        pro: true,
      },
      {
        name: 'Release notes upload',
        hint: 'Push release notes to App Store Connect from LaunchBuddy.',
        free: false,
        pro: true,
      },
      {
        name: 'Review-to-task',
        hint: 'Turn 1-star feedback into backlog tasks in one tap.',
        free: false,
        pro: true,
      },
    ],
  },
  {
    title: 'LaunchBuddy AI',
    features: [
      {
        name: 'App Chat',
        hint: 'Chat with AI that knows your tasks, releases, and review data.',
        free: false,
        pro: true,
      },
      {
        name: 'Idea Chat',
        hint: 'Brainstorm features and turn ideas into backlog items.',
        free: false,
        pro: true,
      },
      {
        name: 'AI review replies',
        hint: 'Draft App Store review responses from your app context.',
        free: false,
        pro: true,
      },
    ],
  },
  {
    title: 'Power tools',
    features: [
      {
        name: 'ASO experiments',
        hint: 'Track icon, screenshot, and copy A/B tests with metrics.',
        free: false,
        pro: true,
      },
      {
        name: 'Widgets & Home Screen reads',
        hint: 'View apps, release tasks, and release status at a glance.',
        free: true,
        pro: true,
      },
      {
        name: 'Widget task completion',
        hint: 'Complete a task from a widget.',
        free: false,
        pro: true,
      },
      {
        name: 'Shortcuts & MCP reads',
        hint: 'Inspect LaunchBuddy data from Shortcuts, Siri, and MCP-compatible agents.',
        free: true,
        pro: true,
      },
      {
        name: 'Shortcuts & MCP writes',
        hint: 'Propose LaunchBuddy changes through the automation approval flow.',
        free: false,
        pro: true,
      },
    ],
  },
];

export const PRO_PILLARS = [
  {
    title: 'App Store Connect inbox',
    description:
      'See reviews, draft replies, turn 1-star feedback into backlog tasks — without opening ASC in a browser.',
  },
  {
    title: 'LaunchBuddy AI',
    description:
      'Chat with your app data. Draft release notes, brainstorm features, and get AI review replies — included with Pro.',
  },
  {
    title: 'ASO experiments',
    description:
      'Track icon, screenshot, and copy tests with baseline vs. experiment metrics for every app you ship.',
  },
  {
    title: 'Unlimited portfolio',
    description:
      'Manage every app and release you ship — not just two apps and two releases on the free tier.',
  },
  {
    title: 'Automation writes',
    description:
      'Propose LaunchBuddy changes from Shortcuts and MCP, then approve or reject them before they apply.',
  },
] as const;

/** Verbatim 5-star App Store reviews; only light trimming. */
export const TESTIMONIALS = [
  {
    author: 'Maarten B.',
    region: 'US',
    quote:
      'This is a great app. I use it for my iOS/Mac development to keep track of version & release documentation, bug fixes and enhancements. The developer appears more than willing to listen to customers and make changes as needed.',
  },
  {
    author: 'Twiggyweasel',
    region: 'US',
    quote:
      'LaunchBuddy is a great tool to help you organize your projects, keep on top of goals, and actually work towards shipping something on the App Store. Hard recommend.',
  },
  {
    author: 'Mark from Mars',
    region: 'US',
    quote:
      'I love having this app to keep track of how my release work in progress is going and my new app ideas. Such a great idea and a great tool!',
  },
  {
    author: 'OBS5561',
    region: 'US',
    quote:
      "This tool makes it super easy to track and plan what you're developing, and syncs between phone and Mac.",
  },
  {
    author: 'B24R200',
    region: 'CA',
    quote:
      'This app is a must have for any developer even if you are just beginning to learn to code or if you are a seasoned pro.',
  },
  {
    author: '.holger',
    region: 'DE',
    quote:
      "This app helps me as an indie developer to keep track of the apps I'm working on and capture ideas I want to implement in my apps. A great little tool to organize my work.",
  },
  {
    author: 'HeyFutureJesse',
    region: 'AU',
    quote:
      'Great app for storing app ideas, picking one to work on and implementing! Simple to understand and a joy to use.',
  },
  {
    author: 'Berkant72',
    region: 'DE',
    quote:
      "This is a great app to organize my apps. I can add release notes, URL's from App Store, website and a social Link from the app.",
  },
  {
    author: 'Alcarbuccia',
    region: 'US',
    quote: 'As a new dev. This tool is amazing!',
  },
] as const;

export type FaqItem = {
  question: string;
  answer: string;
  link: { href: string; label: string };
};

/** Rendered on the homepage and as its FAQPage JSON-LD, so both always match. */
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Is LaunchBuddy free?',
    answer: `Yes. The free plan covers ${FREE_TIER_APPS} apps and ${FREE_TIER_RELEASES} releases with taskboards, the default App Store submission checklists, and iCloud sync, and it has no time limit. Pro costs ${PRO_MONTHLY_PRICE} a month or ${PRO_YEARLY_PRICE} a year and adds unlimited apps, custom checklists, App Store Connect reviews and analytics, ASO experiments, and LaunchBuddy AI.`,
    link: { href: '/blog/launchbuddy-free-vs-pro/', label: 'Compare Free and Pro' },
  },
  {
    question: 'What should be on an App Store submission checklist?',
    answer:
      'At minimum: the release build tested on a real device, a bumped version and build number, screenshots for every required device size, current privacy labels, What’s New text, and review notes or a demo account if the app needs a login. LaunchBuddy attaches a reusable checklist to each release, so these steps don’t depend on memory.',
    link: {
      href: '/blog/app-store-connect-release-checklist/',
      label: 'The full App Store Connect release checklist',
    },
  },
  {
    question: 'How do I keep track of releases across several apps?',
    answer:
      'Give each app its own list of versions and attach every task, checklist, and release note to the version it ships in. LaunchBuddy keeps every app in one dashboard, and its Home Screen widgets and Mac menu bar show each release’s progress, due date, and open tasks.',
    link: { href: '/blog/ios-app-release-management/', label: 'An iOS release management workflow' },
  },
  {
    question: 'How does LaunchBuddy work with App Store Connect?',
    answer:
      'It sits next to it. App Store Connect is still where your builds, metadata, and submissions live, and LaunchBuddy organizes the work around them: release tasks, checklists, reviews, analytics, and release notes you can push to App Store Connect when they’re approved.',
    link: { href: '/blog/launchbuddy-vs-app-store-connect/', label: 'LaunchBuddy vs App Store Connect' },
  },
  {
    question: 'Which LaunchBuddy features need an App Store Connect API key?',
    answer:
      'Only for the App Store Connect features (the reviews inbox, analytics, and release note uploads), which also require Pro. Tasks, checklists, and AI chat work without one. You create the key in App Store Connect under Users and Access, then Integrations; team keys need the Admin role.',
    link: { href: '/blog/app-store-connect-api-key/', label: 'How to create an App Store Connect API key' },
  },
  {
    question: 'Can I reply to App Store reviews without opening App Store Connect?',
    answer:
      'Yes, with Pro and an API key. LaunchBuddy collects your reviews in an inbox on iPhone, iPad, and Mac, drafts replies with AI that you edit and approve before sending, and can turn a review into a backlog task.',
    link: { href: '/blog/app-store-review-management/', label: 'A review management workflow' },
  },
  {
    question: 'Does LaunchBuddy work with Cursor, Claude Code, or Codex?',
    answer:
      'Yes, on Mac. LaunchBuddy runs a localhost-only MCP server that Cursor, Claude Code, Codex, and other MCP clients can connect to. Read tools are free; write tools need Pro and create proposals that change nothing until you approve them.',
    link: { href: '/blog/launchbuddy-mcp-server/', label: 'Set up the LaunchBuddy MCP server' },
  },
  {
    question: 'Does LaunchBuddy run on iPhone, iPad, and Mac?',
    answer:
      'Yes. It’s a single App Store listing for all three, and one Pro subscription covers every device. iCloud keeps your apps, releases, and tasks in sync, while the MCP server and menu bar features are Mac-only.',
    link: { href: '/blog/manage-app-store-connect-from-iphone/', label: 'Running releases from your iPhone' },
  },
  {
    question: 'Where does LaunchBuddy store my data?',
    answer:
      'In your private iCloud account. LaunchBuddy doesn’t host your tasks, releases, or notes on its own servers, and with Pro you choose which notes and project details the AI may use.',
    link: {
      href: '/blog/icloud-project-management-for-indie-developers/',
      label: 'How iCloud project sync works',
    },
  },
];
