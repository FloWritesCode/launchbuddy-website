---
title: "How to Test Interrupted Purchases in Sandbox"
description: "Test an interrupted In-App Purchase with one Sandbox Apple Account, verify the resumed transaction, cover relaunches, and reset the tester safely."
pubDate: 2026-10-31
---

**To test interrupted purchases in Sandbox, enable “Interrupt Purchases for This Tester” for one Sandbox Apple Account in App Store Connect, sign in with that account on an iOS 14 or later test device, and start a purchase. Authenticate the payment sheet, complete the Terms & Conditions action outside your app, then verify that your app processes the resulting successful transaction and grants the product exactly once.**

Finish by testing a relaunch, recording the transaction and entitlement evidence, and disabling the interruption setting if it remains enabled. Don’t clear purchase history just to reset this flag; those are separate controls.

## Know which interruption you are testing

Apple defines an interrupted purchase as a transaction that can’t finish until the customer performs an action outside the app, such as accepting updated terms or fixing an expired payment method. Sandbox simulates that account-level detour with a per-tester setting.

This is different from:

- canceling the payment sheet yourself;
- making every purchase fail by disabling purchases and renewals;
- simulating an interrupted purchase with a local StoreKit configuration in Xcode; or
- losing the network during a purchase.

If you only need a fast local state-machine test, start with the [StoreKit Testing vs Sandbox comparison](/blog/storekit-testing-vs-sandbox/). The workflow below uses Apple’s Sandbox infrastructure and a Sandbox Apple Account.

## Prepare one reproducible test contract

Use a dedicated tester for the interruption scenario. Reusing an account with unknown purchase history makes it harder to tell whether the app handled the interrupted transaction or restored an older entitlement.

If you don’t have a tester yet, follow the [Sandbox Apple Account setup guide](/blog/create-sandbox-apple-account/). Keep its password and full email address in an appropriate credential manager, not in a release task or test report.

Before changing the account, write down:

```text
App version and build:
Install source: Xcode | TestFlight
Device and iOS version:
Product ID:
Product type:
Sandbox tester label:
Storefront:

Starting entitlement:
Expected result while interrupted:
Expected result after completion:
Expected result after relaunch:
Client transaction evidence:
Server evidence, if applicable:
```

Choose one product and one observable entitlement. “Purchase succeeds” is too vague. A stronger assertion is: “After a verified transaction for `com.example.export.forever`, Export unlocks once, remains locked before completion, and stays unlocked after relaunch.”

For a development-signed app, make sure the Run scheme isn’t using a StoreKit configuration file when the goal is a Sandbox test. For a TestFlight build, purchases already use Sandbox, but you still need the controlled Sandbox Apple Account for this per-tester interruption setting. The [TestFlight purchase-testing guide](/blog/test-subscriptions-in-app-purchases-testflight/) covers the correct account sign-in path and build-specific checks.

## 1. Enable interrupted purchases for one tester

