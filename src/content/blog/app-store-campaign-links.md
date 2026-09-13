---
title: "App Store Campaign Links: Create, Track, and Review Them"
description: "Create App Store campaign links with clear tokens, validate each placement, and review attributed downloads without mistaking missing data for zero."
pubDate: 2026-09-13
---

An **App Store campaign link** is a product-page URL generated in App Store Connect Analytics with a provider token (`pt`) and campaign token (`ct`). Use one distinct campaign token for each marketing effort you need to measure, copy the generated link into the intended placement, test the destination, and review the campaign in App Store Connect after data has had time to appear.

Campaign links help answer a narrow question: which campaign token was associated with attributed App Store activity? They don't prove that the campaign caused every later outcome, identify individual users, or replace your other channel analytics.

Apple's setup steps are short. This guide pairs them with a campaign register, placement-level naming rules, a link QA receipt, and a decision record so a technically valid link also produces an interpretable result.

## Decide what one campaign token should represent

Apple describes campaign links as a way to measure ads, social promotions, email, and other marketing that sends people to an app's App Store product page. Before creating a link, choose the level you intend to compare.

Consider a release promoted through:

- a newsletter button;
- a website banner;
- a conference QR code;
- three social posts.

One token for all six placements can answer, “How did the release campaign perform?” It can't tell you which placement produced the attributed downloads. Six tokens preserve that distinction but may leave a small app with several campaigns below Apple's reporting thresholds.

Use this rule:

> Create a separate token only when its result could change a placement, audience, creative, or budget decision.

Avoid separate tokens that exist only to produce a more detailed dashboard. More segmentation leaves less data in each segment.

## Create a campaign brief before the link

Give the campaign an internal record that explains what the URL alone cannot:

```text
Campaign ID: REL-42
App and release: Focus Timer 4.2
Decision question: Keep the launch newsletter as a standard release channel?

Audience: Existing newsletter subscribers
Placement: Release email, primary button
Destination: Default App Store product page
Campaign token: sep26-newsletter

Owner:
Link creation date:
Launch date and time:
End date:

Primary signal: First-Time Downloads
Context: Product Page Views, usage, sales, subscriptions
Decision date:
Decision: Continue | change | stop | insufficient data
```

The example token is descriptive without containing a person's name, email address, or other user data. Tokens appear in the URL and should be treated as public labels.

Keep the destination explicit. Apple's generated campaign link opens the app's product page. If a campaign promises a feature that is available only in a specific version, record that version's public availability as a launch dependency.

## Use a stable campaign-token naming system

In App Store Connect, the campaign name becomes the campaign token. Apple currently allows up to 30 characters, using alphanumeric characters, spaces, and a defined set of punctuation. A space can't be the first or last character.

A useful token is:

- **distinct:** one token maps to one decision unit;
- **readable:** you can recognize it months later;
- **stable:** it doesn't change after the link is distributed;
- **public-safe:** it contains no private customer or partner information;
- **short:** it remains easy to inspect in a URL or QR-code source record.

For example:

```text
sep26-newsletter
sep26-site-hero
sep26-conf-qr
```

Avoid `launch`, `social`, or `test2`. Those names lose meaning when several releases and channels share the account.

The date in a token is an internal convention, not an Apple requirement. Pick a convention once and document it in the campaign register.

## Create the campaign link in App Store Connect

You need an Account Holder, Admin, Finance, or Sales role to access the Analytics dashboard. Apple's current [campaign-link instructions](https://developer.apple.com/help/app-store-connect-analytics/acquisition/campaign-links/) give this path:

1. Open **Apps** in App Store Connect and select the app.
2. Open **Analytics**.
3. In **Acquisition**, select **Campaigns**.
4. Select the add button next to Campaigns.
5. Enter the campaign name. This value becomes the campaign token.
6. Copy the generated campaign link.

A generated URL has this general shape:

```text
https://apps.apple.com/app/apple-store/idAPP_ID?pt=PROVIDER_TOKEN&ct=CAMPAIGN_TOKEN&mt=8
```

Use the URL App Store Connect actually generates for your app. The placeholders above are explanatory, not values to paste.

