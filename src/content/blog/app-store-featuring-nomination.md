---
title: "App Store Featuring Nomination: How to Submit a Strong Pitch"
description: "Learn how to nominate an app for App Store featuring, choose the right type, prepare evidence, follow Apple's timing guidance, and submit your pitch."
pubDate: 2026-08-23
---

**To nominate an app for App Store featuring, open the app in App Store Connect, choose _Nominations_ under _Featuring_, create a nomination, select a type, add the planned publication date and supporting details, then submit it for editorial consideration.**

Apple lets the Account Holder, Admin, App Manager, or Marketing role submit a nomination. Aim to submit three weeks before the planned date when possible. A nomination is a pitch for consideration, not a confirmed placement.

## Choose the right nomination type

App Store Connect offers three nomination types:

| Nomination type | Use it for | Lead with |
| --- | --- | --- |
| **New Content** | New content, offers, or events in an existing app or game | What is new, when it is available, and why it is timely |
| **App Enhancements** | New features, functionality, or a significant update | The user problem, the specific improvement, and the release objective |
| **App Launch** | A new app or game launch, including a pre-order | The product's audience, distinct value, and launch date |

Pick the type that describes the actual release moment. Do not label a routine maintenance update as an enhancement just to make it sound larger. Apple's editors need to understand what will be available, not the size of the internal effort.

If several apps from the same developer account belong to one story, Apple allows up to 10 related apps in a nomination. Treat that as one coherent editorial idea. Unrelated updates are easier to evaluate as separate nominations.

## Work backward from the planned publication date