Apple’s current [Sandbox account settings instructions](https://developer.apple.com/help/app-store-connect/test-in-app-purchases/manage-sandbox-apple-account-settings/) require the Account Holder, Admin, App Manager, or Developer role.

In App Store Connect:

1. Open **Users and Access**.
2. Select **Sandbox**.
3. Select the Sandbox Apple Account reserved for this test.
4. Enable **Interrupt Purchases for This Tester**.
5. Save the change.

Record the tester label, operator, and time. Don’t enable the setting on an entire account roster. Apple applies it to every on-device purchase attempt made by that tester until the tester agrees to the presented terms on the device or you disable the option.

You can also enable or disable interruption from that tester’s iOS Sandbox Account Settings. Whichever route you use, confirm the final state before beginning instead of assuming a previous run left the account ready.

## 2. Trigger the interrupted purchase

On an iOS 14 or later test device:

1. Sign in with the prepared Sandbox Apple Account.
2. Open the exact app version and build in the test contract.
3. Confirm that the intended product ID loads for the tester’s storefront.
4. Select **Buy** or **Subscribe**.
5. Authenticate the Sandbox payment sheet.
6. Observe the interruption and the system’s Terms & Conditions step.

At the interruption checkpoint, the app must not grant the paid entitlement. Save what the customer can actually see: the app screen, any safe diagnostic message, the product ID, and a timestamp. Don’t treat an expected Sandbox interruption as an ordinary payment failure and tell the tester to buy again.

Apple’s [interrupted-purchase test sequence](https://developer.apple.com/documentation/storekit/testing-an-interrupted-purchase) describes the Original In-App Purchase API in precise transaction states: the queue first reports `purchasing`, then `failed`; after the tester accepts the terms, a new `purchased` transaction arrives for the same product identifier and quantity. In that API, the app finishes the failed transaction to remove it from the queue.

If your app uses StoreKit 2, don’t copy those Original API state names into assertions that your implementation never exposes. Test the same customer-visible contract with the StoreKit 2 purchase result, verified transactions, and entitlement logic your app actually uses.

## 3. Complete the action outside the app

Accept the Terms & Conditions shown by the system. This is the simulated out-of-app action that resolves the interruption.

Now verify a second, distinct checkpoint:

1. The app receives the completed transaction through its implemented StoreKit path.
2. The transaction is verified before access changes.
3. The product ID matches the product in the test contract.
4. The intended service, content, or quantity is granted once.
5. The app finishes the transaction only after delivering the purchase.
6. Any tested server-backed entitlement converges on the same result.

Keep “transaction arrived” and “entitlement is correct” as separate assertions. A transaction can be delivered while the app still unlocks the wrong tier, adds a consumable twice, or leaves a paid feature locked.

The resumed purchase is also an idempotency test. Compare the entitlement immediately before interruption, after the initial failed attempt, and after completion. The completed transaction should cause one valid state transition, not one grant for the original attempt and another for the resumed purchase.

## 4. Add a relaunch variant

Apple’s shortest documented sequence keeps the app available while the tester accepts the terms. A release-ready plan should add a relaunch variant because the completion can cross the app boundary.

Run these checkpoints as a separate test:

| Checkpoint | Expected observation |
| --- | --- |
| Before purchase | Starting entitlement matches the contract |
| After interruption | No new entitlement |
| After closing and relaunching before resolution | Still no new entitlement |
| After accepting the terms | A completed transaction is processed once |
| After another relaunch | The entitlement matches the verified purchase state |

For StoreKit 2, Apple says to start the `Transaction.updates` listener as soon as the app launches; unfinished transactions are delivered to that listener once after launch. The listener is for receiving and processing transaction updates, not a replacement for checking the customer’s current entitlements. Test the launch behavior your implementation relies on rather than assuming an in-memory purchase callback will survive termination.

For the Original API, install the payment-queue observer when the app launches and verify the purchased transaction reaches that observer. In either API, save the evidence your app or server uses to decide access. The Sandbox tester flag alone doesn’t prove the app handled the completion.

## 5. Reset the tester without erasing unrelated evidence

After the run, open the tester in App Store Connect and inspect **Interrupt Purchases for This Tester**.

- If it is still selected, deselect it and save.
- If accepting the terms already ended the interruption, record that observed final state.
- Run a normal Sandbox purchase only if the product’s purchase rules and your test plan make that repeat valid.

Disabling interruption and clearing purchase history are not interchangeable. The first changes the next purchase scenario. The second deletes the tester’s past Sandbox purchases, can’t be reversed, and may take longer for accounts with many purchases.

For a consumable, another test purchase may be possible without clearing history. A non-consumable or subscription may require a different prepared account state or a deliberate history reset before a true first-purchase rerun. Decide from the product contract, not from a desire to make the tester look “clean.”

## Use an interruption evidence record

A compact record makes failures comparable across builds:

```text
Scenario: Sandbox interrupted purchase
App version / build:
Install source:
Device / iOS:
Product ID / type:
Tester label / storefront:

Interruption enabled at:
Purchase authenticated at:
Observed before completion:
Entitlement before completion:

Terms accepted at:
Completed transaction observed at:
Verified product and quantity:
Entitlement after completion:
Duplicate grant check:

Relaunch result:
Server result, if applicable:
Interruption setting after test:
Purchase history changed: No | Yes, reason:

Result: Pass | Blocked | Fail
Follow-up owner:
```

Leave passwords, full Sandbox account addresses, private keys, raw receipts, and unnecessary personal data out of this record. Link to protected diagnostics when a failure needs deeper evidence.

## Diagnose the first broken checkpoint

Change one layer at a time:

| Observation | Check next |
| --- | --- |
| Purchase isn’t interrupted | Confirm iOS 14 or later, the signed-in Sandbox tester, the saved per-tester flag, and that the app is using Sandbox rather than a local StoreKit configuration |
| Product doesn’t load | Diagnose product ID, App Store Connect setup, signing, storefront, agreements, and propagation before debugging interruption |
| App grants access before terms are accepted | Inspect the entitlement gate; an attempted or failed transaction isn’t purchase evidence |
| Terms are accepted but access doesn’t change | Check completed transaction delivery, verification, product mapping, server environment, and transaction finishing |
| Completion works only while the app stays open | Check observer or listener startup and unfinished-transaction processing at launch |
| The same purchase grants twice | Inspect idempotency around the failed attempt, resumed completion, and server processing |
| Later purchases keep interrupting | Recheck the tester’s current interruption setting and whether the terms action actually completed |

Preserve the original build, product ID, tester, and timestamps while investigating. Switching accounts, clearing history, and editing the product at the same time replaces one reproducible failure with several unknowns.

## Track the release gate in LaunchBuddy

LaunchBuddy can hold the scenario as version-scoped release tasks:

```text
Enable interruption for SBX-US-INTERRUPTED
Verify no entitlement before terms acceptance
Complete terms and verify one grant
Relaunch and verify durable access
Reset tester and record the evidence result
```

Release planning, taskboards, and default App Store submission checklists are available on the Free plan within its two-app and two-release limits. A reusable custom checklist requires Pro.

LaunchBuddy doesn’t manage Sandbox Apple Accounts, run StoreKit transactions, inspect receipts, validate entitlements, or decide whether the test passed. App Store Connect, StoreKit, the tested app, and its server remain authoritative. Use LaunchBuddy to track the scenario as version-scoped release tasks, while keeping transaction and entitlement evidence in the tested app or server diagnostics.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy and organize the interrupted-purchase checks for your next release</a>.
