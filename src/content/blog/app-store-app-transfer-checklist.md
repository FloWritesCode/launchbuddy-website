---
title: "App Store App Transfer Checklist: A Two-Owner Handoff"
description: "Use this App Store app transfer checklist to verify eligibility, hand off code and services, transfer ownership, and validate the recipient setup."
pubDate: 2026-08-26
---

An App Store app transfer has three phases: prove that the app meets Apple's criteria, hand off every service tied to the old developer account, and verify the recipient-owned setup. The transferor's Account Holder requests the transfer in App Store Connect. The recipient's Account Holder accepts it within 60 days, then both sides test the app after Apple finishes processing.

The short **App Store app transfer checklist** is:

- [ ] Confirm both accounts and the app meet Apple's current transfer criteria.
- [ ] Name the transferor and recipient Account Holders, Team IDs, owners, and target date.
- [ ] Back up the app record, reports, metadata, pricing, and configuration.
- [ ] Inventory code, signing, users, data, purchases, servers, and Apple capabilities.
- [ ] Complete the pre-transfer work for every capability the app uses.
- [ ] Stop TestFlight testing and remove Xcode Cloud data as Apple requires.
- [ ] Freeze conflicting App Store changes and record the last known-good production state.
- [ ] Have the transferor's Account Holder request the transfer.
- [ ] Have the recipient review privacy details, enter the required metadata, and accept.
- [ ] Create recipient-owned profiles, certificates, keys, identifiers, and server configuration.
- [ ] Test the public app, updates, purchases, sign-in, notifications, data, and support paths.
- [ ] Close the handoff only when both owners have evidence for every applicable item.

This isn't just an App Store Connect form. Apple transfers the app record and associated App ID, but the transferor remains responsible for exchanging the code and build assets directly with the recipient. A useful checklist therefore has two sign-offs: **transferor exit evidence** and **recipient acceptance evidence**.

## Gate 1: Confirm the app is transferable

Start with Apple's live [app transfer criteria](https://developer.apple.com/help/app-store-connect/transfer-an-app/app-transfer-criteria), not an old internal checklist. At the time of writing, all of these must be true:

- Neither account is pending or changing, and both parties have accepted the latest paid and free agreements. Apple's EU alternative-terms condition also applies when the transferor accepted that addendum.
- The app has at least one version released on the App Store.
- The app isn't available for pre-order in any country or region.
- The app isn't Processing for Distribution, Waiting for Review, In Review, Accepted, Pending Developer Release, or Pending Apple Release.
- In-app purchases use one of Apple's allowed transfer statuses, and none of their product IDs duplicate a product ID in the recipient's account.
- Apple-hosted asset packs aren't Waiting for Review or In Review.
- A sandboxed Mac app doesn't share its Application Group Container Directory with another Mac app.
- The app isn't an Apple Arcade app.

Treat this as a go/no-go gate. Don't schedule the handoff around an assumed acceptance date until App Store Connect shows that the blockers are resolved.

Identify exceptions before promising continuous availability. Apple's [transfer overview](https://developer.apple.com/help/app-store-connect/transfer-an-app/overview-of-app-transfer) says an eligible app can remain available, keep its ratings and reviews, continue receiving updates, and retain its Bundle ID. The same page documents feature-specific consequences, including a Brazil availability interruption for transferred apps with fixed-odds betting features and continuity work for several Apple capabilities.

If transfer is only one possible portfolio decision, compare it with continued maintenance or retirement first. The [iOS app sunset checklist](/blog/ios-app-sunset-checklist/) separates those choices from Apple's availability controls.

## Gate 2: Create a two-owner transfer record

Put identity and scope in one record before exchanging files:

```text
App name:
Bundle ID:
Current public version and build:
Transferor organization, Account Holder, Team ID:
Recipient organization, Account Holder, Team ID:
Target request date:
Target acceptance date:
Change-freeze window:
Customer-facing impact or exception:
Transfer coordinator:
Transferor exit sign-off:
Recipient acceptance sign-off:
```

Only an **Account Holder** can initiate or accept the transfer. The transferor also needs the Apple Account email and Team ID for the recipient's Account Holder. Verify those values through a trusted channel before starting; a typo at the ownership boundary is not a routine metadata mistake.

Use a three-state item for every dependency:

```text
Not applicable — the app does not use it, with evidence
Open — action or verification still has an owner
Accepted — both sides recorded the result
```

“Not applicable” must be checked, not assumed. For example, an app that doesn't use auto-renewable subscriptions doesn't need a shared-secret handoff, but someone should verify that from the current App Store configuration and server code.

