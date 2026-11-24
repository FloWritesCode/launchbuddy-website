---
title: "App Clip Default Experience: Setup and Release Guide"
description: "Configure an App Clip default experience with the right link, card metadata, domain association, App Review evidence, and live launch checks."
pubDate: 2026-11-24
---

To configure an App Clip default experience, first upload an iOS build that contains the App Clip. In App Store Connect, open that iOS version, find the **App Clip** section, add a **1800 × 1200-pixel** header image, subtitle, and action, then save. Apple generates a default App Clip link and a demo URL. Apple says they become active after approval; plan the production test for when the version is also available on the App Store.

That short setup only creates the store record. A release-ready experience also needs the correct binary, a launch URL your code handles, an accurate card, useful App Review context, and a successful launch test after release. This guide keeps those proofs separate so a saved card isn't mistaken for a working App Clip.

Apple's App Clip documentation changes over time. The requirements below were checked against Apple's current documentation on November 24, 2026.

## 1. Choose the default experience's launch contract

An App Clip always needs a default experience, but it doesn't always need your own website. Choose the link before preparing the card because the choice changes the server work, supported OS range, and invocation methods.

| Link for the default experience | Best fit | Server association required? | Important boundary |
| --- | --- | --- | --- |
| Apple-generated default App Clip link | One task-oriented experience on iOS 16.4 or later | No | Supports parameters, but not App Clip Codes, Maps, or a Smart App Banner on your website |
| URL on an associated website | A website card or Smart App Banner, or support for iOS 16.3 and earlier | Yes | Both app targets and the website must agree on the association |
| Apple-generated demo URL | A demo rather than a fast task at the point of need | No | Supports QR codes, NFC tags, and App Clip Codes, but doesn't accept URL parameters |

Apple's [configuration guide](https://developer.apple.com/documentation/appclip/configuring-the-launch-experience-of-your-app-clip) lists the supported invocation methods for each option. Don't add website infrastructure by habit. If one Apple-generated default link covers the audience and entry points you support, it can be the simpler production contract.

Write that contract before implementation:

```text
Default experience:
Primary user task:
Launch link type: Apple default | associated website | demo
Minimum supported iOS:
Invocation methods we will publish:
URL parameters the App Clip accepts:
Expected screen or state:
Equivalent full-app destination:
Explicitly unsupported entry points:
```

For example, a café might choose the generated default link, set iOS 16.4 as the minimum for that route, accept an `order` query parameter, and expect the matching pickup screen. Its full app would handle the same order URL. The contract would explicitly exclude Maps, App Clip Codes, and a website Smart App Banner until those paths are configured separately.

The last two lines matter. Apple says that after someone installs the full app, future invocations open the full app instead of the App Clip. The full app therefore needs to handle the same URL and offer the corresponding task. A default experience isn't complete if its link works only while the App Clip is active.

## 2. Prepare the build before editing the card

You can't edit the App Clip section until App Store Connect has a build that includes the App Clip. Apple also requires the App Clip to ship inside its corresponding full app; it isn't a standalone upload.

Before uploading, verify:

- The full app archive contains the intended App Clip target.
- The App Clip and full app both handle the launch contract.
- Unknown, incomplete, or missing invocation URLs reach a safe fallback.
- The version and build number identify the binary you tested.
- Every later app version that should keep the App Clip available also contains it.

Keep a small build receipt:

```text
App version / build:
Commit:
Full app handles invocation URL:
App Clip handles invocation URL:
Missing-URL fallback:
Archive contains App Clip:
Processed build checked in App Store Connect:
```

This catches a common category error: card metadata belongs to an app version, while routing behavior belongs to the binary. Saving one doesn't verify the other.

## 3. Associate your website when the launch or beta path needs it

You can skip website association only if you're using Apple's generated default link or demo URL, don't need a website invocation, and won't create App Clip experiences for TestFlight testers. Apple requires website association for the TestFlight App Clip path even when the released default experience uses a generated link.

For a custom website URL or TestFlight App Clip experience, Apple verifies agreement on both sides:

1. Add the `appclips:` domain to the **Associated Domains** capability for the full app and the App Clip targets.
2. Put the App Clip's app identifier in the domain's Apple App Site Association file under the `appclips` key.
3. Serve that AASA file from the domain's `.well-known` directory.
4. Allow Apple's `AASA-Bot` and `CFNetwork` user agents to reach the file.
5. Repeat the entitlement and AASA setup for every additional domain or subdomain involved.

