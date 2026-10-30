---
title: "Create a Non-Renewing Subscription in App Store Connect"
description: "Create, price, localize, test, and submit a non-renewing subscription while keeping its app-managed duration and entitlement logic correct."
pubDate: 2026-10-30
---

**To create a non-renewing subscription in App Store Connect, open Apps → your app → Subscriptions, scroll to Non-Renewing Subscriptions, select Manage, then add a product with a reference name and product ID. Set its price, availability, localization, and review information before testing the exact product in Sandbox and submitting it for review.**

The important catch is that App Store Connect has no duration field for this product type. A non-renewing subscription provides access for a limited period and never renews automatically, but your app must calculate when access ends. Creating the product is therefore only half the job.

## Confirm that non-renewing is the right product type

Choose a non-renewing subscription when all three statements are true:

1. Access lasts for a fixed period.
2. The customer must not be charged again automatically.
3. Continued access requires another deliberate purchase.

A 30-day conference archive pass is a reasonable example. A permanent unlock is a non-consumable, while an ongoing service that should bill until canceled is an auto-renewable subscription. The [In-App Purchase types guide](/blog/in-app-purchase-types/) compares all four types before you commit to one.

Don't choose non-renewing merely to avoid subscription-group setup. It transfers important work to the app: duration, expiration, repurchase behavior, cross-device access, and customer support all need explicit rules.

Write those rules before creating an immutable identifier:

```text
Customer promise:
Access starts:
Access duration:
Access ends:

If purchased again while active:
If purchased again after expiry:
Cross-device behavior:
Refund or revocation behavior:

Reference name:
Product ID:
Price and storefronts:
```

Apple's StoreKit team states that non-renewing subscriptions have **no inherent expiration**. The duration belongs in your product policy and implementation, not in an App Store Connect setting.

## 1. Complete the paid-content prerequisites

The Account Holder must accept the current Paid Apps Agreement and complete the required banking and tax information. Apple says that agreement must be active even for Sandbox testing.

Also verify that:

- the app's bundle identifier and signing configuration are correct;
- the In-App Purchase capability is included;
- the product identifier planned in code is final;
- the customer-facing duration is settled;
- the release has an owner for implementation, testing, and review.

This is the last inexpensive point to change the product model. Apple doesn't let you edit the product ID or purchase type after saving the product, and a deleted product ID can't be reused for another In-App Purchase in the same app.

## 2. Create the product in App Store Connect

Apple's current [non-renewing subscription instructions](https://developer.apple.com/help/app-store-connect/manage-subscriptions/create-non-renewing-subscriptions) use this path:

1. In **Apps**, select the app.
2. Under **Monetization**, select **Subscriptions**.
3. Scroll to **Non-Renewing Subscriptions** and select **Manage**.
4. Select the add button.
5. Enter a **Reference Name** and **Product ID**.
6. Select **Create**.

The reference name is an internal label used in App Store Connect and reports. Make it recognizable to the team, such as `Conference Archive — 30 Days`.

The product ID is the identifier the app requests through StoreKit. Use a durable value such as `com.example.archive.30days`, then compare it character for character with the identifier in the submitted build. Avoid putting a price or calendar year in the ID unless that distinction is permanently part of the product.

Creating “30 days” in the reference name or product ID doesn't make StoreKit enforce 30 days. Those labels document the promise; the app still owns the clock.

## 3. Set price, availability, and localization

Open the new product and finish its commercial metadata.

### Add the price

Under **Price Schedule**, add pricing and choose a base country or region. Apple generates comparable prices for other storefronts, which you can review or replace with deliberate local prices.

Use StoreKit's localized price in the purchase UI rather than hard-coding one currency. If the price will change later, the [In-App Purchase price-change guide](/blog/schedule-in-app-purchase-price-changes/) covers global, temporary, and custom schedules.

### Choose availability

Select the countries or regions where the product should be offered. Product availability, app availability, review approval, and StoreKit retrieval are separate gates. A selected storefront doesn't make an incomplete or unapproved product purchasable.

### Add at least one localization

Add a display name and description that state the fixed access period and avoid renewal language. For example:

```text
Display name: 30-Day Archive Pass
Description: Access the complete conference archive for 30 days.
```

Don't use “monthly subscription” if customers could reasonably read that as recurring monthly billing. State that the purchase doesn't renew automatically in the paywall and confirmation context, while keeping the copy concise and consistent with the app's actual behavior.

## 4. Implement an app-owned entitlement clock

The purchase transaction proves that a purchase occurred. Your code decides whether the fixed-duration entitlement is still active.

For a simple 30-day product, the model is:

```text
verified transaction purchase date
             +
app-defined 30-day duration
             =
entitlement expiration
```

