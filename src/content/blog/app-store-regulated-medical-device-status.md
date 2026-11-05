---
title: "App Store Regulated Medical Device Status: A Declaration Checklist"
description: "Declare App Store regulated medical device status with a regional checklist for category, age rating, registration, labeling, localization, and release checks."
pubDate: 2026-11-05
---

You must provide an **App Store regulated medical device status** when your app is available in the European Economic Area (EEA), United Kingdom, or United States and either of these conditions is true:

- Its primary or secondary App Store category is **Health & Fitness** or **Medical**.
- Its age-rating questionnaire marks Medical or Treatment Information as **frequent**.

This requirement doesn't mean every app in scope is a regulated medical device. It means an Account Holder or Admin must declare **Yes** or **No** in App Store Connect. If the answer is Yes, they must select the applicable regions and complete the required public information for each one.

Apple requires the status now for qualifying new apps. Qualifying existing apps must declare it by **early 2027**; Apple says undeclared apps won't be able to submit updates after that point. Apple hasn't named a more precise date, so don't turn “early 2027” into an invented deadline.

This checklist helps you prepare and verify the App Store Connect declaration. It can't determine whether software is a medical device. Have the person responsible for regulatory compliance make that decision under the rules for every region where the app is available.

## Gate 1: Confirm whether Apple requires a declaration

Start with the trigger, not with your preferred answer. Record the current state from App Store Connect:

```text
App:
Audit date:
Primary category:
Secondary category:
Medical or Treatment Information frequency:
Available in EEA: yes / no
Available in UK: yes / no
Available in US: yes / no
Declaration required by Apple's trigger: yes / no
Evidence owner:
App Store Connect owner:
```

The category and age-rating triggers are alternatives. A Health & Fitness app with no medical-treatment content is still in scope. So is an app outside the Health & Fitness and Medical categories if its age-rating answer for Medical or Treatment Information is frequent.

Check the saved values rather than relying on a product description or an old submission note. If the age-rating evidence is uncertain, use the [App Store age rating questionnaire guide](/blog/app-store-age-rating-questionnaire/) to audit the shipped experience before changing an answer. Don't lower a truthful frequency solely to avoid the declaration.

The geographic condition matters too. Apple's declaration applies to apps available in the EEA, UK, or US. Preserve the availability evidence with the audit because category, age-rating, and storefront decisions can change independently.

## Gate 2: Separate the App Store trigger from the regulatory decision

Apple describes regulated medical device apps as software used on its own or with medical-device hardware for purposes that include diagnosing, preventing, monitoring, or treating diseases and physiological conditions. Apple's help page lists signals such as FDA clearance or approval, an FDA database registration, an EU CE mark, a UKCA mark, or self-certification under the named EU or UK medical-device rules.

Those signals are useful evidence, not a classification quiz. App Store category, age rating, health-data access, and marketing language don't by themselves settle legal status. Nor does selecting No in App Store Connect create a regulatory conclusion.

Create a decision record before anyone opens the declaration:

| Decision field | Record |
| --- | --- |
| Region assessed | EEA, UK, or US |
| Product and version assessed | The software and connected hardware covered by the decision |
| Intended use | The approved intended-purpose or indications-for-use wording |
| Decision | Regulated / not regulated / unresolved |
| Decision authority | Named internal regulatory owner or qualified external adviser |
| Supporting record | Link to the controlled source, not a pasted credential |
| Effective date | Date the decision became applicable |
| Reassessment trigger | Product, labeling, hardware, market, or regulatory change |

If any required region is unresolved, stop at this gate. Don't ask a developer, marketer, AI assistant, or project-management app to fill the gap with a guess.

The declaration also doesn't replace App Review evidence. [App Review Guideline 1.4.1](https://developer.apple.com/app-store/review/guidelines/#physical-harm) says medical apps that might provide inaccurate information or be used for diagnosis or treatment may receive greater scrutiny. Apple requires support for health-measurement accuracy claims and asks developers whose medical app has regulatory clearance to submit a link to that documentation with the app.

