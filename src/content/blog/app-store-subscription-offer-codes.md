---
title: "App Store Subscription Offer Codes: Setup and Campaign Guide"
description: "Set up App Store subscription offer codes, choose one-time or custom codes, test redemption, distribute safely, and measure the campaign."
pubDate: 2026-09-14
---

**To create an App Store subscription offer code, open your auto-renewable subscription in App Store Connect, select Create Offer Codes from Subscription Prices, define who is eligible, choose the renewal behavior, territories, offer type, duration, and price, then confirm the offer. Test it with sandbox codes before creating production codes. For distribution, choose unique one-time-use codes for controlled access or a named custom code for a broad campaign.**

The setup screen is only part of the work. Before confirming an offer, decide exactly which customers should receive it, what happens when the discount ends, how redemption will be tested, and which result would justify repeating the campaign.

This guide covers **subscription offer codes for auto-renewable subscriptions**. They aren't the same as codes that give away a paid app. See the [App Store promo codes guide](/blog/app-store-promo-codes/) if the goal is to provide the app itself rather than a subscription offer.

Use an offer code when the customer must receive and redeem a code. Apple's introductory offers are automatic first-subscription pricing for eligible customers. Promotional offers are a separate in-app discount mechanism for current or previous subscribers, while win-back offers use their own lapsed-subscriber eligibility and presentation rules.

Each mechanism can lower a subscription price, but that doesn't make them interchangeable. Choose the one that matches how the intended customer discovers and accepts the offer.

## Start with a bounded offer-code brief

An offer code can target new, existing, expired, or a combination of those subscriber states. Each audience calls for a different decision. A new-subscriber offer is an acquisition test; an existing-subscriber offer may support retention or a plan change; an expired-subscriber offer is a reactivation test.

Write the decision down before choosing settings:

```text
Campaign ID:
Subscription product and group:
Customer state: New | existing | expired
Customer problem or reason to return:
Offer hypothesis:

Introductory-offer interaction:
After the offer: Renew at standard price | stop automatically
Countries or regions:
Offer type: Pay as you go | pay up front | free
Duration and price:

Code type: One-time use | custom
Distribution channel:
Redemption start and stop:
Maximum planned redemptions:

Primary result:
Guardrails:
First review:
Final decision date:
Decision: Repeat | change | stop | insufficient evidence
```

Keep one campaign to one audience and one proposition. If the same code is promoted to both never-subscribed and expired customers, an aggregate result won't tell you which message or customer state worked.

## Step 1: Configure the subscription offer

You need the Account Holder, Admin, App Manager, or Marketing role. Apple's current [offer-code setup instructions](https://developer.apple.com/help/app-store-connect/manage-subscriptions/set-up-subscription-offer-codes/) give this path:

1. In App Store Connect, open **Apps** and select the app.
2. Select **Subscriptions** in the sidebar.
3. Open the subscription group, then the subscription product.
4. In **Subscription Prices**, select the add button.
5. Choose **Create Offer Codes**.
6. Enter an internal reference name.
7. Set renewal behavior and customer eligibility.
8. Decide how the code interacts with any introductory offer.
9. Select countries or regions.
10. Choose the offer type, duration, and price, then confirm the details.

The reference name matters after launch. Apple uses it to identify the offer in Sales and Trends reports and StoreKit transactions. A name such as `expired-annual-sep26` preserves audience, product, and timing better than `fall-promo`.

Review every setting before confirming. Apple says an offer can't be edited after creation; changed eligibility requires a new offer.

### Choose the customer eligibility deliberately

Apple defines the eligible states this way:

- **New subscribers:** never subscribed to any product in the subscription group.
- **Existing subscribers:** currently subscribed within the group, including subscribers in billing retry or a grace period when auto-renew remains enabled.
- **Expired subscribers:** previously subscribed within the group, with auto-renew off and the subscription period ended.

Eligibility applies at the subscription-group level, not only to whether someone has used the individual product before. Check the group structure before describing an offer as “new customers only.”

### Decide what happens after the offer

