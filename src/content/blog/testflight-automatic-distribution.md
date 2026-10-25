---
title: "TestFlight Automatic Distribution: A Safe Setup Guide"
description: "Set up TestFlight automatic distribution for internal groups, handle Xcode Cloud, and keep external notifications behind the right release gate."
pubDate: 2026-10-25
---

**TestFlight automatic distribution** can deliver an eligible Xcode upload to every member of an internal testing group once Apple finishes processing it and any required compliance action is complete. To enable it, create an internal group in App Store Connect and select **Enable automatic distribution**.

Treat this as an internal-group control, not a universal “send every beta” switch. Xcode Cloud and external testing use separate controls, and a post-upload gate can't stop an unverified build from reaching testers. Give each automatic group one purpose, complete its checks before upload, and keep release candidates manual when they need a decision after processing.

## Know which TestFlight action is automatic

Three Apple controls are easy to confuse:

| Path | Control | What happens |
| --- | --- | --- |
| Xcode upload to an internal group | **Enable automatic distribution** on the internal group | Eligible builds are delivered to that group's members automatically |
| Xcode Cloud build | TestFlight post-action in the Xcode Cloud workflow, or manual group assignment in App Store Connect | The internal group's automatic-distribution checkbox doesn't add Xcode Cloud builds |
| External testing | **Automatically notify testers** when adding a build to an external group | Testers are notified after any required TestFlight App Review approval |

None of these controls submits a version to App Review for customer release. Your Xcode distribution choice also sets a separate eligibility boundary: a **TestFlight Internal Only** build can go only to internal groups, while **TestFlight & App Store** preserves the option to use the build for external testing or an App Store submission. The [TestFlight Internal Only comparison](/blog/testflight-internal-only-vs-app-store-connect/) explains that upload decision.

## 1. Define one job for the internal group

Once you know which distribution path applies, define the group's single purpose before enabling automation. Good group definitions are specific:

- **Daily smoke:** teammates who verify install, launch, sign-in, and one critical path on routine builds.
- **Release candidate:** people responsible for the final upgrade, purchase, sync, or account checks.
- **Feature preview:** internal stakeholders evaluating one incomplete feature.

Avoid an automatic “Everyone” group unless every eligible upload is genuinely safe for everyone in it. Internal testers are App Store Connect users with access to your content; automatic distribution isn't a substitute for deciding who should see development builds.

Use a compact distribution contract:

```text
Group:
Purpose:
Members:
Upload source:
Eligible branches or tags:
Checks that must pass before upload:
What to Test owner:
Automatic or manual assignment:
Stop condition:
```

The contract moves the safety decision before the automation. If a branch can upload before its tests or release checks finish, the group setting is too early in the workflow.

## 2. Put the release gate before the upload

Because eligible Xcode uploads can reach the group after processing and required compliance, complete every blocking check before upload.

At minimum, finish these checks before an automatically distributed upload:

```text
Identity
[ ] Version and build number match the test plan
[ ] Source revision and configuration are recorded
[ ] Upload lane is Internal Only or release-capable by intent

Build confidence
[ ] Required automated checks passed
[ ] App installs and launches in the intended configuration
[ ] The highest-risk changed path has a named test owner
[ ] Known blockers are written down

Tester handoff
[ ] Internal group matches the build's purpose
[ ] What to Test names the changed behavior and expected result
[ ] Feedback has an owner and a decision date
```

This is not a claim that every beta needs a full regression pass. A daily smoke group and a release-candidate group should have different gates. The important rule is that the gate matches the consequence of automatic access.

For a release candidate, use manual assignment when any required fact becomes available only after upload. Examples include a clean install of the processed artifact, a server-side rollout decision, or confirmation that the candidate should replace the build testers already use.

## 3. Enable automatic distribution in App Store Connect

After defining the group and its gate, configure it in App Store Connect. Apple's current [internal-tester instructions](https://developer.apple.com/help/app-store-connect/test-a-beta-version/add-internal-testers) document these steps:

1. Open **App Store Connect → Apps → your app → TestFlight**.
2. Select the add button next to **Internal Testing**.
3. Name the group and create it.
4. Select **Enable automatic distribution**.
5. Add only the App Store Connect users who need this stream of builds.

If automatic distribution is off, add each build to the group manually. You can also keep a permanent group manual when its members should receive only promoted release candidates, not every processed upload.

For the first automatically distributed build, verify the result in App Store Connect instead of assuming the setting worked:

```text
[ ] Expected version and build finished processing
[ ] Intended internal group has access to that exact build
[ ] Group membership is still correct
[ ] What to Test matches the build
[ ] One intended tester can see and install it
```

Apple allows internal testers to test a build for up to 90 days. That window doesn't make an old build current, so identify the exact version and build in every test request.

## 4. Treat Xcode Cloud as a separate automation path

Apple documents two separate mechanisms. Its internal-group help says **Enable automatic distribution** makes Xcode deliver builds to group members and doesn't apply to Xcode Cloud builds. Its [Xcode Cloud workflow documentation](https://developer.apple.com/documentation/xcode/creating-a-workflow-that-builds-your-app-for-distribution) separately allows a TestFlight post-action that explicitly selects individual testers or TestFlight groups; Apple says those selections receive the update. For a Cloud build, configure that post-action or add the completed build to the group manually in App Store Connect.

