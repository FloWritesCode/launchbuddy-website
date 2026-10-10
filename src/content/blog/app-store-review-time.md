---
title: "App Store Review Time: How Long It Takes and How to Plan"
description: "Understand Apple's current App Store review-time benchmarks, what can extend review, when to wait or respond, and how to plan a realistic release buffer."
pubDate: 2026-10-10
---

**Apple currently aims to review at least 50% of submissions in under 24 hours and 90% in under 48 hours.** Those are aggregate goals, not a deadline for your app. A review can take longer when Apple needs documentation, encounters a complex or novel issue, or investigates other concerns. “Reviewed” also means Apple reached an outcome; it doesn't guarantee approval.

For release planning, use **48 hours as a benchmark, not a promise**. Reserve separate time for a question, correction, resubmission, and the release step after acceptance. If missing the date would harm users or an event, set the submission cutoff earlier than Apple's typical review window.

## Read Apple's review-time figures correctly

Apple's current [review-status guidance](https://developer.apple.com/help/app-review/after-submitting-for-review/review-status/) gives two useful reference points:

| Apple's published goal | What it tells you | What it doesn't tell you |
| --- | --- | --- |
| At least 50% in less than 24 hours | At least half of submissions reach a review outcome within a day | Your submission has a 24-hour deadline |
| 90% in less than 48 hours | Most submissions reach an outcome within two days | Every app will be approved within 48 hours |

The wording matters. These aren't guaranteed service levels, and Apple doesn't publish a maximum review time on that page. The figures also cover **submissions**, which can contain an app version and other reviewable items. Each item may affect the packet's final outcome.

Check Apple's live page whenever review timing is important, because the published benchmark can change.

## Separate review time from the full release timeline

“How long does App Review take?” often hides four different intervals:

1. **Draft preparation:** The version and related items are still being assembled.
2. **Waiting for Review:** Apple has received the submission, but review hasn't started.
3. **In Review:** App Review is actively reviewing the submission.
4. **Post-review release:** An accepted app may still wait for manual release, Apple's scheduled release, operating-system availability, or distribution processing.

Start your own elapsed-time record only after **Submit for Review** succeeds and App Store Connect shows **Waiting for Review** or a later state. **Ready for Review** means an item is still in a draft. The [App Store Connect draft-submission guide](/blog/app-store-connect-draft-submissions/) explains that handoff in detail.

Approval isn't the same as public availability. If you chose manual release, you still need to release the version. Other Apple-controlled processing can follow. Keep those intervals outside your App Review estimate so you can see which stage actually used the buffer.

## Track the status, not just the stopwatch

App Store Connect is the source of truth for the submission and each item's state.

![App Store Connect App Review submissions history with completed and unresolved statuses](/screenshots/app-store-connect/app-review-history.jpg)

Use the current status to decide who owns the next action:

| Status | Meaning | Practical next action |
| --- | --- | --- |
| Ready for Review | Item is in a draft, not Apple's queue | Inspect the draft and submit it |
| Waiting for Review | Apple received it; review hasn't started | Verify the packet and monitor |
| In Review | Apple is reviewing the submission | Avoid unrelated changes; watch for messages |
| Unresolved Issues | One or more items have an issue | Read the exact message and identify the affected item |
| Accepted | This item passed, but another item in the packet may not have | Resolve or remove rejected items before expecting publication |
| Pending Developer Release | The app was accepted and awaits your release action | Run the release-day checks, then release when ready |

A useful receipt takes less than a minute to maintain:

```text
App / platform:
Version / build:
Items in submission:
Submitted at:
Current status:
Status observed at:
Message or issue:
Next owner and action:
Must-live date:
```

This record distinguishes a slow review from a forgotten draft, an unanswered question, or a post-approval release setting.

## Why some App Store reviews take longer

Apple says most submissions are reviewed within 48 hours, but its current guidance names two reasons that can require more verification:

- **Documentation review:** Apple may need to request and verify authorizations, licenses, partnership agreements, or similar supporting material.
- **Complex or novel issues:** Regulated content, new platform capabilities, enabled entitlements, and other sensitive features can need closer scrutiny.

Apple's broader [App Review guidance](https://developer.apple.com/distribute/app-review/) also warns that incomplete submissions may be delayed or fail review. It specifically asks developers to provide working demo access, special configuration, current contact details, and supporting material when those are necessary to evaluate the app.

That leads to a practical rule: optimize the **reviewability** of the packet, not the length of your release checklist. Before submitting, verify that a reviewer can:

- launch the selected build without a crash or placeholder state;
- sign in with the supplied demo account;
- reach paid, gated, hardware-dependent, or non-obvious features;
- understand any required setup;
- match screenshots and descriptions to actual behavior;
- open working support and privacy links;
- find the documentation needed for regulated or licensed content.

