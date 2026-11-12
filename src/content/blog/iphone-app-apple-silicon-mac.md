---
title: "iPhone App on Apple Silicon Mac: Release Checklist"
description: "Offer an iPhone or iPad app on Apple silicon Macs with the right availability, minimum macOS version, TestFlight setup, compatibility tests, and evidence."
pubDate: 2026-11-12
---

**An iPhone or iPad app can be offered on the Mac App Store for Macs with Apple silicon without a separate port.** In App Store Connect, confirm that **Make this app available** is selected, review the minimum macOS version, test the iOS build on an Apple silicon Mac, and only then verify compatibility. The availability setting is app-wide, so it applies to every version rather than one release candidate.

Don't treat the checkbox as the test. Apple's setting answers whether Mac users may obtain the app; your build evidence answers whether they should. Use the checklist below to keep those decisions separate.

## Before you start: separate app, TestFlight-group, and build scope

This workflow has three scopes that are easy to mix up:

| Scope | Apple control | What it affects |
| --- | --- | --- |
| App | Apple Silicon Mac Availability | Whether all versions of the iPhone or iPad app are offered on the Mac App Store |
| TestFlight group | Test iPhone and iPad apps on Apple silicon Macs | Whether every build in that tester group can be tested on compatible Macs |
| Build | Your test record | What you actually verified for one version and build |