If the subscription should continue, leave it set to renew at the standard price after the offer period, unless the customer cancels. If you disable auto-renewal for the offer, Apple limits the setup to a **Free** offer; this creates a commitment-free trial that stops rather than rolling into the standard price.

Write this behavior in customer-facing copy. “Three months free” is incomplete if it doesn't also say whether the subscription renews, at what standard price, and when that change happens.

If the subscription already has an introductory offer, App Store Connect asks whether eligible customers should receive the introductory offer before the offer code. That sequence changes both the customer timeline and when the standard price begins, so include it in the test plan and campaign terms.

## Step 2: Test redemption before production distribution

Create sandbox codes from the offer's detail page before generating production codes. Apple allows 10 to 10,000 sandbox codes in a batch, with a validity period of up to six months.

Test at least these paths:

- one eligible account redeems successfully;
- one ineligible account gets the expected result;
- the correct subscription product, price, duration, and territory appear;
- introductory-offer sequencing matches the configured choice;
- renewal or commitment-free expiration behaves as intended;
- the app unlocks and restores the correct entitlement;
- your server receives and processes the transaction state, if the app uses a server;
- support can identify the campaign from the offer reference without seeing a customer's code.

Apple's [sandbox overview](https://developer.apple.com/help/app-store-connect/test-in-app-purchases/overview-of-testing-in-sandbox/) supports testing subscription events with Sandbox Apple Accounts on development-signed builds. A successful App Store Connect configuration isn't proof that the app's entitlement handling, messaging, or server logic is correct.

In-app redemption is optional. Apple's [StoreKit offer-code guidance](https://developer.apple.com/documentation/storekit/supporting-offer-codes-in-your-app) documents system redemption sheets for supported SwiftUI, UIKit, and AppKit apps. Use Apple's sheet rather than inventing a text field that appears to redeem codes itself. Customers can also redeem through an appropriate redemption URL; one-time-use codes can additionally be entered through the App Store code-redemption flow.

## Step 3: Choose one-time-use or custom codes

Both code types count toward Apple's maximum of one million redemptions per app per quarter, shared across the app's subscriptions. That ceiling is capacity, not a campaign target.

For production redemption, Apple says the app must be in the **Ready for Sale** state. Each customer can redeem only one code for a given offer.

| Decision | One-time-use code | Custom code |
| --- | --- | --- |
| Best fit | Controlled, recipient-level distribution | Broad distribution through one or more channels |
| Code shape | Unique code for one redemption | Memorable shared name, such as `SPRINGPROMO` |
| Production batch | 500 to 25,000 codes | Redemption limit up to 25,000 per batch |
| Expiration | Required; no more than six months | Optional; no end date or up to six months when set |
| Redemption | URL, App Store code flow, or supported in-app flow | URL or supported in-app flow |
| Main operational risk | Sending the same code twice or exposing the batch | Public resharing and losing channel separation |

Apple notes that production codes may take up to an hour to become redeemable. Don't launch a time-sensitive campaign the moment you select Create.

### Use one-time-use codes for controlled access

One-time-use codes suit selected recipients, support recovery, or a partner list where a shared public code would be too easy to forward. Download the batch from App Store Connect and keep the code values in restricted storage.

Track allocation separately:

| Allocation ID | Audience | Status | Sent | Follow-up | Code stored in |
| --- | --- | --- | --- | --- | --- |
| WIN-001 | Expired annual | Sent | YYYY-MM-DD | YYYY-MM-DD | Restricted vault |
| WIN-002 | Expired annual | Confirmed redeemed | YYYY-MM-DD | — | Restricted vault |
| WIN-003 | Expired annual | Unassigned | — | — | Restricted vault |

Don't paste complete code values into a release task, project note, support ticket, or shared campaign document. Mark a sent code as unavailable even when redemption hasn't been confirmed; giving it to a second person creates a race.

### Use a custom code for a broad campaign

A custom code can be up to 64 characters without special characters. Apple lets you set a redemption limit and an optional expiration, and you can add another batch for the same code when more capacity or a later expiration is needed.

Use separate custom codes when a difference could change a decision:

```text
RETURNEMAIL
RETURNEVENT
```

