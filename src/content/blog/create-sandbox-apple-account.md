---
title: "How to Create a Sandbox Apple Account"
description: "Create a Sandbox Apple Account in App Store Connect, sign in on the right device path, and keep each tester in a reproducible In-App Purchase state."
pubDate: 2026-10-18
---

**To create a Sandbox Apple Account, open App Store Connect and choose Users and Access → Sandbox. Select the add button, enter a tester name, an unused email address, a strong password, and an App Store country or region, then select Create.** You need the Account Holder, Admin, App Manager, or Developer role.

Before testing, assign the account one scenario, store its credentials in a password manager, and record its current purchase state. Otherwise, an old entitlement or the wrong storefront can invalidate the result.

## Check the prerequisites

Before creating the tester, confirm:

1. Your Apple Developer Program membership is active.
2. The Account Holder has accepted the Paid Applications Agreement when the app offers In-App Purchases.
3. The product exists in App Store Connect with, at minimum, its reference name, product ID, localized name, and price.
4. Your App Store Connect role is Account Holder, Admin, App Manager, or Developer.
5. You have an email address that has never been used as an Apple Account or to purchase App Store or iTunes content.

Apple's [Sandbox testing documentation](https://developer.apple.com/documentation/storekit/testing-in-app-purchases-with-sandbox) lists the membership, agreement, product, account, and device prerequisites. A new tester won't fix a missing product record or an unsigned agreement.

## Create the Sandbox Apple Account in App Store Connect

Follow Apple's current [Sandbox account creation steps](https://developer.apple.com/help/app-store-connect/test-in-app-purchases/create-a-sandbox-apple-account):

1. Sign in to App Store Connect.
2. Select **Users and Access**.
3. Select **Sandbox** in the top navigation.
4. Select the add button. For the first tester, the control may say **Create Test Accounts**.
5. Enter the tester's first and last name.
6. Enter an email address that has never been used for an Apple Account or App Store purchase.
7. Enter a strong password.
8. Choose the App Store country or region needed for the test.
9. Select **Create**.

Confirm that the tester now appears in the Sandbox account list with the intended storefront. Choose the fields carefully: Apple says you can't edit the tester's name, email, or password after creation. The storefront can be changed later.

If your email provider supports plus addressing, a dedicated base address with purpose-specific subaddresses can make testers easier to organize. First verify that each resulting address is unused by Apple and that mail actually reaches the inbox. The email address is an account identifier, not a safe place to encode a password.

## Sign in on the correct device path

The path differs between a development-signed build and a TestFlight build.

### Development-signed app on iPhone or iPad

1. Enable Developer Mode on the test device.
2. Install and run the development-signed app.
3. Attempt an In-App Purchase once so the Sandbox account setting appears.
4. Open **Settings → Developer**.
5. Under **Sandbox Apple Account**, sign in with the tester credentials.
6. Return to the app and run the intended transaction.

You don't need to sign out of the personal Apple Account at the device level for this development-build path. Confirm that the purchase sheet identifies the Sandbox environment before treating the result as a sandbox test.

### App installed through TestFlight

Purchases made in a TestFlight build automatically use sandbox. Use a Sandbox Apple Account only when you need its controls or prepared state.

1. Sign in with the production Apple Account that has beta access and download the build from TestFlight.
2. Enable Developer Mode if it isn't already enabled.
3. In Settings, open the Apple Account and sign out under **Media & Purchases**.
4. Open **Settings → Developer**.
5. Sign in under **Sandbox Apple Account**.
6. Run the controlled test.

Apple warns that signing out of Media & Purchases can affect access to purchased content in production apps, so a dedicated test device is safer. A Sandbox account can test only apps that belong to the developer account where that tester was created. For the full build, product, and entitlement sequence, use the [TestFlight subscription and In-App Purchase testing guide](/blog/test-subscriptions-in-app-purchases-testflight/).