## Gate 3: Prepare the evidence packet for each Yes region

Apple requires the following details when you declare Yes. Prepare them from controlled regulatory and labeling sources before data entry:

| App Store Connect field | EEA | UK | US | Verification check |
| --- | --- | --- | --- | --- |
| Public contact information | Required | Required | Required | Verify what will appear publicly; correct it in App Store Connect's Business section if needed |
| Registration identifier | EU Manufacturer SRN | Not required by this App Store field | FDA Owner/Operator Number | Match the relevant EUDAMED listing or FDA establishment registration |
| Instructions for use URL | Required | Required | Required | Open the public URL in a signed-out browser and confirm it describes the current product |
| Use statement | Intended purpose or intended use | Intended purpose or intended use | Indications for use | Copy from the approved source and preserve meaning |
| Safety information | Warnings, precautions, and contraindications from labeling | Same | Same; Apple also permits FDA problem-reporting information | Compare every locale with current labeling |

Don't treat one regional record as a template that is automatically valid everywhere. The identifier requirement differs, and the authorized intended-use wording may differ. Country or region selection must match the regulatory decision, not simply the app's entire availability list.

### Build a publication diff, not just a folder of documents

The declaration information appears on the App Store product page, so compare the exact public output with its source. A compact diff catches mistakes that a document checklist can miss:

```text
Region:
Source record and revision:

Public contact:
- Source:
- App Store value:
- Match:

Identifier:
- Source:
- App Store value:
- Match:

Instructions for use:
- Approved URL:
- App Store URL:
- Signed-out check passed:

Use statement:
- Approved text:
- App Store text:
- Meaning preserved:

Safety information:
- Approved text:
- App Store text:
- Warnings / precautions / contraindications all present:
```

This is especially useful when the same statement exists in a regulatory system, a labeling repository, a website, and App Store Connect. “A document exists” is weaker evidence than “the customer-facing value matches revision 7.”

## Gate 4: Plan localizations before entering the declaration

Apple lets you add the instructions-for-use URL, use statement, and safety information for each localization from a dropdown. Treat each locale as a controlled publication, not a casual translation task.

For every locale you intend to publish:

1. Identify the approved source language and revision.
2. Confirm who is authorized to translate or approve the labeling.
3. Verify that the instructions-for-use URL resolves to the intended language.
4. Compare the translated use statement with the approved regional wording.
5. Check that warnings, precautions, and contraindications remain complete.
6. Record the reviewer and review date.

If a locale isn't ready, resolve the labeling decision before improvising App Store copy. A fluent sentence can still be an inaccurate regulatory statement.

## Gate 5: Enter the status in App Store Connect

Apple's current [declaration instructions](https://developer.apple.com/help/app-store-connect/manage-app-information/declare-regulated-medical-device-status) require the **Account Holder or Admin** role.

1. In App Store Connect, open **Apps** and select the app.
2. Under **General**, open **App Information**.
3. Under **App Store Regulations & Permits**, select **Declare Regulated Medical Device**.
4. Answer whether the app is a regulated medical device in any country or region.
5. If the answer is **No**, save the declaration.
6. If the answer is **Yes**, select each applicable country or region and save.
7. Complete and verify the contact information, applicable identifier, instructions-for-use URL, use statement, and safety information for each selected region.
8. Add only approved localizations.
9. Save after every required region is complete.

The No path still needs evidence. Record who made the regulatory decision, which regions and product version it covers, and what change would require another assessment. A bare No with no dated basis is difficult to defend or maintain.

## Gate 6: Resolve status before calling the work complete

App Store Connect uses three status values:

- **Yes:** The app is declared as a regulated medical device in that region and all required information is entered.
- **No:** The app is declared not to be a regulated medical device in that region.
- **Missing Info:** The region is marked Yes, but required information is incomplete.

Treat Missing Info as unfinished, not as a harmless warning. Reopen the region and compare every field against the evidence packet.

Apple says saved information for a live app appears on the App Store within 24 hours. If the app isn't live yet, the information appears after approval and release. The same 24-hour window applies to updated declaration information.

