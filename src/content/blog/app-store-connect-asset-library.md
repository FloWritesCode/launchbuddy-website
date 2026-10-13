---
title: "App Store Connect Asset Library: A Practical Workflow"
description: "Learn how to upload, review, reuse, publish, archive, and track screenshots, app previews, and creative assets in App Store Connect Asset Library."
pubDate: 2026-10-13
---

The **App Store Connect Asset Library** is the central place to upload and manage an app's screenshots, app previews, and creative assets—including In-App Event media—across platforms, sizes, and placements. Use it to build an approved inventory before a campaign needs to go live, then select compatible assets from that inventory where Apple allows reuse.

The important distinction is that the library stores assets, while a **placement** determines where customers see one. Uploading or even approving an image doesn't publish it by itself. A reliable workflow therefore tracks three separate states:

```text
File: exported and uploaded
Approval: completed with the asset approved
Placement: selected and published in an eligible App Store location
```

This how-to guide covers that complete path. Apple's current Asset Library and creative-asset documentation went live on October 5, 2026, so recheck the linked specifications before a future export.

## 1. Separate the asset types before uploading

Asset Library puts several media types in one place, but they don't have interchangeable jobs.

| Asset type | What it should communicate | Where it can be used |
| --- | --- | --- |
| Screenshot | The app or game in use | Version product pages, custom product pages, and Product Page Optimization treatments when compatible |
| App preview | Features, functionality, and UI in a short video | Version product pages, custom product pages, and Product Page Optimization treatments when compatible |
| Creative asset, including In-App Event media | Brand, value proposition, seasonal offering, new content, or a specific timely event | Product page header, search results, In-App Event card and details page, and other eligible placements |

Apple explicitly distinguishes creative assets from screenshots and previews. Screenshots and previews should show the experience in use. Creative assets may use broader brand or seasonal imagery. They are also separate from In-App Purchase images, subscription images, and artwork requested by Apple's editorial teams.

New product page header and search-results creative assets are optional. Apple says they are available for iOS and iPadOS apps and games running iOS 27 or iPadOS 27 or later. If you don't use a search-results creative asset, existing eligible media such as In-App Events, app previews, and screenshots can still appear there.

Write a one-line job for every file before opening App Store Connect:

```text
Asset: winter-header-universal-en-US-v1.png
Type: Creative asset
Job: Introduce the winter trail collection
Intended placements: Product page header and search results
Locale: en-US
App state represented: Version 4.2
Owner:
Retire after:
```

This prevents a visually attractive file from being reused where its message, crop, language, or app state no longer fits.

## 2. Build an inventory around compatibility, not folders

Open the app in App Store Connect, choose **Asset Library** in the sidebar, and inspect the existing inventory before adding anything. Apple's [Asset Library management guide](https://developer.apple.com/help/app-store-connect/manage-app-information/manage-your-app-store-assets) documents three useful fields in each asset's detail view:

- **Name:** an internal App Store Connect label.
- **Works With:** compatible features and placements, such as Search Results or In-App Events.
- **Recent Usage:** where the asset was most recently used.

You can also filter the library by type, status, and format. Use those facts as the source of truth rather than inferring compatibility from a filename.

A compact register outside App Store Connect adds the context the file itself can't carry:

| Asset ID | Review state | Works with | Locale | Product truth checked against | Intended use | Current placement | Retirement trigger |
| --- | --- | --- | --- | --- | --- | --- | --- |
| WINTER-HDR-01 | Prepared for Submission | Header, Search Results | en-US | 4.2 (317) | Winter campaign | None | Campaign ends |
| CORE-SS-03 | Approved | Screenshots | de-DE | 4.2 (317) | Default page | Position 2 | Navigation changes |

