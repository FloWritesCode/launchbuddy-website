---
title: "How to Submit an In-App Purchase for Review"
description: "Submit an In-App Purchase for App Review with the right app version, subscription group, metadata, screenshot, review notes, and final status check."
pubDate: 2026-09-22
---

**To submit an In-App Purchase for review, open the product in App Store Connect, complete its required configuration and review information, select Add for Review, place it in the correct draft submission, inspect every item in that draft, and select Submit for Review. Then reopen App Review and verify that the item has moved from Ready for Review to Waiting for Review or a later status.**

The important decision comes before those clicks: Apple's current rules require the **first product of each In-App Purchase type** to be submitted with a new app version. A new subscription group must also be submitted with at least one of its subscriptions. Later products of an already approved type can usually be submitted without a new version if the app already has an approved version.

Use the process below to build the right review packet, give the reviewer usable evidence, and keep an incomplete draft from being mistaken for a submitted product.

## Decide what must travel with the purchase

Classify the product before creating a draft. Apple's [In-App Purchase submission instructions](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-an-in-app-purchase/) distinguish four types:

- consumable
- non-consumable
- auto-renewable subscription
- non-renewing subscription

The first product **of each type** needs a new app version in the same submission. Approval of a non-consumable doesn't remove the version requirement for the app's first consumable, for example.

| Situation | What belongs in the submission |
| --- | --- |
| First consumable or first non-consumable | The purchase and a new app version |
| First auto-renewable subscription | The subscription, its new subscription group, and a new app version |
| First non-renewing subscription | The subscription and a new app version |
| First subscription in a later new group | The new group and at least one subscription; include a new app version if this is also the first auto-renewable product or the app has no approved version |
| Additional product of a type Apple has approved for this app | The product can be submitted without a new version if the app has at least one approved version |
| App has no approved version | Include an app version in the next submission |

Don't use “we already have IAP” as the test. Record the exact type and whether Apple has approved that type for this app.

```text
Product reference name:
Product ID:
Purchase type:

Has Apple approved this product type for the app before: Yes / No
Approved app version exists: Yes / No
New subscription group: Yes / No / Not applicable

Required packet:
- App version:
- Subscription group:
- Purchases or subscriptions:
```

This dependency record is the main difference between an ordinary draft and an In-App Purchase review packet. For the general Add for Review versus Submit for Review state machine, see the [App Store Connect draft submissions guide](/blog/app-store-connect-draft-submissions/).

## Complete the product before assembling the draft

Open the product under **Monetization → In-App Purchases**. For a non-renewing subscription, Apple directs developers to **Subscriptions → Non-Renewing Subscriptions → Manage**. Auto-renewable products live inside their subscription group.

Before review, compare App Store Connect with the product the build requests through StoreKit:

- purchase type;
- product ID;
- reference name;
- price;
- country or region availability;
- at least one localization with a display name and description;
- the app state that exposes the purchase;
- the entitlement or content the customer should receive.

Product ID and purchase type deserve an extra check. Apple's [In-App Purchase information reference](https://developer.apple.com/help/app-store-connect/reference/in-app-purchases-and-subscriptions/in-app-purchase-information/) says the product ID identifies the product when the app communicates with the App Store. It can't be edited after saving or reused for another product in the same app. Apple also says the purchase type isn't editable.

Test the exact identifier and customer journey before sending the packet. Apple's [Sandbox overview](https://developer.apple.com/help/app-store-connect/test-in-app-purchases/overview-of-testing-in-sandbox/) supports App Store infrastructure testing without a real charge, while StoreKit Testing in Xcode is a separate local environment. A successful local StoreKit test doesn't prove that the App Store Connect product identifier, availability, and submitted build agree.

Save a small test receipt:

```text
App version / build:
Test environment: Xcode StoreKit Testing | Sandbox
Storefront:
Account state:
Product ID requested:
Price and product returned:
Purchase result:
Entitlement result:
Restore result, if applicable:
Evidence location:
Tested by / date:
```

Don't send this record to Apple by default. Use it to check that the submitted build can display and deliver the same item described in the review packet.

## Prepare an App Review screenshot and useful notes

Apple instructs developers to include review notes and an **App Review Screenshot** in the product's Review Information section. These are private review materials, not the public promotional image for the App Store product page.

The screenshot should clearly show the item or service being offered in the app. Use the actual submitted build and capture a state that identifies the product instead of an unrelated home screen. If the purchase appears only after onboarding, sign-in, a level, or another action, explain that path in the notes.

Apple says the screenshot must meet a screenshot specification supported by the app. Once uploaded, it can be replaced but not removed. That makes a current, product-specific image safer than a temporary placeholder.

Review notes can be up to 4,000 characters. They should remove uncertainty, not repeat marketing copy. Include:

- where the purchase appears;
- the exact product the reviewer should choose;
- prerequisites and navigation steps;
- working demo access when sign-in is required;
- the expected purchase and entitlement result;
- how to restore a non-consumable or applicable subscription;
- anything non-obvious about region, account state, hardware, or server setup.

Use a compact template:

```text
Product:
Product ID:
App version / build:

Prerequisites:
- Demo account:
- Required account state or sample data:

How to find and test:
1.
2.
3.

Expected result:
Restore path:
Reviewer caveat:
Contact:
```

Never put credentials in a public task, repository, or screenshot. Enter active review credentials only in Apple's private review fields and keep them working throughout review.

The app version can also need broader reviewer context. If the purchase depends on login, a gated feature, or unusual setup, reconcile these item notes with the version's App Review information. The [App Review notes guide](/blog/app-review-notes/) has a build-specific template for that layer.

## Add the purchase to the correct draft

