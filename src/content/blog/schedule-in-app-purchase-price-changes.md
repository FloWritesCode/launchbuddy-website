---
title: "How to Schedule In-App Purchase Price Changes"
description: "Schedule global, temporary, or custom In-App Purchase price changes in App Store Connect, then verify storefront prices and StoreKit display."
pubDate: 2026-09-26
---

**To schedule an In-App Purchase price change, open the app in App Store Connect, select Monetization → In-App Purchases, open the product, and select the add button next to Price Schedule. Choose Global, Temporary, or Custom Price Change, set the dates and storefront prices, review the complete schedule, and confirm.**

The required role is Account Holder, Admin, or App Manager. That path applies to consumables and non-consumables. For a non-renewing subscription, open **Subscriptions**, scroll to **Non-Renewing Subscriptions**, select **Manage**, and then open the product.

Auto-renewable subscriptions use a separate pricing workflow with subscriber price-preservation, notice, and consent rules; use the [subscription price increase guide](/blog/app-store-subscription-price-increase/) for those products. To change the app's upfront purchase price instead, follow the [paid-app price schedule guide](/blog/app-store-price-change-schedule/).

The interface is only one part of the change. A safe rollout records each product's current schedule, identifies who will maintain local prices, verifies what StoreKit returns, and measures the intended In-App Purchase rather than the app's total revenue.

## Choose global, temporary, or custom pricing

Apple's three options differ mainly in duration and future price ownership:

| Change type | Choose it when | What you take responsibility for |
| --- | --- | --- |
| **Global** | The product needs a permanent new base price | Apple provides comparable prices for the other 174 storefronts and may adjust those automatically managed prices later for tax and foreign-exchange changes |
| **Temporary** | A promotion needs fixed start and end dates in selected storefronts | Prices in the selected storefronts aren't automatically adjusted during the scheduled period |
| **Custom: selected storefronts** | A few markets need deliberate local prices | Those storefronts become manually managed after the change takes effect |
| **Custom: all storefronts** | You intend to maintain every local price | Apple no longer adjusts any of the 175 storefront prices for tax or foreign-exchange changes |

Global is the simplest default when one base price should drive the worldwide schedule. Temporary pricing fits a time-boxed promotion. Custom pricing is a continuing maintenance decision, not merely a way to fine-tune today's conversion.

Apple's current [In-App Purchase price-change documentation](https://developer.apple.com/help/app-store-connect/manage-in-app-purchases/schedule-price-changes-for-in-app-purchases/) is the authority if the interface or rules change.

## Create one change record per product

An app can have several products with different identifiers, types, schedules, and availability. Don't use an app-level note such as “IAP sale starts Friday.” Build a record for each product you intend to change:

```text
App:
Reference name:
Product ID:
Type: Consumable | Non-consumable | Non-renewing subscription

Current base country or region:
Current base price:
Existing future changes:

Change type: Global | Temporary | Custom selected | Custom all
Start date:
End date, if temporary:
Selected storefronts:
New base or reference price:
Manual local prices:

Customer-facing price copy to update:
StoreKit display check:
Verification owner and time:
Measurement window:
Other releases, offers, or campaigns:
```

Capture the active and upcoming Price Schedule before editing it. If several products form one customer offer, repeat the record for every affected product ID; a consistent paywall does not prove that each App Store Connect schedule matches.

Also check the product's tax category and estimated proceeds before treating the customer price as the amount you will receive. Apple calculates proceeds after applicable taxes and commission. Its [IAP tax-category documentation](https://developer.apple.com/help/app-store-connect/configure-in-app-purchase-settings/set-a-tax-category-for-in-app-purchases/) confirms that a product inherits the app's category by default but can be managed separately.

If the product isn't approved yet, keep pricing and review readiness as separate gates. The [In-App Purchase review guide](/blog/submit-in-app-purchase-for-review/) covers first-of-type dependencies, review screenshots, submission drafts, and status verification.

## Schedule a global In-App Purchase price change

Use a global change for a permanent price based on the product's base country or region.

