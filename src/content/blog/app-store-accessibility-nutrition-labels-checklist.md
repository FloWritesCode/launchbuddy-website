---
title: "App Store Accessibility Nutrition Labels Checklist"
description: "Audit common tasks by device, test all nine accessibility features, record evidence, and publish accurate Accessibility Nutrition Labels in App Store Connect."
pubDate: 2026-09-04
---

To complete your **App Store Accessibility Nutrition Labels**, list the common tasks people perform in your app, create a separate test matrix for each supported device, and evaluate every applicable accessibility feature against every task. Indicate support for a feature only when users can complete **all common tasks** on that device while using it.

The short checklist is:

- [ ] Identify the build, configuration, devices, and reviewer for the audit.
- [ ] List primary tasks plus first launch, login, purchase, and settings flows.
- [ ] Add common widget, notification, extension, and third-party-content paths.
- [ ] Create one task-by-feature matrix per device.
- [ ] Test each applicable feature using Apple's current evaluation criteria.
- [ ] Record pass, fail, not applicable, or blocked for every matrix cell.
- [ ] Fix and retest failures before claiming support.
- [ ] Save responses as a draft in App Store Connect.
- [ ] Review the device-specific summary, publish it, and verify the product page.
- [ ] Reopen affected rows whenever a release changes a common task.

This isn't a general claim that the app is “accessible.” Each label is a specific, device-level statement about the current app. A passing home screen can't compensate for a checkout, login, or settings flow that someone can't complete.

## Gate 1: Freeze the version and audit scope

An accessibility result is meaningful only when it identifies what was tested. Start the record before opening App Store Connect:

```text
App:
Version and build:
Environment and feature flags:
Devices and OS versions:
Supported locales reviewed:
Common-task inventory owner:
Testers:
Audit date:
Previous published labels:
```

Use the app people receive, including production feature flags, required account states, paywalls, remote content, and third-party views that appear in common tasks. If a server response or account entitlement can produce a materially different path, include that state in the test plan.

Apple lets you provide responses per device because support can differ across iPhone, iPad, Mac, Apple TV, Apple Vision Pro, and Apple Watch. Don't copy an iPhone result into another device's matrix without running that device's version of the task.

## Gate 2: Build the common-task inventory

Apple's [overview of Accessibility Nutrition Labels](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels/) defines common tasks as the app's primary functionality plus fundamental flows such as first launch, login, purchase, and settings. Start with what the product page promises, then add the paths required to reach or manage those features.

Use this inventory structure:

| Common task | Entry state | Completion evidence | Devices |
| --- | --- | --- | --- |
| Finish or skip onboarding | Clean install | Main app screen is reachable | iPhone, iPad |
| Sign in and recover access | Signed-out account | Account opens; recovery confirmation appears | iPhone, iPad, Mac |
| Complete the app's primary job | Representative account and data | User-visible result is saved | All applicable devices |
| Start, review, or restore a purchase | Eligible test account | Expected entitlement state appears | Devices offering purchase |
| Change an important setting | Existing account | Setting persists and behavior changes | All applicable devices |

Add empty, loading, offline, validation-error, and permission-denied states when they can occur inside a common task. Also consider actions outside the main app, such as completing a common task from a widget or notification.

Don't inflate the inventory with every obscure screen. Apple suggests a practical boundary: if blocking the task would justify an urgent fix, it is probably common. If a feature is uncommon but still needs explanation, document it on the optional accessibility URL rather than silently treating it as tested.

For third-party or user-generated content, inspect the surrounding experience. When that content is part of a common task, Apple doesn't require every item supplied by someone else to be accessible. It does expect the app to provide a reasonable, discoverable accessibility path, such as accepting image descriptions or caption tracks where relevant.

If you're still turning product scope into testable work, use the trigger questions in the [app idea to task backlog guide](/blog/app-idea-to-task-backlog/) before declaring the inventory complete.

## Gate 3: Create one evidence matrix per device

Put common tasks in rows and the features available for that device in columns. Apple's nine label categories are VoiceOver, Voice Control, Larger Text, Dark Interface, Differentiate Without Color Alone, Sufficient Contrast, Reduced Motion, Captions, and Audio Descriptions. App Store Connect shows only the labels applicable to the selected device.

Use four outcomes in your working matrix. These aren't App Store Connect statuses:

