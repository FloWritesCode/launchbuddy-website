---
title: "App Store Win-Back Offers: Setup and Testing Guide"
description: "Set up App Store win-back offers for lapsed subscribers, test eligibility and redemption, choose promotion surfaces, and measure reactivation."
pubDate: 2026-09-15
---

**To create an App Store win-back offer, open an approved auto-renewable subscription in App Store Connect, choose Create Win-Back Offer under Subscription Prices, then set its dates, priority, eligibility, storefronts, discount type, duration, and price. Test the complete lapse-to-redemption path before launch, and measure paid conversion and later churn rather than counting offer starts alone.**

A win-back offer is for an eligible customer whose auto-renewable subscription has already expired and no longer renews. It isn't a fix for billing retry, a discount for a current subscriber, or a first-time subscriber trial. That boundary should determine the audience, implementation, message, and success criteria.

The workflow below carries the offer from audience choice through testing and review. Win-back offers stay separate from [subscription offer codes](/blog/app-store-subscription-offer-codes/), which require a customer to receive and redeem a code.

## Start with one lapsed-subscriber hypothesis

A discount can produce reactivations without explaining why customers return or whether they stay. Before opening App Store Connect, write one testable campaign brief:

```text
Offer reference:
Subscription product and group:
Target storefronts:

Lapsed audience:
- Minimum prior paid duration:
- Time since subscription ended:
- Prior win-back redemption:
- Minimum wait between offers:

Reason this audience may return:
Product change or renewed value:
Offer type: Pay as you go | pay up front | free
Offer duration and price:
Standard renewal price after the offer:

Discovery surfaces:
Primary result:
Guardrails:
First review:
Mature-cohort review:
Decision: Continue | revise | stop | insufficient evidence
```

“Bring back churned users” is too broad. A more useful hypothesis is: “People who paid for at least six months and left three to eight months ago may return for the redesigned export workflow; a two-month discount gives them enough time to reevaluate it.”

The hypothesis may be wrong, but it exposes what needs proof. Confirm the product improvement exists, define the eligible lapse window, and decide how long the cohort must mature before judging retention.

## Step 1: Estimate the eligible audience before setting terms

Apple's [Win-back Eligibility Report](https://developer.apple.com/help/app-store-connect/reference/reporting/win-back-eligibility-report/) aggregates churned subscriptions by product, subscription group, paid tenure, time since churn, prior win-back redemption, time since the last offer, and territory. Use it to estimate a segment that matches the brief.

The report is directional, not a recipient list:

- counts are aggregated rather than customer-level;
- a row appears only when it contains at least five churned subscriptions;
- tenure and time-since-churn values are rounded down to months;
- Apple's [report-download documentation](https://developer.apple.com/help/app-store-connect/measure-app-performance/download-and-view-reports/) says it excludes subscriptions that churned more than two years ago.

For a small app, a missing row may mean the five-subscription reporting threshold wasn't met. It doesn't prove that no eligible customer exists. Don't loosen eligibility merely to make a report look larger; choose criteria that match a credible reason to return.

Win-back offers are configured per subscription product. Apple evaluates customers against the most recently lapsed product in each subscription group. If monthly and annual customers need separate offers, plan and configure each product separately rather than assuming one group-level offer covers both.

## Step 2: Configure the win-back offer in App Store Connect

The Account Holder, Admin, App Manager, or Marketing role can create a win-back offer. The subscription must already be approved by App Review.

Follow Apple's current [win-back offer setup path](https://developer.apple.com/help/app-store-connect/manage-subscriptions/set-up-win-back-offers/):

1. In **Apps**, select the app.
2. Select **Subscriptions** in the sidebar.
3. Open the subscription group, then the approved subscription product.
4. In **Subscription Prices**, select the add button.
5. Choose **Create Win-Back Offer**.
6. Enter a reference name and an offer identifier that hasn't been used in the subscription group.
7. Set the availability dates and priority.
8. Set paid-duration, lapse-window, and optional repeat-offer eligibility.
9. Choose countries or regions.
10. Select **Pay as you go**, **Pay up front**, or **Free**, then set the duration and price.
11. Review comparable storefront prices and any custom prices.
12. Verify every value, then confirm.

The earliest start date is one day after the current date, the offer must run for at least three days, and start timing varies by region. Apple allows up to 350 win-back offers per subscription, with no more than five active per storefront and subscription at once. Those are platform ceilings, not sensible campaign targets.

