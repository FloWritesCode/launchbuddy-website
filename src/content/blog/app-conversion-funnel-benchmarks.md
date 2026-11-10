---
title: "App Conversion Funnel Benchmarks: Impression to Paid, With Sources"
description: "The tap-through, product page, download-to-trial and trial-to-paid benchmarks behind LaunchBuddy's funnel, with every number sourced."
pubDate: 2026-11-10
draft: true
shortTitle: "Funnel benchmarks"
summary: "Typical conversion rates for every step from App Store impression to paid subscription, and where each number comes from."
related:
  - app-store-connect-peer-group-benchmarks
  - app-store-product-page-optimization
  - app-store-introductory-offers
---

**LaunchBuddy's funnel compares four of its steps with published benchmarks:** about **3–10%** of impressions turn into product page views, **20–40%** of page views turn into downloads, **4–9.1%** of downloads start a free trial, and **22.2–43.5%** of trials become paid subscriptions. The step from downloads to first opens has no benchmark, because no reliable public figure exists for it.

The ranges come from [Appalize](https://www.appalize.com/blog/case-studies/app-store-conversion-rate-benchmarks-by-category-2026), [RevenueCat's State of Subscription Apps 2026](https://www.revenuecat.com/state-of-subscription-apps), [FunnelHound](https://funnelhound.app/guides/app-store-impressions-vs-product-page-views) and [BenchHacks](https://benchhacks.com/benchmarks/appstore-benchmarks.htm). Each range spans the category figures those sources publish, because the funnel doesn't know your app's category. The medians inside the ranges are LaunchBuddy's reference points. Where a source doesn't publish an all-category median, this guide says how the reference point was chosen.

<figure>
  <img src="/images/guides/funnel-benchmarks/benchmark-bands.svg" alt="Chart of LaunchBuddy's benchmark bands: impressions to page views 3 to 10 percent, page views to downloads 20 to 40 percent, no benchmark for downloads to first opens, downloads to trials 4 to 9.1 percent, trials to paid 22.2 to 43.5 percent." width="800" height="690" loading="lazy" />
  <figcaption>The five funnel steps and the band LaunchBuddy compares each one with. Sources are listed per step below.</figcaption>
</figure>

| Funnel step | Typical range | Median used | Source |
| --- | --- | --- | --- |
| Impressions → Product page views | 3–10% | 5% | FunnelHound, BenchHacks |
| Product page views → Downloads | 20–40% | 30% | Appalize 2026 |
| Downloads → First opens | None | None | No reliable public source |
| Downloads → Trials | 4–9.1% | 5.5% | RevenueCat SOSA 2026 |
| Trials → Paid subscriptions | 22.2–43.5% | 32% | RevenueCat SOSA 2026 |

## How to read a funnel benchmark

A benchmark is context, not a target. Every source below reports medians or averages from apps that differ from yours in category, price, traffic mix and region, and the spread inside a single category is often wider than the gap between categories. RevenueCat's trial-to-paid data shows this clearly: Media & Entertainment apps alone span **11.5% to 69.5%** ([RevenueCat SOSA 2026](https://www.revenuecat.com/state-of-subscription-apps)).

Because the bands are wide, the funnel uses them in two ways:

- **Position:** A step is flagged as below typical when its rate is under the bottom of its band, and above typical when it's over the top.
- **Weakest step:** LaunchBuddy divides each step's rate by its median and names the step with the lowest result. Dividing by the median lets a 4% tap-through rate and a 30% product page conversion rate be compared fairly.

Here's a made-up example to show the logic:

| Step | Your rate | Median | Rate ÷ median | Position |
| --- | --- | --- | --- | --- |
| Impressions → Page views | 4% | 5% | 0.80 | Within band |
| Page views → Downloads | 33% | 30% | 1.10 | Within band |
| Downloads → Trials | 3.5% | 5.5% | 0.64 | Below typical |
| Trials → Paid | 35% | 32% | 1.09 | Within band |

Downloads → Trials has the lowest ratio, so that's the step LaunchBuddy points to first. If you want a comparison against apps in your own category, use Apple's [peer group benchmarks](/blog/app-store-connect-peer-group-benchmarks/) alongside the funnel.

## Impressions to product page views: 3–10%

This step is the share of App Store impressions that lead to a product page view, often called tap-through rate. Apple counts an impression each time your app "was viewed on the Today, Games, Apps, and Search tabs of the App Store for more than one second," and that count "includes product page views" ([Apple, App Store Connect metric definitions](https://developer.apple.com/help/app-store-connect-analytics/reference/metrics-definitions/)).

Public numbers for this step are thin, and the two sources LaunchBuddy uses disagree on browse traffic:

- **FunnelHound:** "For search traffic, roughly 3–6% is typical; browse and featuring placements usually run lower." FunnelHound describes its figures as directional medians from public ASO benchmark reports ([FunnelHound](https://funnelhound.app/guides/app-store-impressions-vs-product-page-views)).
- **BenchHacks:** 4.8% for App Store Search and 11% for App Store Browse, for the US market, based on what it calls qualitative research ([BenchHacks, AppStore Benchmarks 2026](https://benchhacks.com/benchmarks/appstore-benchmarks.htm)).

<figure>
  <img src="/images/guides/funnel-benchmarks/tap-through-sources.svg" alt="Chart comparing published tap-through rates: FunnelHound search 3 to 6 percent, BenchHacks search 4.8 percent and browse 11 percent, against LaunchBuddy's 3 to 10 percent band with a 5 percent median." width="800" height="520" loading="lazy" />
  <figcaption>Search tap-through rates roughly agree; browse rates don't. Sources: <a href="https://funnelhound.app/guides/app-store-impressions-vs-product-page-views">FunnelHound</a>, <a href="https://benchhacks.com/benchmarks/appstore-benchmarks.htm">BenchHacks</a>.</figcaption>
</figure>

LaunchBuddy's band runs from FunnelHound's 3% search floor to 10%, just under BenchHacks' 11% browse figure, and uses 5% as the median. Both search figures sit close to that median: 4.8% from BenchHacks and 4.5% at the middle of FunnelHound's range. Treat this step as the least certain of the four. The funnel blends all traffic sources, so an app that gets most of its impressions from browse or featuring can land well outside the band without anything being wrong.

## Product page views to downloads: 20–40%

This step is the share of product page views that end in a download. Appalize defines its benchmark the same way, installs divided by product page views, and counts total downloads including redownloads, blended across traffic sources ([Appalize, App Store Conversion Rate Benchmarks by Category 2026](https://www.appalize.com/blog/case-studies/app-store-conversion-rate-benchmarks-by-category-2026)).

<figure>
  <img src="/images/guides/funnel-benchmarks/product-page-conversion-by-category.svg" alt="Range chart of average iOS product page conversion by category: Weather 38 to 48 percent, Utilities 35 to 45, Productivity 30 to 38, Games 30 to 35, Education 28 to 35, Health and Fitness 25 to 30, Finance 22 to 28, Shopping 20 to 26, Social Networking 18 to 25, Travel 18 to 24." width="800" height="710" loading="lazy" />
  <figcaption>Average iOS product page conversion for ten of the 22 categories Appalize reports. Source: <a href="https://www.appalize.com/blog/case-studies/app-store-conversion-rate-benchmarks-by-category-2026">Appalize 2026</a>.</figcaption>
</figure>

Appalize's iOS category averages run from **18–24%** for Travel and News to **38–48%** for Weather. Most categories fall between 20% and 40%, which is where LaunchBuddy's band sits, with 30% as the median. Games overall land at **30–35%**, Productivity at **30–38%**, and Health & Fitness at **25–30%** ([Appalize](https://www.appalize.com/blog/case-studies/app-store-conversion-rate-benchmarks-by-category-2026)).

Three details from the same report help explain where your app lands:

- **Traffic source:** Search visitors convert much better than the blended average. Appalize puts iOS search conversion at 50–65% for Utilities, 40–52% for Productivity, 35–45% for Health & Fitness and 30–40% for Finance.
- **Business model:** Appalize estimates that apps with a free trial and a subscription convert 10–20% lower than free apps in the same category.
- **Top performers:** "Top-quartile apps convert at 1.5-2x the average," so a rate above the band is possible, not a data error.

Don't compare this step with App Store Connect's own Conversion Rate. Apple divides total downloads and pre-orders by unique-device impressions, not by product page views ([Apple](https://developer.apple.com/help/app-store-connect-analytics/reference/metrics-definitions/)). If this step looks weak, LaunchBuddy's guide to [product page optimization](/blog/app-store-product-page-optimization/) covers what to test first.

## Downloads to first opens: no benchmark

The funnel shows how many downloads lead to a first open, but it doesn't compare that step with a benchmark. LaunchBuddy found no public source that measures it consistently. The two numbers also come from different systems: downloads are counted by the App Store, while a first open is counted when the RevenueCat SDK sees a new customer. Redownloads, family sharing, multiple devices and the time between download and launch all move this ratio in ways that differ from app to app, so the most useful comparison is your own trend over time.

## Downloads to trials: 4–9.1%

RevenueCat defines download-to-trial conversion as "the share of installs that start a free trial within 30 days of the download date," and calculates it only "for apps that use a trial-based acquisition strategy." Its 2026 report covers "over 115,000 apps, representing more than $16 billion in revenue" ([RevenueCat SOSA 2026](https://www.revenuecat.com/state-of-subscription-apps)).

<figure>
  <img src="/images/guides/funnel-benchmarks/download-to-trial-by-category.svg" alt="Bar chart of median download-to-trial rates: Business 9.1 percent, Health and Fitness 6.9, Education 6.5, Utilities 6.5, Gaming 4.4, Travel 4.1, Media and Entertainment 4.0, with most other non-Gaming categories between 5 and 6 percent." width="800" height="650" loading="lazy" />
  <figcaption>Median download-to-trial rate by category. Source: <a href="https://www.revenuecat.com/state-of-subscription-apps">RevenueCat, State of Subscription Apps 2026</a>.</figcaption>
</figure>

By category, RevenueCat reports these medians:

- **Business:** 9.1%, with the top quartile above 16.2%.
- **Health & Fitness:** 6.9%. Top performers in the category convert over 23%.
- **Education and Utilities:** 6.5% each.
- **Gaming:** 4.4%.
- **Travel:** 4.1%.
- **Media & Entertainment:** 4.0%.

RevenueCat adds that "most non-Gaming categories convert between 5-6% from download-to-trial." Region matters as much as category. The median is 7.1% in North America, 5.7% in Asia-Pacific and 5.0% in Western Europe, while India and Southeast Asia, Latin America, the Middle East and Africa, and the rest of the world sit between 3.0% and 3.7% ([RevenueCat SOSA 2026](https://www.revenuecat.com/state-of-subscription-apps)).

LaunchBuddy's band runs from 4%, Media & Entertainment's median and the lowest in the report, to 9.1%, Business's median and the highest, and uses 5.5% as the median. RevenueCat doesn't publish a single all-category median for this metric, so 5.5% is LaunchBuddy's own reference point: the middle of the 5–6% range where most categories land.

The funnel measures this step a little differently from RevenueCat's report. RevenueCat follows each install for 30 days, while LaunchBuddy divides trials started by downloads within the same date range. Over short windows, trials from users who installed before the window began can push the rate up or down. If your app has no free trial, ignore this step.

## Trials to paid subscriptions: 22.2–43.5%

RevenueCat defines trial-to-paid conversion as "the share of free trial starts that convert into a paid subscription" ([RevenueCat SOSA 2026](https://www.revenuecat.com/state-of-subscription-apps)). Category, region and trial length all move it.

<figure>
  <img src="/images/guides/funnel-benchmarks/trial-to-paid-drivers.svg" alt="Bar chart of median trial-to-paid rates. By category: Travel 43.5 percent, Health and Fitness 37.7, Gaming 25.0, Photo and Video 22.2. By region: North America 34.2, Asia-Pacific 31.9, Western Europe 29.7, India and Southeast Asia 15.2. By trial length: 17 to 32 days 42.5, 5 to 9 days 37.4, 4 days or less 25.5." width="800" height="830" loading="lazy" />
  <figcaption>Median trial-to-paid rate by category, user region and trial length. Source: <a href="https://www.revenuecat.com/state-of-subscription-apps">RevenueCat, State of Subscription Apps 2026</a>.</figcaption>
</figure>

**By category:** Travel has the highest median at 43.5% (top quartile above 62.4%), followed by Health & Fitness at 37.7% (top quartile above 51.4%). Gaming sits at 25.0%, and Photo & Video is lowest at 22.2% (top quartile above 33.1%).

**By region:** The median is 34.2% in North America, 31.9% in Asia-Pacific and 29.7% in Western Europe. Latin America, the Middle East and Africa, and the rest of the world "cluster together at ~20–23% median," and India and Southeast Asia is lowest at 15.2%.

**By trial length:** Trials of 17–32 days convert at a 42.5% median, 5–9 day trials at 37.4%, and trials of 4 days or less at 25.5%. Short trials also lose people fast: 55.4% of 3-day trial cancellations happen on day 0, compared with 39.8% for 7-day trials and 31.1% for 30-day trials ([RevenueCat SOSA 2026](https://www.revenuecat.com/state-of-subscription-apps)). If you're choosing a trial length, LaunchBuddy's guide to [introductory offers](/blog/app-store-introductory-offers/) covers the setup in App Store Connect.

LaunchBuddy's band spans the lowest and highest category medians, 22.2% to 43.5%. RevenueCat doesn't publish an all-category median here either, so the 32% reference point is LaunchBuddy's choice. It sits between Western Europe's 29.7% and North America's 34.2%, close to Asia-Pacific's 31.9%.

One caveat makes this step read a little high. The funnel counts new paid subscriptions from RevenueCat, and RevenueCat's paid subscription data includes trial conversions, paid introductory offers and subscriptions started directly without a trial ([RevenueCat, Paid Subscriptions chart](https://www.revenuecat.com/docs/dashboard-and-metrics/charts/new-paid-subscriptions-chart)). If many people subscribe without a trial, the rate can land above the band even when trial conversion is average.

## A cross-check from download to paid

The funnel doesn't benchmark the full path from download to paid, but RevenueCat's day-35 figure is a useful sanity check if you multiply your steps together. RevenueCat measures "the share of installs that result in at least one paid subscription within 35 days of the install date" ([RevenueCat SOSA 2026](https://www.revenuecat.com/state-of-subscription-apps)):

- **By category:** Health & Fitness has a 2.9% median (top quartile above 6.2%), Business 2.6%, Shopping 1.3% and Gaming 1.0%.
- **By developer headquarters:** Apps from North American teams have a 2.6% median, Western Europe 2.0% and India and Southeast Asia 1.4%. This is grouped by where the developer is based, not where users are.
- **By paywall type:** Hard paywalls convert at 10.7% against 2.1% for freemium apps.

A 5.5% download-to-trial rate multiplied by a 32% trial-to-paid rate gives about 1.8%, inside the 1.0–2.9% spread of RevenueCat's category medians.

## Limits of these benchmarks

- **All categories at once:** The bands cover every category, so a Weather app and a Social Networking app are compared with the same range. Use the category charts above to narrow it down by hand.
- **Blended traffic:** The App Store steps mix search, browse and referral traffic, and each source converts differently.
- **Same-window rates:** LaunchBuddy divides counts from the same date range, while RevenueCat's report follows install cohorts. Longer windows bring the two closer together.
- **Medians, not goals:** Half of the apps in RevenueCat's data sit below each median, and Appalize's figures are category averages. Being in the band means your step looks normal, not that it can't improve.
- **Source quality varies:** RevenueCat's figures come from its own customer data. Appalize publishes category ranges, FunnelHound calls its numbers directional, and BenchHacks bases its figures on qualitative research.

## Frequently asked questions

### What's a good App Store product page conversion rate?

Most iOS category averages in Appalize's 2026 report fall between 20% and 40% of product page views, from 18–24% for Travel and News to 38–48% for Weather. Compare your rate with your own category's range rather than one overall number.

### What's a good trial-to-paid conversion rate?

RevenueCat's 2026 category medians range from 22.2% for Photo & Video to 43.5% for Travel, and trials of 17–32 days convert at a 42.5% median compared with 25.5% for trials of 4 days or less.

### Why doesn't LaunchBuddy use my app's category?

The funnel doesn't know your app's category, so its bands span the published category figures for all categories. The category charts in this guide let you check your rate against your own category.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy and see where your funnel stands against these benchmarks</a>
