---
title: "TestFlight Test Information: External Beta Checklist"
description: "Complete TestFlight test information with a field-by-field checklist for your beta app description, feedback email, Beta App Review details, and test brief."
pubDate: 2026-09-03
---

**TestFlight test information** gives external testers and Apple's TestFlight App Review team the context they need before a beta build is distributed externally. In **App Store Connect → Apps → your app → TestFlight → Additional → Test Information**, complete the Beta App Description, Feedback Email, and Beta App Review information. Then add build-specific **What to Test** instructions when you assign a build to a group.

The central rule is simple: don't paste one paragraph into every field. The beta description introduces the app, the feedback email gives testers a contact route, the review information helps Apple evaluate the beta, and What to Test directs attention to one build.

## TestFlight test information at a glance

| Information | Requirement | Primary audience | Its job | Update trigger |
| --- | --- | --- | --- | --- |
| **Beta App Description** | Required for external testing | External testers | Explain what the beta app does and why someone should test it | The beta's purpose, scope, or important limitation changes |
| **Feedback Email** | Required for external testing | Testers | Provide the address used for TestFlight contact and invitation replies | Ownership or monitoring changes |
| **Beta App Review contact** | Required for external testing | Apple's TestFlight App Review team | Give Apple a reachable person for review questions | The responsible contact changes |
| **Demo account** | Conditional when reviewed behavior requires sign-in | Apple's TestFlight App Review team | Make gated beta behavior accessible | Login, sample data, roles, or entitlements change |
| **Beta App Review notes** | Optional; needed when review requires extra context | Apple's TestFlight App Review team | Explain non-obvious setup, paths, or limitations | Setup or reviewed flows change |
| **What to Test** | Required when adding a build to a group | Testers with access to the build | Describe the current build's focus, steps, expected result, and known issues | Every build |
| **Approved screenshots and category** | Optional invitation context | People viewing an invitation | Add existing App Store context to the invitation when available | Approved product-page content no longer represents the beta |

