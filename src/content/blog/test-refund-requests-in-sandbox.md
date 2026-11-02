---
title: "How to Test Refund Requests in Sandbox"
description: "Test approved, declined, and prorated In-App Purchase refunds in Apple's Sandbox, then verify transaction, entitlement, server, and relaunch behavior."
pubDate: 2026-11-02
---

**To test a refund request in Apple's Sandbox, start from a completed test purchase and open your app's StoreKit refund-request sheet. Trigger an approved refund with an ordinary reason, a declined refund by entering `DECLINE` under Other, or a prorated refund by entering `GRANT_PRORATED`.**

Don't stop when the sheet closes. Verify the updated transaction, current entitlement, app UI, server notification, and relaunch result. A successful request only proves that Sandbox accepted the scenario; it doesn't prove that your app removed, retained, or adjusted access correctly.

This workflow assumes the app already presents Apple's refund-request sheet with a supported StoreKit API, such as `Transaction.beginRefundRequest(in:)` or SwiftUI's `refundRequestSheet`. App Store Connect doesn't supply that in-app entry point for you.

## Choose the environment from the outcome

Apple supports refund requests in both StoreKit Testing in Xcode and Sandbox, but the environments answer different questions.

| Question | StoreKit Testing in Xcode | Sandbox |
| --- | --- | --- |
| Does the in-app refund sheet open? | Yes | Yes |
| Does app logic react to an approved refund? | Yes | Yes |
| Can a test refund happen outside the app? | Yes, with Xcode's transaction manager or `SKTestSession` | Exercise the App Store path instead |
| Can you trigger Apple's documented `DECLINE` outcome? | Not the documented path | Yes |
| Can you trigger `GRANT_PRORATED` and inspect proration data? | Not the documented path | Yes |
| Can a Sandbox App Store Server Notifications V2 endpoint receive the result? | No | Yes |

Start locally when you're testing entitlement code or UI. Move the approved, declined, and prorated release paths to Sandbox when you need App Store infrastructure, server notifications, or Apple's proration behavior. The [StoreKit Testing vs Sandbox guide](/blog/storekit-testing-vs-sandbox/) explains this proof boundary in more detail.

## Define the refund contract before testing

Use one known transaction and one observable entitlement for each run. “Refund works” hides the checkpoints needed to diagnose a failure.

```text
App version and build:
Environment: Xcode | Sandbox | TestFlight Sandbox
Product ID and type:
Transaction ID:
Sandbox tester label and storefront:
Refund outcome: approved | declined | prorated

Entitlement before request:
Expected transaction result:
Expected entitlement after result:
Expected app UI:
Expected server notification:
Expected result after relaunch:
```

Product type matters. A non-consumable may control permanent access, an auto-renewable subscription has a service period, and a consumable may already have been spent. Decide what the tested refund information means for your product before running the sheet. If that contract isn't clear, review the [four In-App Purchase types](/blog/in-app-purchase-types/) first.

Keep a separate tester or a clearly recorded starting state for each outcome. Reusing an account with an unknown purchase and refund history can make an old transaction look like the result of the current run.

## 1. Prove the approved path in Xcode first

For a fast local test, run the app with a StoreKit configuration selected in the Xcode scheme:

1. Buy the test product and verify the initial entitlement.
2. Open the refund-request sheet from the app.
3. Select any refund reason and submit it.
4. Observe the updated transaction.
5. Refresh the relevant verified StoreKit state and the app or server entitlement ledger.
6. Relaunch and repeat the entitlement check.

Apple's [refund-testing documentation](https://developer.apple.com/documentation/storekit/testing-refund-requests) says an ordinary reason is automatically approved in a testing environment. The updated `Transaction` contains `revocationDate` and `revocationReason`.