Apple's [proactive restore guidance](https://developer.apple.com/videos/play/wwdc2022/110404/) demonstrates reading verified StoreKit transactions and adding the intended duration to the transaction's purchase date. It also shows why checking transaction history alone isn't enough: an old non-renewing purchase can exist after access has expired.

Decide these edge cases before writing the paywall:

- **Calendar math:** Does “one month” mean one calendar month or a fixed number of days? Implement the same promise shown to the customer.
- **Early repurchase:** Does a second purchase extend from the current expiration or restart from its purchase date? Prevent a customer from losing already-paid time.
- **Multiple devices:** Recompute access from verified purchase history or a properly maintained account record instead of relying on a device-only Boolean.
- **Reinstall:** Reconstruct the entitlement from trusted transaction data and your duration rule.
- **Refund or revocation:** Remove access according to verified current transaction state and the product's documented policy.
- **Clock changes:** Don't make an easily manipulated device clock the only authority for valuable server-backed access.

StoreKit 2 makes transaction information available on launch and supports proactive restoration. `AppStore.sync()` is for an explicit user-initiated restore action when transaction information appears incomplete; Apple notes that it presents an authentication prompt and isn't needed for routine launches.

## 5. Test the duration, not just the purchase sheet

Use StoreKit Testing in Xcode for fast local scenarios, then use Sandbox to test the App Store-configured product without a real charge. For device testing with a Sandbox Apple Account, Apple's [Sandbox documentation](https://developer.apple.com/help/app-store-connect/test-in-app-purchases/overview-of-testing-in-sandbox/) calls for an active Paid Apps Agreement and a development-signed app on a device with Developer Mode enabled.

Apple warns that product metadata changes can take up to one hour to appear in Sandbox. Record the product ID, environment, and time before diagnosing an immediate miss as a code defect.

Run this matrix against the exact release candidate:

| Scenario | Evidence to record |
| --- | --- |
| First purchase | Verified transaction, calculated start and expiration, content unlocked |
| Relaunch while active | Access restored without another charge |
| Relaunch after expiry | Content locked and a clear repurchase path shown |
| Purchase again while active | Documented extension rule applied without losing paid time |
| Purchase after expiry | New entitlement window starts according to policy |
| Reinstall or second device | Entitlement reconstructed from trusted purchase history |
| Interrupted purchase | Access remains locked until a verified transaction completes |
| Refund or revocation | Access and support state follow the verified result |
| Different storefront | Correct product and localized StoreKit price appear |

A successful purchase sheet proves only that the transaction path worked. It doesn't prove expiration, repurchase, restoration, or customer messaging.

## 6. Prepare the review information

In the product's **Review Information** section, upload an App Review screenshot that clearly shows the offered service or content. Add notes that tell the reviewer:

- where the purchase appears;
- which product to select;
- the promised duration;
- what unlocks after purchase;
- how to confirm access;
- what happens when the period ends;
- any required demo account or navigation.

The review screenshot is private review evidence, not the promotional image displayed on the App Store. Use the submitted build's real purchase path rather than an unrelated home screen.

## 7. Submit the first product with the correct packet

Apple requires the first non-renewing subscription for an app to be submitted with a new app version. This rule applies to the first product **of that In-App Purchase type**, even if the app already has another approved purchase type.

Open the product, select **Add for Review**, and add it to a draft containing the required app version. Inspect the version, build, product ID, screenshot, notes, and other draft items before selecting **Submit for Review**.

After Apple approves the app's first non-renewing subscription, later products of that type can be submitted without a new version when the app already has an approved version. The [In-App Purchase review guide](/blog/submit-in-app-purchase-for-review/) covers the complete packet and status checks.

Don't close the task at **Ready for Review**. That status means the item is staged in a draft. Verify **Waiting for Review** or a later state in App Store Connect to prove Apple received it.

## Keep the two clocks in one release record

A useful non-renewing subscription record tracks two clocks:

1. **The commerce clock:** price schedule, storefront availability, review, and sale state in App Store Connect.
2. **The entitlement clock:** purchase date, app-defined duration, extension rule, expiration, and revocation behavior in the app.

Testing one clock doesn't verify the other. A product can be approved and still calculate access incorrectly; entitlement code can pass locally while the App Store product remains unavailable.

LaunchBuddy can keep the product decision, implementation tasks, Sandbox matrix, review packet, and verification receipt attached to the relevant app and release. Release planning, taskboards, and default submission checklists are available on the Free plan within its two-app and two-release limits; Pro adds unlimited apps and releases plus custom reusable checklists.

LaunchBuddy doesn't create the product, configure its price, store test credentials, inspect StoreKit transactions, calculate customer entitlements, or submit the review packet. Keep App Store Connect and verified StoreKit data authoritative, and use the release plan to make every handoff visible.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy and keep your non-renewing subscription checks with the release that ships them</a>.
