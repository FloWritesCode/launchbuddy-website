---
title: "iOS Shortcuts for App Developers with LaunchBuddy"
description: "Build reliable iOS Shortcuts for checking app release work, capturing feedback, and proposing LaunchBuddy updates with clear approval boundaries."
pubDate: 2026-07-27
---

To use **iOS Shortcuts for app development work with LaunchBuddy**, start with a read-only shortcut: select an app, list its releases or release tasks, and show the result. Once that returns the right project consistently, add one narrowly scoped write action. LaunchBuddy read actions do not require Pro, but underlying feature and portfolio limits still apply. Shortcut and Siri write actions require Pro and create proposals in LaunchBuddy's approval flow.

That sequence matters. A successful Shortcut run can mean data was read or a change proposal was submitted. It does not mean a person approved the proposal or that the change was applied.

This guide uses LaunchBuddy's existing actions in Shortcuts on iPhone, iPad, and Mac. It is not a tutorial for adding App Intents to an app you're building. If that is your goal, Apple's [App Intents documentation](https://developer.apple.com/documentation/appintents) explains how developers expose their own app's actions to Siri, Spotlight, Shortcuts, and widgets.

## What LaunchBuddy Shortcuts can and cannot do

LaunchBuddy provides two action groups:

| Path | Verified capabilities | Plan | Result |
| --- | --- | --- | --- |
| Read | List apps, app ideas, releases, release tasks, experiments, and feedback | The read action does not require Pro; underlying feature and Free portfolio limits apply | Returns LaunchBuddy data without proposing a change |
| Write | Create app ideas, experiments, feedback, backlog tasks, and release tasks; complete tasks; update releases | Pro | Enters LaunchBuddy's approval flow |

Read and write actions are available on iPhone, iPad, and Mac. The Free plan supports two apps and two releases, while ASO experiments require Pro. Anyone can view automation approval status, but creating a write proposal requires Pro. Pending Shortcut, AI, and MCP changes share the same approval queue.

Shortcuts do not build, sign, or upload an app binary. They also do not replace App Store Connect or TestFlight. Use Xcode, Transporter, Fastlane, or CI for binary work; use LaunchBuddy actions for its project and release data. The broader [App Store Connect automation guide](/blog/app-store-connect-automation/) explains where those tools fit.

This guide does not assume an exact action label, parameter, output field, or error message. Use the actions and field descriptions shown by your installed LaunchBuddy version rather than copying a name from an unrelated tutorial.

## Build the first read-only shortcut

