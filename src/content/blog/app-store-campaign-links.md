---
title: "App Store Campaign Links: How to Create and Measure Them"
description: "Create App Store campaign links, use provider and campaign tokens correctly, test each placement, and measure results without misreading privacy thresholds."
pubDate: 2026-09-12
---

**To create an App Store campaign link, open your app in App Store Connect, go to Analytics → Acquisition → Campaigns, select the add button, name the campaign, and copy the generated URL.** The link contains a provider token (`pt`) for your developer account and a campaign token (`ct`) for that specific campaign.

Creating the link takes only a few steps. The useful work is deciding what each token represents, deploying one link per question, and reading the result within Apple's attribution and privacy limits.

This guide gives you a repeatable workflow for creating, checking, and reviewing **App Store campaign links** without treating every attributed download as proof that a channel caused long-term growth.

## Check whether App Store Connect can create the link

Apple's [campaign links documentation](https://developer.apple.com/help/app-store-connect-analytics/acquisition/campaign-links/) says the Campaigns feature appears only after an app has received analytics data. For a new app, the Campaigns tab or add button may be unavailable until the app has been live and generating downloads for at least 24 hours.

That creates a real first-launch limitation: you may not be able to prepare an Apple campaign link before the app has any data. Don't invent the tokens or copy them from another developer account. Use the ordinary App Store product-page URL until the control becomes available. Then create and deploy trackable links as soon as your launch plan allows.

Before continuing, confirm:

- the public App Store product page opens correctly;
- the app has begun generating analytics data;
- **Analytics → Acquisition → Campaigns** and its add button are visible;
- you know which placement the link will represent;
- the person reviewing the campaign can access App Store Connect Analytics.

Apple's [Analytics dashboard documentation](https://developer.apple.com/help/app-store-connect-analytics/overview/analytics-dashboard/) lists Account Holder, Admin, Finance, or Sales as the roles that can access the dashboard. If Campaigns is missing after the app has data, check access before diagnosing the URL.

## Define the campaign before naming the token

A campaign token should answer one bounded question. “Launch” is too broad if the same URL appears in an email, a press kit, three social profiles, and a partner newsletter.

Start with this brief:

```text
Campaign question:
Audience:
Placement:
Destination app:
Live date and time:
End or review date:

Expected user action:
Primary metric:
Useful context metrics:
Release or product-page changes during the window:
Decision this evidence will inform:
```

For example:

```text
Campaign question:
Does the September customer email bring existing readers to the new app?

Audience:
Current newsletter subscribers

Placement:
September release email, main button

Live date and time:
2026-09-15 09:00 UTC

Primary metric:
First-Time Downloads attributed to the campaign

Useful context metrics:
Product Page Views, Total Downloads, App Opens, retention when available

Other changes:
Version 2.4 released the same morning

Decision:
Keep email as a release channel, revise its promise, or stop using it
```

Because the release happened at the same time, this isn't a clean experiment. The record still makes the result interpretable: it shows what was promoted, where the link appeared, and why a strong causal claim isn't justified.

## Use a token naming system that survives the next release

App Store Connect allows a campaign name of up to 30 characters. Apple accepts alphanumeric characters, spaces, and many punctuation marks, but a space can't be the first or last character.

Use a simpler internal convention than the field permits. A compact name such as `email-sep26-v24` is easier to recognize, copy, and compare than `September Launch Campaign Final`.

A useful pattern is:

```text
channel-period-creative
```

Examples:

- `email-sep26-v24`
- `press-sep26-kit`
- `partner-oct26-banner`
- `website-fall26-header`

Include only dimensions that change the decision. If two buttons in one email have the same audience, promise, and destination, separate tokens may create noise rather than insight. If two partners have different audiences and future budget decisions, give each partner a distinct token.

Keep a register outside the token itself:

| Campaign token | Placement | Audience | Live date | App version | Review date |
| --- | --- | --- | --- | --- | --- |
| `email-sep26-v24` | Release email button | Subscribers | Sep 15 | 2.4 | Sep 23 |
| `press-sep26-kit` | Press-kit CTA | Journalists and readers | Sep 15 | 2.4 | Sep 30 |

