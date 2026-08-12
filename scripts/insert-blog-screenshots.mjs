import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const blogDir = path.join(root, 'src/content/blog');

/** @type {Record<string, Array<{ afterHeading: string; markdown: string }>>} */
const insertions = {
  'app-store-connect-analytics.md': [
    {
      afterHeading: '## What does App Store Connect analytics show?',
      markdown:
        '![App Store Connect Analytics overview with acquisition, sales, and subscription cards](/screenshots/app-store-connect/analytics-overview.jpg)',
    },
    {
      afterHeading: '## How LaunchBuddy helps with App Store Connect analytics',
      markdown:
        '![LaunchBuddy App Store Analytics dashboard with impressions, page views, conversion, and installs](/screenshots/launchbuddy/analytics.jpg)',
    },
  ],
  'app-store-review-management.md': [
    {
      afterHeading: '## How to manage App Store reviews: a seven-step workflow',
      markdown:
        '![App Store Connect Ratings and Reviews page with rating summary and recent reviews](/screenshots/app-store-connect/ratings-and-reviews.jpg)',
    },
    {
      afterHeading: '## Optional: connect the queues with LaunchBuddy',
      markdown:
        '![LaunchBuddy Customer Reviews inbox with ratings, locales, and replied status](/screenshots/launchbuddy/customer-reviews.jpg)',
    },
  ],
  'app-store-review-reply-generator.md': [
    {
      afterHeading: '## How LaunchBuddy helps with App Store review replies',
      markdown:
        '![LaunchBuddy Customer Reviews inbox with ratings, locales, and replied status](/screenshots/launchbuddy/customer-reviews.jpg)',
    },
  ],
  'app-store-product-page-optimization.md': [
    {
      afterHeading: "## Know what Apple's test can and can't do",
      markdown:
        '![App Store Connect Product Page Optimization list of past treatments](/screenshots/app-store-connect/product-page-optimization.jpg)',
    },
  ],
  'aso-experiment-tracker.md': [
    {
      afterHeading: '## Step 1: label the evidence design',
      markdown:
        '![App Store Connect Product Page Optimization list of past treatments](/screenshots/app-store-connect/product-page-optimization.jpg)',
    },
  ],
  'custom-product-pages-vs-product-page-optimization.md': [
    {
      afterHeading: '## What is Product Page Optimization?',
      markdown:
        '![App Store Connect Product Page Optimization list of past treatments](/screenshots/app-store-connect/product-page-optimization.jpg)',
    },
  ],
  'testflight-release-management.md': [
    {
      afterHeading: '## Why TestFlight needs release management',
      markdown:
        '![App Store Connect TestFlight iOS builds list with a build ready to submit](/screenshots/app-store-connect/testflight.jpg)',
    },
  ],
  'testflight-feedback-management.md': [
    {
      afterHeading: '## Why TestFlight feedback needs a workflow',
      markdown:
        '![App Store Connect TestFlight iOS builds list with a build ready to submit](/screenshots/app-store-connect/testflight.jpg)',
    },
  ],
  'ios-app-release-management.md': [
    {
      afterHeading: '## How LaunchBuddy helps manage iOS releases',
      markdown:
        '![LaunchBuddy Releases board with backlog tasks, version metadata, and changelog draft](/screenshots/launchbuddy/releases.jpg)',
    },
  ],
  'app-store-connect-release-checklist.md': [
    {
      afterHeading: '## 5. Check screenshots against the current build',
      markdown:
        '![App Store Connect version page showing App Previews and Screenshots plus promotional text](/screenshots/app-store-connect/release-information.jpg)',
    },
  ],
  'app-store-submission-tracker.md': [
    {
      afterHeading: '## Track App Store Connect status beside the work',
      markdown:
        '![App Store Connect App Review submissions history with completed and unresolved statuses](/screenshots/app-store-connect/app-review-history.jpg)',
    },
  ],
  'app-review-notes.md': [
    {
      afterHeading: '## What App Review notes are for',
      markdown:
        '![App Store Connect App Review submissions history with completed and unresolved statuses](/screenshots/app-store-connect/app-review-history.jpg)',
    },
  ],
  'launchbuddy-vs-app-store-connect.md': [
    {
      afterHeading: '## What LaunchBuddy improves around App Store Connect',
      markdown:
        '![LaunchBuddy overview showing app status, App Store URL, bundle ID, and ASC app ID](/screenshots/launchbuddy/overview.jpg)',
    },
    {
      afterHeading: '## How LaunchBuddy and App Store Connect fit together',
      markdown:
        '![App Store Connect version page showing App Previews and Screenshots plus promotional text](/screenshots/app-store-connect/release-information.jpg)',
    },
  ],
  'launchbuddy-free-vs-pro.md': [
    {
      afterHeading: '## What Pro adds—and what each feature requires',
      markdown:
        '![LaunchBuddy App Store Analytics dashboard with impressions, page views, conversion, and installs](/screenshots/launchbuddy/analytics.jpg)',
    },
    {
      afterHeading: '## Three workflows that make the plan choice concrete',
      markdown:
        '![App Store Connect Subscriptions page showing the LaunchBuddy Pro subscription group](/screenshots/app-store-connect/subscriptions.jpg)',
    },
  ],
  'ai-app-store-connect-workflow.md': [
    {
      afterHeading: '## Why LaunchBuddy fits AI App Store Connect workflows',
      markdown:
        '![LaunchBuddy AI home with approval-gated playbooks for releases, reviews, and analytics](/screenshots/launchbuddy/ai.jpg)',
    },
  ],
  'app-store-connect-ai-agent.md': [
    {
      afterHeading: '## What this looks like in LaunchBuddy',
      markdown:
        '![LaunchBuddy AI home with approval-gated playbooks for releases, reviews, and analytics](/screenshots/launchbuddy/ai.jpg)',
    },
  ],
  'human-in-the-loop-ai-approval-workflow.md': [
    {
      afterHeading: '## How LaunchBuddy uses approval-gated actions',
      markdown:
        '![LaunchBuddy AI home with approval-gated playbooks for releases, reviews, and analytics](/screenshots/launchbuddy/ai.jpg)',
    },
  ],
  'launchbuddy-mcp-server.md': [
    {
      afterHeading: '## The read and write paths are deliberately different',
      markdown:
        '![LaunchBuddy AI home with approval-gated playbooks for releases, reviews, and analytics](/screenshots/launchbuddy/ai.jpg)',
    },
  ],
  'app-store-connect-mcp-workflow.md': [
    {
      afterHeading: '## What this looks like in LaunchBuddy',
      markdown:
        '![LaunchBuddy AI home with approval-gated playbooks for releases, reviews, and analytics](/screenshots/launchbuddy/ai.jpg)',
    },
  ],
  'manage-app-store-connect-from-iphone.md': [
    {
      afterHeading: '## What you can manage from an iPhone',
      markdown:
        '![LaunchBuddy overview showing app status, App Store URL, bundle ID, and ASC app ID](/screenshots/launchbuddy/overview.jpg)',
    },
  ],
  'app-store-metadata-management.md': [
    {
      afterHeading: '## What counts as App Store metadata?',
      markdown:
        '![App Store Connect App Information page with name and subtitle fields](/screenshots/app-store-connect/app-information.jpg)',
    },
    {
      afterHeading: '## How LaunchBuddy helps manage App Store metadata',
      markdown:
        '![App Store Connect version page showing App Previews and Screenshots plus promotional text](/screenshots/app-store-connect/release-information.jpg)',
    },
  ],
  'app-store-localization-workflow.md': [
    {
      afterHeading: '## App Store localization is not the same as app localization',
      markdown:
        '![App Store Connect App Information page with name and subtitle fields](/screenshots/app-store-connect/app-information.jpg)',
    },
  ],
  'indie-app-portfolio-management.md': [
    {
      afterHeading: '## Where LaunchBuddy fits',
      markdown:
        '![LaunchBuddy overview showing app status, App Store URL, bundle ID, and ASC app ID](/screenshots/launchbuddy/overview.jpg)',
    },
  ],
  'app-store-connect-project-management.md': [
    {
      afterHeading: '## Why LaunchBuddy fits this workflow',
      markdown:
        '![LaunchBuddy Releases board with backlog tasks, version metadata, and changelog draft](/screenshots/launchbuddy/releases.jpg)',
    },
  ],
  'ios-developer-task-manager.md': [
    {
      afterHeading: '## Why LaunchBuddy is built for this keyword',
      markdown:
        '![LaunchBuddy Releases board with backlog tasks, version metadata, and changelog draft](/screenshots/launchbuddy/releases.jpg)',
    },
  ],
  'ios-app-release-cadence.md': [
    {
      afterHeading: '## How LaunchBuddy supports the cadence',
      markdown:
        '![LaunchBuddy Releases board with backlog tasks, version metadata, and changelog draft](/screenshots/launchbuddy/releases.jpg)',
    },
  ],
  'ios-post-launch-checklist.md': [
    {
      afterHeading: '## How LaunchBuddy fits the post-launch checklist',
      markdown:
        '![LaunchBuddy App Store Analytics dashboard with impressions, page views, conversion, and installs](/screenshots/launchbuddy/analytics.jpg)',
    },
  ],
  'ai-release-notes-for-ios-apps.md': [
    {
      afterHeading: '## Ship clearer updates with LaunchBuddy',
      markdown:
        '![LaunchBuddy Releases board with backlog tasks, version metadata, and changelog draft](/screenshots/launchbuddy/releases.jpg)',
    },
  ],
  'app-store-release-notes-generator.md': [
    {
      afterHeading: '## How LaunchBuddy helps generate better App Store release notes',
      markdown:
        '![LaunchBuddy Releases board with backlog tasks, version metadata, and changelog draft](/screenshots/launchbuddy/releases.jpg)',
    },
  ],
  'manual-vs-automatic-app-store-release.md': [
    {
      afterHeading: '## How to select the release option in App Store Connect',
      markdown:
        '![App Store Connect version page showing App Previews and Screenshots plus promotional text](/screenshots/app-store-connect/release-information.jpg)',
    },
  ],
  'app-store-phased-release.md': [
    {
      afterHeading: '## How to enable an App Store phased release',
      markdown:
        '![App Store Connect App Review submissions history with completed and unresolved statuses](/screenshots/app-store-connect/app-review-history.jpg)',
    },
  ],
  'ios-app-launch-checklist.md': [
    {
      afterHeading: '## 2. Set up App Store Connect early',
      markdown:
        '![App Store Connect version page showing App Previews and Screenshots plus promotional text](/screenshots/app-store-connect/release-information.jpg)',
    },
    {
      afterHeading: '## 3. Build a TestFlight launch loop',
      markdown:
        '![App Store Connect TestFlight iOS builds list with a build ready to submit](/screenshots/app-store-connect/testflight.jpg)',
    },
  ],
  'launchbuddy-vs-appfigures.md': [
    {
      afterHeading: '## Where LaunchBuddy is stronger',
      markdown:
        '![LaunchBuddy App Store Analytics dashboard with impressions, page views, conversion, and installs](/screenshots/launchbuddy/analytics.jpg)',
    },
  ],
  'app-store-connect-alternatives.md': [
    {
      afterHeading: '## Where LaunchBuddy fits',
      markdown:
        '![LaunchBuddy overview showing app status, App Store URL, bundle ID, and ASC app ID](/screenshots/launchbuddy/overview.jpg)',
    },
  ],
  'ship-your-side-project.md': [
    {
      afterHeading: '## 2. Organize work into releases',
      markdown:
        '![LaunchBuddy Releases board with backlog tasks, version metadata, and changelog draft](/screenshots/launchbuddy/releases.jpg)',
    },
  ],
  'launchbuddy-vs-itsyconnect.md': [
    {
      afterHeading: '## Where LaunchBuddy is stronger',
      markdown:
        '![LaunchBuddy overview showing app status, App Store URL, bundle ID, and ASC app ID](/screenshots/launchbuddy/overview.jpg)',
    },
  ],
  'launchbuddy-vs-forgeasc.md': [
    {
      afterHeading: '## Where LaunchBuddy is stronger',
      markdown:
        '![LaunchBuddy Releases board with backlog tasks, version metadata, and changelog draft](/screenshots/launchbuddy/releases.jpg)',
    },
  ],
  'launchbuddy-vs-fastlane-asc-cli.md': [
    {
      afterHeading: '## What LaunchBuddy is strongest at',
      markdown:
        '![LaunchBuddy overview showing app status, App Store URL, bundle ID, and ASC app ID](/screenshots/launchbuddy/overview.jpg)',
    },
  ],
  'ios-release-status-widget.md': [
    {
      afterHeading: '## Prepare the release before relying on its summary',
      markdown:
        '![LaunchBuddy Releases board with backlog tasks, version metadata, and changelog draft](/screenshots/launchbuddy/releases.jpg)',
    },
  ],
};

