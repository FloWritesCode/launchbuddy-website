---
title: "How to Change a Sandbox Account Storefront"
description: "Change a Sandbox Apple Account country or region, handle Test Family membership, sign in again, and verify In-App Purchase availability and pricing."
pubDate: 2026-11-06
---

**To change a Sandbox account storefront, open App Store Connect and go to Users and Access → Sandbox. Select the Sandbox Apple Account, change Country or Region, and save. Then sign in again with that Sandbox account on the test device so the new storefront takes effect.** You need the Account Holder, Admin, App Manager, or Developer role.

If the account is a member of a Sandbox Test Family, remove the account from the family first. Apple requires every member to use the same country or region as the organizer. If the account is the organizer, use another tester or deliberately delete and rebuild the family.

Changing the setting is quick. Proving that the app now behaves correctly is the real job: keep the build and product IDs fixed, request the products again, check the localized price and availability, and run the intended purchase or entitlement check.

## Record the storefront test before changing the account

A storefront switch is most useful when it changes one variable. Save one test record for the change and its result:

```text
App:
Version and build:
Product ID:
Sandbox account label:

Previous country or region:
Target country or region:
Expected product availability:
Expected localized price:
Expected purchase and entitlement result:

Sandbox Test Family membership:
Tester:
Checked at:

Observed product IDs:
Observed localized price:
Observed transaction and entitlement:
Result: Pass | Blocked | Fail

Restore previous storefront afterward: Yes | No
Restoration result:
```

Use an internal label instead of putting the tester's full email address or password in a task. Keep credentials in an appropriate private credential manager.

Don't clear purchase history as part of the storefront change unless the test specifically requires a clean account. Apple provides storefront editing and purchase-history clearing as separate Sandbox controls, and clearing Sandbox purchase history can't be reversed. If the account already owns a non-consumable or has a subscription state, either include that state in the expected result or use a tester prepared for the scenario.

## Remove a member account from its Sandbox Test Family

Skip this section when the account isn't in a test family.

Apple's [Sandbox account settings documentation](https://developer.apple.com/help/app-store-connect/test-in-app-purchases/manage-sandbox-apple-account-settings/) says all members of a Sandbox Test Family must match the organizer's country or region. A member account has to leave the family before its storefront can change.

1. In App Store Connect, open **Users and Access**.
2. Select **Sandbox**, then **Family Sharing**.
3. Select **Manage** for the affected family.
4. Record the organizer, members, and purchase-sharing choices needed for the later test.
5. Remove the member account and save.

Removing a family member also removes access to purchases shared by that family. Treat the resulting entitlement change as a separate expected event, not as proof that the storefront switch worked.

The numbered steps don't apply to the organizer. For an organizer account, either use a different tester or intentionally delete and later rebuild the Sandbox Test Family after recording its members and sharing choices. Don't dismantle a working family merely to run an unrelated regional price check.

For an end-to-end grant and revocation matrix, use the [Family Sharing for In-App Purchases checklist](/blog/family-sharing-for-in-app-purchases/).

## Change the Sandbox Apple Account country or region

