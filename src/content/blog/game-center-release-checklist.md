---
title: "Game Center Release Checklist: From Xcode to App Review"
description: "Ship Game Center safely with checks for permanent IDs, localizations, Xcode and TestFlight testing, multiplayer compatibility, review, and live status."
pubDate: 2026-11-25
---

A **Game Center release checklist** should prove three things: the build uses the intended Game Center configuration, App Store Connect contains the right components for that version, and Apple received the complete review packet. Before submission, freeze the permanent IDs, test locally and against Game Center, clear leaderboard test data, attach the components to the correct release, and record their post-review status.

Use these seven gates:

1. Lock the version, bundle ID, and permanent component IDs.
2. Enable Game Center in the distribution target and App Store Connect version.
3. Finish every leaderboard, achievement, localization, and compatibility setting.
4. Run isolated Xcode checks before writing server data.
5. Test the processed build with controlled Game Center accounts.
6. Clear leaderboard test data and assemble the review packet.
7. Verify the app version and components after review and release.

Apple owns Game Center configuration and status. A project checklist is evidence that you performed the work, not evidence that Apple's record is correct.

## Start with a Game Center release manifest

Create one manifest for the version before changing Xcode or App Store Connect:

```text
App / platform:
Version / build:
Bundle ID:
Game Center enabled in target:
Game Center enabled for app version:

Leaderboards: reference name | ID | type | sort order | score range
Achievements: reference name | ID | points | hidden | repeatable
Challenges and activities:
Supported localizations:
Compatible apps and earliest compatible versions:

Local test owner:
Game Center account test owner:
Review submission owner:
Live verification owner:
```