function insertAfterHeading(content, heading, markdown) {
  if (content.includes(markdown)) {
    return { content, status: 'exists' };
  }

  const headingIndex = content.indexOf(heading);
  if (headingIndex === -1) {
    return { content, status: 'missing-heading' };
  }

  const afterHeading = headingIndex + heading.length;
  const nextNewline = content.indexOf('\n', afterHeading);
  const insertAt = nextNewline === -1 ? content.length : nextNewline + 1;

  // Skip a blank line after the heading if present, then insert before the first body paragraph.
  let cursor = insertAt;
  while (content[cursor] === '\n') {
    cursor += 1;
  }

  const block = `\n${markdown}\n\n`;
  const updated = content.slice(0, cursor) + block + content.slice(cursor);
  return { content: updated, status: 'inserted' };
}

let inserted = 0;
let skipped = 0;
let missing = [];

for (const [file, items] of Object.entries(insertions)) {
  const fullPath = path.join(blogDir, file);
  if (!fs.existsSync(fullPath)) {
    missing.push(`${file}: file missing`);
    continue;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  for (const item of items) {
    const result = insertAfterHeading(content, item.afterHeading, item.markdown);
    content = result.content;
    if (result.status === 'inserted') inserted += 1;
    else if (result.status === 'exists') skipped += 1;
    else missing.push(`${file}: ${item.afterHeading}`);
  }
  fs.writeFileSync(fullPath, content);
}

console.log(JSON.stringify({ inserted, skipped, missing }, null, 2));
