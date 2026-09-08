---
title: "App Store Price Change Schedule: A Step-by-Step Guide"
description: "Schedule a paid app price change in App Store Connect, choose global, temporary, or custom pricing, and verify every affected storefront."
pubDate: 2026-09-08
---

**To schedule a paid app price change, open the app in App Store Connect, choose Monetization → Pricing and Availability, select the add button next to Price Schedule, and choose Global, Temporary, or Custom Price Change. Set the effective date and prices, review every affected storefront, then confirm.**

Apple requires the latest Paid Apps Agreement to be accepted and the app to have been submitted for review before you can schedule a change. The Account Holder, an Admin, or an App Manager can perform the pricing workflow.

This guide covers the app's upfront purchase price. In-App Purchases and auto-renewable subscriptions have separate price schedules and rules.

## Choose the right type of price change

These options determine who controls future local price adjustments: Apple or you.

| Price change | Use it when | What happens afterward |
| --- | --- | --- |
| **Global** | You want to change the price in your base country or region and keep Apple's comparable-pricing model | Apple generates prices for the other 174 storefronts and may periodically adjust those automatically managed prices for tax and foreign-exchange changes |
| **Temporary** | A promotion needs explicit start and end dates in selected storefronts | The promotional price ends after no more than one year and returns to the previously set price |
| **Custom: selected storefronts** | Specific local markets need manually chosen prices | Those storefronts become manually managed; Apple stops making automatic tax and foreign-exchange price adjustments there |
| **Custom: all storefronts** | You intend to own every local price | All 175 storefronts become manually managed, including storefronts whose price you leave unchanged |

Choose **Global** unless you have a clear reason to own local pricing or need a time-boxed promotion. Custom pricing creates an ongoing maintenance obligation; it isn't just a more precise global change.

Before confirming any option, read Apple's current [Schedule price changes for apps](https://developer.apple.com/help/app-store-connect/manage-app-pricing/schedule-price-changes-for-apps/) instructions. App Store Connect remains the source of truth if its interface or rules change.

## Record the decision before opening App Store Connect

A price schedule needs more context than “change to $X.” Use a short change record:

```text
App:
Current base country or region:
Current base price:

Change type: Global / Temporary / Custom selected / Custom all
Business reason:
Effective date:
End date, if temporary:
Affected storefronts:
New base or reference price:
Local overrides:

Apple-managed after the change:
Manually managed after the change:
Tax category checked:
Estimated proceeds checked:

Customer communication:
Verification owner:
Measurement window:
Confounding releases, campaigns, or metadata changes:
```

The two ownership lines catch the easiest mistake to miss: selecting a local price can change who is responsible for future tax and currency maintenance.

Also capture the current Price Schedule before editing it. A screenshot or written export of the base country, active prices, manual overrides, and future changes gives you a known starting point. This is especially important if another scheduled change already exists.

## How to schedule a global app price change

A global change starts with your base country or region. Apple uses the selected base price to provide comparable prices across the other storefronts.

1. In App Store Connect, select **Apps**, then choose the app.
2. Under **Monetization**, open **Pricing and Availability**.
3. Next to **Price Schedule**, select the add button.
4. Choose **Global Price Change**, then select **Next**.
5. Choose an effective date.
6. Select the new price for the base country or region.
7. Review the generated prices for every country or region.
8. Select **Confirm**.

Apple allows an effective date from today through the end of the next calendar year. The base-country price isn't automatically changed later for tax or foreign-exchange movements. Apple may periodically update automatically managed prices elsewhere and says it will notify you in advance.