Apple's public [getting featured guidance](https://developer.apple.com/app-store/getting-featured/) asks for at least two weeks' notice and recommends submitting up to three months in advance for wider consideration. The operational [App Store Connect nomination instructions](https://developer.apple.com/help/app-store-connect/manage-featuring-nominations/nominate-your-app-for-featuring/) recommend a minimum lead time of three weeks.

Given the difference, plan around three weeks when possible. More lead time is useful when the launch date, build, localization, or supporting assets still need coordination, but an early nomination should not be speculative.

App Store Connect interprets the selected publication date using the device's local timezone settings. Write down the intended date and timezone outside the form if more than one person or region is involved.

## Pass a nomination readiness gate

A polished pitch cannot compensate for an app that editors cannot understand or evaluate. Before drafting, confirm:

- The nominated content or enhancement has a credible publication date.
- The description matches what will actually ship.
- The product page's screenshots, previews, and description represent the app.
- Each supplemental URL opens without private-account access unless access instructions are explicit.
- A TestFlight public link, if provided, points to a suitable build and remains available.
- Selected platforms, countries or regions, and localizations match the plan.
- Claims about accessibility, localization, or uniqueness have concrete evidence.

For a first launch, complete the broader [iOS app launch checklist](/blog/ios-app-launch-checklist/) before treating the nomination as ready. For an update, review the [App Store metadata workflow](/blog/app-store-metadata-management/) so the pitch and product page do not describe different releases.

The test is stricter than “the form is filled in.” It asks whether an editor can inspect the same experience the nomination describes.

## Build an evidence-first nomination brief

Apple says there is no requirements checklist that guarantees featuring. Its editors consider qualities such as user experience, UI design, innovation, uniqueness, accessibility, localization, and product-page quality. Those are useful prompts, but repeating the labels is not evidence.

Turn each claim into proof:

| Claim in the nomination | Useful proof | Weak substitute |
| --- | --- | --- |
| “The update makes a key workflow easier” | The old path, the new path, and the user-facing difference | “Major UX improvements” |
| “The app supports more people” | Named accessibility behavior or added localization | “More accessible than ever” |
| “This launch is timely” | A fixed event, season, release date, or audience need | “Perfect timing” |
| “The app takes a distinct approach” | A concrete interaction, capability, or product decision | “Unique and innovative” |
| “Editors can evaluate it now” | A live product page or working TestFlight public link | A roadmap or mockup alone |

Keep the brief narrow enough to fit the release. A useful draft looks like this:

```text
Nomination name:
Nomination type:
Planned publication date or range:
Target nomination submission date:
Final evidence recheck date and owner:

What is changing:
- One-sentence release summary:
- Specific new content, enhancement, or launch:

Why it matters:
- User problem or opportunity:
- Concrete user-facing difference:
- Why this date is relevant:

Evidence:
- Product page URL:
- TestFlight public link, if applicable:
- Supporting document or asset URL:
- Accessibility or localization detail:
- Other verifiable context:

Scope:
- Platforms:
- Countries or regions:
- Localizations:
- Related apps or In-App Events:

Final checks:
- Claims match the available build:
- URLs tested:
- Date and timezone checked:
- Product page rechecked:
```

Internal goals such as “increase downloads” do not belong in the editorial argument unless they explain the release itself. Apple asks for the purpose and priority of new content or enhancements; editors still need product facts, not an unsupported forecast.

## How to submit a featuring nomination in App Store Connect

Once the brief passes the readiness gate, follow Apple's current single-nomination workflow:

1. Sign in to **App Store Connect**, open **Apps**, and select the app.
2. Under **Featuring** in the sidebar, choose **Nominations**.
3. Select the **+** button, then **Create Nomination**. For a first nomination, select **Get Started**, then **Create Nomination**.
4. Enter a memorable internal name.
5. Choose **New Content**, **App Enhancements**, or **App Launch**.
6. Describe the change and its objective with specific, verifiable details.
7. Select a publication date or custom date range.
8. Review additional information: related apps, platforms, relevant countries or regions, localizations, eligible In-App Events, supplemental materials, and helpful details.
9. Save as a draft if any evidence is unfinished.
10. When the record is complete, select **Submit Nomination** and confirm.
11. Verify that the nomination appears under **Submitted**, not **Drafts**.

Individual nominations start as drafts. The last verification matters because a complete-looking draft has not reached Apple's editorial team.

You can provide up to five supplemental URLs for documents, files, art assets, or TestFlight public links. Choose the smallest set that helps an editor inspect the claim. Five links are not better than two working, well-labeled links.

The **Helpful Details** field can add relevant accessibility, inclusivity, priority, app, or team context. Include a detail because it changes how the nomination is understood, not because the field is available.

## Review locked fields before submission

Before submitting, review the fields that become locked:

| Field or decision | Check before submission |
| --- | --- |
| Nomination type | It describes the real release moment |
| Related apps | Every app belongs to the same editorial story |
| Publication date | It is credible and uses the intended timezone |
| Platforms | They match the nominated experience |
| Countries or regions | They match availability and campaign scope |
| Localizations | The named experiences are actually ready |
| In-App Events | Attached events are approved or published |
| Supplemental URLs | Each link opens and shows what its label promises |

After submission, Apple lets you edit most information, but not the nomination type or related apps. If either is wrong, fixing the rest of the text will not repair the category error. Drafts allow all fields to be edited.

A featuring nomination and App Review information serve different readers. The nomination explains why an editorial team might consider the app or release. [App Review notes](/blog/app-review-notes/) explain how a reviewer can access and test the submitted build. A gated feature may need both.

## Use CSV import only for a real batch

Apple's [nominations template](https://developer.apple.com/help/app-store-connect/reference/nominations-template) supports up to 50 nominations in a CSV file. It is useful for a portfolio or a planned calendar of distinct releases, but it changes the review workflow:

- Imported nominations do not have a draft state.
- App Store Connect validates the file before submission.
- If validation fails, download the report, correct the listed errors, and re-upload the file.
- If validation succeeds, select **Submit**. Imported nominations then appear under **Submitted** and cannot be saved as drafts.
- The template's columns and formatting must remain intact.

For a single app release, the individual form gives you a draft-and-review path. Choose CSV only for a real batch, not because a spreadsheet feels faster.

## Keep the nomination current after submission

Submission does not freeze the product plan. It makes keeping the pitch synchronized with reality more important.

Recheck it when:

- The publication date changes.
- A feature leaves the release.
- The nominated build or TestFlight link changes.
- Platform or regional availability changes.
- A promised localization is delayed.
- An attached In-App Event changes.
- A supporting URL moves or requires new access.

App Store Connect organizes nominations under **Drafts**, **Submitted**, and **Archived**. An archived nomination cannot be restored or edited, although it can be duplicated or exported. A submitted nomination must be archived before it can be permanently deleted.

If an app is being considered, Apple may email team members with the Admin, App Manager, or Marketing role to request promotional assets. That request is separate from supplemental-material URLs and is not a promise of placement.

## Track prep without mistaking it for Apple state

LaunchBuddy can organize nomination prep as release tasks or checklist items: setting the deadline, gathering evidence, checking the product page, verifying URLs, and recording follow-up.

Release planning, taskboards, default submission checklists, and iCloud sync are available on the free plan, subject to its limits of two apps, two releases, and limited project notes. A reusable custom nomination-prep checklist requires Pro.

![LaunchBuddy Releases board with backlog tasks, a planned version, release date, and status](/screenshots/launchbuddy/releases.jpg)

LaunchBuddy does **not** create or submit featuring nominations, read their status, configure In-App Events, upload promotional assets, or guarantee editorial selection. App Store Connect remains the source of truth for the nomination.

A practical release task group is:

```text
Featuring nomination
- Choose nomination type
- Set publication date and nomination deadline
- Draft claim-and-proof brief
- Verify product page and supplemental URLs
- Confirm platforms, regions, and localizations
- Save individual nomination as draft
- Review fields that lock after submission
- Submit in App Store Connect
- Verify Submitted status
- Recheck after release-scope or date changes
```

The checklist records work completed by the developer. It does not prove that Apple received, accepted, or selected the nomination; verify those states in App Store Connect.

## Submit a clear, inspectable story

A strong App Store featuring nomination is specific, timely, and easy to verify. Choose the type that matches the release, work backward from a credible date, replace adjectives with evidence, test every supporting link, and confirm the record moved from Drafts to Submitted.

Make the release and its significance understandable without asking an editor to fill in the gaps.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy to keep nomination prep tasks with your release plan</a>.
