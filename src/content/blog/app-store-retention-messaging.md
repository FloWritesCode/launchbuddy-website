---
title: "App Store Retention Messaging: Setup and Testing Guide"
description: "Set up App Store retention messages, choose text, image, or offer content, test the cancellation flow, and measure saves without overstating retention."
pubDate: 2026-11-21
---

**To set up App Store Retention Messaging, open your app’s Subscriptions page in App Store Connect, create a message with localized header and body text, assign one or more auto-renewable subscriptions, optionally add an image or retention offer, preview every path, and submit the message to App Review.** Test cancellation in Sandbox before relying on it in production, then judge the result with Cancellation Screen Views, Saves, Cancellations, and downstream subscription outcomes.

Start with App Store Connect unless you already have a clear need for per-customer, server-side message selection. Apple’s separate real-time Retention Messaging API is access-gated and adds an endpoint, signed requests, a 700-millisecond production deadline, fallback design, and a required Sandbox performance test.

This guide covers both paths, but it treats the no-server App Store Connect workflow as the default. Apple supports retention messages on iOS and iPadOS 15.1 or later, visionOS 1 or later, and macOS 14 or later.

## Choose the right Retention Messaging path

Retention Messaging appears after an active subscriber selects **Cancel Subscription** on a supported subscription details page. The customer reaches a confirmation screen where they can continue canceling, keep the subscription, or accept an available offer or plan change.

Apple provides two configuration paths:

| Decision | App Store Connect | Real-time Retention Messaging API |
| --- | --- | --- |
| Message selection | Apple shows the message assigned to the subscription and chooses an eligible retention offer | Your server chooses a preapproved message for the request |
| Setup surface | App Store Connect UI or App Store Connect API | Retention Messaging API plus your HTTPS endpoint |
| Message formats | Text; text with image; text with eligible retention offer | Text; text with image; promotional offer; switch plan |
| Customer-specific decisioning | No server decision at display time | Uses the request’s product, locale, and original transaction ID |
| Server required | No | Yes |
| Production access | Apple announced App Store Connect Retention Messaging as available on November 4, 2026 | Apple currently describes the API as pre-release and requires an access request |
| Failure behavior | The assigned App Store Connect message is the primary experience | Falls back first to the App Store Connect message, then to an API default message |

Choose **App Store Connect** when one value proposition can serve everyone on a subscription, Apple can select among configured retention offers, and you do not need a server in the cancellation path.

Consider the **real-time API** only when the decision itself needs current server context, such as choosing among approved messages, returning a signed promotional offer, or suggesting another product in the same subscription group. Access is not the only cost: you must keep a fast endpoint, verify Apple’s signed payload, maintain approved message IDs, and prove the fallback still works.

## Write a cancellation-stage message brief

A retention message is not a generic paywall. It reaches someone who has already subscribed and has just taken a concrete step toward cancellation. Repeating the original acquisition pitch wastes that context.

Before creating the message, write a one-page brief:

```text
Message reference:
Assigned subscription products:
Supported storefront locales:

Verified value the subscriber still receives:
Verified consequence when access ends:
Upcoming content or feature, if already committed:

Primary message:
Image purpose, if any:
Retention offers and eligibility, if any:
Fallback for subscribers who are not offer-eligible:

Sandbox cases:
Production verification owner:
First analytics review:
Downstream review:
Decision: keep | revise | remove | insufficient evidence
```

The non-offer version matters even when you intend to use a discount. Apple shows the image and text when no offer is associated or when the subscriber is not eligible for an associated offer. The header and body are shared across those cases, so Apple explicitly prohibits specific prices, discounts, or offer promises in that text.

A stronger brief separates four claims:

1. **Current value:** a feature or service the subscriber can use now.
2. **Loss of access:** a factual consequence after the paid entitlement ends.
3. **Future value:** content that is genuinely scheduled, not an aspirational roadmap item.
4. **Incentive:** an eligible offer whose terms Apple renders separately.

