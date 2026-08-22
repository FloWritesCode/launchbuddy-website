---
title: "App Store Pre-Order: How to Set Up and Launch Your App"
description: "Set up an App Store pre-order, pass App Review, publish the product page, manage release dates and regions, and prepare a clean launch handoff."
pubDate: 2026-08-22
---

**To set up an App Store pre-order, choose _Publish as Pre-Order_ under Pricing and Availability in App Store Connect, set a release date two to 180 days ahead, select eligible countries or regions, and submit the app version to App Review. For a first release, approval does not publish the pre-order automatically: you must manually release the approved version to make its product page available for pre-order.**

That last step causes avoidable confusion. During a pre-order, “Release This Version” can publish the approved product page without making the app downloadable in pre-order regions. The scheduled pre-order date controls when the app becomes available there.

This guide separates those two events and gives you a practical plan for setup, review, the live pre-order period, and launch day.

## Decide whether a pre-order fits your launch

An App Store pre-order gives customers access to the product page before they can download the app. Apple allows both free and paid apps across its platforms to use pre-orders in a country or region where that app has not already been released.

It is useful when you have:

- A credible launch window rather than an aspirational date
- A product page and reviewable build that represent what customers will receive
- A campaign, announcement, or existing audience that can send people to the page
- A reason to measure orders before release or coordinate availability across regions

A pre-order is a poor substitute for product validation. An order shows launch interest, not activation, retention, or satisfaction. It also creates a visible date and product promise that you may need to revise.

Use this readiness gate before opening App Store Connect:

```text
Pre-order decision
- The app has not been released in each target country or region:
- The review build is ready:
- Product-page claims match that build:
- Support and privacy URLs are live:
- Release date has dependency owners:
- Plan exists for a delayed approval:
- Plan exists for changing or canceling the date:
```

If the build, positioning, or operating plan is still changing weekly, keep working through an [iOS app launch checklist](/blog/ios-app-launch-checklist/) before publishing a date.

## Understand the two dates in an App Store pre-order

Write down two separate milestones:

1. **Pre-order publication:** the approved product page becomes visible and customers can order.
2. **Download release:** the app becomes available to customers on the pre-order release date.

For an app that has never been released in any region, Apple's [version release options](https://developer.apple.com/help/app-store-connect/manage-your-apps-availability/select-an-app-store-version-release-option) require the app version to use manual release. App Store Connect selects “Release the app yourself.” After App Review approves the version, selecting **Release This Version** publishes the pre-order in the chosen regions. Apple says it can take up to 24 hours to appear to all users.

The wording sounds like a public app launch, but the regional availability setting still applies. In a pre-order region, the app remains unavailable for download until its scheduled date. In a region where the app is already available or marked Available on App Release, the same version-release action can make it downloadable.

This matters if you are using different availability states by region. Do not press the button until you have checked what will happen in every selected region and platform.

## How to set up an App Store pre-order