The parameters have different jobs:

- `pt` is the provider token that identifies your developer account. Apple says it remains the same across your campaigns.
- `ct` is the campaign token that identifies the individual campaign.
- `mt` is the media-type token included in the generated link.

“Provider” doesn't mean the ad network or newsletter service. Don't create a new provider token for every channel. Generate a campaign link in App Store Connect to obtain the provider token; Apple says it can't be created manually.

### Why the Campaigns add button may be missing

The Campaigns feature becomes available after the app has analytics data. For a new app with no downloads, the Campaigns tab or add button may not appear.

Apple advises checking after the app has been live and generating downloads for at least 24 hours. This creates a real launch-planning limitation: you may not be able to generate a campaign link before a brand-new app has any analytics data.

Don't replace the missing link with invented token values. Use the ordinary App Store product-page URL for early materials, or delay final link placement until App Store Connect exposes the campaign control. Record which choice you made so later results aren't interpreted as fully attributed.

## Validate the link before distributing it

Copying a generated URL is not the same as verifying the campaign path. Create a small QA receipt for every final placement:

```text
Campaign token:
Source record:
Final placed URL:
Checked at:
Checked on:

[ ] pt parameter is present
[ ] ct parameter is present and matches the campaign register
[ ] Link opens the intended app product page
[ ] App name and developer are correct
[ ] Campaign promise matches the live product page and available version
[ ] Redirect, button, or QR code preserves the final campaign URL
[ ] Placement preview was checked
```

Test the link from the actual medium, not only from a notes app. An email platform, website redirect, social preview, or QR-code generator can alter the destination you originally copied.

Users may be redirected to their local App Store storefront even when the link contains a region code such as `/us/`. Apple documents that behavior as expected; the region in the URL doesn't restrict the campaign to that storefront.

If you use the tokens outside a standard URL, follow Apple's documented implementation:

- Add the campaign and provider tokens to a Safari Smart App Banner after generating a campaign link in App Store Connect.
- For an in-app cross-promotion using `SKStoreProductViewController`, pass the documented `SKStoreProductParameterCampaignToken` and `SKStoreProductParameterProviderToken` values when loading the product page.
- Add `app=messages` when directing users to the shared product page for an iMessage app or sticker-pack extension.

Don't infer custom parameter names from the web URL. Use Apple's constants for StoreKit.

## Give each placement a distribution record

The same token may be copied into several places, but that choice changes what you can learn. Preserve a simple source map:

| Token | Placement | Live date | Creative | Decision it supports |
| --- | --- | --- | --- | --- |
| `sep26-newsletter` | Release email button | Sep 15 | Feature summary A | Keep email in release plan? |
| `sep26-site-hero` | Website hero | Sep 15 | Screenshot A | Keep hero placement after launch week? |
| `sep26-conf-qr` | Conference card | Sep 18 | Demo promise | Repeat this event placement? |

Save the final copy and creative beside the token. If the newsletter promises “offline sessions” while the website promotes “shared timers,” the campaign results describe different propositions even when both lead to the same product page.

Avoid changing the destination, creative, audience, and spend at once. Campaign attribution can separate tagged links, but it can't explain which simultaneous change was responsible for a result.

## Measure the campaign with the correct attribution rules

Apple says a user counts as a **First-Time Download** for the campaign when they download the app for the first time within 24 hours of using the campaign link or token. If the user clicks more than one campaign link in the relevant timeframe, the most recent link receives credit for subsequent sales.

That has three practical consequences:

1. A person can click a link and download later without being attributed if the first download falls outside the 24-hour window.
2. A later campaign touch can receive credit even when an earlier placement introduced the app.
3. Campaign attribution is not a complete account of influence across a longer buying journey.

To inspect a campaign, Apple directs developers to **Analytics → Metrics**, then **Add Filter → Campaign**. Add only metrics that answer the campaign question. A compact review might include:

```text
Campaign:
Complete date range:
Placement and creative:

First-Time Downloads:
Product Page Views:
Usage metric, if available:
Sales or subscription metric, if relevant:

Other activity during the window:
- App release:
- Featuring:
- Other campaigns:
- Price or offer change:

Interpretation:
Decision:
Next review date:
```