Only the Account Holder, an Admin, or an App Manager can submit the product. Once its information is complete:

1. In **Apps**, select the app.
2. Open **In-App Purchases** or **Subscriptions** under Monetization.
3. Open the intended product.
4. Select **Add for Review**.
5. Choose a matching existing draft or create a new submission.
6. When required, select the platform and app version.
7. For a subscription whose group hasn't been approved, add the subscription group.
8. Review the draft contents.

Apple allows up to 200 items in one submission. That limit isn't a reason to fill the packet. Submit together what Apple requires or what genuinely belongs to the same review, because every item in the submission contributes to its outcome.

Before the final action, compare the draft with a packet manifest:

```text
Platform:
App version / build, if required:
Subscription group, if required:

Products:
- Reference name / Product ID / Type

Unrelated or stale items present: Yes / No
Review screenshot checked:
Review notes checked:
Storefront availability checked:
Second checker:
```

At this point the product status should be **Ready for Review**. Apple's [status reference](https://developer.apple.com/help/app-store-connect/reference/in-app-purchases-and-subscriptions/in-app-purchase-statuses) defines that as added to a submission but not yet sent to App Review.

## Submit the packet and verify the handoff

In the submission modal or App Review draft, select **Submit for Review**. Adding the item to the draft was only staging; this is the handoff to Apple.

Reopen **App Review** in the sidebar and inspect the submission:

- confirm the intended platform;
- confirm the correct app version when one was required;
- confirm the subscription group when one was required;
- confirm every intended product and no stale product;
- record **Waiting for Review** or a later status.

Don't close the internal submission task while the item still says Ready for Review. Save a receipt based on Apple's state:

```text
Submitted by:
Submitted at:
Platform:
App version / build:
Subscription group:
Products:
App Store Connect status:
Next owner:
Next check:
```

**Waiting for Review** means Apple has received the item but hasn't begun reviewing it. **In Review** means review is underway. **Approved** is the completed product state when required availability has also been provided.

## Diagnose a purchase that can't be submitted

If Add for Review is missing or an item can't be added, don't change several fields at once. Read the status and any banner, then check the packet in this order:

1. **Required product information:** Confirm price, availability, localization, App Review screenshot, and saved review information.
2. **Role:** Confirm the signed-in user is Account Holder, Admin, or App Manager. Apple lists Developer access to the product information as read-only.
3. **First-of-type dependency:** Add a new app version when this is the first submitted product of that type.
4. **Approved-version dependency:** If the app has no approved version, include one.
5. **Subscription-group dependency:** Add a new group and at least one of its subscriptions to the same draft.
6. **Platform and draft:** Confirm that the existing draft is eligible for the same platform and required contents.
7. **Product state:** An item already waiting for or in review can't simply be placed into another draft.

Record the exact error before editing. If a recent metadata change isn't visible in Sandbox, Apple notes that propagation can take up to one hour; don't treat immediate absence as proof that the product configuration is permanently broken.

For broader permission, metadata, and submission blockers, use the [App Store Connect troubleshooting guide](/blog/app-store-connect-help/).

## Resolve a rejected In-App Purchase

A rejection can apply to one item while another item in the same submission is accepted. Apple's status reference uses **Accepted** for a product that passed while another item in its submission was rejected; the accepted item doesn't become Approved until all remaining items are accepted or removed.

To recover:

1. Open **App Review** and select the submission.
2. Read the rejection reason and guideline citation under Messages.
3. Decide whether the fix belongs to product information, review evidence, the submitted app version, or implementation.
4. Select **Edit** beside the rejected item and make the smallest supported correction.
5. Save, then select **Update Review** for that item.
6. Resolve or remove every other rejected item.
7. Select **Resubmit to App Review**.

Don't promise a code fix when only metadata changed, and don't describe a binary defect as a review-note misunderstanding. Keep the rejection, evidence, change, and retest result together so the next submission doesn't repeat it.

## Worked example: first non-consumable in an existing app

Suppose version 3.2 adds a one-time “Pro Tools” unlock. The app has approved versions but has never offered a non-consumable.

The product's first-of-type record says:

```text
Type: Non-consumable
Approved non-consumable exists: No
Approved app version exists: Yes
Required packet: Version 3.2 + Pro Tools purchase
```

Before review, the developer tests the exact product ID against build 410 in Sandbox, captures the paywall showing the one-time unlock, and writes notes with the navigation and restore path. They add version 3.2 and the non-consumable to one draft, verify both items, submit, and record Waiting for Review.

For a second non-consumable added after Pro Tools is approved, a new app version isn't required by the first-of-type rule. The developer still needs an approved app version, a complete product, a build in which App Review can evaluate the purchase, and accurate reviewer evidence.

## Keep LaunchBuddy on the planning side

App Store Connect remains authoritative for product configuration, prices, storefront availability, subscription groups, review materials, submissions, messages, and statuses. Xcode and Apple's test environments are where StoreKit behavior is implemented and tested.

LaunchBuddy doesn't create an In-App Purchase, test an entitlement, upload an App Review screenshot, add an item to Apple's draft, or submit it. Its role is to keep the surrounding work attached to the relevant app and release: identifier verification, Sandbox evidence, review-material preparation, packet inspection, submission receipt, and rejection follow-up.

Default App Store submission checklists are available on LaunchBuddy's Free plan within its two-app and two-release limits. LaunchBuddy Pro adds custom reusable checklists and unlimited apps and releases. Neither plan replaces the final App Store Connect check.

The safest submission has three matching records: the StoreKit product the build requests, the item App Store Connect describes, and the packet App Review receives. Verify all three, submit once, and close the task only after Apple's status confirms the handoff.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy and keep your next In-App Purchase review packet with its release plan</a>.
