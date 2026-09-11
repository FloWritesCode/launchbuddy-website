---
title: "App Store Campaign Links: How to Create and Measure Them"
description: "Create App Store campaign links, verify placements, understand Apple's attribution and privacy thresholds, and turn campaign data into a clear decision."
pubDate: 2026-09-11
---

**To create an App Store campaign link, open your app in App Store Connect, go to Analytics → Acquisition → Campaigns, select the add button, name the campaign, and copy the generated link.** The link includes a provider token (`pt`) for your developer account and a campaign token (`ct`) for that campaign.

Create a separate campaign token for each source or placement you genuinely need to compare. Record where each link went, when it became active, and what decision its results should inform. Without that context, a link may collect data without producing a useful answer.

This guide covers the standard marketing-link workflow: choose the measurement question, create and verify the link, read Apple's campaign data without mistaking missing data for zero, and turn the result into a keep, stop, or test-next decision.

## Before creating a link, define the decision

Don't begin with a list of every channel you might use. Begin with one question:

- Did the launch email bring first-time downloads?
- Did the documentation banner bring people who later used the app?
- Which of two newsletter placements produced the stronger downstream signal?
- Did a pre-order announcement continue to contribute after release?

Write a compact campaign brief:

```text
Campaign:
App and product page:
Question:
Placement:
Audience:
Start date and time:
End date and time:
Release or marketing changes during the window:
Primary metric:
Supporting metrics:
Review date:
Decision: Keep | stop | revise | test next
```

The brief prevents two common mistakes. First, it keeps you from treating every available metric as equally important. Second, it preserves other changes that may explain the result. A campaign launched on the same day as a new version, price, or product page can't be evaluated as though nothing else changed.

For a release-centered measurement plan, use the baseline and guardrail approach in the [App Store Connect analytics guide](/blog/app-store-connect-analytics/).

## Choose campaign tokens that remain understandable

In Apple's generated URL:

```text
https://apps.apple.com/app/apple-store/id123456789?pt=123456&ct=launch-email&mt=8
```

- `pt` is the **provider token**. Despite the name, it identifies your developer account, not an ad network or publishing partner. Apple generates it when you create your first campaign link; reuse it across campaigns.
- `ct` is the **campaign token**. It identifies the individual campaign whose results you want to view. Change this value to distinguish campaigns.
- `mt` is the **media type token** included in the generated link.

Apple allows up to 30 characters in a campaign name. It can contain alphanumeric characters, spaces, and a documented set of punctuation, but a space can't be the first or last character. A simple naming pattern is easier to filter and less likely to become ambiguous:

```text
2026Sep-Launch-Email
2026Sep-Launch-Docs
2026Sep-Launch-Partner
```

Avoid names such as `social`, `launch2`, or `new-campaign`. They omit either the date, initiative, or placement, so their meaning decays quickly.

Decide the level of comparison before generating links:

| Question | Token design |
| --- | --- |
| Did the launch email contribute? | One token for that email |
| Email versus documentation banner? | One token for each placement |
| Which of three partner newsletters contributed? | One token per partner |
| How did the launch perform overall? | Keep the placement tokens, then review them as one named initiative in your own campaign record |

Resist splitting a low-volume campaign into dozens of tokens. Apple's privacy thresholds may leave each fragment without visible data, and the extra links won't answer a decision you didn't define.

## Create the campaign link in App Store Connect

Apple's current [campaign links documentation](https://developer.apple.com/help/app-store-connect-analytics/acquisition/campaign-links/) gives this path:

1. In **Apps**, select the app.
2. Open **Analytics**.
3. Under **Acquisition**, select **Campaigns**.
4. Select the add button next to Campaigns.
5. Enter the campaign name.
6. Copy the generated link.

If Campaigns or the add button isn't available, check the app's data history before assuming your role or browser is broken. Apple says the feature appears only after an app has generated analytics data. A new app may need to be live and generating downloads for at least 24 hours before you can create its first campaign link.

That creates a timing constraint for a first launch: you may not be able to generate a campaign link before the app has any data. Put a decision point in the launch plan:

```text
First campaign-link check: 24 hours after analytics data begins
If available: create, verify, and replace generic launch links
If unavailable: check again after more downloads; do not fabricate pt or ct values
```

For a pre-order, this means the public product page can exist before Apple's campaign-link control becomes available. Keep that dependency separate from the [App Store pre-order workflow](/blog/app-store-pre-order/), and don't delay product-page verification while waiting for a campaign link.

## Verify every link before distributing it

Copying the generated URL isn't the final check. Test the exact link that will appear in each channel.

1. Confirm the destination is the intended app's product page.
2. Inspect the final URL and verify that both `pt` and `ct` are present.
3. Compare the `ct` value with the campaign record.
4. Test the wrapped or redirected URL if an email service, link shortener, or content system rewrites it.
5. Test outside your signed-in browser when practical so a cached product page doesn't hide a redirect problem.
6. Save the final distributed URL, placement, and activation time.

The App Store redirects people to their local storefront. A region segment such as `/us/` in the URL does not restrict the link to that storefront, so don't create duplicate campaign tokens solely to make the URL look local. If territory is part of the question, analyze territory in App Store Connect.

Use this placement ledger:

| Campaign token | Final URL checked | Placement | Live at | Owner | Result review |
| --- | --- | --- | --- | --- | --- |
| `2026Sep-Launch-Email` | Yes | Subscriber email | YYYY-MM-DD HH:MM | Name | YYYY-MM-DD |
| `2026Sep-Launch-Docs` | Yes | Documentation banner | YYYY-MM-DD HH:MM | Name | YYYY-MM-DD |

This record adds value that the URL alone cannot: it tells you when attribution could have started and whether the intended link actually shipped.

## Understand what Apple attributes

Apple ties campaign-token traffic to metrics including impressions, product page views, downloads, usage, sales, and subscriptions. Availability still depends on the metric, selected date range, user data sharing, and privacy protections.

The key acquisition rule is specific: when someone downloads the app for the first time within 24 hours of using the campaign link or token, Apple counts it as a **First-Time Download** for that campaign. This isn't an unlimited attribution window.

Apple also says that if someone uses more than one campaign link within the relevant period, only the most recent link receives credit for subsequent sales. Therefore:

- Campaign totals aren't a census of everyone influenced by your marketing.
- A click today and first download after the 24-hour window won't satisfy that first-time-download rule.
- For subsequent sales, the most recent eligible campaign link receives credit even when earlier touchpoints also influenced the person.
- Campaign attribution shows association under Apple's rules, not proof that the placement alone caused the result.

Keep those boundaries in the campaign brief. “12 attributed first-time downloads” is a defensible observation. “This email convinced 12 people to install” asserts a cause the report doesn't establish.

## Wait for reportable data, not instant feedback

Apple documents two delays that are easy to misread:

1. A campaign appears in Analytics only after at least 24 hours from launch.
2. Campaign data begins appearing after at least five individual users generate attributed first-time downloads, and each campaign metric must meet a minimum threshold of five in the selected date range to appear.

As a result, a blank row or chart can mean:

- Fewer than 24 hours have passed.
- The link received no qualifying activity.
- Activity exists but hasn't met the visibility threshold.
- The selected date range is too narrow for that metric.
- The distributed URL lost either the provider or campaign token.

Missing data is not evidence of zero. First confirm the link and date range. Then widen the range if it still matches the campaign question. Don't repeatedly rewrite or relaunch a valid URL merely to make a dashboard populate.

Apple applies additional privacy protections to detailed Analytics reports from the App Store Connect API. Rows for very small groups may be withheld or combined. The interactive dashboard remains the right first stop for a small campaign; use exports only when you have a real reporting need and understand their stricter availability.

## Measure the campaign in App Store Connect

After the reporting delay:

1. Open the app's **Analytics**.
2. Review **Campaigns** under Acquisition for the campaign-level view.
3. Open **Metrics**, add the **Campaign** filter, and select the token you want to analyze.
4. Set the campaign's actual active dates.
5. Add only the territory, device, or page-type filters needed for the question.
6. Compare the primary metric with the supporting metrics in the brief.

