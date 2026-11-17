---
title: "App Store Connect Roles and Permissions: A Practical Guide"
description: "Understand every App Store Connect role, choose least-privilege access, restrict users to the right apps, and audit release permissions safely."
pubDate: 2026-11-17
---

**App Store Connect roles and permissions** control two separate things: what a person can do and which apps they can do it to. Apple provides eight roles: Account Holder, Admin, Finance, App Manager, Developer, Marketing, Sales, and Customer Support. Some users can be limited to selected apps, while account-wide roles and certain extra permissions remove that boundary.

For most teams, the right setup isn't “give everyone Developer” or “use Admin so nothing breaks.” Start with the work the person owns, assign the narrowest matching role, limit app access where Apple allows it, and add reporting or certificate access only when the job truly requires it.

## The three layers of App Store Connect access

A role name alone doesn't describe a user's effective access. Treat each account as a three-part permission record:

```text
Effective access = role(s) + app scope + additional resources
```

1. **Role:** Defines available sections and actions. A user can hold more than one role.
2. **App scope:** Limits eligible roles to all apps or a selected set.
3. **Additional resources:** Access to reports or Certificates, Identifiers & Profiles can broaden visibility beyond the selected apps.

This model catches a common audit mistake. A user may have a seemingly narrow role and access to one app, but a separate reporting or certificate permission can make all app information visible.

Apple's live [role-permissions reference](https://developer.apple.com/help/app-store-connect/reference/account-management/role-permissions/) is the final authority for individual actions. Use the role summaries below to choose a candidate, then confirm the exact row for the task before inviting someone.

## What each App Store Connect role is for

| Role | Best fit | Important boundary |
| --- | --- | --- |
| **Account Holder** | Legal agreements, membership, and final account ownership | One person holds this role. Apple reserves actions such as signing legal agreements and renewing membership for it. |
| **Admin** | Account-wide administration and broad operational backup | Admins see all apps; their app access can't be narrowed to a selected set. |
| **Finance** | Payments, tax information, financial reports, sales, and analytics | Finance users see all apps in the relevant reporting areas and can't be app-limited. |
| **App Manager** | Running the commercial and release lifecycle for assigned apps | Can be limited to selected apps unless broader resource access is added. |
| **Developer** | Builds, development, and delivery work for assigned apps | Doesn't inherit every metadata, pricing, agreement, or user-management action. |
| **Marketing** | Store metadata, promotional artwork, featuring, and promo work | Can be app-limited; it isn't a substitute for release or financial authority. |
| **Sales** | Sales, download, and app-analytics analysis | Can be app-limited only when Access to Reports isn't granted. |
| **Customer Support** | Viewing and responding to App Store reviews | Can be restricted to the apps whose customer queue the person owns. |

These are responsibility boundaries, not job titles. A founder who codes may need Account Holder and Developer capabilities. A release owner may need App Manager plus a separate reporting permission. Assign the operations, not the person's seniority.

### Account Holder

The Account Holder is the person responsible for the Apple Developer Program membership. Apple says this is the only role that can sign legal agreements, renew membership, request App Store Connect API access, and perform several other account-level actions.

Keep this account recoverable and current. A release can stall even when every build is ready if an updated agreement is waiting for the Account Holder.

### Admin

Admin is the broad operational administrator. It has access to all apps and can manage roles other than Account Holder. On an organization team, Admin also receives Certificates, Identifiers & Profiles access by default.

That breadth makes Admin useful for a trusted backup, but a poor default for contractors, support staff, or an integration that needs only one workflow. Don't use Admin as the first response to a missing control.

### Finance

Finance handles financial information, including payments, tax forms, Sales and Trends, and financial reporting. Apple gives this role account-wide app visibility in those areas.

Separate financial work from routine release work. Someone who prepares screenshots or uploads builds doesn't need Finance merely to see whether an app exists.

### App Manager

App Manager is the closest role to an app-level release owner. Apple describes it as managing app pricing, App Store information, development, and delivery for accessible apps. Its scope can be limited to selected apps.

This role is a sensible candidate when a person owns an app's complete release in App Store Connect, but still verify the exact permission involved. Account-level agreements, broad financial administration, and some developer-resource actions remain separate.

