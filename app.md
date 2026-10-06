# LaunchBuddy: landing page SEO contract

Snapshot of the App Store listing plus the keyword research and placement map behind launchbuddy.app. Product claims on the site must still pass `product-facts.yml`; this file records what the store says and where each keyword lives.

Captured 2026-10-06 from the iTunes lookup API (`id=1615169630`, US storefront) and the public App Store page.

## Identity

| Field | Value |
| --- | --- |
| Store name | LaunchBuddy: App Planner |
| Subtitle | Ship & Grow Your iOS Apps |
| App ID | 1615169630 |
| Bundle ID | de.flowritesco.AppManager |
| Seller | Florian Schweizer |
| Price | Free, with LaunchBuddy Pro in-app purchases |
| Pro plans used on the site | $2.99/month, $19.99/year (store also lists legacy lifetime, weekly, and tiered SKUs) |
| Genres | Developer Tools, Productivity |
| Rating | 4.83 from 107 ratings (site shows 4.8 / 107) |
| Version | 7.1.0, released 2026-08-23 |
| First release | 2022-03-25 |
| Minimum OS | iOS 26.0 (iPhone, iPad, Mac) |
| Age rating | 4+ |
| Languages | English |
| Google Play | None (`play.google.com/store/apps/details?id=de.flowritesco.AppManager` returns 404) |
| Store URL | https://apps.apple.com/us/app/launchbuddy-app-planner/id1615169630 |
| Short link used in CTAs | https://apple.co/3iFcjjW |

## Store description (verbatim)

> Ship and grow your iOS apps — without the wrong tools.
>
> LaunchBuddy is the release manager built for indie iOS developers. Plan each version, write release notes, stay on top of App Store Connect work, and keep ASO and analytics in the loop from first build to ship day.
>
> BUILT FOR INDIE DEVELOPERS
>
> Apps Dashboard
> Every app you ship, one place. Track status, platforms, store links, and the work that still blocks release.
>
> Release Planning
> Create a release, set a target date, and break down what has to happen before review. Changelogs and checklists live with the version — not in a generic productivity app.
>
> Release Notes & Changelog
> Draft what’s new as you build. Keep a clean history for App Store submissions and your users.
>
> App Store Connect Ready
> Stay oriented around submission, metadata, and the steps that matter for indie releases.
>
> ASO & Growth Context
> Keep keywords, positioning, and growth work next to the release you’re actually shipping.
>
> GENEROUS FREE TIER
> Use LaunchBuddy with up to 2 apps, free forever. No time limits on the basics.
>
> UPGRADE TO PRO
> - Unlimited apps
> - Custom checklists for every release
> - Dashboard filters
> - Priority support and early access
>
> Whether you’re preparing a first App Store submission or shipping updates across a portfolio, LaunchBuddy keeps release work focused on shipping and growing.
>
> AVAILABLE ON MAC
> Works on iPhone, iPad, and Mac. Plan on the go, then sit down and ship.

Release notes for 7.1.0 add LaunchBuddy AI playbooks (feedback to tasks, PPP pricing for IAPs, ASC analytics interpretation, codebase audit) and a reworked iOS navigation.

## What the screens show