Apple describes actions as the building blocks of a shortcut. Its [Shortcuts User Guide](https://support.apple.com/guide/shortcuts/create-a-custom-shortcut-apd84c576f8c/ios) recommends creating a shortcut, adding actions in the editor, and testing the finished sequence. Follow that small loop before adding triggers or writes.

On iPhone or iPad, build the shortcut as follows. On Mac, use the equivalent controls in the Shortcuts editor; menu names and interactions differ.

1. Open Shortcuts and create a new shortcut.
2. Give it a specific name, such as `Choose LaunchBuddy Release Work`.
3. Tap **Add Action**, open the **Apps** list, and choose LaunchBuddy. You can also search for LaunchBuddy; Apple documents both discovery methods in its [action-list guide](https://support.apple.com/guide/shortcuts/navigate-the-action-list-apdc33e4f4da/ios).
4. Add the installed LaunchBuddy read action that lists apps.
5. Inspect the action's information to see its output type. If that output is accepted as a list, pass it to **Choose from List** so the shortcut asks which app you mean.
6. Add the appropriate LaunchBuddy read for releases or release tasks, using the selected app wherever the action requests app input.
7. Insert **Quick Look** after each LaunchBuddy read while building. Apple recommends it for seeing what content flows between actions.
8. Run the shortcut in the editor. Confirm that the selected app, release, and tasks match LaunchBuddy.

This is a construction pattern, not a claim about undocumented action names or return fields. Apple's [action-connections guide](https://support.apple.com/guide/shortcuts/action-connections-apda850ab0e1/ios) explains how to inspect an action's accepted input and output types, and its [list-actions guide](https://support.apple.com/guide/shortcuts/use-list-actions-apd4dcacc115/ios) confirms that **Choose from List** exposes the selection as a Magic Variable. The available LaunchBuddy inputs still depend on the version installed on your device.

If the first action returns two apps with similar names, do not silently choose the first item. Keep the picker. A two-second selection is cheaper than reading or changing the wrong release.

### Add an explicit no-result branch

List-based shortcuts need a defined stop condition. After a LaunchBuddy list action, add an **If** branch using a condition compatible with the action's actual output type. When no item is available, use **Stop and Output** with a neutral message such as `No release was returned for the selected app.` Otherwise, continue to **Choose from List**.

Apple documents [Stop and Output](https://support.apple.com/guide/shortcuts/shortcut-completion-apda9578f70f/ios) as a way to end a shortcut early and explain why. This branch gives “no result” a precise meaning without claiming that no release exists. It also prevents later actions from receiving an empty selection.

## Turn the result into a useful release brief

A raw list of tasks is accurate but hard to scan. Add a small formatting layer after the read actions:

```text
Shortcut: Choose LaunchBuddy Release Work

1. List apps in LaunchBuddy
2. Choose one app
3. List releases for the selected app
4. Choose one release
5. List release tasks for the selected release
6. Present the returned task data
```

Only format fields the action actually returns. For example, do not add a sentence saying a release is ready merely because no task appeared in a result. An empty result establishes only that the action returned no items. Check the action's inputs and compare the result with LaunchBuddy before making a readiness decision.

A useful brief separates facts from judgment:

```text
Observed:
- App and release selected in this run
- Release tasks returned by LaunchBuddy

Not established:
- Whether the binary passed testing
- Whether App Store metadata is final
- Whether the version is ready to submit
```

For a full version-level workflow around that brief, use the [iOS app release management guide](/blog/ios-app-release-management/). The Shortcut is a quick view into the plan, not the plan itself.

## Add one write action without losing control

After the read path selects the intended app and release reliably, add a separate shortcut for one write. Do not turn the release brief into a menu of every possible mutation.

Consider a feedback-capture shortcut:

```text
Shortcut: Capture Launch Feedback

1. Ask for feedback text
2. List LaunchBuddy apps
3. Choose the affected app
4. Use the installed LaunchBuddy action for creating feedback
5. Show a message: "Proposal sent. Review it in LaunchBuddy."
```

Map only the parameters displayed by the installed action. If it asks for more context than you have, stop and collect that context instead of filling the field with a guess.

The final message says **proposal sent**, not **feedback created**. Review the pending item in LaunchBuddy, verify the app and requested change, then approve or reject it.

Use the same pattern for release tasks:

```text
Observe → Select → Propose → Review → Verify
```

1. **Observe:** Read the relevant apps, releases, or tasks.
2. **Select:** Require an explicit choice when more than one item can match.
3. **Propose:** Ask for one supported write, such as creating or completing a task.
4. **Review:** Check the pending action in LaunchBuddy before approval.
5. **Verify:** Reopen the project or rerun an appropriate read after approval.

This five-state handoff also creates a useful debugging trail. You can identify whether a failure came from the read, selection, proposal, review, or verification step.

## Use an iPhone or iPad personal automation for a read

Once the read-only shortcut works manually on an iPhone or iPad, it can become a device-specific personal automation. Apple's [personal automation guide](https://support.apple.com/guide/shortcuts/intro-to-personal-automation-apd690170742/ios) lists event, travel, communication, and setting triggers, including time of day and opening an app.

A low-risk example is a weekday release-work reminder:

1. In Shortcuts, open **Automation** and create a personal automation.
2. Choose a time-of-day trigger.
3. Run the read-only release-work shortcut.
4. Present its output or a notification.
5. Test the automation on the same device.

Apple notes that a personal automation is specific to one device. It is backed up to iCloud but does not sync to other devices. If you want the same trigger on an iPhone and iPad, configure and test it on each one.

Apple's [automation settings guide](https://support.apple.com/guide/shortcuts/enable-or-disable-a-personal-automation-apd602971e63/ios) says some automations can run without asking, while individual actions may still need confirmation. Keep unattended automations read-only. A scheduled trigger should not create a daily stream of pending changes.

## Run the shortcut with Siri

Apple says Siri can run any shortcut in your collection when you say its name. Name the shortcut for the request you will actually speak:

- `Choose Release Work`
- `Capture Launch Feedback`
- `Show App Ideas`

Avoid a name that collides with a standard Siri command. Start by running the shortcut from the Shortcuts app, then say its exact name to Siri. Apple's [Siri guide for Shortcuts](https://support.apple.com/guide/shortcuts/run-shortcuts-with-siri-apd07c25bb38/ios) also warns that a shortcut which opens an app may require the device to be unlocked.

If a Siri-run shortcut invokes a LaunchBuddy write action, review the pending change in LaunchBuddy before saying the work is done.

## A practical test checklist

Run these checks before relying on a shortcut during a release:

- **Correct app:** Test with two apps whose names are easy to confuse.
- **Correct release:** Confirm the shortcut does not assume the first returned release is the intended one.
- **Empty result:** Verify the message distinguishes “nothing returned” from “nothing exists.”
- **Permissions:** Run once from the editor and respond only to permissions you understand.
- **Write language:** Make sure any message you add after a write says “proposed” or “pending,” not “created,” “completed,” or “updated.”
- **Approval:** Reject one test proposal and confirm that the underlying project does not change.
- **Verification:** Approve one safe test proposal and verify the result in LaunchBuddy.
- **Device trigger:** If it is a personal automation, test it on every device where you configured it.

For release status that ultimately comes from Apple's systems, keep the source distinction visible. LaunchBuddy organizes project and release work; App Store Connect remains Apple's source of truth for submission state. The [App Store submission tracker guide](/blog/app-store-submission-tracker/) shows how to reconcile those states without collapsing them into one label.

## When MCP is the better interface

Shortcuts are a good fit for a tap, a Siri phrase, or a device trigger. If you want a coding agent on Mac to inspect LaunchBuddy context, use the macOS-only local MCP server instead. Its read tools are free, while Pro write tools create approval proposals. The [LaunchBuddy MCP server guide](/blog/launchbuddy-mcp-server/) covers that separate setup and its localhost boundary.

Neither interface is a route around approval or Apple's release systems. Pick Shortcuts for tap- or Siri-initiated workflows on iPhone, iPad, and Mac, and for device-specific personal automations on iPhone and iPad. Pick MCP for compatible clients working with local LaunchBuddy context on Mac.

If a read-first Shortcut would make your next release easier to check, <a href="https://apple.co/3iFcjjW">download LaunchBuddy on the App Store</a> and build the smallest useful version first.
