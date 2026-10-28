---
title: "App Store Promotional Offers: Setup and Signing Guide"
description: "Set up App Store promotional offers, protect the signing key, authorize the right subscribers, test StoreKit, and measure paid retention."
pubDate: 2026-10-28
---

**To create an App Store promotional offer, add it to an auto-renewable subscription in App Store Connect, choose Free, Pay As You Go, or Pay Up Front, then implement an in-app purchase flow backed by a server-generated offer signature. Promotional offers are for existing or previously subscribed customers. Your app decides when to present one, but a verified StoreKit transaction—not the visible discount or a successful signature request—must control access.**

This mechanism is useful when you want to offer a specific subscriber a temporary price without distributing a code. It also creates more implementation work than a setting in App Store Connect: you need an In-App Purchase key, a secure signing service, customer authorization rules, StoreKit handling, and a measurement plan.

## Choose a promotional offer only when its delivery model fits

Apple has several subscription discount mechanisms. Start with the customer state and redemption path:

| Mechanism | Intended customer | How the customer receives it | Main control point |
| --- | --- | --- | --- |
| Introductory offer | New to the subscription group | Eligible pricing is attached to the initial subscription | Subscription-group eligibility |
| Promotional offer | Existing or previously subscribed | Your app presents a signed in-app offer | Your presentation and server authorization |
| Offer code | New, existing, or expired, according to configuration | Customer receives and redeems a code or URL | Code eligibility and distribution |
| Win-back offer | Eligible lapsed subscriber | Apple or your app can present the configured offer | Apple's lapse and eligibility rules |
| Retention offer | Subscriber in Apple's cancellation flow | App Store Connect Retention Messaging presents a configured message and eligible retention offer | App Store eligibility rules and automatic offer selection |

Use the [introductory-offers guide](/blog/app-store-introductory-offers/) for first-subscription pricing, the [subscription offer-code workflow](/blog/app-store-subscription-offer-codes/) when the customer needs a code, and the [win-back guide](/blog/app-store-win-back-offers/) when Apple's lapsed-subscriber eligibility and discovery surfaces fit the campaign.

A promotional offer is the better match when:

1. The customer already subscribes or previously subscribed.
2. You need app-controlled merchandising or, when approved for real-time Retention Messaging, server-controlled selection in Apple's cancellation flow.
3. You can securely authorize and sign each purchase attempt on a server.

Use a retention offer with App Store Connect Retention Messaging when the intervention belongs in Apple's cancellation flow and you want the App Store to choose among eligible offers automatically. Apple says this mode is rolling out to all developers. The separate [real-time Retention Messaging](https://developer.apple.com/documentation/retentionmessaging) path is access-gated, requires passing a Sandbox performance test before production, and can return a signed promotional offer rather than a retention offer. Use a win-back offer when Apple's lapsed-subscriber eligibility and discovery surfaces fit the campaign.

Completing an introductory offer doesn't by itself disqualify a customer from a promotional offer. However, “Apple permits this customer state” and “this customer belongs in our campaign” are different decisions. Define the latter before generating signatures.

## Write the authorization policy before configuring a discount

Avoid a rule such as “show a discount when someone looks likely to cancel.” It can't be tested or audited. Write one bounded policy:

```text
Campaign reference:
Subscription product and group:
Offer identifier:

Target state: Active | previously subscribed
Required prior product or service level:
Required account or transaction evidence:
Exclusions:

Reason this customer may benefit:
Offer type, duration, and price:
Standard renewal price and period:

Presentation location:
Campaign start and stop:
Policy for repeat authorization requests:
Support owner:

Primary result:
Guardrails:
First review:
Mature-cohort review:
Decision: Continue | revise | stop | insufficient evidence
```

For example, an upgrade campaign might target active monthly subscribers who have reached a documented plan limit and offer a discounted period on a higher-ranked subscription. A reactivation campaign might target former annual subscribers after a product improvement relevant to why they left. Neither policy should collapse into “anyone who asks the signing endpoint.”

The authorization record adds value beyond the App Store Connect form. It explains why the server approved a signature, which customer state was expected, and what later evidence should determine whether the offer continues.

## Step 1: Configure the promotional offer in App Store Connect

The Account Holder, Admin, App Manager, or Marketing role can create a promotional offer. Follow Apple's current [promotional-offer setup](https://developer.apple.com/help/app-store-connect/manage-subscriptions/set-up-promotional-offers-for-auto-renewable-subscriptions/):

