---
title: "TestFlight App Clip Testing: A Build-by-Build Workflow"
description: "Test an App Clip in TestFlight with up to three invocation URLs, a repeatable test matrix, full-app switching checks, and replacement-build evidence."
pubDate: 2026-10-22
---

To test an App Clip with TestFlight, upload the full app archive that contains the App Clip, open that iOS build in App Store Connect, and add up to three App Clip invocation URLs under **Test Information**. Give each URL a clear title, save the build, distribute it to your testers, and verify every URL against a written expected result. TestFlight covers these URL-based experiences; Apple says other invocation methods aren't supported in this test path.

Treat the setup as build-specific. A configured URL isn't evidence that the right screen, content, or error state appeared in the build your tester installed. The workflow below creates that evidence and gives a replacement build its own test record.

## Before you configure the TestFlight build

Apple doesn't accept an App Clip as a standalone TestFlight upload. Its [App Clip distribution documentation](https://developer.apple.com/documentation/appclip/distributing-your-app-clip) says to archive and upload the corresponding full app bundle with the App Clip inside it.

Prepare these items first:

- A processed iOS build that includes the App Clip
- Account Holder, Admin, or App Manager access in App Store Connect
- One to three HTTPS invocation URLs handled by this App Clip build
- A short, observable expected result for each URL
- A tester who can switch between the App Clip and full app
- Current build-specific instructions for the test group

Don't use the production App Clip card as proof that the beta build is ready. TestFlight's App Clip invocations belong to the selected build's Test Information, while production default and advanced experiences are separate App Store Connect configuration.

## 1. Add App Clip invocation URLs to the build

Apple's [Test an App Clip experience](https://developer.apple.com/help/app-store-connect/test-a-beta-version/test-an-app-clip-experience/) instructions use this path:

1. In App Store Connect, select **Apps**, then choose the app.
2. Open **TestFlight**.
3. Under **Builds**, select the iOS platform.
4. Select the app icon or build string for the build containing the App Clip.
5. In **Test Information**, find **App Clip Invocations**.
6. Select **Add App Clip Invocation**.
7. Enter a title and invocation URL, then add it.
8. Repeat for as many as three URLs and select **Save**.

You can localize each invocation's title using the localizations added to the TestFlight build. The URL itself stays the same across those localizations. Check every configured language: a translated title should describe the same destination rather than promise a different flow.

## 2. Build a three-URL test matrix

Three slots don't mean you need three similar happy paths. Use each URL to expose a different release risk. If the App Clip has only one meaningful route, configure one strong test instead of filling the limit.

| Invocation | What it should isolate | Example expected result | Evidence to keep |
| --- | --- | --- | --- |
| Primary entry | The most common task from a fresh launch | The intended item or service opens and its primary action is available | URL, localized title, screen reached, device, OS, build |
| Alternate route | A second supported identifier or content type | The alternate content opens without reusing stale state from the first route | Starting state, URL, displayed content, build |
| Recoverable edge | A valid route whose content is unavailable, expired, or otherwise limited | The app shows the product's documented recovery state and doesn't strand the tester | URL, test-data state, actual message or destination, build |

Those examples are a structure, not universal App Clip behavior. Replace them with states your app actually implements. Don't create a synthetic edge URL that your routing contract doesn't support.

Record the matrix before inviting testers:

```text
Version / build:
App Clip included in archive: verified / not verified

Invocation A
- URL:
- Localized title(s):
- Starting state:
- Expected destination:
- Expected data or action:
- Evidence requested:

Invocation B
- URL:
- Localized title(s):
- Starting state:
- Expected destination:
- Expected data or action:
- Evidence requested:

Invocation C
- URL:
- Localized title(s):
- Starting state:
- Expected destination:
- Expected data or action:
- Evidence requested:
```

This separates configuration from behavior. “URL saved” is an App Store Connect check; “URL A opened the correct order in build 241” is test evidence.

## 3. Give testers an exact switching sequence

Apple's [TestFlight overview](https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview/) says an invited tester can test both the full app and its App Clip, but only one can be installed on the device at a time. Testers can switch between them in TestFlight.

Use that behavior deliberately:

1. In TestFlight, choose the App Clip for the assigned beta.
2. Launch invocation A from a clean starting state and record the result.
3. Repeat for the remaining configured URLs, resetting only the state your test plan specifies.
4. Switch to the full app in TestFlight and verify the full-app path named in your release plan.
5. Switch back to the App Clip and rerun the release-blocking invocation.

The last step catches assumptions about state left behind by the full app. Define the expected state first; don't label shared, retained, or reset data a bug unless it differs from your app's intended behavior.

For the rest of the beta packet, keep the App Clip matrix beside your [TestFlight test information](/blog/testflight-test-information/) and adapt the [What to Test template](/blog/testflight-what-to-test-examples/) to name the exact invocation and expected result.

