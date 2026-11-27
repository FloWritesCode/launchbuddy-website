---
title: "iOS Alternative Distribution Release Checklist"
description: "A version-by-version checklist for iOS alternative distribution: eligibility, Notarization, marketplace handoff, package IDs, and live verification."
pubDate: 2026-11-27
---

An **iOS alternative distribution release** needs more than an accepted build. For every version, verify the eligible region and channel, complete Apple's agreement and marketplace or domain setup, choose the correct review type, submit the version, wait for its alternative distribution package, hand it to the distributor, and test the live install and update path.

Do not treat Notarization as App Store approval. Apple says a version intended only for alternative distribution can use **Notarization** review, which applies a subset of the App Review Guidelines. A version that will also ship through the App Store should use **App Store** review; if approved, that version can also become eligible for alternative marketplaces and, in the European Union, Web Distribution.

## First, identify the exact distribution lane

“Outside the App Store” is not one workflow. Start each release with a lane record:

```text
App / version / build:
Customer region:
Channel: alternative marketplace / Web Distribution
App Store release too: yes / no
Marketplace name, if applicable:
Website domain, if applicable:
Minimum supported customer OS:
Commercial and support owner:
```

Apple currently [documents alternative app marketplaces](https://developer.apple.com/help/app-store-connect/managing-alternative-distribution/create-a-marketplace-app/) in the **European Union, Brazil, and Japan**. Direct Web Distribution is an EU route for authorized developers distributing their own apps from a registered domain. The device requirements also differ: Apple documents Web Distribution for EU users on iOS 17.5 or later or iPadOS 18 or later, while marketplace availability depends on the region and OS.

Check the current Apple page for the target region before committing to a date. Regional eligibility, business terms, entitlements, fees, and customer-install requirements can change independently of your app build.

This workflow is separate from public, unlisted, and organization-only App Store delivery. If you are choosing between those Apple-hosted options, use the [unlisted vs private distribution guide](/blog/app-store-unlisted-vs-private-distribution/).

## The iOS alternative distribution release checklist

### 1. Confirm account and regional eligibility

- [ ] The customer region supports the planned channel.
- [ ] The Account Holder has accepted the latest Apple Developer Program License Agreement.
- [ ] The developer account meets Apple's current requirements for the route.
- [ ] The commercial owner has reviewed the current fees, commissions, transaction reporting, tax, refund, and support obligations.
- [ ] The intended customer devices meet Apple's minimum OS requirements.

Agreement acceptance is a technical release dependency, not just an administrative note. Apple lists it as a condition for generating an alternative distribution package.

Marketplace operators and Web Distribution developers have additional authorization criteria. Do not copy a marketplace operator's eligibility into an ordinary app developer's checklist. When you distribute through somebody else's approved marketplace, your release dependency is the verified marketplace relationship and that marketplace's acceptance of your app.

### 2. Establish the distribution relationship before review

For an **alternative marketplace**:

- [ ] Give your Developer ID to the marketplace developer.
- [ ] Receive the marketplace-specific token.
- [ ] Have an Account Holder or Admin add that token under **Users and Access → Integrations → Marketplace**.
- [ ] Select the app as eligible for that marketplace.
- [ ] Decide whether the marketplace supports Apple's package notifications or needs a manual handoff.
- [ ] Record the marketplace contact and acceptance criteria.

Apple's [marketplace distribution instructions](https://developer.apple.com/help/app-store-connect/managing-alternative-distribution/manage-distribution-on-an-alternative-app-marketplace/) say the token verifies the relationship. Merely agreeing with a marketplace by email does not make the app eligible in App Store Connect.

For **Web Distribution in the EU**:

- [ ] Confirm Apple has authorized the developer for Web Distribution.
- [ ] Register the owned website domain through the App Store Connect API.
- [ ] Verify the production website and server flow are ready to host and serve Apple's signed assets.
- [ ] Assign owners for installation support, updates, refunds, and required transaction reporting.

Apple's [Web Distribution requirements](https://developer.apple.com/support/web-distribution-eu/) make the developer responsible for the website distribution and customer-support path. A notarized version without a working registered-domain flow is not a release.

### 3. Freeze a version-specific release candidate

- [ ] Record the marketing version and build number.
- [ ] Confirm the build supports iOS, or iPadOS where Apple allows it.
- [ ] Verify the bundle ID and app record.
- [ ] Test the release candidate on the target OS and device classes.
- [ ] Complete the required app and version information in App Store Connect.
- [ ] Prepare accurate App Review information and access instructions.
- [ ] Keep a rollback or incident plan for your own service and distribution channel.

Notarization is not functional testing. Your team still owns sign-in, purchases, migrations, data handling, deep links, server compatibility, and every other behavior customers will encounter.

Keep the build identity in the release record. “The November build” is not enough when a marketplace asks which package replaces the current production version.

### 4. Choose the review type for this version

Use this decision table:

| Intended availability for this version | Review type |
| --- | --- |
| Alternative distribution only | Notarization |
| App Store plus alternative marketplace | App Store |
| App Store plus Web Distribution in the EU | App Store |

Apple applies the selection per version. A previous version's choice does not decide the next one.

For alternative-only distribution, open the version's **App Review Information**, edit **Review Type**, and select **Notarization**. For a version that also needs App Store availability, leave or select **App Store**. Apple's [Notarization submission guide](https://developer.apple.com/help/app-store-connect/managing-alternative-distribution/submit-for-notarization/) documents both paths.

- [ ] The release owner has written down the intended channels.
- [ ] The App Store requirement for this exact version is explicit.
- [ ] The selected review type matches that decision.
- [ ] A second person has checked the choice before submission.

### 5. Submit and capture the Apple receipt

- [ ] Select **Add for Review**.
- [ ] Verify the version becomes **Ready for Review**.
- [ ] Select **Submit to App Review**.
- [ ] Verify **Waiting for Review** or a later status.
- [ ] Record the submitter, timestamp, review type, version, and build.

Add for Review does not send the version to Apple. The handoff happens only after Submit to App Review. The [draft submissions guide](/blog/app-store-connect-draft-submissions/) explains the state boundary in detail.

Use a compact receipt:

```text
Version / build:
Review type:
Submitted by / at:
Apple status:
Marketplace or domain:
Next owner / next check:
```

### 6. Wait for the version's alternative distribution package

Apple generates an alternative distribution package after the version is accepted and its package conditions are met. Each distributed version needs its own package ID.

- [ ] Verify that Apple accepted the intended version.
- [ ] Open **Apps → app → History**.
- [ ] Find the **Alternative Distribution Package ID** beside that version.
- [ ] Copy the ID and store it with the release receipt.
- [ ] Confirm the ID belongs to the correct version before sharing it.

If the field is missing, do not invent or reuse an older ID. Compare the release against Apple's [package-generation conditions](https://developer.apple.com/help/app-store-connect/managing-alternative-distribution/get-an-alternative-distribution-package-id/): current agreement acceptance, an eligible marketplace or registered EU domain, a supported platform build, and an eligible accepted version.

### 7. Complete the distributor handoff

For a marketplace:

- [ ] Send the package ID or package through the agreed channel, or verify Apple's notification reached the marketplace.
- [ ] Get an explicit acknowledgement from the marketplace.
- [ ] Confirm the listing, pricing, regions, support link, and planned availability time.
- [ ] Record who controls the final publish action.

For Web Distribution:

- [ ] Download the signed assets through Apple's supported workflow.
- [ ] Publish them only through the registered production domain and server flow.
- [ ] Verify the installation page describes the correct app and version.
- [ ] Confirm customer support and refund routes are live.

“Apple accepted it” and “customers can install it” are separate gates. The package is an input to distribution; it is not evidence that the marketplace has published the version or that the website installation works.

### 8. Test the live install and update path

- [ ] Use an eligible account, region, device, and OS.
- [ ] Install through the customer-facing marketplace or website path.
- [ ] Verify the displayed developer, app, and version information.
- [ ] Launch the app and test its critical first-run path.
- [ ] Upgrade from the previous production version.
- [ ] Confirm local data, account state, entitlements, and server compatibility survive the update.
- [ ] Verify the distributor's update mechanism can discover the new version.
- [ ] Save the test time, device, OS, previous version, new version, and outcome.

A clean install does not prove that an update is safe. Test both. If the app has persistent data or authenticated sessions, the update result is usually the more important release artifact.

### 9. Close the release with ownership, not a single checkbox

Use four completion states:

| Gate | Evidence | Owner |
| --- | --- | --- |
| Apple accepted | App Store Connect status and submission receipt | Release owner |
| Package ready | Package ID recorded for the exact version | Release owner |
| Distributor published | Marketplace acknowledgement or production web deployment | Marketplace or web owner |
| Customer path verified | Timestamped install and update test | QA or release owner |

Only mark the release complete when all four apply. If one fails, create a bounded follow-up with an owner and next check instead of reopening the entire release.

## Worked example: one EU release, two channels

Suppose version 3.2 will remain on the App Store and also ship through an EU alternative marketplace.

The team selects **App Store** review because the version needs both channels. Before submission, an Admin adds the marketplace token and marks the app eligible. After Apple approves version 3.2, the team copies that version's package ID from History and sends it to the marketplace. The marketplace acknowledges the package and schedules publication.

The release is still open. One tester updates from marketplace version 3.1 to 3.2 on an eligible EU device, while another verifies the App Store build. The team records both outcomes separately because approval, marketplace publication, and customer installation are different events.

If version 3.3 later becomes alternative-only, its owner can select **Notarization** for that version. The 3.2 review choice does not carry forward as a permanent app setting.

## Where LaunchBuddy fits

LaunchBuddy can hold the version-scoped tasks, owner handoffs, release notes, and checklist progress around this process. It does **not** accept Apple agreements, authorize a region, add a marketplace, register a domain, select the review type, submit for Notarization, generate or validate package IDs, host signed assets, or publish through a marketplace.

Release planning, taskboards, and default App Store submission checklists are available on LaunchBuddy's Free plan within its two-app and two-release limits. A reusable alternative-distribution checklist like the one above requires Pro's custom checklist feature. Keep Apple's status and the distributor's production evidence as the authoritative records; use LaunchBuddy to keep the work and owners attached to the version.

For the App Store portion of a dual-channel release, pair this process with the broader [App Store Connect release checklist](/blog/app-store-connect-release-checklist/).

Copy this checklist into the next version before you submit it, then <a href="https://apple.co/3iFcjjW">use LaunchBuddy to keep every approval, handoff, and live check attached to the release</a>.