## Decide what the Sandbox account will prove

A Sandbox Apple Account tests In-App Purchases through Apple's sandbox infrastructure. It isn't required for [local StoreKit Testing in Xcode](https://developer.apple.com/documentation/storekit/testing-at-all-stages-of-development-with-xcode-and-the-sandbox), and TestFlight purchases already run in sandbox without one. Create an account when you need a controlled sandbox purchase state, such as:

- a specific App Store storefront;
- accelerated subscription renewals;
- an interrupted purchase;
- billing retry or Billing Grace Period;
- a clean purchase history; or
- a Sandbox Test Family.

If the question is only whether local purchase UI or entitlement logic behaves correctly, start with StoreKit Testing in Xcode. The [StoreKit Testing vs Sandbox comparison](/blog/storekit-testing-vs-sandbox/) explains what each environment can prove.

Use one primary purpose per account. An account that has tested a permanent unlock, three subscription states, and Family Sharing is no longer a clean first-purchase tester.

```text
Internal label: SBX-US-SUBSCRIPTION-CLEAN
Purpose: New monthly subscription purchase
Storefront: United States
Product ID: com.example.pro.monthly
Starting state: Never purchased
Expected result: Verified purchase grants Pro
Build:
Owner:
Last reset:
Credential location: [private credential manager reference]
```

Don't put the password, full email address, private keys, or payment details in a task or shared test result.

## Prove the account with one baseline transaction

Account creation is not the pass condition. Run one small test whose result is observable:

```text
App:
Version and build:
Install source: Xcode | TestFlight
Sandbox account label:
Storefront:
Product ID:
Starting purchase state:

Expected transaction:
Expected entitlement:
Actual transaction:
Actual entitlement:
Checked at:
Result: Pass | Blocked | Fail
```

First confirm that StoreKit returns one known product for the account's storefront. Complete that purchase, verify the expected entitlement, relaunch the app, and verify the entitlement again. Test cancellation as a separate run with its own expected result. A purchase sheet can succeed while the app still grants the wrong tier, grants it twice, or fails to restore access after relaunch.

When the product doesn't appear, don't immediately create another tester. Capture the requested and returned product IDs, build, storefront, signing state, and StoreKit error, then follow the [In-App Purchases not showing in Sandbox checklist](/blog/in-app-purchases-not-showing-in-sandbox/).

## Configure one scenario at a time

Apple's [Sandbox account settings](https://developer.apple.com/help/app-store-connect/test-in-app-purchases/manage-sandbox-apple-account-settings/) let you change the storefront and subscription renewal rate, enable interrupted purchases, clear purchase history, and organize eligible testers into Sandbox Test Families.

Record the control and expected transition before changing it:

| Scenario | Starting state to preserve | Result to verify |
| --- | --- | --- |
| Different storefront | Previous and target storefront | Intended product and localized price are returned |
| Accelerated renewal | Product duration and selected renewal profile | Renewal follows Apple's current profile table and access remains correct |
| Interrupted purchase | Interruption enabled for this tester | App handles the pending step and later completion without duplicate access |
| Billing retry | Active subscription, then purchases and renewals disabled before renewal | App handles non-entitled retry according to verified subscription state |
| Billing Grace Period | Grace enabled for Sandbox in App Store Connect, then a failed renewal | Full access continues only while the verified subscription is in grace |
| Clean purchase | Existing sandbox history documented | Clearing history removes prior sandbox purchases, then the first-purchase path works |
| Family Sharing | Eligible non-consumable or auto-renewable subscription has sharing enabled; organizer and members use the same storefront | Shared access is granted and revoked correctly |

Don't stack controls unless the test requires their interaction. If a storefront test also uses interrupted purchases and an old subscription, a failure has three plausible causes.

Clearing purchase history can't be reversed. Before using it, save the account label, old state, reason, operator, and time. It affects the sandbox tester, not customer accounts, and Apple notes that accounts with many purchases can take longer to clear. When clearing history on iOS, open **Settings → Developer → Sandbox Apple Account → Manage → Clear Purchase History**, then sign out of the Sandbox account and back in to clear the device's purchase-history cache.

## Keep a small account roster

The most useful roster tracks test state without becoming a credential store:

| Label | Storefront | Purpose | Purchase state | Family | Last used | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| SBX-US-NEW | US | First purchase | Never purchased | None | — | Developer |
| SBX-GB-RENEW | UK | Subscription renewal | Active monthly | None | YYYY-MM-DD | Developer |
| SBX-US-FAMILY-1 | US | Shared entitlement | Organizer owns product | Family A | YYYY-MM-DD | QA |

At the start of a run, compare the roster with App Store Connect and the device. At the end, update the observed purchase state and sign out if the next test uses another account. The roster is a planning aid; StoreKit transactions and App Store Connect remain authoritative.

## Fix common Sandbox account setup problems

### The Sandbox tab doesn't appear

Confirm that you're in **Users and Access** and that your role is Account Holder, Admin, App Manager, or Developer. Those are the roles Apple currently allows to create and manage Sandbox accounts. If the role is different, an authorized App Store Connect user must create the tester.

### Sandbox Apple Account is missing in Settings

On iPhone or iPad, enable Developer Mode first. For a development-signed app, attempt an In-App Purchase once; Apple says the Sandbox account control appears under **Settings → Developer** after that first attempt. For TestFlight controls, download the beta first, enable Developer Mode, and then follow the Media & Purchases sign-out path above.

### A new tester won't sign in

Check that the Sandbox tester appears in App Store Connect, enter its email and password exactly, and use **Sandbox Apple Account** under Developer settings rather than the device's main Apple Account sign-in. Also confirm that the app belongs to the same developer account that created the tester.

### Reusing a real Apple Account email

The Sandbox email must not already be an Apple Account or have App Store or iTunes purchase history. Use a genuinely unused address rather than changing capitalization or guessing that an old address is free.

### Treating TestFlight and a Sandbox account as the same thing

TestFlight purchases already run in sandbox. A separate account adds controlled tester settings; it isn't what makes the TestFlight build use sandbox.

### Signing out at the wrong level

For a development-signed In-App Purchase test, don't sign out of the device's main personal Apple Account. For TestFlight sandbox controls, Apple directs you to sign out under Media & Purchases and then sign in under Developer settings.

### Reusing unknown purchase state

An account with an active subscription or owned non-consumable can't prove a first-purchase path. Record the state, clear sandbox history deliberately when appropriate, or use an account prepared for that scenario.

### Deleting an account to tidy the list

Deletion has lasting consequences. Apple says the deleted tester's associated email can no longer be used as an App Store Connect user, for sandbox testing, or for App Store or iTunes purchases. Remove a tester from any Sandbox Test Family first, preserve non-sensitive test evidence, and delete only when retirement is intentional.

## Track the test in LaunchBuddy, not the credentials

LaunchBuddy can keep the account label, intended scenario, version-scoped test task, and pass or blocker beside the release. For example:

```text
Prepare SBX-US-NEW as never-purchased
Verify monthly product loads in build 241
Complete purchase and confirm Pro entitlement
Relaunch and confirm entitlement persists
Record result and next account state
```

Release planning, taskboards, and default App Store submission checklists are available on the Free plan within its app and release limits; custom reusable checklists require Pro. LaunchBuddy doesn't create or manage Sandbox Apple Accounts, store their credentials, configure StoreKit, run transactions, inspect entitlements, or prove a test passed. Keep credentials in a suitable private system and use App Store Connect, StoreKit, and the tested app as the sources of truth.

Create the smallest account roster that covers your release risks, preserve each tester's starting state, and <a href="https://apple.co/3iFcjjW">organize the resulting purchase tests in LaunchBuddy</a>.
