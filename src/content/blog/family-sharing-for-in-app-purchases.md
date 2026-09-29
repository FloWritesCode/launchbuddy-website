---
title: "Family Sharing for In-App Purchases: Setup Checklist"
description: "Enable Family Sharing for eligible In-App Purchases with the right entitlement logic, Sandbox Test Family checks, and an irreversible-change gate."
pubDate: 2026-09-29
---

**To enable Family Sharing for an In-App Purchase, first confirm that the product is an auto-renewable subscription or non-consumable, make the app grant and revoke shared entitlements correctly, and test the app-state branches locally. Then open the product in App Store Connect, find Family Sharing, select Turn On, and confirm. You can't turn it off afterward.**

That last constraint changes the order of work. Don't use the production product toggle as the first experiment. Decide what the customer promise means, prepare the app and support copy, test locally where possible, approve the irreversible change, and then use a Sandbox Test Family to verify Apple's end-to-end behavior.

## Confirm that the product is eligible

Apple supports Family Sharing for only two In-App Purchase types:

- **Auto-renewable subscriptions**
- **Non-consumable In-App Purchases**

Consumables and non-renewing subscriptions aren't eligible. If the product model is still unsettled, use the [In-App Purchase types guide](/blog/in-app-purchase-types/) before changing its sharing configuration.

Apple's current [Family Sharing setup documentation](https://developer.apple.com/help/app-store-connect/configure-in-app-purchase-settings/turn-on-family-sharing-for-in-app-purchases/) says a shared purchase can cover the purchaser and up to five additional family members. It doesn't mean every eligible purchase is always shared. Actual access depends on the product type, when the purchase was made, and the customer's sharing preferences.

Before implementation, fill out this decision record:

```text
Product ID:
Product type: auto-renewable | non-consumable
Customer promise mentions Family Sharing: Yes / No

New-purchaser behavior:
Existing-purchaser behavior:
Family-member onboarding:
Loss-of-access message:
Support owner:

Entitlement implementation ready:
Local test evidence:
Irreversible enablement approved by:
Sandbox Test Family evidence:
Production release:
```

If the team can't describe what happens when sharing stops, it isn't ready to turn the feature on.

Before touching the live product, enable Family Sharing for a matching item in an Xcode StoreKit configuration. Apple's [StoreKit testing environment](https://developer.apple.com/videos/play/wwdc2020/10659/) returns that item as family-shareable, so you can verify `isFamilyShareable` messaging and exercise your entitlement reducer with shared and revoked test inputs. This local preflight doesn't create a real family-member transaction; the Sandbox Test Family run after App Store Connect enablement remains the end-to-end gate.

## Know who receives access

“Family Sharing enabled” is a product capability, not a guarantee that a particular family member has access. Use the right branch for the product and purchase date.

| Situation | Expected sharing path |
| --- | --- |
| New auto-renewable subscription | Sharing defaults according to the purchaser's preference in Manage Subscriptions |
| Existing auto-renewable subscription | The purchaser must opt in from the subscription's management page |
| New non-consumable | Sharing can occur when the organizer has purchase sharing enabled, the purchaser and recipient allow purchase sharing, and the app isn't hidden from purchase history |
| Existing non-consumable | The app can unlock the shared purchase from validated receipt or transaction information when Apple's sharing conditions are met |

Customers can later stop sharing. A purchaser may turn off subscription sharing, purchase-sharing settings can change, or a member can leave the family. A refund can also revoke the entitlement. The implementation therefore needs both a grant path and a removal path.

For subscriptions, don't tell existing purchasers that access will appear for their family automatically. Apple requires those purchasers to opt in. For non-consumables, provide a working restore or entitlement-refresh path so a family member can discover a purchase that became shareable after it was originally bought.

If the subscription also supports multiseat purchases, Apple's current help page adds another boundary: only the group purchaser is eligible for Family Sharing. Extra seats are for individual use.

## Implement shared entitlements before enablement

Apple gives each family member their own receipt and transaction for the shared product. Validate that transaction as you would another purchase instead of copying the purchaser's account flag into every family profile.

Apple's [StoreKit Family Sharing guidance](https://developer.apple.com/documentation/storekit/supporting-family-sharing-in-your-app) identifies the implementation signals to handle:

- Read `isFamilyShareable` at runtime before advertising that a product can be shared.
- Establish current access from verified transactions or receipts.
- Keep listening for transaction updates while the app runs.
- Use the transaction ownership type when the experience needs to distinguish a purchaser from a family member.
- Recalculate access when a transaction has a revocation date.
- If a server controls access, process the relevant App Store server notifications and refresh entitlement state there too.

Ownership type is context, not an access decision by itself. A `familyShared` transaction can establish access, but only while that verified entitlement remains current. Likewise, a revoked shared transaction doesn't prove the customer has no access at all; another purchase or subscription may still entitle them to the same service.

A safe entitlement reducer looks like this:

```text
1. Load all verified current entitlements for the service.
2. Exclude transactions that no longer provide access.
3. Grant the service if any valid transaction still covers it.
4. Use ownership type only for management UI or family-member onboarding.
5. Repeat after transaction updates, restore, sign-in, and server notifications.
```

This avoids two common failures: leaving access active after sharing ends, and removing access even though another valid transaction remains.

For an auto-renewable subscription, Family Sharing becomes one branch in the broader subscription state model. Renewal, grace period, billing retry, expiration, refund, and sharing revocation can each affect access. The [Billing Grace Period guide](/blog/app-store-billing-grace-period/) shows how to keep those states separate.

## Prepare customer and support copy

Use `isFamilyShareable` rather than hard-coding “Share with your family” for every product. The App Store Connect setting and the app's message must agree.