If you need to test a refund that happens outside the app, use Xcode's StoreKit transaction manager or `SKTestSession.refundTransaction(identifier:)`. Apple's [`SKTestSession` reference](https://developer.apple.com/documentation/storekittest/sktestsession) describes this as a refund that completes outside the app. That test is valuable because production refund results can arrive independently of the screen where the purchase began.

The app should derive access from current verified StoreKit state, not from the refund sheet's dismissal or a local “refund submitted” flag. Keep the `Transaction.updates` listener active for updates that arrive while the app runs, and refresh entitlement state when the app launches. For consumables, also check the app or server ledger because [`Transaction.currentEntitlements`](https://developer.apple.com/documentation/storekit/transaction/currententitlements) covers currently entitled non-consumables and subscriptions, not spent consumable balances. A local pass proves your tested code handled the local state; it doesn't prove the Sandbox server path.

## 2. Prepare an App Store Sandbox transaction

For Sandbox, remove the local environment from the run:

1. Set the Xcode scheme's StoreKit configuration to **None**.
2. Run a development-signed app on a device with Developer Mode enabled, then sign in with a Sandbox Apple Account.
3. Alternatively, install the exact build from TestFlight. TestFlight In-App Purchases already use Sandbox; use a controlled Sandbox Apple Account when the scenario depends on that tester's known history.
4. Confirm the intended product ID loads for the selected storefront.
5. Complete the purchase and save its transaction ID.
6. Verify the starting entitlement before requesting a refund.

Apple's [Sandbox overview](https://developer.apple.com/help/app-store-connect/test-in-app-purchases/overview-of-testing-in-sandbox/) confirms that Sandbox uses App Store infrastructure without real charges. If you need a new tester, use the [Sandbox Apple Account setup guide](/blog/create-sandbox-apple-account/).

Don't clear purchase history between every run. That action deletes all of the tester's past Sandbox purchases and can't be reversed. Use it only when a clean purchase state is part of the test contract, and record that reset.

## 3. Test an approved Sandbox refund

With the purchased transaction selected by your app:

1. Present the StoreKit refund-request sheet.
2. Choose any ordinary refund reason.
3. Submit the request.
4. Wait for the updated transaction rather than changing access because the sheet closed.
5. Verify `revocationDate` and `revocationReason`.
6. Verify the affected entitlement and customer-facing UI.
7. If you use App Store Server Notifications V2, confirm that the Sandbox endpoint receives `REFUND`.
8. Relaunch the app and confirm the same entitlement result.

Record client and server evidence separately. A `REFUND` notification proves delivery to the endpoint; it doesn't prove that the client refreshed or that the server changed the correct account. Likewise, a locked feature doesn't prove the server processed the matching transaction.

For products with several ways to grant access, check the whole entitlement set. A refunded transaction shouldn't accidentally remove access supplied by another valid subscription, purchase, or sharing relationship.

## 4. Test a declined refund without revoking access

Apple documents the declined path specifically for Sandbox:

1. Open the refund-request sheet.
2. Under **Issue**, select **Other**.
3. Enter `DECLINE` exactly.
4. Tap **Request Refund**.
5. Verify that the app doesn't remove or downgrade access merely because a request was submitted.
6. Confirm the latest verified StoreKit state and, for a consumable, the app or server ledger.
7. If you receive App Store Server Notifications V2, verify `REFUND_DECLINED` at the Sandbox endpoint.
8. Relaunch and verify that access still matches current verified state.

Treat “submitted” and “approved” as different states in both code and support copy. A request can close successfully while its eventual decision is a decline. The declined test passes only when the app avoids a false revocation and the server routes the event to the correct transaction without changing paid access.

Testing environments don't send refund-request emails, so email arrival isn't a valid test checkpoint.

## 5. Test a prorated refund and preserve the percentage

For Apple's automatic prorated path:

1. Open the refund-request sheet in Sandbox.
2. Select **Other**.
3. Enter `GRANT_PRORATED` exactly.
4. Submit the request.
5. Verify the transaction's revocation information.
6. Inspect `revocationType` and `revocationPercentage`.
7. Confirm the app and server apply the product's documented access policy.
8. Relaunch and verify the resulting state again.

Apple calculates an auto-renewable subscription's test proration from the time remaining. For consumables, non-consumables, and non-renewing subscriptions, the testing environment uses 50%. The Sandbox server receives `REFUND`, while the transaction identifies the result as `REFUND_PRORATED` and provides the percentage.

That percentage describes the amount refunded. Don't silently reinterpret it as “remove half the features” or “leave access for half the original duration.” Write the intended access rule for the product, then test that rule against verified transaction data.

### Optional server-driven proration branch

If your server provides consumption information, test that path separately:

1. Submit an ordinary refund request in the app.
2. Receive `CONSUMPTION_REQUEST` through App Store Server Notifications V2 in Sandbox.
3. Send consumption information through the App Store Server API within five minutes.
4. Use `GRANT_PRORATED` as the refund preference and provide a valid consumption percentage.
5. Verify the resulting transaction, notification, entitlement, and relaunch state.

The five-minute Sandbox window comes from Apple's refund-testing documentation. Acknowledging the notification isn't the same as sending valid consumption information, and a timely response doesn't by itself prove the correct customer entitlement.

## Use one matrix for client and server convergence

Run each outcome as a separate row:

| Outcome | Sheet input | Transaction evidence | Server evidence | Entitlement assertion |
| --- | --- | --- | --- | --- |
| Approved | Any ordinary reason | Revocation date and reason | `REFUND` | Access matches verified post-refund state |
| Declined | Other + `DECLINE` | No unverified local assumption | `REFUND_DECLINED` | Existing valid access remains |
| Prorated | Other + `GRANT_PRORATED` | Revocation data, type, and percentage | `REFUND` | Product's written proration policy is applied |
| Server-driven proration | Ordinary reason, then server response | Revocation data, type, and percentage | `CONSUMPTION_REQUEST`, response, then result | Client and server converge on the same state |

For every row, test three timings:

- while the app remains open;
- after closing the app before the result is processed; and
- after a fresh launch.

This catches the gap between a foreground callback and durable entitlement handling. Save timestamps and transaction IDs so client logs and notifications can be correlated without storing Sandbox passwords, raw credentials, or unnecessary account data.

## Diagnose the first checkpoint that failed

| Observation | Check next |
| --- | --- |
| Refund sheet doesn't open | Confirm the app selected a refundable transaction and called the supported StoreKit refund API from a valid presentation context |
| Purchase uses local data instead of Sandbox | Set the scheme's StoreKit configuration to None and verify the install source and signed-in test account |
| Approved refund arrives but access remains wrong | Check transaction verification, update listening, current-entitlement refresh, product mapping, and server synchronization |
| Declined request removes access | Remove any entitlement change triggered by sheet submission alone; wait for verified transaction or server state |
| Server sees no event | Confirm the Sandbox Server URL, Notifications V2 configuration, endpoint response, environment, and transaction ID |
| Result works only while the app stays open | Check startup listeners, current-entitlement refresh, persisted server state, and account-to-transaction mapping |
| Prorated percentage is recorded but behavior is unclear | Stop and define the product's access policy before coding a percentage-based guess |

Change one layer at a time. Switching testers, clearing history, editing product configuration, and replacing the build together destroys the baseline needed to locate the fault.

## Track the refund gate in LaunchBuddy

LaunchBuddy can keep each matrix row as a version-scoped task: approved refund, declined refund, prorated refund, notification handling, and relaunch verification. Release planning, taskboards, and default App Store submission checklists are available on the Free plan within its two-app and two-release limits. A custom reusable refund checklist requires Pro.

LaunchBuddy doesn't submit refunds, manage Sandbox accounts, run StoreKit transactions, receive server notifications, inspect transaction data, or validate entitlements. Keep those facts in StoreKit, App Store Connect, and your app or server diagnostics; use LaunchBuddy to track the owner, build, result, and release decision.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy and organize your refund test matrix</a>.
