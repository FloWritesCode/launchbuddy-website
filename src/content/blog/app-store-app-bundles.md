---
title: "App Store App Bundles: How to Create and Launch One"
description: "Create an App Store app bundle with the right member apps, primary app, pricing, availability, metadata, review plan, and post-approval checks."
pubDate: 2026-09-16
---

**An App Store app bundle groups up to ten of your apps on one bundle product page and lets customers download the set together. To create one, first confirm that every member app is individually available and eligible, choose the primary app deliberately, set a compatible bundle price and shared availability, complete the bundle metadata, then submit the bundle to App Review.**

The rules differ by business model. A paid bundle can contain only paid apps and must cost less than buying them separately. A free bundle can contain only free apps, and each app must offer an auto-renewable subscription that unlocks the bundle's content or services across all member apps.

The workflow below adds a preflight decision record around Apple's controls so one member-app change doesn't unexpectedly remove the whole bundle from a storefront.

## App Store app bundles at a glance

Apple's current [app bundle overview](https://developer.apple.com/app-store/app-bundles/) sets these boundaries:

- A bundle can contain up to ten apps.
- Each app must remain available as an individual download.
- Paid and free apps can't be mixed.
- One app can be in no more than three bundles that are available at the same time.
- A developer account can have up to ten bundles marked as cleared for sale at once.
- A universal-purchase app counts as one app within the bundle.

An app bundle and universal purchase aren't the same thing. A **bundle** groups separate app products on a bundle product page. **Universal purchase** puts related platform versions under one app record so a customer can obtain them together. Apple allows a universal-purchase app to be one member of a larger app bundle.

Apps that support only tvOS or only visionOS can't be bundled. However, Apple changed the cross-platform rule for new bundles: for bundles created after February 17, 2026, the member apps no longer need to support a platform in common with the primary app. Older bundles remain subject to the previous shared-platform rule.

## Step 1: Decide whether the apps make one credible offer

Eligibility is only the first test. The apps should also solve a related customer problem that can be explained in one sentence.

Start with this portfolio decision:

```text
Bundle customer:
Combined job:
Why these apps belong together:
Why each app still makes sense separately:
Paid-app discount or shared-subscription model:
Apps deliberately excluded:
```

For example, a writing bundle might combine a drafting app, a reference manager, and a focused editing tool. “Three apps I own” isn't a customer proposition. If the relationship requires a paragraph of caveats, the bundle may be an accounting convenience rather than a useful product.

Review the decision at portfolio level before creating App Store work. The [indie app portfolio management workflow](/blog/indie-app-portfolio-management/) helps separate a deliberate multi-app offer from a collection of unrelated products.

## Step 2: Pass the member-app eligibility gate

Apple lets you add an app when it is in the **Ready for Distribution** state. Don't stop at checking the status label. Build one row per candidate app:

| Check | App A | App B | App C |
| --- | --- | --- | --- |
| Ready for Distribution |  |  |  |
| Available individually |  |  |  |
| Paid or free |  |  |  |
| Auto-renewable subscription approved, if free |  |  |  |
| Shared subscription access works, if free |  |  |  |
| Current countries or regions |  |  |  |
| Current and scheduled prices, if paid |  |  |  |
| Platform support |  |  |  |
| Current age rating |  |  |  |
| Common localizations |  |  |  |

For a free bundle, checking that a subscription product merely exists isn't enough. Apple's rule requires each free app to offer an approved auto-renewable subscription, and subscribing in one app must give access to the included content or services in the other apps at no extra cost. That cross-app entitlement behavior needs implementation and purchase testing outside App Store Connect.

For a paid bundle, record scheduled member-app price changes as well as today's prices. Apple's compatible bundle-price choices can change when an individual app's price changes.

## Step 3: Choose the primary app before adding anything

The first app you add becomes the **primary app**, so ordering is more than a presentation choice. App Store Connect derives several bundle properties from that app.

According to Apple's [app bundle information reference](https://developer.apple.com/help/app-store-connect/reference/app-bundle-information/), the primary app supplies the bundle's category, privacy policy, license agreement, copyright, and trade representative contact information. Its primary language also becomes the bundle's initial primary language.

Choose the app whose product and compliance context best represents the combined offer. Before creating the bundle, verify:

- Its category accurately describes the bundle.
- Its privacy policy covers the combined customer journey.
- Its license and trade contact details are suitable for the bundle.
- Its primary language is the right starting point for bundle metadata.

Changing which app appears first can change the primary app and derived metadata. It doesn't automatically change the bundle's primary language after initial creation, so review that setting separately.

Ordering also affects presentation. The generated bundle icon uses the first four app icons, while screenshot distribution and order depend on the member-app order. Apple can display up to ten screenshots and allocates an equal number to each app, replacing an app's first screenshot with its app preview when one is available. Preview the set as one story rather than assuming each app's full gallery will appear.

## Step 4: Calculate price and availability as intersections

An app bundle has no independent country-or-region selection. It can be live only where **every** member app is available.

Use set intersection, not a master wish list:

```text
App A availability: US, Canada, UK
App B availability: US, Canada, France
Bundle availability: US, Canada
```

If App B is later removed from sale in Canada, the bundle also disappears there. Keep an explicit bundle-impact check beside every future availability change.

Paid pricing has both a floor and a ceiling:

```text
bundle price >= highest individual app price
bundle price < sum of all individual app prices
```

Suppose two apps are priced at $4.99 and $2.99 in one storefront. The bundle needs a compatible price that is at least $4.99 but below $7.98 there. Choose from the compatible price tiers App Store Connect presents rather than treating that arithmetic as a valid global price schedule.

Customers who already bought one or more paid member apps can use **Complete My Bundle**. Apple credits eligible prior purchases and adjusts the amount due for the remaining apps. This is customer purchase behavior, not a discount rule you calculate manually.

