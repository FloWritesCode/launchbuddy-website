---
title: "Xcode Cloud TestFlight Distribution: Setup and Release Gates"
description: "Configure an Xcode Cloud workflow for internal or external TestFlight distribution, with safe triggers, blocking tests, archive settings, and verification."
pubDate: 2026-10-27
---

To set up **Xcode Cloud TestFlight distribution**, create a distribution workflow with a Test action, an Archive action, and a TestFlight post-action. Choose **TestFlight (Internal Testing Only)** for a build that must stay with App Store Connect users who have access to your app. Choose **TestFlight and App Store** for an external beta or any build that may become the customer release. Set deliberate start conditions, make release-blocking tests **Required To Pass**, and verify the resulting build and tester group in App Store Connect.

Don't use one broad “successful build means distribute” rule for every audience. An internal feedback build and a release candidate have different eligibility, review, and notification consequences. Give each lane its own contract, even if both lanes use the same scheme.

## Start with two distribution contracts

Apple allows one workflow with several conditions or separate workflows. For a small app, two workflows make the boundary easier to inspect:

| Setting | Internal feedback | Release candidate |
| --- | --- | --- |
| Purpose | Put frequent development builds in front of internal testers who have App Store Connect access | Produce a build that can move from internal sign-off to external TestFlight or App Review |
| Example start condition | Changes to a selected development branch or a schedule | A release tag or Manual Start |
| Blocking test scope | Fast tests for install-critical and changed behavior | Tests required by the release gate |
| Archive deployment preparation | **TestFlight (Internal Testing Only)** | **TestFlight and App Store** |
| Maximum audience | Internal TestFlight groups | Internal groups, external groups after Apple's requirements, or customers after App Review |
| TestFlight post-action | A narrowly defined internal group | Internal sign-off group, external group, or a manual App Store Connect handoff |
| Final evidence | One team member installs the exact build | Intended audience, review state, notification choice, and exact build are confirmed |

Name them by consequence, such as `Internal Feedback` and `Release Candidate`, rather than `CI 1` and `CI 2`. Add a description that states the expected branch or tag, audience, and whether the resulting build may ship.

