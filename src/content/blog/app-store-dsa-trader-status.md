---
title: "App Store DSA Trader Status: A Developer Checklist"
description: "Declare App Store DSA trader status, verify public contact details, audit every app, and preserve evidence without treating the process as legal advice."
pubDate: 2026-11-09
---

Apple requires developers using App Store Connect to declare whether their account has **trader status** under the EU Digital Services Act (DSA), even if they don't distribute apps in the EU. If you're a trader with an app available in any of the EU's 27 territories, Apple verifies and displays the contact information you provide on that app's product page. EU availability depends on providing and, when required, verifying the status.

The declaration is a legal self-assessment, not an App Store optimization setting. Apple can't decide your status for you, and neither can LaunchBuddy. If the answer isn't clear, get advice from a lawyer familiar with your business and EU consumer law before changing the account or app-level setting.

Use this checklist:

- [ ] Name an Account Holder or Admin to own the declaration.
- [ ] Record which apps are distributed in the EU.
- [ ] Decide trader status using qualified advice when necessary.
- [ ] Gather the correct public contact details and verification documents.
- [ ] Complete the account-level DSA declaration in App Store Connect.
- [ ] Check the DSA setting for every app after the account declaration.
- [ ] Add a Labels and Markings URL for an app when applicable.
- [ ] Wait for required verification to complete.
- [ ] Verify each affected app's EU availability and public disclosure.
- [ ] Keep a dated receipt for the decision and add a release recheck trigger.

## Gate 1: Separate the legal decision from the App Store task

