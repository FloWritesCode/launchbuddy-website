---
title: "App Store Connect Peer Group Benchmarks: How to Read Them"
description: "Learn how to interpret App Store Connect peer group benchmarks, percentiles, privacy limits, and trends without mistaking context for a target."
pubDate: 2026-10-01
---

**App Store Connect peer group benchmarks** compare your app with aggregated results from similar App Store apps. Use them as directional context: confirm the peer group, read the metric's direction, compare a trend rather than one week, and finish with one investigation or experiment. They're not competitor rankings, universal targets, or proof that a specific product change will work.

One interpretation rule is easy to miss: a percentile describes the share of peer-group apps below a value. Higher is usually favorable for conversion, retention, and proceeds, but lower is favorable for crash rate. Always interpret the metric before interpreting the percentile.

## What App Store Connect peer group benchmarks measure

Apple creates peer groups from three characteristics:

1. **App Store category:** Your app is compared within a category selected for it in App Store Connect. When enough data is available, you can choose a primary category, secondary category, subcategory, or all categories.
2. **Business model:** Apple groups apps with comparable models. Its current definitions include free, paid, freemium, paymium, and subscription models. A freemium or paymium app enters the subscription model when at least half of its revenue comes from auto-renewable subscriptions.
3. **Weekly download volume:** Apple groups similar download levels into low-, medium-, or high-volume tiers.

Apple's [peer group benchmarks documentation](https://developer.apple.com/help/app-store-connect-analytics/benchmarks/peer-group-benchmarks/) lists these eligible metrics:

| Benchmark metric | What Apple's benchmark compares | Preferable raw direction |
| --- | --- | --- |
| Conversion Rate | Total downloads and pre-orders divided by unique-device impressions | Higher, with traffic-mix caveats |
| Day 1, Day 7, and Day 28 Retention | Devices that return on the named day within an installation cohort | Higher |
| Crash Rate | Crashes divided by sessions | Lower |
| Proceeds per Paying User | Proceeds divided by paying users | Higher, but sensitive to product and price mix |
| Day 35 Download to Paid Conversion | Percentage of first-time downloads or redownloads followed by an In-App Purchase within 35 days | Higher |
| Day 35 Proceeds per Download | Average proceeds generated within 35 days of a download or redownload | Higher |

Availability depends on the app and its data. For example, Apple says a free app will not show proceeds per paying user. A peer group may also be too small to publish.

## How to read the 25th, 50th, and 75th percentiles

A percentile is a boundary in the peer group's distribution:

- **25th percentile:** 25% of apps have a value below this boundary.
- **50th percentile:** 50% of apps have a value below this boundary. This is the median, not an average.
- **75th percentile:** 75% of apps have a value below this boundary.

Suppose your retention value sits between the 50th- and 75th-percentile lines. That means it is above the median value for the selected peer group. It does not mean your app retains 50–75% of users, and it does not reveal which apps are in the group.

Crash rate reverses the usual visual instinct. A crash rate below the 25th-percentile value is directionally favorable because fewer crashes per session are better. A crash rate above the 75th-percentile value deserves investigation. Don't translate “higher percentile” into “better” until you've checked the metric's direction.

Percentiles also don't show the distance between apps. A narrow gap and a large gap can both place an app between the same two boundaries. Keep your app's actual value and trend beside its relative position.

## A seven-step benchmark workflow

### 1. Start with one decision

Don't scan every card looking for something below median. Begin with a decision the benchmark can inform:

- Should conversion be the next acquisition investigation?
- Did a release improve retention relative to both our history and comparable apps?
- Is crash rate unusually high for apps with a similar profile?
- Is monetization the current constraint, or is acquisition the earlier problem?

Write the question before opening the dashboard. This prevents a low percentile from becoming an automatic project.

### 2. Open the benchmark and record its period

In App Store Connect, select the app, open **Analytics**, then choose **Benchmarks**. The summary defaults to the most recent week for which benchmark data is available. Use **View Trends** for a time series; Apple's current detailed view opens with 26 weeks by default and allows a different range.

Record the exact period you are reading. Benchmark metrics are displayed in weekly intervals, so a partial daily comparison elsewhere in Analytics is not the same evidence.

### 3. Confirm the peer group

Before looking at the app's position, record:

```text
Category:
Business model:
Download-volume tier:
Benchmark week or range:
```

The default view uses the app's primary category and business model. A category can be technically valid yet too broad for the decision. Compare a secondary category, subcategory, or all categories only when that comparison represents the audience you are trying to understand.

Download volume matters too. Apple assigns volume groups for a given week, so don't assume an old screenshot and a current trend use identical context. Select the more specific volume group when Apple makes it available, then preserve that choice in your notes.

### 4. Check the metric definition and direction

Copy the definition, not just the label. Apple's conversion rate, for example, uses total downloads and pre-orders over unique-device impressions. It is not downloads divided by product-page views.

Then label the desired direction:

```text
Metric: Crash Rate
Definition: Crashes divided by sessions
Desired direction: Lower
```

This small step prevents percentile inversion and catches mismatched metrics. The broader [App Store Connect analytics guide](/blog/app-store-connect-analytics/) explains how downloads, installations, proceeds, retention, and other similar labels differ.

### 5. Read position and trend together

Use the selected percentile line as context, then ask whether your own result is improving, stable, or deteriorating over several complete weeks.

| Relative position | Your app's trend | Sensible response |
| --- | --- | --- |
| Favorable to peers | Improving or stable | Preserve what is working; do not manufacture a project |
| Favorable to peers | Deteriorating | Investigate the regression before it crosses a benchmark |
| Unfavorable to peers | Improving | Continue the current intervention and set a review date |
| Unfavorable to peers | Deteriorating | Prioritize diagnosis, subject to impact and data quality |