The token identifies the campaign. The register preserves the context needed to interpret its results.

## Create the campaign link in App Store Connect

Follow Apple's current control path:

1. In **Apps**, select the app.
2. Open **Analytics**.
3. In **Acquisition**, select **Campaigns**.
4. Select the add button next to Campaigns.
5. Enter the campaign name. This value becomes the campaign token.
6. Copy the generated campaign link.

Apple's example has this structure:

```text
https://apps.apple.com/app/apple-store/id123456789
  ?pt=123456
  &ct=test1234
  &mt=8
```

Keep the generated URL intact. Don't replace its sample values, remove parameters because they look unfamiliar, or manually construct the first provider token.

### Know what each App Store campaign parameter means

- **`pt` — provider token:** identifies your developer account. Apple generates it when you create your first campaign link, and it stays the same across your campaigns.
- **`ct` — campaign token:** identifies an individual campaign. Change this for each campaign you want to measure separately.
- **`mt` — media type token:** included in the generated link.

“Provider” doesn't mean an ad network or newsletter service. The provider token belongs to the developer account. A new placement normally needs a new campaign token, not a new provider token.

## Create a placement ledger before publishing

Links get copied. A social post may reuse the newsletter URL, or a partner may shorten a link and accidentally drop its query parameters. Once placements share a campaign token, App Store Connect can't reconstruct which placement produced a result.

Use a small deployment ledger:

| Final campaign URL | Intended placement | Owner | Published at | Destination checked |
| --- | --- | --- | --- | --- |
| URL ending in `ct=email-sep26-v24` | September email button | Name | Timestamp | Yes |
| URL ending in `ct=press-sep26-kit` | Press-kit CTA | Name | Timestamp | Yes |

For each placement:

1. Paste the final generated URL into the actual publishing tool.
2. Preview the message or page.
3. Open the published link on a real device.
4. Confirm it reaches the correct App Store product page.
5. Check that the final link still contains both `pt` and `ct`.
6. Record the publication time and exact placement.

Testing the destination isn't the same as testing attribution. Apple counts a First-Time Download when a user downloads the app for the first time within 24 hours of using the campaign link or token. A click from a developer who already has the app doesn't prove that a new-user download will appear. The dashboard isn't a real-time click counter either.

Apple also says a region segment in the URL doesn't lock people to that storefront. The App Store redirects users to their local storefront. Test that the listing is available and appropriate in the countries or regions your campaign targets instead of assuming a `/us/` link restricts the audience.

## Measure the campaign after the reporting delay

Campaigns appear in Analytics only after at least 24 hours from launch. A metric becomes visible when it reaches Apple's minimum threshold of five within the selected date range. Apple separately states that campaign data appears after at least five individual users produce first-time downloads.

Missing campaign data can therefore mean:

- less than 24 hours have passed;
- the link omitted `pt` or `ct`;
- first-time downloads haven't reached the campaign threshold;
- the selected date range is too narrow for a metric to reach five;
- privacy protections withheld or combined small groups in a detailed export.

It doesn't automatically mean zero people clicked, zero people downloaded, or the link is broken.

To inspect a campaign in App Store Connect:

1. Open **Analytics → Metrics**.
2. Select **Add Filter**.
3. Choose **Campaign**.
4. Select the campaign token.
5. Set a complete date range beginning when the placement went live.
6. Add only the metrics needed for the campaign question.
7. Apply territory, device, or page-type filters when they clarify a decision.

Apple attributes a first-time download when it occurs within 24 hours of the campaign-link interaction. If a person uses more than one campaign link within the relevant timeframe, Apple credits only the most recent link for subsequent sales. Campaign totals are attribution under Apple's rules, not a complete record of every marketing touch.

For exact definitions of impressions, product page views, downloads, usage, sales, and subscription metrics, use the [App Store Connect analytics guide](/blog/app-store-connect-analytics/).

## Review acquisition quality, not only attributed downloads

An attributed download answers a narrow question: Apple connected that download to the campaign token under its attribution rules. It doesn't tell you whether the user stayed, paid, or received the promise made by the campaign.

