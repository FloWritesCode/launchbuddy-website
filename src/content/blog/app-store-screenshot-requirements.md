---
title: "App Store Screenshot Requirements: A Submission Checklist"
description: "Check current App Store screenshot sizes, formats, device coverage, localization, content rules, and upload status before submitting an app version."
pubDate: 2026-10-04
---

App Store screenshots must use an accepted pixel size, contain no alpha channel or transparency, and be uploaded as `.jpeg`, `.jpg`, or `.png` files. Apple allows **one to 10 screenshots**. For an iPhone app, provide a 6.9-inch or 6.5-inch set; if the app runs on iPad, a 13-inch iPad set is also required. Mac, Apple TV, Apple Vision Pro, and Apple Watch apps each have their own required sizes.

Passing the file check isn't enough. The screenshots must show the app in use, accurately represent the submitted build, be suitable for a 4+ audience, and cover the platform and localizations you intend to publish.

Use this three-gate preflight:

- **File gate:** format, exact dimensions, orientation, and no transparency.
- **Coverage gate:** every supported platform, required display set, locale, and screenshot position is accounted for.
- **Truth gate:** every screen and overlay matches the build customers will receive.

Apple changes its device table as hardware changes. The dimensions below were checked against Apple's live documentation on October 4, 2026; confirm them in the [current screenshot specifications](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/) before exporting final assets.

## Current App Store screenshot sizes

The shortest compliant path for an iPhone and iPad app is usually one high-resolution iPhone set plus one 13-inch iPad set. App Store Connect scales those images for smaller displays when you don't supply custom sets.

| Platform or display set | Accepted landscape or portrait dimensions | When it is required |
| --- | --- | --- |
| iPhone 6.9-inch | 1260 × 2736, 1290 × 2796, or 1320 × 2868 pixels; reverse either pair for landscape | Provide this set, or provide the 6.5-inch set |
| iPhone 6.5-inch | 1284 × 2778 or 1242 × 2688 pixels; reverse for landscape | Required for an iPhone app only when a 6.9-inch set isn't provided |
| iPad 13-inch | 2064 × 2752 or 2048 × 2732 pixels; reverse for landscape | Required when the app runs on iPad |
| Mac | 1280 × 800, 1440 × 900, 2560 × 1600, or 2880 × 1800 pixels | Required for a Mac app |
| Apple TV | 1920 × 1080 or 3840 × 2160 pixels | Required for an Apple TV app |
| Apple Vision Pro | 3840 × 2160 pixels | Required for an Apple Vision Pro app |
| Apple Watch | 422 × 514, 410 × 502, 416 × 496, 396 × 484, 368 × 448, or 312 × 390 pixels | Required for an Apple Watch app; use the same chosen size across all localizations |

This table lists the primary submission sets, not every optional iPhone and iPad display size. Media Manager accepts additional device-specific sets when scaling would misrepresent the interface.

Apple's current table also lists outer- and inner-display sizes for iPhone Duo, but notes that App Store Connect upload support will arrive later in 2026. Don't treat a future upload well as a current submission requirement. Recheck the live table when App Store Connect exposes the control.

## Decide whether Apple's scaling is safe for your app

Apple says you can provide only the highest-resolution required screenshots when the UI is the same across device sizes and localizations. App Store Connect then scales them down for smaller displays.

That shortcut is appropriate when all of these are true:

- The same navigation and feature state appear on the smaller device.
- Text remains legible after scaling.
- No device frame, caption, or crop implies the wrong hardware.
- The layout doesn't switch between compact and expanded presentations.
- The localized UI and overlay communicate the same information.

Upload custom screenshots through Media Manager when a smaller display uses different navigation, a different crop hides an important control, or an iPad layout is materially different from iPhone. A technically valid scaled image can still be misleading.

Record the decision instead of relying on memory:

```text
Platform: iPhone
Source set: 6.9-inch, 1290 × 2796
Scaled by App Store Connect: Yes
Displays spot-checked: 6.3-inch, 6.1-inch, 5.5-inch
Reason custom assets aren't needed: Same layout and readable captions
Reviewer and date:
```

## Check each file before uploading

Run the file gate on the exported files, not only on the design document:

- [ ] There are between one and 10 screenshots in the set.
- [ ] Every file is `.jpeg`, `.jpg`, or `.png`.
- [ ] Every file matches one accepted pixel pair exactly.
- [ ] Portrait and landscape dimensions haven't been swapped accidentally.
- [ ] No image contains an alpha channel or transparency.
- [ ] The files open correctly after export.
- [ ] The intended order is encoded in filenames such as `01-home-en-US.png`.
- [ ] The platform, display set, locale, version, and build are recorded with the export.

A useful filename can prevent an otherwise valid image from entering the wrong well:

```text
03-focus-timer_iphone-6.9_en-US_v4.2-b317.png
```

The name isn't App Store metadata, so customers won't see it. It is an internal control that makes review and replacement less error-prone.

## Verify screenshot content against Apple's rules

Apple's [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) require metadata to reflect the app's core experience and stay current with new versions. Guideline 2.3.3 says screenshots should show the app in use, not merely title art, a login page, or a splash screen. Text and image overlays are allowed when they help explain the experience.

Review every screenshot with these questions:

- [ ] Does the underlying screen exist in the submitted build?
- [ ] Can a customer reach the shown state?
- [ ] Does each caption describe what is actually visible or available?
- [ ] Are paid features, subscriptions, or account requirements represented honestly?
- [ ] Have price claims been removed from the image and overlay?
- [ ] Have discontinued controls, old navigation, and placeholder data been removed?
- [ ] Is sample content fictional and free of customer or tester information?
- [ ] Is the image suitable for a 4+ audience, even if the app has a higher age rating?
- [ ] Does the sequence show the app in use rather than spending its limited slots on logos, login screens, or splash art?

The build-to-asset check is where many screenshot workflows fail. A polished image from build 301 can be stale when build 317 renamed a tab or moved a feature. Put the build number in the review record even though it doesn't appear on the product page.

## Review the sequence, not just individual images

Apple's [product-page guidance](https://developer.apple.com/app-store/product-page/) says the first one to three screenshots can appear in search results when no app preview is present, depending on orientation. Treat those positions as a compact explanation, not three unrelated posters.

A practical sequence is:

1. **Promise:** the main outcome the app supports.
2. **Proof:** the real screen where that outcome happens.
3. **Differentiator:** a second workflow or constraint that helps the right customer decide.
4. **Depth:** supporting features, integrations, or device experiences.
5. **Confidence:** relevant privacy, accessibility, or cross-device context that the app can substantiate.

Avoid repeating the same claim over different backgrounds. Each image should answer a new customer question. If you want to measure whether a different sequence communicates better, use a controlled [App Store Product Page Optimization workflow](/blog/app-store-product-page-optimization/) rather than treating a before-and-after conversion change as proof of causation.

## Audit every localization deliberately

When you add a localization, Apple initially defaults its screenshots to the primary language. If no localization matches a customer's language, App Store localization fallback rules determine which metadata appears.

That behavior prevents an empty product page, but it doesn't make the inherited screenshot appropriate. For each locale:

- [ ] Decide whether inherited primary-language screenshots are acceptable.
- [ ] Translate overlays for meaning, not word for word.
- [ ] Capture localized in-app UI when the screenshot implies that the app supports it.
- [ ] Check truncation, line breaks, decimal formats, dates, and right-to-left layout.
- [ ] Keep screenshot sizes aligned with the primary language if a future primary-language change is planned.
- [ ] Check custom product pages separately; their localized assets have their own coverage.

Maintain a simple coverage matrix:

| Locale | iPhone source set | iPad source set | Overlay reviewed | In-app UI reviewed | Fallback intentional |
| --- | --- | --- | --- | --- | --- |
| en-US | 6.9-inch custom | 13-inch custom | Yes | Yes | Not applicable |
| de-DE | 6.9-inch custom | 13-inch custom | Yes | Yes | No |
| fr-FR | Inherits en-US | Inherits en-US | No | No | Yes, for this release |

The last row isn't automatically wrong. It makes the compromise visible so it can be approved, deferred, or turned into a release task. For a broader process, use the [App Store localization workflow](/blog/app-store-localization-workflow/).

## Upload and inspect the final result in App Store Connect

In App Store Connect, open the app version under the appropriate platform, choose the locale, and add assets to **App Previews and Screenshots**. Use **View All Sizes in Media Manager** for custom display sets and for the required iMessage or watchOS wells.