### Set eligibility from the customer state

Three controls define the eligible window:

| Criterion | Current App Store Connect range | Decision it should express |
| --- | --- | --- |
| Minimum paid duration | 1–24 months, or 3, 4, or 5 years | How much prior paid experience the customer should have |
| Time since last subscribed | Required minimum and maximum from 1–24 months | How recently the subscription ended |
| Wait between offers | Optional, 2–24 months | How soon the same offer may be redeemed again |

The customer must be churned. Apple's StoreKit documentation defines that as an expired subscription with auto-renew turned off. Customers in Billing Grace Period or billing retry aren't eligible for win-back offers; handle payment recovery as a different workflow.

Avoid treating broad criteria as harmless reach. A customer who left last month after a missing feature and one who left two years ago after a one-week trial carry different evidence. If both receive the same offer, the aggregate result becomes harder to interpret.

### Check the permanent fields and overlap warning

Choose the reference name, offer identifier, and price carefully. Apple says those values can't be changed after creation.

App Store Connect warns when scheduled offers overlap for the same eligible customer. When more than one offer applies, Apple selects which one to display using price, duration, and factors such as paid tenure. High priority is an input to placement ranking, not a guarantee that a particular offer will appear.

Preserve an offer receipt before confirming:

```text
Reference name:
Offer identifier:
Subscription product:
Availability dates:
Priority:
Eligibility:
Storefronts:
Type, duration, and price:
Standard renewal terms:
Known overlapping offers:
Verified by:
Verified at:
```

This is the record to compare with the live experience and later Analytics filters.

## Step 3: Choose where eligible customers discover the offer

Creating the offer doesn't make every surface equivalent.

| Surface | What is required | Main verification |
| --- | --- | --- |
| Manage Subscriptions | iOS or iPadOS 14.3+, macOS 14+, active offer, and eligible customer | Correct product, terms, and renewal price appear |
| In-app win-back offer sheet | iOS or iPadOS 18+, macOS 15+, and StoreKit behavior | The sheet appears only in the intended app state |
| In-app custom merchandising | StoreKit 2 eligibility and purchase handling | The selected eligible offer is attached to the purchase |
| App Store promotion | iOS or iPadOS 18+, macOS 15+, approved subscription image, and promotion enabled | Product page and storefront presentation are accurate |
| Direct redemption link | Apple-generated link sent only after an eligibility check | The intended customer can redeem the intended offer |

Apple automatically makes an active offer available to eligible customers in Manage Subscriptions on iOS and iPadOS 14.3 or later and macOS 14 or later. Its in-app offer sheet requires iOS or iPadOS 18 or later or macOS 15 or later. You can also merchandise an eligible offer in your own interface with StoreKit 2.

Promoting the offer is a separate choice. It requires an approved subscription image, and the image can't duplicate the app icon or screenshots. Apple also warns that a promoted win-back offer replaces In-App Purchase promotions in the same storefront. Record what will be displaced before enabling promotion.

For email or another direct channel, use the redemption URL generated by App Store Connect. Apple's [StoreKit guidance](https://developer.apple.com/documentation/storekit/supporting-win-back-offers-in-your-app) says to check the customer's current eligibility through the App Store Server API before sending that link. A churned-customer mailing list is not enough: eligibility can differ by product, lapse duration, storefront, and prior offer state.

## Step 4: Test lapse, eligibility, purchase, and entitlement

Testing only the discounted price misses the risky transitions. Apple's [Xcode testing workflow](https://developer.apple.com/documentation/storekit/testing-win-back-offers-in-xcode) lets you add a win-back offer to a StoreKit configuration, mark it **Eligible** or **Not Eligible**, cancel an auto-renewable subscription, and wait for the accelerated subscription to expire.

The Xcode eligibility toggle deliberately bypasses the full production criteria. It verifies app behavior, not whether your App Store Connect audience rules select the customers you expect.

Run this matrix:

| Scenario | Expected result |
| --- | --- |
| Subscription is still active | No win-back purchase path |
| Subscription is in billing retry or grace period | No win-back eligibility |
| Subscription expired; test offer is Eligible | Intended offer and terms appear |
| Subscription expired; test offer is Not Eligible | No win-back offer appears |
| Eligible customer accepts | Correct discount is attached to the purchase |
| Purchase succeeds | Correct entitlement is restored |
| App relaunches or another device restores | Entitlement remains consistent |
| Offer period ends | The resulting subscription state matches the displayed terms |