“Favorable” normalizes the metric's direction: above peers can be favorable for retention, while below peers can be favorable for crash rate.

A benchmark answers **relative position**. Your own trend answers **direction of travel**. You need both. An app in an unfavorable position but improving for six weeks may need patience; an app in a favorable position but deteriorating after a release may need prompt investigation.

### 6. Diagnose before choosing a fix

The benchmark identifies an area to inspect, not a cause. Move into the relevant App Store Connect view and segment your own data:

| Benchmark signal | Check next | Avoid assuming |
| --- | --- | --- |
| Conversion is unfavorable | Source, territory, product page, campaign, and recent metadata changes | “The screenshots are bad” |
| Retention is unfavorable | Cohort maturity, app version, source, onboarding changes, and crashes | “We need more notifications” |
| Crash rate is unfavorable | App version, OS version, device, and detailed reports in Xcode | “The latest feature caused it” |
| Proceeds per paying user is unfavorable | Product mix, price changes, territory, renewals, and refunds | “Raise every price” |
| Download-to-paid conversion is unfavorable | Cohort age, purchase path, offer, source, and product eligibility | “The paywall is the only problem” |

Benchmarks aggregate apps with shared characteristics; they do not control for your positioning, audience quality, release history, or product design. Investigate those differences with your own data.

### 7. End with one bounded action

Close the review with one of four outcomes:

- **Investigate:** Name the segment and evidence to inspect.
- **Experiment:** State the hypothesis, controlled change, metric, and decision date.
- **Observe:** Keep the metric under review until a named date or mature cohort.
- **No action:** Record why the result is acceptable or too weak to use.

For a conversion question, the next action might be a Product Page Optimization treatment. Keep its hypothesis, control, audience, and result in an [ASO experiment tracker](/blog/aso-experiment-tracker/). For a release-linked change, attach the review date to the [iOS post-launch checklist](/blog/ios-post-launch-checklist/) instead of relying on memory.

## Copyable benchmark decision record

Use one card per metric and decision:

```text
Question:
App and public version:

Benchmark metric:
Metric definition:
Desired direction: Higher | Lower

Benchmark week or range:
Category:
Business model:
Download-volume tier:
Percentile used:
App value:
Peer percentile value:

App trend: Improving | Stable | Deteriorating
Own historical baseline:
Data limitations:

Relevant changes:
- Release:
- Product page:
- Acquisition:
- Pricing or offers:

What the benchmark supports:
What it does not establish:

Decision: Investigate | Experiment | Observe | No action
Next step:
Owner:
Review date:
```

The “does not establish” line is deliberate. A useful note might say, “The selected peer comparison shows conversion below the median; it does not show that screenshots caused the gap.” That sentence keeps context from turning into a false diagnosis.

## Worked example: from a benchmark to an honest experiment

Imagine a focus app whose conversion rate is below the selected peer-group median and has declined across several complete weeks. The decline began after a screenshot update, but a marketing campaign also changed the source mix.

The benchmark supports prioritizing acquisition diagnosis. It does not prove the screenshots caused the decline.

The next record could be:

```text
Decision: Investigate
Next step:
Compare conversion by source, territory, and product page across complete
periods before and after the screenshot update.

Experiment rule:
If the decline remains on the default product page within the same source
and territory, prepare one Product Page Optimization treatment that changes
the opening screenshot message.

Guardrails:
Keep price, app version, and campaign routing documented during the test.
```

This is more defensible than creating a vague “improve conversion” task. It narrows the evidence first and makes the later experiment falsifiable.

## Privacy limits and missing benchmark data

Apple uses differential privacy for benchmark values. It requires enough apps in each peer group and adds noise to help prevent individual app results from being inferred. Where the customer journey is comparable, Apple's own apps may be included.

Usage-based benchmark data includes only users who agreed to share app analytics with developers. As a result:

- A missing benchmark is not a zero.
- A small peer group may be unavailable.
- A more specific download-volume group may not be offered.
- Benchmark values are directional context, not exact competitor measurements.
- Week-to-week movement can reflect changes in both your app and the protected peer distribution.

If a group is too small, Apple suggests choosing a different category group. Do that only when the broader group still matches your decision. More data from an irrelevant comparison is not necessarily more useful.

## Where LaunchBuddy fits

Apple's Benchmarks dashboard remains the source of truth for peer groups, percentile lines, and official metric definitions. LaunchBuddy does not replace that benchmark view.

LaunchBuddy Pro costs $2.99 per month or $19.99 per year. Its App Store Connect integration requires an API key and provides a focused analytics dashboard for downloads, revenue, and subscription metrics. Apple's benchmark percentiles are outside that documented scope. Pro also includes ASO experiment tracking. Release planning and taskboards are available in both Free and Pro.

A clean division of work is:

1. Read and segment the official benchmark in App Store Connect.
2. Record the selected group, period, caveat, and decision.
3. Put the bounded investigation into a task tied to the relevant LaunchBuddy app and release, or record a conversion experiment in that app's ASO experiment tracker.
4. Return to App Store Connect on the review date for the authoritative result.

That keeps the comparison in Apple's system and the follow-through beside the work it should influence.

## Treat the benchmark as context, not a finish line

Peer group benchmarks are most useful when they change the order of investigation, not when they become a score to chase. Confirm the comparison group, normalize the metric direction, read position with trend, and check your own segments before changing the product.

Then make one explicit decision. Investigate, experiment, observe, or move on.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy and turn benchmark findings into release work</a>
