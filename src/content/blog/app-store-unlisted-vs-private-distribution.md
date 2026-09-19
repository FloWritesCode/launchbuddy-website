---
title: "App Store Unlisted vs Private Distribution: How to Choose"
description: "Compare public, unlisted, and private App Store distribution by discoverability, access control, device management, setup, and switching costs."
pubDate: 2026-09-19
---

**Use unlisted App Store distribution when anyone with a direct link may install the app, including people on unmanaged devices. Use private distribution when only named organizations should be able to obtain it through Apple Business or Apple School Manager.** If you want ordinary App Store discovery, use public distribution instead.

The critical difference is access control. An unlisted app is hidden from search, charts, categories, and recommendations, but it isn't private: Apple says anyone with the link can access it. A private custom app is visible only to the organizations you specify. Make this decision before approval because Apple generally doesn't let you switch an approved app between public and private distribution without a new app record and another binary submission.

## Unlisted vs private distribution at a glance

| Decision point | Public | Unlisted | Private custom app |
| --- | --- | --- | --- |
| App Store discovery | Appears in the storefronts you select and can be discovered normally | Hidden from search, categories, charts, recommendations, and other listings | Not offered to the general App Store audience |
| Who can obtain it | Anyone in an available storefront | Anyone who has the direct link | Only organizations specified in App Store Connect |
| Organization tooling | Also available for volume purchase through Apple Business or Apple School Manager | Direct link can also be used through Apple Business or Apple School Manager | Organization obtains it through Apple Business or Apple School Manager |
| Managed devices required | No | No; Apple explicitly supports managed and unmanaged devices | The named organization distributes through Mobile Device Management or redemption codes |
| Access boundary | Storefront availability | Possession of the link; add in-app authentication when access matters | Organization identity |
| Initial App Store Connect choice | Public | Start as Public, submit to review, then request unlisted distribution | Private, with each organization identified before approval |
| Best fit | Consumer or broadly discoverable apps | Bounded audiences that can't all be represented as managed organizations | Internal or client apps for known organizations |

