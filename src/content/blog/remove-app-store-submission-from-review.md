---
title: "Remove an App Store Submission From Review: What Happens Next"
description: "Remove an App Store submission safely, choose the right cancellation path, understand Developer Rejected status, and prepare a clean resubmission."
pubDate: 2026-09-07
---

To remove an App Store submission from review, open the app in App Store Connect and use one of Apple's two cancellation paths:

1. Open the submitted app version and select **remove this version from review**, then confirm **Remove**.
2. Alternatively, open **App Review**, select the submission, choose **Cancel Submission**, and confirm.

Apple allows this when the app is **Waiting for Export Compliance**, **Waiting for Review**, **In Review**, **Pending Developer Release**, or **Pending Apple Release**. You need the Account Holder, Admin, or App Manager role.

Cancellation has a cost: the app version changes to **Developer Rejected**, the submission leaves the queue, and review starts over if you resubmit. Apple also says that any items already marked **Accepted** must be resubmitted. Don't cancel until you've checked the submission's complete contents and decided that the issue can't safely continue through the current review.

## First decide whether cancellation is the right fix

Use the current App Store Connect status and the change you need to make, not urgency alone.

```text
Is the submission still Waiting for Review?
├─ Only need to edit information Apple currently leaves editable?
│  └─ Make the permitted edit and verify the submission; don't cancel by default.
├─ Need a different binary, new screenshots, or a material product change?
│  └─ Remove the submission, correct it, and resubmit.
└─ Unsure what the submission contains?
   └─ Inspect App Review before taking either action.

Is the submission In Review?
├─ Found a release-blocking defect or inaccurate review packet?
│  └─ Cancel rather than let a version you no longer stand behind continue.
└─ App Review has sent a question you can answer without changing the app?
   └─ Follow the message instructions shown in App Store Connect instead of
      using cancellation as a substitute for an answer.

Does the submission show Unresolved Issues?
└─ Use Apple's resolve flow for rejected items. Edit and resubmit those items,
   or remove the rejected items where Apple permits, without discarding accepted
   work unnecessarily.
```

According to Apple's [status reference](https://developer.apple.com/help/app-store-connect/reference/app-and-submission-statuses/), some app information remains editable while a submission is Waiting for Review, but screenshots and app previews don't. App Store Connect is the authority for which controls are available for your item and status.

If App Review has already rejected an item, cancellation solves a different problem. Apple's [unresolved-issues workflow](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/manage-a-submission-with-unresolved-issues) lets you edit and resubmit rejected items or remove them from that submission. The submission can move forward after all rejected items are resolved or removed.

## Record the submission before removing it

Before selecting Remove or Cancel Submission, make a short withdrawal receipt:

```text
App and platform:
Version and selected build:
Submission status:
Items in the submission:
Accepted items, if any:
Reason for withdrawal:
Required correction:
Decision owner:
Recorded at:
```

This is more useful than a note that says “cancelled.” A submission can contain an app version plus items such as In-App Events or Apple-hosted asset packs. Apple's [submission instructions](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-an-app) state that all items submitted together must be accepted to complete the submission.

Capture the exact selected build as well. If the problem is in the binary, you'll need to distinguish the withdrawn build from its replacement. If the problem is limited to editable information, that record helps you avoid an unnecessary rebuild.

## How to remove the app version from review

Apple documents this version-page path:

1. In App Store Connect, select **Apps**.
2. Select the app.
3. In the sidebar, select the submitted app version.
4. In the message at the top, select **remove this version from review**.
5. Select **Remove** in the confirmation dialog.

Despite the wording of the link, don't assume this preserves every other item in the packet. Apple's [removal documentation](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/remove-a-submission-from-review/) says the app and any other items in the submission are removed from the queue. Check the whole packet before confirming.

## How to cancel the submission from App Review

The submission-level path starts from the complete review packet:

1. Open the app in App Store Connect.
2. Select **App Review** in the sidebar.
3. Under **Submissions**, open the submission.
4. Select **Cancel Submission** at the bottom of the page.
5. Select **Confirm**.

This route makes the cancellation scope easier to inspect before you act. It's especially useful when the packet includes several items or some items have already been accepted.

Accepted items must be resubmitted after cancellation. If the submission includes an app version, that version changes to Developer Rejected. A later resubmission starts the review process over.

## Verify Developer Rejected before editing the release

After cancellation, don't treat the confirmation click as the final state. Apple defines a submission status of **Processing** while the removal action is being handled. When processing finishes, the submission moves to **Completed** in the App Review section.

Verify both layers:

- the app version shows **Developer Rejected**;
- the cancelled submission is no longer active in App Review;
- the withdrawal receipt lists every item that must be reviewed again.

