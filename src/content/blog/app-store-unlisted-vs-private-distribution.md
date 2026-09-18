---
title: "App Store Unlisted vs Private Distribution: Which Should You Use?"
description: "Compare App Store unlisted and private distribution by audience, access control, device management, review, setup, and switching costs."
pubDate: 2026-09-18
---

**Choose unlisted App Store distribution when anyone with the direct link may install the app, including people on unmanaged devices. Choose private distribution when only named organizations should receive the app through Apple Business or Apple School Manager.** Neither option is a beta channel, and an unlisted link is not access control.

The decision matters before approval. Apple says switching between public and private distribution later requires a new App Store Connect app record and another binary submission. A public app can be changed to unlisted by request, but private-to-unlisted follows the new-record path.

## App Store unlisted vs private distribution at a glance

| Decision point | Unlisted distribution | Private distribution |
| --- | --- | --- |
| Who can find the app? | Anyone who receives the direct App Store link | Only organizations specified in App Store Connect |
| App Store visibility | Excluded from search, categories, recommendations, charts, and other listings | Visible to specified organizations in Apple Business or Apple School Manager |
| Unmanaged or employee-owned devices | Suitable when users need a standard App Store link | Usually depends on the recipient organization's Apps and Books and device-management process |
| Access boundary | The link controls discovery, not authorization | Organization assignment controls who can obtain the app through the private catalog |
| Deployment owner | The developer shares the link; users or organizations install from it | The organization's IT team acquires and distributes the app, including through device management |
| App Review | The app must be submitted and ready for final distribution; beta or prerelease apps don't qualify | The app and each updated version go through App Review |
| App Store Connect setup | Set distribution to Public, submit the app, note the unlisted intent, then request an unlisted link | Select Private and specify each recipient organization before approval |
| Later conversion | A public app can be changed to unlisted by request | Changing between private and public requires a new app record and binary submission |

The practical distinction is **reach versus control**. Unlisted distribution removes discovery surfaces while preserving a standard link. Private distribution puts acquisition inside an organization-specific distribution system.

## What unlisted App Store distribution actually means

Apple's [unlisted app documentation](https://developer.apple.com/support/unlisted-app-distribution) describes an app that is hosted on the App Store but omitted from normal discovery. It doesn't appear in search results, categories, recommendations, charts, or other App Store listings. Apple gives partner tools, employee resources, and research-study apps as examples.

An unlisted app can fit audiences that don't map neatly to one managed organization:

- Franchisees, contractors, partners, or conference attendees
- Higher-education students across managed and unmanaged devices
- Employees using personally owned devices
- Participants who need one standard installation link
- Multiple organizations that can safely use the same app

However, **anyone with the link can access the product page and download the app**. A forwarded URL doesn't stay inside the intended audience. If the app exposes restricted workflows or data, enforce authorization in the app or backend. Don't treat an obscure URL as a login system.

Apple also says an unlisted request will be declined if the app hasn't been submitted to App Review or is still a beta or prerelease build. TestFlight remains the appropriate channel while you are testing rather than distributing a finished app.

## What private App Store distribution means

With private distribution, the developer names one or more organizations in App Store Connect. Apple makes the approved custom app available only to those organizations in Apple Business or Apple School Manager. The recipient can then distribute it through its Apps and Books workflow, including Mobile Device Management (MDM) or redemption codes.

This is the stronger fit when the organization, not possession of a link, should determine eligibility. Common cases include:

- An internal app for one company
- A client-specific app containing organization workflows
- A school app limited to selected institutions
- A business app that IT must install, configure, update, or remove
- An app whose rollout depends on device-based or user-based licenses

Apple's [Custom Apps deployment guide](https://support.apple.com/guide/deployment/distribute-custom-apps-dep0113f6e18/web) says each custom app and each updated version goes through App Review. Reviewers must be able to operate the app, so provide a generic test account or sanitized sample data instead of exposing production information.

Private distribution doesn't replace in-app security. Organization targeting limits catalog access, but the app may still contain sensitive data after installation. Authentication, authorization, encryption, offboarding, and data handling remain product responsibilities.

## Use this decision tree

Start with the people and devices, not with the most discreet-sounding label.

1. **Must acquisition be limited to named organizations?**
   - Yes: choose private distribution.
   - No: continue.
2. **Will legitimate users include unmanaged or personally owned devices?**
   - Yes: unlisted distribution may fit.
   - No: continue.
3. **Does IT need to assign licenses and manage installation, configuration, updates, or removal?**
   - Yes: private distribution is usually the clearer operating model.
   - No: continue.
4. **Would a forwarded installation link create an unacceptable access path?**
   - Yes: don't rely on unlisted distribution alone. Choose private distribution when the audience maps to organizations, and enforce authentication either way.
   - No: unlisted distribution may fit.
5. **Is the app still being tested?**
   - Yes: use TestFlight now. Revisit final distribution when the release candidate is ready.
   - No: document the decision and proceed with the matching App Store Connect path.

A useful rule: if your audience definition begins with “anyone who has this invitation,” examine unlisted distribution. If it begins with “members or devices belonging to these organizations,” examine private distribution.

## Model the audience before creating the app record

The expensive mistake isn't selecting the wrong radio button. It's discovering after approval that your real audience doesn't match the selected control.

Create a short distribution record:

```text
App:
Intended audience:
Organizations involved:
Managed devices:
Unmanaged or employee-owned devices:
Who may install:
Who must be blocked:
In-app authentication:
Organization IDs confirmed by:
Installation owner:
Update owner:
Offboarding and app-removal owner:
Link-forwarding consequence:
Chosen distribution method:
Evidence for the choice:
```

