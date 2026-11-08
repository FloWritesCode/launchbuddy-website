---
title: "Apple-Hosted Asset Packs: Upload, Test, and Submit Them"
description: "Use this Apple-hosted asset pack workflow to coordinate packaging, upload, TestFlight testing, compatibility, App Review, replacement, and recovery."
pubDate: 2026-11-08
---

**Apple-hosted asset packs are additional app content that you package separately, upload to App Store Connect, test through TestFlight, and submit to App Review.** The reliable workflow is to track two release artifacts—the app build and each asset pack version—then prove that the exact combination works before submitting it. A processed pack isn't automatically approved for external testers or the App Store.

This guide covers Apple-Hosted Background Assets, not screenshots, app previews, or a self-hosted CDN. It also keeps packaging and download behavior in Xcode, TestFlight state in App Store Connect, and release decisions in your project plan.

## Start with an app-build-to-asset-pack contract

An asset pack can change independently of the app build, but compatibility can't be assumed. Before packaging anything, create a small contract for every app build that depends on hosted content:

| Release field | Example |
| --- | --- |
| App version and build | 3.2 (410) |
| Asset Pack ID | `Tutorial` |
| Required pack version | Latest processed upload from November 8 |
| Download policy | Essential |
| Supported platforms and OS | iOS 26 and later |
| Internal test result | Pass |
| External test result | Pending |
| Failure behavior | Show a retry state; don't enter the tutorial |
| App Store submission plan | Submit build and pack together |

Apple assigns each upload an incrementing asset pack version, so replace the date with the version shown in App Store Connect after processing. Keep the stable Asset Pack ID and changing pack version as separate fields.

This contract prevents a subtle release mistake: testing one pack with the build, then submitting or replacing a different pack because both share the same ID.

## 1. Confirm that Apple hosting fits the release

Apple's [Managed Background Assets overview](https://developer.apple.com/help/app-store-connect/manage-asset-packs/overview-of-apple-hosted-asset-packs) says apps targeting iOS 26, iPadOS 26, macOS 26, tvOS 26, and visionOS 26 or later can use the framework. Apple-Hosted Background Assets are available for App Store apps on those platforms, but not watchOS.

Use an Apple-hosted pack when all of these are true:

- the app can use the Managed Background Assets framework;
- the content should download separately from the app build;
- Apple hosting is preferable to operating your own server or CDN;
- the app has a defined state for unavailable, delayed, or failed content;
- you can test the exact build-and-pack combination before release.

Apple currently allows up to **200 asset packs** and **200 GB of compressed hosted assets per app record**, shared across the app's platforms. The total isn't a sum of every historical upload: Apple's [size-limit reference](https://developer.apple.com/help/app-store-connect/reference/app-uploads/apple-hosted-asset-pack-size-limits/) explains how it uses eligible versions when calculating each pack's contribution. Check the live reference rather than treating those limits as permanent.

## 2. Package and test the content locally

Create the manifest and archive with Apple's Xcode packaging tool, or use the Managed Background Assets Developer Tools for Linux where supported. The manifest defines:

- the stable Asset Pack ID your code requests;
- an `essential`, `prefetch`, or `onDemand` download policy;
- the files and directories to package;
- the supported platforms.

Apple's [asset-pack creation guide](https://developer.apple.com/documentation/backgroundassets/creating-managed-asset-packs.md) provides the current commands and manifest schema. Use that source instead of copying an old manifest from another project.

Test locally before uploading. At minimum, cover:

1. first installation;
2. a subsequent app update;
3. an interrupted or failed download;
4. an app launch before an on-demand pack is available;
5. a pack replacement with existing local content;
6. every platform listed in the manifest.

The test result belongs to the specific app build and archive checksum or version in your release record. “Asset pack tested” is too vague to reproduce later.

## 3. Upload the pack and wait for processing

Apple's [upload instructions](https://developer.apple.com/help/app-store-connect/manage-asset-packs/upload-apple-hosted-asset-packs/) support Transporter, the App Store Connect API, `iTMSTransporter`, and `altool` for hosted asset pack uploads. An App Store Connect user with the Account Holder, Admin, App Manager, or Developer role can upload.

The pack is uploaded independently of the app build. Apple then processes it before it appears in App Store Connect and sends an email when processing finishes.

Don't mark the pack test-ready when the upload command succeeds. Record these separate checkpoints:

```text
Asset Pack ID:
Local archive:
Upload method:
Uploaded at:
App Store Connect version:
Processing status:
Processing email received:
```

Apple's [asset-pack status reference](https://developer.apple.com/help/app-store-connect/reference/app-uploads/apple-hosted-asset-pack-statuses/) distinguishes **Awaiting Upload**, **Processing**, **Failed**, and **Ready for Internal Testing**. If Awaiting Upload or Processing lasts more than 24 hours, Apple directs developers to contact support. A Failed version must be corrected and redelivered.

## 4. Test the latest processed pack internally

For internal TestFlight testing, Apple automatically uses the latest processed version of an asset pack once a build is available and testers have been invited. Apple's [TestFlight instructions for hosted packs](https://developer.apple.com/help/app-store-connect/test-a-beta-version/test-apple-hosted-asset-packs/) also define the separate external-review flow. That convenience creates a version-control risk: another upload can change what internal testers receive without changing the app build.

Use this sequence:

1. upload the intended app build;
2. wait for the intended pack to reach **Ready for Internal Testing**;
3. record the pack version visible in TestFlight;
4. install or update through TestFlight with an internal tester;
5. exercise the pack's download policy and failure path;
6. freeze further pack uploads until the result is recorded.

Testers must sign in on the device with an Apple Account that has access to the beta app. Apple states that Sandbox accounts aren't supported for these TestFlight downloads.

