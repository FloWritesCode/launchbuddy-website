---
title: "How to Set In-App Purchase Availability by Country or Region"
description: "Set In-App Purchase availability in App Store Connect, separate it from app availability and review status, and verify each storefront with StoreKit."
pubDate: 2026-11-04
---

**To set In-App Purchase availability, open your app in App Store Connect, select In-App Purchases, open the product, and choose Set Up Availability. Select the countries or regions where it should be sold, or choose Remove from sale to submit it for review without releasing it. Then select Done.**

For a non-renewing subscription, use **Subscriptions → Non-Renewing Subscriptions → Manage** instead. Apple requires the Account Holder, an Admin, or an App Manager to change availability.

That setting is only one gate. A purchase is ready for a storefront when the app is available there, the product includes that country or region, App Review has approved it, and the shipped build can retrieve and sell the exact product through StoreKit. Treat those as separate records rather than using “availability” to mean all four.

## Set availability in App Store Connect

Apple's current [In-App Purchase availability instructions](https://developer.apple.com/help/app-store-connect/manage-in-app-purchases/set-availability-for-in-app-purchases) use this path:

1. In **Apps**, select the app.
2. In the sidebar, select **In-App Purchases**.
3. Open the intended product.
4. Under **Availability**, select **Set Up Availability**.
5. Select the countries or regions where customers should be able to buy it. For review without release, select **Remove from sale**.
6. Select **Done**.

To change the selection later, reopen the product and select **Edit** under Availability. Apple says additions and removals take effect immediately. That makes the control useful for a deliberate launch or removal, but it also means an accidental deselection isn't a harmless draft.

Record the selection before saving:

```text
App:
Reference name:
Product ID:
Purchase type:

Availability mode: Selected storefronts | Remove from sale
Selected countries or regions:
App available in the same storefronts: Yes | No | Mixed
Current IAP status:
StoreKit build and environment:
Changed by / at:
Verification owner:
```

One product-level record matters because an app can have several purchases with different regional plans. “The app is worldwide” doesn't prove that every purchase is.

## Separate the four availability gates

Use this operational model when a product is missing or shouldn't be sold yet:

| App availability | IAP country or region | IAP status | StoreKit evidence | Result |
| --- | --- | --- | --- | --- |
| Available | Selected | Approved | Product and purchase path verified | Ready for the tested storefront |
| Available | Not selected | Approved or in review | Any | Not for sale in that storefront |
| Not available | Selected | Approved | Any | App isn't available to new customers there |
| Available | Selected | Prepare for Submission, Ready for Review, Waiting for Review, or In Review | Any | Availability selection alone doesn't make it purchasable |
| Available | Remove from sale | Developer Removed from Sale after approval | Prior purchase evidence retained | No new sale; existing-customer access still needs correct entitlement handling |

The table is a diagnostic sequence, not a claim that App Store Connect can prove the final row automatically. Apple's [status reference](https://developer.apple.com/help/app-store-connect/reference/in-app-purchases-and-subscriptions/in-app-purchase-statuses/) says **Approved** requires country or region availability, yet Apple also warns that setting availability doesn't guarantee the product can be purchased.

For a status-by-status next action, use the [In-App Purchase status meanings guide](/blog/in-app-purchase-status-meanings/). It keeps App Store Connect product state separate from a customer's StoreKit entitlement.

## Coordinate app and product storefronts

App availability and In-App Purchase availability live in different controls. In both cases, Apple's [app availability guidance](https://developer.apple.com/help/app-store-connect/manage-your-apps-availability/manage-availability-for-your-app-on-the-app-store/) says the customer's Apple Account country or region determines the storefront. Use that account setting for the matrix, not the device language or the customer's physical location.

- **App availability:** **Pricing and Availability → App Availability**
- **IAP availability:** the individual product's **Availability** section

The practical sale area is their overlap. If the app is available in the US and Canada but the product is selected only for the US, don't label the product “North America.” Record US as available and Canada as an intentional exclusion or a mismatch to resolve.

Apple documents an option for an app to become available in future countries or regions added to the App Store. Its IAP availability instructions don't document an equivalent future-storefront choice. Don't copy the app-level assumption into a purchase record. Keep a separate product matrix and add a recheck when Apple adds a storefront or when your app's country selection changes.

| Product ID | App storefront | IAP selected | Status | Expected result | Verified |
| --- | --- | --- | --- | --- | --- |
| `pro.unlock` | United States | Yes | Approved | Product can be offered | Date, build, account |
| `pro.unlock` | Canada | No | Approved | Product isn't offered | Date, build, account |
| `coin.large` | Canada | Yes | In Review | Wait for approval | Status check |

This matrix also prevents a pricing change from being mistaken for an availability change. Pricing decides what the product costs; availability decides where it can be sold. Use the [IAP price-change guide](/blog/schedule-in-app-purchase-price-changes/) when the storefront is correct but the price or schedule isn't.