Don't use **approved** as shorthand for **currently live**. Approval and placement are separate facts. Apple's [**Accepted** item status](https://developer.apple.com/help/app-store-connect/reference/app-and-submission-statuses/) has a narrower meaning: an item passed review while at least one other item in the same submission was rejected, so the submission can't publish yet. Likewise, `Recent Usage` is useful history, but it doesn't replace a current-placement check.

## 3. Export against the current specification

Choose the intended placement before choosing dimensions. Apple's [creative asset specifications](https://developer.apple.com/help/app-store-connect/reference/app-information/creative-assets-specifications) currently define these product-page and search formats:

| Placement | Image | Video |
| --- | --- | --- |
| Product page header | 21:9 at 3840 × 1646 pixels | 21:9 at 3840 × 1646, 30 or 60 fps, 5–30 seconds |
| Search results | 3:2 from 1920 × 1280 through 3840 × 2560 pixels | 3:2 in that resolution range, 30 or 60 fps, 5–30 seconds |
| Universal header and search asset | 16:9 at 5244 × 2950 pixels, PNG | Apple's current table doesn't list a universal video format; prepare placement-specific videos |

Header and search images may be JPEG, JPG, or PNG in their placement-specific aspect ratios and can't contain alpha channels or transparency. The universal image is PNG. Header and search videos may be MOV, M4V, or MP4.

Videos loop in both placements. They start muted; people can unmute a product-page video, while Apple says search-results videos currently can't be unmuted. Design the first frame and complete message to work without sound.

Specifications aren't the whole preflight. Use Apple's [asset best practices](https://developer.apple.com/app-store/asset-best-practices/) to run a content check before upload:

- The visual relates to the app's real functionality or content.
- Claims can be verified in the represented app version.
- The asset has no specific price, discount, website URL, or unsupported award claim.
- Text is short, localized, and legible at the actual placement crop.
- Key artwork remains inside a safe central area across devices and orientations.
- The image is suitable for a 4+ audience, even if the app has a higher age rating.
- Video still communicates its purpose when muted.

Use the separate [App Store metadata management workflow](/blog/app-store-metadata-management/) to keep these visual claims aligned with the selected build and surrounding copy.

## 4. Upload, label, and preview the asset

To upload directly to Asset Library:

1. In **Apps**, select the app.
2. Choose **Asset Library** in the sidebar.
3. Select the add button.
4. Choose **Upload Creative Assets** or **Previews and Screenshots**.
5. Select the files and upload them.
6. Open each asset, add a recognizable internal name, and inspect **Works With**.
7. For a video, choose its poster frame before approval.

Apple says a video's poster frame applies everywhere that asset is used and can't be edited after approval. Review it as a standalone image, not merely as a point on the playback timeline.

Before submitting, use App Store Connect's preview from **Product Page Information**. Apple lets you inspect the product page and search-result presentation on iPhone and iPad across orientations, languages, and Light or Dark Mode. Check the rendered context rather than approving the raw export:

```text
Preview record
Asset ID:
Device:
Orientation:
Language:
Appearance: Light | Dark
Placement:
Crop safe:
Text legible:
Matches current app:
Reviewer and date:
```

## 5. Choose the correct App Review path

The submission route depends on whether the app already has an approved version and whether the asset is assigned to another item.

| Situation | Correct route |
| --- | --- |
| The app has no approved version yet | Include assets with the first app-version submission |
| The app already has an approved version | Submit assets alone from Asset Library, or with an app version |
| The asset is assigned to an app version, [Custom Product Page](/blog/create-app-store-custom-product-page/), Product Page Optimization test, or In-App Event | Submit that item; its assigned assets are included and reviewed with it |
| The assigned item is already in an active submission | Don't try to submit the asset separately through Asset Library |

For a standalone submission after the first version:

1. Open **Asset Library** and choose **Edit**.
2. Select the assets, then choose **Add for Review**.
3. Add them to an existing draft submission or create one.
4. If required, choose the platform whose latest version App Review should use as context.
5. Open the draft submission and choose **Submit for Review**.

Apple's [standalone asset submission guide](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-assets-from-asset-library) requires the Account Holder, Admin, or App Manager role. The broader library can also be managed by the Marketing role, but that doesn't grant the standalone submission permission.

Submit related items together only when they need the same review timeline. If several items are reviewed together, an unresolved issue on one affects the submission. A seasonal asset that's ready early may be clearer in its own draft than bundled into an unrelated release at the last minute.

## 6. Publish only the approved asset you intended

Approval doesn't place the asset. For an app version already live on the App Store, Apple documents this flow for changing a creative asset:

1. Open the live version.
2. Under **Product Page Information**, choose **Header and Search Results**.
3. Choose the target placement.
4. Select **Browse Assets** and pick an approved compatible asset.
5. Review the selection and choose **Publish**.

That can update the live creative placement without a new app version or another review. Don't generalize this shortcut to screenshots, app previews, or every kind of App Store metadata. It is Apple's documented flow for approved creative assets in eligible placements.

After publishing, verify the actual storefront and record:

```text
Asset ID:
Approval status:
Placement:
Storefront:
Locale:
Published at:
Verified on device:
Previous asset:
Rollback choice:
Campaign end date:
```

If you're testing the creative rather than making a scheduled campaign swap, define the question and decision rule before opening a Product Page Optimization test. Apple's current treatment editor includes **Header and Search Results** alongside **App Previews and Screenshots**. An approved asset isn't evidence that it improves conversion.

## 7. Archive deliberately instead of deleting history

Removing a creative asset from a placement doesn't delete it from Asset Library. That is useful: the asset can remain as an approval and usage record.

Apple only allows deletion while an asset has **Prepared for Submission** status. Use deletion for an unsubmitted mistake or duplicate. Use **Archive Asset** for an asset you no longer want available for new placements.

Archived assets can't be selected for new placements. Apple notes one exception: if a new version of a placement carries an archived asset forward, the asset may be restored automatically. Add a post-version check when retiring campaign art so a carried-forward placement doesn't quietly revive it.

Archive when:

- A seasonal campaign has ended.
- The image shows retired UI or content.
- A claim no longer matches the app.
- The asset has been replaced and should not be selected again.

Keep the register row even after archival. It preserves why the asset existed, where it ran, and why it was retired.

## Worked example: prepare a seasonal header without a release

Suppose version 4.2 is already approved and live. A trail app wants a winter product-page header next month, but no binary update is planned.

**Prepare:** The team creates a universal creative image, links it to version 4.2 (317) in the register, and checks that every shown trail and feature exists.

**Upload:** They add it as a creative asset, name it `Winter 2026 — Universal — en-US`, and confirm that **Works With** includes the intended header and search placements.

**Preview:** They inspect iPhone and iPad previews in both orientations. The landscape crop hides a text label, so they move the focal point before submission.

**Approve early:** Because the app already has an approved version, an App Manager submits the asset alone from Asset Library. The release plan remains unchanged.

**Publish:** On launch day, they choose the approved asset from **Browse Assets** on the live version and publish it to the header. They verify the storefront and keep the existing evergreen header as the rollback choice.

**Retire:** The campaign task has an end date. After restoring the evergreen header, they confirm the winter asset has no current placement, then archive it.

The useful outcome isn't merely a cleaner media folder. It is a reversible change with separate proof of product truth, approval, placement, and retirement.

## Where LaunchBuddy fits

App Store Connect remains the source of truth for asset files, compatibility, approval, placements, and publication. LaunchBuddy doesn't create, validate, upload, submit, publish, or archive Asset Library media.

LaunchBuddy can hold the surrounding release work:

- Add asset truth, localization, preview, approval, placement, verification, and retirement tasks to the relevant app release.
- Use the default App Store submission checklist on Free.
- Build a reusable asset checklist with Pro.
- Keep an ASO experiment record with baseline and variant metrics using Pro, while leaving Apple's Product Page Optimization test and analysis in App Store Connect.

For a wider submission preflight, add the asset checks to the [App Store Connect release checklist](/blog/app-store-connect-release-checklist/). Keep the filenames in your asset workflow, the official media state in App Store Connect, and the owners and deadlines in the release plan.

Treat every asset as more than a file: give it a verified app state, approval state, placement, and retirement trigger. <a href="https://apple.co/3iFcjjW">Download LaunchBuddy and add the Asset Library workflow to your next release plan</a>.