That timing is a maximum published expectation, not proof that a specific page has updated. Schedule a separate verification after saving:

```text
Region:
Saved at:
App Store Connect status:
Expected public contact:
Expected identifier:
Expected instructions-for-use link:
Expected use statement:
Expected safety information:
Product page checked at:
Mismatch owner:
Result: pass / correct and recheck
```

Check the public product page for each applicable storefront. Don't close the task based only on the saved form.

## Gate 7: Attach the declaration to the release process

Apple's [March 26, 2026 announcement](https://developer.apple.com/news/?id=nyqbfz1y) makes the immediate release risk clear: qualifying existing apps without a declaration will lose the ability to submit updates in early 2027. Add a declaration gate to the [App Store Connect release checklist](/blog/app-store-connect-release-checklist/) before that becomes an emergency.

Use event-based triggers after the first declaration:

| Change | Reopen this evidence |
| --- | --- |
| Primary or secondary category changes | Apple's declaration trigger and product-page positioning |
| Medical or Treatment Information frequency changes | Age-rating evidence and declaration trigger |
| EEA, UK, or US availability changes | Region assessment and declaration coverage |
| Intended use, indications for use, or connected hardware changes | Regulatory decision, statement, and instructions for use |
| Registration or establishment details change | Published identifier |
| Labeling or safety information changes | Instructions-for-use URL, warnings, precautions, and contraindications |
| Public contact information changes | Business-section record and live product page |
| A localization is added or revised | All localized declaration fields |
| The app is transferred | Decision ownership, contact details, source records, and App Store values |

This change-trigger model is more reliable than re-reading the same checklist for every bug fix. It makes a quiet maintenance release light while ensuring that a meaningful medical or regional change reopens the right controls.

## Worked example: one app, three regional outcomes

Suppose a hypothetical monitoring app is sold in the EEA, UK, and US. Its primary category is Medical, so Apple's declaration is required. The manufacturer's regulatory owner has already documented these outcomes:

- Regulated in the EEA
- Regulated in the UK
- Not regulated in the US for the assessed product and intended use

The App Store record should follow those decisions rather than forcing one global answer:

| Region | Declaration | Required action |
| --- | --- | --- |
| EEA | Yes | Verify public contact, EU Manufacturer SRN, instructions-for-use URL, intended-use statement, safety information, and approved localizations |
| UK | Yes | Verify public contact, instructions-for-use URL, intended-use statement, safety information, and approved localizations; Apple's field doesn't require an EU/FDA identifier for the UK |
| US | No | Save the No declaration and retain the dated US decision record and reassessment triggers |

After saving, the team confirms that neither Yes region shows Missing Info and schedules storefront checks. It doesn't copy the EEA identifier into the UK or US, and it doesn't assume the US answer from the other regions.

The value in this example is the handoff: regulatory ownership decides status, the App Store Connect owner publishes the approved facts, and release ownership verifies the result.

## Where LaunchBuddy fits

LaunchBuddy can track the release work around this declaration: add tasks for the regional decision, data entry, localization review, Missing Info resolution, and storefront verification. A project note can hold the decision date and links to controlled records, while the official declaration remains in App Store Connect.

Release planning, taskboards, default App Store submission checklists, and a portfolio of up to two apps and two releases are available on LaunchBuddy's free plan. A custom reusable medical-device checklist requires LaunchBuddy Pro, currently $2.99 per month or $19.99 per year.

LaunchBuddy doesn't determine medical-device status, validate regulatory evidence, change the declaration, or submit compliance information to Apple. Keep registration records and approved labeling in the systems controlled by the responsible regulatory owner; use LaunchBuddy only to track the release tasks and verification.

The practical boundary is simple:

```text
Regulatory owner: classification + approved evidence
App Store Connect: declaration + customer-facing record
LaunchBuddy: release tasks + checklist + completion record
```

Make the deadline visible before it blocks an update: <a href="https://apple.co/3iFcjjW">download LaunchBuddy</a> and add an owned medical-device declaration check to your next release.
