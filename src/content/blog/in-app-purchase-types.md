---
title: "In-App Purchase Types: Choose the Right StoreKit Product"
description: "Compare Apple's four In-App Purchase types by duration, repeat purchase, renewal, restoration, and review requirements before creating a product."
pubDate: 2026-09-28
---

**Apple has four In-App Purchase types: consumable, non-consumable, auto-renewable subscription, and non-renewing subscription.** Choose the type from the promise made to the customer: a depleted unit is consumable, a permanent unlock is non-consumable, continuing access with automatic billing is auto-renewable, and fixed-duration access that ends without automatic renewal is non-renewing.

Make that decision before creating the product. App Store Connect lets you edit much of an In-App Purchase's metadata later, but not its product ID or purchase type. Correcting the wrong type means creating a different product rather than changing a setting.

## The four In-App Purchase types at a glance

Apple's [In-App Purchase type reference](https://developer.apple.com/help/app-store-connect/reference/in-app-purchase-types/) defines the four categories. This table translates those definitions into product decisions:

| Type | Customer buys | Ends when | Can buy again? | Renews automatically? | Persistence and restoration |
| --- | --- | --- | --- | --- | --- |
| **Consumable** | A quantity that can be used up | The purchased quantity is depleted | Yes | No | The app must preserve the remaining balance; completed consumables aren't restored by StoreKit |
| **Non-consumable** | A permanent feature or content unlock | It doesn't expire or decrease with use | Not as a normal repeat purchase | No | StoreKit can restore or sync the purchase |
| **Auto-renewable subscription** | Access to changing content or service for a period | The verified subscription entitlement ends | The subscription can renew or be resubscribed to | Yes, until canceled | StoreKit can restore or sync the subscription; access must follow verified entitlement state |
| **Non-renewing subscription** | Access to content or service for a fixed period | The app-managed period expires | Yes, through another purchase | No | The app is responsible for preserving and restoring access across devices |

“Subscription” doesn't automatically mean auto-renewable. The renewal promise is the dividing line between Apple's two subscription types.

## Consumable means the purchased unit can run out

A consumable is used once or drawn down, then purchased again. Examples include:

- a pack of game currency;
- one export credit;
- a bundle of hints;
- another attempt or entry.

The test is depletion, not whether the feature feels temporary. If someone buys 100 credits and their balance falls as they use them, the product is consumable.

That model needs an explicit balance ledger. Record what adds units, what spends them, and how interrupted or duplicate transaction delivery is handled. Apple's [purchase-persistence guidance](https://developer.apple.com/documentation/storekit/persisting-a-purchase) says consumable state must be preserved by the app. A completed consumable isn't a restorable purchase, so a Restore Purchases button cannot reconstruct an unrecorded balance.

Avoid using a consumable for a durable promise. If “buy once and keep this feature” appears anywhere in the paywall or support copy, the product behaves like a non-consumable even if its internal implementation uses a flag.

## Non-consumable means a lasting unlock

A non-consumable is purchased once and doesn't expire or decrease with use. It fits products such as:

- a permanent pro-feature unlock;
- a level pack that remains available;
- an offline content pack;
- a one-time removal of an optional limitation.

The key question is whether the same customer should retain the purchase after reinstalling the app or moving to another device. StoreKit supports restoring and syncing non-consumables, but the app still has to present a working restoration path and grant access from verified transaction data.

Don't use a non-consumable when the customer is buying units that can be exhausted. “Lifetime” also needs care: a permanent product unlock isn't a promise that every external service will operate forever. Customer-facing copy should describe the durable entitlement precisely.

Non-consumables can support Family Sharing when the developer enables it. Apple's [Family Sharing documentation](https://developer.apple.com/help/app-store-connect/configure-in-app-purchase-settings/turn-on-family-sharing-for-in-app-purchases) says the feature is limited to non-consumables and auto-renewable subscriptions, and that enabling it for a product can't be undone. Treat that as a separate product decision, not a default consequence of choosing the type.

## Auto-renewable means continuing access and recurring billing

An auto-renewable subscription provides access for a set period and renews unless the customer cancels. It fits an ongoing service or body of changing content where access and billing should continue together.

In App Store Connect, these products belong to a subscription group. Apple says a customer can have one subscription in a group at a time. Products within the group can represent durations or service levels, while their ordering defines upgrade, downgrade, and crossgrade behavior. Apple's [auto-renewable subscription guide](https://developer.apple.com/help/app-store-connect/manage-subscriptions/offer-auto-renewable-subscriptions/) recommends one group for most apps so customers don't accidentally hold multiple subscriptions for the same service.

The implementation must not equate an old purchase event with current access. Renewal, expiration, billing issues, refunds, revocation, upgrades, and downgrades can all affect the entitlement. Gate the service from verified current subscription state.

Choose this type only when automatic renewal is part of the intended customer agreement. If a fixed event pass should simply end, don't put it in a renewable product and rely on customers to cancel.

## Non-renewing means fixed-duration access without renewal

A non-renewing subscription grants service or content for a limited period but doesn't renew automatically. When the period ends, continued access requires another purchase.

It can fit a time-limited archive, event season, or access pass where:

- the end is intentional;
- the customer shouldn't be billed again automatically;
- another purchase may extend access;
- the app can calculate and preserve the entitlement period.

