---
title: "App Store App Icon Requirements: A Release Checklist"
description: "Check App Store app icon size, Xcode setup, appearance variants, Release-build selection, validation, upload, and live display before shipping."
pubDate: 2026-11-03
---

For an iOS or iPadOS app, the App Store icon must ship inside the app build. Use either an Icon Composer file or an `AppIcon` set in the Xcode asset catalog. With the asset-catalog path, provide the App Store artwork in the **iOS 1,024pt image well**; Xcode can generate the smaller system variations from a single **1024 × 1024-pixel** image. Then archive the Release configuration, validate it, upload the build, and inspect the processed result.

You don't upload a separate default icon on the app's App Store Connect version page. Apple derives it from the build. If the app is already published, changing that icon requires a new app version and another review.

Use this five-gate preflight:

1. **Source gate:** choose Icon Composer or an asset catalog and document the source-art setup.
2. **Variant gate:** inspect every supported platform, appearance, and rendered size.
3. **Target gate:** make sure the intended icon source is selected for the Release build.
4. **Build gate:** archive, validate, upload, and wait for App Store Connect processing.
5. **Display gate:** compare the processed icon across TestFlight, App Store, and device surfaces.

Apple's tooling changes over time. The requirements below were checked against Apple's current documentation on November 3, 2026. Recheck the [Add an app icon](https://developer.apple.com/help/app-store-connect/manage-app-information/add-an-app-icon/) and Xcode documentation before the final archive.

## App Store app icon requirements at a glance

| Decision | Current requirement or boundary |
| --- | --- |
| Delivery | Include the icon in the app build, then upload the build to App Store Connect |
| iOS and iPadOS asset-catalog source | Put App Store artwork in the iOS 1,024pt image well |
| Single-size source | 1024 × 1024 pixels for iOS and iPadOS; Xcode can generate system variations |
| Appearance options | iOS and iPadOS support Light, Dark, and Tinted styles; you can supply custom variants or use the system treatment |
| Icon Composer source canvas | Apple's current guidance uses 1024 × 1024 pixels for iPhone, iPad, and Mac |
| Published-icon change | Upload a new app version and submit it for review |
| Product Page Optimization icon | The alternate icon must already be in the current App Store binary and be 1024 × 1024 pixels |
| Custom product page icon | Not a supported custom product page creative field |

This isn't the same workflow as screenshots. Screenshots are listing assets uploaded to App Store Connect, while the default app icon comes from the binary. Use the separate [App Store screenshot requirements](/blog/app-store-screenshot-requirements/) when checking product-page images.

## Gate 1: choose one icon pipeline

Apple currently documents two supported ways to provide the app icon.

### Option A: Icon Composer

[Icon Composer](https://developer.apple.com/documentation/xcode/creating-your-app-icon-using-icon-composer) creates a multilayer icon file for Liquid Glass. Xcode renders the supported platform, appearance, and size variants from that file. The current source-art guidance uses a 1024 × 1024-pixel canvas for iPhone, iPad, and Mac, and 1088 × 1088 pixels for Apple Watch.

This route fits a new icon designed as layered artwork. Apple recommends starting with its latest design template; you can instead configure the documented canvas size yourself. Keep the source layers separate and preview the icon for every platform and appearance you support.

There is an important migration caveat: adding an Icon Composer file makes Xcode use it instead of the existing icon asset catalog. Xcode can generate a similar-looking icon for older OS releases, but Apple says to continue using asset catalogs if the existing icon must remain unchanged on those releases. Treat a pipeline switch as a visual product change, not a file-format cleanup.

### Option B: an asset catalog

With the [asset-catalog workflow](https://developer.apple.com/documentation/xcode/configuring-your-app-icon), a standard Xcode project contains `Assets.xcassets` with an `AppIcon` set. For iOS and iPadOS, select **Single Size** if one 1024 × 1024-pixel source should generate the variations. Select **All Sizes** only when you need to provide and maintain the individual images yourself.

An asset catalog also lets you supply custom Dark and Tinted variants. Those are choices, not a reason to leave the default image unfinished: Apple can apply its system-generated treatment when custom variants aren't supplied.

Record the decision before editing files:

```text
Icon pipeline: Icon Composer | Asset catalog
Supported platforms:
Minimum OS versions:
Current production icon source:
New source file or set:
Reason for changing the pipeline, if applicable:
Reviewer:
```

Two active sources with unclear precedence are more dangerous than either supported path on its own.

## Gate 2: preflight the source and its variants

Passing a 1024 × 1024 size check doesn't prove the icon works. Apple's [App Store asset guidance](https://developer.apple.com/app-store/asset-best-practices/) says the icon should express the app's purpose and remain legible from the App Store down to Spotlight and the Home Screen.

Review the source at three levels:

- **Full size:** edges, gradients, layer order, and unintended artifacts.
- **Home Screen size:** the central symbol remains recognizable without relying on fine detail.
- **Small system size:** the silhouette and contrast survive in search, Settings, notifications, and share sheets.

For iOS and iPadOS appearance variants, check:

- [ ] Light appearance on several light and dark wallpapers.
- [ ] Dark appearance against the system-provided background.
- [ ] Tinted appearance with more than one tint color.
- [ ] The automatic system treatment too, if you don't provide custom variants.
- [ ] The icon at the smallest preview size available in the tool.

Don't evaluate each variant in isolation. The customer should still recognize the same app after changing appearance.

Keep a simple manifest with the release:

```text
App: Focus Timer
Version and build: 4.2 (317)
Pipeline: Asset catalog, Single Size
Default source: Assets.xcassets/AppIcon, 1024 × 1024
Custom Dark variant: Yes
Custom Tinted variant: No; system treatment accepted
Platforms checked: iPhone, iPad
Small-size reviewer:
Appearance reviewer:
```

The manifest adds the context a filename cannot. It also makes later icon experiments traceable.

## Gate 3: verify the correct target and Release configuration

A correct file in the repository can still be absent from the uploaded build.

For an asset catalog, confirm the target's **App Icons Source** points to the intended set. Xcode's build settings can specialize the **Primary App Icon Set Name** for Debug and Release. This is useful when a developer build has a visible badge, but it also creates a release risk: a debug icon can ship if the wrong set or configuration is archived.

For Icon Composer, confirm the target's **App Icon** field matches the Icon Composer filename without its extension.

Before archiving:

- [ ] The selected target is the app's distribution target, not a sample or staging target.
- [ ] The Release configuration points to the production icon source.
- [ ] The icon source belongs to the intended target.
- [ ] Debug-only badges or artwork aren't present in the Release result.
- [ ] Alternate icon sets are included only when the app or an approved experiment needs them.
- [ ] Every supported platform target has its required App Store icon source.

Apple's asset-catalog documentation places platform-specific App Store artwork in different wells:

| Platform or product | App Store icon source |
| --- | --- |
| iOS | iOS 1,024pt image well |
| iMessage app | iOS target's 1,024pt image plus the extension's Messages App Store image |
| Sticker pack | iOS 1,024pt image plus the Messages App Store image |
| macOS | App Store – 2x image well |
| tvOS | Layers in the App Icon – App Store stack |
| visionOS | Layers in the visionOS App Icon stack |
| watchOS companion | iOS target's 1,024pt image plus the WatchKit target's watchOS image |

Don't copy the iOS rule across every platform. A universal app may need several platform-specific sources even when the brand artwork is shared.

## Gate 4: validate and upload the exact build

Create the archive from the intended release branch and configuration. In Xcode, open **Window → Organizer**, select the archive, and choose **Validate App**. Apple's [distribution guidance](https://developer.apple.com/documentation/xcode/distributing-your-app-for-beta-testing-and-releases) describes this as an initial automated check; it doesn't replace the validation App Store Connect performs after upload.

Save a build receipt:

```text
Commit:
Marketing version:
Build number:
Archive configuration:
Primary icon source:
Alternate icon sets included:
Xcode validation: Passed | Failed
App Store Connect processing: Passed | Failed
```

If validation fails, fix the source or target configuration and create a new archive. Don't treat a locally correct preview as evidence that the uploaded binary contains the same icon.

After upload, wait for processing to finish. Confirm that the exact processed build is the one you distribute to TestFlight groups or select for the App Store version, then attach the wider [App Store Connect release checklist](/blog/app-store-connect-release-checklist/).

## Gate 5: inspect rendered surfaces, not only source files

The final check is visual and build-specific. Install the processed build through TestFlight when practical, then compare:

- App Store Connect's processed build record
- TestFlight
- The Home Screen in supported appearances
- Spotlight or system search
- Settings
- Notifications, if the app sends them
- Share sheets or other system surfaces where the icon appears

Check the public App Store product page after release too. Record the storefront, device, and date rather than writing only “looks good.”

```text
Build checked: 4.2 (317)
TestFlight icon: Pass
Home Screen Light / Dark / Tinted: Pass / Pass / Pass
Spotlight and Settings: Pass
Public product page:
Storefront and device:
Checked by and date:
Follow-up:
```

This catches mistakes a source review misses: the wrong target, a stale processed build, poor small-size legibility, or a variant that loses its identifying shape.

## Changing or testing an icon after launch

A default icon change isn't an App Store Connect metadata-only edit. Apple requires a new app version with the changed icon and another review.

Product Page Optimization has a separate path. Apple's [treatment configuration documentation](https://developer.apple.com/help/app-store-connect/create-product-page-optimization-tests/configure-test-treatments/) says an alternate icon must:

- already exist in the binary currently live on the App Store;
- use the supported alternate-icon setup;
- come from a build made with an appropriate SDK; and
- be 1024 × 1024 pixels.

The treatment icon appears during download and on the customer's device. To make a tested icon the new default, Apple requires you to set it as the default in a later app version rather than applying it like a screenshot treatment.

Define the question and preserve the exact control before adding alternates. The [Product Page Optimization workflow](/blog/app-store-product-page-optimization/) covers Apple's test mechanics, while the [ASO experiment tracker](/blog/aso-experiment-tracker/) provides a decision record for the hypothesis, assets, evidence, and outcome.

## Copy-and-use App Store icon checklist

```text
Scope
[ ] App version, build, platforms, and minimum OS versions recorded
[ ] Icon Composer or asset-catalog pipeline selected
[ ] Existing production-icon behavior preserved or migration approved

Source and variants
[ ] Current Apple template used, or documented canvas size configured
[ ] iOS/iPadOS App Store source is 1024 × 1024
[ ] Light, Dark, Tinted, and system-generated treatments reviewed as applicable
[ ] Full, Home Screen, and small system sizes inspected
[ ] Platform-specific App Store sources supplied

Target and build
[ ] Production icon selected for the app's distribution target
[ ] Release configuration checked separately from Debug
[ ] Icon Composer filename or asset-set name matches target settings
[ ] Required alternate icons included; unrelated sets excluded
[ ] Release archive created from the intended commit
[ ] Xcode validation passed
[ ] App Store Connect processing passed

Rendered result
[ ] Exact processed build installed through TestFlight
[ ] Home Screen, search, Settings, and relevant system surfaces checked
[ ] App Store product page checked after release
[ ] Storefront, device, reviewer, and date recorded

Future changes
[ ] New default icon scheduled with a new app version
[ ] Product Page Optimization alternates already exist in the live binary
[ ] Experiment control, variant, decision rule, and result preserved
```

## Where LaunchBuddy fits

LaunchBuddy can keep icon design, review, archive, upload, and live-verification tasks attached to the app version they belong to. The Free plan includes default App Store submission checklists within its two-app and two-release limits. Pro adds reusable custom checklists and ASO experiment records.

LaunchBuddy doesn't create or inspect icon files, select an Xcode asset set, validate a binary, upload a build, or approve an App Store icon. Xcode and App Store Connect remain authoritative for the build and its processed icon.

Turn the icon preflight into release work instead of a last-minute visual check: <a href="https://apple.co/3iFcjjW">download LaunchBuddy and add it to your next app version</a>.