## Submit for review without putting the product on sale

Choose **Remove from sale** when the product needs App Review but shouldn't launch as soon as it is approved. Apple explicitly supports this review-without-release path.

Use this sequence:

1. Complete the product's required metadata, price, localization, and review information.
2. Set Availability to **Remove from sale**.
3. Put the product in the correct App Review submission.
4. Submit and monitor its status.
5. After approval, confirm **Developer Removed from Sale** rather than assuming the product is live.
6. At launch, edit availability, select the intended countries or regions, and verify each priority storefront.

This is especially useful when a build, marketing date, support plan, or regional requirement isn't ready. It isn't a scheduled launch feature: Apple's availability page describes immediate edits, not a future IAP availability date. Keep the launch action and its verifier as dated release tasks.

The [In-App Purchase review guide](/blog/submit-in-app-purchase-for-review/) covers first-of-type app-version dependencies, review screenshots, draft contents, and the final submission handoff.

## Verify selected and excluded storefronts in Sandbox

Don't verify a regional plan with one tester from one storefront. Apple's Sandbox accounts are each associated with an App Store country or region. In **Users and Access → Sandbox**, you can change a tester's region, save it, and sign in again on the device to apply the change.

If the tester belongs to a Sandbox Test Family, Apple requires every member to use the organizer's region. Remove the tester from that family before changing the account's country or region.

Use one positive and one negative case:

```text
Product ID:
App version / build:
Environment: Sandbox

Selected storefront:
Tester region:
Product retrieval result:
Displayed localized price:
Purchase and entitlement result:

Excluded storefront:
Tester region:
Product retrieval result:
Paywall behavior:

Tested by / at:
Evidence:
```

For the excluded storefront, the app should handle the observed StoreKit result without a dead purchase button, stale hard-coded price, or promise that the item is available. Record what StoreKit actually returns; don't infer product behavior from the App Store Connect checkbox alone.

Apple notes that product metadata changes can take up to one hour to appear in Sandbox. Preserve the product ID, tester region, time, and result before diagnosing a permanent defect. If the account itself is new, the [Sandbox Apple Account guide](/blog/create-sandbox-apple-account/) provides a reusable tester record.

## Remove a product from selected regions or from sale

For a regional withdrawal, edit Availability and deselect only the affected countries or regions. For a complete withdrawal, select **Remove from sale**.

Before either action, identify which customer promises survive the change. Apple's guidance says to:

- announce the planned removal and stop in-app merchandising at least 31 days beforehand so customers can use purchased consumables;
- end product promotions;
- notify Apple of the intended removal;
- consider customer communication when deselecting countries or regions.

Apple also says it may issue refunds for unfulfilled purchases. Existing customers retain access after a developer removes a product from sale, and those transactions remain available through StoreKit and the App Store Server API. Don't use sale removal as an entitlement-deletion signal.

Create a removal receipt:

```text
Product and affected storefronts:
Notice published:
Merchandising stopped:
Apple notified:
Availability changed:
Existing-customer access tested:
Restore or entitlement behavior tested:
Support owner:
Final verification:
```

Thirty-one days is a minimum step in Apple's IAP removal guidance, not a universal end date for every obligation. Durable non-consumables, unused consumables, subscriptions, refunds, local requirements, and your own promises can require different handling.

## Worked example: review now, launch in two regions later

Suppose an app is available in the US, Canada, and the UK. Version 4.0 introduces a non-consumable `studio.unlock`, but support and localized paywall copy are ready only for the US and Canada.

Before review, the developer sets the product to **Remove from sale**, submits it with the required app version, and records the review status. Approval produces a reviewed product that remains off sale.

On launch day, the developer selects the US and Canada for the product but leaves the UK unselected. The verification record then has three distinct outcomes:

- **US:** app available, product selected, Approved, positive Sandbox check;
- **Canada:** app available, product selected, Approved, positive Sandbox check;
- **UK:** app available, product not selected, intentional no-sale behavior verified.

The UK isn't described as “coming soon” unless there is an owned localization, support, StoreKit, and availability task. When those gates pass, the developer adds the UK and repeats the storefront check.

## Keep the availability decision with the release

App Store Connect remains authoritative for the product's countries or regions, review status, and sale state. StoreKit remains the place to verify product retrieval, purchases, and entitlements. LaunchBuddy doesn't configure an In-App Purchase, change its availability, inspect StoreKit, or certify a storefront.

LaunchBuddy can keep the product matrix, review-without-sale decision, Sandbox evidence, launch action, and removal checks beside the relevant app and release. Release taskboards and default App Store submission checklists are available on the Free plan within its two-app and two-release limits. Custom reusable checklists and unlimited apps and releases require Pro.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy and keep your next In-App Purchase availability rollout attached to its release plan</a>.