Store screenshots (iPhone 5.5" at 1242×2208, iPad at 2732×2048):

| # | Caption | What the screen shows |
| --- | --- | --- |
| iPhone 1 | Actually SHIP your Side Project | "Congrats! You shipped another release" sheet with task-size summary |
| iPhone 2 | Manage your Apps | Apps list grouped into Favorites, In Development, Ready for Sale |
| iPhone 3 | Track Tasks | iOS Release taskboard with Backlog, In Progress, Done |
| iPhone 4 | Schedule Releases | Release detail: version, release date, status, description, changelog |
| iPhone 5 | Made for Indies | App overview: status, App Store and website links, notes |
| iPad 1 | Plan your app's releases | Release board beside version metadata and changelog |
| iPad 2 | Avoid common issues | "Common First Launch Issues" checklist (restore purchases, review prompt, privacy policy...) |
| iPad 3 | Note down app ideas | App idea with notes and a "Convert to app" action |
| iPad 4 | Manage your indie apps | Apps list on iPad |

Current Mac screenshots in the repo (v7.0–7.2 UI, used on the site):

- `public/screenshots/launchbuddy/releases.jpg`: Releases board with backlog, version, release date, changelog, Push to ASC
- `public/screenshots/launchbuddy/customer-reviews.jpg`: Customer Reviews inbox with ratings, locales, replied status
- `public/screenshots/launchbuddy/ai.jpg`: LaunchBuddy AI sessions with approval-gated playbooks
- `public/screenshots/launchbuddy/overview.jpg`: App overview with status, App Store URL, bundle ID, ASC app ID
- `src/assets/experiments.png`: ASO experiment comparing baseline and variant title, subtitle, keywords
- `src/assets/cross-platform-sync.png`: Mac and iPhone side by side

Brand: system-blue (#2f7bff family) on a near-black site background, blueprint-grid motif on the store screenshots and icon, glassy rocket icon. Type on the site is Inter with JetBrains Mono labels.

## Features (listing + screenshots, checked against product-facts.yml)

Free: release planning and taskboards, default App Store submission checklists, iCloud sync on iPhone/iPad/Mac, app portfolio (2 apps, 2 releases), app ideas, widgets (release status, taskboard, app overview), Mac menu bar release status, Shortcuts/Siri read actions, MCP read tools on Mac.

Pro: unlimited apps/releases/notes, custom checklists, App Store Connect reviews inbox, analytics dashboard, release-notes upload, review-to-task, LaunchBuddy AI (app-aware chat, playbooks, review reply drafts, idea chat), ASO experiments, Shortcuts and MCP write actions through the approval queue. ASC features need an API key. AI has usage limits.

Not supported (never claim): Android, web app, binary build/upload/signing, automatic screenshot or metadata upload, autonomous AI writes, team collaboration.

## Asset manifest

| Asset | Source | In repo |
| --- | --- | --- |
| Icon 1024 | `.../LB_Icon-0-0-1x_U007epad-0-1-sRGB-85-220.png/1024x1024bb.png` | `src/assets/app-icon.png` (site icon, older artwork) |
| iPhone screenshots ×5 | `screenshotUrls` with `1284x2282bb.png` suffix (served at 1242×2208) | Not committed; outdated UI |
| iPad screenshots ×4 | `ipadScreenshotUrls` with `2732x2048bb.png` suffix | Not committed; outdated UI |
| Mac screenshots | Owner-supplied | `public/screenshots/launchbuddy/*`, `src/assets/*.png` |
| Social card | Owner-supplied | `public/images/preview.png` (1200×630) |

## Keyword research

Sources: live Google results (2026-10-06), `keyword-backlog.yml` (researched 2026-10-05, 100+ published targets), competitor pages (Helm, Forge, Itsyconnect, Asomium, Docket, Milestones, ShipWhenReady). No App Store keyword tool was connected, so App Store popularity is not measured here.

Where LaunchBuddy ranks on Google today:

| Query | Result |
| --- | --- |
| iOS app release manager for indie developers | #1 (homepage) |
| project management app for indie iOS developers | #3 behind Docket |
| app planner for developers iPhone Mac | #1 |
| app release planner iOS developers release checklist app | #1 homepage, #2 release checklist post |
| App Store Connect app for Mac | Not in top 5 (Itsyconnect, Forge own it) |
| App Store release management tool | Blog comparison post only (#2) |

### Primary (title, H1, meta description, hero)

1. iOS app release manager (+ "for indie developers")
2. App Store submission checklist
3. App Store Connect (companion framing, not "client")
4. indie iOS developer(s)
5. app planner for developers (matches the store name)

### Secondary (H2s, feature copy, alt text)

App Store release planning, release notes / What's New, App Store review replies, TestFlight release management, App Store Connect MCP server for Cursor / Claude Code / Codex, ASO experiments, iPhone iPad and Mac with iCloud sync.

### Skipped or demoted

- "App Store Connect app for Mac" / "App Store Connect client": SERP is full-featured ASC clients that edit metadata, screenshots, and TestFlight. LaunchBuddy doesn't, so ranking there would attract the wrong visitor.
- "release management software/tool": enterprise DevOps and CI vendors.
- "app planner" on its own: daily planners and idea notebooks.
- "project management app": far too broad.

### Long-tail → guide (one page each)

The blog already covers these intents, so they are upgraded in place rather than duplicated. These are the `featured` guides in frontmatter.

| Long-tail query | Guide | Pain it solves (visible in) |
| --- | --- | --- |
| App Store submission checklist / App Store Connect release checklist | /blog/app-store-connect-release-checklist/ | Checklists screen, "Avoid common issues" |
| iOS app launch checklist | /blog/ios-app-launch-checklist/ | First-launch checklist |
| how to manage iOS app releases | /blog/ios-app-release-management/ | Releases board, "Schedule Releases" |
| how to manage App Store reviews | /blog/app-store-review-management/ | Customer Reviews inbox |
| AI release notes for iOS apps | /blog/ai-release-notes-for-ios-apps/ | Changelog with AI button |
| App Store Connect MCP server for Cursor / Claude Code | /blog/launchbuddy-mcp-server/ | AI and approvals screen |
| TestFlight release management | /blog/testflight-release-management/ | Release tasks around a beta build |
| manage multiple indie apps | /blog/indie-app-portfolio-management/ | Apps list, "Manage your indie apps" |
| app idea backlog | /blog/ios-app-idea-backlog/ | "Note down app ideas", Convert to app |

## Placement map

| Slot | Copy |
| --- | --- |
| `<title>` | LaunchBuddy — iOS App Release Manager for Indie Developers |
| Meta description | Plan iOS releases, run App Store submission checklists, and reply to App Store reviews on iPhone, iPad, and Mac. Free for 2 apps, Pro from $2.99/mo. |
| H1 | Kicker "LaunchBuddy · iOS app release manager for indie developers" + "Ship your next release without the chaos." |
| Hero sub | "Plan iOS app releases, run App Store submission checklists, reply to reviews, and ask AI that knows your apps." |
| Screenshots H2 | LaunchBuddy on Mac: releases, reviews, AI, and ASO experiments (`src/lib/screenshots.ts`, also the `screenshot` list in SoftwareApplication) |
| Guides H2 | App Store release guides for indie iOS developers (first 6 `featured` posts) |
| FAQ | Nine search-style questions in `FAQ_ITEMS`, each with a "Learn more" guide link; the same array feeds the FAQPage JSON-LD. Questions are worded so they don't repeat another page's FAQ. |
| JSON-LD | SoftwareApplication (rating, offers, screenshots), WebSite, Organization, VideoObject, FAQPage |
| Blog index | Title "App Store & iOS Release Guides \| LaunchBuddy Blog", H1 "App Store and iOS release guides for indie developers", featured grid + all articles |
| Guides | BlogPosting + BreadcrumbList + FAQPage (read from the post's `## Frequently asked questions` section), visible breadcrumbs, byline with updated date, mid-article CTA (`src/plugins/rehype-guide-cta.mjs`), related guides, footer links |

## ASO notes

- The store screenshots still show the 2022–2024 iPhone UI at 5.5" and none of the Pro features the site sells (reviews inbox, AI playbooks, ASC analytics, MCP). Refreshing them with the Mac screenshots above, plus 6.9" iPhone shots, is the largest conversion gap.
- The store's Pro list ("Dashboard filters, Priority support and early access") doesn't match the site's Pro list. Align the description with `product-facts.yml`.
- Subtitle "Ship & Grow Your iOS Apps" spends characters on "Your" and "Apps" (already in the name). Candidates that add indexable terms: "iOS Release & Task Manager", "Release Checklist & Planner".
- Keyword field: don't repeat words already in the name or subtitle (app, planner, ship, grow, iOS). Use commas without spaces. Candidates: release, checklist, testflight, changelog, submission, xcode, indie, developer, roadmap, kanban, tracker, reviews, version, aso.
- 107 ratings is the conversion blocker. The "Congrats! You shipped another release" sheet is the right moment for `requestReview`: the user just got value. iOS allows about three prompts a year, so don't spend them during onboarding.