For example, “Keep access to unlimited project exports” is testable if the subscription actually controls that entitlement. “Your work will be unsafe without Premium” is coercive and unverifiable. Apple’s [content guidance for retention messages](https://developer.apple.com/help/app-store-connect/manage-subscriptions/configure-retention-messages/) rejects offer references in shared text and discourages unsupported superlatives, statistics, and fear-based claims.

## Step 1: Create and localize the message

The Account Holder, Admin, App Manager, or Marketing role can configure retention messages. Follow Apple’s current setup path:

1. In App Store Connect, open **Apps** and select the app.
2. Under **Monetization**, select **Subscriptions**.
3. Find **Retention Messaging**, then choose the add button or **Get Started**.
4. Enter a unique internal reference name and create the message.
5. Add the header and body in the app’s primary language.
6. Add a localization for each storefront language the assigned subscriptions support.
7. Save the draft and inspect the preview.

An app can have up to 10 retention messages. A message can cover any number of subscriptions, but a subscription can have only one assigned retention message at a time. Assigning it elsewhere removes it from the previous message when the change is saved.

Treat localization as product mapping rather than text replacement:

| Field | What to verify |
| --- | --- |
| Header | The main value is true for that locale and subscription |
| Body | Features, content, and loss-of-access claims match the localized product |
| Subscription | The message fits that plan’s actual entitlement |
| Offer | The storefront, price, duration, and eligibility are available |
| Support | Localized help can explain the resulting subscription state |

If a feature or content catalog varies by country, one translated universal claim may still be inaccurate. Use locale-specific copy within the assigned message where that solves the difference. If storefronts sharing a localization receive different value, make the claim universally true; a subscription cannot use separate messages by country.

## Step 2: Add an image only when it explains the value

An image is optional. In App Store Connect, choose one from Asset Library or upload an accepted image at **3840 × 2160** or **5244 × 2950** pixels.

Use it to make the retained value concrete: the relevant content collection, a finished premium workflow, or an accurate product experience. Avoid a decorative screenshot that repeats the app icon or implies a feature the subscriber does not receive.

Remember the branch:

```text
Subscriber eligible for an associated retention offer
→ text plus offer

Subscriber not eligible, or no offer is associated
→ text plus image, when supplied

No image and no eligible offer
→ text only
```

The offer replaces the image for an eligible subscriber. Previewing only the image card leaves the most consequential branch unchecked.

## Step 3: Attach subscriptions and optional retention offers

On the message detail page, add the subscriptions that should use it. If a monthly and annual product promise the same benefits, one message may suit both. If the value or cancellation consequence differs, use separate messages rather than writing vague copy.

A retention offer is a discounted or free period configured for a particular subscription. App Store Connect asks for:

- an immutable reference name and offer identifier;
- minimum paid-subscription duration;
- an optional wait before the same offer can be redeemed again;
- countries or regions;
- **Pay as you go**, **Pay up front**, or **Free**;
- duration and storefront prices.

Apple allows up to 10 retention offers for each subscription billing-plan type and lets you associate up to all 10 with one message. That is a technical ceiling, not a useful campaign target. Every extra offer creates another eligibility, pricing, renewal, support, and measurement path.

The wait is per offer, not across the subscription. A subscriber who qualifies for another associated offer may receive it without waiting for the first offer’s repeat interval. Audit overlapping eligibility before treating a wait as a global frequency cap.

Use the [promotional-offer guide](/blog/app-store-promotional-offers/) for the separate, server-signed mechanism used by the real-time API. App Store Connect messages use retention offers, while real-time responses can use promotional offers. One selected message and, when applicable, one offer appears on the cancellation screen.

## Step 4: Preview every customer-visible branch

App Store Connect’s preview can switch between card and device views, select a subscription, and show each offer or the no-offer case. Build a preview receipt instead of approving the most attractive card:

```text
Message version:
Locale:
Subscription:
Offer case: none | offer identifier
Device preview:

Header and body fit:
Product claim verified:
Price and duration rendered by Apple:
Standard renewal terms understood:
Image or offer is correct:
Reviewed by:
Reviewed at:
```

At minimum, inspect:

- every supported locale;
- each assigned subscription whose benefits differ;
- the no-offer state;
- every materially different offer type;
- both available device previews;
- long translations and accessibility of the image’s meaning.

Do not put offer details into the message text to compensate for a confusing preview. Fix the offer configuration or remove the association.

## Step 5: Submit the message to App Review

When the draft is ready, choose **Add for Review**, add the item to a submission, and send that submission to App Review. “Ready for Review” means the message is in a submission but has not yet been sent; it is not live.

Apple’s [retention-message status reference](https://developer.apple.com/help/app-store-connect/reference/in-app-purchases-and-subscriptions/retention-message-statuses) distinguishes preparation, submission, review, rejection, acceptance, and approval. An **Accepted** message can still wait if another item in the same submission was rejected. **Approved** is the live state.

Editing an approved message creates a draft alongside the published version. The live version continues during editing and review, while Sandbox testers see the newest draft regardless of review status. Once the replacement is approved, it becomes live and cannot be rolled back to the prior version.

Keep the previous copy and configuration in your release record before starting an edit. App Store Connect preserves service continuity, not your rollback artifact.

## Step 6: Test the cancellation flow in Sandbox

Preview checks layout; Sandbox checks behavior. Use a Sandbox Apple Account with the intended subscription state, initiate cancellation, and verify the full confirmation screen.

Run this matrix:

| Case | Expected result |
| --- | --- |
| Assigned subscription, no eligible offer | Correct text and optional image |
| Assigned subscription, eligible offer | Correct offer replaces the image |
| Different assigned product | Product-appropriate message and offer |
| Unsupported or fallback locale | Expected localization rather than broken or misleading copy |
| Customer keeps the subscription | Auto-renew remains on and entitlement does not change |
| Customer continues canceling | Auto-renew turns off; access follows the paid-through date and verified entitlement |
| Customer redeems a retention offer | Signed transaction and renewal information contain the expected offer details |
| Offer purchase is interrupted or fails | No unsupported entitlement or success state |
| Draft exists beside an approved message | Sandbox shows the draft; production remains on the approved version |

Apple identifies a redeemed retention offer with `offerType` value `5` in signed transaction and renewal information. Treat that field as transaction evidence, not as permission to bypass normal StoreKit verification.

Also test the support explanation. A “Save” in Apple’s analytics can include someone navigating away without canceling, not only a completed offer transaction. Support should diagnose the customer’s current verified subscription state rather than infer it from what the customer remembers tapping.

## Step 7: Roll out with a message-level decision record

Record the exact approval and launch time, assigned products, localizations, offer identifiers, and other subscription or product changes happening nearby. Without that record, a later save-rate movement is difficult to interpret.

Use two review windows:

1. **Operational review:** confirm the approved message appears for intended products and locales, offers render correctly, and support sees no entitlement or pricing defects.
2. **Outcome review:** wait long enough to observe offer completion, paid conversion, renewal, voluntary churn, and support effects.

If the message is inaccurate, remove the affected subscription assignment or replace the content through the supported review process. Do not promise an instant production text rollback: approved edits require a new version and App Review.

## Use real-time Retention Messaging only with a complete fallback

Apple’s [Retention Messaging API](https://developer.apple.com/documentation/retentionmessaging) can upload messages and images for Apple to approve, configure approved defaults by product and locale, and let your server choose an approved message in real time. The request contains a signed payload with values including the product ID, locale, and original transaction ID.

A production endpoint must:

1. verify the JWS signature before trusting the request;
2. map only to approved message identifiers;
3. return a valid response with HTTP `200`;
4. respond within 700 milliseconds;
5. sign promotional offers when returning that message type;
6. limit switch-plan suggestions to a product in the same subscription group;
7. pass Apple’s Sandbox performance test before its production URL can be configured.

Design the fallback ladder first:

```text
Valid real-time response
→ selected API message, promotional offer, or switch plan

Endpoint timeout, error, or malformed response
→ message and eligible retention offer assigned in App Store Connect

No App Store Connect message for the subscription
→ API default message for the product and locale

No exact-locale default
→ next most relevant configured default
```

The default API path supports text messages with optional images or bullet points. Promotional-offer and switch-plan messages require the real-time response. Configure a default for every product and locale you intend to serve, but also keep App Store Connect Retention Messaging assigned because it is the first documented fallback.

Real-time Retention Messaging is not a reason to send arbitrary customer history into the response logic. Define the minimum verified inputs required for each message, keep the rule auditable, and return a general message when the evidence is incomplete.

## Measure a save without calling it durable retention

Apple’s [Subscriptions analytics documentation](https://developer.apple.com/help/app-store-connect-analytics/monetization/subscriptions/) defines four immediate metrics:

| Metric | Apple’s definition |
| --- | --- |
| Cancellation Screen Views | Times the cancellation screen was presented after a subscriber initiated cancellation |
| Saves | Times the subscription was retained after that screen, including offer redemption, plan switching, or leaving without canceling |
| Cancellations | Times the subscriber proceeded to turn off auto-renew |
| Save Rate | `1 − (Cancellations ÷ Cancellation Screen Views)` |

A Save is a cancellation-screen outcome. Apple notes that it is counted whether or not a payment or transaction eventually succeeds. It is not proof of a completed offer, future renewal, or lasting satisfaction.

Review a fuller funnel:

```text
Cancellation Screen Views
→ Saves by type: Don't Cancel | Redeem Offer | Switch Plan
→ successful offer transaction or plan change, when applicable
→ active paid subscription after the message
→ offer-to-paid conversion
→ renewal
→ later voluntary churn
```

Segment by message, message type, subscription, offer, territory, and device before comparing results. Keep raw counts beside rates, and compare complete periods. A message shown only to an annual plan should not be judged against a monthly-plan message without accounting for different customers and renewal timing.

Apple’s reported averages from WWDC26 are not a forecast for a particular app. Product value, cancellation reasons, audience, offer economics, and sample size all differ. Set a local baseline and preserve neutral or negative results.

The broader [App Store Connect analytics guide](/blog/app-store-connect-analytics/) explains how to compare mature periods and avoid turning correlation into causation.

## Where LaunchBuddy fits

App Store Connect remains authoritative for retention-message text, images, subscription assignment, offers, App Review state, Sandbox behavior, and Retention Messaging analytics. The Retention Messaging API and your server own any real-time selection. StoreKit owns subscription transactions and entitlement evidence.

LaunchBuddy does not configure, submit, serve, test, or report on retention messages. It can organize the surrounding work: copy verification, localization, offer QA, Sandbox cases, approval checks, support preparation, and review dates can stay with the app and release.

Release planning, taskboards, default App Store submission checklists, and iCloud sync are available on the Free plan within its two-app, two-release, and limited project-note boundaries. LaunchBuddy Pro adds custom checklists and unlimited apps, releases, and notes. With App Store Connect API credentials, Pro can show selected subscription metrics, but it does not reproduce Apple’s Retention Messaging dashboard or event reports.

If Retention Messaging is part of your next subscription update, add its copy, Sandbox, approval, and post-launch evidence gates to your [App Store Connect release checklist](/blog/app-store-connect-release-checklist/), then <a href="https://apple.co/3iFcjjW">download LaunchBuddy to keep those tasks with the release</a>.