- **Pass:** the task was completed using the feature under test.
- **Fail:** a defect prevented completion or violated the feature's evaluation criteria.
- **Not applicable:** the app has no relevant experience for that feature and task. This is not a support claim.
- **Blocked:** the test couldn't produce a reliable result because the build, account, content, device, or tester setup was unavailable.

A compact evidence row looks like this:

```text
Device:
Common task:
Accessibility feature:
Build and starting state:
Settings enabled:
Steps:
Outcome: Pass | Fail | Not applicable | Blocked
Observed result:
Evidence link:
Defect or follow-up:
Tester and date:
```

Treat a label as an AND condition, not an average:

```text
Claim support for feature F on device D
= every applicable common-task row for F on D passes
```

One failed or blocked common-task row means the evidence isn't sufficient to publish that support claim for the device. Record the defect, fix it, and rerun the affected row plus any related regression paths.

## Gate 4: Test the nine labels against Apple's criteria

The table below is a routing checklist. Follow Apple's linked, current criteria for the full evaluation rather than treating the examples as a substitute.

| Label | Minimum question for every common task |
| --- | --- |
| [VoiceOver](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voiceover-evaluation-criteria) | Can someone navigate, understand, and operate the task using only VoiceOver, without sighted assistance? Check labels, values, states, focus order, modals, text entry, custom controls, and alternatives to complex gestures. |
| [Voice Control](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/voice-control-evaluation-criteria/) | Can someone complete the task using only voice commands, including text entry, scrolling, hidden actions, and custom gestures, without touching the display? |
| [Larger Text](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/larger-text-evaluation-criteria) | Can primary text reach at least 200% or the platform maximum while remaining readable and operable, without destructive overlap or truncation? |
| [Dark Interface](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/dark-interface-evaluation-criteria) | Can the entire task remain dark, without unexpected bright screens or flashes, using the default interface or a supported setting? |
| [Differentiate Without Color Alone](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/differentiate-without-color-alone-evaluation-criteria) | Are status, selection, errors, charts, and other meaning conveyed with text, shape, position, or iconography in addition to color? |
| [Sufficient Contrast](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/sufficient-contrast-evaluation-criteria) | Do text, icons, controls, and states meet the applicable contrast guidance throughout the task, including light and dark appearances? Apple says most text usually needs at least 4.5:1. |
| [Reduced Motion](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/reduced-motion-evaluation-criteria) | Are problematic motion triggers removed or changed when needed, while task meaning and controls remain understandable? Check depth, parallax, spinning, scaling, ongoing motion, and auto-advancing content. |
| [Captions](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/captions-evaluation-criteria) | Does relevant video or audible content provide captions, subtitles, or a suitable transcript, and can users identify and enable it? |
| [Audio Descriptions](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/audio-descriptions-evaluation-criteria) | Is important time-based visual information in video, cut scenes, or similar content available through audio description, and can users identify and select it? |

Test like a user of the feature, not like a developer checking that an API was called. Using standard SwiftUI, UIKit, or AppKit controls can reduce implementation work, but framework choice doesn't prove that the complete task passes. Custom controls, focus changes, asynchronous updates, error messages, charts, web views, and media often need deliberate inspection.

Apple recommends starting with VoiceOver before Voice Control because much of the underlying work can help both. That ordering can make the audit more efficient, but keep the outcomes separate: a VoiceOver pass is not evidence of a Voice Control pass.

For Sufficient Contrast, test the relevant appearance and accessibility-setting combinations rather than recording one color-ratio sample. For media labels, don't indicate support merely because a player can display a track; verify that enough relevant content supplies the track and that a user can discover it.

## Gate 5: Resolve failures without weakening the claim

Use the matrix as a defect queue. A useful accessibility defect includes:

```text
Device + build:
Common task:
Feature under test:
First failing step:
Expected accessible behavior:
Observed behavior:
Reproduction settings:
Fix owner:
Retest evidence:
```

Don't turn **Fail** into **Not applicable** because remediation is inconvenient. And don't remove a mandatory login, subscription, or onboarding row just to make the remaining cells green.

If the task legitimately isn't present on a device, leave it out of that device's matrix and record why. If a label doesn't apply to the app's functionality, don't indicate support for it. “No video” is not the same as “Supports Captions.”

When a common task includes advertising, an inaccessible ad experience can affect the result. When it includes user uploads or third-party media, test the app's discoverable path for supplying and presenting accessibility information. These boundaries are easy to miss if the audit uses only curated sample content.