Choose one explicit Cloud path:

### Manual promotion

1. Let Xcode Cloud build and upload the artifact.
2. Review the completed workflow and identify the exact version and build.
3. Add the build to the intended internal group in App Store Connect.
4. Verify access with one tester.

This is the better default when a successful archive is necessary but not sufficient for beta distribution.

### Workflow-controlled distribution

1. Restrict the workflow to the branch, tag, or manual start condition that represents distributable work.
2. Configure the archive for **TestFlight (Internal Testing Only)** or **TestFlight and App Store**, according to the build's maximum intended audience.
3. If the archive must remain eligible for App Review, enable **Restrict Editing** in the workflow's General settings; Apple says this is required.
4. Add the test actions your release gate requires and set each blocking action to **Required To Pass**, so a failed test action fails the Xcode Cloud build. For a post-action that distributes to external TestFlight testers, Apple's [Xcode Cloud workflow reference](https://developer.apple.com/documentation/xcode/xcode-cloud-workflow-reference) requires a clean workflow build.
5. Add the TestFlight post-action.
6. Select only the intended testers or groups.
7. Verify the first successful run end to end.

Don't configure both routes casually. If a Cloud post-action already selects the group, a second manual handoff adds confusion about which decision made the build available.

## 5. Keep external auto-notification separate

External testing isn't an extension of the internal-group checkbox. Apple's [external-tester instructions](https://developer.apple.com/help/app-store-connect/test-a-beta-version/invite-external-testers) require an external group, a selected build, What to Test information, and testers invited by email or public link. A build may also need TestFlight App Review.

When you add the build, **Automatically notify testers** controls what happens after approval. Turn it on only when approval is the final remaining gate. Leave it off when you still need to:

- coordinate a beta announcement;
- verify a service or demo account;
- confirm public-link criteria and group membership;
- prepare support or feedback triage; or
- start a time-bounded test on a specific date.

If automatic notification is off, use **Notify Testers** after approval and after your final check. The [TestFlight Beta App Review guide](/blog/testflight-beta-app-review/) covers the review states and recovery path, while the [TestFlight test information checklist](/blog/testflight-test-information/) separates build-specific What to Test text from reviewer and invitation fields.

## A worked distribution plan

Suppose version `4.2` has a redesigned sign-in flow.

| Build | Route | Gate | Distribution decision |
| --- | --- | --- | --- |
| `4.2 (301)` | Xcode upload | Unit tests plus install and launch | Automatically distribute to the three-person daily-smoke group |
| `4.2 (302)` | Xcode Cloud release workflow | Cloud tests pass, then a manual clean-install check | Add manually to the release-candidate group |
| `4.2 (303)` | Xcode Cloud workflow with an internal TestFlight post-action | Release tag, clean build, tests, and archive all succeed | Workflow distributes to the internal sign-off group |
| `4.2 (304)` | External group | Internal sign-off, current What to Test, any required Beta App Review | Leave auto-notify off until the support owner confirms readiness |

The plan records what TestFlight status alone can't: why each audience received the build and which gate authorized it. Don't carry build 303's result forward to build 304. Verify the replacement's identity and affected path before widening access, even when the source change looks small.

## Troubleshoot the route before changing settings

If testers didn't receive a build, trace the route in this order:

1. **Upload source:** Was it created by Xcode Cloud, where the internal group's checkbox doesn't apply?
2. **Processing:** Does the build appear in App Store Connect, or is processing or a required action incomplete?
3. **Group:** Is automatic distribution enabled on the intended internal group, or was manual assignment expected?
4. **Eligibility:** Was the build uploaded as Internal Only, and is the target actually an internal group?
5. **People:** Are the intended internal testers App Store Connect users with access to the app and members of that group?
6. **External state:** If the audience is external, has any required TestFlight App Review finished, and was automatic notification selected?

Don't “fix” a missing distribution by adding the build to several groups at once. Identify the failed assumption, then make one change and verify one intended tester.

## Where LaunchBuddy fits

LaunchBuddy's documented feature set doesn't import or administer TestFlight: it doesn't configure automatic distribution, upload or inspect binaries, manage tester groups, display TestFlight build status, submit builds to TestFlight App Review, or notify testers. Keep those records and actions in Xcode, Xcode Cloud, and App Store Connect.

LaunchBuddy can record the distribution contract as a project note and track pre-upload checks, build-specific test tasks, and a manual promotion decision with the planned release across iPhone, iPad, and Mac. On Free, release planning, taskboards, default App Store submission checklists, iCloud sync, and limited project notes are available for up to two apps and two releases. Pro adds unlimited apps, releases, and project notes plus custom submission checklists.

That planning layer is useful only if the task names observable evidence. Prefer “tester Sam installed 4.2 (304) and completed sign-in” over “TestFlight done.” For the larger beta loop, connect the handoff to a [TestFlight release-management workflow](/blog/testflight-release-management/).

Choose the distribution path that matches the build's audience, put its gate before the automatic handoff, and <a href="https://apple.co/3iFcjjW">track the release checks in LaunchBuddy</a>.
