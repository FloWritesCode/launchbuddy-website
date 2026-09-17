---
title: "App Store Universal Purchase: How to Add Platforms Safely"
description: "Set up an App Store universal purchase with one app record, a shared bundle ID, platform-specific builds, metadata checks, and an irreversible-change plan."
pubDate: 2026-09-17
---

**To create an App Store universal purchase, keep the related platform apps in one App Store Connect app record, use the same bundle ID for each platform target, add the new platform in App Store Connect, upload its platform-specific build, complete its metadata, and submit it to App Review.** After Apple approves at least two platform versions, the app becomes a universal purchase.

Make the record decision before uploading. Apple says separate app records can't be merged, and once the app becomes a universal purchase, you can't remove one platform version from its record. The safe workflow is therefore: choose the surviving record, verify identifiers and customer consequences, prepare every target, then add and submit the platform.

## 1. Confirm that universal purchase is the right model

Apple defines [universal purchase](https://developer.apple.com/help/glossary/universal-purchase/) as offering related iOS, iPadOS, macOS, tvOS, and visionOS apps together through one App Store Connect record. Each platform has its own build, while the apps share a bundle ID. Platform-specific App Store information can differ where Apple permits it.

Universal purchase is not an [App Store app bundle](/blog/app-store-app-bundles/). An app bundle groups separate app products on a bundle product page. Universal purchase presents platform versions of one app as a single purchase.

Use universal purchase when the platform versions are genuinely one product:

- They deliver the same core customer promise.
- A customer who obtains one version should receive the included versions.
- Shared app-level identity, age rating, and purchase positioning are accurate.
- Platform differences can be explained honestly in each platform's description and screenshots.

Don't use it merely to reuse a name or cross-promote unrelated apps. One record creates shared customer and operational consequences.

Create a short decision record before opening App Store Connect:

```text
Product promise shared across platforms:
Platforms included now:
Platforms deliberately deferred:
Surviving App Store Connect record:
Shared bundle ID:
Existing customers affected by a record change:
Platform-specific features or exclusions:
Purchase and subscription paths to retest:
Owner and evidence required before submission:
```

This document becomes the acceptance test for the setup. If the platform apps need different identities, ownership, pricing promises, or long-term release plans, stop and reconsider the one-record model.

## 2. Resolve existing app records before changing anything

The cleanest path is to start with one app record and add platforms to it. If the related apps already use separate App Store Connect records, Apple's [Add platforms guide](https://developer.apple.com/help/app-store-connect/create-an-app-record/add-platforms/) says those records can't be merged.

Apple's documented migration path is consequential:

1. Choose one app record to keep.
2. Remove the other platform versions from sale.
3. Add those platforms to the surviving record.
4. Upload and submit replacement platform builds there.

Removing a separate record from sale makes its original product page unavailable. Apple also warns that you can no longer update existing users through that record, and its ratings and reviews don't transfer to the new product page.

Treat that as a customer migration, not housekeeping. Before proceeding, record:

| Question | Evidence to collect |
| --- | --- |
| Which record survives? | Current customers, ratings, product-page links, purchase setup, and support history |
| Who loses updates from an old record? | Installed-customer and support impact for that platform |
| Which links change? | Website, campaign, documentation, support, and in-app links |
| What doesn't transfer? | Ratings, reviews, and any platform record context Apple doesn't carry over |
| How will customers be informed? | Support copy and a dated communication owner |

If you can't accept those consequences, don't remove a record simply to reach a universal-purchase layout.

## 3. Prepare one identifier and separate platform targets

Each added platform uses the same Apple ID, SKU, and bundle ID as the existing app record. In Xcode, macOS, tvOS, and visionOS builds must come from separate targets whose bundle IDs match the iOS app's bundle ID.

Apple's [App ID registration documentation](https://developer.apple.com/help/account/identifiers/register-an-app-id/) says an explicit App ID should match the target's bundle ID. A single App ID can support iOS, macOS, tvOS, and watchOS apps, but not every capability is eligible on every platform. Configure and test each target rather than assuming that a shared identifier makes its entitlements equivalent.

Use this target matrix:

| Check | iOS/iPadOS | macOS | tvOS | visionOS |
| --- | --- | --- | --- | --- |
| Target exists and archives |  |  |  |  |
| Bundle ID matches surviving record |  |  |  |  |
| Required capabilities are valid |  |  |  |  |
| Signing and provisioning pass |  |  |  |  |
| Purchase and restore paths pass |  |  |  |  |
| Account or data continuity passes |  |  |  |  |
| Platform exclusions are documented |  |  |  |  |

Version numbers and build strings don't have to match across platforms. Keep the exact pair for every candidate, such as `iOS 3.2 (184)` and `macOS 1.0 (27)`, and follow a consistent [version-number and build-number workflow](/blog/ios-version-number-vs-build-number/).

There are two special boundaries worth checking:

- To support both iPhone and iPad, the iOS app itself must support both devices.
- An Apple Watch counterpart ships with its iOS app from the same Xcode project. A watch-only app can't be part of a universal purchase.

Mac Catalyst has its own compatibility history, so verify Apple's current guidance for the Xcode version used by the existing Mac app before changing its record.

## 4. Map shared and platform-specific App Store information

One app record does not mean one identical product page for every device. Apple's [app information reference](https://developer.apple.com/help/app-store-connect/reference/app-information/app-information/) describes shared app-level properties, while its [platform version reference](https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information/) lists information maintained for each platform version.

Build a field ownership map before copying text:

| Layer | Examples | Review question |
| --- | --- | --- |
| Shared app record | Name, subtitle, bundle ID, SKU, Apple ID, age rating | Is this accurate for every included platform? |
| Platform version | Description, screenshots, app previews, keywords, support and marketing URLs, version number, release setting | Does this describe the actual build on this platform? |
| App Review information | Contact details, notes, and demo account when required | Can the reviewer exercise this platform's non-obvious flows? |

When you add a platform, App Store Connect transfers metadata from the existing platform except promotional text, description, and screenshots. Empty fields are obvious; copied fields are the larger risk. Review every transferred value instead of treating inheritance as approval.

For example, a Mac version may use a different navigation model and omit a phone-only camera workflow. Its description and screenshots should say so. Shared copy must not promise that feature across every included platform.

## 5. Add the platform in App Store Connect

The Account Holder, Admin, or App Manager role can add a platform. Use Apple's current interface instructions as the source of truth:

1. In **Apps**, open the app record that will survive.
2. In the sidebar, select **Add Platform**.
3. Choose the platform and select **Add**.
4. Review the new platform version, which initially appears as version `1.0`.
5. Change the version number if needed.
6. Complete and verify the platform's metadata.

Don't add a platform as a placeholder unless the identifiers, target, and migration decision are settled. Apple only documents deletion in a narrow pre-upload state: no build has ever been uploaded for that platform, at least one existing platform version has an editable status, and an Account Holder or Admin performs the deletion.

The practical last reversible point is therefore **before the first platform build upload**. Put an explicit approval gate there:

```text
Approve first upload only when:
- The surviving record is confirmed
- Customer migration consequences are accepted
- The platform target uses the intended shared bundle ID
- Shared metadata is accurate
- Platform-specific copy and screenshots are ready
- Purchases, accounts, and data behavior have a test plan
```

## 6. Upload, test, and submit each platform version

Archive and upload through an Apple-supported workflow. Apple's [build upload guide](https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds/) explains that App Store Connect uses the bundle ID and version number to associate an upload with the app and version record, while the build string identifies the build.

After processing:

1. Confirm the upload appears under the intended platform.
2. Verify its version and build string against the archive.
3. Run platform-specific TestFlight or release-candidate checks where available.
4. Test acquisition, purchase, restore, sign-in, data, and support paths that cross devices.
5. Check every screenshot and product-page claim against that candidate.
6. Add platform-specific App Review notes and working demo access when required.
7. Select the intended build and run your [App Store Connect release checklist](/blog/app-store-connect-release-checklist/).
8. Submit the platform version and record its official status.

Universal purchase is Apple's distribution model for giving customers cross-platform access to the app and its in-app purchases. It doesn't prove your account system, cloud data, feature flags, receipt handling, or platform UI works across those devices. Those are implementation claims that your builds must earn through testing.

Release timing also deserves an explicit decision. Platform versions can have different version and build numbers, and their readiness may differ. Record whether you are submitting together or sequencing the added platform after the existing version, then verify the public product page and acquisition path on each supported platform after approval.

## 7. Verify the irreversible transition

Apple says the app becomes a universal purchase after App Review approves at least two platform versions. From that point, the app remains a universal purchase and a single platform version can't be removed from the app record.

Use a post-approval receipt:

```text
Approved platform versions:
Official statuses checked:
Public product page checked on each platform:
Single-purchase acquisition checked:
Purchase and restore checks completed:
Platform descriptions and screenshots checked:
Old links and support copy updated:
Known platform differences documented:
Next release owner for each platform:
```

This receipt separates three facts that are easy to blur: App Review approved a build, Apple presents the app as a universal purchase, and your cross-platform customer journeys actually passed.

## Where LaunchBuddy fits

LaunchBuddy can keep the app, planned releases, tasks, project notes, and submission checks together across iPhone, iPad, and Mac. Within the Free plan's two-app and two-release limits, release planning, taskboards, iCloud sync, and default submission checklists are included. Pro adds unlimited apps and releases, unlimited notes, and custom checklists.

For this workflow, keep one universal-purchase decision record and prefix operational tasks by platform:

```text
[Shared] Approve the surviving app record
[macOS] Verify bundle ID and archive 1.0 (27)
[iOS] Retest purchase restoration in 3.2 (184)
[Shared] Review age rating and product promise
[macOS] Verify the public product page after approval
```

LaunchBuddy doesn't merge App Store records, configure Xcode targets or capabilities, change bundle IDs, add platforms in App Store Connect, inspect uploaded binaries, or make an app a universal purchase. App Store Connect and the submitted builds remain authoritative. The useful role for LaunchBuddy is preserving the decision, platform ownership, evidence, and follow-up around Apple's workflow.

If you want those platform checks attached to the releases they protect, <a href="https://apple.co/3iFcjjW">download LaunchBuddy and organize your universal-purchase rollout</a>.
