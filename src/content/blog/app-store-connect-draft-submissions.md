---
title: "App Store Connect Draft Submissions: Add for Review vs Submit"
description: "Learn how App Store Connect draft submissions work, what Add for Review changes, when Apple receives your submission, and how to verify the handoff."
pubDate: 2026-09-01
---

An **App Store Connect draft submission** is a staging container, not a submission Apple has received. **Add for Review** puts an app version or another reviewable item into a draft and changes the item to **Ready for Review**. You must then open the draft and select **Submit for Review**. After that handoff, verify that App Store Connect shows **Waiting for Review** or a later review status.

That distinction prevents a surprisingly easy mistake: finishing the version page, selecting Add for Review, and assuming the app is now in Apple's queue.

## How to submit an App Store Connect draft

The current flow has five checkpoints. Treat each one as a separate state change rather than one long submit button.

### 1. Finish the app version and select the build

Open **Apps → your app → the app version**. Complete the required version information, then verify the build in the Build section.

Before moving on, record:

- platform and version number;
- selected build number;
- customer-facing What's New copy;
- App Review contact details, notes, and any required demo access;
- every additional item that must be reviewed with this version.

The version and build identify different things. If that distinction is unclear, use the [iOS version number vs build number guide](/blog/ios-version-number-vs-build-number/) before choosing the release candidate.

Apple says the **Account Holder, Admin, or App Manager** role is required to submit an app. A missing control can therefore be a permissions problem, not an incomplete version.

### 2. Select Add for Review

On the app-version page, select **Add for Review**. App Store Connect asks whether to add the version to an existing draft submission or create a new one.

This action changes the app version to **Ready for Review**. It does not send anything to App Review. Apple's [app-submission instructions](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-an-app) explicitly separate Add for Review from the final Submit for Review action.

Use a new draft when the version needs its own review packet. Use an existing draft only when its platform and contents match the review you intend Apple to perform together.

### 3. Inspect the draft as a review packet

Open **Draft Submissions** from the bottom of the screen, or open **App Review** in the sidebar and select the draft.

Don't check only that the app version appears. Read the complete item list and answer four questions:

1. Is this the intended platform?
2. Is the correct app version present?
3. Are all required related items present?
4. Does every item belong in this review packet?

Apple notes that all items submitted together must be accepted before the submission is complete. An unrelated or unready item can therefore complicate an otherwise ready app-version review.

### 4. Select Submit for Review

Once the packet is correct, select **Submit for Review** in the draft. This is the action that sends the submission to Apple.

Apple's [app and submission status reference](https://developer.apple.com/help/app-store-connect/reference/app-and-submission-statuses) separates the next two states:

- **Waiting for Review:** Apple has received the submission but hasn't started reviewing it.
- **In Review:** App Review is reviewing the submission.

The app version and each item also have their own statuses, so read the label in context. **Ready for Review** means an item is still in a draft; **Waiting for Review** means the submitted packet reached Apple.

### 5. Verify the handoff

Return to **App Review** and open the submission. Record the status shown there rather than using a completed personal checklist as proof.

A useful receipt is short:

```text
App:
Platform:
Version / build:
Draft contents:
Submitted by:
Submitted at:
App Store Connect status:
Next check:
```

If the status is still Ready for Review, the item hasn't crossed the final handoff. Reopen the draft and confirm whether Submit for Review was actually completed. If the submission shows Waiting for Review, add that status and the submission time to your receipt.

## Decide what belongs in the same submission