Apple requires the Account Holder, an Admin, or an App Manager role for this workflow. Use the current [Publish for pre-order instructions](https://developer.apple.com/help/app-store-connect/manage-your-apps-availability/publish-for-pre-order/) as the source of truth if the interface changes.

### 1. Set availability to Publish as Pre-Order

In App Store Connect:

1. Open **Apps** and select the app.
2. Open **Pricing and Availability**.
3. In **App Availability**, select **Set Up Availability**.
4. Choose **Publish as Pre-Order**.
5. Select a release date from two to 180 days in the future.
6. Select the countries or regions where the pre-order should be available.
7. Review the selection and confirm it.

Apple permits a pre-order only where the app has not already been available for purchase or download. Once an app has been released in a location, you cannot return that location to pre-order status.

Use a small region record instead of treating availability as one global switch:

| Region group | State before action | Intended result | Date | Owner |
| --- | --- | --- | --- | --- |
| Launch regions | Never released | Pre-order, then scheduled download | YYYY-MM-DD | Name |
| Already-live regions | Available | New version remains available | N/A | Name |
| Later regions | Not available | No change | Review later | Name |

The table forces you to catch mixed-state launches before one release action affects several regions differently.

### 2. Prepare the version for App Review

Setting availability creates the pre-order plan; it does not bypass the ordinary App Store submission work. Complete the version page, select the correct build, verify metadata and screenshots, provide App Review information, and add the version to a submission.

Use the [App Store Connect release checklist](/blog/app-store-connect-release-checklist/) for the broader field-by-field review. For the pre-order itself, add these checks:

- The name, subtitle, description, screenshots, and app previews describe the reviewed build
- The expected release date is supportable in every selected region
- Pricing is intentional for the entire pre-order period
- Any in-app purchase messaging is accurate
- Reviewer access and instructions work now, not only after launch-day changes
- Public support, privacy, and marketing pages are ready for early visitors

In-app purchases cannot themselves be pre-ordered. Apple lets you configure them before and during the period, but promoted in-app purchases do not appear on the product page until the app is available for download. Do not write campaign copy that implies otherwise.

### 3. Submit the app to App Review

Submit the version through App Store Connect and monitor its official status there. A future pre-order date does not reserve an App Review slot or guarantee approval by that date.

Build schedule margin around facts you control:

- Date the review-ready build is due
- Date metadata and reviewer access are frozen
- Latest acceptable approval date for the campaign
- Decision point for moving the public date
- Owner for App Review questions

Avoid inventing a fixed “submit X days early” rule. Review duration and follow-up depend on the submission. A decision point tied to your own campaign is more useful than a universal estimate.

### 4. Manually publish the approved pre-order

When the first-release version reaches **Pending Developer Release**:

1. Open that platform version in App Store Connect.
2. Select **Release This Version**.
3. Review the affected regions and confirm.
4. Check the regional status in App Store Connect.
5. Verify the public product page after processing.

Apple documents pre-order-specific [App Store statuses](https://developer.apple.com/help/app-store-connect/reference/app-information/app-and-submission-statuses/) including **Pre-Order Pending Developer Release**, **Processing to Pre-Order**, and **Pre-Order (Scheduled Release [date])**. Treat the last state and a public-page check as evidence that the pre-order is live. A completed planning task alone is not proof.

If you are releasing more than one platform version, Apple's version-release action is platform-specific. Verify each platform you intend to publish.

## Run the live pre-order as a release, not a countdown

Once the product page is live, your job changes from setup to change control.

### Keep one promise ledger

Create a simple ledger from every customer-facing claim:

| Product-page promise | Verified in build | Launch blocker if false | Evidence owner |
| --- | --- | --- | --- |
| Core workflow | Yes / No | Yes / No | Name |
| Supported device or platform | Yes / No | Yes / No | Name |
| Paid feature or price statement | Yes / No | Yes / No | Name |
| Account, sync, or offline behavior | Yes / No | Yes / No | Name |

Review the ledger whenever the build or product page changes. This is more useful than a generic “metadata reviewed” checkbox because it identifies exactly which promises could become stale.

Apple allows you to submit a new version while the app is available for pre-order. Customers receive the latest version released for distribution. A replacement version therefore needs the same claim review as the original, plus a clear record of which build is expected on release day.

### Monitor orders without treating them as users

Apple provides [pre-order reporting in Sales and Trends](https://developer.apple.com/help/app-store-connect/measure-app-performance/view-units-proceeds-sales-and-pre-orders/), including a Pre-Orders view and downloadable Pre-Order Report. The report can show ordered and canceled units. Apple counts a pre-order as an app unit, and a paid-app sale, when it is fulfilled to the customer.

Keep three events separate:

- **Ordered:** a customer made a pre-order
- **Canceled:** the order was withdrawn before fulfillment
- **Fulfilled:** the app became available and the order completed

That distinction prevents a pre-launch order total from being reported as downloads, active users, or revenue. For the surrounding metric definitions and caveats, use the [App Store Connect analytics guide](/blog/app-store-connect-analytics/).

### Control scope after the page is public

New ideas become more dangerous after a public date exists. Route each request into one of three outcomes:

- **Required for the published promise:** keep it in the launch release and name the verification step.
- **Useful but not promised:** move it to a later backlog or release.
- **Changes the product-page promise:** update the page and recheck the build, screenshots, support material, and schedule.

The question is not “Can we fit this in?” It is “Which public promise or launch risk changes if we do?”

## Change the date, release early, or remove the pre-order

Apple supports three different contingency actions. They are not interchangeable.

### Change the release date

You can edit the date before the app releases in the selected region. For a first-time release, Apple says the revised date must remain within 180 days of the pre-order's initial publication in that region. If the app is already available in at least one other region, Apple documents a 365-day limit from the pre-order's first publication in the affected area.

Regional release time can vary, and a date cannot be changed after it has passed in that region. Update customer-facing plans only after confirming the new setting.

### Release to customers immediately

During the pre-order period, App Store Connect can release the app early in selected pre-order regions. Apple says availability may take up to 24 hours to reach all users. Customers who pre-ordered are notified, eligible automatic downloads occur, and paid-app customers are charged.

Use this only after a launch-readiness check. “The build was approved” is not the same as “support, production services, communications, and monitoring are ready.”

### Remove the pre-order offer

Removing the offer means customers will not receive the app and paid customers will not be charged unless you make it available for pre-order again before the release date. Apple also warns that, after the release date passes, the pre-order cannot be republished.

Record the decision, affected regions, customer communication, and whether a replacement date is still possible before confirming removal.

## Track the LaunchBuddy work without confusing it with Apple state

LaunchBuddy can organize the release tasks, default submission checklist, regional decision record, promise ledger, and launch-day handoff across iPhone, iPad, and Mac with iCloud sync. Those planning features are available on the free plan, subject to its limit of two apps and two releases. Custom reusable checklists require Pro.

LaunchBuddy does **not** configure or publish an App Store pre-order, submit the app to review, build or upload the binary, change regional availability, or prove that an Apple status changed. App Store Connect remains the source of truth for those actions.

A useful LaunchBuddy release structure is:

```text
Pre-order setup
- Confirm eligible regions
- Record scheduled date
- Verify pricing and product-page promises

Review
- Select and verify build
- Complete reviewer access and notes
- Submit in App Store Connect

Pre-order publication
- Confirm Pending Developer Release
- Release each intended platform version
- Verify regional status and public page

Live period
- Review promise ledger after every change
- Record ordered, canceled, and fulfilled metrics separately
- Hold the date-change decision checkpoint

Launch
- Confirm production and support readiness
- Verify availability by region
- Start post-launch monitoring
```

For the difference between this required manual step and ordinary automatic release options, read [Manual vs automatic App Store release](/blog/manual-vs-automatic-app-store-release/).

## Use a launch handoff with observable evidence

Finish the pre-order with a handoff, not a single “launch” checkbox:

```text
App and platform:
Pre-order regions:
Scheduled release date:
Approved version and build:

Before availability
- Production dependencies checked:
- Support owner ready:
- Product page reverified:
- Region list reverified:

After availability
- App downloadable in each intended region:
- Correct version delivered:
- Paid-app price checked, if applicable:
- Pre-order fulfillment reviewed:
- First support and product signals routed:
```

This closes the gap between an approved app, a live pre-order page, and a downloadable release. Keep the official status in App Store Connect, then keep the decisions and follow-up work with the release.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy and plan your next App Store release</a>
