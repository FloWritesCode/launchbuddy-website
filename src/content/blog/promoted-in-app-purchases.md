---
title: "Promoted In-App Purchases: Setup and Launch Checklist"
description: "Set up a promoted In-App Purchase with metadata, PurchaseIntent handling, App Review approval, audience rules, testing, and storefront verification."
pubDate: 2026-10-26
---

**To promote an In-App Purchase, make the outside-the-app purchase path work, upload approved promotional artwork, select the purchase in App Store Connect, set its audience and order, then verify the live product page.** Promotion is a merchandising placement, not a discount. It can surface an existing purchase on your App Store product page and elsewhere, but it doesn't change the product's price.

Apple lets an app promote up to 20 In-App Purchases at a time. A customer can start one from the App Store before installing the app; after installation, the app must receive that purchase intent and continue the transaction. That handoff is the part to prove before treating the App Store Connect checkbox as launch-ready.

## Know what a promoted In-App Purchase changes

A promoted In-App Purchase can appear on the app's product page, may appear in search, and may be featured on the Today, Games, or Apps tabs. Apple notes that consumables don't appear in search results. Placement beyond the product page isn't promised, so “promoted” should never be recorded as “featured.”

The promotion uses the purchase's localized display name and description plus one promotional image. It doesn't:

- create or approve the In-App Purchase;
- add a temporary or introductory price;
- bypass StoreKit transaction handling;
- guarantee search placement, featuring, downloads, or purchases;
- make an unavailable product purchasable in a storefront.

If the product model is still unsettled, choose among consumable, non-consumable, auto-renewable, and non-renewing products with the [In-App Purchase types guide](/blog/in-app-purchase-types/) before designing the promotion.

## Create a promotion contract before editing App Store Connect

Write one short record that connects the promise on the App Store to the product the app will deliver:

```text
Product ID:
Purchase type:
Customer receives:

Display name:
Description:
Promotional image:

Audience: All App Store users | Device-specific conditions
Default product-page order:
Products that should never appear beside it:

Supported app version:
PurchaseIntent implementation:
Test environment and evidence:

App Review status:
Launch verification owner and time:
Measurement question:
```

This catches three expensive mismatches early: artwork for one product ID while the app buys another, copy that implies a discount the price doesn't provide, and a public promotion for a transaction path the released app can't complete.

For example, suppose a drawing app promotes a permanent brush pack. The contract should say **non-consumable**, name the exact brush set, and point to the same product ID requested by the app. “Limited-time brushes” would be misleading if the purchase is permanent, while “50% off” would be wrong unless a separate live price schedule actually supports it.

## Step 1: Implement the App Store-to-app purchase handoff

Apple's current [`PurchaseIntent` documentation](https://developer.apple.com/documentation/storekit/purchaseintent) requires an app promoting In-App Purchases to handle purchases that customers initiate outside the app. For StoreKit 2, listen to `PurchaseIntent.intents`, identify the product carried by the intent, and continue the purchase with that product.

There are two supported implementation generations:

- `PurchaseIntent`, available starting in iOS 16.4;
- the `SKPaymentTransactionObserver` promoted-payment delegate path, available starting in iOS 11.

Apple explicitly says not to use both at the same time. If the deployment range crosses that boundary, separate the paths with availability handling and test each supported OS branch.

The promotion itself is an iOS App Store feature for devices running iOS 11 or later. Apple's documentation also says promoted purchases don't emit `PurchaseIntent` in Mac Catalyst apps and aren't available to compatible iPhone or iPad apps running in visionOS.

Keep the continuation short. The customer already selected a product on the App Store, so don't send them through an unrelated home screen or generic paywall first. The app still needs to handle cancellation, pending and failed outcomes, verify the resulting transaction, grant the correct entitlement or consumable quantity once, and finish the transaction at the appropriate point.

## Step 2: Test a purchase intent before creating the placement

