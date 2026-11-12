---
title: "iPhone App on Apple Silicon Mac: Release Checklist"
description: "Test and release an iPhone app on Apple silicon Mac with correct availability, minimum macOS, TestFlight, and compatibility settings."
pubDate: 2026-11-11
---

**To offer an iPhone app on an Apple silicon Mac, test the exact iOS build on a Mac, check its calculated minimum macOS version, confirm the app-level Mac availability setting is selected, and verify the live Mac App Store result.** Use a Mac-enabled TestFlight group before release. Only select Apple's compatibility verification after the app works as intended and you're prepared to keep future versions compatible.

The distributed app isn't a separate Mac build. Apple delivers the existing iOS binary through the Mac App Store to compatible Apple silicon Macs. That makes distribution simple, but it doesn't prove that touch interactions, hardware-dependent features, purchases, sign-in, and other critical paths work well with Mac input and behavior.

The checklist below keeps the build, beta test, store setting, and compatibility claim separate so that one green checkbox doesn't stand in for all four.

## Know which Apple silicon Mac control you're changing

Apple exposes several related controls with different scopes. Record them separately before changing anything:

| Control | Scope | What it actually decides |
| --- | --- | --- |
| **Apple Silicon Mac Availability** | App level, across all versions | Whether the iPhone or iPad app is offered through the Mac App Store |
| **Minimum macOS version** | App setting plus build requirements | Which macOS versions can install the app |
| **TestFlight Mac testing** | Tester-group level, across every build in that group | Whether that group's iOS builds can be tested on Apple silicon Macs |
| **Verify Compatibility** | Current and future app versions | Tells Apple that the app is compatible and functions as intended on Apple silicon Mac |
| **Native macOS platform** | A separate platform build in the app record | Replaces the iOS app's Mac App Store presence after the native Mac version is released |

The production availability checkbox doesn't enable TestFlight Mac access. A successful TestFlight install doesn't change production availability. Raising the minimum macOS version also doesn't fix a general Mac compatibility problem.

## 1. Identify the exact release candidate

Start with a build receipt instead of a general statement that “the iPhone app works on Mac.”

```text
App:
iOS version and build:
Bundle ID:
Minimum iOS version in build:
LSMinimumSystemVersion, if present:
Minimum macOS version shown by Apple:
Apple silicon Mac model:
macOS version tested:
TestFlight group:
Production Mac availability:
Compatibility verification state:
Tester:
Test date:
```

Apple derives Mac requirements from the uploaded build. If you replace the build or increase the iOS deployment target, repeat the check. Tie evidence to both the version and build number; the [version number and build number serve different purposes](/blog/ios-version-number-vs-build-number/).

First, rule out a record conflict. Apple's [availability documentation](https://developer.apple.com/help/app-store-connect/manage-your-apps-availability/manage-availability-of-iphone-and-ipad-apps-on-macs-with-apple-silicon) says the option isn't available when a universal-purchase app already has a macOS platform presence. In that case, test and release the macOS build instead of looking for the iOS-on-Mac checkbox.

## 2. Audit the app for Mac-specific failure risks

Apple says these apps use the same frameworks, resources, and runtime environment as on iOS or iPadOS, with no porting step. “Same binary” isn't the same as “same device.”

Before beta testing, list every critical flow that depends on:

- Touch-only gestures or controls without a clear mouse or trackpad path
- An iPhone or iPad hardware capability
- A framework, symbol, or behavior that may not be available on Mac
- Camera, microphone, notification, photo, file, or other permission handling
- External accessories, nearby devices, or device orientation
- Sign-in redirects, universal links, document handoffs, or share flows
- Purchases, entitlement restoration, or account state shared with another device

Apple's technical session on [iPad and iPhone apps on Apple silicon Macs](https://developer.apple.com/videos/play/wwdc2020/10114/) calls out three hard compatibility boundaries: unavailable symbols or frameworks, missing functionality in an existing framework, and hardware capabilities that don't exist on Mac. Treat each dependency as a test case rather than assuming the system supplies an equivalent.

For input-heavy apps, test the complete task with a mouse and keyboard. Apple's [Mac guidance for iOS apps](https://developer.apple.com/videos/play/wwdc2022/10076/) recommends direct keyboard and cursor support; Touch Alternatives can translate some Mac input into touch gestures, but it shouldn't hide an inaccessible or confusing primary workflow.

## 3. Inspect the minimum macOS version Apple calculated

Don't guess the Mac requirement from the iOS deployment target. Check the value Apple displays for the uploaded build:

1. In App Store Connect, open the app.
2. Select **TestFlight** and the iOS platform.
3. Open the exact build.
4. Select **Build Metadata**.
5. Record **Minimum iOS Version**, **Minimum macOS Version**, and **LS Minimum System Version** when present.

Apple's [build metadata reference](https://developer.apple.com/help/app-store-connect/manage-builds/view-builds-and-metadata) explains the calculation. It uses `LSMinimumSystemVersion` when applicable and the macOS version corresponding to the build's `MinimumOSVersion`. If the minimum chosen in Pricing and Availability is higher, Apple displays that higher value.

Use the app-level minimum to exclude an older macOS version only when your evidence shows an OS-version-specific failure. Don't use it as a substitute for fixing or opting out of a build that fails on every tested Mac.

Record the decision:

```text
Calculated minimum macOS:
Manually selected minimum macOS:
If higher, failing behavior on lower macOS:
Build and Mac used to reproduce:
Retest owner:
```

## 4. Create a dedicated Mac TestFlight lane

Apple controls iOS-on-Mac beta access at the tester-group level, and the setting applies to every build in that group. A dedicated group makes the test population and evidence easier to interpret.

To enable it:

1. Open the app's **TestFlight** tab.
2. Select the intended tester group.
3. Open the group's **Settings** tab.
4. Under **Test iPhone and iPad apps on Apple silicon Macs**, select **Enable**.
5. Confirm that the intended build is assigned to that group.

These steps come from Apple's current [TestFlight instructions for Apple silicon Mac](https://developer.apple.com/help/app-store-connect/test-a-beta-version/test-iphone-and-ipad-apps-on-macs-with-apple-silicon). The minimum macOS selection in Pricing and Availability applies to enabled TestFlight groups too. If the app is opted out of Mac App Store availability, Apple says the build's `LSMinimumSystemVersion` controls TestFlight compatibility.

Keep Mac testing distinct from the broader [TestFlight release-management workflow](/blog/testflight-release-management/). The group setting answers “can these testers install this build on Mac?” The test record must still answer “did the critical workflows pass?”

## 5. Test the exact build on an Apple silicon Mac

Install the candidate through TestFlight, not just from Xcode, for the release pass. Xcode is useful while fixing code; TestFlight exercises the build and group configuration you're relying on.

Use this practical matrix:

| Area | Pass criteria | Evidence |
| --- | --- | --- |
| Install and launch | Correct build installs and reaches a usable first screen | Build receipt and screenshot or test note |
| Input | Primary workflows complete with mouse or trackpad and keyboard where relevant | Steps completed and any blocked gesture |
| Window behavior | Essential content and controls remain reachable in supported window states | Tested states and result |
| Permissions and hardware | Each required capability succeeds or shows a truthful fallback | Capability, permission state, result |
| Account and links | Sign-in, sign-out, redirects, and external handoffs return correctly | Account type and path tested |
| Data | Applicable create, edit, sync, and delete behavior matches the app's promise | Test account and result |
| Purchases | Buy, restore, entitlement, and cancellation-sensitive UI behave correctly where applicable | Store environment and result |
| Notifications and background work | Applicable user-visible behavior works or fails safely | Trigger and observed result |
| Accessibility | Keyboard navigation and the app's supported accessibility paths remain usable | Input method and issue log |
| Update | A prior available build updates without losing required state | From/to builds and result |

Adapt the rows to the app. A camera utility and a text editor don't need the same matrix. Keep the release blocked if a core promise has no usable Mac path, even when the app launches.

When a test fails, preserve the environment:

```text
Build:
Mac model:
macOS version:
Input method:
Account and entitlement state:
Steps:
Expected:
Observed:
Production blocker? yes / no
Decision: fix / raise minimum macOS / opt out / accept with documented limitation
```

This turns “broken on Mac” into a reproducible release decision.

## 6. Choose one explicit release disposition

After testing, select one outcome:

### Offer the app and verify compatibility

Choose this only when the candidate passes and you're committing to test future versions on Mac. Apple's compatibility section describes the verification as applying to current and future versions, and the verification option is no longer available after you confirm it.

### Offer the app without making the verification claim yet

Availability and compatibility verification are separate controls. If the candidate is usable but your long-term regression process isn't ready, keep the app available and defer the broader verification claim.

### Raise the minimum macOS version

Use this when a confirmed problem is limited to older macOS versions and the candidate passes on the selected minimum and later versions. Save the reproduction evidence with the decision.