Apple introduced [multiple draft submissions](https://developer.apple.com/help/app-store-connect/release-notes/) so developers can prepare more than one update. Platform and item rules still determine what belongs together.

According to Apple's [overview of submitting for review](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/overview-of-submitting-for-review/):

- app versions for each platform are submitted separately;
- items associated with different platforms can't share a submission;
- a platform can have one app-version submission under review at a time;
- a platform can have at most two submissions under review at once: one containing an app version and one containing items without an app version;
- submissions may not be reviewed in the order you send them.

For an ordinary version update, start with one version-scoped packet. Add a related item when it must launch with the version or when Apple's rules require the pairing. Keep independent work separate when reviewing it together would create an unnecessary dependency.

In-App Purchases and subscriptions have additional rules. Apple requires the first item of each In-App Purchase type to be submitted with a new app version. New subscriptions also need their subscription group in the same submission. Check Apple's current [In-App Purchase submission instructions](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-an-in-app-purchase/) before assembling a monetization packet.

## Use a two-layer readiness check

A green project checklist and an Apple submission status answer different questions:

| Layer | Question | Evidence |
| --- | --- | --- |
| Release readiness | Is this build and its supporting material safe to send? | Tested build, completed tasks, current metadata, reviewer instructions |
| App Review handoff | Did Apple receive the intended packet? | Submission contents and Waiting for Review or later status in App Store Connect |

Don't collapse these layers into one “submitted” checkbox. Instead, use two explicit gates:

```text
[ ] Release candidate approved internally
[ ] App Store Connect receipt verified
```

The first gate prevents an unfinished build from being sent. The second prevents a finished draft from being mistaken for a sent submission.

For the evidence behind the first gate, work through the [App Store Connect release checklist](/blog/app-store-connect-release-checklist/) and update your [App Review notes](/blog/app-review-notes/) for the selected build.

## Worked example: version 2.4 with a related item

Suppose version 2.4 adds a seasonal feature represented by an In-App Event.

The release record says build 184 passed testing, the event metadata matches that build, and the reviewer can reach the feature from the app's Today tab. In App Store Connect, the developer:

1. verifies build 184 on the version 2.4 page;
2. selects Add for Review and creates a draft;
3. adds the related In-App Event to that same platform-specific draft;
4. confirms the draft contains version 2.4 and the intended event, with no stale items;
5. selects Submit for Review;
6. reopens App Review and records the Waiting for Review status.

Now imagine the developer stops after step 2. Version 2.4 says Ready for Review, but Apple hasn't received the packet. The release record should remain “draft assembled,” not “submitted.”

This naming is more than bookkeeping. It tells you whether the next action belongs to you or to Apple.

## Common draft-submission mistakes

### Treating Ready for Review as Waiting for Review

These labels are close, but their meanings differ. Ready for Review is pre-submission. Waiting for Review is post-submission.

### Checking only the app-version page

The version page confirms the version's state. The App Review section confirms the submission container and its complete contents.

### Combining items because they are ready at the same time

Review timing alone isn't a reason to couple items. Group them when they belong to the same platform-specific review packet or when Apple requires them to ship together.

### Recording “submitted” before checking the receipt

Use a status copied from App Store Connect after Submit for Review. A timestamped receipt is more useful than memory when you return to the release later.

### Assuming submission order controls review order

Apple explicitly says submissions may not be reviewed in submission order. Don't make a launch dependency rely on one packet finishing first unless the items are correctly grouped and eligible to be grouped.

## Track the draft without claiming LaunchBuddy submits it

App Store Connect remains the system that creates the draft, sends it to App Review, and reports the official status. LaunchBuddy doesn't replace that handoff.

LaunchBuddy's release planning and taskboards can hold the version-scoped work around it. Its reusable App Store submission checklists can separate “Add for Review” from “Submit for Review.” Complete the final release task only after you verify Apple's status. Default submission checklists are available on the free plan; custom checklists require LaunchBuddy Pro.

For a broader way to connect builds, metadata, review state, and follow-up work, see the [App Store submission tracker](/blog/app-store-submission-tracker/).

## Submit the packet, then verify the state

The reliable sequence is simple: finish the version, select Add for Review, inspect the draft, select Submit for Review, and verify Waiting for Review or a later status in App Store Connect.

Keep those checkpoints separate in your release plan. You'll know exactly what Apple has received, what is still only staged, and who owns the next action.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy on the App Store</a>