1. In **Apps**, select the app.
2. Select **Subscriptions** in the sidebar.
3. Open the subscription group, then the auto-renewable subscription.
4. In **Subscription Prices**, select the add button.
5. Choose **Create Promotional Offer**.
6. Enter an internal reference name and a unique, case-sensitive offer identifier.
7. Choose **Pay As You Go**, **Pay Up Front**, or **Free**.
8. Select the duration and base price.
9. Review the comparable storefront prices and make any deliberate price adjustments.
10. Verify the complete offer, then confirm it.

Apple allows up to 10 active promotional offers per subscription. That ceiling isn't a campaign target. Every active offer adds another identifier, price path, server rule, test case, and support branch.

Two configuration constraints deserve a pre-confirmation check:

- Promotional offers apply everywhere the subscription is available. You can't restrict the offer configuration to selected countries or regions, although you can adjust storefront prices.
- After creation, only the price can be edited. Changing the type, duration, or identifier requires a new offer, and a deleted identifier can't be reused.

Use durable names such as `annual-upgrade-q4-2026`, not `special-offer`. Save a configuration record containing the product ID, offer ID, type, duration, storefront prices, standard renewal terms, reviewer, and confirmation time.

Promotional offers don't appear on the App Store product page. Your app determines when to present them through StoreKit, which makes the signing boundary part of the product behavior rather than backend plumbing.

## Step 2: Generate an In-App Purchase key and keep it server-side

Promotional-offer signing uses an **In-App Purchase key**. This isn't the same credential as an App Store Connect API key used by reporting or release tools.

An Account Holder or Admin can follow Apple's [In-App Purchase key instructions](https://developer.apple.com/help/app-store-connect/configure-in-app-purchase-settings/generate-keys-for-in-app-purchases/):

1. Open **Users and Access**.
2. Select **Integrations**.
3. Under **Keys**, choose **In-App Purchase**.
4. Generate and name the key.
5. Download the private key once and move it into a production secret store.

Record the key ID and which signing service uses it. Never put the private key in the app bundle, source control, an analytics event, a support ticket, or a release-planning note. If it is lost or compromised, revoke it and update the offers that rely on it.

Apple's current compact-JWS path uses `PromotionalOfferV2SignatureCreator` in the App Store Server Libraries. Initialize it with the app's bundle ID, private signing key, key ID, and issuer ID, then create a signature for the subscription product ID and promotional-offer ID. The transaction ID is optional, but Apple recommends supplying the `appTransactionID` or another transaction ID that belongs to the customer. Return only the compact JWS to the app.

Apple's [WWDC25 StoreKit guidance](https://developer.apple.com/videos/play/wwdc2025/241/) says the compact-JWS promotional-offer purchase option is back-deployed to iOS 15. If the app still supports earlier systems on which promotional offers are available, document and test Apple's legacy key-ID, nonce, signature, and timestamp path separately.

```text
Authenticated request: campaign reference
Server derives: product ID and offer ID
Server checks: subscription state, campaign dates, exclusions, prior authorization
Signer inputs: bundle ID, issuer ID, key ID, product ID, offer ID, optional customer transaction ID
Response: compact JWS
Client: match the offer ID, attach the JWS to the purchase, and verify the resulting transaction
```

## Step 3: Make the server authorize, not merely sign

A signing endpoint that accepts arbitrary product and offer IDs from the app and signs them is not an eligibility system. Treat the app request as untrusted input.

A safer flow is:

1. The app authenticates the customer to your service.
2. The server loads the campaign policy by an allowlisted product and offer ID.
3. The server evaluates verified subscription history, current state, campaign dates, prior redemption policy, and any account exclusions.
4. If the request qualifies, the server generates the promotional-offer signature.
5. The app passes the signed offer to StoreKit with the intended subscription purchase.
6. The app grants service only after receiving and verifying the transaction.
7. The server records a non-secret authorization log entry for support and campaign analysis.

Keep the log narrow:

```text
Campaign and policy version:
Account reference:
Product and offer ID:
Authorization result:
Reason code:
Signature requested at:
Purchase transaction observed:
Entitlement result:
```

Don't log the private key or raw signing payload as a debugging shortcut. Also avoid making a button tap, signature response, or StoreKit sheet presentation unlock the subscription. Each only proves that the customer reached a step in the flow.

Apple's [legacy promotional-offer signature guidance](https://developer.apple.com/documentation/storekit/generating-a-promotional-offer-signature-on-the-server) and current App Store Server Library should remain the implementation sources of truth. Copying a signing sample without checking its format and OS availability can produce a flow that looks correct in the UI but fails at purchase time.

## Step 4: Test policy, signing, purchase, and entitlement separately

Use StoreKit Testing in Xcode for repeatable local states, then Sandbox for the App Store-backed product and offer. Apple notes that product-metadata changes can take up to one hour to appear in Sandbox, so record the configuration time before diagnosing an immediate miss as a code defect.