1. In App Store Connect, select **Apps**, then choose the app.
2. Under **Monetization**, select **In-App Purchases** and open the product.
3. Next to **Price Schedule**, select the add button.
4. Choose **Global Price Change**, then select **Next**.
5. Choose an effective date.
6. Select the new price for the base country or region.
7. Review the comparable prices Apple provides for every other storefront.
8. Select **Confirm**.

Apple allows an effective date from today through the end of the next calendar year. It doesn't automatically change the base-country price later. It may periodically adjust automatically managed prices elsewhere as taxes and foreign-exchange rates change.

Review priority storefronts and estimated proceeds before confirming. A comparable price accounts for more than direct currency conversion, so don't calculate local customer prices by multiplying the base amount by an exchange rate.

## Schedule a temporary IAP price change

Use a temporary change when the old price should return automatically.

1. Open the product and add a change under **Price Schedule**.
2. Choose **Temporary Price Change**.
3. Set start and end dates.
4. Select the countries or regions where the temporary price applies.
5. Choose a reference country or region and price.
6. Review Apple's proposed prices and make any deliberate local adjustments.
7. Review the full temporary schedule, including the return date, and confirm.

The start can be scheduled from today through the end of the next calendar year, and a temporary change can last no longer than one year.

Pay special attention when the selection includes the product's base country or region. Apple says it won't make automatic adjustments to that IAP's pricing in any of the 175 storefronts during the selected period. Record that pause and the return price rather than treating the promotion as an isolated discount.

For a promotion, the operational plan needs two verification events: one after the temporary price begins and another after the previous price should return.

## Schedule a custom IAP price change

Start both custom paths by adding a **Custom Price Change** and setting its effective date. Then choose the maintenance boundary:

- **Specific countries or regions:** Select the intended storefronts; the product's base country or region isn't available in this branch. Choose one selected storefront and price as the reference, review the proposed prices for the others, make deliberate adjustments, and confirm.
- **All countries or regions:** Choose a base-country price even if it remains unchanged. Set the other local prices you intend to change, inspect the current prices that will remain elsewhere, and confirm the complete schedule.

Once the selected-storefront change takes effect, Apple stops automatically adjusting prices in those markets. Choosing all storefronts transfers future tax and foreign-exchange price maintenance for all 175 to you. Add an owner and a recurring review trigger to the change record. To return the complete map to Apple's automatically adjusted comparable pricing later, create a Global Price Change.

## Keep the in-app price display tied to StoreKit

The schedule is only half of the workflow. The purchase screen must present the current storefront price.

StoreKit's [`Product.displayPrice`](https://developer.apple.com/documentation/storekit/product/displayprice) is Apple's localized price string for display, based on the storefront connected to the device. Use that value for the product price instead of hard-coding a currency symbol or copying a price from one storefront. If you calculate with the price, use `Product.price` and its price format style rather than parsing the display string.

Before the effective date, verify:

- the app requests the intended product ID;
- the purchase screen uses StoreKit pricing rather than static copy;
- surrounding promotional text doesn't promise one currency or price worldwide;
- the old, promotional, and return states all fit the layout;
- support and campaign copy name the correct dates and storefront scope.

Use Sandbox to test product retrieval and purchase behavior without a real charge. Apple's [Sandbox overview](https://developer.apple.com/help/app-store-connect/test-in-app-purchases/overview-of-testing-in-sandbox/) lets one test account switch among App Store storefronts. Apple also notes that product metadata changes can take up to one hour to appear there, so an immediate mismatch isn't enough to diagnose an implementation defect.

Sandbox can verify product retrieval and the purchase path against App Store infrastructure. It doesn't prove that a future production price is already live.

## Verify the price after regional start times