## Gate 3: Back up records the transferor will lose

Apple advises the transferor to back up all app information because the app leaves its App Store Connect account after completion. Preserve what the business and recipient will need without copying credentials into the handoff document:

- App metadata, localizations, pricing, availability, and dates it was available
- Current versions, builds, App Review history, and unresolved operating notes
- Sales, download, payment, and financial reports needed for the transferor's records
- App Analytics exports or baselines needed for later comparison
- In-app purchase and subscription configuration
- Privacy details, support URLs, accessibility details, and regulated declarations
- Current nominations and app-bundle information; nominations don't transfer, and the transferor can no longer view app-bundle history
- Webhook, server, certificate, entitlement, and capability inventories

The reporting boundary changes after transfer. Apple says the transferor keeps access to payments and sales information from before the transfer but not later transactions. The recipient receives payment and sales information only for transactions after the transfer. App Analytics follows a different rule: the transferor loses access, while the recipient gets analytics from April 1, 2015, or the app's first availability date, whichever is later.

Record the source and export date beside each artifact. A screenshot with no account, app, or date context is weak handoff evidence.

## Gate 4: Build a capability-by-capability handoff

A long generic list creates false confidence. Select the rows the app actually uses, then verify Apple's current instructions for each one.

| Capability | Transferor exit evidence | Recipient acceptance evidence |
| --- | --- | --- |
| Auto-renewable subscriptions | App-specific shared secret generated and sent through an appropriate secure channel | Server verifies with the provided app-specific secret; a new app-specific secret is generated after transfer |
| TestFlight | Testing turned off; builds and testers removed; every localized Test Information field cleared | New beta plan and tester access rebuilt only when needed |
| Xcode Cloud | All related Xcode Cloud data removed in App Store Connect | Recipient-owned workflows and credentials created |
| Sign in with Apple | User transfer identifiers generated; grouped apps ungrouped; Service ID association decision recorded | User migration and recipient configuration tested against Apple's transfer process |
| Keychain sharing | Current groups and expected post-update behavior documented | Recipient Team ID group configured; update flow includes a required re-login test |
| Push notifications | Certificate or key inventory and server endpoints documented | Recipient-owned APNs key or certificate selected and server updated |
| Apple Pay | Merchant ID and certificate expiry recorded | Recipient merchant ID prepared for the next update and payment flow tested |
| iCloud and CloudKit | Containers, KVS identifiers, and sharing with other apps mapped | Recipient entitlements and data access tested; impact on non-transferred apps resolved |
| Game Center | Groups, leaderboards, compatibility, and matchmaking configuration exported | Groups, IDs, compatibility, and matchmaking rebuilt where Apple requires it |
| Wallet passes | Existing pass identifiers and update service documented | Passes reissued with new identifiers and affected users notified |
| Webhooks | Each endpoint is intentionally deleted or kept for transfer | Transferred endpoints are changed to recipient-owned servers where needed |
| Alternative marketplaces | Each marketplace is notified and recorded | The same marketplace is added in App Store Connect before transfer |

This table is a control record, not a substitute for Apple's instructions. The high-risk details aren't interchangeable:

- Apple says keychain sharing continues only until the app is updated; after the group changes, users must sign in again because the old token can't be retrieved.
- Existing APNs certificates remain valid until they expire, but the recipient must use a recipient-team key or certificate and update the push server.
- An Apple Pay merchant ID doesn't transfer. Existing transactions continue while the original certificates remain valid, but an update needs a merchant ID from the recipient's account.
- Shared CloudKit containers can affect apps that aren't being transferred. Apple warns that those other apps can lose access to the transferred container, so this is an architecture decision, not a checkbox for transfer day.

Apps using Mac Catalyst, Accessibility Nutrition Labels, regulated medical-device declarations, OS data transfer, or other listed services need their own rows. If a capability is absent from your plan but present in the app, stop and extend the plan.

## Gate 5: Prepare the recipient package without transferring secrets carelessly

Apple transfers the App Store record, not the complete operating environment. Exchange these materials through channels appropriate to their sensitivity:

1. Source code and build assets
2. Build and release instructions
3. Backend and infrastructure inventory
4. Data model, retention, migration, and deletion obligations
5. Domain, support, privacy, and marketing-site ownership
6. Vendor, licensing, and service agreements
7. Active incidents, support commitments, and known defects
8. A capability map tied to the current production build

Never use a project note as a credential vault. Move access by creating recipient-owned accounts, keys, and certificates where possible; revoke transferor access only after the recipient proves the replacement path works. Keep secrets out of source control, screenshots, and general-purpose handoff documents.

