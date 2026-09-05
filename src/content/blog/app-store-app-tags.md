---
title: "App Store App Tags: What They Are and How to Review Them"
description: "Learn how Apple assigns App Store app tags, where they appear, how to hide an inaccurate tag, and how to document a careful keep-or-hide decision."
pubDate: 2026-09-05
---

**App Store app tags are clickable terms that describe an app or game's essential qualities.** Apple applies them from your US English App Store metadata, artificial intelligence, and human curation. You can't type in any tag you want; App Store Connect lets eligible team members review Apple's selected tags and deselect ones they don't want associated with the app.

Tags can appear in App Store search results, on search landing pages, and on product pages. Tapping one leads to other apps and games related to that tag. Apple currently supports and displays app tags only in the United States.

That makes the developer's job narrower than traditional keyword research: confirm that every assigned tag sets an accurate expectation, hide a misleading one, and preserve the reasoning behind the decision.

## App tags are not the keyword field or category

These three discovery inputs are related, but the controls are different:

| Input | Where it comes from | What the developer controls |
| --- | --- | --- |
| App tags | Apple selects tags using US English metadata, AI, and human curation | Review the selected tags and deselect unwanted ones |
| Keyword field | The developer enters hidden search metadata | Choose relevant terms within Apple's field rules |
| Primary and secondary categories | The developer selects from Apple's available categories | Choose the categories that best fit the app |

An app tag is visible and tappable. The [App Store keyword field](/blog/app-store-keyword-field/) isn't shown as a list on the product page, though Apple uses keywords to help determine where an app appears in search. Categories are broader classifications used for browsing and search.

Don't treat tags as a replacement keyword list. Apple's [app tag documentation](https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-tags/) says tags are based partly on the metadata you provide, so accurate names, subtitles, keywords, and descriptions still matter.

## Where app tags appear and who can edit them

Apple says tags can appear in three discovery surfaces:

- App Store search results
- Search landing pages
- An app's product page

The feature is currently limited to the United States. Apple also says the tags applied by default are based on the `en_US` metadata in App Store Connect. A tag decision therefore shouldn't be copied into every localization as if it were a worldwide setting.

To edit tag selections, a team member needs one of these App Store Connect roles:

- Account Holder
- Admin
- App Manager
- Marketing

If the App Store Tags control isn't available to a team member, verify their role before treating it as a site problem.

## How to review App Store app tags

Apple's editing path is short. The more important work is deciding what to keep before clicking Save.

### 1. Open the app's tag selection

In App Store Connect:

1. Open **Apps** and select the app.
2. Under **General**, choose **App Information**.
3. Find **App Store Tags** and click **Edit**.
4. Review the selected tags in the pop-up.

Apple applies its selected tags by default. The documented control is to deselect a tag you don't want, not to enter an arbitrary replacement.

### 2. Test each tag against the current app

For every selected tag, write one sentence that completes this test:

> A person who taps this tag will find this app relevant because ___.

Keep the tag only when the answer points to a real, current part of the product. Good evidence can include:

- A core workflow available in the released app
- A prominent feature shown accurately in current screenshots
- A use case clearly explained by the name, subtitle, or description
- Repeated user language that matches the app's actual behavior

Weak evidence includes a feature that is only planned, a broad audience you hope to reach, or one incidental word in the description. The tag should describe the product people can download, not the roadmap.

### 3. Check the expectation created by the tag

A technically related tag can still be a poor fit. Ask:

- Is this quality central enough that a person would recognize it quickly?
- Does the current product page support the same expectation?
- Would a reasonable user feel misled after opening the app?
- Did the latest release remove or narrow the feature behind the tag?

For example, Apple uses **Sleep** as an example tag. If a timer has one optional bedtime preset but doesn't otherwise support a sleep-focused experience, the developer should not keep the tag merely because the word “sleep” appears in the description. If guided sleep is a core, visible workflow, the evidence is much stronger.

### 4. Record a keep-or-hide decision

Use a compact decision record instead of relying on memory:

```text
Review date:
App version:
US English metadata reviewed:

Assigned tag:
Decision: Keep | Hide
Product evidence:
Product-page evidence:
Expectation risk:
Reason:

Other changes made at the same time:
Next review trigger:
```