## Gate 6: Publish the verified responses in App Store Connect

Apple's current [management instructions](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/manage-accessibility-nutrition-labels) require the Account Holder, Admin, Finance, App Manager, or Marketing role.

1. In **Apps**, select the app.
2. Open **App Accessibility** in the sidebar.
3. Select **Get Started**, then choose or confirm the devices to evaluate.
4. Select **Add [Device] Support** for one device.
5. Answer whether the app supports any listed features, then select only the features backed by the completed matrix.
6. Save the responses as a draft.
7. Compare the draft summary with the signed-off evidence.
8. Select **Publish** and confirm each applicable device.
9. Verify the product page on representative devices after publication.

Apple says support can be published only for a device with a live App Store version. You can prepare information while a version is editable, but don't confuse a saved draft with a published label. Published responses take effect immediately and may take up to 24 hours to become visible to everyone.

The optional accessibility URL can explain additional features, settings, caption languages, or known unsupported areas. It should be specific to the app. Apple displays it across device product pages except Apple TV.

Accessibility Nutrition Labels are currently voluntary to start, according to Apple's live documentation, but Apple says they will become required over time for new apps and updates. Don't invent a deadline that Apple hasn't published. Accuracy matters now: Apple points developers to App Review Guideline 2.3 and may ask for misleading labels to be corrected.

## Gate 7: Add release triggers instead of repeating a blind audit

Apple recommends reevaluating support with every app update. That doesn't mean rerunning unrelated cells without thought. Map each release change to the rows and columns it can affect, then run the affected tests and enough regression coverage to trust the result.

| Release change | Matrix scope to reopen |
| --- | --- |
| New onboarding, login, purchase, or settings screen | New task row across every applicable device and feature |
| Custom control, gesture, modal, chart, or text-entry field | VoiceOver and Voice Control; also color and contrast where relevant |
| New layout, localization, or typography | Larger Text, VoiceOver order, contrast, and truncation checks |
| New theme, material, or status color | Dark Interface, Sufficient Contrast, Differentiate Without Color Alone |
| New animation, carousel, parallax, or immersive transition | Reduced Motion |
| New video, podcast, cut scene, or uploaded media | Captions, Audio Descriptions, and third-party-content handling |
| New widget, notification action, extension, or device app | Common-task inventory and a device-specific matrix |
| Changed ad provider or embedded web content | Every label used in the affected common task |

Add the signed-off label review to the wider [App Store Connect release checklist](/blog/app-store-connect-release-checklist/). Keep it attached to the specific version in your [iOS release management workflow](/blog/ios-app-release-management/) so a later feature change doesn't inherit old evidence silently.

## Worked example: a task app on iPhone and Apple Watch

Suppose an app's iPhone version lets people create tasks, schedule reminders, complete tasks, sign in, manage a subscription, and change notification settings. Its Apple Watch app only shows today's tasks and marks one complete.

The iPhone matrix needs rows for the primary task flows plus first launch, login, purchase, and settings. The Watch matrix needs only the common tasks available there, but each still has to be evaluated against the labels App Store Connect offers for Apple Watch.

During VoiceOver testing, “Create task” passes, but the subscription screen's unlabeled close button traps the tester. VoiceOver support for iPhone does not pass yet. That failure says nothing by itself about the Watch result, and fixing it doesn't automatically establish support for Larger Text or Voice Control.

After the fix, preserve the failing record and add retest evidence. The audit history now explains both the claim and the work that made it accurate. A single checkbox saying “Accessibility done” would lose that distinction.

## Use LaunchBuddy for ownership, not certification

LaunchBuddy can organize this audit as release tasks and App Store submission checklist items. Release planning, taskboards, and the default submission checklist are available on the Free plan; reusable custom checklists are a Pro feature.

A practical split is:

```text
LaunchBuddy: owner, release task, checklist trigger, due date, evidence link
Your test process: devices, common-task matrix, defects, retest results
App Store Connect: draft responses, published labels, accessibility URL
```

LaunchBuddy doesn't test the interface, decide whether a label passes, certify accessibility, or publish Accessibility Nutrition Labels. Keep the evidence outside a generic “done” state, and let the person responsible for the app make the final App Store Connect declaration.

Turn the matrix into a repeatable release gate: <a href="https://apple.co/3iFcjjW">download LaunchBuddy and add an accessibility-label review to your next App Store submission checklist</a>.
