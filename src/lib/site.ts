export const APP_STORE_URL = 'https://apple.co/3iFcjjW';
export const APP_STORE_REVIEWS_URL =
  'https://apps.apple.com/us/app/launchbuddy/id1615169630?see-all=reviews';
export const PRIVACY_POLICY_URL = 'https://flowritesco.de/launchbuddy/privacy-policy.html';
export const TERMS_URL = 'https://flowritesco.de/launchbuddy/tos.html';
export const SUPPORT_URL = 'https://twitter.com/FloWritesCode';

export const PRO_MONTHLY_PRICE = '$2.99';
export const PRO_YEARLY_PRICE = '$19.99';
export const APP_STORE_RATING = '4.8';
export const APP_STORE_REVIEW_COUNT = 106;
export const USER_COUNT = '20,000+';
export const FREE_TIER_APPS = 2;
export const FREE_TIER_RELEASES = 2;

export const DEMO_VIDEO_MP4 = '/videos/launchbuddy-demo.mp4';
export const DEMO_VIDEO_WEBM = '/videos/launchbuddy-demo.webm';

export const PRIMARY_CTA_LABEL = 'Start shipping';
export const SECONDARY_CTA_LABEL = 'Download on the App Store';

export const DEFAULT_DESCRIPTION =
  'LaunchBuddy helps indie iOS developers plan releases, manage App Store submissions, reply to reviews, and use AI — on iPhone and Mac. Free for 2 apps.';

export const DEFAULT_KEYWORDS =
  'App Store Connect, iOS app release manager, App Store submission tracker, LaunchBuddy AI, ASO experiments, indie iOS developer, Xcode project manager, TestFlight release management';

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

export const HOMEPAGE_BLOG_POSTS = [
  {
    slug: 'app-store-connect-release-checklist',
    title: 'App Store submission checklist',
    description: 'The release checklist indie devs use before every App Store submission.',
  },
  {
    slug: 'app-store-connect-ai-agent',
    title: 'App Store Connect AI workflow',
    description: 'How to use AI with your ASC data without leaving your release workflow.',
  },
  {
    slug: 'testflight-release-management',
    title: 'TestFlight release management',
    description: 'Keep beta builds, feedback, and release tasks organized in one place.',
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "What's included in the free version?",
    answer: `Up to ${FREE_TIER_APPS} apps and ${FREE_TIER_RELEASES} releases, default submission checklists, taskboards, and iCloud sync. Enough to try LaunchBuddy on a side project.`,
  },
  {
    question: 'What does Pro unlock?',
    answer:
      'Unlimited apps and releases, custom checklists, unlimited project notes, ASO experiments, the App Store Connect dashboard (reviews, analytics, release notes), and LaunchBuddy AI (App Chat, Idea Chat, review-to-task). AI features are included with Pro and subject to usage limits.',
  },
  {
    question: 'Is LaunchBuddy free?',
    answer: `Yes — free for up to ${FREE_TIER_APPS} apps and ${FREE_TIER_RELEASES} releases, forever. Pro starts at ${PRO_MONTHLY_PRICE}/month or ${PRO_YEARLY_PRICE}/year.`,
  },
  {
    question: 'Do I need App Store Connect API access for Pro features?',
    answer:
      'ASC integration requires an API key (free from Apple). Tasks, AI chat, and checklists work without it — connect ASC when you want reviews, analytics, and release note uploads in-app.',
  },
  {
    question: 'Is the iOS app included if I subscribe on the Mac?',
    answer:
      'Yes. One subscription covers iPhone, iPad, and Mac, with feature availability depending on the platform.',
  },
  {
    question: 'Is my data private?',
    answer:
      'Your project data is stored in your private iCloud account. LaunchBuddy does not host your tasks, releases, or notes on its own servers.',
  },
  {
    question: 'Does my data sync between iOS and macOS?',
    answer: 'Yes. iCloud keeps your apps, releases, and tasks current across iPhone, iPad, and Mac.',
  },
  {
    question: 'Can I suggest features?',
    answer: 'Yes — use the in-app roadmap to vote on and suggest features.',
  },
] as const;