Record the launch assumptions:

```text
Highest member-app price by storefront:
Combined member-app price by storefront:
Chosen compatible bundle tier:
Common countries or regions:
Scheduled member price or availability changes:
Owner and date for rechecking compatibility:
```

Apple's [availability and price rules](https://developer.apple.com/help/app-store-connect/create-an-app-record/edit-app-bundle-information/) are the source of truth. An approved bundle can still be unavailable when its current pricing or member-app availability is incompatible.

## Step 5: Prepare metadata as a combined product page

Bundle-specific fields include the name, description, optional marketing URL, price, SKU, primary language localizations, and Cleared for Sale setting.

The SKU must be unique within your account and different from every member app's SKU. It's an internal identifier, not customer copy.

Write the name and description for the combined job:

```text
Name: [specific customer outcome or product family]

Opening:
What the bundle helps the customer do and who it is for.

Included:
- App A: distinct role
- App B: distinct role
- App C: distinct role

Offer:
Explain the paid-app saving or shared-subscription access accurately.
```

Don't paste three app descriptions together. The opening should explain why the set is more useful as a set. Then identify each member app's role without implying features it doesn't provide.

Apple derives available bundle localizations from the localizations shared by all member apps. Build a locale intersection before promising translated bundle copy. If one app lacks a locale, that locale isn't common to the set.

For the wider field-review process, use the [App Store metadata management guide](/blog/app-store-metadata-management/). Keep bundle claims tied to the currently available member apps, not planned updates.

## Step 6: Create and submit the bundle in App Store Connect

Apple allows the Account Holder, Admin, App Manager, or Marketing role to perform this workflow. Follow the live [create and submit app bundles instructions](https://developer.apple.com/help/app-store-connect/create-an-app-record/create-and-submit-app-bundles) if the interface differs:

1. Open **Apps**, select the add button, and choose **New App Bundle**.
2. Enter a unique bundle name.
3. Add the intended apps in the order you planned. The first becomes the primary app.
4. Select **Create**.
5. Complete the required Bundle Information and save.
6. Recheck the generated icon, derived information, screenshots, price, and common availability.
7. Select **Submit for Review**.

The bundle moves to **Waiting for Review**, then **In Review** when review starts. If you find a membership or ordering error while approval is pending, remove the bundle from review, make the correction, and resubmit. A planning checklist isn't proof of submission; verify the status on the bundle record.

Use a release gate before the final action:

- [ ] Every member app still passes the eligibility table.
- [ ] The first app is the intended primary app.
- [ ] Derived privacy and compliance information is suitable.
- [ ] Name, description, icon, and screenshot sequence describe the same offer.
- [ ] The selected tier remains compatible.
- [ ] The common availability matches the launch plan.
- [ ] Free-bundle subscription access has been tested in every member app, if applicable.
- [ ] Future member-app changes have bundle-impact owners.

The [App Store Connect release checklist](/blog/app-store-connect-release-checklist/) covers the app-version work around each member app. Keep that work separate from the bundle's own review record.

## Step 7: Treat approval as an ownership boundary

After Apple approves the bundle, you can no longer add or remove member apps. That makes membership the most important pre-submission decision.

Apple documents three classes of later change:

**Changes that don't need another review**

- Rearranging apps
- Editing the description or marketing URL
- Changing the bundle's primary language
- Adjusting price or the Cleared for Sale setting
- Using the generated bundle icon or removing a legacy custom icon

**Changes that require another review**

- Adding localizations
- Changing the bundle name
- Changing a legacy custom bundle icon

**Changes that are no longer available**

- Adding or removing apps after approval
- Deleting an approved bundle

An approved bundle can be removed from the App Store by clearing **Cleared for Sale**, but it can't be deleted. Before changing a member app's price, availability, privacy information, primary metadata, or sale status, add a “bundle impact” check. Derived metadata can update from the primary app, and incompatible pricing or availability can make the bundle disappear even when nobody edited the bundle record directly.

## Worked example: plan a two-app paid bundle

Imagine an indie developer has two individually available paid apps:

- **DraftDesk**, a writing app
- **SourceShelf**, a reference organizer

The useful workflow is:

1. Define the combined job as “draft and organize source material.”
2. Confirm both apps are Ready for Distribution and list their common storefronts.
3. Choose DraftDesk as primary because its category, privacy policy, and product framing represent the combined workflow.
4. Record each app's current and scheduled storefront prices.
5. Select a compatible tier that is no lower than the higher app price and lower than their combined price.
6. Order the apps so the generated icon and screenshot sequence lead with the drafting workflow.
7. Write one bundle description that explains each app's role.
8. Submit only after a future change owner exists for both apps.

The last step is easy to miss. If SourceShelf later leaves a country or its price rises above the bundle price, the bundle can become unavailable there. The durable artifact isn't just the launch checklist. It's a dependency record that survives the launch.

## Where LaunchBuddy fits

LaunchBuddy can organize each app, its releases, version-scoped tasks, and submission checks across iPhone, iPad, and Mac. Default App Store submission checklists are available on the Free plan. The Free plan is limited to two apps and two releases; Pro adds unlimited apps and releases plus custom checklists.

For a bundle, use one project note or release record to preserve the member-app table, primary-app choice, price and availability intersection, metadata owner, and review evidence. Put member-app changes in their own releases, with a bundle-impact task where needed.

These records are a workflow you create. LaunchBuddy doesn't create or submit an App Store bundle, determine eligibility, configure cross-app subscriptions, set pricing or availability, inspect App Store status, or calculate Complete My Bundle amounts. App Store Connect remains authoritative for the bundle and every member app.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy to organize the apps and release tasks behind your next bundle</a>.