This record adds something App Store Connect can't infer: why the selection was appropriate for a particular version. It also prevents the next metadata review from repeating the same debate.

### 5. Save the selection in App Store Connect

After reviewing every selected tag, deselect any unwanted tags and click **Save**.

Apple warns that deselecting all tags may affect discoverability. That isn't a reason to retain an inaccurate tag. It is a reason to review the complete set deliberately and make sure the US English metadata describes the app clearly.

## Use release triggers instead of a weekly tag ritual

App tags don't need attention every time you open App Store Connect. Review them when something changes that could alter Apple's selection or the expectation behind it:

- The app adds or removes a major workflow
- The product's positioning changes
- The US English name, subtitle, keywords, or description changes
- Screenshots begin emphasizing a different use case
- A release makes an existing tag newly accurate or misleading
- Apple assigns a tag you haven't evaluated before

Connect the review to the broader [App Store metadata management workflow](/blog/app-store-metadata-management/). This keeps the tag decision beside the copy and product evidence that support it.

In LaunchBuddy, the verified use is release planning: add an “Audit App Store tags” task to the relevant version and keep the rationale in a project note. LaunchBuddy doesn't have a documented App Store tag editor, so the actual selection remains in App Store Connect. Release planning and default submission checklists are available on the free plan for up to two apps and two releases; custom reusable checklists require Pro.

## Measure carefully after changing a tag selection

Tags participate in discovery, but a before-and-after chart doesn't prove that one tag caused a change. A release, campaign, featuring placement, seasonal shift, or simultaneous metadata edit can move the same acquisition metrics.

Before saving a tag change, record:

- The exact date and selected tag set
- The app version live during the comparison
- Any name, subtitle, keyword, description, or screenshot changes
- Campaigns, featuring, price changes, and other outside events
- The US storefront and complete periods you plan to compare

Then use Apple's App Store Connect Analytics to compare complete periods and inspect acquisition sources. Apple's [Analytics dashboard documentation](https://developer.apple.com/help/app-store-connect-analytics/overview/analytics-dashboard/) describes it as a tool for comparing segments and time periods and investigating launches, updates, or campaigns.

Label the result honestly. “Search acquisition increased after the change” is an observation. “This tag increased downloads” is a causal claim the before-and-after comparison hasn't established. The [ASO experiment tracker](/blog/aso-experiment-tracker/) provides a reusable record for changes that Apple's Product Page Optimization doesn't randomize.

## A practical App Store tag audit

Copy this checklist into the release that changes your product or US English metadata:

```text
Access
- App Store Connect role confirmed
- App Information > App Store Tags opened

Accuracy
- Every selected tag reviewed
- Current product behavior supports each kept tag
- Product page supports the same expectation
- Planned or removed features ignored

Decision
- Keep-or-hide reason recorded for each tag
- Unwanted tags deselected
- Selection saved in App Store Connect

Measurement
- Change date and live version recorded
- Simultaneous metadata and campaign changes recorded
- Comparable review period chosen
- Results will be labeled observational, not causal
```

## Frequently asked questions

### Can I add my own App Store app tags?

Apple's current instructions document reviewing selected tags and deselecting unwanted ones. They don't provide a field for entering arbitrary tags. The best input you control is accurate US English metadata; Apple combines that metadata with AI and human curation when selecting tags.

### Are App Store app tags available worldwide?

No. Apple currently says app tags are supported and displayed only in the United States.

### Should I deselect every tag that isn't perfect?

Use a relevance threshold, not a search for perfect wording. Keep a tag when it describes an essential quality that the current app and product page can support. Hide it when it creates a material expectation the app doesn't meet. Apple cautions that deselecting all tags may affect discoverability.

App tags are a small control with a clear purpose: help people understand what they'll get before they tap or download. Review Apple's selections against the product that's live, document the decision, and make the final change in App Store Connect.

To keep tag reviews and other App Store tasks attached to the release that prompted them, <a href="https://apple.co/3iFcjjW">download LaunchBuddy on the App Store</a>.
