---
title: "In-App Purchases Not Showing in Sandbox: A Fix Checklist"
description: "Fix In-App Purchases missing in Apple's sandbox by checking product IDs, metadata, signing, agreements, banking, tax, storefronts, and propagation."
pubDate: 2026-10-06
---

**If In-App Purchases aren't showing in Sandbox, first confirm that StoreKit requested the exact product IDs and returned no matching products. Then check, in order: the environment, App Store Connect product setup, bundle ID, In-App Purchase capability, signing, developer membership, Paid Apps Agreement, banking, and tax status.**

Don't recreate the product or clear a tester's purchase history yet. Product discovery happens before a purchase. A reset can't repair a wrong identifier, incomplete product, invalid profile, or inactive agreement.

Apple's [TN3186 troubleshooting note](https://developer.apple.com/documentation/technotes/tn3186-troubleshooting-in-app-purchases-availability-in-the-sandbox) is the authoritative checklist. The workflow below turns those checks into a diagnostic sequence that preserves evidence and narrows the failing layer.

## First, prove that product discovery is failing

“The paywall is empty” describes a symptom, not the StoreKit result. Capture one request before changing anything:

```text
App version / build:
Install source: Xcode | TestFlight
Bundle ID at runtime:
Requested product IDs:
Returned product IDs:
Thrown error, if any:
Device / OS:
Sandbox account mode:
Storefront:
Checked at:
```

With StoreKit 2, `Product.products(for:)` requests product data from the App Store. Compare the identifiers you passed with the identifiers in the returned `Product` values.

With StoreKit 1, capture both `SKProductsResponse.products` and `invalidProductIdentifiers`, along with any request error. The same identifier, product, signing, and account checks apply.

Use the result to choose the next branch:

| Observation | Diagnose next |
| --- | --- |
| No requested products return | Environment, identifiers, product setup, signing, or account prerequisites |
| Some products return | Compare each missing product with a returned product |
| All products return but the paywall is empty | App filtering, product-to-plan mapping, state handling, or UI |
| Products display but purchase fails | Purchase flow, account state, transaction handling, or an intended Sandbox scenario |

This article covers the first two rows. If the products return and a later transaction or entitlement check fails, use the [TestFlight purchase-testing workflow](/blog/test-subscriptions-in-app-purchases-testflight/) instead.

## 1. Confirm which test environment is active

StoreKit Testing in Xcode and Apple's Sandbox are different environments.

A StoreKit configuration file supplies local product data without contacting App Store servers. Sandbox uses real product information from App Store Connect. A local test can therefore pass while the corresponding App Store Connect product is incomplete or attached to another app.

For a development-signed build:

1. Open the app's Run scheme in Xcode.
2. Check the selected StoreKit Configuration.
3. Set it to **None** when the goal is to test against Sandbox.
4. Run on a device with Developer Mode enabled.
5. Use a Sandbox Apple Account when prompted or through Developer settings.

