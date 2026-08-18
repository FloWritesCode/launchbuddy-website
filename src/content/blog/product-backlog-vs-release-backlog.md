---
title: "Product Backlog vs Release Backlog: A Practical Comparison"
description: "Compare a product backlog and release backlog, decide what belongs in each, and move work into an iOS app version without duplicating scope."
pubDate: 2026-08-18
---

A **product backlog** holds ordered candidate work for the whole product. A **release backlog** holds the work accepted for one named release, plus the testing, submission, and follow-up tasks required to ship it. The product backlog answers “What might improve this app?” The release backlog answers “What must be finished, cut, or explicitly deferred before this version can close?”

For an indie iOS developer, the safest rule is simple: keep possible bugs, features, experiments, and maintenance at app level; move only accepted work into a version. Don't copy an item into both lists and let the copies drift.

## Product backlog vs release backlog at a glance

| Question | Product backlog | Release backlog |
| --- | --- | --- |
| Scope | The whole app | One named version |
| Purpose | Preserve and order possible product work | Make a release commitment visible |
| Typical items | Bugs, feature candidates, experiments, technical work, customer problems | Accepted product items, release testing, metadata, review notes, and submission checks |
| Detail | Near-term candidates are refined; distant items can remain coarse | Detailed enough to build, verify, cut, or defer |
| Change rule | Reorder when evidence or strategy changes | Change through an explicit scope decision |
| Time horizon | Continues while the product is maintained | Closes when that version is finished or abandoned |
| App Store relationship | Usually not tied to an App Store version | Bound to the version being tested and prepared |
| Exit | Promote, archive, split, merge, or remove | Complete, cut back to the product backlog, or record as intentionally deferred |

The key difference is **commitment**, not merely priority. A high product-backlog item is still a candidate. Once accepted into a release, it becomes part of a version boundary and needs a clear outcome.

## “Release backlog” is a useful practice, not a formal Scrum artifact

