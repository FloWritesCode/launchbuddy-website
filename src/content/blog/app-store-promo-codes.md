---
title: "App Store Promo Codes: How to Plan, Generate, and Track Them"
description: "Generate App Store promo codes, allocate the 100-code limit, track four-week validity, brief recipients, and interpret redemptions without double-sending codes."
pubDate: 2026-09-09
---

**To generate App Store promo codes, open your app in App Store Connect, select Promo Codes, enter the number of App Promo Codes you need, accept Apple's terms, and generate the batch. Each app promo code can be used once, remains valid for four weeks from generation, and counts toward a limit of 100 codes per app version for each supported platform.**

Don't generate all 100 by default. Decide who needs access and when, then create batches close enough to delivery that their four-week validity isn't wasted. Keep the code values in Apple's downloaded file, track allocations separately, and never send one code to two people.

This how-to covers **app promo codes**, which give someone a free copy of an iOS, macOS, or tvOS app. Apple separately supports promo codes for In-App Purchases and offer codes for free or discounted In-App Purchases, including subscriptions. Those use different controls and rules, as Apple's [promotion overview](https://developer.apple.com/app-store/promote/) explains.

## Know when an App Store promo code is the right tool

App promo codes are useful for providing a finished App Store version to press, creators, partners, or other selected recipients. Apple also allows codes for an approved version that hasn't been publicly released yet. That makes them useful for editorial access before a coordinated launch.

They aren't a general-purpose beta or App Store rating-and-review acquisition campaign:

| Goal | Use | Why |
| --- | --- | --- |
| Give a selected recipient the paid app for free | App promo code | Redemption behaves like a purchase and includes access to future updates |
| Let someone access an approved version before public release | App promo code | Apple permits promo codes for unreleased App Store versions |
| Collect feedback on changing builds | TestFlight | Apple's [TestFlight workflow](https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview/) covers beta builds, tester groups, and feedback; see the [practical release workflow](/blog/testflight-release-management/) |
| Discount or provide free access to an In-App Purchase or subscription | In-App Purchase promo code or offer code | App promo codes cover the app itself; choose the separate IAP flow that fits the offer |
| Acquire App Store ratings or reviews | Neither | Apple says customers who download with an app promo code can't rate or review the app |

A promo-code recipient may still write an article, record a video, or send you private feedback. They simply can't use that redemption to leave an App Store rating or review. Make that limitation part of the campaign plan rather than discovering it after distribution.

## Check Apple's rules before allocating codes

Apple's current [promo-code instructions](https://developer.apple.com/help/app-store-connect/offer-promo-codes/request-and-manage-promo-codes) establish the operating constraints:

- A code is single-use.
- It remains valid for four weeks from the date it was generated.
- You can request up to 100 codes per version of each platform your app supports.
- The Account Holder, Admin, App Manager, or Marketing role can request them.
- Codes can be redeemed on an App Store storefront where the app is available.
- tvOS and multi-platform app codes must be redeemed on an iOS device.
- Codes can't be generated for apps available only through Apple Business Manager or Apple School Manager.
- If the app has been removed from sale on every storefront, codes can't be generated or redeemed.

The 100-code allowance is **per version and per platform**, not one shared lifetime pool for the app. Still, treat it as scarce capacity. Apple's documentation doesn't say that an expired code restores capacity, so don't plan on replacing expired codes beyond the stated limit. A code sent to someone should remain allocated because you can't safely assume they won't redeem it later.

For pre-release access, finish review first. Apple's [publishing workflow](https://developer.apple.com/help/app-store-connect/manage-your-apps-availability/overview-of-publishing-your-app-on-the-app-store) places promo-code requests after approval and explicitly allows distribution before the app is made available publicly. Promo codes aren't a way around App Review.

## Step 1: Create an allocation plan

Start with a version-platform record, because that's the level where Apple's limit applies:

```text
App:
Version:
Platform:
Approval status:
Campaign purpose:
Public release date:
First distribution date:
Last useful response date:
Version-platform request cap: 100
Already generated:
Remaining ungenerated allowance:
```