Also test cancellation, network interruption, a pending purchase if your app supports that state, and the support handoff for a failed redemption. Keep transaction verification and entitlement logic authoritative; never unlock access because a promotional screen was visible or a button was tapped.

When multiple offers exist, don't hard-code “the first configured offer” as your business preference. In production, StoreKit's `eligibleWinBackOfferIDs` contains eligible identifiers ordered with Apple's best offer first. Xcode's StoreKit Testing returns eligible offers in no particular order, so tests must not depend on production ranking. Match an eligible identifier to the available offer details before adding it to a purchase.

## Step 5: Run a reversible launch

Use the first launch as an operational test, not a verdict on the entire win-back strategy.

Before the start:

- confirm the product improvement and support material promised by the campaign;
- verify the offer receipt against App Store Connect;
- test every selected discovery surface on supported devices;
- confirm standard renewal terms are clear;
- check direct-link recipients immediately before send;
- save baseline subscription, churn, and support context;
- name the person responsible for deletion or customer communication.

After the start:

- verify the offer in each intended storefront;
- check that no unrelated In-App Purchase promotion was displaced unexpectedly;
- monitor purchase, entitlement, billing, and support failures;
- preserve the exact launch time and marketing placements;
- delete the offer if the terms or product experience are wrong.

Apple says a deleted offer's link shows that the offer is no longer available. Deletion doesn't replace customer support or entitlement handling for a completed purchase, so preserve the incident and affected transaction evidence before acting.

## Step 6: Measure reactivation after the offer has matured

In App Store Connect Analytics, open **Analytics → Monetization → Offers**, select Win-Back Offers, then filter to the offer, territory, device, or other relevant dimension. Apple's [Offers documentation](https://developer.apple.com/help/app-store-connect-analytics/monetization/offers) recommends examining offer volume, conversion to paid, churn, lifecycle events, billing status, territory, and acquisition source.

Use a funnel instead of one headline number:

```text
Eligible audience estimate
→ placements live or verified direct links sent
→ offer start
→ active offer
→ conversion to a paid subscription
→ renewal
→ later churn
```

These stages don't share one denominator. The eligibility report is aggregated, App Store placements don't identify every viewer, and a verified direct link isn't a redemption. An offer start still isn't durable reactivation. Apple's Offers dashboard reports conversion to a paid subscription; whether that customer later reaches your standard price is a separate cohort question. For a pay-as-you-go offer that spans several renewals, review both offer-period renewals and what happens afterward.

Create a decision receipt:

```text
Offer and review window:
Eligible segment:
Discovery surfaces:
Offer starts:
Conversions to paid:
Later standard-price renewals, if applicable:
Renewals after conversion:
Churn after enough time:
Billing or entitlement failures:
Support themes:

Other product, price, or marketing changes:
What the evidence supports:
What it does not prove:
Decision: Continue | revise | stop | insufficient evidence
Next review:
```

Use complete and equally mature cohorts. The broader [App Store Connect analytics guide](/blog/app-store-connect-analytics/) explains why offer volume, conversion, and churn should be read together. After launch, the [iOS post-launch checklist](/blog/ios-post-launch-checklist/) helps separate customer-blocking incidents from slower product learning.

## Where LaunchBuddy fits

App Store Connect configures the offer, determines eligibility, creates its redemption URL, controls promotion, and provides offer-level reporting. StoreKit and your app's implementation own purchase and entitlement behavior, with your server involved when your architecture uses one. LaunchBuddy doesn't create win-back offers, identify eligible customers, send redemption links, validate StoreKit, or replace Apple's subscription records.

LaunchBuddy can organize the surrounding release work: the hypothesis, StoreKit tests, storefront QA, launch checks, support review, and decision date can stay with the relevant app and release. Release planning, taskboards, default submission checklists, and iCloud sync are available on the Free plan within its two-app, two-release, and project-note limits.

With App Store Connect API credentials, LaunchBuddy Pro adds selected downloads, revenue, and subscription metrics. It doesn't reproduce Apple's Win-Back Offers dashboard, so use App Store Connect for offer-level eligibility and analysis. Pro is $2.99 per month or $19.99 per year, and one subscription covers iPhone, iPad, and Mac with feature availability varying by platform.

If a win-back campaign is part of an upcoming app update, <a href="https://apple.co/3iFcjjW">download LaunchBuddy and keep its test, launch, and review tasks attached to the release</a>.