For a new listing, pair the role decision with the identity and scope checks in the [App Store Connect app record guide](/blog/app-store-connect-app-record/).

### Developer

Developer is centered on app development and delivery. It fits people who upload and manage builds or work in TestFlight without owning pricing, financial, or legal decisions.

“Developer” sounds broad because it matches the person's profession. In App Store Connect it is a defined permission set, not shorthand for every action an engineer might perform. If a developer also owns store metadata or a submission, compare those exact actions with Apple's matrix instead of assuming the title covers them.

### Marketing

Marketing manages promotional artwork and marketing material. Apple also documents metadata and promo-code capabilities for the role, and may contact Marketing users if an app is considered for featuring.

Use it for the apps that person actually markets. It shouldn't be expanded into build, finance, or account administration just to avoid a handoff.

### Sales

Sales is for analyzing sales, downloads, and app analytics. It can be limited to selected apps when the user doesn't also have Access to Reports.

That final condition matters. Granting report access changes the visibility model, so record whether the person needs interactive analytics for assigned apps, downloadable reports across the account, or both.

### Customer Support

Customer Support can view and respond to reviews for accessible apps. If this is the user's only role, Apple says their app work is focused on Ratings and Reviews.

This is often safer than giving a support contractor App Manager. The support person can operate the review queue without receiving unrelated release authority. Use the [App Store review management workflow](/blog/app-store-review-management/) to separate a public reply from the product task that follows it.

## Which role should you assign?

Choose from the task outward. This decision table is a starting point, not a substitute for Apple's action-by-action matrix.

| Work to be done | Start by evaluating | Check before granting |
| --- | --- | --- |
| Sign agreements or renew membership | Account Holder | Whether the task is explicitly reserved for the Account Holder |
| Administer the whole account or edit roles | Admin | Whether an app-scoped handoff would avoid account-wide access |
| Manage tax, banking, payments, or financial reports | Finance | Whether the person needs every financial area and all-app visibility |
| Own metadata, pricing, and release operations for an app | App Manager | Exact submission action and selected-app scope |
| Upload builds or manage development delivery | Developer | TestFlight, certificate, and submission responsibilities |
| Maintain listing copy and promotional material | Marketing | Whether the person also needs release authority |
| Analyze sales and app performance | Sales | Whether Access to Reports is required and will broaden visibility |
| Triage and answer customer reviews | Customer Support | Which apps and storefront queues the person owns |

When one person owns two genuinely different workflows, multiple narrow roles can be clearer than one broad role. Document the reason for each role separately so it can be removed when that responsibility ends.

## App access: Full Access isn't the only choice

Apple's [app-access instructions](https://developer.apple.com/help/app-store-connect/manage-your-team/edit-access-to-apps/) let App Manager, Developer, Marketing, Customer Support, and Sales users without Access to Reports be restricted to selected apps. In **Users and Access**, open the user, choose **Manage Apps**, and select only the records they need.

App restrictions don't apply in these cases:

- The user is Account Holder, Admin, or Finance.
- The user has Access to Reports.
- The user has access to Certificates, Identifiers & Profiles.

Apple notes that Certificates, Identifiers & Profiles is account-wide rather than app-limited. Don't describe selected-app access as complete isolation if either extra resource is enabled.

A practical access receipt looks like this:

```text
Person:
Owned workflow:
Role(s):
Apps:
Access to Reports: Yes | No
Certificates, Identifiers & Profiles: Yes | No
Granted by:
Review trigger: Project end | responsibility change | quarterly audit
```

The receipt records why the access exists. A screenshot of the role picker only records what existed at one moment.

## A least-privilege onboarding workflow

### 1. Write the workflow before choosing the role

List concrete verbs: upload builds, edit screenshots, answer reviews, inspect analytics, download financial reports, or manage users. “Help with releases” is too vague to authorize safely.

### 2. Separate Apple systems

App Store Connect roles, Apple Developer Program resources, Xcode signing, and access inside your own app aren't interchangeable. Decide whether the person needs App Store Connect only or also Certificates, Identifiers & Profiles.