Use a three-layer review:

| Layer | Question | Possible evidence |
| --- | --- | --- |
| Reach | Did the placement bring people to the listing? | Impressions and Product Page Views |
| Acquisition | Did people download? | First-Time Downloads and Total Downloads |
| Quality | Did the attributed audience continue or pay? | App Opens, retention, sales, subscriptions when available |

Available campaign metrics depend on data volume, privacy thresholds, analytics sharing, and the app's business model. A blank retention view or five downloads can't support a confident quality verdict.

Write the review as a decision record:

```text
Campaign:
Complete date range:
Placement:
App version and product page:

Observed:
- First-Time Downloads:
- Total Downloads:
- Product Page Views:
- Available post-download signals:

Unavailable or below threshold:

Confounders:
- Release:
- Featuring:
- Price or offer:
- Product-page change:
- Other campaign:

Decision:
Keep | revise | stop | wait

Next action and review date:
```

“Wait” needs a date or evidence threshold. “Revise” should name the part that changes, such as the audience, placement, promise, or product page. Avoid changing all four at once if you want the next campaign to teach you anything.

## Coordinate campaign links with a pre-order or release

Campaign links, app availability, and release work use different clocks.

For a brand-new app, the Campaigns control may not be available before the app has analytics data. An [App Store pre-order](/blog/app-store-pre-order/) can publish a product page before download availability, but it doesn't remove Apple's requirement that campaign-link generation wait for app data.

For an update, record:

- the exact campaign start;
- the version's actual public availability time;
- any phased-release state;
- product-page or price changes;
- the first complete measurement window.

This prevents “the campaign increased downloads” from hiding the fact that a new version, featuring placement, or metadata change happened at the same time. The [iOS post-launch checklist](/blog/ios-post-launch-checklist/) provides the wider release-verification and evidence-routing workflow.

## Where LaunchBuddy fits

Create campaign links and inspect campaign attribution in App Store Connect. LaunchBuddy doesn't generate those links, supply provider tokens, or provide campaign-level attribution.

LaunchBuddy can hold the surrounding release work: keep the placement ledger or campaign brief in project notes, tie publication and review tasks to the relevant app version, and record the follow-up decision. Release planning, taskboards, and iCloud sync are available on iPhone, iPad, and Mac. The free plan is limited to two apps, two releases, and limited project notes.

LaunchBuddy Pro, with App Store Connect API credentials, includes selected downloads, revenue, and subscription metrics. Use those signals beside the release plan, but return to Apple's Campaigns view for campaign filters, official attribution, privacy thresholds, and detailed reports. LaunchBuddy is the planning layer, not a substitute for App Store Connect Analytics.

## Troubleshoot a campaign link systematically

### The Campaigns add button is missing

Confirm the app is live and has begun generating analytics data, then wait at least 24 hours and check again. Also confirm that your App Store Connect role can access Analytics. A new app can't generate a campaign link before it has data.

### The campaign doesn't appear in Analytics

Wait at least 24 hours from launch. Verify that the deployed URL contains both the provider and campaign tokens, then expand the selected date range. Metrics remain hidden until they meet Apple's threshold of five, and a campaign needs first-time downloads from at least five individual users before its data appears.

### The campaign appears, but some metrics are blank

Check whether each metric reaches five in the selected range. Usage data can also depend on people agreeing to share analytics, while detailed exports apply additional privacy protections. Treat the blank value as unavailable, not zero.

### The link opens a different storefront

That's expected. Apple redirects people to their local App Store storefront even if the link includes a region code. Verify that the app is available and its listing is appropriate in each target region.

## Turn every campaign link into one decision

The best campaign-link workflow isn't the one with the most tokens. It is the one where each token maps to a known placement, every deployment preserves the generated parameters, and every review ends with a documented keep, revise, stop, or wait decision.

Create the link in App Store Connect, keep its attribution limits visible, and connect the result to the release work you actually control. To keep campaign tasks and review decisions with the relevant app version, <a href="https://apple.co/3iFcjjW">download LaunchBuddy on the App Store</a>.