Apple currently allows uploads when the app version has one of these statuses:

- Prepare for Submission
- Invalid Binary
- Rejected
- Metadata Rejected
- Developer Rejected

The Account Holder, Admin, App Manager, or Marketing role is required. Once a version has been submitted for review and approved, Apple requires a new version to update its screenshots.

Finish with a rendered-result check:

- [ ] The files landed in the intended platform, display, and locale wells.
- [ ] The intended files, rather than stale local exports, appear in each well.
- [ ] Scaled previews are legible and accurately cropped.
- [ ] Portrait and landscape images appear in the intended order.
- [ ] The first one to three images still form a coherent search-result sequence.
- [ ] Every locale displays the intended custom asset or an explicitly accepted fallback.
- [ ] The final screenshot set is included in the wider [App Store Connect release checklist](/blog/app-store-connect-release-checklist/).

## Worked example: preflight one universal app

Suppose version 4.2 of a focus timer supports iPhone and iPad in English and German. Its iPad layout uses a sidebar, while iPhone uses tabs.

The release owner creates four source sets:

```text
iPhone 6.9-inch — en-US — six screenshots
iPhone 6.9-inch — de-DE — six screenshots
iPad 13-inch — en-US — five screenshots
iPad 13-inch — de-DE — five screenshots
```

They allow App Store Connect to scale the iPhone set to smaller iPhones because the tab layout and captions survive the smaller previews. They don't reuse iPhone images for iPad, because doing so would hide the sidebar experience customers receive.

The manifest for each screenshot records:

```text
App version and build: 4.2 (317)
Platform and display set: iPhone 6.9-inch
Locale: de-DE
Position: 01
Screen and state: Active timer, 24 minutes remaining
Claim: "Eine Aufgabe. Volle Konzentration."
Capture owner:
Copy reviewer:
Verified in App Store Connect:
```

During the truth gate, the reviewer notices that screenshot four says calendar history is included, but that feature moved to version 4.3. The image is removed before upload. Exact dimensions would not have caught that error; the build-linked manifest does.

## Where LaunchBuddy fits

Screenshot capture, validation, and upload remain outside LaunchBuddy. Use design tools to create the files and App Store Connect as the source of truth for accepted assets and submission status.

LaunchBuddy can organize the surrounding work:

- Attach screenshot review tasks to the app version they describe.
- Run the default App Store submission checklist on the Free plan.
- Use a custom reusable checklist with Pro.
- Track a screenshot experiment with baseline and experiment metrics using Pro's ASO experiments.
- Review an editable AI screenshot recommendation, but verify it against the build and Apple's current rules before acting on it.

LaunchBuddy does **not** generate screenshots, inspect their dimensions, certify their content, or upload them to App Store Connect. The useful boundary is simple: LaunchBuddy holds the owner, deadline, version context, and decision; your asset workflow holds the files; App Store Connect holds the published product page.

## Final copy-and-use screenshot checklist

```text
Release identity
[ ] App version and build recorded
[ ] Supported platforms and locales frozen
[ ] Screenshot owner and reviewer assigned

File gate
[ ] 1–10 images per set
[ ] JPEG, JPG, or PNG
[ ] Exact accepted dimensions
[ ] No alpha channel or transparency
[ ] Orientation and filename checked

Coverage gate
[ ] 6.9-inch or 6.5-inch iPhone set supplied
[ ] 13-inch iPad set supplied if the app runs on iPad
[ ] Other supported-platform requirements supplied
[ ] Scaling reviewed on representative smaller displays
[ ] Custom device sets added where layouts differ
[ ] Every locale has custom assets or an approved fallback

Truth gate
[ ] Screens show the submitted app in use
[ ] UI, captions, and claims match the build
[ ] Paid or gated features are represented accurately
[ ] Sample content contains no private data
[ ] Every image is suitable for a 4+ audience
[ ] First one to three images explain the app clearly

App Store Connect
[ ] Correct platform, display, and locale wells used
[ ] Rendered scaling, crop, order, and fallback inspected
[ ] Final set recorded with the release
```

Make screenshot accuracy a release gate instead of a last-minute visual check: <a href="https://apple.co/3iFcjjW">download LaunchBuddy and attach this preflight to your next app version</a>.
