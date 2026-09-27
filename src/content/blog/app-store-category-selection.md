---
title: "App Store Category Selection: Choose Primary and Secondary Categories"
description: "Choose accurate App Store primary and secondary categories with an evidence-based workflow, special-case checks, and a careful measurement plan."
pubDate: 2026-09-27
---

**Choose the App Store category that best describes your app's main function, then use a secondary category only when it represents another real way people understand the product.** Don't choose the least competitive chart or the category you wish the app belonged in. Apple says the primary category controls where an app appears when people browse or filter the App Store, and an inappropriate category can violate the App Review Guidelines.

A sound App Store category selection process uses three kinds of evidence: the app's core purpose, where its intended audience would naturally look, and the categories used by genuinely similar apps. The steps below turn those inputs into a decision you can explain and revisit.

## What primary and secondary App Store categories do

Apple lets you assign a primary and a secondary category. Its [category and discoverability guidance](https://developer.apple.com/app-store/categories/) gives the primary category the clearest documented effect:

- On the App Store for iPhone and iPad, it determines whether the app is placed on the Apps or Games tab and where it appears when people browse or filter results.
- On the Mac App Store, it determines browse and filtered-search placement, including the Categories tab.
- For a macOS app, the primary category in App Store Connect should match the category set in Xcode.

Apple describes both categories as the ones that best describe the app, but it doesn't promise a ranking gain for adding a secondary category. Treat the secondary choice as a truthful alternate classification, not a spare keyword slot.

Categories are also different from [App Store app tags](/blog/app-store-app-tags/) and the [App Store keyword field](/blog/app-store-keyword-field/). You choose categories from Apple's defined list. Apple selects app tags and lets you hide unwanted ones. You write the hidden keyword field within its own rules. Changing one doesn't automatically make the others accurate.

## Step 1: define the app's core job

Start with one sentence that avoids feature lists and marketing language:

> This app helps **[audience]** do **[main job]** by **[core workflow]**.

For a meal-planning app, the answer might be:

> This app helps households decide what to cook and prepare a grocery plan from saved recipes.

That sentence is more useful than “an AI-powered lifestyle platform with lists, reminders, and sharing.” The broad version could justify several categories without identifying the product people actually use.

Now apply a removal test:

> If this workflow disappeared, would the app still be recognizably the same product?

If removing recipe and meal planning would destroy the product, Food & Drink is a strong candidate. If removing reminders would leave the main experience intact, Productivity is probably a weak primary choice even though reminders are present.

Use the product the category will describe: the live app, or the submitted build for an upcoming release. A roadmap-only feature can't justify the choice.

## Step 2: shortlist categories from Apple's definitions

Read Apple's current category definitions and copy only plausible candidates into a short table. Don't begin by scanning charts for an easier field.

```text
Candidate category:
Apple's definition:
Core workflow that matches:
Evidence in the current build:
Evidence on the product page:
Reason a user would browse here:
Closest peer apps with the same main job:
Mismatch or expectation risk:
```

Keep “peer” narrow. A calendar, habit coach, team planner, and password manager can all contain lists and notifications, but that doesn't make them the same kind of app. Compare products that solve the same main job for a similar audience, not products that merely share a feature or framework.

Apple's definitions should settle clear mismatches. For example, Developer Tools covers tools for app development, management, and distribution. Productivity covers apps that make a process or task more organized or efficient. A release manager for app developers may have evidence for both; a general to-do list doesn't become a Developer Tool because its author built it in Xcode.

## Step 3: run each candidate through three gates

Use gates instead of a made-up “ranking potential” score.

### Core-experience gate

Does the category describe the app's main function or subject matter, not an incidental feature?

Look for evidence in:

- The first complete user journey
- The features that would remain in a one-sentence product pitch
- The reason customers return
- The app's name, subtitle, first screenshots, and description

A candidate fails when you have to explain, “It fits because the app also has…”

### Audience-expectation gate

Would people browsing this category reasonably expect the experience your app delivers?

Use a simple promise test:

1. Imagine someone finds the app while browsing that category.
2. Read the subtitle and first screenshots from that person's perspective.
3. Open the app and complete its main workflow.
4. Note any expectation the category creates that the product doesn't satisfy.

This isn't a conversion-copy exercise. It catches category choices that are technically adjacent but misleading in practice.

### Peer-set gate

Do established apps with the same main job commonly appear in this category?

Review a small, named set and record the date. Category placement can change, and copying one competitor isn't evidence of a rule. If similar products split between two categories, that is useful: it means purpose and audience should decide the order rather than imitation alone.

Apple itself recommends considering similar apps, but accuracy still comes first. [App Review Guideline 2.3.5](https://developer.apple.com/app-store/review/guidelines/#accurate-metadata) tells developers to choose the most appropriate category and says Apple may change a choice that is far off base.

## Step 4: choose primary first, secondary second

The primary category should pass all three gates and best explain the core experience. Record the choice before considering the secondary category:

```text
Primary category:
Main function it represents:
Audience expectation:
Peer-app evidence:
Why the runner-up is not primary:
Decision owner:
Decision date:
App version reviewed:
```

That “runner-up” line prevents a later discussion from restarting with no context.

Choose a secondary category only after the primary is settled. A useful secondary choice:

- Describes a substantial part of the current experience
- Creates an expectation the app can satisfy
- Represents a credible second way the intended audience understands the app
- Doesn't contradict the product page or primary category

For the hypothetical meal planner, Food & Drink may be primary because recipes and meal preparation define the core job. Productivity might be defensible as secondary if scheduling and list organization are substantial workflows. It would be weak if the only productivity feature were a grocery checklist.

As a working test, make the two fields answer different questions:

```text
Primary: What is this app principally for?
Secondary: What other accurate context helps explain it?
```

If no second category passes the same accuracy checks, don't force one merely to occupy the field.

## Step 5: handle special category rules

Run the applicable check before saving:

| Case | What Apple documents | Practical check |
| --- | --- | --- |
| Games | You can choose up to two Games subcategories | Match the actual game mechanics and the types of games users expect in each subcategory |
| Sticker packs | Stickers can have a subcategory; standalone sticker packs aren't shown in iPhone and iPad categories | Don't plan a browse strategy Apple says the standalone format doesn't receive |
| Kids | Made for Kids uses an age band and App Review requirements; Apple says the selection can't be changed after approval | Treat it as a lasting product and compliance decision, not an ASO tactic |
| macOS | The App Store Connect primary category should match the category set in Xcode | Add a release check for both values before submission |
| Multi-platform app record | App information, including categories, is shared across platforms in the record | Make sure the shared category remains accurate for every platform in the record |
| Unlisted app | Apple says [unlisted apps don't appear](https://developer.apple.com/help/app-store-connect/manage-your-apps-availability/set-distribution-methods/) in categories, charts, recommendations, or search | Don't use category metrics as a discovery plan for an unlisted app |

The Kids category deserves particular care. Apple's [app information reference](https://developer.apple.com/help/app-store-connect/reference/app-information/app-information) says an approved Made for Kids selection can't later be changed and future updates must follow the Kids category guidelines. It isn't simply another audience label.

## Step 6: save the category in App Store Connect

For an app whose information is editable:

1. Open **Apps** in App Store Connect and select the app.
2. Under **General**, open **App Information**.
3. Review **Primary Category**, **Secondary Category**, and any applicable subcategories.
4. Confirm the choice against the current build and product page.
5. For macOS, confirm the primary category matches Xcode.
6. Save the app information.
7. Verify the public listing after Apple's update has propagated.

Apple says [app-information updates can take up to 24 hours](https://developer.apple.com/help/app-store-connect/create-an-app-record/view-and-edit-app-information) to appear in some countries or regions. Don't treat an unchanged storefront immediately after saving as proof that the edit failed.

Keep category review inside the broader [App Store metadata management workflow](/blog/app-store-metadata-management/). If the category changes but the subtitle and first screenshots still promise the old positioning, the listing sends mixed signals.

## Step 7: measure the change without claiming causation

A category change is an observational change, not a randomized experiment. Before saving it, preserve:

```text
Previous primary and secondary categories:
New primary and secondary categories:
Reason for the change:
Public change date:
App version:
Territories to review:
Baseline period:
Comparison period:
Other metadata changes:
Campaigns, featuring, price, and release events:
```

Then use App Store Connect Analytics **Acquisition → Sources** to inspect App Store browse for comparable, complete periods. Apple's [acquisition source definitions](https://developer.apple.com/help/app-store-connect-analytics/acquisition/acquisition) define **App Store browse** broadly: it includes discovery while browsing places such as Today, Games, and Apps. It isn't a category-only attribution bucket.

That limitation changes what you can conclude:

- “Browse-source first-time downloads were higher in the comparison period” is an observation.
- “The new category caused more downloads” isn't supported when featuring, seasonality, a release, or other browse surfaces could explain the movement.
- A flat result doesn't prove the category is wrong; it can't distinguish no effect from a difference obscured by low volume or source mix.

Compare raw counts beside rates, keep the territory and device filters consistent, and note simultaneous changes. The [App Store Connect analytics guide](/blog/app-store-connect-analytics/) explains Apple's source definitions and small-app data caveats in more detail.

## Where LaunchBuddy fits

LaunchBuddy is useful for the decision record and follow-through, not for making the official category change. Add the category review to the relevant release, keep the primary-versus-secondary rationale in a project note, and create a dated post-release analytics task. Reusable submission checklists can make the macOS match check or category review recur with future releases.

LaunchBuddy Pro has an App Store Connect analytics dashboard, but the website documents it as a focused view of downloads, revenue, and subscription metrics. Use Apple's Analytics Sources view for the official App Store browse breakdown and its definitions.

LaunchBuddy doesn't have a documented category editor, category validator, category-ranking tracker, or peer-app research tool. The live value stays in App Store Connect, and you still own the product judgment behind it.

## App Store category selection checklist

```text
Product evidence
- Main audience and core job written in one sentence
- Current build used as evidence
- Roadmap-only features excluded

Candidate review
- Apple's current definitions read
- Core-experience gate passed
- Audience-expectation gate passed
- Small peer set reviewed and dated
- Mismatch risks recorded

Decision
- Primary category and rationale recorded
- Runner-up and rejection reason recorded
- Secondary category supported by a substantial current workflow
- Applicable Games, Stickers, Kids, macOS, or distribution rules checked

App Store Connect
- Categories saved under App Information
- macOS value matched in Xcode, if applicable
- Product-page promise reviewed for consistency
- Public listing scheduled for verification

Measurement
- Previous and new values archived
- Complete comparison periods chosen
- App Store browse source reviewed
- Confounders recorded
- Result described as observational
```

When the evidence conflicts, choose an accurate description of the product over imagined reach. Preserve the rationale so the next review starts from evidence instead of repeating the same guess.

To keep category reviews attached to the releases that change your app, <a href="https://apple.co/3iFcjjW">download LaunchBuddy on the App Store</a>.