Then allocate fewer than 100 codes:

| Recipient group | Planned | Generate now | Hold for later | Owner |
| --- | ---: | ---: | ---: | --- |
| Editorial contacts | 20 | 15 | 5 | Name |
| Creators | 15 | 10 | 5 | Name |
| Launch partners | 10 | 5 | 5 | Name |
| Contingency reserve | 10 | 0 | 10 | Name |
| Unallocated capacity | 45 | 0 | 45 | — |

The table is a capacity guardrail, not a forecast of coverage. Generate the first batch for confirmed recipients rather than every name on a wish list. Apple's History tab records the generation date of each set; use that date to determine the set's validity window.

Work backward from the date recipients need access. If an embargo is three weeks away, a batch generated today leaves little room for late follow-up. If the app isn't approved, generating codes isn't the next task; completing a review-ready release is.

## Step 2: Prepare the recipient handoff

A code without context creates support work. Before generating it, prepare a compact brief:

```text
App and version:
Platform and minimum OS:
What this version is for:
Three workflows worth trying:
Known limitation:
Support contact:
Embargo or timing, if applicable:
Code validity: four weeks from generation
Important: promo-code recipients can't rate or review on the App Store
```

Only describe features in the approved build. If the product page, press brief, and binary disagree, pause distribution and reconcile them. The [App Store Connect release checklist](/blog/app-store-connect-release-checklist/) is a useful precondition for that review.

Don't ask a recipient to exchange coverage, a rating, or a positive statement for a code. The code grants access; it doesn't buy an outcome.

## Step 3: Generate the codes in App Store Connect

Once the version is approved and the first recipient group is ready:

1. Sign in to App Store Connect with an eligible role.
2. Open **Apps** and select the app.
3. Select **Promo Codes** in the sidebar.
4. Under **App Promo Codes**, enter the number needed for this batch.
5. Select **Generate Code**.
6. Read and accept the contract terms.
7. Select **Generate Code**, then select **OK**.
8. Open **History** and download the generated codes as a text file.
9. Record the batch's generation date and calculate its four-week validity window.

Use the History date as the authoritative starting point. Don't estimate validity from the day you emailed a code; a code can already be several days into its window when the recipient receives it.

Treat the downloaded file as sensitive. Anyone with an unused code may be able to redeem it. Move the export out of Downloads into encrypted, access-controlled storage, avoid broadly shared or synchronized folders, and delete it after the batch expires and is reconciled. Never paste the complete batch into a task, campaign note, chat channel, or bulk email.

## Step 4: Track allocation without double-sending

Separate the **code vault** from the **recipient ledger**:

- **Code vault:** Apple's downloaded text file in encrypted, access-controlled storage.
- **Recipient ledger:** an access-limited record of who was allocated a code, when it was sent, and what follow-up is due.

The ledger doesn't need the complete code value:

| Batch | Allocation ID | Recipient | Status | Sent | Follow-up | Review on |
| --- | --- | --- | --- | --- | --- | --- |
| iOS-2.0-A | A-001 | Publication A | Sent | YYYY-MM-DD | YYYY-MM-DD | YYYY-MM-DD |
| iOS-2.0-A | A-002 | Creator B | Confirmed received | YYYY-MM-DD | YYYY-MM-DD | YYYY-MM-DD |
| iOS-2.0-A | A-003 | Unassigned | Available | — | — | YYYY-MM-DD |

Map each opaque allocation ID to a code only inside the vault. The review date is four weeks after Apple's generation date; confirm the code's current state before sending instead of promising a precise final-hour cutoff.

Use statuses that reflect what you can actually know:

- **Available:** Never shared and still within the validity window.
- **Sent:** Shared with exactly one recipient; don't reassign it.
- **Confirmed received:** The recipient acknowledged receipt, not necessarily redemption.
- **Recipient confirmed redeemed:** The recipient says access worked.
- **Expired:** Four weeks have passed since generation.

An opened follow-up email isn't evidence of redemption. Likewise, don't move an unconfirmed sent code back to Available. Since a code can be redeemed only once, double-sending creates a preventable race and a poor recipient experience.