Customer-facing copy should answer:

- Which product can be shared?
- Does the purchaser need to enable sharing?
- Where can the purchaser manage the setting?
- What should a family member do if access hasn't appeared?
- What happens when purchase sharing stops?
- Who can manage or cancel the subscription?

Don't imply that a family member owns or can manage the purchaser's subscription. Ownership information can help the app show the management path only to the purchaser.

Support also needs a diagnostic sequence that doesn't begin with “buy it again”:

1. Confirm the exact product is marked family-shareable at runtime.
2. Confirm the purchase owner and affected family member are in the intended family.
3. Check the relevant subscription or purchase-sharing preferences.
4. Refresh verified entitlements or run the app's restore path.
5. Check for a current shared transaction and any revocation.
6. Check whether another valid entitlement should provide access.
7. Record the environment, product ID, build, ownership type, and result before escalating.

Avoid asking customers to send raw receipts or other sensitive account data through ordinary support channels.

## Test with a Sandbox Test Family

Apple's [Sandbox Test Family instructions](https://developer.apple.com/help/app-store-connect/test-in-app-purchases/manage-sandbox-apple-account-settings/) require at least two Sandbox Apple Accounts. All members must use the same country or region as the organizer, and each account can belong to only one Sandbox Test Family.

Create the family:

1. In App Store Connect, open **Users and Access**.
2. Select **Sandbox**, then **Family Sharing**.
3. Select the add button or **Create Test Family**.
4. Choose a Sandbox account as the organizer.
5. Add up to five test accounts as family members.
6. Set whether each member may share and receive purchases.
7. Create the family.

Changes to product metadata can take up to one hour to appear in Sandbox, and changes to purchase sharing may also take time. Record the change time before treating an immediate miss as an implementation failure.

Run a matrix, not one happy-path purchase:

| Scenario | Evidence to save |
| --- | --- |
| Purchaser buys a new shareable product | Product ID, purchaser transaction, sharing preference |
| Family member launches the app | Verified shared transaction, ownership type, access granted |
| App relaunches or reinstalls | Current entitlement is restored without another purchase |
| Sharing is disabled for the member | Updated transaction or server event, access recalculated |
| Member is removed from the test family | Revocation observed, shared access removed |
| Purchaser still has access | Purchaser's valid transaction remains entitled |
| Member owns another valid entitlement | Access remains through that entitlement after the shared one is revoked |

For a subscription that existed before Family Sharing was enabled, add an opt-in test: the original purchaser enables sharing from subscription management, and the family member then receives access. For a non-consumable bought before enablement, verify the app's restore or entitlement-refresh path.

Apple's dedicated [Family Sharing test guide](https://developer.apple.com/documentation/storekit/testing-family-sharing) specifically calls for confirming the family member's `familyShared` ownership type and then testing loss of access when sharing stops. Don't pass the release because the purchaser's device works; the family member's grant and revocation are the feature.

## Turn on Family Sharing in App Store Connect

Only perform this step after the product decision, entitlement implementation, copy, and initial tests are ready. Apple lists **Account Holder** or **App Manager** as the required role for this setting.

1. In **Apps**, select the app.
2. Under **Monetization**, open **In-App Purchases**. For an auto-renewable subscription, open **Subscriptions**, its subscription group, and then the subscription.
3. Select the intended product.
4. Scroll to **Family Sharing**.
5. Select **Turn On**.
6. Read the confirmation terms and verify the product ID again.
7. Select **Confirm**.

Save an enablement receipt:

```text
App:
Product reference name:
Product ID:
Product type:
Enabled by:
Enabled at:
App Store Connect confirmation checked:
Sandbox propagation checked:
Test matrix:
Release/build:
Support copy:
```

There is no “turn it off if testing fails” recovery. A release rollback can remove defective app code, but it doesn't reverse the product's Family Sharing eligibility in App Store Connect.

## Verify the release, not just the setting

Before release, check three layers:

### Product configuration

- The intended product, not a similarly named SKU, has Family Sharing enabled.
- StoreKit reports the product as family-shareable.
- Paywall and support copy match the actual product.

### Entitlement behavior

- Purchaser and family-member transactions validate.
- New and existing purchase paths behave as documented.
- Restore or refresh recovers access.
- Sharing changes and family removal revoke only the affected entitlement.
- Another valid entitlement prevents an incorrect lockout.

### Operations

- Support can distinguish purchaser, family member, sharing preference, and revocation.
- Logs provide the product, environment, entitlement source, and state transition without exposing unnecessary personal data.
- The release owner has saved the test matrix and knows the next verification date.

Attach this work to the same version that contains the entitlement and customer-message changes. The [iOS app release management workflow](/blog/ios-app-release-management/) provides a version-scoped structure for implementation, testing, App Store work, and follow-up.

## Keep LaunchBuddy on the planning side

LaunchBuddy doesn't enable Family Sharing, manage Sandbox accounts, validate StoreKit transactions, or decide whether a customer is entitled. App Store Connect and your StoreKit implementation remain authoritative.

LaunchBuddy can organize the rollout around those systems: keep the irreversible decision with the app, assign implementation and support-copy tasks to a release, and add the Sandbox matrix to an App Store submission checklist. Release planning, taskboards, default checklists, and iCloud sync are available on the Free plan within its two-app, two-release, and limited-notes limits. Custom reusable checklists and unlimited apps, releases, and project notes require Pro.

The useful artifact isn't a checked task named “enable Family Sharing.” It's a chain from product decision to verified family-member grant, tested revocation, and production support plan.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy and organize your Family Sharing rollout</a>.