The two-lane model prevents an easy-to-miss failure: an internal-only build works well, but the same uploaded artifact can't be promoted to external testers or customers. Apple's [distribution workflow guide](https://developer.apple.com/documentation/xcode/creating-a-workflow-that-builds-your-app-for-distribution) explicitly separates the two archive options.

## 1. Open or create the Xcode Cloud workflow

You must initially configure the project or workspace for Xcode Cloud in Xcode. After the first build, Apple lets you edit and create workflows in either Xcode or the Xcode Cloud area of App Store Connect.

For each distribution lane:

1. Open the workflow editor in Xcode or App Store Connect.
2. Give the workflow a purpose-specific name and description.
3. For a release-capable workflow, enable **Restrict Editing** in General. Apple requires this when the workflow must create a build eligible for App Review.
4. In Environment, select the Xcode and macOS versions your project requires.
5. Select **Clean** for the distribution workflow. Apple's current setup guide includes this in its distribution checklist, and its workflow reference specifically requires a clean build when a post-action distributes to external TestFlight testers.

A clean environment doesn't prove the app is release-ready. It only removes reused derived data and other cached build information from that run. Apple notes that clean builds take longer, so don't present the extra time as a quality signal.

## 2. Choose a trigger that represents permission to distribute

Xcode Cloud can start on branch changes, pull request changes, tag changes, a schedule, or manually. The trigger should answer, “What event authorizes this audience to receive a new build?”

Practical choices include:

- **Development branch or schedule:** useful for an internal feedback group that expects frequent updates.
- **Release branch:** useful when merging into that branch means the release checks should start.
- **Release tag:** useful when creating a tag is an explicit promotion decision.
- **Manual Start:** useful when a human must review scope or service readiness before consuming build time and distributing an artifact.

Avoid sending every default-branch change to a release-candidate group. Apple's [start-condition reference](https://developer.apple.com/documentation/xcode/configuring-start-conditions) warns that the default branch-change condition may run more often than needed and documents schedule, tag, and manual alternatives.

Record the trigger in plain language:

```text
Workflow: Release Candidate
Starts when: A tag beginning with release- is created
Authorized audience: Internal sign-off group
May advance to: External onboarding group, then App Review
Stop condition: Required tests fail or release owner withdraws the candidate
```

This record catches configuration drift. If the workflow says “release tag” but starts on every change to `main`, the trigger and the claimed release gate disagree.

## 3. Add tests that can actually stop distribution

Add a Test action for the platform, scheme, test plan, and destinations that matter to this lane. In the action settings, select **Required To Pass** for any test whose failure should fail the Xcode Cloud build. Apple's [workflow-actions documentation](https://developer.apple.com/documentation/xcode/configuring-your-xcode-cloud-workflow-s-actions) distinguishes this from **Not Required to Pass**.

Don't mark a test blocking merely to make the workflow look strict. Use a short decision table:

| Test result | Should the build still reach this group? | Setting |
| --- | --- | --- |
| Launch or sign-in smoke test fails | No | Required To Pass |
| Purchase restoration test fails on a subscription release | No | Required To Pass |
| Non-critical experimental test is flaky and the group is investigating that test | Possibly | Not Required to Pass, with a named owner |
| Release-candidate upgrade test fails | No | Required To Pass |

If another workflow already runs comprehensive tests, Apple's distribution guide says the distribution workflow doesn't necessarily need to duplicate them. Make the dependency explicit, though. Record which completed workflow and source revision supply the evidence; “tests passed earlier” is too vague for a candidate built from a later commit.

## 4. Configure the Archive action for the largest intended audience

An Archive action is required for TestFlight distribution. Under **Deployment Preparation**, choose:

- **TestFlight (Internal Testing Only)** for development, nightly, pull-request, or other builds that must stay with internal testers.
- **TestFlight and App Store** for external TestFlight distribution or a build that may be submitted to the App Store.

Choose based on the largest audience this exact binary may need, not only the first group that will see it. An Internal Only build is marked as internal after upload and can't later go to an external group or customers. Recovering from the wrong choice requires another archive and a new build number; the [TestFlight Internal Only comparison](/blog/testflight-internal-only-vs-app-store-connect/) covers that boundary in detail.

For a multiplatform app, configure an Archive action for each platform included in this workflow. Then make the verification record platform-specific. An iOS archive succeeding doesn't prove the macOS archive or its intended group is ready.

## 5. Add the TestFlight post-action deliberately

Add a TestFlight post-action and select only the intended individual testers or TestFlight groups. Apple's Xcode Cloud distribution guide says the people or groups selected in that post-action receive the update on their test devices.

There is an important control boundary here:

- App Store Connect's **Enable automatic distribution** setting on an internal group applies to eligible Xcode uploads.
- Apple's [internal-testing help](https://developer.apple.com/help/app-store-connect/test-a-beta-version/add-internal-testers) says Xcode Cloud builds aren't added by that group setting.
- A configured Xcode Cloud TestFlight post-action is the cloud workflow's distribution route.
- Without that post-action route, add the processed Xcode Cloud build to the intended group manually in App Store Connect.

In other words, don't enable an internal group's automatic-distribution checkbox and assume it covers Xcode Cloud. The [TestFlight automatic distribution guide](/blog/testflight-automatic-distribution/) compares those controls and the separate external-notification setting.

For a release candidate, decide whether the post-action should distribute immediately or stop at an internal sign-off group. Keep the external step manual when you still need evidence that only exists after processing, such as a clean install of the uploaded artifact or a service-readiness decision.

## 6. Prepare the external TestFlight handoff

External testing adds requirements beyond a successful cloud archive. Use **TestFlight and App Store**, a clean workflow, current [TestFlight test information](/blog/testflight-test-information/), an external group, and a build-specific **What to Test** brief. External distribution is subject to TestFlight App Review.

When adding the build to an external group, App Store Connect may show **Submit Review** or **Start Testing**, depending on the build's state. Apple's [external-tester instructions](https://developer.apple.com/help/app-store-connect/test-a-beta-version/invite-external-testers) say the first submitted build requires a full review and later builds for the same version might not. Follow the action and status App Store Connect shows instead of assuming a later build will skip review.

Treat tester notification as a separate gate:

- Select **Automatically notify testers** only when approval is the final remaining decision.
- Leave it off when a support handoff, service check, group review, or coordinated beta start must happen after approval.
- If it was off, use **Notify Testers** after approval and after completing that final gate.

The [TestFlight Beta App Review workflow](/blog/testflight-beta-app-review/) maps the review states and recovery path. Keep passwords and demo credentials in Apple's dedicated review fields, not in What to Test or a general release task.

## 7. Verify the first run end to end

A green Xcode Cloud run proves only that the configured actions completed. It doesn't prove that the intended tester received the intended build.

For the first run of each lane, record:

```text
Workflow:
Trigger:
Source revision:
Version and build:
Archive deployment preparation:
Test results:
Processing or compliance action:
Assigned TestFlight group:
Beta App Review state, if external:
Notification choice:
Tester who confirmed access:
Install and launch result:
Decision:
```

Check Xcode Cloud for the workflow result and artifacts. Then use App Store Connect as the source of truth for the processed version and build, internal marker, group assignment, review state, and tester access. Finally, have one intended tester open TestFlight, install the exact build, and complete the lane's smallest meaningful check.

Don't transfer evidence between replacement builds. If build `4.2 (301)` fails and `4.2 (302)` replaces it, repeat the identity, group, install, and changed-path checks for 302.

## Troubleshoot the handoff in order

When a tester doesn't receive the build, trace the route instead of changing several settings:

1. **Trigger:** Did the branch, tag, schedule, or manual request start the intended workflow?
2. **Actions:** Did every Required To Pass action succeed?
3. **Archive:** Was the deployment-preparation option compatible with the target audience?
4. **Post-action:** Did the workflow select the intended TestFlight person or group?
5. **Processing:** Does App Store Connect show a compliance action, invalid binary, or another incomplete state?
6. **External review:** If the group is external, is TestFlight App Review still pending or rejected?
7. **Notification:** Was automatic notification selected, or is **Notify Testers** still waiting?
8. **Tester access:** Is the person in the expected group, and can they see the exact version and build?

Change one failed assumption, run the smallest relevant retest, and verify one tester before widening the audience.

## Where LaunchBuddy fits

LaunchBuddy's verified feature set doesn't include configuring Xcode Cloud, importing its build state, uploading binaries, managing TestFlight groups, or distributing builds. Keep those actions and statuses in Xcode Cloud and App Store Connect.

LaunchBuddy can keep each lane's distribution contract, version-scoped checks, replacement decision, and final submission tasks with the planned release. Free includes release planning, taskboards, default App Store submission checklists, iCloud sync, and limited project notes for up to two apps and two releases. Pro adds unlimited apps, releases, and project notes plus custom reusable checklists.

Use concrete tasks such as “confirm build 302 is assigned to Internal Sign-off” and “tester Mina installed 302 and completed the upgrade check,” not “TestFlight done.”

Choose the audience before the workflow starts, make failures block the right lane, verify the uploaded artifact, and <a href="https://apple.co/3iFcjjW">track the release gates in LaunchBuddy</a>.