Starting with Xcode 15.2, Apple's StoreKit transaction manager can send a purchase intent to an app using StoreKit Testing. Apple's [StoreKit testing walkthrough](https://developer.apple.com/videos/play/wwdc2024/10061/) shows the sequence: select the configured product, choose **Purchase Intent** as the purchase type, and send it to the running test device or simulator.

Use that local test to prove:

1. the app receives the intent on a cold and warm launch;
2. the intent identifies the expected product;
3. the purchase sheet or intentional product UI appears without a dead end;
4. cancel, pending, success, and failure paths leave understandable state;
5. a successful verified transaction grants the product exactly once;
6. relaunching doesn't duplicate a consumable grant or lose a durable entitlement.

Then test the product against Apple's Sandbox so the App Store Connect identifier, localization, price, availability, and transaction path are exercised against Apple's test infrastructure. StoreKit Testing and Sandbox establish different facts; the [StoreKit Testing vs Sandbox guide](/blog/storekit-testing-vs-sandbox/) explains how to preserve that distinction.

Save two receipts rather than one “IAP tested” check:

```text
Intent receipt
- App version/build and OS
- Product ID sent by Xcode
- Cold/warm launch
- Observed continuation

Transaction receipt
- Environment and storefront
- Product returned
- Purchase result
- Verified entitlement or quantity
- Relaunch result
```

The first proves the outside-app handoff. The second proves product delivery. A successful ordinary purchase from an in-app paywall doesn't prove the first.

## Step 3: Prepare public metadata and unique artwork

Apple's [In-App Purchase information reference](https://developer.apple.com/help/app-store-connect/reference/in-app-purchases-and-subscriptions/in-app-purchase-information/) currently limits the localized display name to 30 characters and the description to 45. Both need to describe the purchased item, not the whole app.

The promotional image has a different job from the App Review screenshot:

| Asset | Audience | Purpose |
| --- | --- | --- |
| **Promotional image** | Customers on the App Store | Represents this specific purchase |
| **App Review screenshot** | Apple reviewers only | Shows where and how the item or service appears in the app |

Apple requires the promotional image to be:

- JPG or PNG;
- exactly 1024 × 1024 pixels;
- 72 dpi, RGB, and flattened;
- supplied without rounded corners.

Use unique artwork that still reads at a small size. Apple's merchandising guidance says it shouldn't be a screenshot or be confused with the app icon. Apple adds its own framing and may show the app icon in the lower-left corner, so keep important detail away from that area. Avoid overlaid text; one image represents the purchase in every country or region where it is available, while the display name and description can be localized.

Run this consistency check before upload:

| Surface | Must describe the same thing |
| --- | --- |
| Promotional image | The purchased content or benefit |
| Display name and description | The exact customer promise |
| StoreKit product ID | The product selected by the intent |
| In-app purchase UI | Price, duration, and entitlement |
| App Review screenshot and notes | How Apple can find and test it |

## Step 4: Get the purchase and promotion metadata approved

The In-App Purchase and its metadata must pass App Review before the promotion can appear. Upload the promotional image on the product record, complete the localization and Review Information, then send the correct review packet.

Don't confuse these states:

- uploading artwork doesn't submit it;
- adding a product to a draft doesn't send that draft to review;
- an approved product isn't necessarily available in every intended storefront;
- selecting a product for promotion doesn't override a pending metadata review.

Apple's first-of-type and submission rules still apply. Use the [In-App Purchase review guide](/blog/submit-in-app-purchase-for-review/) to decide whether the purchase must travel with a new app version and to verify the post-submission status.

## Step 5: Choose the audience and default order

In App Store Connect, open the app and then the In-App Purchase. Non-renewing subscriptions are managed from their separate section under Subscriptions. Apple's [promotion setup instructions](https://developer.apple.com/help/app-store-connect/configure-in-app-purchase-settings/promote-in-app-purchases/) place the control in the product's App Store image area: choose **Promote on the App Store**, then set the audience.

Apple provides two audience models:

1. **All App Store users**, including people who haven't installed the app.
2. **Only users who meet conditions in the app**, using device-specific promotion information.

Use the first when the product makes sense to a new customer and the released app can immediately complete its purchase intent. Use the second when app state matters, such as hiding an item already owned on that device or ordering game content by a player's progress.

Device-specific conditions aren't an account-wide segmentation system. Apple says a customer must have opened the app at least once on that device before the App Store can use order and visibility settings written by the app. Define a safe default for a new device, and don't infer cross-device ownership from that merchandising control.

Finally, select the products marked **Promoted**, drag them into the intended default order, and save. Treat the 20-item allowance as a ceiling, not a target. The first few items should answer a clear customer question; a crowded list of near-identical packs makes the choice harder.

## Step 6: Verify the live placement

Apple says promotion changes can take up to 24 hours to appear. Also, a product may remain absent when the app isn't available or the purchase is still pending approval, even if App Store Connect lets you select it for promotion.

After the expected propagation window, verify from a clean checklist:

```text
App and storefront:
Device / iOS version:
App previously opened on device: Yes | No
App currently installed: Yes | No

Expected promoted products and order:
Observed product-page products and order:
Display name, description, image, and price correct:

Tap result:
Download prompt, if app absent:
PurchaseIntent received:
Transaction and entitlement result:

Checked at:
Evidence:
Follow-up:
```

Run at least one absent-app navigation path for an all-users promotion and one installed-app path. Stop before authorizing a production charge unless you have a controlled purchase, refund, and entitlement-cleanup plan; use Sandbox for repeatable end-to-end transaction tests. If using device-specific visibility, add eligible and ineligible app states on the same test device. Check a priority storefront separately; one storefront view doesn't prove every product is available everywhere.

When something is missing, diagnose one boundary at a time:

1. **Placement:** Is the intended product selected and ordered under Promoted?
2. **Review:** Are the product and current metadata approved?
3. **Availability:** Are the app and product available in this storefront?
4. **Propagation:** Has Apple's stated 24-hour window elapsed?
5. **Device state:** For conditional visibility, has the app written settings after being opened on this device?
6. **Handoff:** Does the released app version handle the incoming purchase intent?

Changing artwork, audience, order, and code together destroys the evidence needed to tell which boundary failed.

## Measure one question without claiming placement

Choose a question before launch, such as: “After placing the permanent brush pack first, did completed purchases of that product change without an increase in purchase-related support failures?”

Record the promotion start, order, app version, price schedule, storefront scope, and other campaigns. Compare complete periods in Apple's product-level sales reporting, keeping units, sales, proceeds, and refunds separate. A changed purchase count doesn't prove the promotion caused it; search exposure, featuring, release traffic, price, seasonality, and other merchandising can move at the same time.

LaunchBuddy doesn't create In-App Purchases, implement StoreKit, upload promotional images, control App Store placement, or verify entitlements. Its role is to keep the promotion contract, implementation task, review gate, launch receipt, and follow-up decision with the release.

Release taskboards, default submission checklists, and iCloud sync are available on the Free plan within its two-app and two-release limits. Custom reusable checklists and unlimited apps and releases require Pro. With credentials, LaunchBuddy Pro can show selected App Store Connect analytics, but Apple's product-level records remain the authority for this purchase.

Use the [App Store Connect analytics guide](/blog/app-store-connect-analytics/) to choose a fair comparison window, then close the promotion task with evidence rather than a visibility assumption.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy and keep your next promoted In-App Purchase launch checklist with the release</a>.
