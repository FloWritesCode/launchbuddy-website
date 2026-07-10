---
title: "App Store Connect Help: Fix Common Release Problems"
description: "Get practical App Store Connect help for missing builds, TestFlight issues, submission errors, App Review rejections, permissions, metadata, and release status."
pubDate: 2026-07-10
---

Looking for App Store Connect help usually means one thing: something is blocking your release, and the dashboard is not making the next step obvious.

Your build may be missing. TestFlight may not be available. A required field may still show an error. The Submit for Review button may be disabled. Or App Review may have returned an issue that you are not sure how to resolve.

This guide covers the most common App Store Connect problems, what to check first, and when to contact Apple. It also shows how LaunchBuddy can keep the tasks around a release organized so the same problems are less likely to surprise you next time.

## Start with the type of App Store Connect help you need

Before changing anything, identify which layer is actually failing:

- **Account access:** You cannot sign in, see the app, or perform an action.
- **Build delivery:** The upload failed, is still processing, or does not appear.
- **TestFlight:** Testers cannot access a build or external testing is waiting for review.
- **App Store metadata:** A field, localization, screenshot, or URL is incomplete.
- **Submission:** You cannot add the version for review or submit the draft.
- **App Review:** Apple needs more information or rejected part of the submission.
- **Release:** The version is approved but not available as expected.
- **Payments or agreements:** A contract, banking, tax, pricing, or subscription issue is blocking progress.

This distinction matters because App Store Connect is only one part of the release system. A build issue may need to be fixed in Xcode. A permission issue may need an Account Holder or Admin. A rejection may require a message to App Review rather than a new binary.

## App Store Connect login and permission problems

If an app or action is missing, check your role before assuming the dashboard is broken.

App Store Connect permissions depend on both your role and, for some users, which apps they can access. The Account Holder has full access and is the only role that can complete certain account-level actions. Admins have broad team access, while App Managers, Developers, Marketing, Finance, and Customer Support users have more specific permissions.

Use this quick check:

1. Confirm that you signed in with the Apple Account invited to the correct team.
2. Check whether App Store Connect is showing the expected provider or organization.
3. Ask an Admin to verify your role and app access under Users and Access.
4. Confirm that any pending invitation has been accepted.
5. Check whether an updated agreement is waiting for the Account Holder.

If one teammate can see an app and another cannot, the cause is usually role or app-level access. Apple's [role permissions reference](https://developer.apple.com/help/app-store-connect/reference/role-permissions/) shows which roles can perform each task.

## App Store Connect build not showing

A build does not appear immediately after upload. Apple must process it before it becomes available in App Store Connect.

When a build is missing, verify:

- The upload completed successfully in Xcode, Transporter, or your CI system.
- The bundle ID matches the app record.
- The marketing version matches the App Store version you are preparing.
- The build number is unique for that version.
- You are looking at the correct platform and app.
- Apple has not emailed a processing error or warning.
- Export compliance questions are not waiting for an answer.

Open **Build Uploads** in App Store Connect to inspect delivery status. A failed upload should include errors or warnings that point to the next action. Fix the underlying problem and upload again.

Apple says a build that remains in **Processing** for more than 24 hours may have an issue. At that point, use Feedback Assistant or contact Apple and include the app name, bundle ID, version number, build number, upload time, upload method, and relevant logs.

For Apple's current upload options and requirements, see [Upload builds](https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds/).

## The build exists but cannot be selected

If the build appears under TestFlight but not in the version's Build section, check these common causes:

- The build's version number does not match the App Store version.
- The build is still processing.
- The build has a compliance question that has not been answered.
- The build is incompatible with the platform record you opened.
- A different build is already selected.
- The version is in a state that no longer allows build changes.

Before submission, App Store Connect lets you associate one build with an app version. You can change that selection until the version is submitted to App Review.

Do not choose a build based only on the highest number. Confirm that it is the release candidate your team actually tested. A simple [App Store Connect release checklist](/blog/app-store-connect-release-checklist/) can prevent a processed but unverified build from becoming the submission build.

## TestFlight help: build unavailable to testers

TestFlight has separate paths for internal and external testing, so first determine which group is affected.

For internal testers, check:

- The tester has the correct App Store Connect access.
- The tester was added to an internal group.
- The build was added to that group.
- The build is still active and has not expired.
- Required compliance information is complete.

For external testers, also check:

- Beta App Review has approved the build when approval is required.
- The external group includes the build.
- Testing information and contact details are complete.
- The public link is enabled if you use one.
- The tester accepted the invitation with the intended Apple Account.

If testers can install the app but report the wrong behavior, confirm the exact build number before debugging. TestFlight feedback only becomes useful release evidence when it is tied to the build that produced it.

Use the [TestFlight feedback management guide](/blog/testflight-feedback-management/) to turn screenshots, crashes, and comments into release decisions rather than leaving them scattered across messages.

## App Store metadata errors and missing fields

App Store Connect can block submission when required information is missing from the version, app record, or an item included in the submission.

Review these areas:

- App name, subtitle, description, keywords, and promotional text
- Screenshots and app previews for required device sizes
- Support URL, privacy policy URL, and marketing URL
- App Privacy answers
- Age rating
- Copyright
- Pricing and availability
- App Review contact information
- Demo account credentials and review notes
- In-app purchases, subscriptions, or other items submitted with the version
- Export compliance

Open every localization before assuming the default language is the only problem. A missing screenshot or required field in one locale can keep the version incomplete.