Developer Rejected means you withdrew the version. It doesn't mean App Review rejected it for a guideline violation. It also doesn't remove a live app from sale, roll back an existing public version, or delete the app record.

## Correct the smallest necessary scope

Turn the withdrawal reason into explicit corrective work:

| Problem found | Corrective record |
| --- | --- |
| Wrong build selected | Intended version and replacement build, plus proof that the replacement passed the required tests |
| Release-blocking binary defect | Reproduction, fix scope, regression checks, and new candidate build |
| Inaccurate screenshot or app preview | Affected device sizes and localizations, replacement assets, and build-to-asset verification |
| Incorrect metadata or review instructions | Exact field, corrected text, supporting evidence, and reviewer path |
| Unready related item | Item name, whether it still belongs with this version, and its readiness owner |
| Release timing or dependency changed | New release condition, owner, and go/no-go check |

Don't turn a withdrawal into an unbounded cleanup sprint. Fix what made the submitted packet untrustworthy, then rerun the checks affected by that change. A binary replacement needs focused regression testing. A screenshot correction needs a device-size and localization pass. New reviewer instructions need a clean walkthrough using the supplied account and setup.

For a production defect that requires a replacement version, use the more detailed [iOS hotfix release process](/blog/ios-hotfix-release-process/). For a routine submission, keep the correction attached to the same release record.

## Resubmit with a fresh handoff receipt

The **Developer Rejected** definition allows you to resubmit the build or submit a new build. A new binary isn't automatically required; the necessary correction determines whether the build must change.

Before resubmitting:

- verify the app version and selected build;
- recheck every corrected field and asset;
- restore every accepted item that still belongs in the submission;
- confirm related items are ready to be reviewed together;
- update App Review notes for the actual candidate;
- rerun any checklist steps invalidated by the correction.

Then follow the normal two-stage handoff: **Add for Review** puts the version into a draft, and **Submit for Review** sends that draft to Apple. The [App Store Connect draft-submission guide](/blog/app-store-connect-draft-submissions/) explains why **Ready for Review** isn't proof that Apple has received it.

Record the second handoff separately:

```text
Version and build resubmitted:
Corrected fields or items:
Restored accepted items:
Submitted by:
Submitted at:
App Store Connect status after submission:
Next verification:
```

This creates a traceable pair: why the first packet was withdrawn, and what changed before the second packet entered the queue.

## Track the correction in LaunchBuddy without confusing the systems

LaunchBuddy can hold the release, version-scoped correction tasks, and submission checklist on iPhone, iPad, and Mac. Default submission checklists are available on the Free plan, within its two-app and two-release limits; custom checklists require Pro.

A withdrawal checklist could contain:

```text
[ ] Copy the current App Store Connect status and packet contents
[ ] Record the withdrawal reason and affected items
[ ] Cancel in App Store Connect
[ ] Verify Developer Rejected and completed processing
[ ] Correct and test the affected scope
[ ] Recheck build, metadata, assets, and review notes
[ ] Reassemble the draft submission
[ ] Submit for Review
[ ] Record Apple's new status
```

LaunchBuddy does not cancel an Apple submission, select or upload a build, or resubmit the app. App Store Connect remains the source of truth for the packet, official status, and review handoff. Use LaunchBuddy for the work and evidence around those Apple-side actions. The broader [App Store submission tracker](/blog/app-store-submission-tracker/) shows how to keep that boundary visible through the rest of a release.

## Common mistakes after removing a submission

### Assuming only the app version was affected

Other items in the submission leave the queue too. Rebuild the packet from your withdrawal receipt instead of relying on memory.

### Forgetting accepted items

Cancellation doesn't preserve their accepted state for a future submission. Apple explicitly requires accepted items to be resubmitted.

### Uploading a new build when the build didn't change

Developer Rejected allows either resubmitting the build or using a new one. Let the correction decide. A binary defect needs a corrected build; a permitted non-binary correction may not.

### Stopping at Add for Review

Add for Review creates or updates a draft. You still need Submit for Review, followed by a status check in App Review.

### Reading Developer Rejected as an Apple rejection

The status records your withdrawal. Preserve the real reason in your release notes so the team doesn't later invent a guideline problem that never happened.

## Withdraw deliberately, then prove the new packet

Removing a submission is appropriate when the current build or review packet is no longer safe to release. Inspect the status and contents, preserve a receipt, cancel through App Store Connect, verify Developer Rejected, and resubmit only after the affected checks pass again.

<a href="https://apple.co/3iFcjjW">Create the correction tasks and resubmission checklist in LaunchBuddy</a>.
