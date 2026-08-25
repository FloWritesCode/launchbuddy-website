---
title: "App Store Age Rating Questionnaire: A 2026 Guide"
description: "Complete the App Store age rating questionnaire with an evidence-first audit, current category definitions, 2026 social-media rules, and a reusable release checklist."
pubDate: 2026-08-25
---

To complete the **App Store age rating questionnaire**, audit the content and capabilities users can encounter in the current app, then go to **Apps → your app → App Information → Age Ratings** in App Store Connect. Select **Set Up Age Ratings** (or **Edit**), disclose the controls and capabilities that are present, answer each content-frequency question, review Apple's calculated global and region-specific ratings, and save.

Don't choose a target rating first and work backward. Apple says the questionnaire is a required app-information property used for parental controls, and [App Review Guideline 2.3.6](https://developer.apple.com/app-store/review/guidelines/#accurate-metadata) requires honest answers. The safest input is a feature-by-feature evidence record for the app people can actually use.

This guide also reflects a current deadline: Apple added social-media questions in July 2026. Beginning in September 2026, a response about social-media capabilities is required when submitting a new app or update to the App Store, and for notarization submissions for alternative distribution.

## Prepare an evidence sheet before opening App Store Connect

The questionnaire covers more than visual media. A utility with no violent artwork might still include advertising, chat, health guidance, a web browser, contests, or user-generated content.

Start with one evidence sheet shared by product, engineering, and whoever owns App Store Connect. If you're a solo developer, use the same structure to keep your own review consistent:

```text
App:
Release or audit date:
Platforms reviewed:
Builds/configurations reviewed:
Reviewer:

Feature or content:
Where a user encounters it:
Who supplies it: developer / user / third party / generated
Control or restriction that is implemented:
Questionnaire category to inspect:
Evidence: test path, specification, screenshot, or policy
Answer selected:
Reason:
Follow-up owner:
```

Audit every supported platform. Apple sets age rating at the app level and applies it across platforms, even though the displayed value can vary by country, region, or OS version.

Use these five passes:

1. **First-party content:** onboarding, stories, artwork, audio, help text, wellness guidance, and anything bundled with the app.
2. **Interactive capabilities:** browsing, posting, feeds, reactions, search, direct messages, ads, contests, gambling-like mechanics, and loot boxes.
3. **Content that changes without a binary update:** community posts, editorial feeds, web content, generated responses, third-party catalogs, and remotely configured experiences.
4. **Implemented controls:** parental controls, age assurance, content filters, and age-gated feature paths. Record what the shipped implementation enforces, not what a future task promises.
5. **Release changes:** compare this evidence with the previous answer set so a new feature doesn't inherit an old “None” by accident.

Apple specifically reminds developers to consider how all features, including AI assistants and chatbot functionality, affect the frequency of sensitive content. A blank test account isn't evidence that a live feed, chatbot, or remote catalog contains no relevant content.

## Complete the questionnaire step by step

Apple's current [age-rating setup instructions](https://developer.apple.com/help/app-store-connect/manage-app-information/set-an-app-age-rating/) list the required role as Account Holder, Admin, App Manager, or Marketing.

1. In App Store Connect, open **Apps** and select the app.
2. Under **General**, open **App Information**.
3. In **Age Ratings**, select **Set Up Age Ratings**. To change an existing answer set, select **Edit** at the top of the App Information page.
4. Review the in-app controls and capabilities. Select only those the app actually includes.
5. Move through every questionnaire section and answer each presence or frequency question using the definitions shown in App Store Connect.
6. Review the calculated rating under **Additional Information**.
7. Choose **Not Applicable** under Age Categories and Override unless the app belongs in the Kids category or needs a higher override.
8. Optionally add an Age Suitability URL if the app has a dedicated public page explaining age suitability.
9. Save, then inspect both the global rating and every region-specific panel that applies to the app's availability.

Preserve the completed evidence sheet with the release record. App Store Connect stores the answer set, but your record explains why each choice was made and what should trigger another review.

## Map app behavior to Apple's question categories

Apple's [current definitions](https://developer.apple.com/help/app-store-connect/reference/app-information/age-ratings-values-and-definitions) separate controls, capabilities, and content. Use the wording in the live questionnaire as the authority; this map is an audit aid, not a substitute.

