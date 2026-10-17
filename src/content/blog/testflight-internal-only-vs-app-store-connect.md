---
title: "TestFlight Internal Only vs App Store Connect"
description: "Compare TestFlight Internal Only with Xcode's TestFlight & App Store option, choose the right upload path, and recover from the wrong choice."
pubDate: 2026-10-17
---

Choose **TestFlight Internal Only** only when the uploaded build must stay with your App Store Connect team and will never go to external testers or customers. Choose **TestFlight & App Store** for a release candidate, an external beta, or any build you might submit to the App Store.

Both options upload the archive to App Store Connect. The difference is the build's future eligibility. Apple marks an Internal Only upload as internal, so it can be assigned only to internal TestFlight groups. You can't later promote that same uploaded build to external TestFlight or submit it to customers. If you chose it by mistake, archive and upload a replacement with a new build number.

## TestFlight Internal Only vs TestFlight & App Store

Apple's current [Xcode distribution guide](https://developer.apple.com/documentation/xcode/distributing-your-app-for-beta-testing-and-releases) calls the recommended options **TestFlight Internal Only** and **TestFlight & App Store**. In Xcode's custom flow, the broader method is called **App Store Connect**, with a separate **TestFlight internal testing only** setting. That naming explains why developers often search for “TestFlight Internal Only vs App Store Connect.”

| Decision | TestFlight Internal Only | TestFlight & App Store |
| --- | --- | --- |
| Upload destination | App Store Connect | App Store Connect |
| Eligible testers | Internal TestFlight groups only | Internal groups, plus external groups when Apple's requirements are met |
| Eligible for customer submission | No | Yes, after the required setup and review |
| Good fit | Development branch, team-only prototype, experimental build | Release candidate, external beta, build that may ship |
| Can the same uploaded build change lanes later? | No | It already has the wider eligibility |
| Wrong-choice recovery | Upload a new, non-internal build | Restrict distribution through group assignment; uploading broadly doesn't itself release the app |

The safe default is **TestFlight & App Store** when the audience isn't settled. It preserves options, but it doesn't publish anything automatically. You still control group assignment, external TestFlight review, build selection, App Review submission, and release in App Store Connect.

## Choose from the build's maximum intended audience

Don't choose based only on who needs the build today. Choose based on the largest audience that this exact binary may need before it expires or is replaced.

Use **TestFlight Internal Only** when all of these are true:

- The build is for App Store Connect users on your team.
- It is a prototype, development-branch artifact, or internal diagnostic build.
- No outside tester needs this exact artifact.
- It must never become the customer build.
- You accept uploading a replacement if the test becomes release-worthy.

Use **TestFlight & App Store** when any of these are true:

- A contractor, client, customer, or other person outside the App Store Connect team may test it.
- You may invite external testers by email or public link.
- It is a release candidate you might select for an App Store version.
- Internal testing is merely the first gate before wider testing.
- You don't yet know whether the build will advance.

This rule prevents an avoidable dead end: a promising internal build passes every check, but its upload classification makes it ineligible for the next audience.

## What the choice changes in App Store Connect

An Internal Only upload still appears in App Store Connect and TestFlight. Apple's [internal-tester documentation](https://developer.apple.com/help/app-store-connect/test-a-beta-version/add-internal-testers) says it carries an **internal** indicator under the build number. That indicator is a distribution boundary, not a testing status.

Internal testers are App Store Connect users with access to the app. Apple currently allows up to 100 and lets you assign builds through internal groups. Depending on group setup, eligible Xcode uploads can be distributed automatically or added manually. Xcode Cloud builds must be added to groups manually.

The internal marker does not mean:

- the build skipped App Store Connect processing;
- every team member automatically received it;
- testing passed;
- the build can be added to an external group; or
- the build can be selected for customer distribution.