In the entitlement, use only the domain, such as `appclips:clip.example.com`. Apple's [website-association documentation](https://developer.apple.com/documentation/appclip/associating-your-app-clip-with-your-website) says not to include a wildcard, trailing slash, path, or query.

Document and configure every URL and domain in a redirect chain. If a short URL redirects to a longer URL, Apple requires both URLs to be configured to invoke the App Clip. That means the necessary domains belong in the entitlements, each domain needs its AASA file, and both URLs need App Clip experiences.

After the build is uploaded, check **Domain Status** on the build:

- **Cache Status** reflects the validation used on customer devices.
- **Load Debug Status** asks App Store Connect to validate the domain in real time and reports configuration errors.

Record the domain, processed build, cache status, and debug result together. “The AASA file loads in a browser” isn't enough; the build's entitlement and Apple's validation must agree with it.

## 4. Add the default App Clip card in App Store Connect

Apple's current [default-experience instructions](https://developer.apple.com/help/app-store-connect/offer-app-clip-experiences/offer-a-default-app-clip-experience/) use this path:

1. In **Apps**, select the app.
2. Select the iOS version that contains the App Clip.
3. Scroll to **App Clip**.
4. Add the header image, subtitle, and action.
5. Save.

After saving, record both generated links from App Store Connect with the version receipt. Use the default link for a focused task and reserve the demo URL for a demo experience; they have different parameter and invocation support.

The header image must be:

- JPG, JPEG, or PNG
- 3:2 aspect ratio
- Exactly 1800 × 1200 pixels

The card should describe the task that opens, not the full app's feature list. For a café pickup App Clip, “Collect your current order” is more accurate than “Everything you need for better coffee.” Match the selected action to what happens after the tap, and make the image recognizable without promising a different location or item.

Use a card-to-behavior check:

| Card element | Question to verify |
| --- | --- |
| Header image | Does it represent the experience without implying unsupported content or a different location? |
| Subtitle | Does the text describe the immediate task rather than the whole app? |
| Action | Does the first useful screen let the person perform that action? |
| Launch URL | Does the released binary parse this exact URL and its allowed parameters? |
| Full-app handoff | Does the same invocation reach the equivalent task after installation? |

For localized card text, verify meaning and length on a device instead of treating a translation file as visual proof. Apple allows App Clip card text to be localized, but the actual card still needs to match the destination in every language.

## 5. Give App Review evidence it can reproduce

Apple lets you provide up to three representative URLs in **App Review Information → App Clips URLs** on the version page. These URLs are optional, but they're useful when one URL can't show the important supported paths.

Choose URLs by behavior, not by quantity:

- **Primary task:** the most common path from a fresh invocation
- **Alternate valid route:** a second identifier, item, or supported state
- **Recoverable edge:** a valid route whose content is unavailable or expired

For each URL, state the expected result and any test data that must exist. Don't submit synthetic examples your production routing doesn't support.

```text
Representative URL:
Version / build:
Starting state:
Expected card:
Expected destination:
Expected action:
Test data or account:
Full-app equivalent:
```

Keep passwords and other secrets in App Store Connect, not in a public task or repository. If the flow needs credentials, unusual location state, hardware, or setup, add concise instructions to the version's review information. The [App Review notes guide](/blog/app-review-notes/) has a reviewer-facing template for that handoff.

## 6. Test four different layers

No single App Clip test proves the whole release. Use a ladder in which each layer answers a different question.

### Layer A: Xcode URL handling

Use the App Clip scheme's `_XCAppClipURL` environment variable to send known and unexpected URLs into the development build. This verifies parsing and routing, but Apple notes that the App Clip card doesn't appear in this path.

Pass when the intended URL reaches the intended task, unsupported input reaches the documented fallback, and the full app handles the equivalent universal link.

### Layer B: local card and invocation

Register a local experience in the iPhone's developer settings to test the image, title, subtitle, action, and a QR code, NFC tag, or other supported invocation. A local experience overrides App Store Connect experiences and launches only a Development, Ad Hoc, or TestFlight App Clip. For a TestFlight-distributed App Clip, the tester must first launch one of that build's configured experiences in TestFlight so the App Clip is cached on the device.