The [App Review notes guide](/blog/app-review-notes/) provides a build-specific template. Clear notes can remove avoidable ambiguity, but no checklist can guarantee faster review or approval.

## Build a release buffer backward from the must-live date

Don't turn Apple's 48-hour benchmark into “submit two days before launch.” That leaves no room for an outcome that requires action.

Work backward through four separate reserves:

1. **Public verification reserve:** Time to confirm the intended version is available in representative storefronts and that critical server-side dependencies are ready.
2. **Release-control reserve:** Time between acceptance and planned availability under your manual, scheduled, automatic, or phased release choice.
3. **Correction reserve:** Time to answer a question, correct metadata, fix a binary, test it, and resubmit if necessary.
4. **Initial review reserve:** Time for the first submission to move through Waiting for Review and In Review.

For example, suppose an app tied to a Friday event must be downloadable by Thursday morning:

```text
Must be publicly verified: Thursday 09:00
Release and storefront check: Wednesday
Correction / resubmission reserve: Monday–Tuesday
Initial submission target: Previous Friday
```

The exact dates are a risk decision, not an Apple formula. A familiar bug-fix update with no event dependency may tolerate a smaller reserve. A first release, regulated feature, new entitlement, required partner documentation, or immovable campaign should keep more room for verification and another review cycle.

Record the assumption beside the date:

```text
Timing assumption: Apple's current 90%-under-48-hours goal
Risk not covered by that benchmark: rejection, information request, or extended verification
Fallback: delay announcement / keep previous version live / reduce launch dependency
```

This makes the schedule's risk visible. A missed date becomes an explicit product decision instead of a surprise caused by treating a benchmark as a promise.

## What to do when review takes longer than expected

There is no universal “stuck after X hours” threshold in Apple's current review-status guidance. Use evidence before taking an action that restarts review.

1. **Confirm the exact state.** Check the App Review page, the app version, every included item, and Apple's email notifications.
2. **Check for a message.** If App Review only needs information, reply in App Store Connect. Apple says a resubmission isn't necessary when there are no other issues to resolve.
3. **Verify reviewer access.** Test demo credentials, required server environments, and special setup without using a privileged developer state.
4. **Don't resubmit unchanged work.** Apple's guidance says unresolved issues should be fixed before resubmission; sending the same problem back delays review.
5. **Remove the submission only for a real correction.** Cancellation changes the app to Developer Rejected, removes the packet from the queue, and starts review over when you resubmit. Use the [submission-removal decision guide](/blog/remove-app-store-submission-from-review/) before discarding elapsed time and accepted items.
6. **Contact App Review when you need help with the submission.** Include the app, platform, version, build, submission time, current status, and the checks you've already completed.

Waiting isn't always passive. It can be the correct action when Apple owns the current state and there is no question or defect to resolve.

## Use expedited review only for Apple's stated cases

[Apple allows an expedited-review request](https://developer.apple.com/distribute/app-review/) for extenuating circumstances, including a critical bug in the live app or an app connected to a time-sensitive event.

For a critical bug, Apple asks for reproduction steps against the current version. For an event, include the event, its date, and the app's direct association with it. Apple still recommends planning and scheduling event-related releases in App Store Connect.

An expedite request isn't a substitute for a complete build, a launch buffer, or ordinary deadline pressure. It doesn't guarantee approval or a specific completion time. For a production incident, follow a scoped [iOS hotfix release process](/blog/ios-hotfix-release-process/) and treat the request as one Apple-controlled handoff inside that process.

## Where LaunchBuddy fits in review-time planning

LaunchBuddy can hold the release date, version-scoped tasks, and App Store submission checklist on iPhone, iPad, and Mac. Default submission checklists are included on the Free plan within its app and release limits; custom checklists require Pro.

For each submission, create tasks for:

```text
[ ] Verify the final build and reviewer access
[ ] Submit the complete draft in App Store Connect
[ ] Record Waiting for Review and the submission time
[ ] Check for App Review messages
[ ] Record the decision and any correction work
[ ] Verify the release setting after acceptance
[ ] Confirm the public version
```

LaunchBuddy's Release Status widget can show the plan's progress, due date, task counts, and checklist completion. Those are your workflow signals, not Apple's live review clock.

LaunchBuddy doesn't submit the app, predict or speed up App Review, request expedited review, or determine whether a version will pass. Check official status and messages in App Store Connect, then use LaunchBuddy to keep the surrounding work and contingency plan from disappearing into memory.

Plan your next submission around evidence rather than a countdown: <a href="https://apple.co/3iFcjjW">download LaunchBuddy and build the review buffer into your release checklist</a>.
