---
title: "How to Test Subscriptions and In-App Purchases in TestFlight"
description: "Test subscriptions and In-App Purchases in TestFlight with the right build, account mode, product matrix, accelerated renewals, and entitlement evidence."
pubDate: 2026-10-05
---

**To test subscriptions and In-App Purchases in TestFlight, install the exact beta build, identify every product and entitlement you expect it to use, and run the purchase in that build. TestFlight apps automatically use Apple's sandbox environment, so these transactions don't create real charges.**

For an ordinary purchase, relaunch, and restore check, start without switching to a Sandbox Apple Account. Add a Sandbox Apple Account only when you need controlled conditions such as a different storefront, a clean purchase history, interrupted purchases, billing retry, or a custom subscription renewal rate.

That distinction matters. TestFlight has one default subscription clock; a Sandbox Apple Account can apply another. If the test record doesn't name the build, product ID, account mode, and expected entitlement, a result such as “the subscription expired too quickly” is almost impossible to interpret.

## Start with a build-specific purchase contract

Don't begin at the paywall. First freeze the facts for the beta you are about to test:

```text
App:
Version and build:
Install source: TestFlight
Client commit or release:
Server environment/version:

Product reference name:
Product ID:
Product type:
Storefront:

Starting account state:
Expected transaction:
Expected entitlement:
Expected UI after relaunch:
Restore or repurchase expectation:
```

Use the exact product IDs requested by the uploaded build, not names copied from a roadmap. Apple defines four product types: consumable, non-consumable, auto-renewable subscription, and non-renewing subscription. Each creates a different test obligation. The [In-App Purchase types guide](/blog/in-app-purchase-types/) explains the persistence and restoration boundaries if the product model is still unclear.

A single “IAP works” checkbox hides too much. Build a small matrix instead:

| Product type | Minimum TestFlight evidence |
| --- | --- |
| Consumable | Product loads, one purchase grants the correct quantity once, spending persists as designed, and another purchase adds the quantity once |
| Non-consumable | Product loads, purchase unlocks the feature, relaunch preserves access, and the app's restore or entitlement-refresh path recovers access |
| Auto-renewable subscription | Product loads, initial purchase grants the right tier, relaunch preserves access, renewals don't duplicate benefits, and expiration or another tested state removes or changes access correctly |
| Non-renewing subscription | Product loads, purchase grants the intended fixed period, relaunch preserves it, and verified transaction history produces the documented expiration and cross-device result |

The purchase sheet appearing is not the pass condition. The pass condition is the verified transaction producing the correct entitlement, once, across the state changes your app promises to support.

## Choose the right TestFlight account mode

Apple's [TestFlight purchase-testing documentation](https://developer.apple.com/help/app-store-connect/test-a-beta-version/testing-subscriptions-and-in-app-purchases-in-testflight/) separates two useful modes.

### Default TestFlight sandbox behavior

Every app installed from TestFlight automatically operates in sandbox. Use this mode first to answer:

- Confirm that this exact beta fetches the intended products.
- Check that a successful transaction unlocks only the intended entitlement.
- Cancel the purchase sheet and confirm that it grants nothing.
- Relaunch and check that the result persists.
- Run restore or entitlement refresh where the product type supports it.
- Compare the client with your server after a transaction, if access is server-backed.

This is the shortest path for internal or external testers. It also reduces setup mistakes because a tester doesn't need your private Sandbox Apple Account.

For auto-renewable subscriptions in this default TestFlight mode, Apple currently renews every duration once per day, up to six renewals within one week. After that sequence, auto-renewal is disabled. A one-month and a one-year test subscription therefore share the same TestFlight renewal interval; don't mistake that test clock for the production duration.

### TestFlight with a Sandbox Apple Account

Use a Sandbox Apple Account when the test requires a controlled state. Apple's [Sandbox account settings](https://developer.apple.com/help/app-store-connect/test-in-app-purchases/manage-sandbox-apple-account-settings/) support:

- changing the test storefront;
- selecting a subscription renewal-rate profile;
- enabling interrupted purchases;
- clearing sandbox purchase history; and
- creating Sandbox Test Families for eligible products.

Apple also says billing-retry and Billing Grace Period scenarios in TestFlight require a Sandbox Apple Account.

Download the beta from TestFlight while signed in with the production Apple Account that has access to it. Then sign out under **Media & Purchases**, not the device's iCloud account, and use the Sandbox sign-in under Developer settings.

Apple warns that signing out of Media & Purchases can remove access to purchased content in production apps, so prefer a dedicated test device. Signing back in under Media & Purchases makes TestFlight purchases use that production account again.

A Sandbox Apple Account can test only apps belonging to the developer account associated with that sandbox account. Don't give an external tester a Sandbox account and assume it will work against an unrelated team's app.

Label test accounts by purpose without placing passwords or full account addresses in a task:

```text
TF-DEFAULT-US-CLEAN
SBX-US-INTERRUPTED
SBX-GB-RENEWAL-FAST
SBX-US-BILLING-RETRY
```

Keep credentials in an appropriate private credential system. The release record needs the account's role and starting state, not its secret.

## Follow a seven-step TestFlight purchase test

### 1. Confirm the exact beta and products

Before device testing, confirm the Apple Developer Program membership and Paid Apps Agreement are active. Apple's [In-App Purchase configuration overview](https://developer.apple.com/help/app-store-connect/configure-in-app-purchase-settings/overview-for-configuring-in-app-purchases/) says the Account Holder must accept that agreement and provide banking and tax information to offer In-App Purchases.

In TestFlight, record the version and build before testing. In App Store Connect, verify the intended product IDs, types, storefront availability, and configuration. Confirm that the uploaded binary requests those same IDs. Apple notes that product-metadata changes can take up to one hour to appear in sandbox, so record the edit time before diagnosing an immediate mismatch.

If products don't load, capture the empty or error state before editing anything. Changing several identifiers, account settings, and product fields at once destroys the evidence needed to find the mismatch.

### 2. Give every row one starting state

Reuse of an account can make a test look successful for the wrong reason. A non-consumable may already be owned; a subscription may already be active; a consumable balance may come from an earlier run.

For each matrix row, record one of these:

```text
never purchased
active entitlement
expired entitlement
previously purchased; app reinstalled
purchase interrupted
billing retry
grace period
family-shared entitlement
```

Use only states relevant to that product and release. If you clear a Sandbox account's purchase history, note that Apple describes the action as irreversible for that sandbox history. It doesn't affect customer accounts, but it does erase the prior test baseline.

### 3. Test discovery before purchase

Before tapping Buy, verify:

- the expected product is returned;
- the displayed name and duration match the intended product;
- the app doesn't mix products from another environment or tier;
- unavailable or loading states don't grant access; and
- the paywall's promise agrees with the product type.

Save the product ID and storefront beside the observation. “Annual plan missing” is weaker evidence than “build 241 returned monthly ID `example.pro.monthly` but did not return annual ID `example.pro.annual` for the US sandbox storefront.”

### 4. Test the initial transaction and entitlement separately

Treat these as two checkpoints:

```text
Checkpoint A: StoreKit transaction completes or cancels.
Checkpoint B: The app derives the expected access from verified state.
```

After a successful purchase, check the paid feature rather than only the confirmation screen. Relaunch the app and refresh any server-backed account. If a server owns access, confirm that the client and server converge on the same entitlement without manually toggling an account flag.

Then cancel the purchase sheet before completion. No entitlement should be granted, and the app should return to a stable state. Don't record that user cancellation as a failed completed purchase.

If a server controls access, route TestFlight transactions through the sandbox side of the integration. Apple's App Store Server API has a separate sandbox base URL, and App Store Connect supports a separate Sandbox Server URL for notifications. Record the decoded environment with the transaction result so production and sandbox state aren't mixed.

### 5. Test persistence, restore, and repeat behavior by type

The next action depends on the product contract:

- For a **consumable**, spend part of the granted quantity, relaunch, and purchase again. Check the ledger rather than expecting StoreKit to restore a completed consumable.
- For a **non-consumable**, relaunch, reinstall where appropriate, and exercise the app's restore or current-entitlement path.
- For an **auto-renewable subscription**, verify the current tier after relaunch, renewal, and the expiration or billing state included in this release.
- For a **non-renewing subscription**, derive the fixed-term access period from verified transaction history, calculate expiration correctly, and verify the documented cross-device result. Don't infer automatic renewal behavior from the word “subscription.”

Use the same observable assertion at every checkpoint:

```text
Expected entitlement:
Actual entitlement:
Feature checked:
Transaction or state evidence:
Checked at:
```

This catches a common false positive: a receipt or server event exists, but the feature remains locked, unlocks the wrong tier, or grants twice.

### 6. Test subscription time without mixing clocks

Write the timing mode at the top of every subscription run.

**Default TestFlight mode**

```text
Expected interval: 1 day for every subscription duration
Maximum automatic renewals in the TestFlight sequence: 6
```

**Sandbox Apple Account mode**

```text
Selected renewal-rate profile:
Actual product duration:
Expected sandbox interval from Apple's current table:
Billing Retry length:
Billing Grace Period length:
```

Sandbox profiles are named around 3-minute, 5-minute, 30-minute, and 1-hour equalization settings, but the actual interval depends on the subscription's real duration. For example, the default profile maps a one-month product to five minutes and a one-year product to one hour. Apple says sandbox subscriptions renew up to 12 times before auto-renewal turns off on the thirteenth renewal attempt.