Define acceptance tests before the ownership switch:

```text
Install from the App Store:
Update from the prior public version:
Create account / sign in / recover access:
Purchase / restore / renew:
Receive push notification:
Read and write user data:
Use iCloud or cross-device sync:
Open support, privacy, and marketing links:
Submit a recipient-signed internal build:
```

Delete rows that truly don't apply, and add app-specific critical paths. “The app launches” is not enough evidence for an app whose main promise depends on a purchase, cloud data, or a server.

## Gate 6: Request and accept the transfer

The transferor's Account Holder follows Apple's [initiation steps](https://developer.apple.com/help/app-store-connect/transfer-an-app/initiate-an-app-transfer):

1. Open the app's **App Information** page.
2. Choose **Transfer App** under Additional Information.
3. Resolve any criteria App Store Connect still reports.
4. Enter the recipient Account Holder's Apple Account and Team ID.
5. Accept the agreement and request the transfer.

The app then gains **Pending App Transfer** status while retaining its previous status. Apple says the request expires after 60 days if the recipient doesn't accept it. During this period, the transferor can't edit some metadata, pricing, availability, or in-app purchases, and open App Review communications are closed. Both sides can still cancel while the transfer is waiting for the recipient.

The recipient's Account Holder follows Apple's [acceptance steps](https://developer.apple.com/help/app-store-connect/transfer-an-app/accept-an-app-transfer). Acceptance includes entering new support and contact information, supplying marketing and privacy-policy URLs when the app previously had them, choosing initial user access, and reviewing or replacing the existing App Privacy responses.

Apple says processing can take up to two business days after acceptance. Export-compliance documentation can put the app into Waiting for Export Compliance. Don't dismantle the old operating path merely because the recipient clicked **Accept**.

## Gate 7: Verify the recipient-owned app

When both Account Holders receive completion notices, the recipient should verify:

- The app appears in App Store Connect with the expected Bundle ID and public version.
- Roles and app access are limited to the intended people.
- Support, marketing, privacy, App Review, and App Store contact details belong to the recipient.
- App Privacy answers remain accurate for the current binary and data practices.
- New provisioning profiles are associated with the transferred App ID and recipient distribution certificate, as Apple requires.
- A recipient-signed build can be archived and tested without using transferor-owned credentials.
- Every applicable capability in the handoff matrix passes its acceptance test.
- Storefront availability, purchases, subscriptions, sign-in, notifications, cloud data, and support paths behave as expected.
- Webhooks and server traffic reach the intended recipient-owned endpoints.
- The transferor's obsolete access and credentials are revoked after replacement paths are proven.

Run customer-path tests separately from account and build checks. A correct App Store record doesn't prove that existing Sign in with Apple users migrated, that a push server uses the right key, or that a previous customer can still reach cloud data.

For the next update, use a full [App Store Connect release checklist](/blog/app-store-connect-release-checklist/) rather than treating transfer verification as release readiness. App Store Connect remains the source of truth for ownership, agreements, builds, availability, and submission status; the broader [LaunchBuddy vs App Store Connect guide](/blog/launchbuddy-vs-app-store-connect/) explains that boundary.

## Track the transfer in LaunchBuddy without confusing planning with ownership

LaunchBuddy can organize an app, release tasks, default submission checklists, and project notes across iPhone, iPad, and Mac through private iCloud sync. Pro adds custom checklists. That makes it useful for a transfer plan with owner-prefixed tasks such as:

```text
[Transferor] Export App Analytics baseline
[Transferor] Stop TestFlight testing
[Recipient] Create provisioning profiles
[Recipient] Verify production push delivery
[Both] Accept Sign in with Apple migration evidence
```

The two-owner matrix, transfer states, and acceptance gates in this article are a workflow you create; they aren't automatic LaunchBuddy transfer features. LaunchBuddy doesn't test Apple's eligibility criteria, initiate or accept an app transfer, inspect code or entitlements, migrate users, create certificates, or move the project into the recipient's iCloud account. Its private iCloud sync is not a shared team workspace. Keep the authoritative transfer status in App Store Connect and exchange sensitive assets through appropriate systems.

Use the [indie app portfolio management workflow](/blog/indie-app-portfolio-management/) to record why ownership is changing, then keep the transfer itself as a bounded project with an owner and observable evidence for every task.

An app transfer is complete only when Apple shows the new owner **and** the recipient can operate the real app without hidden dependence on the old account. <a href="https://apple.co/3iFcjjW">Download LaunchBuddy to organize the transfer tasks and next release</a>.
