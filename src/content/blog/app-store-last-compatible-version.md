---
title: "App Store Last Compatible Version: How to Manage Old Downloads"
description: "Manage App Store last compatible versions for existing customers, exclude unsafe releases, and test redownloads after raising your minimum iOS version."
pubDate: 2026-11-13
---

Apple's **Last Compatible Version Settings** control which previously submitted app versions existing customers can download from iCloud. Use them to exclude an older version with a legal or usability problem. Don't use them as a rollback button, a way to offer an old build to new customers, or proof that the old app still works.

To change the setting in App Store Connect:

1. Open the app and select **Pricing and Availability**.
2. Scroll to **Last-Compatible Version Settings** and select the available version.
3. Deselect any version that shouldn't remain downloadable, then click **Done**.
4. Click **Save**.

Apple limits this action to the Account Holder, Admin, or App Manager roles. Only versions submitted to the App Store appear in the list.

The click path is short. The harder decision is whether an old build remains safe and useful after you raise the current release's minimum OS version. This guide turns that decision into a support policy, a version record, and a repeatable test.

## Understand what the last compatible version setting does

Apple defines [Last Compatible Version Settings](https://developer.apple.com/help/app-store-connect/reference/pricing-and-availability/app-pricing-and-availability/) as the app versions available for existing customers to download from iCloud. Its separate [version-removal instructions](https://developer.apple.com/help/app-store-connect/manage-your-apps-availability/make-a-version-unavailable-for-download) tell developers to exclude versions with legal or usability issues.

That makes the setting a narrow distribution control:

| Question | What the setting controls |
| --- | --- |
| Can a previous customer redownload an eligible old version? | Which submitted versions Apple may make available from iCloud |
| Can a first-time customer on an older OS acquire that old version? | No. The setting is for existing customers, not new acquisition |
| Does deselecting a version remove installed copies? | Apple documents a download-availability change, not a remote disable control |
| Does it restore an old version as the public App Store release? | No. Apple says a released app can't be reverted; a replacement requires a new version |
| Does an available old binary still work with your service? | The setting can't answer that. You must test its accounts, backend, purchases, and required content |

The app's minimum OS requirement is a separate build property. Apple's [`MinimumOSVersion` reference](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html) says Xcode writes the deployment target into the built app and the App Store uses it to indicate supported OS releases. When a new public version raises that floor, Last Compatible Version Settings determine which earlier submitted versions remain available to existing customers. They don't lower the new binary's deployment target.

Keep this distinction clear:

```text
Current release eligibility = the submitted build's minimum OS
Previous-release eligibility = prior download + device compatibility + Apple's availability controls
Actual usefulness = your old binary and every dependency it still needs
```

## Decide whether an old version should remain downloadable

Start with the version most likely to serve customers below the new OS floor. Record its exact marketing version and build number; “the old version” is too vague for support or testing. The [version number versus build number guide](/blog/ios-version-number-vs-build-number/) explains why a handoff such as `4.8.2 (391)` is safer than naming only the release.

Then review five gates.

### 1. Legal and policy gate

Exclude a version if continuing to distribute it would preserve a known legal or policy problem. Examples might include content you no longer have the right to distribute or a flow that no longer meets an applicable obligation. This is a decision for the developer and qualified advisers, not for a project-management tool.

Apple gives a stricter instruction when the affected version is the current **Ready for Distribution** release: submit an update and clearly describe the prior version's legal or usability issue. If you can't submit an update, Apple says to remove the app from the App Store. Last Compatible Version Settings are not a way to leave a defective current release untouched.

### 2. Core-usability gate

Test the old binary on an OS version that can't install the new release. Check the complete first useful session, not only launch:

- Authentication, account recovery, and account deletion
- Local data opening, migration, sync, and export
- Required web content, certificates, and API responses
- Purchases, entitlement refresh, and restore behavior
- Support, privacy, and legal links
- Any feature that must remain available because of a customer promise

An app that opens but can't authenticate or load required data isn't a useful fallback.

### 3. Backend-compatibility gate

An old client can outlive the API behavior it expects. Before promising continued access, identify:

- The oldest client protocol the production backend accepts
- Fields, endpoints, authentication methods, and certificates the old build requires
- Whether a server-side migration removes data the old build needs
- The owner and end date for that compatibility path
- The response old clients receive after support ends

Don't call an old version “supported indefinitely.” Apple can make a binary available for redownload, but it doesn't maintain your servers, domains, third-party SDK services, or customer data.

### 4. Commerce and entitlement gate

Test with representative product states. A durable purchase should restore correctly; an active subscription should resolve to the right access; a removed product shouldn't leave the app in a misleading purchase loop. Use designated test accounts with no live customer data and Apple's supported test environments where appropriate.

Download availability and entitlement availability are separate. Apple also notes in its [redownload instructions](https://support.apple.com/en-us/102417) that in-app purchases aren't redownloaded like apps, although some can be restored. Your StoreKit and backend logic must still produce the intended access.

### 5. Support-commitment gate

Decide what you'll support before leaving the version available:

- Which old OS and app-version pair is covered?
- Is support limited to redownload and existing data, or does it include live service?
- Which defects will receive a compatibility update?
- What event ends support: a date, certificate expiry, backend migration, or unresolved risk?
- How will customers learn about the boundary?

This isn't a promise to keep every historical release alive. It is a deliberate choice about one verified fallback.

## Create a last-compatible-version record

Keep the decision beside the release work so a future update doesn't silently inherit an outdated assumption.

```text
App:
Current public version and build:
Current minimum OS:
New version and build:
New minimum OS:

Candidate last compatible version and build:
Old OS/device tested:
Existing-customer test account:
Why this version remains available:

Legal/policy review:
Core workflow result:
Backend and certificate dependencies:
Purchase and entitlement result:
Support URL and customer message:

Excluded versions and reasons:
Decision owner:
App Store Connect changed by:
Change date:
Recheck trigger:
Evidence links:
```

Avoid storing credentials, identity documents, purchase tokens, or other secrets in this record. Link to access-controlled evidence instead.

The **recheck trigger** is important. Good triggers include a minimum-OS increase, authentication change, API removal, certificate rotation, purchase migration, or legal finding. A calendar review alone may miss the release that actually breaks the fallback.

## Exclude an unsafe previous version in App Store Connect

Once the decision record identifies a version that must not be downloadable:

1. Sign in to App Store Connect with an Account Holder, Admin, or App Manager role.
2. Open **Apps**, choose the app, and select **Pricing and Availability**.
3. At the bottom of the page, find **Last-Compatible Version Settings** and select the available-version control.
4. Deselect each version with the documented legal or usability issue.
5. Select **Done**, then **Save** in the top-right corner.
6. Record the actor, date, versions changed, and reason.

Apple says only submitted App Store versions appear there. An internal archive or TestFlight-only build isn't a candidate merely because it has a lower deployment target.

If the issue is later resolved, Apple's instructions allow you to select the version again. Repeat the evidence review before doing that; a fixed legal concern doesn't prove that an old backend or sign-in flow still works.

## Verify the customer path, not just the saved setting

A saved App Store Connect value is configuration evidence, not customer evidence. Use two clean-device tests on the same older OS when practical:

1. **Existing-customer path:** use an Apple Account that previously obtained the app, open **App Store → account → Apps & Purchase History → Your Apps**, and attempt the redownload.
2. **First-time-customer path:** use an account that has never obtained the app and verify that the old release isn't offered as a new-acquisition path.

For the existing-customer path, record:

- Whether the Apple Account previously obtained the app, without storing its credentials
- Device model and OS version
- Version and build installed
- Date, storefront, and result
- Launch, sign-in, data, backend, restore, and support checks
- Any discrepancy between expected and observed behavior

Apple's public help documents the purchase-history redownload path, but it doesn't promise that every app is available on every device. Test the exact combination you intend to support instead of assuming a saved setting guarantees delivery.

If you can't reproduce the customer state safely, state that limitation in the record. Don't replace a missing test with confidence.

## Worked example: raising the minimum OS

Suppose version `5.0 (420)` raises the minimum from iOS 17 to iOS 19. Version `4.9.3 (407)` is the proposed fallback.

| Check | Evidence | Decision |
| --- | --- | --- |
| Version identity | `4.9.3 (407)` was the last submitted iOS 17 build | Candidate identified |
| Legal/usability | No known distribution-blocking issue; critical flows pass | Continue review |
| Backend | API contract remains supported until 2027-06-30 | Set a recheck before that date |
| Entitlements | Existing subscription and non-consumable restore pass | Record test accounts and date |
| Communication | Support page names iOS 17 boundary and limited-support end date | Link from support response |
| Redownload | Prior customer installs `4.9.3` on a clean iOS 17 device | Keep selected |
| New customer | No promise of acquiring `4.9.3` on iOS 17 | Acquisition boundary documented |

The useful artifact isn't the sentence “keep 4.9.3.” It's the dated contract connecting that choice to a real build, backend window, entitlement evidence, customer message, and next review.

If a severe usability issue is later found in `4.9.3`, deselecting it can stop future redownloads of that version. It still doesn't patch installed copies or revert `5.0`. Apple requires a new submitted version to replace a problematic public release, so use a [fix-forward hotfix process](/blog/ios-hotfix-release-process/) when the live app itself needs correction.

## Track the policy with the release

Treat a minimum-OS increase as release scope, not a build-setting footnote. Add tasks for the affected-device estimate, candidate fallback, old-client tests, customer message, App Store Connect change, and clean-device verification. The broader [iOS release management workflow](/blog/ios-app-release-management/) shows how to keep those decisions attached to one app version.

LaunchBuddy can hold the app, version, release tasks, project notes, and submission checklist across iPhone, iPad, and Mac through iCloud sync. Default submission checklists are included in the Free plan within its two-app and two-release limits; custom checklists require Pro.

LaunchBuddy doesn't read an archive's minimum OS, choose or change Last Compatible Version Settings, test an old binary, or roll back an App Store release. Xcode and the built app remain authoritative for compatibility; App Store Connect remains authoritative for version availability; your tested dependencies determine whether the fallback is genuinely usable.

Before your next minimum-OS increase, <a href="https://apple.co/3iFcjjW">download LaunchBuddy and turn the compatibility decision into release tasks</a>.