Don't confirm based only on the familiar base price. Review important storefronts and estimated proceeds too. Apple's [app pricing setup guide](https://developer.apple.com/help/app-store-connect/manage-app-pricing/set-a-price) explains that comparable prices account for foreign exchange, certain taxes, and common local pricing conventions; “comparable” doesn't mean a direct currency conversion.

## How to schedule a temporary app price change

Use a temporary change for a promotion with a real end date. It prevents a discounted price from becoming permanent because someone forgot to restore it.

1. Open the app's **Pricing and Availability** page.
2. Add a change under **Price Schedule**.
3. Choose **Temporary Price Change**.
4. Select the start and end dates.
5. Select the affected countries or regions.
6. Choose one country or region and its price so App Store Connect can propose comparable prices for the rest of your selection.
7. Review and adjust the storefront prices.
8. Review the complete schedule, then confirm it.

The start date can be from today through the end of the next calendar year. A temporary change can last no longer than one year. At its end, the app returns to the previously set price.

There is a broader consequence when the temporary selection includes your base country or region: Apple won't make automatic pricing adjustments in any of the 175 storefronts during the selected period. Add that behavior to the change record rather than treating the promotion as isolated to the storefronts you selected.

## How to schedule custom prices

Choose custom pricing only when local control is intentional.

### Manually manage selected storefronts

1. Add a **Custom Price Change** under Price Schedule.
2. Set the effective date.
3. Choose **Manually manage prices in specific countries or regions**.
4. Select the storefronts. App Store Connect doesn't let you select the base country or region in this path.
5. Choose a reference storefront and price.
6. Review the proposed prices, make any deliberate adjustments, and confirm.

Once effective, the selected storefronts are marked as manually adjusted. Apple no longer updates them for tax or foreign-exchange changes.

### Manually manage all storefronts

1. Add a **Custom Price Change** and set its effective date.
2. Choose **Manually manage prices in all countries or regions**.
3. Select a base-country price; it can remain unchanged.
4. Set any other local prices you want to change.
5. Review both the changed and unchanged storefront prices.
6. Confirm the schedule.

This option changes the maintenance model for all 175 storefronts, even if you edit only a few amounts. To return to Apple's automatic comparable-pricing model later, create a Global Price Change.

## Treat the scheduled date as a regional rollout

Whichever change type you choose, the price doesn't update everywhere at one universal midnight. Apple publishes [pricing and availability start times by country or region](https://developer.apple.com/help/app-store-connect/reference/pricing-and-availability/app-store-pricing-and-availability-start-times-by-country-or-region/) and shows the relevant times in your browser's timezone and in UTC inside App Store Connect.

Separate these dates in your plan:

```text
Schedule confirmed:
First affected storefront time:
Customer communication time:
Last affected storefront time:
Verification window:
Analytics comparison starts:
```

If the selected time has already passed in some regions when you schedule the change, Apple says the new price takes effect there immediately but may take up to 24 hours to display to all users. Avoid announcing a simultaneous worldwide switch unless the regional schedule supports it.

## Review the schedule before it takes effect

Return to **Pricing and Availability → Price Schedule** to inspect upcoming changes and their dates. Check:

- The chosen change type
- Start and end dates
- Base-country price
- Generated or custom local prices
- Storefront scope
- Which rows show **Manually Adjusted**
- Any Apple changes labeled **Foreign Exchange** or **Tax Rate Adjustment**

Apple says upcoming changes can be viewed or changed. Scheduled rows can normally be deleted with the remove control, but some events can't be removed, including certain tax or foreign-exchange adjustments and some transitions into or out of manually adjusted pricing. Open the date for details instead of assuming every row is reversible.

One edit deserves its own warning: changing the app's base country or region takes effect immediately and permanently deletes scheduled app price changes. Associated In-App Purchases also inherit the new base unless their price or base was configured separately. Review both consequences before changing the base.

### If the add button is missing

Check the documented prerequisites before troubleshooting the browser: confirm that your role is Account Holder, Admin, or App Manager; the Account Holder has accepted the latest Paid Apps Agreement; and the app has been submitted for review. Don't use an In-App Purchase or subscription price schedule as a workaround because those controls affect different products.

## Run a pre-change accuracy check

Use this gate before the first regional effective time:

- Latest Paid Apps Agreement is accepted
- Authorized role is performing the change
- Existing schedule and base-country settings are recorded
- Change affects the app's purchase price, not an IAP or subscription
- All intended storefronts are included, and unintended ones are excluded
- Customer-facing price statements are updated or queued
- Support responses and campaign copy use the correct dates
- Tax category accurately describes the app
- Estimated proceeds were reviewed, not inferred from the customer price
- Pre-order behavior was checked, if relevant
- Verification and measurement owners are named

Apple's [tax category guidance](https://developer.apple.com/help/app-store-connect/manage-app-information/set-a-tax-category) notes that proceeds depend on the customer price minus applicable taxes and Apple's commission. Tax-category changes affect future transactions and may take up to an hour to appear. Consult an appropriate tax adviser when classification is uncertain.

For a paid app on pre-order, customers aren't charged until release. If the price changes during the pre-order period, Apple charges each customer the lower of the price they accepted and the price on the release date. Coordinate the pricing record with your [App Store pre-order plan](/blog/app-store-pre-order/) rather than assuming everyone will pay the release-day amount.

## Verify the live change

Don't close the task when the schedule is saved. Close it when the planned prices are observable.

1. Reopen Price Schedule after the relevant regional start times.
2. Confirm the active and upcoming rows match the change record.
3. Spot-check the storefronts that matter most to the decision.
4. Verify customer-facing price references and support material.
5. Record discrepancies by storefront and time instead of repeatedly editing the schedule.
6. If you scheduled after the effective time had passed in some regions, allow Apple's stated display window of up to 24 hours before investigating a mismatch there.

Keep a small verification table:

| Storefront | Expected price | Effective time | Observed price | Checked at | Result |
| --- | --- | --- | --- | --- | --- |
| Base | Price | Date/time | Price | Date/time | Pass / Investigate |
| Priority market 1 | Price | Date/time | Price | Date/time | Pass / Investigate |
| Priority market 2 | Price | Date/time | Price | Date/time | Pass / Investigate |

Use the table to verify priority markets, but don't treat a small sample as proof for all 175 storefronts. App Store Connect's schedule remains the authoritative configuration.

## Measure the change without inventing a result

Price, app units, sales, and proceeds answer different questions. Apple's [Sales and Trends documentation](https://developer.apple.com/help/app-store-connect/measure-app-performance/view-units-proceeds-sales-and-pre-orders/) defines sales as the amount billed and proceeds as the amount received after applicable taxes and Apple's commission. Proceeds in Sales and Trends are estimates, not final payments.

Define the comparison before looking at the result:

```text
Question:
Did the new paid-app price improve proceeds without an unacceptable change in first-time purchases?

Baseline:
Four complete comparable weeks before the change

Follow-up:
Four complete comparable weeks after every target storefront changed

Segments:
App only, then priority territories

Read together:
App units, sales, proceeds, refunds

Known confounders:
Release, featuring, campaign, seasonality, metadata, availability

Decision:
Keep / investigate / schedule a new change
```

The four-week window is an example, not an Apple requirement. Change it for your sales volume and seasonality. The important part is using complete periods, consistent filters, and a prewritten decision rule. The broader [App Store Connect analytics guide](/blog/app-store-connect-analytics/) explains how to compare like with like and avoid confusing sales with proceeds.

## Worked example: a one-month paid-app promotion

Suppose an indie developer wants a promotion in three storefronts while preserving the regular global price elsewhere.

The suitable path is a **Temporary Price Change**, not a Global Price Change:

1. Record the current base and all existing future changes.
2. Set exact start and end dates, no more than one year apart.
3. Select only the three promotional storefronts.
4. Review each proposed local price and the return price.
5. Note whether the base storefront is included; if it is, record the temporary pause in Apple's automatic adjustments across all storefronts.
6. Confirm regional effective times before scheduling campaign messages.
7. Verify the three prices after their respective start times.
8. Let the scheduled end restore the prior prices, then verify again.
9. Compare complete pre- and post-change periods by territory.

Save the old price, new price, affected markets, timing, verification, and result together. That record gives the next pricing decision a factual starting point.

## Keep LaunchBuddy on the planning side of the boundary

LaunchBuddy can organize tasks for recording the date, verifying storefronts, and reviewing analytics later; project notes can hold the decision record. Release planning, taskboards, and project notes are available across iPhone, iPad, and Mac. The Free plan is limited to two apps, two releases, and limited project notes. LaunchBuddy Pro's App Store Connect analytics dashboard can show downloads and revenue when valid API credentials are connected.

LaunchBuddy doesn't set, schedule, edit, or verify App Store prices. It also doesn't replace App Store Connect's Price Schedule, tax settings, Sales and Trends, or financial reports. Use Apple for the authoritative pricing action and LaunchBuddy only for the surrounding decision and follow-up work. If the price change accompanies a new version, connect it to the broader [iOS release management workflow](/blog/ios-app-release-management/).

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy and plan the work around your next App Store change</a>