This becomes the join between code, the processed build, and App Store Connect. Don't use display names as the join key. Apple's references say both [leaderboard IDs](https://developer.apple.com/help/app-store-connect/reference/game-center/leaderboards/) and [achievement IDs](https://developer.apple.com/help/app-store-connect/reference/achievements/) are permanent after creation.

If you maintain several apps, a dated [App Store Connect catalog report audit](/blog/app-store-connect-catalog-reports/) can help find identifier differences. Confirm every release-blocking mismatch in the live App Store Connect record and in the build; the report is only a snapshot.

## Gate 1: freeze identifiers and irreversible choices

Review the manifest against the constants and configuration used by the release candidate.

- [ ] The Xcode target, App ID, App Store Connect app record, and manifest use the same bundle ID.
- [ ] Every GameKit lookup uses the intended leaderboard or achievement ID.
- [ ] No display name is being used where code requires an ID.
- [ ] Leaderboard type, score format, sort order, submission type, and score range match the game rules.
- [ ] Achievement point values, hidden state, and repeatability match the implementation.
- [ ] A second person or a fresh comparison has checked every new permanent ID.

Treat this as a configuration freeze. A typo in customer-facing text can usually be corrected; an identifier mismatch can leave the binary reporting to a different component than the one you prepared for review.

Some edits are destructive or unavailable later. Apple's [leaderboard management documentation](https://developer.apple.com/help/app-store-connect/configure-game-center/manage-leaderboards/) says shrinking a score range permanently removes scores outside the new range. Once a leaderboard is available in Game Center, it can't be deleted. Once an achievement is available to players, it can't be deleted and its point value can't be changed. Use archive controls for eligible live components rather than assuming deletion is a rollback plan.

## Gate 2: enable the capability and the app version

Apple's [Game Center overview](https://developer.apple.com/help/app-store-connect/configure-game-center/overview-of-game-center/) separates setup into Xcode, App Store Connect, implementation, testing, and distribution. Check both sides of that boundary:

- [ ] Add the Game Center capability to the app's distribution target in Xcode.
- [ ] Confirm the release archive includes the Game Center entitlement.
- [ ] Confirm the App Store Connect app record matches the bundle ID.
- [ ] On the intended platform version page, enable Game Center.
- [ ] Record who checked each side and when.

Don't copy the capability from a development target and assume the archived target inherited it. Inspect the target and archive configuration used for distribution.

There is also a one-way version boundary. Apple's [app-version documentation](https://developer.apple.com/help/app-store-connect/configure-game-center/manage-an-app-version-for-game-center/) says that after a version is approved with Game Center enabled, Game Center can't be disabled for that version. You can disable it only when submitting a later app version. Make the enablement decision before the review packet leaves your control.

## Gate 3: complete components, localizations, and compatibility

Build a row for every component that this version creates or changes:

| Component | ID checked in build | Required fields complete | Locales complete | Added to release | Test result |
| --- | --- | --- | --- | --- | --- |
| Leaderboard |  |  |  |  |  |
| Achievement |  |  |  |  |  |
| Challenge |  |  |  |  |  |
| Activity |  |  |  |  |  |

For leaderboards, verify the score's meaning as well as whether a value can be submitted. A time leaderboard sorted in the wrong direction can be technically functional and still rank players incorrectly. Check singular and plural score suffixes, localized display names, descriptions, any localized image, and which leaderboard is the default.

For achievements, test the pre-earned and earned descriptions, image, point value, hidden behavior, and whether the same player may earn it more than once. Apple's [achievement setup documentation](https://developer.apple.com/help/app-store-connect/configure-game-center/manage-achievements/) requires at least one localization and supports up to 100 achievements per app. Apple's reference caps a single achievement at 100 points and all achievements at 1,000 points total.

Use a locale matrix instead of checking only the default language:

```text
Locale:
Leaderboard name and description:
Score format and suffix:
Achievement display name:
Pre-earned description:
Earned description:
Image:
In-build wording checked:
```

For newer Game Center components, preserve their relationships too. A challenge needs its associated leaderboard; if game mechanics changed, review the [challenge minimum version](https://developer.apple.com/help/app-store-connect/configure-game-center/manage-challenges/) so older builds aren't invited into an incompatible competition. Check every leaderboard or achievement associated with an [activity](https://developer.apple.com/help/app-store-connect/configure-game-center/manage-activities/) and verify its deep link.

If you use an Xcode GameKit bundle, pull the current App Store Connect configuration before reconciling changes, then sync the intended configuration back. Deleting a resource from the local bundle doesn't remove the copy already in App Store Connect, so confirm the live record separately.

If the game uses matchmaking, configure [multiplayer compatibility](https://developer.apple.com/help/app-store-connect/configure-game-center/add-multiplayer-compatibility/) before testing it. In App Store Connect, compatibility names the apps that can interact and the earliest compatible version for each. Apple allows compatibility across different bundle IDs, and only Game Center-enabled versions are selectable. Test every boundary you declare: current-to-current, current-to-oldest-compatible, and any cross-app match.

## Gate 4: run isolated Xcode checks first

Use Xcode's Game Progress Manager for fast checks that shouldn't write to the Game Center server. Apple's [GameKit configuration documentation](https://developer.apple.com/documentation/gamekit/enabling-and-configuring-game-center) says this test data stays local to the Mac and supports simulated progress, scores, and deep links on a connected physical device. The tool requires iOS 18.4 or later, macOS 15.4 or later, tvOS 18.4 or later, or visionOS 2.4 or later; use server-backed device testing for release paths outside that tool's availability.

Run the local pass before TestFlight:

- [ ] The local player initializes at app launch, including cancellation and error paths.
- [ ] Each leaderboard receives boundary and representative scores.
- [ ] Sort order and formatted score text match the intended rules.
- [ ] Each achievement reports partial and complete progress correctly.
- [ ] Hidden and repeatable achievement behavior matches the manifest.
- [ ] Game Center UI and activity deep links return to the correct in-game destination.
- [ ] A local reset returns the test scenario to a known starting point.

Local simulation proves the app-side logic in isolation. It doesn't prove that App Store Connect has the same IDs, that multiplayer compatibility is correct, or that server-backed data behaves as expected. Keep those conclusions for the next gate.

## Gate 5: test the processed build without leaking prerelease activity

Distribute the processed release candidate through TestFlight and use Game Center accounts reserved for prerelease work. Keep this pass attached to the exact version and build in your [TestFlight release record](/blog/testflight-release-management/).

Apple's [testing overview](https://developer.apple.com/help/app-store-connect/configure-game-center/overview-of-testing-game-center/) has an important caveat: prerelease testing uses the same Game Center server environment as released games. A tester can interact with the full player base, and that tester's friends may see unreleased scores, achievements, challenges, activities, or even that the tester played the unreleased game.

If that visibility matters, use dedicated accounts and tightly control their friend relationships. “TestFlight” does not mean “private Game Center sandbox.”

Test at least:

- [ ] First launch with a signed-out player, then sign-in and retry.
- [ ] Score submission, retrieval, formatting, and ranking for each leaderboard.
- [ ] Achievement progress, completion, hidden state, and repeat behavior.
- [ ] Two-player or group matchmaking across every declared compatibility boundary.
- [ ] Upgrade behavior from the oldest compatible live version.
- [ ] Network loss, cancellation, account restrictions, and resumed play.
- [ ] Game Center UI, invitations, activities, and deep links used by the game.
- [ ] The exact release candidate on every supported Apple platform that implements the feature.

Record evidence by component rather than writing “Game Center passed”:

```text
Version / build:
Component ID:
Device / OS:
Game Center test account:
Starting state:
Action:
Expected result:
Observed result:
Evidence:
Pass / fail:
Follow-up task:
```

## Gate 6: clear test data and assemble the right review packet

After server-backed testing, use App Store Connect's **Game Center → Leaderboards → … → Delete Test Data** action. Apple explicitly says to [remove leaderboard test data](https://developer.apple.com/help/app-store-connect/configure-game-center/remove-leaderboard-test-data/) before submitting the app for review.

Don't turn that instruction into a broader claim. It clears leaderboard test data; it isn't a substitute for checking each tester's achievement state or for resetting Xcode's separate local Game Progress Manager data.

Then freeze the review packet:

- [ ] All release-candidate tests pass or have an explicit blocking decision.
- [ ] Leaderboard test data has been removed and the time is recorded.
- [ ] Every new or modified component has complete metadata and the intended localization.
- [ ] The correct components are associated with the intended platform version.
- [ ] Multiplayer compatibility matches the tested matrix.
- [ ] App Review notes explain how to reach and exercise non-obvious Game Center features.
- [ ] The draft contains the intended app version, build, and Game Center components.

For a first Game Center submission, include the components in the same submission as the app version. Apple's [Game Center submission instructions](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-game-center-components/) allow later new or modified components to be submitted without an app version; Apple reviews those against the latest platform version selected in the submission. A single submission can contain up to 200 Game Center components.

Write reviewer instructions against the selected build, not a generic design document. The [App Review notes guide](/blog/app-review-notes/) provides a concise test-path format.

Finally, distinguish **Add for Review** from **Submit for Review**. Adding a component makes it part of a draft; it doesn't send the packet to Apple. Use the [draft-submission handoff](/blog/app-store-connect-draft-submissions/) and verify **Waiting for Review** after the final submit action.

## Gate 7: verify review and live behavior

Track the app version and each component separately. Apple's leaderboard and achievement references distinguish these states:

- **Ready for Review:** complete and added to a draft, but not submitted.
- **Waiting for Review:** Apple received the submission.
- **In Review:** App Review is evaluating it.
- **Accepted:** this component passed, but another item in the submission was rejected.
- **Live:** accepted and ready for distribution.

“Accepted” is not always the final release receipt. If another item in the packet failed, resolve or remove that item before treating the component as publishable.

After release, run a clean-account check:

- [ ] The public build initializes Game Center.
- [ ] Live leaderboards and achievements appear with the intended localization.
- [ ] A new score and achievement update are accepted and displayed correctly.
- [ ] Matchmaking works across the declared live compatibility matrix.
- [ ] Deep links and invitations open the correct public build.
- [ ] The component status is Live in App Store Connect.
- [ ] The storefront, build, account, device, and verification time are recorded.

Do not reuse the prerelease account's accumulated state as the only launch proof. A clean account catches first-use, hidden-achievement, and empty-leaderboard behavior that an experienced tester can no longer reproduce.

## Copy-and-use Game Center release checklist

```text
Identity and configuration
[ ] App, platform, version, build, and bundle ID recorded
[ ] Game Center capability and archive entitlement verified
[ ] App Store Connect version enabled for Game Center
[ ] Permanent component IDs compared with release-candidate code
[ ] Leaderboard rules and achievement behavior frozen
[ ] Default leaderboard, challenge minimum version, and component associations checked
[ ] Component localizations complete
[ ] GameKit bundle changes reconciled with App Store Connect, if used
[ ] Multiplayer compatibility and earliest versions recorded

Testing
[ ] Isolated Xcode Game Progress Manager pass complete
[ ] Exact processed build tested with controlled Game Center accounts
[ ] Every component tested individually and together
[ ] Multiplayer boundaries, upgrades, errors, and deep links tested
[ ] Prerelease friend visibility accepted or isolated
[ ] Failures converted into owned release tasks

Submission
[ ] Leaderboard test data removed
[ ] App Review test path and account details verified
[ ] Correct app version, build, and components present in draft
[ ] First components paired with app version
[ ] Add for Review followed by Submit for Review
[ ] Waiting for Review receipt recorded

Release
[ ] App version and every component reached the intended status
[ ] Clean-account live check passed
[ ] Localizations, rankings, achievements, matchmaking, and links checked
[ ] Live evidence and follow-up owner recorded
```

## Keep LaunchBuddy on the planning side

LaunchBuddy can hold the version-scoped manifest, Game Center tasks, test evidence, reviewer handoff, and live checks. Default App Store submission checklists are available on the Free plan within its two-app and two-release limits; reusable custom checklists require Pro.

LaunchBuddy doesn't create Game Center components, inspect entitlements or binaries, validate gameplay, clear test data, configure compatibility, upload builds, or submit Game Center items to App Review. Xcode, the tested build, Game Center, and App Store Connect remain authoritative.

Make the checks repeatable without confusing the checklist with Apple's state: <a href="https://apple.co/3iFcjjW">download LaunchBuddy and attach a Game Center preflight to your next release</a>.