Apple's [availability documentation](https://developer.apple.com/help/app-store-connect/manage-your-apps-availability/manage-availability-of-iphone-and-ipad-apps-on-macs-with-apple-silicon/) says users need a Mac with Apple silicon running macOS 11 or later. It also says the app-level choice applies to all versions. Apple's [TestFlight instructions](https://developer.apple.com/help/app-store-connect/test-a-beta-version/test-iphone-and-ipad-apps-on-macs-with-apple-silicon) put Mac testing at the group level and apply it to every build in that group.

That creates a useful release rule: make the distribution decision at app scope, configure the intended tester group once, but earn compatibility again for every release candidate.

## 1. Decide whether the iOS build or a macOS app owns the listing

Before changing availability, inspect the app record's platform plan.

An iPhone or iPad app running on Apple silicon isn't the same as a native macOS app or a Mac Catalyst app. Apple says the iOS app uses the same frameworks, resources, and runtime environment it uses on iOS or iPadOS; there is no porting process for this distribution option.

The choice changes when the app record already includes macOS:

- If a universal-purchase app already has a Mac App Store presence through its macOS platform, App Store Connect won't also offer the iOS build on the Mac App Store.
- If the iOS build is currently offered on Mac and you later add and release a macOS platform version in the same app record, the macOS app replaces it on the Mac App Store. Existing users are updated to the macOS app.

Use the [universal purchase guide](/blog/app-store-universal-purchase/) before adding the macOS platform. Adding macOS is a product and migration decision, not a way to improve this compatibility checkbox.

Record the decision:

```text
Mac experience for this release: iOS app / macOS app / Mac Catalyst app / neither
App Store Connect app record:
Current Mac platform already present: yes / no
Mac availability owner:
Reason this experience is acceptable on Mac:
Replacement by macOS platform planned: yes / no
```

Stop if nobody can state which binary Mac customers should receive.

## 2. Inspect app-level availability and the minimum macOS version

The Account Holder, Admin, or App Manager can edit this setting in App Store Connect:

1. Open **Apps** and select the app.
2. Choose **Pricing and Availability**.
3. Find **iPhone and iPad Apps on Apple Silicon Mac**.
4. Under **Apple Silicon Mac Availability**, review **Make this app available**.
5. Review the minimum macOS version.
6. Save only after comparing the values with the release plan.

Apple automatically calculates a minimum macOS version from two build values: `LSMinimumSystemVersion`, when present, and the macOS version corresponding to the iOS build's `MinimumOSVersion`. If you select a higher minimum in Pricing and Availability, Apple displays that higher value instead.

Don't copy the iOS deployment target into a release note and call it the Mac requirement. Save what App Store Connect actually displays, along with the source build:

```text
iOS version / build:
MinimumOSVersion:
LSMinimumSystemVersion, if present:
Minimum macOS shown in App Store Connect:
Manual minimum selected: yes / no
Reason for a higher manual minimum:
Checked by / date:
```

A higher manual floor may be appropriate when the app relies on behavior only available in a newer macOS release, but it reduces the eligible Mac audience. Test the lowest version you intend to support rather than choosing it from memory.

## 3. Create a dedicated Mac TestFlight lane

Apple lets you test the iPhone or iPad app on Apple silicon through TestFlight. Enable it on the group that should receive Mac testing:

1. Open the app's **TestFlight** tab.
2. Select the intended tester group.
3. Open the group's **Settings** tab.
4. Under **Test iPhone and iPad apps on Apple silicon Macs**, select **Enable**.

Because the control applies to all builds in the group, name the lane by purpose, not by one build. A group such as `Apple silicon Mac compatibility` remains clear when build 184 is replaced by build 185.

Keep the expected build explicit in the test packet:

```text
TestFlight group:
Mac testing enabled:
Expected version / build:
Effective minimum macOS requirement:
Tester Mac model and macOS:
Install source: TestFlight
Previous build removed or superseded:
```

The minimum macOS selected under Apple Silicon Mac Availability also applies to enabled TestFlight groups. If you've opted out of Mac App Store availability, the build's `LSMinimumSystemVersion` sets TestFlight compatibility instead. Recheck the effective requirement whenever the applicable source changes.

For group ownership, build replacement, and feedback routing, use the broader [TestFlight release management workflow](/blog/testflight-release-management/).

## 4. Test the Mac experience, not just installation

A successful install proves distribution, not compatibility. Test the app's real customer journeys with a keyboard, trackpad, and Mac environment. Exercise window resizing when the app's iPad multitasking support makes it available.

Apple's [WWDC session on iPhone and iPad apps on Mac](https://developer.apple.com/videos/play/wwdc2021/10056/) recommends local testing with **My Mac (Designed for iPad)** as the Xcode run destination. Debugging and unit tests remain available there. Use that for fast development checks, then install the release candidate through the same TestFlight group your beta testers use.

Build a small matrix around the app's behavior:

| Area | Test | Pass evidence |
| --- | --- | --- |
| Launch and state | Fresh launch, relaunch, background and foreground | Intended screen appears; saved state is correct |
| Input | Complete core tasks with pointer and keyboard | No required action depends on an unavailable touch gesture |
| Window | Resize when supported; enter full screen; reopen; test orientation or zoom for fixed-size windows | Content remains reachable and legible |
| Menus and text | Select, copy, paste, type, dismiss sheets | Standard Mac input doesn't trap or skip the workflow |
| Files and sharing | Import, export, share, or open links the app supports | The expected picker, target, or browser opens |
| Media | Play, pause, route audio, enter and leave full screen when supported | Controls and playback state remain usable |
| Location and hardware | Exercise flows using location, camera, motion, or other device assumptions | A supported fallback or clear unavailable state appears |
| Account and purchases | Sign in, purchase or restore only where the app supports them | Entitlements and customer state match the test account |
| Notifications and links | Open supported notifications and app links | The intended in-app destination appears |
| Accessibility | Run the app's supported keyboard and assistive-technology paths | Core tasks remain operable |

This is a risk menu, not a claim that every app implements every row. Remove irrelevant checks and add app-specific ones. A drawing app may need detailed gesture and Apple Pencil fallback decisions; a document app may need deeper file-access testing.

Attach evidence to the exact candidate:

```text
Version / build:
Mac model / chip:
macOS version:
Install path: Xcode / TestFlight
Core journeys tested:
Failures and severity:
Known limitations shown to users:
Tester:
Date:
Release decision: pass / fix and retest / opt out
```

When a replacement build arrives, copy the test plan, not the pass result. The new binary needs its own evidence even though App Store Connect availability didn't change.

## 5. Choose whether to verify, remain available, or opt out

Use the evidence to make one of three explicit decisions.

### Verify compatibility

In **Pricing and Availability**, the **Compatibility with Apple Silicon Macs** section offers **Verify Compatibility** after a platform build has been uploaded. Apple describes this as confirming that current and future versions are compatible and function as intended. Once verified, the option is no longer available in App Store Connect.

That scope is broader than one passing candidate. Verify only when the app has a repeatable Mac regression lane and the team intends to preserve compatibility in future releases.

### Remain available without making the verification claim

Apple distinguishes availability from verified compatibility. If the app is available but you aren't ready to make the broader statement, keep testing and document the unresolved risk. Don't mark an internal task complete merely because the app can be downloaded.

### Opt out

If a core workflow fails or the Mac experience isn't one you can support, clear **Make this app available** and save. This removes the app-level offer on the Mac App Store; it isn't a substitute for fixing or withdrawing an iOS release.

Use a decision gate:

```text
[ ] Correct iOS version and build tested
[ ] Minimum supported macOS tested
[ ] Core journeys pass with Mac input
[ ] Device-only assumptions have usable outcomes
[ ] Account, purchase, and restore paths pass when applicable
[ ] Known limitations are acceptable
[ ] Support owner is ready for Mac reports
[ ] Future releases include a Mac regression task

Decision: verify / remain available / opt out
Approver:
Date:
```

## 6. Verify the public result after release

After the release or availability change propagates, check the customer path rather than relying on the saved App Store Connect state:

- Find the app from an eligible Apple silicon Mac.
- Confirm the displayed macOS requirement matches the release record.
- Obtain or update the app through the expected account.
- Launch the public build and repeat one critical journey.
- Confirm support and product-page copy don't imply a native Mac app if customers receive the iOS build.
- Record the store check, installed version, build, Mac, and macOS version.

If the public result differs from the plan, separate store configuration, storefront propagation, account eligibility, and build behavior before changing another setting.

This final receipt belongs beside the normal [App Store Connect release checklist](/blog/app-store-connect-release-checklist/), not inside an undated app-level note.

## 7. Plan the handoff to a macOS app

If a Mac version is coming later, plan the replacement before adding the macOS platform. Apple's current documentation says releasing that macOS app replaces the iOS app on the Mac App Store and updates existing users to the macOS app.

Test the handoff as a migration:

```text
Current iOS-on-Mac public version:
First macOS version / build:
Shared app record and bundle ID confirmed:
Customer data migration tested:
Sign-in and entitlement continuity tested:
Purchase and restore behavior tested:
Documents and settings preserved or explained:
Feature differences documented:
Product-page copy and screenshots reviewed:
Support rollback or recovery plan:
Public update verified:
```

Don't promise a rollback to the iOS-on-Mac listing. Decide how to recover through a corrected macOS build, customer communication, or support before release.

## Track the release in LaunchBuddy

LaunchBuddy can track the Mac decision and version-specific tasks beside the release. Default App Store submission checklists, release taskboards, iCloud sync, and limited project notes are available on the Free plan for up to two apps and two releases; custom checklists and unlimited project notes require Pro.

The useful pattern is to keep app scope and build scope visible in task names:

```text
[App] Confirm Apple Silicon Mac availability
[Build 185] Test minimum macOS on M2 MacBook Air
[Build 185] Retest purchase restoration
[App] Decide whether to verify compatibility
[Public] Check Mac App Store requirement and installed build
```

LaunchBuddy doesn't change Mac availability, calculate the minimum macOS version, configure TestFlight groups, inspect the binary, or validate Mac compatibility. App Store Connect, Xcode, TestFlight, and your test evidence remain authoritative.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy and track your Apple silicon Mac checks alongside your next release</a>.