Apple's [Analytics dashboard documentation](https://developer.apple.com/help/app-store-connect-analytics/overview/analytics-dashboard/) describes Campaigns as the attribution and performance area for marketing links. It also notes that dashboard data is subject to availability and privacy rules.

Read the sequence rather than one number:

```text
Product page views
→ First-time downloads
→ Usage signal, when available
→ Sales or subscription signal, when relevant
```

The first useful question is whether the placement contributed enough reportable activity to inspect. The second is whether the downstream pattern matches the campaign's promise. A placement can drive product page views without enough first-time downloads to appear as a successful acquisition source. Downloads can appear while later usage remains unavailable or weak.

Avoid ranking small campaigns by percentage alone. Keep counts, date ranges, and missing metrics visible.

## Worked example: compare two launch placements

Suppose an indie developer releases version 2.0 and promotes it through a subscriber email and a documentation banner.

Before launch:

```text
Question:
Which owned placement contributes more first-time downloads, and does either
show enough downstream activity to justify repeating?

Email token: 2026Sep-V2-Email
Docs token: 2026Sep-V2-Docs
Primary metric: First-Time Downloads
Supporting metrics: Product Page Views, usage and sales when available
Review window: Seven complete days after both links are live
Other changes: Version 2.0 and new screenshots released the same day
```

At review, the email has visible first-time downloads and the documentation token doesn't meet Apple's display threshold. The correct record is not “email beat docs by 100%.” One campaign has reportable data; the other has an unknown value below or hidden by the relevant threshold.

A useful decision might be:

```text
Decision:
Keep the email placement for the next comparable launch.

Evidence:
The email generated reportable first-time downloads during the seven-day
window. The docs campaign did not produce visible qualifying data.

Caveat:
Version 2.0 and screenshots changed at launch, so post-download behavior
cannot be attributed to the email alone.

Next test:
Revise the documentation callout and run it for a longer fixed window,
using one new token.
```

This is more actionable than declaring a universal winning channel. It preserves what Apple reported, what Apple withheld, and what changed at the same time.

## Connect campaign results to the release timeline

A campaign report answers where attributed activity came from under Apple's rules. A release timeline helps explain what else was happening.

Add these dates beside the campaign:

- App version availability
- Product page or custom product page changes
- Price or subscription-offer changes
- Featuring or In-App Event dates
- Service incidents
- Campaign start, pause, and end

Then classify the result:

| Finding | Next step |
| --- | --- |
| Reportable acquisition and healthy downstream signal | Repeat with the same audience and a fresh token |
| Product page views but no visible first-time-download result | Recheck audience-message fit and wait for a complete window |
| Downloads visible, downstream data unavailable | Extend the review date; record the data as unavailable |
| Strong acquisition with weak later behavior | Review whether the campaign promise matches onboarding and product value |
| No campaign data | Verify tokens, timing, thresholds, and date range before changing strategy |

Finish the review with one owned action, not “monitor performance.” The [iOS post-launch checklist](/blog/ios-post-launch-checklist/) provides a broader fix-now, investigate, observe, or no-action framework.

## Where LaunchBuddy fits

LaunchBuddy doesn't generate App Store campaign links, provide campaign attribution, or replace Apple's Campaigns dashboard. Create links and verify campaign-level results in App Store Connect.

LaunchBuddy can hold the work around that Apple-owned state: the release date, campaign-link setup, placement record, review date, and follow-up decision. Store the record in a project note or split its checks into release tasks. Release planning and taskboards are available on iPhone, iPad, and Mac. The free plan is limited to two apps, two releases, and limited project notes; Pro removes those limits.

LaunchBuddy Pro can also show selected App Store Connect downloads, revenue, and subscription metrics after you connect App Store Connect API credentials. Don't present those totals as campaign-filtered unless you verified the attribution in Apple's Campaigns view. Use LaunchBuddy to connect the observation to the relevant release and next task, while App Store Connect remains the source of truth for the link and attribution.

## Create the link and its decision record together

An App Store campaign link is most useful when its token, placement, timing, and decision are recorded before distribution. Create the link in App Store Connect, verify the final URL, respect the 24-hour attribution rule and privacy thresholds, and compare the result with the events on the release timeline.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy and organize the release work around your next campaign</a>