The [App Store Connect analytics guide](/blog/app-store-connect-analytics/) explains metric definitions, segmentation, and why downloads, installations, and conversion rate shouldn't be treated as interchangeable.

### Treat missing campaign data as unavailable, not zero

Campaigns need time and enough attributed activity to appear. Apple currently documents these boundaries:

- a campaign appears in Analytics only after a minimum of 24 hours since launch;
- a particular campaign's dashboard data appears after first-time downloads from at least five individual users;
- each campaign metric appears only when that metric reaches a minimum threshold of five in the selected date range;
- detailed Analytics reports may withhold or combine rows for very small groups.

If a campaign or metric is missing, first check your App Store Connect role, elapsed time, the selected date range, and whether both `pt` and `ct` survived the live link. Expanding the date range may let a metric meet its threshold. A blank value doesn't establish zero downloads, zero usage, or a broken link.

Usage data has an additional limitation. Apple's [Analytics dashboard documentation](https://developer.apple.com/help/app-store-connect-analytics/overview/analytics-dashboard/) says it is based on users who agreed to share analytics, and privacy thresholds apply. Don't compare an attributed download total with an opt-in usage metric as though both describe the same complete population.

## Compare campaigns without inventing causality

Suppose the newsletter token shows more first-time downloads than the website token. That supports a statement such as:

> Apple attributed more first-time downloads to the newsletter campaign than to the website campaign during the selected complete period.

It doesn't, by itself, support:

> The newsletter caused more downloads because email is our best channel.

The audiences, reach, dates, placement prominence, creative, and number of clicks may differ. Keep channel-side delivery and click data beside Apple's App Store outcomes, but don't expect the totals to reconcile one for one. They measure different events under different rules.

Use one of four outcomes:

- **Continue:** the result supports the same placement and proposition.
- **Change:** preserve the channel but test a different creative, audience, or destination.
- **Stop:** the result and campaign cost don't justify another run.
- **Insufficient data:** thresholds, timing, or confounders prevent a useful decision.

“Insufficient data” is a valid result. It is better than combining unlike campaigns until the number looks decisive.

## Coordinate campaign links with the app release

A link can work while the campaign still fails operationally. Add campaign dependencies to the release plan:

```text
[ ] Target version is available in intended storefronts
[ ] Product page matches the campaign promise
[ ] Campaign token and owner are recorded
[ ] Final placement passed link QA
[ ] Launch and stop times are confirmed
[ ] Support path is ready
[ ] Analytics review date is scheduled
[ ] Decision record will name simultaneous changes
```

For a pre-release campaign, the [App Store pre-order guide](/blog/app-store-pre-order/) covers the separate product-page, review, availability, and launch-date constraints. After a public release, use the [iOS post-launch checklist](/blog/ios-post-launch-checklist/) to review availability, product behavior, support, and analytics without turning every chart movement into a product conclusion.

## Where LaunchBuddy fits

Create campaign links and inspect campaign attribution in App Store Connect. LaunchBuddy's documented features don't include campaign-link generation or campaign-specific attribution.

LaunchBuddy can hold the surrounding plan:

- attach link creation, placement QA, launch, and review tasks to the relevant release;
- keep the campaign brief and decision record with the app's project notes;
- compare the campaign window with the release date and completed work;
- carry an evidence-backed follow-up into the next release.

Release planning and default submission checklists are available on LaunchBuddy's free plan, which is limited to two apps, two releases, and limited project notes. LaunchBuddy Pro removes those limits and its App Store Connect integration shows selected downloads, revenue, and subscription metrics after you provide API credentials. Apple's Campaigns view remains the source for campaign-token attribution.

## Turn the link into a decision

A useful campaign link needs more than `pt` and `ct`. Define what the token represents, preserve the final placement, verify the live destination, wait for Apple's reporting boundaries, and close the record with a decision that matches the evidence.

To keep campaign tasks, launch timing, and the follow-up decision attached to the release, <a href="https://apple.co/3iFcjjW">download LaunchBuddy on the App Store</a>.