If you recently changed the app's positioning, review metadata as part of the release rather than editing random fields at submission time. LaunchBuddy can keep ASO experiments and metadata notes connected to the app, while the [App Store localization workflow](/blog/app-store-localization-workflow/) helps you manage copy across storefronts.

## Submit for Review button disabled or missing

Apple's current submission flow has two distinct actions:

1. Add the app version and any related items to a draft submission.
2. Open the App Review section and submit that draft for review.

Adding a version for review does not send it to Apple by itself.

If the button is disabled or unavailable, check:

- A build is selected.
- All required version metadata is complete.
- App Review information is complete.
- Required agreements are active.
- Your role is Account Holder, Admin, or App Manager.
- No unresolved submission prevents the change.
- Every included item is ready for review.
- You saved recent edits.

Apple's [Submit an app](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-an-app) guide shows the current sequence. If your interface does not match the guide, verify your role and the status shown beside the version before making more edits.

## App Review rejection help

A rejection does not always require a new build. Read the App Review message carefully and separate the issue into one of three categories:

### Metadata issue

If the binary works but the listing, screenshots, review notes, or other metadata are inaccurate, you may be able to correct the information and resubmit the same build.

### Information request

The reviewer may need credentials, steps to reach a feature, an explanation of app behavior, or supporting documentation. Reply in the App Review section with concise reproduction steps and attach evidence when useful.

### Binary issue

If the submitted app crashes, violates a guideline, or does not behave as described, fix the code, test the change, increment the build number, and upload a new build.

When replying to App Review:

- Address the exact guideline or question.
- Explain what changed.
- Give numbered steps to find the relevant feature.
- Provide working demo credentials when login is required.
- Avoid emotional or argumentative language.
- Attach a screenshot or short video if it removes ambiguity.

Apple allows you to correspond with the review team in App Store Connect. See [Reply to App Review messages](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/reply-to-app-review-messages/) for the current steps.

Keep the rejection message and resolution with the release. That context can improve future App Review notes and stop the same issue from recurring.

## Approved app not appearing on the App Store

Approval and release are separate events. If the version is approved but not live, check the release option selected for that version:

- **Manual release:** Someone must release the version.
- **Automatic release:** Apple releases it after approval.
- **Scheduled release:** Availability waits for the configured date.
- **Phased release:** The update rolls out gradually to users with automatic updates.

Also verify territory availability, pricing, agreements, and whether processing is still completing. App Store propagation can take time, so confirm the version status before changing configuration or submitting another build.

After release, check the public product page, download the live version, and verify its build. Then monitor reviews, crashes, subscriptions, and support messages.

## When to contact Apple Developer Support

Contact Apple when the issue cannot be resolved through the status, error message, official documentation, or a change you control.

Good reasons to escalate include:

- A build has remained in Processing for more than 24 hours.
- App Store Connect shows an unclear or contradictory status.
- A required action is unavailable despite the correct role.
- An account, agreement, payment, or tax issue cannot be completed.
- A submission appears stuck with no actionable message.
- App Review communication does not resolve a factual misunderstanding.
- There is a suspected App Store Connect service issue.

Prepare a useful support request before opening the ticket:

```text
App name:
Apple ID:
Bundle ID:
Platform:
Version:
Build:
App Store Connect team:
Current status:
Expected result:
Steps already tried:
Date and time of the issue:
Relevant error text:
```

Attach screenshots and logs, but remove API keys, passwords, and other secrets. A precise report is easier to route than "submission does not work."

Start with the official [App Store Connect Help](https://developer.apple.com/help/app-store-connect/) library. Use Apple's contact options from the relevant help page when documentation does not resolve the issue.

## A five-minute App Store Connect troubleshooting checklist

When release work is blocked, run this checklist in order:

- Confirm the app, team, platform, version, and build.
- Read the exact status and error text.
- Verify your App Store Connect role.
- Check email for processing, agreement, or review notices.
- Open Build Uploads and inspect warnings.
- Complete export compliance and required metadata.
- Review every localization.
- Confirm the intended build is selected.
- Check the App Review section for a draft or unresolved issue.
- Record what you changed before trying another fix.
- Escalate with complete identifiers and logs when the issue is outside your control.

Avoid changing multiple fields at once. A release becomes much harder to troubleshoot when nobody knows which change affected the status.

## Keep App Store Connect help from becoming release-day panic

App Store Connect is where the release is delivered, but it should not be the only place where the release is managed.

LaunchBuddy gives indie iOS developers a release command center for the surrounding work:

- Tie tasks to the version that will ship.
- Reuse App Store submission checklists.
- Keep the selected build and App Store Connect status visible.
- Capture TestFlight feedback and follow-up work.
- Draft release notes and review replies with AI.
- Track metadata decisions and ASO experiments.
- Save App Review context for the next submission.

When a problem appears, you can compare App Store Connect state with the release plan instead of reconstructing the whole story from memory.

For more automation without losing that context, read the [App Store Connect API workflow](/blog/app-store-connect-api-workflow/) and [App Store Connect MCP workflow](/blog/app-store-connect-mcp-workflow/).

## Get the release unblocked, then improve the system

The fastest path to App Store Connect help is to identify the blocked layer, read the exact status, and change only what the evidence supports. Check permissions before debugging the dashboard, check build processing before re-uploading, and check the App Review section before assuming a submission was sent.

Once the immediate issue is fixed, add the missing check to your next release. That turns a frustrating one-off problem into a better shipping workflow.

LaunchBuddy is designed to help you build that workflow on iPhone, iPad, and Mac.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy on the App Store</a>