The official [Scrum Guide](https://scrumguides.org/scrum-guide.html) defines the Product Backlog as an emergent, ordered list of what is needed to improve a product. It defines three artifacts: the Product Backlog, Sprint Backlog, and Increment. It does not define a Release Backlog.

That doesn't make release-level planning invalid. It means you shouldn't attach framework rules to the term that the Scrum Guide never states. In this article, **release backlog** is a practical name for the version-scoped plan an indie developer uses between product selection and App Store delivery. You can use this model without running Sprints or calling yourself a Scrum team.

Apple's workflow reinforces the need for a version boundary. When updating an app, Apple's [Create a new version](https://developer.apple.com/help/app-store-connect/update-your-app/create-a-new-version) instructions have you create an incremental App Store version, review its metadata, upload a build, add that build to the version, and submit it for review. Your planning record should make it equally clear which product work and release checks belong to that version.

## What belongs in the product backlog

Put an item in the product backlog when it describes a real possibility for the app but has not been accepted into a version.

Useful product-backlog entries include:

- A reproduced bug that is not an immediate safety, privacy, security, or data-integrity incident
- A customer problem supported by reviews, support messages, interviews, or observed behavior
- A feature candidate with a named user and outcome
- A technical risk, maintenance need, or platform change that requires a decision
- An experiment intended to reduce a specific uncertainty
- Follow-up work discovered after a release

The product backlog isn't a promise to build everything it contains. Merge duplicates, remove stale ideas, and archive items when the evidence disappears. Otherwise, it becomes a storage bin rather than a decision tool.

Give serious candidates enough context to compare:

```text
Candidate:
User and situation:
Observed problem:
Evidence and date:
Expected outcome:
Smallest useful change:
Risk or obligation:
Dependencies:
Open question:
Current decision:
```

“Add widgets” is not ready for release selection. “Let an existing user see today's remaining focus target without opening the app” identifies a user, situation, and outcome. It can still remain in the product backlog until its evidence, impact, risk, and effort justify a commitment.

Use the [app feature prioritization workflow](/blog/app-feature-prioritization-for-indie-developers/) when several candidates compete. Ordering helps you choose what to examine next; it does not automatically put the top five items into the next version.

## What belongs in the release backlog

A release backlog contains two kinds of work that should remain distinguishable.

### 1. Accepted product work

These items come from the product backlog and directly support the release goal:

- The user-facing change
- Necessary bug fixes
- Required migrations or compatibility work
- Recovery and empty states
- Verification for the accepted behavior

Each item should state why it belongs in this version and how you will know it is complete.

### 2. Version-specific delivery work

An App Store release also needs work that may never have been a product candidate:

- Build and upgrade-path checks
- TestFlight instructions and release testing
- Screenshot or metadata review when the shipped behavior affects them
- Accurate What's New copy
- App Review notes for non-obvious access or behavior
- Submission and public-version verification

This is why “the release backlog is just a copied subset of the product backlog” is incomplete for a solo App Store workflow. The **product changes** are a selected subset. The **complete release plan** also includes the operational work required to test, explain, submit, and verify that version.

For the end-to-end delivery sequence, use the [iOS app release management guide](/blog/ios-app-release-management/). Use an appropriate tool such as Xcode, Transporter, Fastlane, or CI for the binary workflow. Keep App Store version, TestFlight, App Review, and public-availability records authoritative in Apple's systems; a planning backlog does not replace them.

## Move work with a promotion receipt

Don't drag a card into a release merely because it ranks highly. Write a short promotion receipt that makes the commitment reviewable:

```text
Release: 2.4
Release goal:
Candidate:
Evidence used:
Why this version:
Smallest accepted outcome:
Acceptance:
Explicit exclusions:
Dependencies:
Release-specific checks triggered:
Decision date:
Reconsider when:
```

Then apply five tests.

### 1. Goal fit

Can you explain how the item supports the release goal in one sentence? “It is small” and “it has been waiting” are not goal-fit arguments.

### 2. Evidence

Name the observation, obligation, or strategy behind the choice. A customer review can supply a symptom and the customer's language, but it does not prove the cause or the best solution. Keep source evidence attached while diagnosis remains separate.

### 3. Complete slice

Select the smallest end-to-end result a person can use or you can verify. Do not commit only a SwiftUI screen while leaving persistence, failure handling, migration, or testing implicit.

### 4. Capacity and dependency

Check the whole release cost, including testing and App Store preparation. An item that fits the coding window can still be too large once its migration, purchase, localization, backend, or review consequences are visible.

### 5. Explicit exclusions

Write down attractive adjacent work that is not entering the version. Exclusions make later scope additions visible and give you a clean place to return deferred work.

The receipt is a planning method, not a claim about required LaunchBuddy fields.

## Avoid duplicate cards with one source record

Copying a product item into a release creates an immediate question: which card owns the current status, acceptance criteria, and evidence?

Prefer one source record with a visible assignment. The labels below illustrate the method; they are not documented LaunchBuddy status fields.

```text
PB-41 · Repair photo attachments lost after relaunch
State: Committed
Release: 2.4
Promotion receipt: linked
```

At product level, the item can still appear as committed to 2.4. At release level, the same item appears among version work. The identifier and underlying record stay the same.

If your tool can't present one record in both contexts, choose one authoritative copy and make the other a link. Never update two independent task descriptions by hand.

Keep release-only work separate:

```text
R2.4-07 · Verify clean install and 2.3 → 2.4 upgrade
R2.4-08 · Confirm What's New text matches completed changes
R2.4-09 · Verify the public version after release
```

Those tasks support delivery of 2.4. They don't need to compete forever with product features such as offline search or folder sharing.

## Worked example: an offline field-notes update

Suppose the product backlog contains:

| Candidate | Evidence | Current decision |
| --- | --- | --- |
| Repair photo attachments lost after relaunch | Reproduced on the current version; matching tester reports | Must diagnose |
| Add one-tap coordinate stamps | Repeated field-session friction | Eligible candidate |
| Attach local weather | Two requests; workflow benefit unclear | Research |
| Add shared notebooks | One request; identity and sync scope unresolved | Hold |

The developer chooses this release goal:

> Version 2.4 restores reliable capture and retrieval of photo notes.

Only the first item directly supports that goal. Its accepted release slice includes diagnosis, the smallest safe correction, persistence regression tests, a clean-install check, and an upgrade check from the public version. The release also needs final build verification, accurate release notes, and public-version verification.

Coordinate stamps remain an eligible product candidate. Weather remains research. Shared notebooks remain on hold. None is silently promoted because it seems easy while 2.4 is open.

The two lists now answer different questions:

```text
Product backlog
- Coordinate stamps: eligible
- Local weather: research
- Shared notebooks: hold

Release 2.4
- Diagnose photo-loss path
- Implement accepted correction
- Run persistence regression checks
- Verify clean install and upgrade
- Review release notes and submission information
- Verify the public version
```

This release is smaller than the set of valuable ideas. That is evidence of a functioning boundary, not an incomplete plan.

## Handle changes without losing the boundary

Release scope will change. Use a rule based on why the new work appeared.

| New information | Destination | Required record |
| --- | --- | --- |
| Work is necessary to complete or verify accepted behavior | Release backlog | Link it to the accepted outcome |
| An adjacent improvement would be useful but is not required | Product backlog | Preserve the evidence; do not mark it committed |
| A blocker makes the accepted item unsafe or infeasible | Release decision | Hold, cut, or replace the item explicitly |
| TestFlight feedback reveals a release-blocking regression | Current release | Add the confirmed correction and affected retest |
| Feedback suggests a later improvement | Product backlog | Add or strengthen one candidate without duplicating it |
| An item is cut for capacity | Product backlog or archive | Record why it left and what would reconsider it |
| The version ships | Release history | Keep the completed record with the version |

TestFlight reports and public reviews should stay in their original source queues until triage establishes a product decision. The [TestFlight feedback vs App Store reviews comparison](/blog/testflight-feedback-vs-app-store-reviews/) shows how to route both sources into one backlog without treating every comment as committed scope.

Never mark a cut item “done” to make the release look complete. Never leave it assigned to the release after deciding it will not ship. The record should distinguish completion, deferral, and rejection.

## Where LaunchBuddy fits

![LaunchBuddy Releases board with backlog tasks, version metadata, and a changelog draft](/screenshots/launchbuddy/releases.jpg)

LaunchBuddy can keep possible work in an app backlog and accepted tasks in a named release on iPhone, iPad, and Mac. Release planning, taskboards, default App Store submission checklists, and iCloud sync are available without Pro. The free plan is limited to two apps, two releases, and limited project notes; custom checklists require Pro.

For customer evidence, LaunchBuddy Pro with App Store Connect API credentials provides an App Store reviews inbox and review-to-task conversion. Review-to-task can create a structured backlog proposal, but task creation and updates pause for explicit approval. Review the evidence and destination before accepting it. A review shouldn't enter the current release merely because conversion is convenient.

LaunchBuddy remains a planning companion. It does not build, sign, or upload an app binary, submit the app autonomously, or replace App Store Connect as the source of official version and review state.

## Run a one-minute backlog boundary audit

Before release work starts, ask:

1. Does the version have one clear goal?
2. Can every product item in the release point to that goal?
3. Does each committed item have an observable completion test?
4. Are release-only testing and submission tasks visible?
5. Are later ideas outside the version?
6. Is there one authoritative record for each item?
7. Does every scope addition show why it entered?
8. Will cut items return to the product backlog with a reason?

If all eight answers are clear, the product backlog can keep evolving while the release remains understandable.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy on the App Store</a> to keep your app backlog, version commitments, and release checks connected.