Apple makes another distinction based on enrollment. Its [Developer Program roles guide](https://developer.apple.com/help/account/access/roles/) says invited members of an organization join the development team and receive membership resources according to their access. With an individual enrollment, additional users get App Store Connect access only; they don't become Apple Developer Program team members.

### 3. Assign roles and apps

An Account Holder, Admin, or App Manager can invite a user. Apple's [add-and-edit-users instructions](https://developer.apple.com/help/app-store-connect/manage-your-team/add-and-edit-users/) say Admin and Finance can't be app-limited; app-scoped roles proceed to an app-selection step when broader report access isn't present.

Choose the smallest app set that lets the person complete the written workflow. Invitations expire after three days, so send them when the recipient can activate the account.

### 4. Test with a real, low-risk task

Ask the new user to complete one representative read and, if required, one reversible edit. Check both sides:

- Can they complete the intended work?
- Can they see or change anything outside the intended boundary?

Don't immediately promote the user to Admin after a failure. Identify whether the missing piece is the role, app assignment, report access, certificate access, or an agreement state.

### 5. Record an owner and review trigger

Every account should have an internal owner who can explain why it exists. Review access when a project ends, a vendor changes, a teammate changes responsibilities, or an account-wide permission is added.

## Offboarding without leaving a release gap

Offboarding is more than deleting a person on their last day:

1. Inventory the apps, roles, reports, certificates, API keys, and active release tasks they owned.
2. Transfer operational ownership before removing access.
3. Revoke or rotate credentials used by that person or their tools.
4. Delete the user or remove roles and app access.
5. Recheck the affected workflow from another authorized account.

Apple says deleting a user can take up to ten minutes to fully revoke access because of caching. Treat the deletion as initiated, not instantly verified, and check again after that window.

## App Store Connect permissions for LaunchBuddy

LaunchBuddy doesn't create Apple users, assign Apple roles, or override App Store Connect permissions. It is a companion for project and release management; Apple remains the source of truth for account access, builds, metadata, and submissions.

LaunchBuddy's App Store Connect features require **LaunchBuddy Pro** and **App Store Connect API credentials**. The verified feature set includes:

- Reading and replying to customer reviews
- Viewing selected download, revenue, and subscription analytics
- Uploading approved release notes
- Turning review feedback into a backlog task

Those workflows are available in LaunchBuddy on iPhone, iPad, and Mac. They don't include binary building, signing, or upload.

Before connecting a key, use this permission preflight:

1. List the LaunchBuddy operations you intend to use.
2. Create a dedicated API key rather than reusing an unrelated production key when practical.
3. Select the least-privileged role that supports those operations; don't assume Admin is required just because an authorization check fails.
4. Confirm the correct team and expected apps with a read operation.
5. Test each intended write, then verify the result in App Store Connect.
6. Record the key owner and a revocation plan.

LaunchBuddy's documented requirements don't specify one universal minimum Apple role for every App Store Connect feature, so this guide won't invent one. Confirm the role during setup against the operations you enable and Apple's current matrix. The [App Store Connect API key guide](/blog/app-store-connect-api-key/) explains team and individual keys, one-time `.p8` downloads, and common authorization failures.

Core LaunchBuddy release tasks and default submission checklists don't require an App Store Connect connection. App Store Connect features do require Pro; the free plan still supports two apps, two releases, iCloud sync, and default checklists.

## Audit permissions before the next release

Run this check before a major release and whenever responsibilities change:

- Every person has a named workflow owner.
- Each role maps to a concrete task.
- App-scoped users can see only the intended apps.
- Access to Reports is justified separately.
- Certificates, Identifiers & Profiles access is justified separately.
- No integration has a broader key role than its documented operations need.
- The Account Holder account is current and reachable.
- Former teammates and retired vendors have been removed.
- Release handoffs still work after the changes.

Attach the audit to your [App Store Connect release checklist](/blog/app-store-connect-release-checklist/) instead of relying on an annual cleanup. Permissions become risky when they drift quietly, not merely when they begin broad.

Choose access from the work outward: role, app scope, then extra resources. That produces a permission model your team can explain, test, and reverse without granting account-wide control by default.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy on the App Store</a>