App Store price changes don't begin everywhere at one universal midnight. Apple's [regional start-time reference](https://developer.apple.com/help/app-store-connect/reference/pricing-and-availability/app-store-pricing-and-availability-start-times-by-country-or-region/) shows the schedule in the browser's timezone and UTC.

If the selected time has already passed in some regions when you schedule the change, Apple says it takes effect there immediately but may require up to 24 hours to display for all users.

Use a storefront verification table:

| Product ID | Storefront | Expected price | Regional start | App Store Connect | StoreKit display | Checked at |
| --- | --- | --- | --- | --- | --- | --- |
| Product A | Base | Price | Date/time | Price | Price | Date/time |
| Product A | Priority market 1 | Price | Date/time | Price | Price | Date/time |
| Product A | Priority market 2 | Price | Date/time | Price | Price | Date/time |

After each relevant start time:

1. Reopen the product's Price Schedule and compare it with the saved record.
2. Request current product information in the app and inspect the localized StoreKit display price.
3. Check priority storefronts separately; one market doesn't prove the worldwide schedule.
4. Record the storefront, account state, device, time, expected price, and observed price.
5. Check customer-facing campaign and support copy.
6. For temporary pricing, repeat the checks after the end date.

Investigate a mismatch from evidence, not repeated edits. First confirm the product ID, storefront, regional effective time, and whether Apple's documented display window has elapsed.

## Worked example: discount one product in a three-product paywall

Suppose an app sells three consumable packs. The developer wants to discount only the largest pack for one month in the US, Canada, and the UK.

The promotion needs one **Temporary Price Change** on the largest pack's product ID. The other two products keep their current schedules. Before confirming, the developer records all three products in one paywall matrix:

| Paywall position | Product ID | Changed? | Start and end check | StoreKit check |
| --- | --- | --- | --- | --- |
| Small pack | Product A | No | Confirm unchanged | Current localized price |
| Medium pack | Product B | No | Confirm unchanged | Current localized price |
| Large pack | Product C | Yes, three storefronts | Verify promotion and return | Promotional, then regular price |

This catches a problem an app-level calendar entry would miss: the campaign can name the right dates while the paywall requests the wrong product or shows stale static copy. The rollout therefore has two receipts. The App Store Connect receipt proves Product C has the intended schedule; the StoreKit receipt records what the app displays for Products A, B, and C in each campaign storefront.

After the promotion, compare Product C's purchases, sales, proceeds, and refunds with complete prior periods. Keep Products A and B visible as context because customers may choose among the three products, but don't combine all IAP revenue and call it the result of Product C's price.

## Measure the product-level result

Price, purchase count, sales, and proceeds answer different questions. Apple's [Sales and Trends definitions](https://developer.apple.com/help/app-store-connect/measure-app-performance/view-units-proceeds-sales-and-pre-orders/) say the In-App Purchases metric includes purchases of all IAP types but excludes restored purchases. Sales are amounts billed to customers; proceeds are estimates after applicable taxes and Apple's commission.

Write the comparison before reading the result:

```text
Question:
Did the price change improve proceeds for this product without an unacceptable drop in purchases?

Product ID:
Storefronts:
Baseline period:
Follow-up period:

Read together:
In-App Purchases | Sales | Proceeds | Refunds

Other changes:
App release | placement | campaign | availability | seasonality

Decision:
Keep | investigate | schedule another change | insufficient evidence
```

Filter to the intended product and territories. Use complete comparable periods, keep raw purchase counts beside percentage changes, and wait until all target storefronts have entered the follow-up window. A revenue increase doesn't show whether more customers bought the product or fewer customers paid a higher price.

The [App Store Connect analytics guide](/blog/app-store-connect-analytics/) explains how to choose fair comparison periods and separate correlation from a supported conclusion.

## Where LaunchBuddy fits

App Store Connect remains the authority for IAP prices, base-country settings, schedules, storefronts, tax configuration, and Sales and Trends. StoreKit remains the source for the localized price displayed in the app.

LaunchBuddy doesn't create an In-App Purchase, schedule its price, update StoreKit code, or verify a live storefront. Use its release taskboards and project notes to keep the product-level change record, StoreKit check, regional verification, and measurement date beside the relevant app or release. Those planning features work on iPhone, iPad, and Mac; the Free plan is limited to two apps, two releases, and limited project notes.

With valid App Store Connect API credentials, LaunchBuddy Pro can show selected downloads, revenue, and subscription metrics. Use Apple's product and territory reports for the detailed IAP decision rather than assuming a summary metric verifies one product's price.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy and keep the checks around your next In-App Purchase price change with the release plan</a>.
