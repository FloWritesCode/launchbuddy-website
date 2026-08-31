---
title: "TestFlight Public Link Criteria: A Practical Setup Guide"
description: "Set TestFlight public link criteria by device and OS, choose a tester limit, read 30-day enrollment metrics, and decide when to adjust or disable the link."
pubDate: 2026-08-31
---

To set **TestFlight public link criteria**, open **App Store Connect → Apps → your app → TestFlight → your external group → Testers → Create Public Link**. Choose **Filter by Criteria**, set an optional tester limit, select **Next**, then choose **Add Criteria** and configure each eligible device or platform with its OS-version rule. Select **Confirm** when the filter is complete. Start with the broadest criteria that answer your beta-testing question because narrow filters can reduce enrollment.

The useful goal isn't “get as many testers as possible.” It is to recruit a bounded group that can answer a specific question, such as whether a new layout works on iPad or whether an app still behaves correctly on the oldest OS version it supports.

## How to set TestFlight public link criteria

Apple's current [external-tester instructions](https://developer.apple.com/help/app-store-connect/test-a-beta-version/invite-external-testers) provide the authoritative controls. Creating or managing the link requires the Account Holder, Admin, or App Manager role.

### 1. Prepare the external group and build

In **App Store Connect → Apps → your app → TestFlight**, create or select an external testing group. Apple says an internal group must exist before you create an external group.

Add the intended build and complete its build-specific **What to Test** text. Check the actual TestFlight App Review status before sharing the link. Before sharing, confirm that the build supports every device and OS combination in your criteria. If App Store Connect flags a compatibility mismatch, adjust the build or the filter.

Keep the group narrow in purpose. “Public beta” doesn't tell you whether it exists to test onboarding, an iPad layout, an older OS, or a release candidate.

### 2. Create the public link

Open the external group, select the testers tab, and choose **Create Public Link**. App Store Connect offers two paths:

- **Open to Anyone:** no device or OS enrollment filter.
- **Filter by Criteria:** only eligible testers can accept through the link.

Choose **Filter by Criteria**. If you want a public-link cap, select **Set Limit** and enter a value from 1 to 10,000. Select **Next** to configure eligibility.

### 3. Add criteria and confirm

Select **Add Criteria**, then choose the device or platform and OS rule. Apple currently provides these options:

- **From:** allow a selected OS-version range.
- **Newer than or equal to:** set a minimum OS version.
- **Older than or equal to:** set a maximum OS version.
- **All supported (for platform):** allow every supported OS version for that platform.

You can add multiple criteria for the device and platform combinations relevant to the test. Don't add platforms merely to make the list look complete. Every included combination should connect to a question you intend to evaluate.

After adding every required combination, select **Confirm**.

### 4. Check the invitation before sharing

