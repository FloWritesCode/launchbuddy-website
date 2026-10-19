---
title: "In-App Purchase Offer Codes: Setup, Testing, and Launch"
description: "Create, test, distribute, and measure offer codes for consumables, non-consumables, and non-renewing subscriptions without mixing up code types."
pubDate: 2026-10-19
---

**To create an In-App Purchase offer code, open the purchase in App Store Connect, create an offer, choose customer eligibility, countries or regions, and a free or discounted price, then confirm it. Generate sandbox codes and test the transaction and entitlement before creating one-time-use or custom production codes. Production codes require the app to be Ready for Distribution and the In-App Purchase to be approved.**

This guide covers offer codes for **consumables, non-consumables, and non-renewing subscriptions**. Auto-renewable subscriptions use a separate [subscription offer-code workflow](/blog/app-store-subscription-offer-codes/), with subscription-specific eligibility and renewal choices. Codes that give away the paid app itself are covered by the [App Store promo-code guide](/blog/app-store-promo-codes/).

Apple [expanded offer codes to these additional In-App Purchase types](https://developer.apple.com/news/?id=gf6mgrs6) and stopped allowing developers to create new In-App Purchase promo codes on March 26, 2026. Existing IAP promo codes can still be redeemed until they expire, but a new campaign should use offer codes.

## Start with a campaign brief, not a code batch

An offer's eligibility is based on the customer's purchase history **within the app**, not only on whether they own the selected product. Apple provides three selectable groups:

- never purchased within the app;
- purchased within the app in the last 30 days;
- purchased within the app more than 30 days ago.

Selecting all three makes the offer available to everyone. That can be appropriate, but it shouldn't be accidental. A customer who recently bought a different product in the app belongs to the recent-purchaser group.

Before opening App Store Connect, write down the decision:

```text
Campaign reference:
In-App Purchase and product type:
Customer promise:

Eligibility: Never purchased | last 30 days | more than 30 days
Countries or regions:
Offer: Free | discounted
Standard price:

Code type: One-time use | custom
Redemption channel: URL | App Store | in-app
Distribution audience:
Start and stop dates:

Transaction and entitlement owner:
Support owner:
Primary result:
Review date:
```

The product type changes the test. A consumable must grant the right quantity once, a non-consumable must preserve its lasting unlock, and a non-renewing subscription must preserve the correct fixed access period. If that distinction is unresolved, use the [In-App Purchase types guide](/blog/in-app-purchase-types/) before configuring an offer.

## Step 1: Create the offer in App Store Connect

The Account Holder, Admin, App Manager, or Marketing role can manage these offers. Apple's current [In-App Purchase offer-code instructions](https://developer.apple.com/help/app-store-connect/manage-in-app-purchases/create-offer-codes-for-in-app-purchases) give this path:

1. Open **Apps** in App Store Connect and select the app.
2. Select **In-App Purchases** in the sidebar.
3. Open the In-App Purchase. For a non-renewing subscription, open its management section.
4. Find **Offer Codes** and select **Create Offer**.
5. Enter a unique internal reference name.
6. Select one or more customer-eligibility groups.
7. Choose the countries or regions.
8. Select a paid or free offer. For a paid offer, choose the base storefront price and review Apple's comparable prices for other storefronts.
9. Review the details and confirm.

Use a reference such as `credits-lapsed-q4-2026`, not `fall-offer`. Apple's Summary Sales Report puts this reference in the **Order Type** field for In-App Purchase offer-code transactions, so a durable name makes the campaign identifiable later.

Check every setting before confirming. Apple doesn't let you edit an offer after creation; if the audience or another setting is wrong, create a new offer. Apple currently permits each app up to 10 active offers at a time and limits production offer codes to one million per app per quarter, shared across In-App Purchases.

## Step 2: Choose the right code type

There are three code types, but sandbox codes are a test fixture rather than a distribution format. In production, each customer can redeem only one code for a given offer.

| Choice | Best fit | Batch and expiry | Customer redemption |
| --- | --- | --- | --- |
| **One-time-use** | Controlled, recipient-level distribution | 500–25,000 per batch; expiry required within six months | Unique URL, code entry in the App Store, or supported in-app flow |
| **Custom** | A broad campaign using one memorable code | Up to 25,000 redemptions per batch; no end date or an expiry within six months | Redemption URL or supported in-app flow |
| **Sandbox** | Testing redemption and entitlement handling | 10–10,000 per batch; expiry optional, up to six months when set | Sandbox account settings on a supported device and the app's supported StoreKit flow |

One-time-use codes are safer when each code should go to one known recipient. Once sent, mark a code unavailable even if redemption hasn't been confirmed. Reassigning it creates a race between two people.

A custom code is easier to distribute in a public campaign, but the label doesn't limit the audience. `EVENT2026` can be copied beyond an event. Eligibility, redemption limit, storefront availability, and expiration are the enforceable boundaries.

Custom codes can contain up to 64 characters and no special characters. Apple lets you add another batch with the same custom code. When batches overlap, the system uses the earliest non-expired batch first, so deactivate an incorrect old batch before relying on a replacement.

## Step 3: Test with sandbox codes before production

You can create the offer and its sandbox codes regardless of the app's current status. Each app can distribute up to 10,000 sandbox codes per quarter across its In-App Purchases, and a Sandbox Apple Account isn't limited to one redemption per offer. Because that behavior differs from production, don't use Sandbox to prove that production customer-eligibility rules will reject the wrong cohort.

Don't treat a successful redemption sheet as the end of the test. Apple's [StoreKit offer-code guidance](https://developer.apple.com/documentation/storekit/supporting-offer-codes-in-your-app) says a successful redemption produces a transaction and the app must provide the product or service. Start a `Transaction.updates` listener when the app launches. Also process `Transaction.unfinished`, and check `Transaction.currentEntitlements` for product types it represents, so purchases that completed while the app wasn't running still reach the correct state.

Use a matrix that proves the supported test paths and your app's response:

| Case | Test setup | Channel | Expected result | App evidence |
| --- | --- | --- | --- | --- |
| Sandbox redemption | Fresh sandbox code | Sandbox Account Settings | Redemption succeeds | Verified transaction and correct entitlement |
| In-app redemption | Fresh sandbox code on a supported OS | System redemption sheet | Redemption succeeds | Verified transaction and correct entitlement |
| Outside-app delivery | Apple's outside-app purchase test setup | App inactive, then relaunched | Transaction is delivered | Entitlement appears after launch |
| Unfinished transaction | Delivery deliberately left incomplete | Relaunch | Transaction is recovered and finished after delivery | Product is granted once |
| Repeat processing | Previously handled transaction | Relaunch or restore path | No duplicate grant | Consumable balance or access remains correct |

Follow Apple's [outside-app purchase testing guide](https://developer.apple.com/documentation/storekit/testing-purchases-made-outside-your-app) for that test setup.

Repeat the entitlement checks that fit the product:

- **Consumable:** grant the purchased quantity exactly once and preserve the remaining balance.
- **Non-consumable:** unlock the correct product and verify the supported restore or sync path.
- **Non-renewing subscription:** start the intended access period and preserve it across relaunch and supported devices.

For consumables, non-consumables, and non-renewing subscriptions, Apple's in-app offer-code redemption starts with iOS and iPadOS 16.3, macOS 15.0, and visionOS 1.0. Use Apple's system redemption sheet through the appropriate StoreKit API. In-app redemption is optional, so document an external redemption path for customers on other supported configurations.

If Sandbox blocks another redemption, Apple recommends clearing that test account's purchase history and trying again. Treat this as troubleshooting, not as a way to prove production eligibility. Record the reset in the test evidence; otherwise, a changed account state can be mistaken for a code or app fix.

## Step 4: Generate and distribute production codes

Before generating one-time-use or custom codes, confirm both production gates:

- the app is **Ready for Distribution**;
- the associated In-App Purchase is **Approved**.

Production codes may take up to an hour to become redeemable. Generate them before the announced start, then run one controlled production check rather than discovering activation delay through customers. Use that check to verify the intended customer cohort, storefront, external redemption path, transaction delivery, and entitlement together; Sandbox alone doesn't establish those production conditions.

Keep code values separate from the campaign plan:

```text
Campaign record
- Offer reference and product ID
- Eligibility and storefronts
- Batch size, activation check, and expiry
- Placement or recipient allocation IDs
- Test evidence and support owner

Restricted code store
- Downloaded one-time-use codes
- Allocation ID to code mapping
- Access limited to the distributor
```

Don't paste one-time-use codes into release tasks, shared project notes, support tickets, or a bulk email. Track allocation IDs and status in the working plan while keeping redeemable values in restricted storage.

Distribution copy should state:

- what product the code unlocks;
- whether the offer is free or discounted;
- who is eligible;
- supported countries or regions;
- where to redeem it;
- when it expires or when the campaign may stop;
- what a consumable, permanent unlock, or fixed access period actually provides;
- where to get help.

One-time-use codes can be entered directly in the App Store. Custom codes use a redemption URL or your supported in-app flow. Test the exact URL, QR code, email, or in-app placement customers will receive.

## Step 5: Measure the campaign without mixing the funnel

Measure these events separately:

```text
Codes generated or custom-code capacity
→ codes distributed or placements published
→ successful redemptions
→ product granted correctly
→ product used
→ later full-price purchase, if relevant
```

Generating 500 codes doesn't mean 500 people received them. A redemption doesn't prove the product was used, and product use doesn't prove the campaign caused a later purchase.

Apple's [Summary Sales Report](https://developer.apple.com/help/app-store-connect/reference/reporting/summary-sales-report/) provides aggregated In-App Purchase units, product identifiers, customer price, proceeds, country or region, and other fields. For In-App Purchase offer codes, **Order Type** contains the offer reference name; for a custom offer code, **Promo Code** contains the custom code. Compare that Apple record with the campaign's dated distribution log and the app's own product-use evidence.

Use a closeout record:

```text
Offer reference:
Product and offer price:
Campaign period:

One-time codes distributed or custom placements:
Apple-reported units by offer reference:
Countries or regions:
Entitlement or support failures:
Observed product use:

Other campaigns or product changes:
Conclusion:
Decision: Repeat | change | stop | insufficient evidence
```

Deactivate a batch when its terms, audience, or placement are wrong. Apple says unredeemed codes expire immediately and don't return to the quarterly limit; already redeemed access isn't affected. Preserve the reason and support plan before deactivation.

## Where LaunchBuddy fits

App Store Connect remains authoritative for offers, eligibility, prices, codes, approval state, and reports. StoreKit remains responsible for the redemption flow and transaction delivery. LaunchBuddy doesn't create offer codes, store code batches, test StoreKit, or verify entitlements.

LaunchBuddy can organize the surrounding release work: offer configuration, sandbox cases, production gates, distribution handoff, support review, and campaign closeout. Release planning, taskboards, default submission checklists, and iCloud sync are available on the Free plan within its two-app and two-release limits. Custom reusable checklists and unlimited apps and releases require Pro.

Keep redeemable codes out of LaunchBuddy notes. Record only non-secret campaign references, batch counts, owners, evidence links, and decisions beside the relevant app and release.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy and keep your offer-code test and launch tasks with the release</a>.
