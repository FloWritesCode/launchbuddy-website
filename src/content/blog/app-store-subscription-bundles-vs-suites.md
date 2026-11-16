---
title: "App Store Subscription Bundles vs Suites: Which Fits?"
description: "Compare App Store subscription Bundles and Suites by standalone access, app and developer ownership, limits, migration behavior, and release work."
pubDate: 2026-11-16
---

**Choose an App Store subscription Bundle when each included subscription should remain a product that people can buy on its own. Choose a Suite when one subscription should unlock a related set of apps and none of its included services should be sold separately.**

A Bundle can combine up to five subscriptions in one purchase. It can cover one app, several apps from one developer, or apps from as many as five developers. A Suite is a single-developer offer that can provide one subscription across up to 15 apps.

As of November 16, 2026, this isn't a normal self-serve App Store Connect switch. Apple requires a request, approval, and a configuration process with its team. Purchasing requires StoreKit 2 and iOS 27, iPadOS 27, macOS 27, or tvOS 27 or later.

## Subscription Bundles vs Suites at a glance

| Decision | Subscription Bundle | Subscription Suite |
| --- | --- | --- |
| What the customer buys | Multiple existing subscriptions in one purchase | One subscription that covers services across related apps |
| Can an included service be bought alone? | Yes | No; the included subscriptions exist only in the Suite |
| App scope | One app or multiple apps | Multiple apps |
| Developer accounts | One developer or up to five developers | One developer |
| Published limit | Up to five subscriptions | One subscription across up to 15 apps |
| Pricing relationship | Single-developer Bundles cost less than buying every included subscription separately | One price for the Suite; there are no standalone component prices to total |
| Duration rule | Every included auto-renewable subscription must use the same duration | Apple doesn't state the same matching-duration rule for Suites on its current overview |
| Existing standalone subscriber | Bundle purchase is an immediate upgrade with a prorated refund for the remaining standalone period | No standalone equivalent exists for a Suite component |
| Customer changes | At renewal, a customer can cancel the whole Bundle or keep one or more included subscriptions | Apple documents cancellation of the Suite as a whole, not retention of an otherwise unavailable component |
| Configuration | Request access; Apple works with the developer or developers on configuration, pricing, and launch | Request access; Apple works with the developer on configuration, pricing, and launch |

This comparison concerns Apple's new **subscription** Bundles and Suites. It doesn't describe an [App Store app bundle](/blog/app-store-app-bundles/), which groups separately downloadable apps on a bundle product page, or a subscription group, which controls plan changes within one service.

## A Bundle preserves standalone products

Apple defines a Bundle as subscriptions that remain individually purchasable but are also sold together through one Apple In-App Purchase. That makes it an aggregation model rather than a new all-or-nothing product.

Consider an indie developer with two services:

```text
FocusTimer Pro: $3.99/month when purchased alone
JournalCloud Pro: $4.99/month when purchased alone
Productivity Bundle: both services in one discounted purchase
```

The exact price is configured with Apple, but the product relationship is clear: either standalone subscription still has a reason to exist. The Bundle gives customers another way to buy both.

That distinction changes the cancellation path. Apple's [Bundles and Suites overview](https://developer.apple.com/app-store/subscriptions/bundles-and-suites/) says a Bundle subscriber can cancel the whole purchase or choose one or more included subscriptions to keep. A partial change takes effect at the next renewal date.

It also supports a migration from an existing product. If a person buys a Bundle while holding one of its standalone subscriptions, Apple treats the move as an upgrade, grants the additional access immediately, and issues a prorated refund for the unused part of the standalone period.

Use a Bundle only when every component passes this test:

> If the combined offer disappeared tomorrow, would customers still understand and buy this subscription on its own?

If the answer is no, keeping a collection of artificial standalone products creates paywall, support, and entitlement complexity without a real product reason.

## A Suite makes the collection the product

A Suite is one subscription that provides access across a related set of apps. Apple's [WWDC26 In-App Purchase session](https://developer.apple.com/videos/play/wwdc2026/210/) draws the key boundary: the included subscriptions exist only in the Suite and can't be purchased individually.

Imagine one developer offers three focused apps:

```text
Write: document editing
Sheet: spreadsheets
Present: presentations

Office Suite: one subscription unlocks all three
```

There isn't a separately sold Write subscription to preserve after cancellation. The customer relationship belongs to the Suite, while each app needs to recognize the same valid access.

That makes a Suite a stronger fit when:

- the apps represent one service or product family;
- the customer promise is difficult to divide honestly;
- a single price and renewal relationship are intentional; and
- the same developer owns every app in the offer.

Don't choose a Suite simply because it supports more apps. Moving from standalone plans to a Suite changes what customers can buy and keep. Treat it as product-model work, not a larger Bundle.

## Use four gates to choose the model

### Gate 1: Does every component deserve a standalone price?

Start with the customer promise, not the current product IDs.

| Question | If yes | If no |
| --- | --- | --- |
| Would a customer buy each service independently? | Bundle remains possible | Suite is more coherent |
| Does each service have its own supportable value proposition? | Bundle | Suite |
| Must a customer be able to keep one service after leaving the combined offer? | Bundle | Suite |
| Are the “components” merely internal entitlement labels? | Don't expose them as standalone products | Suite |

This gate prevents an implementation detail from becoming a confusing catalog.

### Gate 2: Who owns the apps and subscriptions?

A Suite stays within one developer's related apps. A Bundle can also stay within one account, but it can span multiple developer accounts.

For a multi-developer Bundle, Apple allows up to five participating developers. Every developer must submit an interest form, sign the Multi-Developer Bundle Program Legal Addendum, and provide subscription details before configuration begins.

Add an ownership record before applying:

```text
Offer owner:
Participating developer accounts:
Included app and subscription owner:
Pricing approver:
Customer-support owner:
Release owner for each app:
Exit or app-transfer decision owner:
```

Apple's overview doesn't publish partner revenue splits, operational service levels, or a universal exit process. Don't invent those terms in an internal plan. Resolve them with Apple and the participating developers before promising a date.

### Gate 3: Can the catalog satisfy Apple's limits?

For a Bundle:

- include no more than five subscriptions;
- use StoreKit 2;
- use the same duration for every included auto-renewable subscription; and
- support the required OS versions for purchase.

The matching-duration rule is easy to underestimate. A monthly product and an annual product can't simply be placed together because they represent the same service level. First decide whether the offer should be monthly or annual, then identify an eligible product for each component.

For a Suite:

- keep the offer within one developer;
- provide the subscription across no more than 15 apps;
- use StoreKit 2; and
- support the required OS versions for purchase.

Apple's public page doesn't provide a self-serve recipe for converting an arbitrary set of existing products into either model. The request and configuration process is a real gate.

### Gate 4: What should happen when the combined purchase ends?

Write the exit behavior before designing the paywall.

```text
Bundle:
- Keep all included subscriptions
- Keep selected subscriptions at their individual terms
- Cancel the entire Bundle at renewal

Suite:
- Keep Suite access through the paid period
- Cancel the Suite at renewal
- No promise that an unavailable component can be retained alone
```

Apple says cancellations and partial Bundle changes take effect at the next renewal date, while an upgrade into a Bundle takes effect immediately. Your UI and support copy should reflect those different clocks.

## Build an entitlement matrix before the paywall

Bundles and Suites reduce purchase steps; they don't remove entitlement work. Every included app still needs to grant the correct service from verified StoreKit state.

Create a shared matrix:

| State | App A | App B | App C | Expected timing |
| --- | --- | --- | --- | --- |
| Standalone A active | Access | No access | No access | Current period |
| Bundle active | Access | Access | Access | Immediately after purchase |
| Bundle changed to keep A only | Access | No access | No access | Next renewal |
| Suite active | Access | Access | Access | Current Suite period |
| Combined purchase canceled | Access until expiry | Access until expiry | Access until expiry | End of paid period |

Replace the example cells with the services in the approved offer. Then test each transition in every included app.

At minimum, cover:

1. A new combined purchase with no prior subscription.
2. A Bundle upgrade from each possible standalone component.
3. Immediate access to every newly included service.
4. Relaunch, reinstall, and another supported device.
5. A partial Bundle change that becomes effective at renewal.
6. Whole-offer cancellation and expiration.
7. Billing recovery, refund, or revocation behavior supported by the existing subscription implementation.
8. An older OS version that can't purchase the offer.

Use Xcode 27 to start testing the APIs, then test the Apple-configured products in the environment Apple specifies during onboarding. A local StoreKit test can prove app logic, but it can't prove that Apple approved the offer, configured the production catalog, or scheduled the intended go-live date.

For the wider transaction-state test plan, adapt the evidence record in the [TestFlight subscription testing guide](/blog/test-subscriptions-in-app-purchases-testflight/).

## Keep subscription groups and combined offers separate

A subscription group answers: **Which plan for this service is active, and how does a plan change behave?**

A Bundle answers: **Which independently purchasable subscriptions are sold together?**

A Suite answers: **Which related apps share this single, non-standalone subscription?**

Don't use the words interchangeably in product IDs, support macros, or release tasks. Start with the [subscription-groups guide](/blog/app-store-subscription-groups/) when monthly and annual durations or Basic and Pro levels within one service are unclear. Bundling a confused catalog only spreads that ambiguity across more apps.

Also avoid calling either model an “app bundle.” An app bundle has its own App Store record, app-membership rules, bundle metadata, and review lifecycle. Subscription Bundles and Suites are Apple In-App Purchase offers.

## Coordinate one release across every included app

The combined purchase can fail as a customer experience even when each app passes in isolation. Use one release contract across the portfolio:

```text
Offer: Bundle | Suite
Apple approval received:
Apple configuration complete:
Confirmed price:
Confirmed go-live date:

Included app / build / StoreKit 2 status / minimum OS:
- 

Purchase entry point:
Standalone-product behavior:
Existing-subscriber migration:
Cancellation and partial-change copy:

Entitlement matrix passed:
Support runbook approved:
Release owner:
Rollback or hold decision:
```

Don't advertise the combined offer from one app until all included production builds can honor it. If one app misses the coordinated release, a successful purchase can still lead to an apparent lockout in that app.

## Where LaunchBuddy fits

Apple owns eligibility, approval, configuration, pricing, purchase state, and the official go-live date. StoreKit and your app or server own merchandising and entitlement behavior. LaunchBuddy doesn't request access, configure a Bundle or Suite, inspect customer transactions, or validate subscription access.

LaunchBuddy can keep the ownership record, per-app implementation work, entitlement matrix, support copy, and coordinated release gate beside the affected releases. Free includes release planning, taskboards, default submission checklists, and iCloud sync within the two-app and two-release limits. Pro adds unlimited apps and releases plus custom reusable checklists.

For a multi-app offer, use one portfolio-level decision record and separate release tasks for each app. That preserves a single product decision without pretending every build has the same implementation status.

## Choose standalone flexibility or one unified product

Choose a Bundle when the subscriptions are valuable on their own and the combined purchase is an optional, discounted path. Choose a Suite when the set of apps is the product and selling its components separately would be artificial.

Whichever model fits, don't start with the paywall. Confirm Apple access, settle ownership and catalog rules, map every entitlement transition, and coordinate the included builds before announcing the offer.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy and coordinate your multi-app subscription release</a>.