## 4. Test the URL path and the real-world invocation path separately

Apple currently limits this TestFlight workflow to the configured invocation URLs. Its documentation explicitly says testing other invocation methods isn't supported here.

That means a successful TestFlight pass doesn't validate an NFC tag, QR code, App Clip Code, Safari or Messages link, or another discovery surface. Keep two separate results:

```text
TestFlight build result
- Invocation URL routing:
- App Clip behavior:
- Full-app switching:
- Tester feedback:

Release-environment result
- Discovery surface tested:
- Associated production configuration:
- Physical placement or encoded value:
- Observed card and launch:
```

TestFlight is useful for the uploaded binary and URL-driven experience. A production-like check is still needed for each discovery method you intend to ship. Keeping the records separate prevents a passing URL test from being misreported as end-to-end proof of a QR or NFC launch.

## 5. Collect evidence that identifies the experience

Apple says testers on supported iOS versions can submit feedback on an App Clip experience. In App Store Connect, the [tester feedback view](https://developer.apple.com/help/app-store-connect/test-a-beta-version/view-tester-feedback/) includes screenshots, crash-related comments, and general comments, with filters such as app version, build, OS version, and device.

Ask for evidence that distinguishes one invocation from another:

```text
Invocation label and URL:
Version and build:
Device and OS:
Starting state:
Expected destination or result:
Actual destination or result:
Last successful step:
Screenshot or crash context, if available:
```

Don't ask testers to include passwords, payment details, or private personal data in screenshots or comments. When evidence arrives, classify it as a release blocker, a later task, or no action with a reason. The [TestFlight feedback management workflow](/blog/testflight-feedback-management/) provides a broader triage process.

## 6. Recheck every invocation on a replacement build

App Store Connect exposes App Clip Invocations from an individual build's Test Information page. When you upload a replacement:

1. Open the replacement build rather than the superseded one.
2. Confirm the App Clip is present in that archive.
3. Inspect the invocation titles, URLs, and localizations on the replacement build.
4. Correct or add the intended values and save.
5. Update What to Test with the replacement build number.
6. Run the matrix again, including the full-app switching check.
7. Link each result to the replacement build and retire evidence for the old one.

Don't assume a URL or test result carries forward merely because the marketing version is unchanged. The evidence belongs to the binary the tester actually used.

## A release-ready App Clip TestFlight checklist

```text
Build
[ ] Full app archive includes the App Clip
[ ] Intended version and build are processed
[ ] Internal or external test group has the intended build

Invocations
[ ] One to three supported URLs are configured on this build
[ ] Each title describes its route
[ ] Every build localization has been checked
[ ] Expected result is written for each URL

Testing
[ ] Each URL reaches the expected build state
[ ] Alternate routes don't reuse unintended stale state
[ ] Recoverable edge behaves as documented
[ ] Tester switches to the full app and back
[ ] Release-blocking invocation passes after the switch

Evidence
[ ] Result names the URL, build, device, and OS
[ ] Actual result is compared with the written expectation
[ ] Feedback is triaged into a release decision
[ ] Replacement build, if any, has a fresh matrix result

Scope
[ ] URL testing isn't presented as proof of QR, NFC, or App Clip Code behavior
[ ] Planned real-world invocation methods have separate checks
```

## Where LaunchBuddy fits

In LaunchBuddy, you can turn the matrix into release tasks, preserve its assumptions in project notes, and run submission checks on iPhone, iPad, and Mac. Release planning, taskboards, default submission checklists, and iCloud sync are available on the Free plan within its two-app and two-release limits; custom reusable checklists require Pro.

LaunchBuddy doesn't build or upload an App Clip, configure invocation URLs, switch the TestFlight installation, or inspect App Clip behavior and feedback. Keep those operations and records authoritative in Xcode, TestFlight, and App Store Connect. Use LaunchBuddy for surrounding work such as “verify invocation B on build 241,” “repeat the full-app switch,” and “recheck all URLs on build 242.”

For the wider build-to-submission process, see the [TestFlight release management guide](/blog/testflight-release-management/).

## Frequently asked questions

### Can TestFlight test an App Clip QR code or NFC tag?

Not through Apple's App Clip invocation setup for a TestFlight build. Apple says that workflow supports up to three invocation URLs and currently doesn't support testing other invocation methods. Test the intended QR, NFC, or App Clip Code discovery path separately before release.

### Can the App Clip and full app be installed together during the beta?

No. Apple says only the full app or its App Clip can be installed on a device at one time. An invited tester can switch between them in TestFlight.

### Do I upload the App Clip separately to TestFlight?

No. Archive and upload the full app bundle that contains the App Clip, then configure App Clip invocations on that processed iOS build in App Store Connect.

Turn this matrix into release tasks, then <a href="https://apple.co/3iFcjjW">organize the App Clip beta in LaunchBuddy</a>.