| Category | Evidence to inspect |
| --- | --- |
| In-App Controls | Parental controls and age-assurance mechanisms that are already implemented |
| Capabilities | Unrestricted web access, user-generated content, social media, social media disabled for users under 13, messaging and chat, and advertising |
| Mature Themes | Profanity or crude humor, horror or fear, and references to alcohol, tobacco, or drugs |
| Medical or Wellness | Medical or treatment information and health or wellness topics |
| Sexuality or Nudity | Suggestive themes, sexual content or nudity, and graphic sexual content |
| Violence | Cartoon or fantasy violence, realistic violence, prolonged graphic or sadistic violence, and guns or other weapons |
| Chance-Based Activities | Gambling, simulated gambling, contests, and loot boxes |

Some controls and capabilities are presence questions, while content descriptors use frequency choices. Don't convert one into the other. Moderating user-generated content, for example, may change what users encounter, but it doesn't make the user-generated-content capability disappear.

When a feature touches more than one row, assess each row. A community app can have user-generated content, a social feed, direct messaging, advertising, and wellness content at the same time.

## Handle the 2026 social-media questions separately

Apple defines a social-media capability as the ability to redistribute, amplify, or interact with user-generated content through a social feed or similar discovery method that visibly spreads content to many users. Its examples include reposting, liking, commenting, reacting, and making content more visible through a feed, community, search, or discovery tools.

That definition is narrower than “users can upload something,” but broader than an app whose primary App Store category is Social Networking. Assess the behavior rather than the category:

- A private direct-message feature belongs in the messaging-and-chat review even if there is no public feed.
- A public post feed may involve both user-generated content and social media.
- Reactions, comments, reposts, community search, or ranking can make social distribution part of the experience.
- Disabling social features for users under 13 is its own declaration; it isn't the same as saying the app has no social-media capability.

Apple's June 2026 [Time Allowances announcement](https://developer.apple.com/news/?id=0d2gpmml) says an app that declares social-media capabilities receives a minimum 13+ age rating and is placed in the Social Media Time Allowance category.

There is a separate path when those capabilities are disabled for users under 13. Apple requires at least the Declared Age Range API to check age ranges before enabling them and says only age-appropriate user-generated content should be delivered. The rest of the questionnaire then determines the rating, which may be lower than 13+.

Before selecting the under-13 option, verify the actual gate, the content delivered on each side of it, and the failure path. A policy sentence or date-of-birth field alone isn't evidence that the capability is disabled.

## Review the result instead of treating it as a pass

On iOS 26, iPadOS 26, macOS Tahoe 26, tvOS 26, visionOS 26, and watchOS 26 or later, the current general values are 4+, 9+, 13+, 16+, 18+, and Unrated. Regional standards can produce different labels or thresholds. Earlier OS versions use the earlier display system.

After saving:

- Open every global and region-specific rating panel.
- Compare the listed descriptors with the evidence sheet.
- Investigate a surprising result by checking the answers and Apple's definitions; don't simply edit toward a preferred number.
- Check the earlier-OS section if support or customer communication requires it.
- Record the calculated result and the date reviewed.

An Unrated app can't be published on the App Store, although Apple says it may be distributed through an alternative marketplace or website where permitted.

Region-specific obligations can also require another step. For example, Apple documents a Rating Classification Number workflow when the Korean Games Rating and Administration Committee issues a different rating.

## Use higher overrides and the Kids category carefully

Apple supports an **Override to Higher Age Rating** when the app's own policy or EULA requires a minimum age above the calculated rating, or when a higher value better reflects the app. The override applies across regions and is translated into applicable region-specific values. It doesn't erase the content descriptors produced by the answers.

Apple doesn't document a matching “override lower” option. If the calculated rating looks too high, recheck incorrect answers and definitions rather than suppressing a truthful descriptor.

The Kids category is a separate commitment. If the calculated result is 4+ or 9+, App Store Connect can offer **Made for Kids** and an age range. Apple's setup guide says that choice can't be changed after App Review approves the app. Future updates must continue to follow the Kids category guidelines. The option isn't available for visionOS apps, and Kids category apps can't be made available on visionOS.

## Worked example: audit a community wellness update

Suppose version 3.0 of a hypothetical fitness app adds a public activity feed, reactions, direct messages, an AI coaching response, and sponsored placements. The old answer set predates all five features.

Don't start with “we want to remain 4+.” Build this matrix:

| Shipped behavior | Questions to inspect | Evidence needed |
| --- | --- | --- |
| Members publish activity text and photos | User-generated content; applicable content descriptors | Test paths, allowed media, moderation behavior, and representative production rules |
| Posts appear in a discoverable feed with likes and comments | Social media | Feed, discovery, reaction, and comment behavior |
| Members message one another | Messaging and chat | Who can initiate, receive, report, block, and access messages |
| AI returns exercise or injury-related responses | Health or wellness; medical or treatment information; any sensitive content it can produce | System behavior, test cases, guardrails, and user-visible output |
| Sponsored cards appear in the feed | Advertising | Placement and production configuration |
| Social features are claimed to be unavailable under 13 | Social media disabled for users under 13; age assurance | Declared Age Range API path, enforcement tests, and age-appropriate content behavior |

The developer still has to select the answers in App Store Connect. The matrix prevents three common errors: treating moderation as absence, forgetting content delivered after download, and assuming one feature maps to only one question.

If the changed behavior is non-obvious to App Review, explain how to reach it in your [App Review notes](/blog/app-review-notes/). Keep those reviewer instructions separate from the age-rating evidence and answers.

## Add change triggers to every release

You don't need to redo the entire investigation blindly for each bug fix. You do need a trigger that reopens the relevant evidence whenever behavior changes.

| Release change | Age-rating review to reopen |
| --- | --- |
| Add an embedded browser or broaden allowed destinations | Unrestricted web access |
| Add uploads, posts, comments, reactions, feeds, search, or direct messages | User-generated content, social media, messaging and chat |
| Add an ad SDK or new sponsored placements | Advertising |
| Add a chatbot, generated content, or a remotely updated catalog | Every content descriptor users may encounter |
| Add health advice, diagnosis support, treatment guidance, or wellness coaching | Medical or wellness |
| Add weapons, combat, horror, mature story content, or substance references | Mature themes, sexuality or nudity, and violence as applicable |
| Add contests, randomized paid items, simulated betting, or gambling | Chance-based activities |
| Change the EULA, age policy, Kids category plan, or under-13 access | Age category, higher override, controls, and capabilities |
| Add a platform with different features | Full app-level answer set across all platforms |

Make “Age rating evidence reviewed” a release check with an owner and a link to the decision record. That is more useful than a checkbox that only says “Age rating done.”

For the rest of the submission surface, use the [App Store Connect release checklist](/blog/app-store-connect-release-checklist/). The broader [LaunchBuddy vs App Store Connect guide](/blog/launchbuddy-vs-app-store-connect/) explains why Apple's portal remains the source of truth for this setting.

## Where LaunchBuddy fits, and where it doesn't

LaunchBuddy can organize the work around the questionnaire. Create a release, assign audit tasks, record the evidence-review decision in a task or project note, and add a submission-checklist item requiring another review after a relevant feature changes.

Release planning, taskboards, and default App Store submission checklists are available in the free plan. Custom reusable checklists require LaunchBuddy Pro, currently $2.99 per month or $19.99 per year.

LaunchBuddy can't inspect the binary, classify its content, determine the correct answers, edit the age rating, or submit the questionnaire. Those decisions and the official record stay in App Store Connect. The useful boundary is:

```text
LaunchBuddy: owner + evidence task + release trigger + completion record
App Store Connect: questionnaire answers + calculated ratings + regional details
Developer: truthful classification + final verification
```

That split keeps project management from being confused with product or compliance judgment.

## App Store age rating questionnaire FAQ

### Must I complete the whole questionnaire for every update?

Apple requires an age rating, but it doesn't say every unchanged answer must be reinvented for every version. Review the answer set whenever content, capabilities, controls, policy, platforms, or remotely delivered experiences change. Separately, beginning in September 2026, Apple requires the social-media response for new-app, update, and alternative-distribution notarization submissions.

### Can an app with chat, ads, or user-generated content still be rated 4+?

Potentially. Apple's current general 4+ definition includes some capabilities such as user-generated content, messaging and chat, and advertising. The complete answer set, content frequencies, region, and OS display system determine the result, so don't infer a final rating from one capability.

### Why does App Store Connect show more than one age rating?

Apple calculates a global rating and additional region-specific ratings where required. Ratings can also display differently on operating systems earlier than version 26. Open each panel in App Store Connect before recording the result.

### Can I lower Apple's calculated rating?

Apple documents an override to a higher rating, not a lower one. If the result seems wrong, compare each answer with the current definitions and correct factual mistakes. Don't change truthful answers to reach a preferred storefront label.

Treat age rating as release evidence, not a one-time form: <a href="https://apple.co/3iFcjjW">download LaunchBuddy</a> and add an owned age-rating review to your next App Store checklist.
