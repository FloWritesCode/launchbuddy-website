---
title: "App Store App File Size: How to Measure Every Build"
description: "Check App Store app file size by device variant, compare download and install size correctly, catch regressions, and turn the result into release work."
pubDate: 2026-11-28
---

To check an App Store app's file size, open the app in App Store Connect, choose **TestFlight**, select the platform and processed build, open **Build Metadata**, then choose **App File Sizes** under General Information. Compare the **download size** and **install size** for the same device variant. Don't use the uploaded `.ipa`, `.xcarchive`, or `.app` bundle as the customer-facing size.

Apple applies app thinning after upload, creating variants for different devices and operating-system versions. It later adds DRM and recompresses an approved app, so [Apple says the exact final size can't be known in advance](https://developer.apple.com/help/app-store-connect/manage-builds/view-builds-and-metadata/). Once the build is uploaded, App Store Connect is the most accurate source. Before then, use an Xcode app size report as an estimate.

## What the App Store size numbers mean

The phrase “app size” can refer to several different measurements. Record the label with the number instead of treating them as interchangeable.

| Measurement | What it tells you | Use it for |
| --- | --- | --- |
| Uploaded `.ipa`, `.xcarchive`, or `.app` | The artifact produced or uploaded during development | Identifying the build artifact, not estimating what customers download |
| Download size | The compressed size delivered over cellular or Wi-Fi | Download-cost and over-the-air warning checks |
| Install size | The disk space the app variant occupies after installation | Customer device-storage impact |
| Device variant | A thinned build for a target device and operating-system combination | Like-for-like comparisons between builds |
| Universal variant | Apple's broader compatibility variant for specific legacy and managed-distribution cases | Investigating that distribution path, not standing in for every current device |

Build Metadata may also show compressed file size, essential content size, and additional in-app content size. Keep those labels intact in your notes. If the app uses Apple-Hosted Background Assets, Apple's [maximum build file size reference](https://developer.apple.com/help/app-store-connect/reference/app-uploads/maximum-build-file-sizes/) says the product page can show an **“Up to”** size that includes non-localized essential packs plus the single largest localized essential-pack total.

That is why two correct size values can differ. They may describe different devices, delivery stages, or content policies.

## How to check app file size in App Store Connect

The Account Holder, Admin, App Manager, and Developer roles can view build metadata. After the upload finishes processing:

1. Open **Apps** in App Store Connect and select the app.
2. Open **TestFlight**.
3. Select the platform in the sidebar.
4. Expand the version and choose the app icon or build string.
5. Open **Build Metadata**.
6. Under General Information, choose **App File Sizes**.
7. Record both download and install size for the variants you support.

Don't copy only the largest row without its device label. A useful receipt identifies the app version, build number, variant, measurement, value, and observation time.

Apple displays a yellow warning when a device variant exceeds the current **200 MB over-the-air download limit**. The warning appears by the build and affected variant, and Apple also sends an email. Treat that warning as a distribution constraint to investigate, not as evidence that the install size is 200 MB or that the upload failed.

Maximum uncompressed build and executable limits are separate rules. They vary by platform, and Apple can change them. Check the live [maximum build file sizes](https://developer.apple.com/help/app-store-connect/reference/app-uploads/maximum-build-file-sizes/) page rather than copying one platform's limit into a permanent team checklist.

## Measure before upload with an Xcode app size report

You don't need to wait for App Store Connect to catch every surprise. Apple's [Xcode size guide](https://developer.apple.com/documentation/xcode/reducing-your-app-s-size) documents this pre-upload workflow:

1. Archive the app in Xcode.
2. Export the archive as an Ad Hoc, Development, or Enterprise build.
3. Choose **All compatible device variants** for app thinning.
4. Sign and export the app.
5. Open `App Thinning Size Report.txt` in the export folder.

The report contains compressed and uncompressed estimates for each generated variant. Compressed corresponds to estimated download size; uncompressed corresponds to estimated installed size.

Use the report as a release gate, not as a promise. Apple says App Store Connect has the most accurate variant sizes for an uploaded build. TestFlight builds also contain extra data that isn't included in the App Store version, while the approved App Store binary can grow slightly when Apple applies DRM and recompresses it.

For a [TestFlight release workflow](/blog/testflight-release-management/), keep the pre-upload estimate and processed App Store Connect result under the same build number. Preserve both measurements instead of treating the estimate as the final result.

## Keep a build-size receipt

A single screenshot or a number pasted into a task loses the context needed for the next comparison. Save a compact receipt for every release candidate:

```text
App version:
Build number:
Measured at:
Source: Xcode size report / App Store Connect
Device variant:
Download size:
Install size:
Essential or additional content shown:
Over-the-air warning:
Previous comparison build:
Expected size-changing work:
Decision: accept / investigate / block
Owner and follow-up:
```

For apps with several important device variants, use one row per variant. Keep the same set of representative variants from release to release. This prevents a larger tablet variant in the new build from being compared with a smaller phone variant in the old build.

The receipt belongs beside the rest of the [iOS app release plan](/blog/ios-app-release-management/). It records what Apple or Xcode reported; it doesn't replace either tool.

## Compare builds without creating a false regression

Use four controls before calculating a change:

1. **Same metric:** download-to-download or install-to-install.
2. **Same variant:** match the device or variant label.
3. **Same source when possible:** compare two App Store Connect results or two reports generated the same way.
4. **Known release scope:** list work that could plausibly add or remove code or assets.

A hypothetical comparison might look like this:

```text
Version/build: 3.4 (211)
Baseline: 3.4 (210)
Variant: same iPhone variant in both rows
Download change: +18 MB
Install change: +26 MB
Expected cause: new offline tutorial video
Evidence gap: no asset inventory attached
Decision: investigate before choosing the submission build
```

The numbers above are an example, not a recommended budget. A game, a camera app, and a small text utility don't need the same threshold. Set an app-specific budget based on the existing product, supported devices, delivery constraints, and release goal. Write that budget before seeing the new result so it doesn't move to excuse every increase.

Also separate bundle growth from runtime storage growth. App Store Connect's App File Sizes table describes the delivered app variant. Documents, caches, and content created or downloaded after installation are a different problem. Apple's Xcode Organizer [storage metrics](https://developer.apple.com/documentation/xcode/monitoring-your-app-s-storage-metrics) track App Size and Documents & Data across releases.

## Turn an unexpected increase into a bounded task

“Reduce app size” is too broad to complete. When a receipt fails its budget or contains an unexplained jump, create a diagnostic task first:

```text
Problem: Download size increased for a named device variant
Baseline build and value:
Current build and value:
Release changes that may explain it:
Files or modules to inspect:
Required evidence:
Decision deadline:
Done when: cause is identified and accepted, removed, or assigned to a measured optimization
```

Then route the result:

- **Expected and acceptable:** preserve the reason and approve the release candidate.
- **Expected but too costly:** scope a specific optimization and regenerate the size evidence.
- **Unexpected:** inspect the changed code and assets before deciding what to remove.
- **Only one variant changed:** investigate configuration or resources specific to that variant.
- **Only runtime storage changed:** move the work to cache, downloaded-content, or Documents & Data analysis.

If large content is intentionally separate from the build, record that architecture rather than pretending the content disappeared. The [Apple-hosted asset packs guide](/blog/apple-hosted-asset-packs/) shows how to pair an app build with exact pack versions and test the combination. It also explains that hosted packs have their own processing, review, compatibility, and size constraints.

## Put the size gate into LaunchBuddy accurately

LaunchBuddy can keep the receipt, owner, and decision with the version being shipped:

- add “Record processed App File Sizes” to the release;
- record the app version, build number, source, and representative variants in the task or project notes;
- create a scoped task when a size change needs investigation;
- include the check in the broader [App Store Connect release checklist](/blog/app-store-connect-release-checklist/).

Release planning, taskboards, and default submission checklists are available on LaunchBuddy Free within its app and release limits. Reusable custom checklists require Pro.

LaunchBuddy doesn't measure a binary, generate an app-thinning report, predict the final DRM-processed size, perform app thinning, or change Apple's limits. App Store Connect remains authoritative for processed variant sizes, and Xcode remains the development tool for generating the pre-upload report. LaunchBuddy's role is to keep the evidence and follow-up work attached to the right release.

## Frequently asked questions

### Why is my TestFlight app larger than the App Store app?

Apple says TestFlight builds contain additional data that isn't included in the App Store version. Don't use the installed TestFlight footprint as the final store size. Compare processed App File Sizes for the same build and variant, then verify the public product page after release.

### Why does the App Store show a different size on different devices?

Apple creates device-specific variants through app thinning. On platforms other than macOS, the product page shows the installation size for the device viewing it. Apple-Hosted Background Assets can also make the listing show an “Up to” value that includes applicable essential asset packs.

## Make size evidence part of the release

Measure with Xcode before upload, confirm the processed variants in App Store Connect, compare like with like, and preserve the decision beside the build. If the result needs work, assign a bounded investigation instead of carrying an unexplained increase into submission.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy and add a build-size gate to your next release</a>.
