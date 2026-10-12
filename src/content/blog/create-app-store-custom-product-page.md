---
title: "How to Create an App Store Custom Product Page"
description: "Create, submit, verify, and measure an App Store custom product page with a practical workflow for assets, localizations, keywords, links, and review."
pubDate: 2026-10-12
---

To create an App Store custom product page, open your app in App Store Connect, choose **Custom Product Pages**, select **Create Custom Product Page**, name the page, and start from either a blank page or an existing product page. Add the audience-specific screenshots, app previews, promotional text, and localizations, then submit the page to App Review. After approval, send traffic to its generated URL or make it eligible for selected searches by assigning approved keywords.

The clicks are the easy part. A useful custom product page also needs one audience, a distinct message, complete localized assets, a tested link, and a measurement decision written before launch. This guide takes one page through that entire workflow.

## Confirm that a custom product page is the right tool

A custom product page is a separate, shareable version of an app's App Store page. Apple currently allows up to 70 per app. Each page can have its own screenshots, app previews, promotional text, and localizations. It receives a unique URL and can also be associated with selected keywords from the latest approved app version.

Use one when you can finish this sentence:

> People arriving from **[audience or source]** need to see **[different product promise]** before deciding whether the app fits them.

For example, a budgeting app might send freelancers to a page led by invoice and tax-reserve screenshots, while its default page speaks to household budgeting. The page continues a specific message; it isn't automatically an A/B test.

If you need randomized evidence about the default page instead, use Product Page Optimization. The [Custom Product Pages vs Product Page Optimization comparison](/blog/custom-product-pages-vs-product-page-optimization/) explains that choice before you create anything.

For the standard creation path, Apple documents three important prerequisites:

- The app must be **Ready for Distribution** in at least one country or region.
- You need the Account Holder, Admin, App Manager, or Marketing role.
- Custom product pages appear on the App Store on iOS 15 and iPadOS 15 or later.

Apple's separate submission guide says a custom product page can also be included with an app's first iOS version. If the app isn't approved yet, follow that first-version submission flow instead of assuming the usual sidebar path will be available.

Don't create 70 pages simply because 70 are available. Each extra page adds creative, localization, review, link, analytics, and retirement work.

## Step 1: write a one-page brief

Start with the audience and decision, not the screenshot folder. A short contract keeps the page from becoming a vague second version of the default listing.

```text
Reference name: freelancer-tax-us-en
Audience: US freelancers arriving from the tax-season campaign
Entry path: Campaign landing page and newsletter

Audience question:
Can this app separate business income and estimate a tax reserve?

Page promise:
See freelance cash flow and set money aside before tax is due

Different from default page:
- Promotional text focuses on freelance income
- First three screenshots show income tagging, reserve goals, and reports

Deliberately unchanged:
- App behavior
- Subscription terms
- Support URL

Primary evidence:
Product Page Views, Downloads, and Conversion Rate for this page

Decision date:
Two complete weeks after the campaign ends

Decision:
Keep | revise | disable | insufficient data
```

The reference name helps you find the page later in App Store Connect Analytics. Use a stable internal convention such as `audience-purpose-locale`; avoid customer names or other private information.

One page should make one coherent promise. If the brief needs three unrelated audiences, split the work or narrow the first page.

## Step 2: prepare the page's assets and localizations

Apple lets a custom product page vary:

- screenshots;
- app previews;
- promotional text;
- localizations; and
- assigned keywords from the latest approved app version.

An app icon, name, subtitle, description, price, or feature set isn't listed as custom product page creative. Don't plan the page as though every part of the default listing can change.

Create a small coverage matrix before uploading:

| Localization | Promotional text | Screenshots | App previews | Reviewer |
| --- | --- | --- | --- | --- |
| English (US) | Ready | Ready | Reuse default | Assigned |
| English (UK) | Adapted | Currency checked | Reuse default | Assigned |
| German | Not in first launch | — | — | — |

“Reuse default” is a decision; an empty cell is an unresolved dependency. If a localized page promises a capability through text embedded in screenshots, verify both the language and the product state shown.

Check file formats, device coverage, and current dimensions against Apple's live requirements. The [App Store screenshot requirements guide](/blog/app-store-screenshot-requirements/) provides a separate asset preflight, but App Store Connect remains authoritative when specifications change.

Before moving on, confirm:

```text
[ ] Every changed asset supports the same audience promise
[ ] Screenshots show the current distributed app
[ ] Promotional text is factual
[ ] Each included localization was reviewed in context
[ ] Subscription, price, and availability claims match the live offer
[ ] The default page still works for everyone not routed to this page
```

