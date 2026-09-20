---
title: "App Store Subscription Price Increase: A Safe Rollout Guide"
description: "Plan an App Store subscription price increase, choose price preservation, check consent rules by storefront, schedule the change, and measure cancellations."
pubDate: 2026-09-20
---

**To increase an App Store subscription price, open the auto-renewable subscription in App Store Connect, select the add button under Subscription Prices, choose Plan Subscription Price Change, set the storefronts, date, and new prices, then decide whether to preserve the current price for existing subscribers or move them to the new price. Review Apple's notice-or-consent result for every storefront before confirming.**

That final review matters. A price increase doesn't have one global customer outcome: Apple may notify some subscribers, require others to consent, preserve another cohort at its old price, and delay the higher renewal for people who haven't received enough notice.

This guide covers auto-renewable subscriptions. A paid app's upfront price uses a different schedule; see the [App Store price change guide](/blog/app-store-price-change-schedule/) for that workflow.

## Decide who should pay the new price

App Store Connect offers two choices for subscribers paying the currently displayed price:

1. **Keep the current price for existing subscribers.** People who subscribed before the change's start date aren't affected. Apple says a subscriber whose subscription expires can resubscribe at the preserved price within 60 days.
2. **Apply the increase to existing subscribers.** Apple determines whether each affected subscriber receives a notice or must explicitly consent.

Don't treat preservation as a checkbox at the end of scheduling. It is the central product decision.

Preserving the price can reward early customers and avoid an immediate retention risk, but it creates multiple paying cohorts. Applying the increase produces simpler pricing eventually, but some subscribers may cancel after a notice or expire because consent wasn't given.

Use a decision record before opening App Store Connect:

```text
Subscription:
Billing duration:
Current displayed price:
Proposed price:
Business reason:

New subscribers start paying the new price:
Existing subscribers: Preserve | Move to new price
Reason for that choice:

Priority storefronts:
Previous increase dates by storefront:
Existing preserved-price cohorts:
Offers or trials currently active:

Communication owner:
Support owner:
First measurement date:
Final review date:
Decision: Confirm | revise | postpone
```

The record makes an important distinction visible: changing the price for new subscribers and changing the renewal price for an existing subscriber aren't the same action.

## Check notice and consent storefront by storefront

For active subscribers who will move to the new price, Apple either sends a notice or asks for explicit consent. According to Apple's current [subscription pricing rules](https://developer.apple.com/help/app-store-connect/manage-subscriptions/manage-pricing-for-auto-renewable-subscriptions), consent is required when any of these conditions applies:

- the subscriber is in a region that requires consent for every increase;
- the increase is more than 50% **and** its absolute amount exceeds Apple's threshold for that storefront and billing duration; or
- that subscriber experienced an increase for the same subscription within the previous 12 months.

The percentage and absolute tests work together. A 51% increase doesn't automatically trigger that threshold rule if the absolute increase stays below the applicable amount. Conversely, a large absolute change doesn't meet that rule unless it also exceeds 50%. A region-specific consent requirement or a prior increase can still require consent independently.

Don't copy today's threshold values into a permanent internal rule. Apple's [storefront threshold table](https://developer.apple.com/help/app-store-connect/reference/auto-renewable-subscription-price-increase-thresholds/) says the amounts can change with taxes or foreign exchange rates, and some storefronts require consent for any increase. App Store Connect's current result is more reliable than a spreadsheet saved months ago.

Build a rollout map that records the decision instead of trying to replace Apple's calculation:

| Storefront | Current price | New price | Existing price preserved? | App Store Connect result | Last increase checked? | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| Priority market A | Current | New | Yes / No | Notice / Consent | Date / none | Name |
| Priority market B | Current | New | Yes / No | Notice / Consent | Date / none | Name |
| Priority market C | Current | New | Yes / No | Notice / Consent | Date / none | Name |

Complete this for every storefront in scope, not only the base country. The table's **App Store Connect result** should be captured during the final review because consent is evaluated from the subscriber's conditions when the increase reaches renewal. Apple warns that circumstances can change between scheduling and renewal.

### What happens when consent is required

Apple contacts affected subscribers through its supported email, push, and in-app messaging. The first-notification timing depends on the subscription duration: Apple currently lists 60 days before renewal for two-, three-, and six-month plans and annual plans, 27 days for monthly plans, and 7 days for weekly plans.

If the subscriber doesn't consent before the first renewal at the higher price, the subscription expires after the last renewal cycle at the former price. Apple's messages continue approximately weekly during the consent period.

When an increase is scheduled too close to renewal for the required notice, the subscriber renews at the existing price for another billing period. This means the effective date of a schedule is not a promise that every active subscriber begins paying the new amount on that date.

### What happens when consent isn't required

Apple still notifies affected subscribers. No explicit opt-in is required, but the customer can cancel. Subscribers who recover during billing retry or a grace period renew once more at the existing price before receiving notice for a later renewal. A person who actively repurchases can see the new price immediately.

Use these branches in forecasts. Counting every active subscriber at the new price on the schedule's start date will overstate the immediate effect.

## Sequence the change before scheduling it

Apple permits one future price change at a time per storefront and billing-plan type. Scheduling a second one overwrites the first. A new increase can also overwrite one that a customer was notified about but hasn't renewed at yet, causing another renewal at the old price when more notice is needed.

Run this sequence check:

1. Open **View All Subscription Pricing** for the product.
2. Export the current and upcoming prices as CSV.
3. Identify existing preserved-price cohorts and their start dates.
4. Check every future change by storefront and billing-plan type.
5. Check when the previous increase will have reached active renewals.
6. Delay or redesign the new schedule if it would overwrite a change or compress the notice period.