Then test three edge cases:

1. **The link escapes.** For an unlisted app, can an unintended person install it, and what happens when they open it?
2. **A device leaves management.** For a privately distributed managed app, who removes the app or revokes its license, and what happens to local data?
3. **A second organization joins.** Does the current method support that audience without changing the product's authorization model?

These tests separate installation from actual access. Distribution decides how the app reaches a device; your product decides what an installed copy is allowed to do.

## How to request unlisted distribution

Use Apple's live instructions as the source of truth, because approval and interface details can change.

1. In App Store Connect, keep **App Distribution Methods** set to **Public**.
2. Prepare a final app version and add the correct build.
3. In App Review notes, state that the app is intended for unlisted distribution and explain the intended audience and workflow.
4. Submit the app to App Review.
5. Submit Apple's separate unlisted-app request.
6. Wait for approval of the request and app submission.
7. Confirm that App Store Connect shows the distribution method as **Unlisted App**.
8. Test the generated direct link on a representative managed device and an unmanaged device.
9. Test the unauthorized-user path instead of assuming the link will remain secret.

If the app is already public, Apple says its existing App Store link remains the same after approval for unlisted distribution. Future versions remain unlisted. If you shorten the URL, Apple explicitly recommends testing that the shortened link resolves correctly.

For the submission itself, use current [App Review notes guidance](/blog/app-review-notes/) and give reviewers working access to any gated feature.

## How to set up private distribution

Apple's [distribution-method instructions](https://developer.apple.com/help/app-store-connect/manage-your-apps-availability/set-distribution-methods) require the Account Holder, Admin, or App Manager role.

1. Ask each recipient for its Apple Business or Apple School Manager Organization ID through a trusted channel.
2. In App Store Connect, open **Pricing and Availability** and choose **Private** under App Distribution Methods.
3. Enter each recipient organization accurately.
4. Confirm the app's geographic availability supports the recipient's users. Apple's deployment guidance recommends global availability for a global audience.
5. Provide App Review with a generic test account, sanitized data, and clear steps for restricted workflows.
6. Submit the app and record the official review status.
7. After approval, have the recipient confirm that the app appears in Apps and Books.
8. Have IT assign the required licenses and test the intended device-management path.
9. Verify installation, authentication, managed configuration if used, updates, revocation, and removal.

This workflow has two owners: the developer publishes an approved custom app to the correct organizations, while each recipient's IT team distributes it. “Ready for Distribution” in App Store Connect doesn't prove that an MDM assignment, configuration, or update policy works.

Apple's current [managed-app documentation](https://support.apple.com/guide/deployment/distribute-managed-apps-dep575bfed86/web) explains that a device-management service can control installation and updates. The exact behavior depends on the management method, device state, license assignment, and MDM implementation, so validate it with the recipient rather than promising automatic installation or updates universally.

## Understand the switching cost before approval

Apple's rule is asymmetric:

- A publicly available app can be changed to unlisted after Apple approves the request.
- Switching from private to public, or public to private, requires a new app record and a resubmitted binary.
- A privately distributed app that should become unlisted must first take that new public-record path, then complete the unlisted request.

A new record isn't a cosmetic edit. Plan for identifiers, metadata, review, deployment instructions, links, and customer migration to need attention. Don't promise that ratings, reviews, acquisition history, licenses, or installation state will carry between records unless Apple explicitly documents that behavior for your case.

Before approval, record this sentence and make the owner sign off:

```text
If this audience model changes, our documented fallback is:
```

If the answer is “we'll switch later,” the distribution decision isn't finished.

## Run a distribution-specific release check

Add these checks to your broader [iOS app launch checklist](/blog/ios-app-launch-checklist/) or [App Store Connect release checklist](/blog/app-store-connect-release-checklist/):

- [ ] Intended users and excluded users are named.
- [ ] Managed and unmanaged device needs are documented.
- [ ] Link forwarding is acceptable, or in-app authorization blocks unintended use.
- [ ] Recipient Organization IDs are verified for private distribution.
- [ ] App Review can reach every gated workflow with sanitized credentials.
- [ ] The correct distribution method is saved before approval.
- [ ] The official App Store Connect state is recorded.
- [ ] A real installation path has been tested after approval.
- [ ] Update, revocation, removal, and support owners are named.
- [ ] The new-record consequence of changing methods is accepted.

## Where LaunchBuddy fits

LaunchBuddy can keep the app, release, distribution decision, tasks, and submission checks together across iPhone, iPad, and Mac with iCloud sync. The Free plan includes release planning, taskboards, and default submission checklists within its two-app and two-release limits. Pro adds unlimited apps and releases plus custom checklists.

For this workflow, create tasks with explicit owners and evidence:

```text
[Developer] Verify recipient Organization ID
[Developer] Add sanitized App Review account
[IT] Confirm app appears in Apps and Books
[IT] Test managed installation and update policy
[Product] Test unauthorized-user behavior
[Release] Record approved distribution method
```

LaunchBuddy doesn't select an App Store distribution method, request an unlisted link, create an Apple app record, upload a binary, verify an Organization ID, configure MDM, or control App Store availability. App Store Connect, Apple Business or Apple School Manager, and the recipient's device-management system remain authoritative. For the broader boundary, see [LaunchBuddy vs App Store Connect](/blog/launchbuddy-vs-app-store-connect/).

Once the audience, access boundary, and switching cost are explicit, <a href="https://apple.co/3iFcjjW">download LaunchBuddy and attach the distribution checks to your release</a>.
