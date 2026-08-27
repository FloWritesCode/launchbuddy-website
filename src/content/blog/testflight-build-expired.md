---
title: "TestFlight Build Expired: How to Restore Beta Access"
description: "Fix an expired TestFlight build by confirming its status, choosing or uploading a replacement, reassigning testers, and preventing the next gap."
pubDate: 2026-08-27
---

If a **TestFlight build expired**, confirm the exact version and build in App Store Connect first. A build that has passed Apple's 90-day availability window can no longer be used for TestFlight. Move testers to another eligible build, or upload a replacement with a unique build string, add it to the appropriate groups, and verify that a tester can install and open it.

Don't confuse an age-based expiration with a build that someone deliberately expired, removed from a group, or never assigned. Those cases can look similar to a tester, but the evidence and next action differ.

## Diagnose the expired TestFlight build before replacing it

Open **App Store Connect → Apps → your app → TestFlight → Builds → platform**. Find the exact version and build string reported by the tester, then compare what App Store Connect shows with this decision table.

| What you find | What it means | Next action |
| --- | --- | --- |
| App Store Connect shows **Expired** and the 90-day window has passed | Apple says the build can't be used for TestFlight | Select another eligible build or upload a replacement |
| A team member clicked **Expire Build** | Testing was stopped deliberately; Apple says internal and external testers can no longer install that build | Confirm why it was stopped before distributing a different build |
| The build is active in App Store Connect, but one tester sees an expiration message | The evidence doesn't establish an expired App Store Connect build | Verify the tester's exact build and group access; don't expire or replace a healthy build based on the message alone |
| The build is active but missing from the tester's group | This is an assignment problem, not age-based expiry | Add the eligible build to the intended group |

Apple's [build-status reference](https://developer.apple.com/help/app-store-connect/reference/app-build-statuses/) defines **Expired** as a build that has passed its 90-day availability window. Its [stop-testing instructions](https://developer.apple.com/help/app-store-connect/test-a-beta-version/stop-testing-a-build) describe the separate manual **Expire Build** action.

Use the upload record, status, build string, and group assignment as evidence. “It was the latest build” isn't specific enough once several builds exist.

### If only one tester reports “Beta Has Expired”

Ask the tester to open the app's page in TestFlight and report:

- The version and build shown
- The remaining testing days, if shown
- Whether another build is available
- The invitation or group they used
- The device and OS involved

Apple's tester-facing [TestFlight documentation](https://testflight.apple.com/) says the remaining testing time appears under the app name. If App Store Connect still shows the reported build as active, follow the assignment and access checks in [App Store Connect Help](/blog/app-store-connect-help/) or contact Apple with the exact identifiers. Avoid random configuration changes that could interrupt everyone else's beta.

## Restore testing in six steps

### 1. Record the interrupted test

Before moving anyone, preserve the release context that the expired build represented:

```text
App and platform:
Version and build:
App Store Connect status:
Upload date:
Tester groups:
Test objective:
Completed checks:
Open blockers:
Unreviewed feedback:
Replacement owner:
```

This prevents a fresh build from silently turning into a fresh test. Carry forward only unresolved checks; don't ask testers to repeat work without a reason.

