---
title: "App Store In-App Events: A Practical Publishing Workflow"
description: "Plan, create, submit, and measure an App Store In-App Event with an event brief, reverse timeline, deep-link checks, metadata limits, and launch runbook."
pubDate: 2026-09-10
---

An **App Store In-App Event** is a timely experience inside an iOS or iPadOS app—such as a challenge, competition, premiere, livestream, new season, major update, or other special event—that can appear as an event card on the App Store and, for games, Apple Games. To publish one, define a genuinely time-bound experience, prepare event-specific metadata and media, test a deep link to the experience, set storefront dates, submit the event to App Review, and verify it when it becomes discoverable.

Don't use an In-App Event as a generic ad for the app. Apple's [current guidance](https://developer.apple.com/app-store/in-app-events/) says repetitive activities, price promotions without new content, and general awareness campaigns aren't good candidates. The event must happen inside the app at the dates and times configured in App Store Connect.

This how-to guide works backward from the event date, then adds an event contract and measurement record so the App Store card, live experience, and later result don't drift apart.

## First, decide whether the experience qualifies

The simplest test is whether you can name **what becomes available, to whom, and for how long**.

| Candidate | Likely fit | Why |
| --- | --- | --- |
| A seven-day fitness streak with an event-only goal | Challenge | Users work toward a defined result before the event ends |
| A live tournament with a leaderboard | Competition or Live Event | Users compete, or participate in a shared real-time experience |
| A new story chapter launched with a limited-time premiere | Premiere | New content is introduced for the first time |
| A substantial new editing mode with a launch-week experience | Major Update | The release adds more than minor UI changes or bug fixes |
| A routine daily reward | Poor fit | Apple excludes repetitive activities as a good candidate |
| A temporary discount with no new content or experience | Poor fit | Price promotion alone isn't an In-App Event |
| “Try our app today” | Poor fit | It promotes the app generally rather than a timely in-app moment |

Apple provides seven badges: **Challenge, Competition, Live Event, Major Update, New Season, Premiere, and Special Event**. Pick the badge that describes what users will actually experience, not the one that sounds most promotional.

Before continuing, write a one-sentence eligibility statement:

```text
From [start] to [end], [audience] can [specific in-app experience],
and the event deep link opens [exact destination].
```

If you can't complete that sentence without vague language, the event isn't ready to configure.

## Work backward from the event date

Apple's [event instructions](https://developer.apple.com/help/app-store-connect/offer-in-app-events/offer-in-app-events/) allow an event to last from **15 minutes to 31 days**. Its publish date—the point when the event can become discoverable—can be no more than **14 days before the start**. Those are system limits, not a recommended production schedule.

Give App Review, localization, media, and deep-link testing their own buffer:

```text
E = event start

E − 4 to 6 weeks
- Freeze the event contract
- Confirm the in-app experience and deep-link destination
- Assign metadata, media, localization, and QA owners

E − 3 weeks
- Test the release candidate and event path on supported devices
- Review localized copy and media
- Assemble the App Review packet

Before E − 14 days
- Submit the event with enough time to handle review feedback
- Do not assume review will finish by a particular date

E − 14 days at the earliest
- Let the approved event become discoverable
- Test the live card, details page, download/open path, and destination

E
- Confirm the in-app experience is live in every scheduled storefront
- Start the event runbook

After the event
- Preserve App Store Connect results and write a decision
```

The **E − 3 weeks** and earlier checkpoints are planning buffers, not Apple guarantees. If the experience depends on a new app version, coordinate the build, event, and reviewer access in the same release plan. The [App Store Connect release checklist](/blog/app-store-connect-release-checklist/) covers the wider build and metadata checks.

## Create one event contract before the App Store record

An event contract is a compact source of truth for product, marketing, QA, and App Review. It adds value that the final App Store fields can't: owners, fallback behavior, evidence, and an explicit success decision.

```text
Internal ID and reference name:
App and release:
Badge:

Audience:
Event experience:
Start and end:
Storefronts and localizations:
Publish date:

Entry state before the event:
Entry state while live:
Entry state after the event:
Deep-link destination:
Signed-out or new-user path:
Required purchase or subscription:

Event name:
Short description:
Long description:
Card media:
Details-page media:

App Review evidence:
Live owner:
Fallback if the experience is unavailable:

Primary question:
Primary event metric:
Guardrails:
Decision date:
```

The three entry states catch a common product gap. A deep link may work while the event is live but fail during its pre-start discovery window or after the event ends. Define useful destinations for all three states before marketing the URL.

## Write metadata about the event, not the whole app

Apple's event instructions currently accept:

- a unique internal reference name up to 64 characters;
- an event name up to 30 characters;
- a short description up to 50 characters;
- a long description up to 120 characters;
- event card media in 16:9;
- event details-page media in 9:16.

Apple asks for a distinctive event name in title case and descriptions in sentence case. It also warns against unverifiable claims, excessive punctuation, generic app promotion, and specific prices in event metadata.

For a fictional focus app, compare these drafts:

```text
Weak event name:
Try Focus Timer Now!

Stronger event name:
Autumn Focus Sprint

Weak short description:
The best productivity app for everyone

Stronger short description:
Complete seven focused sessions this week

Weak long description:
Download our amazing app and unlock premium for $2.99!

Stronger long description:
Finish the weekly sprint and earn the in-app autumn badge.
```

The stronger copy names an experience and outcome. It doesn't claim that the app is “best,” repeat the badge, or put a region-dependent price into metadata.

### Prepare both media crops deliberately

Apple's [media specifications](https://developer.apple.com/help/app-store-connect/reference/in-app-event-media-and-audio-specifications/) call for:

| Placement | Image | Video | Resolution range |
| --- | --- | --- | --- |
| Event card, 16:9 | `.jpg`, `.jpeg`, `.png` | `.mov`, `.m4v`, `.mp4` at 30 or 60 fps | 1920×1080 to 3840×2160 px |
| Details page, 9:16 | `.jpg`, `.jpeg`, `.png` | `.mov`, `.m4v`, `.mp4` at 30 or 60 fps | 1080×1920 to 2160×3840 px |

Each file can be up to 500 MB. Videos autoplay and repeat, so use App Store Connect's previews to check what its crops and overlays obscure.

An asset preflight should confirm:

- the media depicts the event rather than a generic app screen;
- you own or license everything shown;
- the focal subject survives both aspect ratios;
- text isn't duplicated by the event name or badge;
- a looping video has no jarring final frame;
- every localized asset still matches the actual event.

Don't stretch one composition into two shapes and call the crop checked.

## Test the deep link as a product path

Apple recommends a universal link for security, though a custom URL is also accepted. Avoid URL shorteners and unnecessary redirects. The link must lead to the proper event destination, not merely launch the app's home screen.

Test this matrix on real supported devices:

| State | Expected result |
| --- | --- |
| App installed, signed in, event live | Opens the event directly |
| App installed, signed out | Explains sign-in and returns to the event afterward |
| App installed, event not started | Opens a truthful preview or reminder state |
| App installed, event ended | Opens a useful result or expired-event state |
| App not installed | App Store download works; Open reaches the intended path after onboarding |
| Required purchase absent | Requirement is clear before the user reaches a dead end |

Record the tested app version, OS version, device, account state, URL, destination, and result. “Deep link works” isn't enough evidence for App Review or a launch incident.

Apple's [App Review Guideline 2.3.13](https://developer.apple.com/app-store/review/guidelines/#accurate-metadata) makes the boundary explicit: event metadata must be accurate, the experience must happen at the configured times across storefronts, and the deep link must reach the proper in-app destination.

## Configure the event in App Store Connect

An Account Holder, Admin, App Manager, or Marketing user can create an event. In **Apps → your app → In-App Events**:

1. Create an event and enter its unique reference name.
2. Add the event name, short and long descriptions, media, primary language, and localizations.
3. Select the badge that matches the experience.
4. Set country or region availability.
5. Set the event's start, end, and publish dates.
6. Add the tested deep link.
7. Choose the event purpose: all users, new users, active users, or lapsed users.
8. Set normal or high priority.
9. Indicate whether an additional In-App Purchase is required specifically for participation.
10. Compare every saved value with the event contract before review.

By default, availability covers all storefronts, but the event can appear only where the app itself is available. If you customize local start times, Apple requires all starts to fall within a 48-hour span.

Purpose isn't an access control. Apple uses it as one factor in personalized recommendations, while a published event remains discoverable by all customers. Priority affects ordering on the product page: high-priority events appear ahead of normal-priority events, otherwise the soonest start appears first.

Apple currently allows up to **15 approved events per app in App Store Connect** and up to **10 published events at once**. Capacity isn't a reason to overlap events that compete for the same audience or obscure which experience produced a result.

## Submit the event and verify the receipt

In-App Events require App Review approval before they can appear. Apple's [event-submission rules](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-an-in-app-event/) depend on the app's approval state:

- If the app has never been approved, include the event in the same submission as the first iOS app version.
- If the app is already approved, submit the event either with or without an iOS app version.

If the event depends on code in an unreleased build, reviewers still need the correct version, access, and instructions.

Before submission, verify:

```text
[ ] The event exists in the reviewed build
[ ] Dates match the in-app schedule in every storefront
[ ] Metadata describes only the event
[ ] Both media placements have been previewed
[ ] The deep-link matrix passed
[ ] Purchase requirements are disclosed correctly
[ ] Reviewer access and navigation steps are current
[ ] The event contract and App Store record match
```

Use the event-specific status sequence:

1. On the event, select **Add for Review** and choose an existing or new draft submission.
2. Confirm the event changes to **Ready for Review** and inspect every item in the draft.
3. Select **Submit for Review**.
4. Confirm the event changes to **Waiting for Review**.

If the event is submitted without an app version, select a platform in the draft; Apple reviews the event with the latest version of that platform. A Marketing-role user can submit events but can't add app versions to a submission. For the generic draft state machine and a reusable receipt, use the [draft submissions guide](/blog/app-store-connect-draft-submissions/).

## Run a live-event verification, not just a launch announcement

As soon as the event becomes discoverable, check:

- the event card and details page in each important storefront and localization;
- name, descriptions, badge, media crop, schedule, and purchase disclosure;
- reminder behavior before the start;
- download and Open behavior for a new user;
- the deep-link destination for current and lapsed users;
- the live in-app experience when the scheduled time arrives;
- support and fallback messaging.

Apple's [event-management rules](https://developer.apple.com/help/app-store-connect/offer-in-app-events/manage-events/) narrow what can be edited as the event progresses. While an event is Waiting for Review or In Review, most changes require removing it from review. Once it is published, only start and end dates can be changed; after it begins, only the end date can be adjusted.

Treat those limits as a reason to verify early, not as a recovery plan.

## Measure one event question without inventing causality

Apple's [In-App Events analytics](https://developer.apple.com/help/app-store-connect-analytics/acquisition/in-app-events) can report event impressions, event page views, app opens, downloads, redownloads, reminders, notification taps, subscriptions, and sales driven by an event. Results can be filtered by dimensions such as territory, source type, and device.

Choose the metric that matches the event's purpose:

| Event question | Primary signal | Useful context |
| --- | --- | --- |
| Did people notice the card? | Unique event impressions | Source and territory |
| Did the card earn deeper interest? | Unique event page views | Unique event impressions |
| Did existing users enter the experience? | App opens | Reminder and notification taps |
| Did the event acquire users? | First-time downloads driven by the event | Storefront, source, later usage |
| Did it bring people back? | Redownloads and app opens | Lapsed-user purpose and event timing |
| Did a paid event convert? | Event-attributed sales or subscriptions | Purchase requirement and offering context |

Write the question before opening the chart:

```text
Question:
Did Autumn Focus Sprint bring existing users into the event?

Primary metric:
App Opens from the In-App Event

Context:
Unique Event Impressions, Reminders, Notification Taps

Segments:
US storefront, iPhone, complete event window

Confounders:
Version release, email campaign, featuring, outage

Decision:
Repeat | revise | stop
Reason:
```

Don't call a before-and-after change causal. A version release, campaign, editorial placement, seasonality, or another event may move the same numbers. Also keep Apple's availability threshold in mind: In-App Event metrics don't appear until the app has received five first-time downloads from at least one event. Missing data isn't zero.

For exact metric definitions and small-app caveats, use the [App Store Connect analytics guide](/blog/app-store-connect-analytics/). If you plan to pitch the moment to Apple Editorial, keep that separate from event configuration with the [App Store featuring nomination guide](/blog/app-store-featuring-nomination/).

## Where LaunchBuddy fits

Create and submit the In-App Event in App Store Connect. LaunchBuddy's documented role in this workflow is the planning layer around Apple's record:

- keep implementation, deep-link QA, metadata, media, review, and live-verification tasks with the app release;
- turn the event preflight into a reusable App Store submission checklist;
- assign follow-up work to the correct version instead of leaving it in a launch note;
- preserve the event question and post-event decision in release tasks or project notes.

Default App Store submission checklists are included in LaunchBuddy's free plan; custom reusable checklists require Pro. LaunchBuddy Pro's App Store Connect dashboard shows selected downloads, revenue, and subscription metrics, but Apple's In-App Events dashboard remains the source for event-specific impressions, page views, opens, reminders, and notification taps.

This boundary matters: LaunchBuddy doesn't create or submit the event through the workflow described here. App Store Connect owns the event record, review status, live dates, storefront availability, and official event analytics.

## Publish an event the app can actually deliver

A useful In-App Event starts as a product contract, not a promotional field. Confirm that the experience is timely, make the card match the in-app reality, test every deep-link state, submit with a real review buffer, verify the live surfaces, and close with an evidence-based decision.

To keep event preparation, release tasks, and verification checks together, <a href="https://apple.co/3iFcjjW">download LaunchBuddy on the App Store</a>.