For the broad path, App Store Connect still doesn't send the build to outsiders by itself. Apple's [external-tester instructions](https://developer.apple.com/help/app-store-connect/test-a-beta-version/invite-external-testers) require an external group, a selected build, What to Test information, and tester invitations or a public link. External distribution may also require TestFlight App Review. App Store customer release is a separate submission and review workflow.

Think of the Xcode option as setting an eligibility ceiling:

```text
TestFlight Internal Only
  → App Store Connect processing
  → internal group
  → internal testers
  → stop

TestFlight & App Store
  → App Store Connect processing
  → internal group
  → optional external group and Beta App Review
  → optional App Store version and App Review
```

Eligibility isn't progress. A broadly eligible build can remain internal for its whole life because you never assign or submit it beyond that stage.

## Select the option in Xcode without guessing

For a local Xcode archive:

1. Record the intended audience and whether this exact build may ship.
2. Choose **Product → Archive**.
3. Open **Window → Organizer** if the archive organizer isn't already visible.
4. Select the archive and choose **Distribute App**.
5. Select **TestFlight Internal Only** for a permanently team-only build, or **TestFlight & App Store** for wider eligibility.
6. Complete Xcode's signing, validation, and upload flow.
7. After processing, verify the version, build number, internal indicator, and intended group in App Store Connect.

If you use Xcode's custom route, Apple's guide lists **App Store Connect** as the distribution method and a **TestFlight internal testing only** setting. Apply the same audience decision; don't assume the word “custom” changes the restriction.

For Xcode Cloud, Apple's [distribution-workflow documentation](https://developer.apple.com/documentation/xcode/creating-a-workflow-that-builds-your-app-for-distribution) applies the boundary at the archive action. Use **TestFlight (Internal Testing Only)** for development versions shared with team members, or **TestFlight and App Store** for binaries eligible for public TestFlight and App Store release. Keep separate workflows or explicit branch conditions when prototypes and release candidates shouldn't share a distribution policy.

## Recover if you chose Internal Only by mistake

You can't remove the internal restriction from that uploaded build. Recovery means creating a distinct replacement artifact:

1. Keep the same user-facing version if the replacement still belongs to that planned release.
2. Increment the build number.
3. Archive again from the intended source revision and configuration.
4. Choose **TestFlight & App Store**, or use the custom App Store Connect flow without the internal-only restriction.
5. Wait for processing and verify that the replacement doesn't show the internal indicator.
6. Run the affected internal checks again before assigning it to external testers or selecting it for an App Store version.
7. Update What to Test, issue reports, and release records to name the replacement build.

Apple's [build-upload documentation](https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds/) explains why the number must change: bundle ID and version associate an upload with the app and version record, while the build string uniquely identifies the artifact. The [iOS version number vs build number guide](/blog/ios-version-number-vs-build-number/) shows how to keep the release version stable while replacing a candidate.

Don't silently transfer the old build's test result. Even if the source revision is unchanged, the replacement is a separately packaged and uploaded artifact. Verify its identity, installation, launch, and any release-critical paths before widening access.

## Use a two-lane build record

A small record made before archiving turns the distribution option into an explicit decision:

```text
App and version:
Source revision:
Build number:

Lane:
[ ] Internal-only experiment
[ ] Release-capable candidate

Maximum audience:
[ ] App Store Connect team
[ ] External TestFlight testers
[ ] App Store customers

Selected Xcode option:
Expected TestFlight group:
May this exact build ship?:
Replacement trigger:
Owner:
```

For a feature branch, the replacement trigger might be “prototype accepted for the release.” For a release branch, selecting Internal Only should be treated as a mismatch unless the build is intentionally disposable.

### Worked example: a prototype becomes a release candidate

Suppose version `3.2` has a redesigned onboarding flow:

| Build | Upload choice | Evidence | Decision |
| --- | --- | --- | --- |
| `3.2 (410)` | TestFlight Internal Only | Two team members verify the prototype and request one copy change | Keep as internal evidence; it can't advance |
| `3.2 (411)` | TestFlight & App Store | Copy change applied; install, upgrade, and onboarding checks pass | Assign to the external onboarding group |
| `3.2 (412)` | TestFlight & App Store | External feedback exposes a crash; replacement passes targeted retests | Candidate for final submission checks |

Build 410 wasn't “converted.” Its findings informed build 411. The release record preserves which audience saw each artifact and prevents feedback on 410 from being misattributed to 412.

Once a build enters the wider lane, use a [TestFlight release-management workflow](/blog/testflight-release-management/) to separate internal evidence, external feedback, and final build selection. If external review is required, track the distinct [TestFlight Beta App Review lifecycle](/blog/testflight-beta-app-review/) rather than treating upload eligibility as approval.

## Where LaunchBuddy fits

LaunchBuddy can keep the lane decision, build-specific checks, replacement reason, and final submission tasks with the planned release on iPhone, iPad, and Mac. Release planning, taskboards, default App Store submission checklists, and iCloud sync are available on the Free plan within its two-app and two-release limits. Custom reusable checklists require Pro.

LaunchBuddy doesn't archive, sign, inspect, upload, distribute, or reclassify binaries. It doesn't manage TestFlight groups or show the internal build indicator. Xcode is authoritative for the archive and upload choice; App Store Connect is authoritative for the processed build, tester access, and submission eligibility.

A useful release checklist can include:

```text
[ ] Record maximum audience before archiving
[ ] Verify Xcode distribution option
[ ] Confirm version and build after processing
[ ] Confirm internal indicator matches the plan
[ ] Assign the intended TestFlight group
[ ] Record replacement and targeted retests
[ ] Run final App Store submission checks
```

For the last step, use the [App Store Connect release checklist](/blog/app-store-connect-release-checklist/) against the exact build you plan to submit.

Choose the build's audience before upload, preserve the decision with the release, and <a href="https://apple.co/3iFcjjW">track the handoff in LaunchBuddy</a>.