That separation can preserve channel-level redemption counts. Don't create several codes merely to make the report look more detailed; low counts in each segment may be less useful than one adequately sized campaign.

Because a custom code can be copied beyond its intended placement, its eligibility rules, redemption cap, and expiration are the real boundaries. Calling it “email-only” doesn't prevent someone from posting it elsewhere.

## Step 4: Distribute the code with complete terms

Apple makes the developer responsible for distribution. Before sending a code or redemption URL, prepare copy that answers:

```text
Who is eligible?
Which subscription does this apply to?
What does the customer pay during the offer?
How long does the offer last?
Does it renew afterward?
What is the standard renewal price?
When does the code expire?
Where can the customer get help?
```

Test the final URL in the actual email, QR code, support reply, or landing page. For a one-time-use campaign, send each URL individually. For a custom-code campaign, preserve the live placement and dates so the later report has context.

Don't describe a code as guaranteed free access without checking eligibility and renewal settings. Don't promise that a code remains available until its expiration if the campaign also has a redemption limit.

## Step 5: Measure redemption and what happened afterward

Separate delivery, redemption, and subscription outcomes:

```text
Messages delivered or placements published
→ redemption attempts
→ successful redemptions
→ active offers
→ conversion to standard-price subscription, when applicable
→ renewal or churn
```

A delivered email isn't a redemption. A redemption isn't a paid conversion. A paid conversion isn't durable retention.

Apple's [Subscription Offer Redemption Report](https://developer.apple.com/help/app-store-connect/reference/reporting/subscription-offer-redemption-report/) includes the redemption date, app, subscription, offer reference name, territory, and count. It includes the custom code for custom-code redemptions, but the Offer Code field is blank for one-time-use redemptions. Your private allocation ledger may confirm who received a one-time code; Apple's report doesn't provide recipient-level attribution for it.

For lifecycle analysis, Apple's Offers view in App Store Connect Analytics covers offer adoption, conversion to paid subscriptions, retention, and churn. The broader [App Store Connect analytics guide](/blog/app-store-connect-analytics/) explains why complete periods, mature cohorts, and consistent definitions matter.

Use a decision record:

```text
Offer reference:
Review period:
Eligible audience and channel:

Distributed:
Redemptions by territory:
Conversions to paid:
Renewals and churn after enough time:
Support or entitlement failures:

Other changes during the period:
Interpretation:
Decision: Repeat | change | stop | insufficient evidence
Next review:
```

Wait long enough for the offer and renewal sequence to mature. If a free period hasn't ended, conversion to standard price can't yet answer whether the offer acquired durable paying customers.

## Know when to deactivate instead of waiting

Deactivate a code batch when the terms or distribution are wrong, the code has spread beyond the intended audience, or a product defect makes continued redemption harmful. Apple says deactivation immediately expires unredeemed codes; people who already redeemed aren't affected.

Deactivating the entire offer is broader: all associated codes become invalid, and the offer can't be reactivated. Preserve the reason, time, affected placements, and customer-support response before taking that action.

After any public campaign, use an [iOS post-launch checklist](/blog/ios-post-launch-checklist/) to keep offer results beside availability, product quality, support, and other release changes rather than attributing every metric movement to the code.

## Where LaunchBuddy fits

Create offers, sandbox codes, production codes, redemption URLs, and offer-specific reports in Apple's tools. LaunchBuddy doesn't configure subscription offers, generate or distribute codes, test StoreKit, or determine customer eligibility.

LaunchBuddy can hold the surrounding work: tie sandbox testing, campaign QA, launch, support review, and the final decision to the relevant app and release. Release planning, taskboards, default submission checklists, and iCloud sync are available on the free plan within its app, release, and project-note limits.

LaunchBuddy Pro adds unlimited project notes and selected App Store Connect downloads, revenue, and subscription metrics when API credentials are configured. App Store Connect remains the source for code management and offer-level reporting.

If an offer-code campaign is part of your next release, <a href="https://apple.co/3iFcjjW">download LaunchBuddy and keep its test, launch, and review tasks with the release</a>.
