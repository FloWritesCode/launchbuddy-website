---
title: "App Store Agreements Status Meanings and Next Steps"
description: "Decode all 12 Paid Apps Agreement statuses, identify who can act, and troubleshoot signing, information, legal-entity, and review blockers."
pubDate: 2026-11-10
---

**A Paid Apps Agreement status tells you whether the contract is effective, waiting on your team, or under Apple review.** Start in **Business → Agreements** and read the exact label. **New** or **New Agreement** puts the next step with the Account Holder. **User Info** means someone must complete the requested information. **Processing** and **Verifying** mean Apple is reviewing information already supplied. An unqualified **Active** means the agreement is effective and no agreement action is needed.

Don't treat the remaining labels as the same problem. Apple's current [agreement status reference](https://developer.apple.com/help/app-store-connect/manage-agreements/view-agreements-status/) defines 12 Paid Apps Agreement statuses. Two qualified **Active** statuses still require follow-up. The table below maps each label to its owner and safest next action.

## All 12 App Store agreement statuses at a glance

| Status | What Apple says it means | Who acts next | Practical next step |
| --- | --- | --- | --- |
| **New** | The agreement hasn't been signed. | Account Holder | Open the agreement, review it, and sign if the terms are acceptable. |
| **Pending User Info** | It was signed but isn't in effect because required information is incomplete. | Account Holder, Admin, or Finance, depending on the request | Open the row and complete only the information Apple requests. |
| **Processing** | All information was provided and Apple is reviewing the agreement. | Apple | Record the submission date and wait for a result or another request. |
| **Verifying** | Apple is reviewing additional legal-entity information. | Apple | Keep the request and response together, then monitor for Apple's result. |
| **Active** | The agreement is in effect. | No agreement action indicated | Record the check and retry the blocked workflow. If it still fails, diagnose another layer. |
| **Active (Pending User)** | The agreement is effective, but required information is incomplete. | Account Holder, Admin, or Finance, depending on the request | Open the agreement, identify the missing item, and assign it. Don't describe the agreement as inactive. |
| **Active (New Agreement Available)** | The current agreement is active and a newer version is available. | Account Holder | Review and accept the latest agreement. Apple says new apps and In-App Purchases can't be created until the latest version is accepted. |
| **Pending (New Legal Entity)** | A legal-entity change requires a new contract using the updated entity. | Account Holder | Wait for the entity update to finish if necessary, then sign the new contract. |
| **Pending (Update Legal Entity)** | A legal-entity change requires new banking and/or tax forms. | Account Holder, Admin, or Finance | Supply the requested forms. An Account Holder may also need to approve banking changes initiated by Admin or Finance. |
| **Pending (New Agreement Available)** | A newer version of the pending agreement is available. | Account Holder | Review and accept the new version rather than trying to finish the superseded one. |
| **Expired** | The agreement has expired. | Account Holder | Open the agreement and follow the displayed recovery path. If membership was renewed after expiring, select **Renew Agreement**. |
| **Disabled** | The agreement is disabled. Apple says your app is removed until required information is supplied and accepted. | The eligible role shown for the request, then Apple | Capture the request, provide the required information, and wait for Apple to accept it. The linked status page gives no restoration timeframe. |

Apple lets Account Holder, Admin, and Finance users view agreement status and enter banking or tax information, but only the **Account Holder can sign legal agreements**. If a control is missing, check Apple's [role permissions](https://developer.apple.com/help/app-store-connect/reference/account-management/role-permissions/).

## First decide whether your team or Apple owns the next move

Use the wording in the status instead of guessing from its color:

```text
Does the status mention New Agreement or New Legal Entity?
→ The Account Holder reviews and signs when the updated contract is available.

Does it mention User Info or Update Legal Entity?
→ Open the agreement, identify the exact missing item, and assign it.

Is it Processing or Verifying?
→ Apple is reviewing submitted information; preserve evidence and monitor.

Is the exact status Active, with no qualifier?
→ The contract is effective; investigate the app, product, submission, or payment layer.

Is it Expired or Disabled?
→ Open the agreement immediately and follow the displayed recovery request.
```

This keeps you from asking Finance to sign an agreement only the Account Holder can sign—or changing unrelated information while Apple reviews it.

## Fix New and new-agreement statuses

For **New**, **Active (New Agreement Available)**, and **Pending (New Agreement Available)**, the Account Holder must take the next step.

Apple's [sign-and-update instructions](https://developer.apple.com/help/app-store-connect/manage-agreements/sign-and-update-agreements/) distinguish three paths:

1. **View and Agree to Terms** for a new Paid Apps Agreement.
2. **Renew Agreement** when membership was renewed after it expired.
3. **View and Agree to Terms** when a newer agreement is available.

Don't accept an agreement just to unblock a release; review it first. Apple says acceptance can't be undone. With **Active (New Agreement Available)**, the current agreement remains effective, but Apple specifically blocks creating a new app or In-App Purchase until the latest Paid Apps Agreement is accepted.

If the **New App** control is unavailable and App Store Connect shows a new-agreement alert or status, resolve that account-level gate before debugging browser state or rebuilding anything. Once it's resolved, return to the [App Store Connect app record guide](/blog/app-store-connect-app-record/).

## Resolve Pending User Info without guessing the missing field

A signed agreement with **Pending User Info** isn't yet effective. By contrast, **Active (Pending User)** remains effective even though information is missing. Don't report an effective agreement as inactive, but don't ignore the outstanding request either.

Open the agreement row and note exactly what App Store Connect requests. Depending on the account, that may involve banking, tax, or other information shown there. Apple does not define either status as “always a banking problem” or “always a tax problem.”

For financial setup, follow this sequence:

1. The Account Holder signs the Paid Apps Agreement.
2. An Account Holder, Admin, or Finance user supplies the applicable tax and banking information. All required tax forms must be submitted before Apple can process the banking information.
3. The Account Holder approves a new or replacement bank account, or an IBAN change, when Admin or Finance initiated it.

Apple's [banking instructions](https://developer.apple.com/help/app-store-connect/manage-banking-information/enter-banking-information/) say a banking change is processed within 24 hours after Account Holder approval. If the change is rejected or isn't approved within 30 days, the bank account details aren't updated. These timeframes apply to that banking approval workflow, not to every agreement status.

Keep sensitive values in App Store Connect and approved financial records. In the release tracker, record only the status, owner, requested category, submission date, and next check. Leave out bank account numbers, tax IDs, identity documents, and contract copies.

## Handle Processing and Verifying as review states

While **Processing** means Apple is reviewing the supplied information, **Verifying** is narrower: Apple is reviewing additional information about the legal entity tied to the agreement.

Apple's agreement-status page gives no processing timeframe for either status. Avoid inventing an SLA or using the unrelated 24-hour figure from the bank-change approval flow.

Instead, create a review receipt:

```text
Agreement:
Exact status:
Legal entity shown:
Information requested:
Submitted by / at:
Apple case or message:
Affected releases or products:
Next check:
```

If Apple asks for more information, respond through the specified channel. If the status remains unchanged and blocks necessary work, contact Apple with the receipt. A note that says only “Still Processing” gives Apple little to investigate; the agreement name, legal entity, submission date, exact blocker, and case history make the escalation actionable.

## Treat legal-entity statuses as an account migration

**Pending (New Legal Entity)** and **Pending (Update Legal Entity)** are account-level migration states, not release-metadata problems.

To change a legal-entity name or address, Apple says to contact it first and may request business documents. After approval, changes can take up to two weeks to appear in App Store Connect. Some updates may generate a new Paid Apps Agreement.

Use this sequence:

1. Confirm the legal entity Apple approved.
2. Wait for the updated entity to appear in Business when instructed.
3. Have the Account Holder sign a new contract if the status requires one.
4. Submit new banking and/or tax forms when requested.
5. Obtain Account Holder approval for applicable banking changes.
6. Reopen Business → Agreements and verify the resulting status.
7. Recheck every release or commerce task that was paused.

Don't copy legal or financial documents into ordinary project notes. Record where the authoritative case is held and who owns the next action. This article explains Apple's workflow. It can't tell you which legal entity to choose or how to complete tax forms; get qualified legal or tax advice for those decisions.

## Recover from Expired or Disabled

For **Expired**, Apple defines only the state: the agreement has expired. Its signing guide documents one specific recovery path: if the developer membership was renewed after it expired, the Account Holder must select **Renew Agreement**. Don't assume every Expired status has that cause. Open the row and use the action Apple presents.

With **Disabled**, preserve the exact request before changing anything. Apple's status reference says the app is removed from the App Store until the required information is provided and accepted. The page gives no acceptance or restoration timeframe. Submit what Apple requests, retain the case history, and verify the affected app's public listing after Apple accepts the information.

If a release remains blocked after the agreement becomes Active, look elsewhere for the blocker. Check the app record, submission, product, pricing, availability, or payment state instead of reopening the agreement. The broader [App Store Connect troubleshooting guide](/blog/app-store-connect-help/) can help locate that next layer.

## Map one account status across the app portfolio

Agreements are account-level, but their effects appear in individual app workflows. Apple says a pending latest agreement blocks new app and In-App Purchase creation. An inactive Paid Apps Agreement blocks paid-app and In-App Purchase submissions or updates. A **Disabled** agreement can remove an app.

Use a short impact table. This example is illustrative. The observed App Store Connect control or message remains the evidence:

| App or product | Intended action | Observed blocker | Agreement status | Owner | Proof of recovery |
| --- | --- | --- | --- | --- | --- |
| Focus Timer | Create first paid app | New App unavailable | Active (New Agreement Available) | Account Holder | Latest agreement accepted; New App opens |
| Habit Notes | Submit subscription update | Paid setup incomplete | Pending User Info | Finance, then Account Holder if prompted | Requested forms complete; agreement state rechecked |
| Weather Card | Ship free update | No agreement error observed | Processing | Apple | Verify whether App Store Connect permits this specific update |

The final row shows why each workflow needs to be tested. Don't assume every release is blocked, but don't dismiss the status either. Record the actual blocked action for each app.

In LaunchBuddy, keep the impact table on the planning side: create a task for each affected release, assign the next check, and use a submission checklist after recovery.

App Store Connect remains authoritative for agreement status and requested information. Use LaunchBuddy for the planning record, not agreement operations: its verified scope doesn't include viewing or signing agreements, submitting banking or tax information, changing legal entities, or controlling Apple's review.

Release planning, taskboards, an app portfolio, and default App Store submission checklists are available on the Free plan. Free is limited to two apps, two releases, and limited project notes. Pro makes all three unlimited and adds custom checklists. Neither plan changes Apple's agreement permissions. For the full Apple-versus-planning boundary, see [LaunchBuddy vs App Store Connect](/blog/launchbuddy-vs-app-store-connect/).

## Close the incident with evidence

Don't close the task when someone says, “I accepted it.” Verify:

- the exact agreement now shows the expected status;
- any newer agreement alert is gone;
- the previously blocked action is available;
- the affected app or product still has the intended pricing and availability;
- if a **Disabled** agreement removed an app, its listing has been restored;
- no banking approval or tax request remains outstanding;
- each paused release has a documented next step.

The status points you toward the problem. Evidence that the blocked workflow works again proves it's resolved.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy and keep each agreement follow-up attached to the release it affects</a>.