## Step 5: How to redeem an App Store promo code

Tell recipients which platform the code covers and when the validity window ends. For tvOS or a multi-platform app, include Apple's requirement to redeem on an iOS device; the tvOS app then appears in the customer's Apple TV App Store purchase history.

On iPhone or iPad, the recipient can open the App Store, tap the account photo, choose **Redeem Gift Card or Code**, and enter the code manually. On Mac, open the App Store, select the account name or sign-in button in the sidebar, choose **Redeem Gift Card**, and enter the code. Apple's [redemption instructions](https://support.apple.com/en-us/118242) provide the current device-specific paths.

When someone reports a problem, check these conditions before issuing another code:

1. Is the four-week window still open?
2. Is the code for the intended platform and version?
3. Is the app available in the recipient's storefront?
4. For pre-release access, is the version approved?
5. Has the app been removed from sale everywhere?
6. Could the code already have been redeemed?

Never send a replacement from the same batch without marking the original as **Sent—do not reuse**. If the issue looks like storefront or account behavior rather than a mistyped code, consult current Apple help or support guidance before cycling through the remaining allocation.

## Step 6: Reconcile the batch without inventing precision

App Store Connect's History tab tells you when each set was generated and lets you view or download it again. It isn't a recipient relationship manager.

Apple says purchases made with promo codes appear in Sales and Trends. In the [promotional-code reporting reference](https://developer.apple.com/help/app-store-connect/reference/promotional-codes/), `CR - RW` identifies App Store Connect developer-code transactions for which customer price and developer proceeds are both zero.

The report can show developer-code transactions overall, but Apple's cited documentation doesn't establish campaign, batch, recipient, or individual-code attribution. Keep these measures separate:

```text
Generated: Count issued by Apple
Allocated: Codes assigned to one recipient
Confirmed redeemed: Recipient-confirmed access
Reported developer-code transactions: Overall Apple report category
Expired, never allocated: Never sent and past the four-week window
Unresolved: Sent, but no reliable redemption confirmation
```

Don't describe generated codes as downloads, confirmed readers, coverage, or reviews. Those are different events. For broader reporting definitions and delayed-data caveats, use the [App Store Connect analytics guide](/blog/app-store-connect-analytics/).

## A worked 30-code launch batch

Suppose a paid macOS app version 3.0 is approved and will launch in 18 days. You have 22 confirmed editorial and creator contacts.

A defensible first batch is 30 codes:

```text
22 confirmed recipients
 5 late confirmations
 3 support contingencies
---
30 generated now
70 left ungenerated
```

Send 22 codes individually and leave eight as Available. Two days later, three more contacts confirm, so allocate three of the available codes. If a sent code receives no reply, leave it Sent. If demand grows near launch, generate a second batch rather than consuming all remaining capacity early.

Close the campaign by comparing generated, allocated, recipient-confirmed, and overall developer-code transaction totals. Record expired and unresolved allocations separately so weak signals don't become false attribution.

## How LaunchBuddy fits the workflow

LaunchBuddy can organize the version, promo-code preparation tasks, recipient follow-ups, and campaign closeout beside the rest of an iOS release. Release planning, taskboards, default submission checklists, and iCloud sync are available on iPhone, iPad, and Mac. The Free plan is limited to two apps and two releases, while custom checklists require Pro.

LaunchBuddy doesn't request, generate, distribute, redeem, or verify App Store promo codes. Keep the actual codes in a restricted file, use App Store Connect for generation and Apple reporting, and use ordinary LaunchBuddy release tasks or project notes only when they omit code values.

A small task sequence is enough:

```text
Promo-code campaign
- Verify approval, storefronts, recipients, and batch size
- Generate in App Store Connect and record the validity window
- Send one code per recipient and track follow-up
- Reconcile Apple reporting, then close the campaign
```

If a promo-code campaign belongs in your next release, <a href="https://apple.co/3iFcjjW">download LaunchBuddy and keep its handoff tasks with the relevant app version</a>.