An exported schedule is a baseline, not proof of the eventual customer outcome. Keep it with the decision record so a later discrepancy can be compared with what was actually confirmed.

## Schedule the subscription price increase

You need the Account Holder, Admin, or App Manager role. Then follow Apple's current path:

1. In **Apps**, select the app.
2. Select **Subscriptions** in the sidebar.
3. Open the subscription group, then the auto-renewable subscription.
4. Under **Subscription Prices**, select the add button.
5. Choose **Plan Subscription Price Change**.
6. Select the countries or regions to change.
7. Set the start date, reference storefront, and new price.
8. Review Apple's comparable prices for all selected storefronts and adjust any deliberate local prices.
9. Choose whether to preserve the current price for existing subscribers or apply the increase to them.
10. Review the planned changes and Apple's notice-or-consent indication by storefront.
11. Confirm only after a second person or a deliberate second pass matches the screen to the rollout map.

Apple generally determines the earliest available date one or two days ahead based on regional time zones, and the time of day varies by region. Schedule with enough lead time for review and customer communication instead of choosing the earliest date merely because the interface allows it.

Before confirming, verify:

- the correct subscription product and billing duration;
- the complete storefront scope;
- current and new local prices;
- the preserve-or-increase choice for existing subscribers;
- notice or consent behavior shown for priority storefronts;
- previous and scheduled price changes;
- active introductory or promotional pricing;
- support copy and ownership;
- the dates when each subscriber cohort can produce useful evidence.

Apple says an increase can't be reversed after it takes effect. Until then, most planned changes can be deleted from **View All Subscription Pricing**, although Apple documents exceptions for some system and manually adjusted changes.

## Communicate without contradicting Apple's flow

Apple owns the required price-increase notice and consent flow. Your message can explain the product decision, but it shouldn't imply that an email reply, support ticket, or button in your own account system counts as App Store consent.

A useful message answers:

```text
What is changing?
Which subscription and billing period are affected?
When can this subscriber's renewal change?
What value or cost change explains the decision?
Will Apple ask this subscriber to consent, or only notify them?
Where can the subscriber view or manage the subscription?
How can the subscriber get product support?
```

Avoid promising one universal renewal date when customers have different billing dates. Don't tell preserved subscribers that their price will change. For consent-required cohorts, explain the consequence accurately: if consent isn't completed in Apple's flow, the subscription expires at the end of the applicable cycle at the former price.

## Verify the rollout in stages

The saved schedule is only the first checkpoint. Verify four stages:

1. **Configuration:** Reopen the planned prices and compare them with the rollout map.
2. **Communication:** Confirm that your public and support copy matches the affected cohort, billing period, and region.
3. **Renewal:** Wait until each cohort has had enough time to receive notice or consent prompts and reach renewal.
4. **Outcome:** Compare renewals, expirations, cancellations, and proceeds using complete periods.

Apple's Subscription Event Report marks preserved-pricing renewals and includes cancellation information. Apple's reporting definitions separate **Price Increase Notice**, where a subscriber canceled from the notice, from **Price Increase Consent**, where the subscription ended because consent wasn't given. Keep those outcomes separate from billing issues and ordinary cancellations.

Use a measurement sheet:

| Cohort | Storefront | Expected branch | Eligible renewals reached? | Renewals | Price-related endings | Proceeds | Decision |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Preserved existing | Market A | Old price | Yes / No | Count | Count | Amount | Keep / review |
| Increased existing | Market A | Notice | Yes / No | Count | Count | Amount | Keep / review |
| Increased existing | Market B | Consent | Yes / No | Count | Count | Amount | Keep / review |
| New subscribers | Market A | New price | Yes / No | Count | N/A | Amount | Keep / review |

Don't compare a fully matured monthly cohort with an annual cohort that hasn't reached renewal. Also avoid reading proceeds alone: a higher price can raise proceeds while active paid subscriptions or retention declines. The [App Store Connect analytics guide](/blog/app-store-connect-analytics/) explains how to compare complete periods and avoid treating correlation as proof.

## Worked example: protect early annual subscribers

Suppose an app has monthly and annual plans in several storefronts. The developer wants a higher public price next quarter but decides that existing annual subscribers should keep their current price.

A defensible rollout would be:

1. Export current and upcoming prices for both products.
2. Confirm that no future annual-plan change will be overwritten.
3. Record the old and proposed prices for each storefront.
4. Preserve existing annual subscribers.
5. Review the separate decision for monthly subscribers rather than assuming both durations need the same treatment.
6. Capture App Store Connect's notice-or-consent result wherever existing monthly subscribers will move.
7. Publish support copy that distinguishes preserved annual subscribers, affected monthly subscribers, and new customers.
8. Verify the schedule after confirmation.
9. Measure each cohort only after its relevant renewal window has matured.
10. Record the decision to keep, revisit, or stop the pricing strategy.

This approach adds work, but it prevents three misleading conclusions: that every subscriber changed on the start date, that every cancellation was caused by price, and that higher proceeds alone proved the change was successful.

## Keep LaunchBuddy on the planning side

LaunchBuddy can hold the decision record, storefront checks, communication tasks, support review, and dated follow-up beside the relevant app and release. Release planning, taskboards, default submission checklists, and iCloud sync are available on the Free plan within its two-app and two-release limits.

With App Store Connect API credentials, LaunchBuddy Pro adds selected downloads, revenue, and subscription metrics. It doesn't schedule subscription prices, preserve subscriber cohorts, determine whether consent is required, send Apple's notices, or replace Subscription Event Reports and financial records. Use App Store Connect as the authority for every price and subscriber outcome, then use an [iOS post-launch checklist](/blog/ios-post-launch-checklist/) to keep support incidents separate from slower pricing analysis.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy and keep the decisions and follow-up for your next subscription change with the release plan</a>.