Don't put a timer in a task based only on the profile's name. Copy the interval for the actual product duration from Apple's current table, start the clock from the observed purchase or renewal, and save timestamps for the transaction and entitlement change.

Test disabling auto-renewal separately from canceling the purchase sheet. Turning off auto-renewal shouldn't revoke an already paid period: verify that access remains until the current sandbox period ends, then changes according to the verified entitlement state.

When the release changes billing-retry or grace handling, use the dedicated scenario controls and test access, warning UI, recovery, and eventual loss of access separately. The [Billing Grace Period testing guide](/blog/app-store-billing-grace-period/) covers that state model in detail.

### 7. Route a failure with evidence

Classify the first failed checkpoint before assigning the fix:

| Failure | Evidence to capture | Likely owner to investigate |
| --- | --- | --- |
| Product not returned | Build, product ID, storefront, account mode, StoreKit error | Product configuration or client integration |
| Purchase sheet is canceled, transaction fails, or purchase is interrupted | Exact step, account state, message/error, timestamp | Expected user cancellation, StoreKit flow, or intended sandbox scenario |
| Transaction succeeds but access is wrong | Verified transaction/state, expected tier, client result, server result | Entitlement logic or server synchronization |
| Renewal arrives but benefit duplicates | Original and renewal transaction evidence, balance/access before and after | Transaction idempotency |
| Restore doesn't recover access | Product type, purchase history, restore/refresh path, verified current state | Persistence, restore, or entitlement handling |
| Timing differs | TestFlight versus Sandbox-account mode, selected profile, product duration, timestamps | Test setup before product code |

Remove passwords, full account identifiers, payment details, and unnecessary personal data from screenshots or logs. The goal is a reproducible state transition, not a dump of the tester's account.

## Worked example: one subscription and one permanent unlock

Suppose version 4.2 build 241 contains:

```text
example.pro.monthly    auto-renewable subscription
example.export.forever non-consumable
```

Run the baseline with the default TestFlight behavior:

1. Confirm both IDs load in build 241.
2. Cancel the monthly purchase sheet before completion and verify neither entitlement appears.
3. Buy monthly and verify Pro access immediately and after relaunch.
4. Record the daily TestFlight renewal expectation and confirm a renewal doesn't create a second account benefit.
5. Disable monthly auto-renewal, verify Pro remains active for the current test period, and verify the entitlement after that period ends.
6. Buy the permanent export unlock from a clean test state.
7. Reinstall or otherwise exercise the documented restore path and verify only export access returns for that purchase.

Then use separate Sandbox Apple Accounts for separate questions:

- a clean US account with a selected renewal profile for subscription transitions;
- an interrupted-purchase account for the pending flow; and
- a previously purchased non-consumable account for restore.

Don't reuse the interrupted account for the “clean first purchase” row. Its state is part of the test input.

Send testers a build-specific brief rather than the whole internal matrix. The [TestFlight What to Test examples](/blog/testflight-what-to-test-examples/) include a purchase-and-restore template that asks for the failed step, displayed product, account state, and App Store message without requesting secrets.

## What TestFlight proves, and what it doesn't

A passing TestFlight run shows that a TestFlight-distributed beta can interact with Apple's sandbox infrastructure and that your client, plus any tested server path, handled the recorded sandbox states. It doesn't prove:

- that a production customer has the same account history;
- that every storefront or product is available in production;
- that accelerated subscription timing matches real calendar durations;
- that an untested refund, revocation, upgrade, downgrade, billing, or family state works; or
- that a green purchase sheet alone produced the correct durable entitlement.

Keep local StoreKit tests for fast, repeatable development checks. Use TestFlight for the uploaded build and App Store sandbox path. Production monitoring remains a separate release responsibility.

## Where LaunchBuddy fits

LaunchBuddy can represent each matrix row as a version-scoped task or checklist item attached to the release. Release planning, taskboards, default App Store submission checklists, and iCloud sync are available on the Free plan within its two-app and two-release limits. Pro adds custom reusable checklists and unlimited apps and releases.

LaunchBuddy doesn't run StoreKit tests, create or configure products, manage Sandbox Apple Accounts, inspect transactions, validate entitlements, distribute TestFlight builds, or prove a purchase passed. App Store Connect, TestFlight, StoreKit, and your app or server remain authoritative for those facts.

The useful LaunchBuddy pattern is one task per state transition: “build 241 monthly purchase,” “build 241 renewal is idempotent,” “build 241 non-consumable restore,” and “verify access after grace expires, including any other valid entitlement.” Keep authoritative evidence in the system where it was captured, and use LaunchBuddy to track the resulting pass, blocker, or follow-up work. The broader [TestFlight release management workflow](/blog/testflight-release-management/) shows how those results become release decisions.

Turn the matrix into version-scoped tasks, then <a href="https://apple.co/3iFcjjW">organize the purchase test in LaunchBuddy</a>.