For TestFlight, don't look for a production-versus-Sandbox switch. Apple's [Sandbox testing documentation](https://developer.apple.com/documentation/storekit/testing-in-app-purchases-with-sandbox) states that TestFlight apps use Sandbox for In-App Purchases. A separate Sandbox Apple Account is needed only when you want its controlled settings; it isn't what turns a TestFlight build into a Sandbox build.

Record the install source. “Works from Xcode” is ambiguous unless you also know whether a local StoreKit configuration or App Store Sandbox answered the request.

## 2. Verify the complete identifier chain

One character can separate the binary from the App Store Connect catalog. Compare copied values rather than reading them from memory:

```text
Runtime bundle ID
= Xcode target bundle ID
= App Store Connect app record bundle ID
= explicit App ID used by the signing profile

Requested product ID
= Product ID under that same App Store Connect app
```

Check every requested product ID, including capitalization and punctuation. Don't compare the reference name or display name; StoreKit requests the immutable **Product ID**.

Also confirm that the product belongs to the App Store Connect app whose bundle ID the running binary uses. In-App Purchases can be shared across platform versions of one app, but Apple doesn't share them between different apps.

If identifiers come from a server, remote configuration, or build setting, log the final runtime list. Inspecting a source-code constant doesn't prove that the installed build requested it.

## 3. Complete the minimum App Store Connect product setup

Apple's [Sandbox testing documentation](https://developer.apple.com/documentation/storekit/testing-in-app-purchases-with-sandbox#Prepare-for-sandbox-testing) requires, at minimum:

- a reference name;
- a product ID;
- a localized name; and
- a price.

Open each missing product and inspect the saved values. TN3186 specifically directs developers to set a price and add a localization before retrying the request.

**The product doesn't need prior App Review approval to appear in Sandbox.** Apple explicitly says Sandbox testing doesn't require submission of the In-App Purchase for review. Don't wait for approval as a substitute for checking the minimum product configuration.

Product review state still matters for shipping, but it's a separate question. The [In-App Purchase status guide](/blog/in-app-purchase-status-meanings/) explains what Prepare for Submission, Ready for Review, Waiting for Review, and Approved mean.

## 4. Check the App ID, capability, and signed profile

Sandbox testing requires an App Store Connect-registered bundle ID with the In-App Purchase capability enabled.

In Certificates, Identifiers & Profiles:

1. Open the identifier matching the app's bundle ID.
2. Confirm it is an explicit App ID, not a wildcard App ID.
3. Confirm **In-App Purchase** is enabled under Capabilities.

Then inspect the provisioning profile used to sign the failing build. Its App ID must match the registered bundle ID, and it must grant access to the In-App Purchase capability.

Changing the identifier or capability doesn't rewrite an installed build. Regenerate or update an invalid profile, rebuild the app, and test the new build. For TestFlight, upload and install a build signed with the corrected configuration.

Profiles can also become invalid after a certificate is revoked, an App ID changes, a membership expires, or an app transfer completes. A successful compilation alone doesn't prove that the installed artifact has the intended signing configuration.

## 5. Verify the developer and financial prerequisites

Product configuration can look correct while an account-level requirement prevents Sandbox availability.

Check each status explicitly:

- The Apple Developer Program membership is active.
- The latest Apple Developer Program License Agreement has been accepted.
- The Paid Apps Agreement shows **Active** in App Store Connect.
- Required bank accounts show **Active**.
- Required tax forms show **Active**.

Only the Account Holder can sign the Paid Apps Agreement. Account Holder, Admin, or Finance users can submit banking and tax information, although some banking changes require Account Holder approval. Apple's [agreement guidance](https://developer.apple.com/help/app-store-connect/manage-agreements/sign-and-update-agreements) says a renewed membership can require the Paid Apps Agreement to be accepted again.

Don't treat “we signed it last year” as evidence. Record the status currently displayed in App Store Connect.

## 6. Allow App Store Connect changes to propagate

Apple says product-metadata changes can take up to one hour to appear in Sandbox.

After correcting product metadata such as a price or localization:

1. Record exactly what changed and when.
2. Stop making unrelated edits.
3. Wait for the documented propagation window.
4. Retry the same request from the same build.
5. Compare the new returned-ID list with the original evidence.

Repeatedly changing fields during that hour resets your diagnostic baseline. It also makes an eventual success impossible to attribute to one fix.

## 7. Check storefront scope when the failure is account-specific

If a product appears for one Sandbox tester but not another, compare their storefronts. Apple's Sandbox settings let you change a tester's country or region, and the assigned storefront affects the product information the account can access.

Compare:

- the Sandbox Apple Account's country or region;
- the In-App Purchase's configured country or region availability;
- the storefront StoreKit reports at runtime; and
- whether the tester signed out and back in after a storefront change.

Keep the build and requested IDs unchanged while making this comparison. If you change the build, product, and account together, you won't know which variable mattered.

## Use a known-good product to split the problem

When one app has both a working product and a missing product, request them together from the same build and device:

```text
Known-good ID: com.example.app.unlock
Missing ID:    com.example.app.yearly

Requested together:
Returned:
```

That side-by-side request gives you a useful control:

| Result | What it suggests |
| --- | --- |
| Neither product returns | Shared app, environment, signing, membership, or agreement problem |
| Only the known-good product returns | Missing product's ID, price, localization, storefront scope, or propagation |
| Both products return | Paywall mapping or UI problem, not catalog availability |
| Results differ only by tester | Sandbox account or storefront-specific condition |

This isn't proof of one root cause, but it cuts the search space without deleting products, changing several fields, or creating replacement identifiers.

## What not to change first

Avoid these common detours:

- **Don't create a replacement Product ID.** Product IDs can't be edited or reused for another product in the same app, and a new ID adds another variable.
- **Don't clear purchase history to fix an empty catalog.** Purchase history affects transaction scenarios, not whether the requested product record is configured correctly.
- **Don't submit solely to make Sandbox work.** Prior approval isn't required for Sandbox product discovery.
- **Don't assume a local StoreKit test validates App Store Connect.** Local configuration and Sandbox use different product sources.
- **Don't edit every product field at once.** Preserve one failing request and change one layer at a time.

## Build an escalation packet after every check passes

If the same request still returns no products after the propagation window, prepare evidence before asking Apple for help:

```text
App name and App Store Connect app ID:
Team:
Bundle ID:
Version / build:
Install source:
Device / OS:
Requested product IDs:
Returned product IDs:
Exact error:
Sandbox storefront:
Last product edit and time zone:

Explicit App ID verified:
In-App Purchase capability verified:
Signed profile verified:
Developer membership active:
Paid Apps Agreement active:
Banking active:
Tax forms active:
Minimum product setup complete:

Reproduces on another device:
Known-good comparison result:
```

Remove credentials, private keys, full account addresses, and unrelated personal data. A complete packet lets support distinguish an App Store Connect catalog problem from an app-configuration problem without asking you to repeat the same checks.

For broader account, permission, or release blockers, follow the [App Store Connect help guide](/blog/app-store-connect-help/).

## Track the fix without claiming LaunchBuddy can diagnose StoreKit

LaunchBuddy can keep this investigation attached to the affected release as tasks or checklist items: capture the failing request, verify identifiers, correct signing, wait for propagation, retest, and save the result.

LaunchBuddy doesn't configure In-App Purchases, manage Sandbox Apple Accounts, inspect StoreKit responses, validate provisioning profiles, or prove that a product is available. App Store Connect, Certificates, Identifiers & Profiles, the signed build, and StoreKit remain authoritative.

The useful planning boundary is simple: keep the evidence with the release, but close the task only after the same build returns the expected product from Sandbox.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy and keep the Sandbox fix attached to the release it blocks</a>.