Follow [Apple's current App Store Connect path](https://developer.apple.com/help/app-store-connect/test-in-app-purchases/manage-sandbox-apple-account-settings/):

1. Sign in to App Store Connect.
2. Select **Users and Access**.
3. Select **Sandbox** in the top navigation.
4. Open the Sandbox Apple Account you want to reuse.
5. Under **Country or Region**, choose the target storefront.
6. Select **Save**.
7. Reopen the tester and confirm that the saved country or region is the target value.

Apple currently supports associating a Sandbox account with any of 175 App Store storefronts. You can reuse the same account across storefront tests instead of creating a new tester for each region.

This changes the test account's storefront. It doesn't change the app's or In-App Purchase's production availability, edit a product price, alter the device language, or prove that the public App Store listing is live in that region.

## Sign in again on the test device

Apple says the tester must sign in again with the Sandbox account on the iOS device to complete a country or region change. Saving in App Store Connect alone isn't the finish line.

The following sign-out-and-sign-in sequence is a practical way to establish a fresh session on the test device:

1. Finish or stop the current test run.
2. Sign out of the current **Sandbox Apple Account**.
3. Sign in again with the same Sandbox credentials through the Sandbox sign-in in Settings, not the device's main Apple Account sign-in.
4. Reopen the exact build named in the test record.
5. Request fresh product information before comparing the result.

The sign-in path differs between a development-signed app and TestFlight. The [Sandbox Apple Account setup guide](/blog/create-sandbox-apple-account/) covers both paths and explains when TestFlight's default Sandbox behavior is enough.

Avoid changing the build, product configuration, tester, and storefront at the same time. If the result changes, you need to know whether the account transition caused it.

## Verify the new storefront with StoreKit

The country or region shown in App Store Connect confirms the account setting. The observed StoreKit result shows what the app received. Complete the result fields in the original test record rather than starting a separate note.

Use StoreKit's localized product information in the app instead of hard-coding a currency symbol or copying a price from another region. A currency label that looks right isn't enough: verify the exact product ID and the entitlement the app grants.

Choose the assertion that matches the test:

- **Availability:** Record whether StoreKit returns the product. If it should be available and the other configuration, status, signing, and propagation gates pass, treat a missing result as a failure. Handle an intentionally excluded product without a dead purchase button or a false availability promise.
- **Localized pricing:** The app shows the price StoreKit returns for the target storefront without clipping, stale copy, or a mismatched billing period.
- **Purchase:** A successful Sandbox transaction grants the expected entitlement once.
- **Existing ownership:** The account's known transaction state produces the expected restore or current entitlement result after the switch.

The [In-App Purchase availability guide](/blog/in-app-purchase-availability/) separates app availability, product availability, review status, and StoreKit evidence. A storefront switch tests the account side of that matrix; it doesn't override the other gates.

## Restore the tester after a temporary regional test

Don't leave a shared tester in an undocumented state.

1. Save the result for the target storefront.
2. Change the tester back to its previous country or region when that is part of the plan.
3. Sign in again on the device after the second change.
4. Request the same product IDs and rerun the baseline check.
5. Re-add the tester to a Sandbox Test Family only when its country or region again matches the organizer.
6. Recheck any family-shared entitlement affected by removal and re-entry.
7. Update the account roster with the final storefront, family, purchase state, and last-used date.

Record the restoration result separately. “Changed it back” doesn't establish that the device session, StoreKit result, or family setup returned to the baseline.

## Troubleshoot a Sandbox storefront that didn't change

### App Store Connect still shows the old region

Open the tester again and confirm the saved value. Also confirm that you edited the intended Sandbox account rather than another tester with a similar label. If the account is still constrained by a Sandbox Test Family, resolve that membership before retrying.

### App Store Connect is correct, but the app behaves like the old storefront

Confirm that the tester signed in again after the change. Then keep the build and product IDs fixed, request fresh product information, and record the returned IDs and price. Don't use the device's language, locale, or physical location as a substitute for the Sandbox account's App Store country or region.

### The product disappears in the target storefront

That may be the correct result when the In-App Purchase isn't available there. Compare the tester region with the product's country or region availability in App Store Connect before changing code.

If the product should be available, capture the build, exact requested and returned product IDs, target storefront, signing state, and StoreKit error. Then follow the [In-App Purchases not showing in Sandbox checklist](/blog/in-app-purchases-not-showing-in-sandbox/) rather than creating replacement identifiers or repeatedly editing unrelated fields.

### The price is unexpected

Compare the current product price schedule for that storefront with the localized value StoreKit returns. Don't calculate an expected customer price from exchange rates or another storefront's amount. Also keep a newly changed product configuration separate from the account switch so any propagation delay doesn't look like an account failure.

## Keep LaunchBuddy on the planning side

LaunchBuddy can keep the storefront test, device retest, blocker, and restoration task beside the affected release. Release planning, taskboards, default App Store submission checklists, and iCloud sync are available within the Free plan's limits of two apps, two releases, and limited project notes. Custom reusable checklists and unlimited apps, releases, and project notes require Pro.

LaunchBuddy doesn't manage Sandbox Apple Accounts, change storefronts, store tester credentials, configure In-App Purchases, inspect StoreKit transactions, or certify regional availability. App Store Connect, StoreKit, and the tested build remain authoritative.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy and keep each storefront test attached to the release it can block</a>.