If a new pack version becomes the latest processed version during the test, treat the prior result as evidence for the prior pack—not as approval of the replacement.

## 5. Submit one pack version for external TestFlight

External testing has a separate gate. You select a pack version and submit it to TestFlight App Review. Only one version of each asset pack can be in external testing at a time.

Apple also requires an externally testable build before its associated packs can be submitted. In App Store Connect:

1. open the app's **TestFlight** tab;
2. under **Builds & Assets**, choose **Asset Packs**;
3. choose **Set Up External Testing** for the first version or **Replace** for a later one;
4. select the intended version;
5. choose **Submit for Review**.

After approval, TestFlight automatically uses that version for external testers when an eligible build and invited testers are available. A replacement supersedes the previous external-testing version.

Use the [TestFlight release management workflow](/blog/testflight-release-management/) to route findings into “blocks this release,” “next version,” or “no action.” Add two fields for hosted content: the tested pack version and whether the result came from internal or external testing.

## 6. Reconcile build and pack compatibility

Before App Store submission, compare all tested combinations. A compact matrix exposes gaps:

| App build | Pack version | Internal | External | Release decision |
| --- | --- | --- | --- | --- |
| 410 | 7 | Pass | Pass | Candidate |
| 410 | 8 | Pass | Not tested | Hold |
| 411 | 8 | Pass | Pending | Hold |

Don't infer that build 411 works with pack 7 because build 410 did, or that external approval of pack 7 proves pack 8. Decide which combinations the app must tolerate, then test those combinations.

If the app requires the new pack to function, keep the app build and pack in the same App Review submission. If the pack is independently compatible with the live app, a separate submission may be appropriate after the first app version has been approved.

## 7. Submit the exact pack version to the App Store

Asset packs need App Review before App Store distribution. The Account Holder, Admin, or App Manager role can submit them.

Apple's current [asset-pack submission instructions](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-apple-hosted-asset-packs/) set these grouping rules:

- include the pack with the first app version if the app hasn't been approved yet;
- after approval, submit a pack with or without an app version;
- include the pack with a new app version when that version requires the new pack;
- include no more than ten different packs in one submission, with one version of each;
- don't submit a pack made with a beta packaging tool.

Choose **Add for Review** for the intended pack version, inspect the draft submission, then choose **Submit for Review**. Ready for Review means the pack is still in a draft. Waiting for Review means Apple received the submission. The [draft-submission guide](/blog/app-store-connect-draft-submissions/) explains that handoff in detail.

If a pack is submitted without an app version, or the draft contains items for multiple platforms, Apple asks you to select a platform. The items are reviewed with the latest version of that platform.

After approval, the new pack version becomes available to App Store users and replaces the previous version. Verify **Ready for Distribution** in App Store Connect; don't use internal checklist completion as proof that distribution finished.

## Treat localized packs as a separate release path

Localized asset packs start with the OS 27 generation. Apple says each localized pack version maps to one BCP-47 language identifier, and devices on earlier OS versions don't receive localized packs. If no exact language matches, the system can choose a related regional language or the app's primary language.

That requires more than translating filenames. Add a locale matrix:

```text
Language tag:
Pack ID and version:
App language:
Fallback language:
OS 27 test device:
Internal TestFlight:
External TestFlight:
App Store availability confirmed in current Apple docs:
```

Apple's [September 16, 2026 App Store Connect update](https://developer.apple.com/help/app-store-connect/release-notes/) confirms that localized Apple-hosted asset packs can now be submitted for App Store distribution. Follow the standard submission flow, but test OS 27 language selection and fallback behavior separately. Creating and testing localized packs isn't supported by the Linux developer tools; Apple directs developers to the Xcode packaging tool.

## Replace or recover without erasing the evidence

A replacement isn't a rollback switch. Uploading and approving a newer version supersedes the version previously used in that channel. Keep the prior compatibility result and reason for replacement in the release record.

Archiving is much more destructive. Apple says archiving a pack:

- removes every version from App Store Connect;
- removes versions in TestFlight and live on the App Store;
- can't be undone;
- prevents reuse of that Asset Pack ID.

It is also blocked during several processing and review states. Use archive only as a deliberate retirement action, not as cleanup for one bad upload.

For a failed or rejected version, preserve:

```text
App build:
Asset Pack ID and version:
Channel: processing / internal / external / App Store
Observed status:
Apple message:
Reproduction:
Replacement version:
Retest owner:
Retest result:
```

This turns a red status into a bounded recovery path instead of an untracked re-upload.

## Track the release in LaunchBuddy without overstating the integration

LaunchBuddy can represent these gates as version-scoped tasks or checklist items and preserve compatibility decisions and review results in project notes. Its default App Store submission checklists are available on Free; reusable custom checklists require Pro.

LaunchBuddy doesn't package, upload, host, validate, or distribute Apple-hosted asset packs. It also doesn't replace the status shown in App Store Connect. Use Apple's tools for the artifact and official state; use LaunchBuddy for the owners, decisions, evidence, and release sequence around it.

Add the pack-specific checks to the broader [App Store Connect release checklist](/blog/app-store-connect-release-checklist/), then complete each check only after recording the matching build and pack versions.

## Ship the build and content as one verified release

The safe sequence is: define compatibility, package and test locally, upload, wait for processing, test the latest version internally, select and submit one version for external TestFlight review, reconcile the build-pack matrix, submit the intended asset-pack version, and verify distribution.

If that sequence is hard to keep beside the rest of your release work, <a href="https://apple.co/3iFcjjW">download LaunchBuddy and add these gates as version-scoped tasks—or, with Pro, a reusable custom checklist—for your next release</a>.