App Store Connect lets you filter feedback by version, build group, and build. Review the old build's screenshots, comments, and crash feedback before switching. Apple's [tester-feedback guide](https://developer.apple.com/help/app-store-connect/test-a-beta-version/view-tester-feedback/) also says downloadable crash reports are available for 120 days, so build expiry and crash-report availability are different clocks.

### 2. Choose an existing build or prepare a replacement

First check whether another eligible build already contains the intended beta scope. If it does, you can assign that build instead of creating an unnecessary archive.

If no suitable build exists:

1. Confirm the code and configuration you intend to test.
2. Keep the same user-facing version when it still represents the same planned release, or change it when the release scope requires a new version.
3. Give the upload a unique build string.
4. Archive, validate, and upload through an Apple-supported tool.
5. Wait for processing and address any compliance action App Store Connect requests.

Apple's [upload documentation](https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds/) says the bundle ID and version number associate an upload with its app and version record, while the build string uniquely identifies the build. LaunchBuddy doesn't build, sign, inspect, or upload the binary.

### 3. Reapply build-specific test information

Write **What to Test** for the replacement, not for the beta program in general. Include:

- What changed since the expired build
- Which unfinished checks still matter
- The fixed or risky paths to revisit
- Known exclusions
- The replacement version and build

For example:

```text
Build 3.4 (128) replaces expired build 127.

Please verify:
- Sign in with an existing account.
- Create one offline item, reconnect, and confirm it syncs once.
- Recheck the settings crash reported on build 127.

Not in this build:
- The planned export redesign.
```

That note gives testers a reason to update and protects the release from accidental scope expansion.

### 4. Put the replacement in the correct tester groups

Internal and external distribution have different paths.

For an **internal group**, add the replacement manually unless the group's supported automatic-distribution setup already covers it. Apple notes that Xcode Cloud builds must always be added to internal groups manually.

For an **external group**, select the replacement and provide What to Test information. Apple's [external-tester instructions](https://developer.apple.com/help/app-store-connect/test-a-beta-version/invite-external-testers) say the first build added for external testing requires TestFlight App Review; later builds may not require a full review. Wait for the actual status rather than assuming immediate access.

Check that each group's device or OS criteria still match the replacement. A valid build assigned to the wrong group hasn't restored the interrupted test.

### 5. Notify testers with an exact handoff

For external testing, App Store Connect can notify testers automatically after approval if you selected that option. Otherwise, use **Notify Testers** after the build is approved.

Keep your message short and operational:

```text
Build 127 is no longer available in TestFlight.
Please install version 3.4 (128).

Retest: offline-item sync and the settings crash.
Already completed on 127: onboarding copy review.
Report feedback against build 128 by Friday.
```

Don't say the replacement fixed an issue unless that has been verified. “Please retest” is accurate; “fixed” is a conclusion.

### 6. Verify access from the tester side

The recovery isn't complete when the replacement says **Testing** in App Store Connect. Confirm with at least one intended tester that:

- The expected version and build appear in TestFlight
- The build installs or updates
- The app opens
- What to Test shows the replacement instructions
- New feedback is attributed to the replacement build

Then update the release record and close the interruption. Continue with the broader [TestFlight release-management workflow](/blog/testflight-release-management/) rather than treating restored access as release readiness.

## A worked expiration handoff

Suppose version 2.8 build 64 was uploaded on May 12 for a long external beta. New testers joined late, and build 64 reached the end of its availability window before purchase restoration was retested.

The useful recovery record is:

```text
Interrupted build: 2.8 (64)
Status: Expired
Unfinished objective: Purchase restoration on a previously subscribed account
Reviewed feedback: Builds 64 screenshots and crash comments checked

Replacement: 2.8 (65)
Reason for same version: Release scope remains version 2.8
What to Test: Purchase, reinstall, and restore path only
External group: Long Beta
Notification: Send after TestFlight App Review status allows testing
Done when: One intended external tester installs 65 and verifies the restore path
```

The key isn't the extra build. It's the explicit transfer of unfinished evidence from build 64 to build 65.

## Prevent the next TestFlight expiration gap

The 90-day clock starts when the developer uploads the build, not when a tester joins or a group begins using it. Adding late testers doesn't create a fresh 90-day window.

For every beta that might run for more than a few weeks, keep:

```text
Version and build:
Uploaded:
Availability ends:
Internal groups:
External groups:
Beta objective:
Replacement decision date:
Replacement owner:
Tester notice:
```

Set the **replacement decision date** before the expected end of testing, with enough room for implementation, upload processing, compliance work, and possible TestFlight App Review. The right lead time depends on your release and shouldn't be presented as an Apple guarantee.

Also separate two deadlines:

- **Build availability:** Apple's per-upload TestFlight window
- **Beta decision:** your deadline to ship, replace, pause, or stop the test

A beta can be technically available but no longer useful, or strategically unfinished while its build is about to expire. Tracking both dates makes that visible.

The [TestFlight feedback-management guide](/blog/testflight-feedback-management/) explains how to turn the remaining beta evidence into blockers, current-release tasks, follow-up work, or a deliberate no-action decision.

## Where LaunchBuddy fits

LaunchBuddy can keep the planned version and release tasks together across iPhone, iPad, and Mac. Add tasks such as “review expiry date,” “prepare replacement,” “update What to Test,” “verify group assignment,” and “confirm tester access.” LaunchBuddy includes default submission checklists; reusable custom checklists require Pro.

App Store Connect remains authoritative for TestFlight builds, statuses, tester groups, feedback, and notifications. LaunchBuddy's current website doesn't claim a TestFlight build-status or feedback inbox. It also doesn't expire or restore builds, assign testers, run TestFlight App Review, or upload binaries.

Use LaunchBuddy for the work and decision trail around the interruption; use App Store Connect and Apple-supported upload tools for the actual distribution actions.

## Frequently asked questions

### When does a TestFlight build's 90-day period start?

It starts on the day the developer uploads that build. Assigning it to a group later doesn't reset the period.

### Can a tester open a build after its testing period ends?

No. Apple's tester documentation says the beta build can no longer be opened after the testing period is over. The tester needs another available beta build or, when appropriate, the public App Store version.

### Does replacing an expired build require a new app version?

Not necessarily. If the planned release is still the same version, a new upload can remain associated with that version, but it needs a unique build string. If another eligible build already exists, assign that one instead. Change the user-facing version only when your release plan calls for it.

When your next beta needs a visible replacement owner and checklist, <a href="https://apple.co/3iFcjjW">organize the release in LaunchBuddy</a>.
