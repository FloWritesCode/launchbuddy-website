---
title: "TestFlight What to Test Examples: 8 Copy-and-Paste Templates"
description: "Eight TestFlight What to Test examples for onboarding, purchases, sync, layouts, regressions, upgrades, offline use, and release-candidate testing."
pubDate: 2026-09-02
---

Effective **TestFlight What to Test** text tells a tester four things: what changed in this build, the exact path to try, the expected result, and what evidence to send if reality differs. Keep it build-specific. “Please test the app and send feedback” is too broad to produce focused evidence.

Use this compact pattern:

```text
Focus: [one flow or risk in this build]
Setup: [account, device, data, or starting state]
Try:
1. [first action]
2. [next action]
3. [edge case or repeat action]
Expected: [observable result]
Report: [screenshot, crash context, device/OS, or step where behavior differed]
Known: [relevant limitation or excluded path]
```

Replace every bracketed prompt with facts verified against the uploaded build. The examples below are starting points, not claims about your app.

## What belongs in TestFlight What to Test

Apple asks for **What to Test** when you add a build to a testing group in App Store Connect. Its [internal-tester instructions](https://developer.apple.com/help/app-store-connect/test-a-beta-version/add-internal-testers) say the text is available to testers in every group that can access that build. Apple also lets you add localized versions.

A useful note therefore describes the current build, not the beta program in general. Include:

- the version and build you mean;
- one primary testing objective;
- any setup a tester needs;
- a short, reproducible path;
- an observable expected result;
- the most useful details to include in feedback; and
- known issues that would otherwise waste the tester's time.

Don't promise that a test “passes” merely because no one reports a problem. Silence can mean the instruction was unclear, the flow wasn't attempted, or feedback wasn't submitted.

## 1. New-user onboarding example

Use this when the build changes first-run education, account creation, permissions, or initial setup.

```text
Focus: New-user onboarding in version [version], build [build].

Setup: Use a fresh test account in [supported account state].

Try:
1. Start the app and complete onboarding without skipping steps.
2. Choose [representative option] when asked.
3. Finish setup and open [first destination].
4. Close and reopen the app.

Expected: Each step explains the next action, setup completes once, and reopening
the app goes to [expected screen] without repeating onboarding.

Report: The step where you hesitated or stopped, the text you expected to see,
and a screenshot if the layout or wording was unclear.

Known: [List a real known limitation, or remove this line.]
```

Avoid asking whether onboarding “feels good.” Point testers to the decision or transition you changed. A report such as “I didn't know whether Continue would create an account at step 3” is easier to act on than “onboarding was confusing.”

## 2. Purchase, subscription, or restore example

Use this only after verifying the product configuration, account state, and expected result for the uploaded build. Apple's [TestFlight purchase-testing guide](https://developer.apple.com/help/app-store-connect/test-a-beta-version/testing-subscriptions-and-in-app-purchases-in-testflight/) explains the TestFlight and sandbox behavior that applies to these tests.

```text
Focus: [Product name] purchase and restore flow in version [version], build [build].

Setup: Use [the documented test-account state]. Confirm the test product
[identifier or display name] is available before starting.

Try:
1. Open [screen] and select [product].
2. Complete or cancel the test purchase once.
3. Relaunch the app and verify [expected entitlement state].
4. Use Restore Purchases from [path].

Expected: The app shows [specific success/cancel state], grants only the expected
test entitlement after success, and restores that entitlement without duplication.

Report: Which step failed, the displayed product and price, the account state,
and any App Store message. Do not send account passwords or payment details.

Known: [Any scenario intentionally outside this build's test scope.]
```

Don't paste production credentials into What to Test. If a test requires private access details, distribute them through the appropriate controlled channel.

## 3. Sync across devices example

A sync test needs an initial state, a second device, and a conflict rule. “Test sync” leaves all three undefined.

```text
Focus: Sync of [record type] between supported devices in build [build].

Setup: Sign in to the same test account on [device A] and [device B].
Create one record named "Beta [build]" on device A.

Try:
1. Confirm the record appears on device B.
2. Edit [one field] on device B.
3. Return to device A and verify the edit.
4. Make the documented conflict case: [specific simultaneous/offline edit].

Expected: Both devices converge on [documented result], with no duplicate or
missing record.

Report: Device models, OS versions, the last successful step, connection state,
and whether the issue reproduced after relaunch.

Known: [Unsupported platform, delay, or conflict case, if applicable.]
```

Only state a timing expectation if the app has a documented one. “Eventually appeared after reconnecting” and “did not appear after the documented refresh action” are more useful than an invented speed threshold.

## 4. iPhone, iPad, Mac, or visionOS layout example

When different groups test the same build, use clearly labeled platform branches in one note. Apple says one build's What to Test information is available to every group with access to that build.

```text
Focus: [Screen or flow] layout on [platform/device class] in build [build].

Try:
1. Open [path] with [representative content state].
2. Test [portrait/landscape/window sizes] supported by this build.
3. Increase text to [supported accessibility text-size case].
4. Open the keyboard, sheet, sidebar, or menu changed in this build.

Expected: Primary actions remain visible and usable; text doesn't overlap or
truncate in the tested configuration; [changed component] keeps its intended order.

Report: Device, OS version, orientation or window size, text-size setting,
the affected screen, and a screenshot.

Known: [Explicitly excluded configuration, if any.]
```

Don't request every device and state in one note. Choose combinations that cover the release risk. If you're recruiting through a public link, the [TestFlight public link criteria guide](/blog/testflight-public-link-criteria/) shows how to align device and OS eligibility with that question.

## 5. Fixed bug or regression example

For a claimed fix, ask testers to reproduce the old trigger and then check nearby behavior that the change might have disturbed.

```text
Focus: Verify the fix for [plain-language bug] in build [build].

Setup: Start with [data/account/device state that previously triggered the issue].

Try:
1. Follow the former reproduction path: [steps].
2. Repeat the action [number justified by the risk].
3. Check [adjacent flow] once to catch a likely regression.

Expected: [Former failure] no longer occurs, the app shows [observable result],
and [adjacent flow] still behaves as documented.

Report: Whether the old issue reproduced, the exact step, device and OS,
and crash or screenshot feedback when available.

Known: This test does not cover [real excluded case].
```

Don't write “Bug fixed.” That tells the tester your conclusion instead of giving them a way to challenge it.

## 6. Upgrade or data-migration example

An upgrade test should preserve a known pre-update state. Never ask a tester to risk important personal data without a safe, explicit test setup.

```text
Focus: Upgrade from version [previous version] to [version], build [build].

Setup: In the previous beta or approved version, create this test data:
- [record A]
- [setting B]
- [offline/downloaded item C]

Try:
1. Install the new TestFlight build over that prepared version.
2. Open [each relevant screen].
3. Edit one migrated record and relaunch the app.

Expected: The prepared data remains available, settings keep their documented
values, the edited record persists, and no duplicate setup flow appears.

Report: Previous version/build, new build, device and OS, missing or changed data,
and the first screen that differed. Don't include personal data in screenshots.

Known: [Unsupported source version or intentionally reset setting.]
```

If installing over a particular older build is essential, confirm testers can still access that build before sending the instruction.

## 7. Offline and reconnection example

Define what is supposed to work offline and what should wait for a connection. Otherwise, a tester can't distinguish a defect from an intentional boundary.

```text
Focus: [Flow] while offline and after reconnection in build [build].

Setup: Open [required content] while connected. Then enable Airplane Mode or
otherwise disconnect the test device.

Try:
1. View [content expected to remain available].
2. Create or edit [operation documented to work offline].
3. Attempt [operation documented to require a connection].
4. Reconnect and perform [refresh or sync action].

Expected: Offline-supported work remains available, the online-only action shows
[documented state], and queued changes reconcile as [documented result].

Report: The action, connection transition, message shown, whether data persisted,
and any duplicate or missing item after reconnecting.

Known: [Real offline limitation.]
```

## 8. Final release-candidate example

A release-candidate note should be short. Earlier focused builds should have tested individual features; this pass checks the critical path and the exact scope you intend to ship.

```text
Focus: Release-candidate check for version [version], build [build].

Please verify:
1. Launch and complete [primary user goal].
2. Reopen the app and confirm the result persists.
3. Test the changed flow: [path and expected result].
4. Check the resolved blocker: [reproduction path].
5. Send feedback for any crash, data loss, blocked primary action, or text that
describes behavior not present in this build.

Expected: The critical path completes without a blocker and the shipped behavior
matches the release scope below.

In this candidate:
- [verified shipped change]
- [verified shipped fix]

Not in this candidate:
- [known deferred feature or issue]

Report: Build, device, OS, last completed step, expected versus actual result,
and screenshot or crash context when available.
```

The release candidate isn't the place to introduce a new, broad research question. If a core flow still needs discovery, keep the build in a focused beta stage.

## Match each note to one beta question

Before pasting a template, write the decision the test should inform:

```text
For version [version], build [build], we need to learn whether [specific risk]
prevents [specific user goal] for [relevant tester/device state].

We will [ship / fix and retest / defer] based on [named observations].
```

Then remove every test step that doesn't contribute to that decision. For example, a build meant to verify subscription restoration doesn't also need vague requests to review the icon, onboarding copy, and every settings screen.

One build can have several checks, but order them:

1. release-blocking path;
2. changed behavior;
3. likely regression;
4. optional exploratory feedback.

This ordering gives a tester with ten minutes a useful place to start.

## Keep What to Test separate from other App Store text

These fields share release facts, but their audiences differ.

| Text | Audience | Job |
| --- | --- | --- |
| **What to Test** | Beta testers with access to the build | Direct attention to build-specific risks and flows |
| **Beta App Description** | People evaluating or using the beta | Explain the beta app at a broader level |
| **Feedback Email** | Testers who need to contact you | Provide the reply-to and feedback address Apple documents |
| **App Review notes** | Apple reviewers evaluating a submission | Explain private setup and non-obvious review paths |
| **What's New / release notes** | App Store customers | Describe shipped changes in customer-facing language |

Apple's [test-information instructions](https://developer.apple.com/help/app-store-connect/test-a-beta-version/provide-test-information/) say external testing requires additional information, including a Beta App Description and Feedback Email, and that beta information can differ from later App Store submission information.

Don't solve every field by copying the same paragraph. A tester needs a task; an Apple reviewer may need controlled credentials and a review path; a customer needs a concise account of shipped value. The [App Review notes guide](/blog/app-review-notes/) covers the reviewer-facing field separately.

## Turn feedback into the next build decision

When the beta closes, review evidence against the note:

- Which requested paths were actually attempted?
- Which expected results differed?
- Which reports identify a build, device, OS, and reproducible step?
- Does a blocker need a replacement build?
- Which findings can move to later backlog work?
- Should the next build repeat the same question or isolate a narrower one?

Apple supports screenshot, crash, and written feedback in TestFlight; its [TestFlight overview](https://developer.apple.com/testflight/) describes those feedback paths. The [TestFlight feedback management workflow](/blog/testflight-feedback-management/) shows how to route the resulting evidence without treating every comment as a release blocker.

## Where LaunchBuddy fits

LaunchBuddy can keep the beta question, version-scoped tasks, and submission checklist together on iPhone, iPad, and Mac. Release planning, taskboards, default submission checklists, and iCloud sync are available within the Free plan's two-app and two-release limits. Reusable custom checklists require Pro.

LaunchBuddy doesn't write What to Test in App Store Connect, assign TestFlight groups, distribute builds, display TestFlight feedback, or upload binaries. Keep Apple's build and tester records in App Store Connect. Use LaunchBuddy for tasks such as “draft build 118 test brief,” “verify restore on iPad,” “triage build 118 feedback,” and “decide whether build 119 is required.” The broader [TestFlight release management guide](/blog/testflight-release-management/) connects those tasks to submission work.

Choose the example closest to this build's largest risk, replace every placeholder with verified facts, and <a href="https://apple.co/3iFcjjW">organize the beta release in LaunchBuddy</a>.
