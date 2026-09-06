---
title: "How to Reset Your App Store Rating Without Losing Context"
description: "Learn when and how to reset an App Store overview rating, what Apple keeps, and how to document the decision before releasing a new version."
pubDate: 2026-09-06
---

You can **reset an App Store rating only when releasing a new app version**. In App Store Connect, open the version you plan to submit, find **Reset Overview Rating**, select **Reset rating when this version is released**, and save. The reset takes effect when that version goes live, not when you select the option or submit for review.

Treat this as an irreversible release decision, not a quick way to hide negative feedback. After the version is released, Apple won't restore the previous overview rating. Every country and region is affected at once, while existing written reviews remain visible.

## What an App Store rating reset actually changes

Apple's [rating-reset documentation](https://developer.apple.com/help/app-store-connect/monitor-ratings-and-reviews/reset-an-app-overview-rating/) draws a narrow boundary around the feature:

- It resets the overview rating when a new version is released.
- The product page shows that the rating was recently reset.
- A new overview rating appears after enough users rate the new version.
- The old overview rating can't be restored after release.
- Written customer reviews aren't removed.
- The reset applies to every country or region simultaneously.
- For a universal app, it applies only to the platform version you reset.
- App bundles can't have their rating reset.

Although each App Store country or region displays its own overview rating, the reset choice isn't territory-by-territory. One reset affects them all.

The distinction between ratings and reviews matters. Stars contribute to the overview rating, but written reviews remain part of the public history after a reset. If old reviews describe problems that no longer exist, reply with the corrected, publicly available version rather than assuming the reset will erase that context. The [App Store review management workflow](/blog/app-store-review-management/) explains how to route those reviews into fixes and follow-up.

## Should you reset your App Store rating?

Reset only when the new version materially changes the experience behind the old rating and you can verify those changes in the release candidate. Apple's broader [ratings and reviews guidance](https://developer.apple.com/app-store/ratings-and-reviews/) recommends using resets sparingly. It warns that having few ratings may discourage potential users while the new overview rating rebuilds.

Use this four-part gate before selecting the option:

1. **Diagnose the old rating.** Identify recurring, specific review themes instead of treating the overview number as a diagnosis.
2. **Map each important theme to a verified change.** The fix must be in the exact build being released, not merely planned or merged.
3. **Check the unresolved experience.** If the main complaints still apply, a reset removes the accumulated rating without changing what new customers will encounter.
4. **Accept the low-data period.** Apple doesn't publish a universal number of new ratings or a fixed time required for the replacement overview rating to appear.

A reset is easier to justify after a substantial correction: for example, a release that fixes a reproducible launch crash, replaces a broken account flow, and resolves the dominant complaints in recent reviews. It is harder to justify after a small visual update or when the team can't explain why customers rated the app poorly.

### Use a decision table, not intuition

Before release, classify the evidence:

| Question | Reset is more defensible when | Keep the rating when |
| --- | --- | --- |
| What caused the poor experience? | Repeated reviews and product evidence point to specific problems | The reason is unknown or based only on the star average |
| What changed in this version? | The exact release candidate fixes the important problems | Fixes are partial, untested, or scheduled for later |
| What will old written reviews show? | You can accurately reply that a relevant fix is now available | The reviews still describe the current experience |
| Can the app rebuild rating evidence? | The app receives enough legitimate rating activity to tolerate a sparse period | Rating activity is rare and the existing history is still representative |
| Is the decision documented? | The release record names the evidence, tradeoff, and owner | The reset is an unowned reaction to a disappointing number |

This won't predict the new rating. It checks that the decision follows a product change rather than wishful thinking.

## Record the decision before submitting

Add a rating-reset record to the release while evidence is still easy to verify:

```text
App and platform:
Version and build:
Planned release method:

Current overview rating:
Rating count and date captured:
Countries or regions reviewed:

Dominant review themes:
- Theme:
  Evidence:
  Affected versions:
  Verified change in this build:
  Test result:

Important unresolved themes:
Expected rating frequency:
Reason to reset or retain:
Decision owner:
Decision date:

After release:
- Confirm public version
- Confirm reset state
- Record reset date
- Revisit relevant written reviews
- Compare later evidence on:
```

Save the rating count with the date and territory context. A screenshot or copied number without that context becomes misleading as new ratings arrive. Keep review excerpts concise and avoid copying personal information into a project record.