## Step 3: create the page in App Store Connect

Apple's current [custom product page instructions](https://developer.apple.com/help/app-store-connect/create-custom-product-pages/configure-multiple-product-page-versions/) use this path:

1. In **Apps**, select the app.
2. In the sidebar, choose **Custom Product Pages**.
3. Select **Create Custom Product Page**. If pages already exist, use the add button.
4. Enter the reference name from your brief.
5. Choose **Blank Page** or start from an existing App Store product page.
6. Select **Create**.
7. Add or change screenshots, app previews, promotional text, and localizations.

Starting from an existing page copies the primary localization from a version in **Ready for Distribution** or **Prepare for Submission**. That can save setup time, but copied assets still need review against the custom page's promise.

App Store Connect generates the unique product page URL when the page is created. Record it now, but don't distribute it yet. The page must pass App Review before customers can see it.

Save a creation receipt:

```text
Reference name:
Created from: Blank | product page and version
Generated URL:
Localizations included:
Assets changed:
Assets copied:
Owner:
Created at:
```

This receipt prevents “Which page did this link point to?” from becoming a forensic task after several campaigns and revisions.

## Step 4: decide whether to add keyword routing or a deep link

The generated URL is enough for a website, email, social post, or other placement. Two optional controls change how people reach or leave the page.

### Assign keywords only when the page matches the search intent

Apple lets you assign terms from the **latest approved app version** to a custom product page. When the approved page is visible, customers searching those terms can see it instead of the default page.

In App Store Connect:

1. Open the custom product page.
2. In **Keywords**, select the relevant terms.
3. Repeat the selection for each intended localization.
4. Select **Publish**.

Use a unique, relevant keyword set for each page. Assignment doesn't add new keyword metadata, guarantee that the page appears for a search, or prove that the page improved rankings.

Record why each term belongs:

| Keyword | Searcher's likely need | Page element that answers it |
| --- | --- | --- |
| freelance budget | Separate work and personal money | First screenshot |
| tax reserve | Save a portion of income | Second screenshot |

If you can't fill the third column honestly, the page and keyword probably don't match.

### Add an app deep link only when the post-download destination is ready

An optional app deep link changes what happens after a user on iOS 18 or iPadOS 18 or later taps **Open** on the custom product page. Apple accepts a universal link or custom URL and recommends universal links for a more secure, integrated experience.

Treat the deep link as shipped product behavior:

- test it from a normal tappable context;
- make sure it opens the intended in-app destination;
- handle signed-out, unavailable-content, and older-version states;
- avoid unnecessary redirect or URL-shortener layers; and
- submit the page for review after adding the link.

The product page URL and the app deep link do different jobs. The first opens the App Store page; the second can route an installed app to relevant content after **Open** is tapped.

## Step 5: submit the page and preserve the review boundary

A generated URL doesn't mean the page is public. Apple requires custom product pages, including their app deep links, to be approved.

When the draft is complete, follow Apple's [custom product page submission instructions](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-a-custom-product-page/): select **Add for Review**, choose an existing draft submission or create one, inspect the associated app version and review items, then select **Submit for Review**. An approved app can submit a custom product page without attaching a new binary, although App Store Connect still associates the page with an app version.

Keep a submission receipt:

```text
Submitted at:
Associated app version shown by App Store Connect:
Localizations submitted:
Deep link included: Yes | No
Assets included:
Reviewer:
Status checked at:
Approval date:
```

Don't schedule a campaign around an assumed approval time. Hold distribution until App Store Connect shows the page as approved and available for the intended route.

An approved page can later be changed by selecting **Create New Version**, editing the new draft, and submitting it. The existing unique URL stays the same; approved changes replace the current page automatically.

## Step 6: verify the live URL from every placement

Test the page after approval and before broad distribution. A correct App Store Connect record can still be undermined by the wrong website button, email link, QR code, redirect, or social scheduler.

```text
Custom page reference:
Expected audience:
Final placement:
Final placed URL:
Checked at:
Checked on device and OS:

[ ] Opens the intended app
[ ] Opens the intended custom product page, not the default page
[ ] First screenshot and promotional text match the brief
[ ] Correct localization appears for the test context
[ ] App is available in the intended storefront
[ ] Deep link opens the intended in-app destination, if configured
[ ] Redirects preserve the final destination
```