### Opt out

Opt out when a core workflow is unusable, a required capability has no safe fallback, or you can't maintain a Mac test pass. This is better than distributing an app whose main promise fails after install.

Don't let a non-blocking cosmetic issue automatically force the same decision as data loss, failed entitlement restoration, or an unreachable primary action. Write the threshold before reviewing defects.

## 7. Apply and verify production availability

An Account Holder, Admin, or App Manager can edit the setting:

1. In App Store Connect, open the app.
2. Select **Pricing and Availability**.
3. Find **iPhone and iPad Apps on Apple Silicon Mac**.
4. Under **Apple Silicon Mac Availability**, select or deselect **Make this app available**.
5. Choose the tested minimum macOS version.
6. Save.

This choice applies to every app version. Run the compatibility checklist again for later releases; one successful build isn't permanent evidence.

After the change is live, use a Mac that meets the selected requirement to verify:

- The intended app appears in the Mac App Store.
- The product page represents the correct app.
- Download or update succeeds.
- The installed version corresponds to the intended release.
- A short production smoke test passes.
- Support documentation reflects the Mac availability decision.

Finish the rest of the version's metadata and submission work with an [App Store Connect release checklist](/blog/app-store-connect-release-checklist/).

## 8. Plan the handoff before adding a native Mac app

An iOS app running on Apple silicon Mac is not a macOS platform build. If you later add and release a native macOS version in the same universal-purchase record, Apple says it replaces the iOS app on the Mac App Store and existing Mac users update to the macOS app.

That makes the first native Mac release an update migration, not a fresh listing. Before release, test:

- Existing account and local-data continuity
- Purchase and entitlement continuity
- Document locations and migrations
- URL and file-opening behavior
- Version-to-version update behavior
- Product-page claims and Mac screenshots
- Support messaging for features that changed

Use the [universal purchase guide](/blog/app-store-universal-purchase/) to plan the shared record and its irreversible consequences. Don't add the macOS platform merely to improve an iOS-on-Mac experience before the native build and migration are ready.

## Copyable iPhone-app-on-Mac release checklist

```text
Scope
[ ] Record iOS version and build
[ ] Confirm no existing macOS platform conflict
[ ] Record current production availability and verification state

Compatibility audit
[ ] Inventory touch-only interactions
[ ] Inventory required hardware and framework behavior
[ ] Define pass criteria for critical workflows

Build requirements
[ ] Open Build Metadata for the exact candidate
[ ] Record Minimum iOS Version
[ ] Record Minimum macOS Version
[ ] Record LS Minimum System Version, if present
[ ] Justify any higher app-level minimum with test evidence

TestFlight
[ ] Create or select a dedicated Mac tester group
[ ] Enable iPhone and iPad app testing on Apple silicon Mac
[ ] Assign the exact candidate build
[ ] Confirm the intended testers and Mac environments

Release test
[ ] Install through TestFlight
[ ] Pass launch, input, window, permission, account, and data tests
[ ] Pass purchase and restore tests when applicable
[ ] Pass update and production-critical regression tests
[ ] Record every blocker with build, Mac, and macOS details

Decision
[ ] Choose: offer and verify / offer without verify / raise minimum / opt out
[ ] Record who approved the disposition
[ ] Save the evidence with the release

Production
[ ] Apply app-level Mac availability
[ ] Save the tested minimum macOS version
[ ] Verify Mac App Store discovery, install or update, and smoke test
[ ] Add Mac regression coverage to the next release

Native Mac future
[ ] Treat a later macOS build as an update migration
[ ] Test account, data, document, and entitlement continuity
```

## Where LaunchBuddy fits

LaunchBuddy can keep this decision with the app and exact release: create tasks for the capability audit, preserve the chosen disposition beside the version, and, with Pro, reuse the Mac checks in a custom submission checklist. A useful pattern is to make the evidence task build-specific:

```text
[Mac] Test iOS 4.2 (301) on macOS [tested version]
Result: pass
Evidence: build receipt and test matrix
Decision: keep available; compatibility verified
Next release: repeat critical-path pass
```

LaunchBuddy doesn't change Apple Silicon Mac Availability, calculate the minimum macOS version, install the TestFlight build, inspect compatibility, or verify the app for you. App Store Connect, the uploaded build, and testing on a real Apple silicon Mac remain authoritative.

If you want the Mac compatibility work attached to the release it protects, <a href="https://apple.co/3iFcjjW">download LaunchBuddy and add the checklist to your next version</a>.