For post-release measurement, define the comparison before launch. Keep ratings, reviews, downloads, conversion, and stability signals separate; they answer different questions. The [App Store Connect analytics guide](/blog/app-store-connect-analytics/) covers fair date windows and cautions for low-volume data.

## How to reset the App Store overview rating

Apple currently requires the **Admin** or **App Manager** role for this action.

1. Sign in to App Store Connect and open **Apps**.
2. Select the app.
3. In the sidebar, open the app version you intend to submit.
4. Find the **Reset Overview Rating** section.
5. Select **Reset rating when this version is released**.
6. Click **Save**.
7. Submit the version through the normal App Review process.
8. After release, verify the public product page and the reset date on the **Distribution** tab's **Ratings and Reviews** page.

Do not mark the task complete at step 6. Saving the option doesn't reset anything immediately. According to Apple, the reset occurs after the submitted version is released on the App Store.

If you can't see the control, confirm all three prerequisites before troubleshooting further:

- You opened a new version that can be submitted, rather than only the general Ratings and Reviews page.
- Your role is Admin or App Manager.
- You are working with a supported app platform rather than an app bundle.

Avoid asking someone to increase their role solely to bypass a missing-control investigation. First have an existing Admin or App Manager verify the app, version, and control.

## Worked example: reset after a corrected major release

Suppose version 3.0 introduced a migration failure. Recent one- and two-star reviews consistently describe missing local projects after upgrade. Version 3.1 contains a tested migration fix and recovery path.

A useful decision record would say:

```text
Decision: Reset when 3.1 is released

Evidence:
- 12 recent written reviews describe the same post-upgrade symptom.
- Support reports and a reproduced test confirm the migration failure.
- Build 3.1 (241) passes upgrade tests from the affected 2.x states.

Remaining risk:
- Two older reviews concern pricing, which 3.1 does not change.
- Those written reviews will remain visible.

Release follow-up:
- Verify 3.1 is publicly available before replying "fixed."
- Confirm the reset date in App Store Connect.
- Watch for new migration reports and rating activity without promising a target score.
```

The reset decision is traceable because it connects customer evidence to a verified build. If the upgrade tests were incomplete, the correct decision would be to keep the rating and delay the reset decision, even if 3.1 were otherwise ready to ship.

## After the reset: rebuild evidence honestly

Once the new version is live:

1. Confirm that the intended version and build are public.
2. Verify the recently-reset state on the product page.
3. Record the reset date shown in App Store Connect.
4. Reply to relevant old reviews only after the fix is available to customers.
5. Monitor new reviews for recurrence of the original problem.
6. Compare complete pre- and post-release periods, keeping raw counts beside averages.

Don't manufacture a rating campaign around the reset. Ask for ratings at appropriate moments in the product experience and follow Apple's guidance for its standard review-request API. A new overview rating is useful only if it reflects the app customers actually receive.

If a review mentioned the corrected issue, a concise reply can identify the released version and invite the reviewer to try it. It shouldn't pressure the reviewer to change their rating. For wording and verification checks, use the [App Store review reply guide](/blog/app-store-review-reply-generator/).

## Where LaunchBuddy fits

The rating reset itself stays in App Store Connect; LaunchBuddy doesn't provide a verified control for it. LaunchBuddy is useful for preserving the decision around the Apple action.

With LaunchBuddy Pro and App Store Connect API credentials, the reviews inbox can help you inspect review feedback and turn a review into product work. On the release board, you can represent each reported theme, verified fix, test result, and post-release check as work attached to the version. LaunchBuddy's selected App Store analytics can add later context, while Apple's systems remain the source of truth for the overview rating, reset date, detailed analytics, and release state.

That separation prevents a common failure: resetting a rating in one system while the reasons, fixes, and follow-up remain scattered elsewhere. Keep the rating-reset record with the broader [iOS release management workflow](/blog/ios-app-release-management/) so the person approving the release can see both the customer evidence and the tested build.

## Make the reset a release decision

An App Store rating reset is appropriate only when a new version has genuinely changed the experience represented by the old rating. Verify the build, preserve the written-review context, accept that the old overview rating can't be restored, and plan how you will evaluate new evidence after release.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy and keep your next release decision connected to the work behind it</a>