Run at least this matrix:

| Case | Expected result |
| --- | --- |
| Intended active subscriber | Offer is presented and the server authorizes the configured product-offer pair |
| Intended former subscriber | Offer appears only when the reactivation policy is met |
| Never-subscribed customer | No promotional-offer path |
| Subscriber outside the campaign rule | Signing request is denied with a supportable reason |
| Client substitutes another offer or product ID | Server rejects the pair |
| Signing service is unavailable | No discounted purchase or entitlement change; show a full-price path only if it is intentionally supported |
| Customer cancels the purchase sheet | No entitlement change |
| Purchase is interrupted or pending | Access waits for verified transaction state |
| Signed purchase succeeds | Correct entitlement is granted once |
| App relaunches or another supported device restores | Current verified entitlement resolves consistently |
| Offer period ends | StoreKit reports the correct post-offer renewal state and price; cancellation, billing state, and any later subscription-price change are handled correctly |
| Minimum supported OS | Compact-JWS purchase works on iOS 15 or later; the legacy signature path is tested if earlier supported systems remain |

Because the offer configuration follows every storefront where the subscription is available, test the localized price and renewal terms in at least the priority storefronts. Your server may limit who receives a signature, but that doesn't turn the underlying App Store Connect offer into a territory-scoped configuration.

Test the exact campaign entry point as well. A paywall, account screen, and in-app renewal prompt create different context and support expectations even when they request the same offer.

## Step 5: Launch with a server-side stop control

Before launch:

- compare the live configuration with the configuration record;
- deploy the authorization policy before exposing the entry point;
- verify the private key is available only to the signing service;
- complete one authorized and one denied Sandbox path;
- confirm the standard renewal terms are clear;
- prepare support reason codes without exposing sensitive account data;
- save a baseline for the intended cohort;
- name the person who can stop signature authorization.

Use the backend campaign window as the first stop control. If the terms, audience, or product experience are wrong, stop authorizing new signatures while you investigate. Don't rely only on shipping another app version.

Preserve the incident time, affected policy version, purchase evidence, and customer response. Stopping new authorizations doesn't undo completed transactions, so customer access must continue to follow verified StoreKit state.

## Step 6: Measure paid retention, not signature volume

A signature request is an operational event, not a successful subscription outcome. Use this funnel:

```text
Customers meeting the campaign policy
→ offer presentations
→ authorized signature requests
→ completed promotional-offer purchases
→ active offer periods
→ paid renewals
→ later retention or churn
```

Keep the denominators visible. A server can count authorization results, but that doesn't reveal every in-app impression. A completed offer purchase isn't yet a standard-price renewal, and a renewal doesn't prove the discount caused long-term retention.

Apple's [Offers dashboard](https://developer.apple.com/help/app-store-connect-analytics/monetization/offers) supports promotional-offer analysis using offer volume, conversion to paid subscriptions, lifecycle events, churn, billing status, territory, and acquisition source. Filter by the offer identifier and compare complete, equally mature cohorts.

Use a decision record:

```text
Offer and policy version:
Review period:
Target customer state:

Presentations, if measured:
Authorizations and denials:
Completed offer purchases:
Paid conversions and renewals:
Later churn:
Billing, entitlement, or support failures:

Other product, price, or marketing changes:
What the evidence supports:
What it does not prove:
Decision: Continue | revise | stop | insufficient evidence
Next review:
```

The broader [App Store Connect analytics guide](/blog/app-store-connect-analytics/) explains how to preserve metric definitions, comparison windows, and competing explanations. For a low-volume app, keep raw counts beside rates and wait for the renewal event being judged.

## Where LaunchBuddy fits

Keep promotional-offer configuration in App Store Connect, signing-key management and authorization on your server, and purchase and entitlement verification in StoreKit. Apple's Offers dashboard remains the source for offer-level analysis.

LaunchBuddy can organize the surrounding release work: the campaign policy, implementation tasks, StoreKit test matrix, launch checks, support review, and decision date can stay with the relevant app and release. Release planning, taskboards, default submission checklists, and iCloud sync are available on the Free plan within its two-app, two-release, and project-note limits. Pro adds unlimited apps, releases, and notes plus custom checklists.

With App Store Connect API credentials, LaunchBuddy Pro can show selected downloads, revenue, and subscription metrics. Those credentials are separate from the In-App Purchase key used by your signing service, and LaunchBuddy doesn't replace Apple's offer configuration or offer-level dashboard. Keep private signing material out of project notes.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy and keep your promotional-offer implementation, test, and launch checks with the release plan</a>.