Unlike an auto-renewable subscription, the app owns more of the continuity logic. Apple states that non-renewing subscriptions aren't restored by the App Store's completed-transaction restore operation. The developer must make the purchase available across the customer's devices and restore past access through an appropriate persistence system.

Don't choose this type merely to avoid subscription-group design. Manual renewal creates product and support work: the app needs clear expiration behavior, a repurchase path, cross-device persistence, and rules for overlapping purchases.

## Choose by customer promise, not by implementation convenience

Use this decision sequence:

1. **Does the customer receive a countable unit that can be depleted?** Choose consumable.
2. **Does one payment unlock the feature or content without an expiry?** Choose non-consumable.
3. **Does access last for a period and continue through automatic billing?** Choose auto-renewable subscription.
4. **Does access last for a fixed period and end unless the customer buys again?** Choose non-renewing subscription.

If none fits cleanly, the customer promise probably needs another pass. Don't force two different promises into one product ID. For example, a permanent editor unlock and a recurring cloud service have different duration and billing behavior; model and explain them separately.

Before opening App Store Connect, complete this decision record:

```text
Product:
Customer-facing promise:

What is delivered?
Can it be depleted?
Access starts:
Access ends:
Can the customer purchase it again?
Does billing repeat automatically?

Restore behavior:
Cross-device behavior:
Family Sharing decision:
Refund or revocation behavior:

Proposed product ID:
Selected In-App Purchase type:
Why the other three types do not fit:

Implementation owner:
Sandbox test owner:
App Review packet:
Decision approved by:
```

The “why not” lines expose ambiguity early. If the explanation says both “permanent” and “expires after 30 days,” revisit the product definition.

## Work through four concrete examples

### A 50-credit image export pack

Each export consumes one credit, and the customer can buy another pack. That is a **consumable**. The app needs a durable credit balance and transaction handling that doesn't grant the pack twice or lose unused credits.

### A permanent advanced-export feature

One payment unlocks the feature without reducing a balance or expiring. That is a **non-consumable**. The test plan needs purchase, reinstall, additional-device, and restore paths.

### Continuing access to a maintained research library

Customers receive access for a billing period, the library changes over time, and access continues through recurring billing until cancellation. That is an **auto-renewable subscription**. The plan also needs a subscription-group model and tests for renewal-state changes.

### A 30-day conference archive pass

The pass ends after 30 days and never charges again automatically. A customer may deliberately buy another pass later. That is a **non-renewing subscription**. The app must preserve the access period and make it available across the customer's devices.

These examples differ by entitlement, not by screen design. Four products can use similar paywalls while requiring different StoreKit state, customer copy, and tests.

## Check the irreversible fields before saving

Apple's [edit rules](https://developer.apple.com/help/app-store-connect/manage-in-app-purchases/view-and-edit-in-app-purchase-information/) say the product ID and purchase type can't be edited after the In-App Purchase is saved. Run a short preflight:

- The type matches the customer promise.
- The product ID follows a durable convention and matches the identifier planned in code.
- Duration and renewal wording agree across the paywall, support material, and product decision.
- The persistence and restoration design fits the type.
- Family Sharing has an explicit yes-or-no decision where it is supported.
- Test cases cover purchase, interruption, refund or revocation, reinstall, and another device where relevant.

Pricing comes after type selection. Consumables, non-consumables, non-renewing subscriptions, and auto-renewable subscriptions don't all share the same pricing workflow. The [In-App Purchase price-change guide](/blog/schedule-in-app-purchase-price-changes/) explains that boundary.

## Plan the first-of-type App Review dependency

Choosing a type also affects the submission packet. Apple's [In-App Purchase submission instructions](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-an-in-app-purchase/) require the first consumable, non-consumable, auto-renewable subscription, and non-renewing subscription to be submitted with a new app version. Once the first product of a given type is approved, later products of that type can be submitted without a new version if the app already has an approved version.

For a first auto-renewable subscription, include its subscription group in the same submission. Add the app version, group, and intended products to one draft before selecting Submit for Review.

This is easy to misread as “only the app's first-ever In-App Purchase needs a version.” The rule is per type. An app with an approved non-consumable still has a first-of-type dependency when it later introduces its first auto-renewable subscription.

Use the [In-App Purchase review guide](/blog/submit-in-app-purchase-for-review/) for the complete review packet, then verify the difference between Add for Review and Submit for Review with the [draft submissions guide](/blog/app-store-connect-draft-submissions/).

## Turn the type decision into release work

The type field lives in App Store Connect. StoreKit implementation, entitlement validation, Sandbox testing, and the official review state also remain outside LaunchBuddy. LaunchBuddy doesn't create In-App Purchases or validate transactions.

LaunchBuddy is useful for planning the work around the decision. Keep the record with the app, add implementation and test tasks to the target release, and use an App Store submission checklist for the first-of-type dependency. Release planning, taskboards, default checklists, and iCloud sync are available on the Free plan; Pro adds custom reusable checklists and unlimited apps and releases.

The result should be traceable from promise to product type to tested build. That is a stronger release artifact than a task named “set up IAP.”

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy and turn your In-App Purchase decision into a release-ready task plan</a>.