Apple's [Test Information instructions](https://developer.apple.com/help/app-store-connect/test-a-beta-version/provide-test-information/) identify Beta App Description as required and Feedback Email as the tester contact and invitation reply-to address. Apple's [TestFlight overview](https://developer.apple.com/testflight/) separately says the beta app description and Beta App Review information are required to share a beta with external testers. Those external-testing requirements are separate from the build-specific What to Test text used for both internal and external groups.

Choose each configured language on the Test Information page and check its fields separately. Apple also supports localized What to Test text. When the beta scope or a known issue changes, update the affected localizations instead of correcting only the primary language.

## 1. Freeze the facts for the build

Before writing any field, create a small fact sheet for the build you plan to distribute:

```text
App:
Version and build:
Beta goal:
Included changes:
Excluded or unfinished work:
Required account state:
Required device, service, or sample data:
Known issues:
Main test question:
Expected result:
Feedback owner:
Beta review contact:
```

This isn't another metadata field. It's a source-of-truth record that prevents the description, reviewer instructions, and build brief from drifting apart.

Mark each fact as **verified**, **not verified**, or **not applicable**. “Planned for this beta” isn't the same as “present in this build.” Remove unverified claims from tester-facing copy, and don't describe an unresolved outcome as expected behavior.

## 2. Write the Beta App Description for testers

Apple says the Beta App Description describes the beta version and can differ from the information used later for the App Store. TestFlight invitations use it to tell people about the beta, so it should answer:

1. What does the app help someone do?
2. What is the purpose of this beta?
3. Who is the beta relevant to?
4. Is there an important requirement or limitation to know before accepting?

Use this pattern:

```text
[App] helps [intended user] [primary job].

This beta focuses on [verified beta scope]. We are looking for feedback from
[relevant tester or device context] about [one or two questions].

Before joining: [important requirement or known limitation, if any].
```

For a fictional focus-timer app, a filled version could read:

```text
MinuteMark is a focus timer for people who plan work in short sessions.

This beta focuses on a redesigned session setup and recovery after an interrupted
timer. We are looking for feedback from iPhone and iPad testers about whether the
setup choices are clear and whether an interrupted session resumes as described.

Use test sessions only. This build does not include the planned calendar view.
```

That description gives a potential tester enough context to decide whether the beta is relevant. It doesn't bury them in tap-by-tap instructions, claim that the changed flows work, or advertise work excluded from the build.

### Beta App Description checks

- Lead with the app's job, not a company biography.
- Name the beta's current scope rather than listing the whole roadmap.
- State only requirements that affect whether someone can participate.
- Make exclusions explicit when their absence could mislead a tester.
- Remove App Store sales language such as rankings, awards, or vague superlatives.
- Re-read the description from the perspective of someone seeing the invitation for the first time.

## 3. Check the Feedback Email as a workflow

The Feedback Email is more than a syntactically valid address. Apple uses it as the address testers can contact through TestFlight and as the reply-to address for email invitations.

Before external testing:

- send a message to the address from outside your domain;
- confirm the inbox accepts replies rather than using a no-reply alias;
- assign one person to monitor it during the beta;
- verify forwarding and spam rules;
- decide how reports become release decisions; and
- avoid asking testers to email passwords, payment details, or sensitive personal data.

Use an address that can outlive one build, then route messages by version and build after they arrive. For example:

```text
Inbox: beta@example.com
Owner: [name]
Review cadence: weekdays at 10:00
Required subject tag: optional; do not rely on testers adding it
Triage destination: version 4.2, build 118
Escalation: crash, data loss, blocked primary flow
```

The email address and the Beta App Review contact email serve different audiences. They may point to the same person in a small studio, but verify each field independently instead of assuming one updates the other.

## 4. Prepare Beta App Review information for Apple

External testing introduces a review audience that is different from your testers. Apple's [Beta App Review API resource](https://developer.apple.com/documentation/appstoreconnectapi/get-v1-apps-_id_-betaappreviewdetail) exposes separate contact, demo-account, and notes attributes. Treat that information as a private reviewer handoff, not as invitation copy.

### Contact information

Provide a person who can answer a review question while the build is waiting. Verify the name, email, and phone number before submission. If a shared inbox is used, make sure someone owns it for this beta window.

### Demo access

If Apple can't reach reviewed functionality without signing in, put a working review account in App Store Connect's demo-account fields. Check it against the submitted beta build:

- the account is active;
- the credentials work from a clean install;
- required sample data already exists;
- the account has the correct role or entitlement;
- no one-time setup blocks the reviewer; and
- additional setup, roles, and required state are explained in the notes without repeating credentials.

Don't copy review credentials into public documentation, a general task title, reviewer notes, or tester-facing What to Test text. Enter the credentials Apple needs in the dedicated Beta App Review username and password fields; keep only an internal backup in an appropriately controlled system.

### Review notes

Use notes for setup and paths Apple wouldn't discover reliably. A compact handoff is easier to verify than a narrative:

```text
Build under review:
Primary beta change:

Setup:
- Sign-in state:
- Required sample data, device, or service:

How to reach the reviewed behavior:
1.
2.
3.

Expected result:

Known limitation relevant to review:

Contact if setup fails:
```

Every step should work in the build being submitted. If the build changes, run the path again. The App Review information used for the eventual App Store submission is a related but separate artifact; use the [App Review notes guide](/blog/app-review-notes/) when preparing the store version.

## 5. Add build-specific What to Test instructions

What to Test is attached to a build, not a replacement for the broader Beta App Description. Apple says the text is available to testers in every group with access to that build, so avoid instructions that only make sense to an unnamed subset.

The brief should identify the focus, setup, steps, expected result, useful report details, and known issues. For copy-ready patterns covering onboarding, purchases, sync, regressions, upgrades, offline use, and release candidates, use the [TestFlight What to Test examples](/blog/testflight-what-to-test-examples/). Keep the roles distinct: the Beta App Description stays understandable across the beta, while What to Test changes with each uploaded build.

## 6. Review the invitation experience

Apple's Test Information page includes an **App Information** option under Invitation Experience. It is selected by default and, when applicable, pulls approved screenshots and the app category from the latest approved version in the **Ready for Distribution** state. You can deselect it.

Don't assume approved App Store material fits the beta. Before leaving it enabled, check:

- Do the screenshots show flows still present in the beta?
- Does the approved category set the right expectation?
- Could a screenshot imply that excluded or unfinished behavior is available?
- If there is no approved version to supply this context, does the Beta App Description stand on its own?

This review doesn't require making new screenshots for every beta. It requires deciding whether the existing approved context is accurate.

## 7. Run a three-audience consistency check

Read the packet in audience order:

1. **Potential tester:** Beta App Description and invitation context.
2. **Active tester:** What to Test and Feedback Email.
3. **Apple reviewer:** contact, demo access, and review notes.

Then compare each statement with the build fact sheet:

| Claim | Description | What to Test | Review notes | Verified in build |
| --- | --- | --- | --- | --- |
| Redesigned session setup is included | Yes | Yes | Yes | Yes |
| Calendar view is included | No; listed as excluded | No | No | No |
| Interrupted timer resumes | Framed as a test focus | Expected result | Review path | Must be checked |
| Demo account has sample sessions | Not relevant | Setup only if testers need it | Yes | Must be checked |

The wording doesn't need to match. The facts do. This matrix catches two common failures: promoting planned work as shipped and leaving stale reviewer instructions after a replacement build.

## Final TestFlight test information checklist

```text
Build facts
[ ] Version and build recorded
[ ] Included scope verified in the uploaded build
[ ] Exclusions and known issues recorded
[ ] One main beta question chosen

Beta App Description
[ ] App purpose is clear to a new tester
[ ] Current beta focus is specific
[ ] Participation requirements are accurate
[ ] Planned work is not presented as available
[ ] Every configured language reflects the same current scope

Feedback Email
[ ] Address accepts an external test message
[ ] Replies reach a monitored inbox
[ ] Owner and review cadence assigned
[ ] Feedback has a version-and-build triage path

Beta App Review information
[ ] Contact details verified
[ ] Demo account tested from a clean state, if needed
[ ] Sample data and roles checked
[ ] Non-obvious path documented
[ ] Notes match the submitted build
[ ] Credentials kept out of public or tester-facing copy

Build distribution
[ ] What to Test written for this build
[ ] Relevant What to Test localizations updated
[ ] Instructions make sense to every group receiving the build
[ ] Approved screenshot/category invitation context reviewed
[ ] External review status checked before notifying testers

Final consistency
[ ] Description, test brief, and review notes use the same build facts
[ ] Feedback route tested
[ ] Replacement-build changes reflected everywhere
```

After distribution, route reports by build and turn each useful signal into a blocker, current-release task, later task, or explicit no-action decision. The [TestFlight feedback management workflow](/blog/testflight-feedback-management/) covers that triage, while the broader [TestFlight release management guide](/blog/testflight-release-management/) connects beta work to submission.

## Where LaunchBuddy fits

LaunchBuddy can keep the build fact sheet, version-scoped verification tasks, and submission checklist together on iPhone, iPad, and Mac. Release planning, taskboards, default submission checklists, and iCloud sync are available within the Free plan's limits of two apps and two releases. Custom reusable checklists require Pro.

LaunchBuddy doesn't write TestFlight test information, manage tester groups, display TestFlight build status or feedback, perform Beta App Review submission, or upload binaries. App Store Connect remains the source of truth for those operations. Use LaunchBuddy for work such as “verify beta description against build 118,” “test the review account,” and “update the test packet after build 119.”

Turn the checklist into tasks for your next beta, then <a href="https://apple.co/3iFcjjW">organize the release in LaunchBuddy</a>.
