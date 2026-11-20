---
title: "On-Demand Resources to Background Assets Migration Checklist"
description: "Migrate iOS On-Demand Resources to Background Assets with an inventory, policy map, compatibility plan, test matrix, and App Store cutover checklist."
pubDate: 2026-11-20
---

**To migrate On-Demand Resources (ODR) to Background Assets, inventory every ODR tag and `NSBundleResourceRequest` call, redesign those groups as managed asset packs, map each user need to an `essential`, `prefetch`, or `onDemand` policy, replace the request path, and test installation, update, failure, TestFlight, and App Store delivery before removing the legacy path.**

Start now, but don't mistake Apple's announcement for an immediate shutdown. Apple deprecated ODR starting with iOS 27, iPadOS 27, tvOS 27, and visionOS 27. Its [November 12, 2026 App Store Connect update](https://developer.apple.com/help/app-store-connect/release-notes/) says that, starting in early 2027, new apps and apps that have never used ODR can no longer upload builds containing it. Existing apps that already use ODR can still upload it under the current policy, and Apple says those apps will continue to function in the near term. Apple hasn't published a final removal date.

That distinction changes the job from a rushed deletion to a controlled migration.

## Use this migration order

Treat the work as seven gates:

1. inventory the existing ODR contract;
2. choose Apple hosting or a self-hosted Background Assets design;
3. map behavior rather than merely renaming tags;
4. integrate and package the replacement;
5. define an explicit older-OS path;
6. test the exact build-and-pack combinations;
7. cut over with observable rollback criteria.

Don't remove ODR code or tags when a new pack downloads once on a development device. Remove them only after every supported installation and update path has an owner, test result, and recovery behavior.

## 1. Inventory the ODR contract before changing code

Search the project for ODR asset tags, Xcode tag assignments, and every `NSBundleResourceRequest` initializer or access call. Build one row per user-facing content group, not one row per source file.

| Inventory field | Example |
| --- | --- |
| ODR tag | `tutorial-video` |
| Requesting feature | First-run tutorial |
| Current preservation priority | Initial install |
| Files and post-thinning size | Video and captions, 180 MB |
| First request point | Before tutorial screen |
| Can the feature wait? | No |
| Failure behavior | Offer retry; keep user outside tutorial |
| Supported OS range | iOS 18–27 |
| Update behavior | Replace video independently |
| Call sites | Onboarding coordinator, reset tutorial action |

Apple's [ODR size reference](https://developer.apple.com/help/app-store-connect/reference/app-uploads/on-demand-resources-size-limits/) explains an easy-to-miss detail: one ODR tag can produce multiple thinned asset packs. A tag list alone is therefore not a complete migration inventory. Record the actual content, devices, and points of use.

Also capture assumptions that the old implementation hid:

- whether content must exist before first launch;
- whether installation may finish while content continues downloading;
- whether a person explicitly triggers the download;
- whether two tags must be available together;
- whether the app can recover after cancellation, low storage, or a network failure;
- whether old and new app versions need different content.

The output of this gate is a behavior contract. It should describe what a person experiences, not just how ODR happened to implement it.

## 2. Choose the hosting model deliberately

Background Assets is the framework for scheduling asset downloads. Managed Background Assets adds system-managed asset packs, updates, and compression. For apps distributed through TestFlight or the App Store, Apple-Hosted Background Assets lets Apple host those packs.

Apple hosting is the closest operational replacement when ODR content already comes from Apple's infrastructure. Apple's [managed asset pack overview](https://developer.apple.com/help/app-store-connect/manage-asset-packs/overview-of-apple-hosted-asset-packs) says this path supports apps targeting iOS 26, iPadOS 26, macOS 26, tvOS 26, and visionOS 26 or later. It isn't available on watchOS.

Choose self-hosting when you need your own server or CDN, delivery controls, or post-processing that the Apple-hosted path doesn't provide. That is an architecture change, not a packaging switch: the team now owns hosting availability, URLs, cache behavior, capacity, and operational recovery.

Write the decision beside each content group:

```text
Content group:
Hosting: Apple / self
Why:
Minimum supported OS:
Who operates delivery:
Source of distribution truth:
Failure owner:
```

Don't choose a mixed model accidentally. A migration can use different models for different content, but each pack still needs one clear delivery and incident owner.

## 3. Map user needs to managed download policies

Apple defines three managed asset pack policies in its [asset-pack creation guide](https://developer.apple.com/documentation/backgroundassets/creating-managed-asset-packs):

| User need | Managed policy | Availability contract |
| --- | --- | --- |
| Content must be ready when installation completes | `essential` | Download contributes to installation progress |
| Installation may finish before content does | `prefetch` | Download starts during installation and may continue afterward |
| Content is needed only after a user action | `onDemand` | App explicitly requests it |

This isn't a mechanical ODR-label conversion. Ask when the content must be usable.

For `essential` and `prefetch`, the manifest also specifies whether the policy applies to `firstInstallation`, `subsequentUpdate`, or both. A tutorial needed only for new users may use `essential` for first installation. A model required immediately after every compatible update may need both events. An optional level requested from a content screen fits `onDemand`.

Create a mapping table before writing manifests:

| Old tag | New pack ID | Policy | Installation events | Entry condition | Missing-content UI |
| --- | --- | --- | --- | --- | --- |
| `tutorial-video` | `Tutorial` | `essential` | First installation | New user | Block tutorial and offer retry |
| `starter-model` | `StarterModel` | `prefetch` | First installation, subsequent update | Feature enabled | Show download progress |
| `level-desert` | `DesertLevel` | `onDemand` | Not applicable | User selects level | Keep selection and retry |

Keep pack IDs stable and human-readable. Keep pack versions separate: App Store Connect increments the version when you upload a new archive.

## 4. Build the replacement path without hiding failure

For Apple-hosted managed packs, Apple's [download guide](https://developer.apple.com/documentation/backgroundassets/downloading-apple-hosted-asset-packs) requires a managed Background Download extension, a shared App Group for the app and extension, and the documented Background Assets property-list keys. Follow the current Xcode template rather than copying an old target by hand.

Generate a manifest template with Apple's packaging tool, then define the pack ID, one download policy, file selectors, and supported platforms. Manifest paths are relative to the directory where the packaging command runs, so make that directory stable in local and CI builds.

At an on-demand call site, the new control flow is:

```swift
let pack = try await AssetPackManager.shared.assetPack(withID: "DesertLevel")
try await AssetPackManager.shared.ensureLocalAvailability(of: pack)
```

Only enter the feature after `ensureLocalAvailability` returns successfully. If it throws, preserve the user's intent and present a retry or fallback; don't mark the content as installed. For essential and prefetch packs, the same check can confirm local availability before access. When a pack is no longer needed, use the documented removal API to reclaim device storage.

Package and test one representative group first. A vertical slice exposes entitlement, App Group, extension, manifest, API, and content-access mistakes before the whole catalog moves.

## 5. Decide what happens below OS 26

Managed Background Assets starts with the OS 26 generation. If the app still supports earlier systems, replacing every ODR path with a Managed Background Assets-only call would strand those users.

Pick and document one compatibility strategy:

- raise the app's minimum OS only after measuring the affected audience and communicating the change;
- keep a tested ODR path for eligible existing-app uploads while Apple's current policy permits it, after verifying the mixed build and store delivery;
- provide another supported delivery path that works on the app's older deployment targets.

Don't present ODR coexistence as permanent. Apple says support will be removed in a future release but hasn't announced the final date. Likewise, don't assume self-hosting automatically solves older-OS support; verify the APIs and deployment target of the design you actually implement.

Use a version matrix to make the boundary reviewable:

| Installed OS | Existing install updates | Fresh install | Asset source | Request path |
| --- | --- | --- | --- | --- |
| Below 26 | Defined by your compatibility decision | Defined by your compatibility decision | Recorded explicitly | Legacy or alternative |
| 26 | Managed path tested | Managed path tested | Apple or self-hosted | Background Assets |
| 27 and later | Managed path tested | Managed path tested | Apple or self-hosted | Background Assets |

“Works on my current phone” isn't a compatibility plan.

## 6. Test installation, update, and pack versions separately

Local success proves packaging and app integration. It doesn't prove App Store delivery. Test at three layers:

### Local integration

- clean installation with each policy;
- update from the last public app version;
- launch before a prefetch pack finishes;
- cancel or interrupt an on-demand request;
- insufficient storage and lost network;
- pack removal followed by a new request;
- content lookup after the app or pack updates.

### TestFlight delivery

Upload Apple-hosted packs independently of the app build. During internal testing, TestFlight automatically uses the latest processed pack version. For external testing, select one pack version and submit it to TestFlight App Review; only one version per pack can be in external testing at a time.

That difference creates a version trap. Record the build and pack together:

| App version/build | Pack ID/version | Channel | Install | Update | Failure recovery | Result |
| --- | --- | --- | --- | --- | --- | --- |
| 4.0 (520) | `Tutorial` / 3 | Internal | Pass | Pass | Pass | Candidate |
| 4.0 (520) | `DesertLevel` / 8 | External | Pass | Pending | Pass | Hold |

The [Apple-hosted asset pack guide](/blog/apple-hosted-asset-packs/) covers upload, processing, external TestFlight, App Review, replacement, and archive behavior. Use the broader [TestFlight release workflow](/blog/testflight-release-management/) to decide which failures block the release.

### App Store distribution

Submit the exact pack versions required by the build, then verify their App Store status in App Store Connect. A passed local test, successful upload, or completed project task isn't evidence that a pack is available to customers.

## 7. Cut over with an evidence-based rollback rule

Define the cutover receipt before release:

```text
Release and build:
ODR inventory reviewed:
Managed pack IDs and versions:
Supported OS matrix:
Clean-install evidence:
Update evidence:
Internal TestFlight evidence:
External TestFlight evidence, if used:
App Review status:
Live verification:
Rollback trigger:
Rollback action:
Owner:
```

A rollback shouldn't mean “put ODR back somehow.” It should name the last compatible build and pack versions, what can be resubmitted under Apple's current rules, and how the app behaves while content is unavailable. If restoring ODR wouldn't work for a new app or an app that never used it, don't list that as a recovery option.

Add these gates to your [App Store Connect release checklist](/blog/app-store-connect-release-checklist/) and close them only against recorded evidence.

## Track the migration in LaunchBuddy without overstating it

LaunchBuddy can hold the migration as a version-scoped release with tasks for the inventory, extension, manifests, compatibility branches, local tests, pack uploads, TestFlight passes, and App Store verification. Default App Store submission checklists are free; reusable custom checklists require Pro. Project data syncs through the user's private iCloud account across iPhone, iPad, and Mac.

The verified LaunchBuddy feature set covers planning and checklists, not ODR source analysis, Xcode target editing, asset packaging or upload, download validation, or asset-pack status. Apple's tools remain authoritative for code, artifacts, testing, review, and distribution. LaunchBuddy's role here is to keep the owners, evidence, and release decision attached to the app version.

## Copy this migration checklist

- [ ] Record every ODR tag, call site, content group, size, and failure path.
- [ ] Decide Apple hosting or self-hosting for each replacement.
- [ ] Map each behavior to `essential`, `prefetch`, or `onDemand`.
- [ ] Set first-install and update events explicitly where required.
- [ ] Add and configure the downloader extension and shared App Group.
- [ ] Create reproducible manifests and packaged archives.
- [ ] Replace one vertical slice and verify missing-content UI.
- [ ] Document the path for every supported OS below 26.
- [ ] Test clean installs, app updates, interruptions, storage pressure, and pack replacement.
- [ ] Record exact app build and pack versions in TestFlight.
- [ ] Submit the intended pack versions and verify App Store distribution.
- [ ] Preserve a cutover receipt and executable recovery plan.
- [ ] Remove the legacy path only after every supported route passes.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy and track the migration as version-scoped release tasks</a>.