Apple defines a trader as a person or legal entity acting for purposes related to a trade, business, craft, or profession. Its [DSA trader requirements](https://developer.apple.com/help/app-store-connect/manage-compliance-information/manage-european-union-digital-services-act-trader-requirements/) list several non-exclusive factors that may indicate trader status:

- The app generates revenue through a price, In-App Purchases, or advertising.
- You advertise or promote products or services to consumers.
- You're registered for VAT.
- You develop the app as part of a trade, business, craft, or profession.
- You have a legal status associated with business activity.

No single item in that list is a universal decision rule. A free app can still be connected to a business, while Apple says a hobbyist who built an app with no intention of commercializing it may not be a trader. Record the facts you relied on, but don't turn them into a homemade legal test.

Use a short decision record:

```text
Account:
Decision owner:
Decision: Trader | Not a trader | Legal review required
EU distribution in scope:
Facts reviewed:
Advisor or authoritative guidance used:
Decision date:
Next review trigger:
```

Keep legal analysis and identity documents in an appropriately secured system. Your release tracker only needs the owner, outcome, date, and a safe pointer to the source record.

## Gate 2: Prepare the account-level declaration

Only an Account Holder or Admin can complete the compliance flow. Before opening App Store Connect, identify the information Apple will display and the information it needs for verification.

| Enrollment type | Information Apple displays |
| --- | --- |
| Organization | The address associated with the D-U-N-S Number, plus a phone number and email address |
| Individual | An address or P.O. Box, phone number, and email address |

Apple says all traders also need payment account details in App Store Connect if they haven't already provided them, and must certify that they offer only products or services that comply with applicable EU law.

Run this privacy preflight before submitting:

- Confirm that the address, phone number, and email address are suitable for public display.
- Make sure the email inbox and phone number are monitored.
- If an individual uses a P.O. Box or other alternate address, gather a document that shows the association with it.
- For an organization, confirm whether the D-U-N-S address is current. Apple directs organizations to contact it when the physical address needs updating.
- Don't put verification documents, personal identifiers, or banking details in a general release task.

Apple's [Developer Program privacy notice](https://developer.apple.com/support/privacy) confirms that contact or business information may appear on an app product page where local law requires it. Treat this as a publication step, not just an internal account form.

## Gate 3: Complete and verify the account declaration

In App Store Connect:

1. Open **Business**.
2. On **Agreements**, find the **Compliance** section.
3. Next to **Digital Services Act**, select **Complete Compliance Requirements**.
4. Choose **This is a trader account** or **This is not a trader account**.
5. If you selected trader, enter or confirm the contact information.
6. Verify the email address using two-factor authentication.
7. Verify the phone number using two-factor authentication, or request manual verification if it can't receive a code.
8. Upload the current business or legal records Apple requests to verify the business name and address.
9. Review the information and confirm it.

Don't mark the task complete when the form is merely saved. Record whether Apple's required verification is complete. Apple doesn't publish a guaranteed completion time in this guidance, so use the visible App Store Connect state rather than an assumed deadline.

```text
Account declaration receipt
Submitted by:
Submitted at:
Declared status:
Public email checked:
Public phone checked:
Public address checked:
Verification state:
App audit owner:
```

## Gate 4: Audit the status app by app

An account-level trader declaration isn't the end of the audit. Apple allows the status to be changed for individual apps, so review the setting for every app in the portfolio.

For each app:

1. Open **Apps** and select the app.
2. Choose **App Information**.
3. Find **App Store Regulations and Permits**.
4. Under **Digital Services Act**, select **Edit**.
5. Confirm the app-specific status.
6. If this is the first trader declaration, complete the contact-information verification Apple requests.
7. If applicable, select **Add Labels and Markings** in the same section and enter the URL for labels or markings required by EU law.

Use a portfolio matrix instead of one account-wide checkbox:

| App | EU distribution | Expected status | App Store Connect status | Verification | Owner |
| --- | --- | --- | --- | --- | --- |
| App A | Yes | Trader | Trader | Complete | Account Holder |
| App B | No | Not acting as an App Store trader in the EU | Confirmed | Not applicable | Admin |
| App C | Yes | Legal review required | Unchanged pending advice | Blocked | Account Holder |

The “expected status” column is a decision input, not a LaunchBuddy or Apple recommendation. The App Store Connect column records what is actually configured.

If you manage several products, attach this audit to your [indie app portfolio review](/blog/indie-app-portfolio-management/) rather than rediscovering it during an urgent submission.

## Gate 5: Verify the live outcome

Apple states that verified trader contact information is published on product pages for apps distributed in any EU territory. It also states that EU consumers viewing a non-trader app are informed that consumer rights from applicable consumer-protection laws don't apply to contracts between them and the developer.

For every affected app, preserve evidence of four separate outcomes:

```text
App:
App-specific DSA setting:
Verification complete in App Store Connect:
Available in intended EU territories:
Expected disclosure visible on the product page:
Checked by and date:
Evidence location:
Follow-up:
```

This distinction matters because each line can fail independently. A correct legal decision doesn't prove the App Store Connect setting was saved. A saved setting doesn't prove verification finished. Completed verification doesn't replace a check that the app is available where you intend to distribute it.

Apple's February 2025 notice says apps without trader status were [removed from the EU App Store](https://developer.apple.com/news/?id=6agg0lja) until the status was provided and verified. If an app is unexpectedly absent, first compare its app-specific setting and verification state with the account receipt. Don't start by changing pricing, the binary, or unrelated metadata.

Add DSA status to the compliance section of your [App Store Connect release checklist](/blog/app-store-connect-release-checklist/), especially before a first launch, a new EU distribution decision, or an account change. For a new product, include it in the broader [iOS app launch checklist](/blog/ios-app-launch-checklist/) before announcing availability.

## When to reopen the checklist

Trader status isn't a release-by-release creative decision, but its supporting facts can change. Reopen the record when:

- A hobby project becomes monetized or starts promoting a business.
- An app begins or stops EU App Store distribution.
- An individual account becomes part of a business operation.
- The public email, phone number, address, or D-U-N-S-linked address changes.
- Apple requests new verification.
- Ownership or the responsible App Store Connect role changes.
- A product page doesn't show the expected disclosure.

Set the trigger when you close the task. “Check later” isn't useful unless it names the event or date that creates the review.

## Where LaunchBuddy fits

In LaunchBuddy, represent this work as release tasks or checklist items next to the affected app and version. Its portfolio, release planning, taskboards, and default App Store submission checklists work on iPhone, iPad, and Mac. The Free plan supports two apps and two releases; custom reusable checklists require Pro.

Project tasks, releases, and notes sync through the user's private iCloud account. Even so, a task manager isn't the right place for identity documents, bank details, or a full legal file. Store a safe reference to the controlled evidence instead.

LaunchBuddy doesn't classify a developer as a trader, verify contact details, change DSA settings, submit compliance information, or control EU availability. These tasks don't require LaunchBuddy's App Store Connect API integration. App Store Connect remains the authoritative place for the declaration and its status.

## Frequently asked questions

### Do I need to declare DSA trader status if my app isn't in the EU?

Yes. Apple says every developer must declare a trader status even without EU App Store distribution. It also says that a developer who distributes only through TestFlight, alternative distribution, or App Store territories outside the EU isn't acting as a trader **on the App Store**. That doesn't replace an assessment of other legal obligations.

### Will my contact details be public?

If you're a verified trader with an app distributed in the EU, Apple says the address, phone number, and email address supplied for DSA display appear on the app's product page in those territories. Review those details as public information before confirming them.

### Can different apps use different trader settings?

Apple provides an app-specific DSA control under App Information, so you can change the status for individual apps. The correct setting still depends on the facts and qualified advice; the existence of the control isn't permission to choose whichever state is more convenient.

Turn this audit into a repeatable release gate: <a href="https://apple.co/3iFcjjW">download LaunchBuddy and add a DSA trader-status check to your next app release</a>.