Public volume purchasing and private distribution aren't the same. Apple's [distribution-method documentation](https://developer.apple.com/help/app-store-connect/manage-your-apps-availability/set-distribution-methods) says public apps are automatically available for volume purchase through Apple Business and Apple School Manager. A business buying many licenses is therefore not, by itself, a reason to choose Private.

## Match the method to the audience boundary

Start with one question: **What must someone possess before they can install or use the app?**

### Unlisted suits a link-defined audience

Unlisted distribution suits a real but diffuse audience that needs a production App Store app without public discovery. Apple gives examples such as part-time employees, franchisees, partners, business affiliates, higher-education students, conference attendees, and research-study participants.

It also fits employee-owned or otherwise unmanaged devices. The link works through the App Store and can be used with Apple Business or Apple School Manager.

Do not treat a hard-to-find link as authorization. Apple's [unlisted app guidance](https://developer.apple.com/support/unlisted-app-distribution/) is explicit: anyone with the link can access the app. If only enrolled participants, employees, or customers should use its features, enforce that boundary inside the app with sign-in, entitlement checks, or another appropriate access mechanism.

### Private suits an organization-defined audience

Private distribution works for an app built for one or more known businesses or schools. You identify each organization in App Store Connect, normally using its Organization ID. Apple documents the Private option as available before the app has been approved. After approval, the app appears to that organization through Apple Business or Apple School Manager, where it can be distributed through Mobile Device Management or redemption codes.

This is the stronger fit when an organization's administrators need to control acquisition and deployment. It also supports proprietary apps for your own organization.

The audience has to participate in Apple's organization-distribution path. If intended users span unmanaged personal devices and can't be represented by specified organizations, private distribution may solve the wrong problem even if the app itself is business-related.

### Public is right when discovery is intentional

Use public distribution when the product is meant for a general audience or should be found through ordinary App Store browsing and search. You can still restrict [country or region availability](https://developer.apple.com/help/app-store-connect/manage-your-apps-availability/manage-availability-for-your-app-on-the-app-store/), and organizations can still buy the app in volume.

Neither a narrow marketing plan nor a specialized audience automatically requires unlisted distribution. If anyone should be able to discover the app and decide whether it is relevant, Public is the clearer match.

## Make the App Store distribution decision

Use this sequence before you create the final release plan:

1. **Name the real production audience.** Avoid labels such as “B2B” or “internal.” List the people and the kinds of devices they use.
2. **Choose the access principal.** Decide whether access begins with a storefront, possession of a link, or membership in a named organization.
3. **Separate installation from authorization.** Write down who may install the app and, separately, who may use protected data or features.
4. **Confirm device administration.** Ask each organization whether it uses Apple Business or Apple School Manager and how it distributes apps.
5. **Model the wrong-choice cost.** Record whether a new app record, new binary submission, changed link, fresh installation, or user migration would be required.
6. **Approve the distribution method before App Review.** The person approving it should understand that this is a product and customer-continuity decision, not a metadata preference.

Capture the answer in a short decision record:

```text
App and version:
Production audience:
Managed devices, unmanaged devices, or both:
Who may install:
Who may use protected features:
Required in-app authentication:
Chosen method: Public / Unlisted / Private
Named organizations and IDs, if Private:
Link-sharing plan, if Unlisted:
Owner who verified the App Store Connect setting:
Migration consequence if the choice is wrong:
```

This forces two commonly blurred questions apart: “Can the user reach the product page?” and “Will the app authorize the user after installation?”

## Worked examples

### An employee app for one company

The company manages devices and wants its administrators to control deployment. The developer has the company's Organization ID.

**Choice: Private.** The organization boundary matches the intended audience. The company can obtain the custom app through Apple Business or Apple School Manager and handle deployment.

### A field app for franchisees and contractors

The audience changes often, many people use personal devices, and not every participant belongs to a managed Apple organization. The app already requires an account provisioned by the business.

**Choice: Unlisted may fit.** The direct link solves discovery and installation across managed and unmanaged devices. Account authentication, not secrecy of the link, protects access.

### A conference companion

Attendees need a production app for a limited event, and the organizer can distribute one link. There is no need for organization-managed deployment.

**Choice: Unlisted may fit.** Add an in-app event code or account only if event content needs authorization. Do not claim the unlisted link itself is restricted.

### A specialist consumer utility

The potential audience is small, but any App Store customer should be able to find and buy the app.

**Choice: Public.** Audience size is not an access rule. Unlisted distribution would remove useful discovery without adding meaningful authorization.

## Set up an unlisted app

Apple's current process starts from Public distribution:

1. In App Store Connect, set **App Distribution Methods** to **Public**.
2. Prepare the app for final distribution and submit it to App Review. In Review Notes, state that the app is intended for unlisted distribution.
3. Submit Apple's separate request for an unlisted app link.
4. If Apple approves the request, verify that App Store Connect shows **Unlisted App** and test the generated link.
5. Test installation on every intended managed and unmanaged path.
6. Test the app's own authorization boundary without relying on the link being secret.

Apple says a beta or prerelease app isn't eligible for the unlisted request. If an app is already public, its existing App Store link remains the same after approval. Future versions stay unlisted.

If the app is currently private, don't plan on converting the same record directly. Apple requires a new app record, a binary upload under Public distribution, App Review, and then the unlisted request.

## Set up a private custom app

Apple's [custom-app guidance](https://developer.apple.com/support/volume-purchase-and-custom-apps) describes this sequence:

1. Before approval, ask each recipient for its Apple Business or Apple School Manager Organization ID.
2. In App Store Connect, open **Pricing and Availability**.
3. Under **App Distribution Methods**, select **Private**.
4. Add the specified organizations using Organization ID. Apple also documents an Apple Account option for organizations still using the legacy Volume Purchase Program.
5. Save, complete the release, and submit the app to App Review.
6. After approval, have each organization confirm that the app appears in its Custom Apps section.
7. Test its chosen Mobile Device Management or redemption-code installation path and the app's critical sign-in and data flows.

Provide App Review with sample data and working authentication when the app contains protected content. The reviewer still needs a valid path through the app even though its customer distribution is private.

## Treat the switching rules as an approval gate

Apple documents one important exception to its fixed distribution-method rule: an approved public app can be changed to unlisted after Apple approves the request. Switching between private and public requires a new app record and another binary submission.

That replacement can affect more than release timing. Before approving a method, inspect:

- Product-page and campaign links
- Bundle and app-record identifiers used by release tooling
- Existing installations and the update path
- Sign-in, local data, purchases, and subscription continuity
- Mobile Device Management configuration
- Support instructions and customer communication
- Analytics baselines tied to the original record

Do not promise continuity from a new record without testing it. Apple's distribution page explains the required record and binary change; your app's architecture determines the customer consequences.

Add this irreversible-choice gate to your [iOS app launch checklist](/blog/ios-app-launch-checklist/) before the general [App Store Connect release checklist](/blog/app-store-connect-release-checklist/):

```text
Distribution approval
- Audience and device model verified
- Installation and in-app authorization separated
- Public / Unlisted / Private choice approved
- Organization IDs verified, if Private
- App Review note and unlisted request owner assigned, if Unlisted
- Wrong-choice migration consequences accepted
```

## Where LaunchBuddy fits

App Store Connect remains the authority for the distribution method, organizations, review, availability, and generated link. LaunchBuddy doesn't configure distribution, request unlisted status, manage organizations, deploy through Mobile Device Management, or move an app between records. The [LaunchBuddy vs App Store Connect comparison](/blog/launchbuddy-vs-app-store-connect/) explains that boundary in the wider release workflow.

LaunchBuddy can keep the decision record, release tasks, and submission checks attached to the app across iPhone, iPad, and Mac. Release planning, taskboards, iCloud sync, and default App Store submission checklists are available on the Free plan within its two-app and two-release limits. Custom reusable checklists require Pro.

For a private app, create tasks to obtain and verify Organization IDs, prepare reviewer access, and collect deployment acceptance from each organization. For an unlisted app, track the review note, request, generated-link test, authentication test, and audience communication as separate completion conditions.

## Frequently asked questions

### Is an unlisted App Store app private?

No. It is absent from normal App Store discovery, but Apple says anyone with the direct link can access it. Use in-app authentication or authorization when the audience must be restricted.

### Does a custom app skip App Review?

No. Private custom apps are submitted to App Review. Protected content may require sample data and authentication so the reviewer can evaluate it.

### Can a public app also be purchased by an organization?

Yes. Apple says public App Store apps are automatically available for volume purchase through Apple Business and Apple School Manager. Private distribution is for limiting the app to specified organizations, not merely for selling multiple licenses.

### Can I change from private to public later?

Not on the same approved app record. Apple says switching between private and public requires a new app record and another binary submission. Public-to-unlisted is the documented exception and requires Apple's approval.

Choose the audience boundary before approval, record who authorized it, and test both installation and in-app access. Then <a href="https://apple.co/3iFcjjW">use LaunchBuddy to keep the distribution decision and release checks with the app</a>.