Test the actual placement, not just the URL copied from App Store Connect. If you also need campaign-token attribution, treat that as a separate link design and QA task; the [App Store campaign links guide](/blog/app-store-campaign-links/) covers Apple's campaign controls and reporting thresholds. Don't hand-build or alter tracking parameters without verifying the final result.

## Step 7: measure the page without claiming causality

Apple's [Custom Product Pages Analytics documentation](https://developer.apple.com/help/app-store-connect-analytics/acquisition/custom-product-pages/) directs you to **Analytics → Acquisition → Product Pages**. Select a page to inspect available product page views, downloads, conversion rate, proceeds, and downstream subscription or sales metrics. You can also filter or segment by dimensions such as territory, source type, and device.

Data for a page appears after at least five first-time downloads. Until the threshold is met, missing page data is unavailable evidence, not proof of zero activity.

Use a measurement record that preserves the traffic context:

```text
Page:
Complete date range:
Audience and entry paths:
Storefronts and localizations:

Product Page Views:
Downloads:
Conversion Rate:
Downstream metric, if relevant:

Other events during the window:
- App release:
- Featuring:
- Price or offer change:
- Other campaign:

Decision: Keep | revise | disable | insufficient data
Reason:
Next action:
```

A higher conversion rate than the default page doesn't prove the custom creative caused the difference. The page may have received visitors with stronger intent from a newsletter, ad, partner, or selected search. Compare like date ranges and segments, then describe the result as page-and-traffic performance rather than a randomized creative win.

For definitions and denominator checks, use the [App Store Connect analytics guide](/blog/app-store-connect-analytics/).

## A complete worked example

Suppose the budgeting app's default page serves households, while a two-week newsletter campaign targets freelancers.

The developer:

1. writes one brief around separating business income and building a tax reserve;
2. creates `freelancer-tax-us-en` from the current product page;
3. replaces the first three screenshots and promotional text for US English;
4. leaves app previews unchanged after confirming they don't conflict with the message;
5. skips keyword routing for the first launch so the newsletter remains the primary entry path;
6. submits the page, waits for approval, and verifies the actual newsletter button on an iPhone;
7. records the campaign dates and later reads that page's Analytics view.

At review time, the page has enough data to report. Its conversion rate is higher than the default page's during the same dates, but newsletter readers arrived after reading a freelancer-focused article. The defensible conclusion is:

> The freelancer page and newsletter traffic produced a higher observed conversion rate during this campaign. Because the audiences weren't randomized, keep the page for a second comparable campaign rather than declaring the screenshots universally better.

That decision creates a repeatable learning loop without turning segmented traffic into an A/B-test claim.

## Maintain or retire the page deliberately

Custom product pages shouldn't become permanent by neglect.

Review a page when:

- the screenshots no longer match the distributed app;
- the campaign or seasonal message ends;
- a localization changes materially;
- an assigned keyword no longer matches the page;
- the deep-linked destination changes; or
- the result remains unusable after a reasonable measurement window.

Apple provides two different retirement actions:

- **Disable Link:** visitors to the custom URL are redirected to the default product page. The link can be enabled again.
- **Delete This Product Page:** deletion is permanent, and visitors to the old URL are redirected to the default page.

Prefer disabling when the page may return or when you need time to audit old placements. Before deleting, search websites, email automations, ads, QR codes, and partner materials for the URL.

## Where LaunchBuddy fits

App Store Connect creates, reviews, serves, and measures custom product pages. LaunchBuddy doesn't create pages, upload their assets, assign their keywords, submit them, or reproduce Apple's page-level Analytics view.

LaunchBuddy can hold the operational work around the page:

- attach the brief, asset review, submission, link QA, and measurement tasks to a release;
- keep page decisions and retirement dates in project notes;
- track a related icon, screenshot, or copy experiment in LaunchBuddy Pro; and
- review selected downloads, revenue, and subscription metrics through the Pro App Store Connect integration after adding API credentials.

Use Apple's Product Pages view for official page-level evidence. LaunchBuddy's role is to keep the work, decision, and follow-up connected to the app and release.

The free plan includes release planning and default submission checklists for up to two apps and two releases. Custom checklists, unlimited apps and releases, ASO experiments, and App Store Connect analytics require Pro.

## Create one page you can explain later

The best custom product page isn't the one with the most changed assets. It's the one with a named audience, a coherent promise, complete localization coverage, an approved and tested route, and a decision record that respects how the traffic arrived.

To keep the custom-page brief, review tasks, link QA, and follow-up decision beside your release, <a href="https://apple.co/3iFcjjW">download LaunchBuddy on the App Store</a>.