Remove the local experience before production testing. A passing local card proves the device-local registration, not the saved App Store Connect record.

### Layer C: TestFlight build behavior

Configure up to three invocation URLs on the processed TestFlight build, then run the build-specific paths. TestFlight doesn't show the App Clip card in this flow. Use the separate [TestFlight App Clip testing workflow](/blog/testflight-app-clip-testing/) for the URL matrix, full-app switch, and replacement-build checks.

Pass when the exact candidate build handles every representative route. Don't report this as proof of production card metadata.

### Layer D: released production experience

Apple says the generated default and demo links become active after approval. Test their customer-facing behavior after the approved version is available on the App Store:

1. Remove any local experience from the device.
2. Use a device and OS version in the supported contract.
3. Invoke the exact published link or website URL.
4. Confirm the App Store Connect card appears where that invocation method supports it.
5. Compare its image, subtitle, and action with the approved record.
6. Launch and verify the expected task and URL parameters.
7. Install or open the full app and verify the same invocation reaches the equivalent destination.

For an associated website, use **Settings → Developer → App Clips Testing → Diagnostics**. Apple's [launch-testing guide](https://developer.apple.com/documentation/appclip/testing-the-launch-experience-of-your-app-clip) says Diagnostics checks the released App Clip, URL association, optional advanced experience, Smart App Banner, and whether the URL fits in an App Clip Code.

## 7. Preserve a production verification receipt

A useful release record identifies what passed and what it proves:

```text
App version / build:
Release date:
Default link type:
Exact invocation URL:
Device / iOS:

Configuration
[ ] Processed build includes App Clip
[ ] Header is 1800 × 1200 JPG, JPEG, or PNG
[ ] Subtitle and action match the immediate task
[ ] Representative review URLs are current

Domain, if used
[ ] Full app and App Clip entitlements contain the domain
[ ] AASA appclips entry contains the App Clip identifier
[ ] Cache Status is valid
[ ] Debug Status reports no configuration error

Evidence
[ ] Xcode URL routing passed
[ ] Local card and invocation passed
[ ] Exact TestFlight build paths passed
[ ] Local experience removed
[ ] Released card and launch passed
[ ] Full app handles the same invocation

Observed result:
Follow-up owner and task:
```

This receipt adds more value than a single “App Clip tested” checkbox. It preserves the boundary between code, local presentation, beta behavior, store configuration, and the live customer path. If a later version breaks one layer, you know which evidence became stale.

## Where LaunchBuddy fits

LaunchBuddy can keep the build, card, domain, review, and live-verification tasks attached to the app version. Its Free plan includes release planning, taskboards, default App Store submission checklists, and iCloud sync within the two-app and two-release limits. Pro adds reusable custom checklists.

LaunchBuddy doesn't create an App Clip, edit entitlements or AASA files, inspect the binary, configure App Clip experiences in App Store Connect, validate a domain, upload a build, or test an invocation. Keep Xcode, your server, App Store Connect, and the released device result authoritative. Use LaunchBuddy for the surrounding release record and follow-up work, then run the broader [App Store Connect release checklist](/blog/app-store-connect-release-checklist/) before submission.

## Frequently asked questions

### Does an App Clip default experience require a website?

Not always. Apple's generated default App Clip link can invoke the default experience without server changes on iOS 16.4 or later. Associate a website if you need a Smart App Banner or website card, support for iOS 16.3 and earlier, or another invocation that the generated link doesn't cover.

### Why doesn't the generated App Clip link work before release?

Approval is one gate, and App Store availability is the practical production-test gate. Before release, test URL handling in Xcode, card presentation with a local experience, and the candidate binary through TestFlight. Those are separate from the final customer-facing link check.

### When do I need an advanced App Clip experience?

Use an advanced experience for multiple card contexts, additional domains, a physical-place association, Maps, or an App Clip serving multiple businesses. App Clip Codes can also use the short form of Apple's demo link, so a code doesn't always require an advanced experience. The default experience is still required.

Turn the verification receipt into version-scoped release tasks, then <a href="https://apple.co/3iFcjjW">organize your App Clip release in LaunchBuddy</a>.