Review the beta app description and What to Test text from a tester's perspective. Apple's [TestFlight overview](https://developer.apple.com/testflight/) explains what appears in an invitation and which test information external testing requires. The invitation should make three things obvious:

- What the app does
- What changed in this build
- What you want the tester to try

Then copy the public link and share it only in channels likely to reach the intended cohort. A device filter can screen technical eligibility; it can't make an unrelated audience interested in the beta.

### 5. Verify the enrollment path

Test the complete enrollment path with an account that isn't already enrolled and a device that should qualify, or ask one intended tester to verify it:

1. Open the public link in TestFlight.
2. Confirm the expected app and beta description appear.
3. Accept the invitation.
4. Install the intended build.
5. Confirm the build-specific What to Test instructions.

If possible, use a separate account that isn't enrolled to test one known non-qualifying configuration. Don't infer success from a copied URL alone.

If access fails despite an active link, follow the state checks in [App Store Connect Help](/blog/app-store-connect-help/).

## Choose criteria that match the beta question

Apple supports email invitations, public links, or both for external testers. Pick the invitation method from the evidence you need.

| Need | Better starting point | Why |
| --- | --- | --- |
| Known customers, clients, or support contacts | Email invitations | You already know whom you need to invite |
| Testers from a community, newsletter, or social channel | Public link | People can enroll without you collecting their email addresses |
| A particular device or OS range from an open audience | Public link with criteria | TestFlight checks eligibility before accepting the invitation |
| A broad beta with no device-specific question | Public link open to anyone | Criteria would add friction without improving the test |

A public link can be reshared by anyone who has it. Apple also anonymizes the names and email addresses of people who join through one. If identity or one-to-one follow-up is essential, use email invitations instead of treating a public URL as a private list.

Criteria should follow the release risk, not a vague preference for newer devices. Use a one-sentence hypothesis:

```text
For version 4.2 build 118, recruit testers using [eligible devices and OS versions]
to verify [specific flow].
Stop recruitment when [cohort or deadline condition].
Decide [ship, fix and retest, or defer] from [named evidence].
```

For example:

```text
For version 4.2 build 118, recruit iPad testers on the supported iPadOS range
to verify the new three-column editor.
Stop recruitment when the planned cohort is full or on September 12.
Decide whether to ship from completion feedback, layout reports, and crashes.
```

This record separates four decisions that are easy to blur:

1. **Eligibility:** who can join through the link.
2. **Recruitment:** where to share the link and how many people to accept.
3. **Test scope:** what those testers should do.
4. **Release decision:** what evidence changes the release.

Device criteria don't replace clear **What to Test** instructions. A perfectly filtered cohort can still produce weak evidence if nobody knows which flow matters.

Choose a tester limit from your capacity to review evidence and support the beta, not from Apple's maximum. Separately from the public-link group limit, Apple allows up to 10,000 external testers per app.

```text
Public-link limit: 80
Reason: enough capacity for two device cohorts while one developer reviews feedback
Review cadence: Monday and Thursday
Stop rule: disable the link when the cohort is full or the beta question is answered
```

A limit is a recruitment boundary, not proof that the enrolled testers installed the build, completed the test, or supplied useful feedback.

## Read the 30-day public link metrics

Apple displays public-link metrics on the external group's details page. Its [tester-information guide](https://developer.apple.com/help/app-store-connect/test-a-beta-version/view-and-manage-tester-information/) says they cover a 30-day period. Account Holder, Admin, App Manager, Developer, and Marketing roles can view tester information.

| Apple metric | What it records | Useful question |
| --- | --- | --- |
| **Views in TestFlight** | Testers who viewed the public link in the TestFlight app | Is the shared link reaching anyone? |
| **Accepted** | Testers who accepted the invitation | Are eligible viewers choosing to join? |
| **Didn't Meet Criteria** | Potential testers who failed the configured criteria | Is the filter excluding too much of the reached audience? |
| **Didn't Accept** | Potential testers who declined the invitation | Is the invitation relevant and clear? |

For **Didn't Accept**, App Store Connect can also show Apple's predefined decline reasons: the beta wasn't relevant, the person wasn't clear what the app does, or they didn't find it interesting.

Don't read one count in isolation. Use the pattern to choose the next check:

| Pattern | Check before changing anything | Possible next action |
| --- | --- | --- |
| Few views | Distribution channel and whether the link was actually published | Share in a more relevant channel |
| Views but few accepted | Beta description, What to Test, audience relevance, and decline reasons | Clarify the invitation or change the audience |
| Many didn't meet criteria | Whether every filter is required by the beta question | Broaden only the unnecessary criterion |
| Accepted testers but little evidence | Build access, test instructions, test duration, and feedback path | Improve the test brief or contact invited testers where possible |
| Cohort is sufficient | Whether more enrollment would answer a new question | Disable the link and evaluate the evidence |

These are diagnostic prompts, not automatic conclusions. Don't confuse these 30-day public-link enrollment metrics with per-tester usage metrics. Sessions, crashes, and other tester metrics describe what happened after installation; Apple says those metrics require an install and can take up to 24 hours to appear.

Also keep the eligibility boundary precise: criteria decide whether someone can enroll through the public link. Apple says an enrolled tester can later provide feedback from any device used for testing, even if that device wasn't within the link criteria.

Once testers begin reporting issues, the [TestFlight feedback management workflow](/blog/testflight-feedback-management/) shows how to separate blockers from later work.

## Use a change-one-thing review loop

When enrollment is weak, changing the criteria, audience, beta description, and What to Test text at once destroys the explanation for what improved.

For instance, suppose a link for an iPad editor receives views but many potential testers don't meet the criteria. The app's release risk is tablet layout, so removing the iPad requirement would produce a larger but less relevant cohort. Keep that criterion and change where the link is shared. If the test only needs any supported iPadOS version, however, an unnecessary minimum OS version could be broadened.

Record the observation, one interpretation, one change, and the next review date in the release record below.

## Disable the link when recruitment is done

Apple advises developers to be thoughtful about when they remove a public link and specifically says to disable it when the tester limit is reached. In App Store Connect, use **Manage** next to the public link to edit criteria, change the limit, open it to everyone, or disable it.

Disable the link when:

- The planned cohort is full
- The beta question has been answered
- The external group should no longer recruit testers
- You can't currently review or support more participants
- The URL has spread to an audience that doesn't fit the test

Disabling recruitment and stopping a build are different decisions. Record both explicitly so closing the intake isn't mistaken for ending all testing.

## Keep the public link tied to the release

The public link lives in App Store Connect, but the reason for it belongs with the release plan. Keep one decision record:

```text
App and release:
External group:
Version and build:
Beta question:
Public-link criteria:
Tester limit:
Share channels:
What to Test:
Link enabled:
Enrollment review date:
30-day metrics:
One interpretation:
One change and date:
Next review date:
Feedback and crash review:
Decision:
Link disabled:
```

LaunchBuddy can keep this work beside a version's tasks on iPhone, iPad, and Mac. Its release planning, taskboards, and default submission checklists are available on the Free plan within the two-app and two-release limits; reusable custom checklists require Pro.

LaunchBuddy doesn't create or manage TestFlight public links, display their enrollment metrics, assign testers, distribute builds, or upload binaries. App Store Connect remains the source of truth for the link, builds, groups, tester data, and feedback. Use LaunchBuddy to track actions such as “verify compatible build,” “review enrollment,” “triage feedback,” and “disable public link.” The broader [TestFlight release management guide](/blog/testflight-release-management/) connects this record to the rest of the version.

## Frequently asked questions

### Can TestFlight public links filter by demographics or interests?

Apple's documented criteria are based on device, platform, and OS version. They don't establish demographic, experience-level, or interest filters. Reach those audiences through where and how you share the link.

### Do public-link criteria apply to email invitations?

No. Apple's documented criteria filter enrollment through the public link. Email invitations are a separate invitation path.

### Does the public-link tester limit include email invitations?

The optional group limit controls how many testers can join through the public link. Apple's separate overall limit of 10,000 external testers per app still applies.

Turn your beta question into a version-scoped checklist, then <a href="https://apple.co/3iFcjjW">organize the release in LaunchBuddy</a>.
