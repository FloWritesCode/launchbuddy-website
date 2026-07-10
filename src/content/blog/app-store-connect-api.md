---
title: "App Store Connect API: A Practical Guide for iOS Developers"
description: Learn how the App Store Connect API works, how to create an API key and JWT, which endpoints matter, and how to automate your iOS release workflow.
pubDate: 2026-07-10
---

The App Store Connect API lets you manage apps, builds, TestFlight testers, metadata, subscriptions, customer reviews, reports, and more without clicking through the App Store Connect website.

For an indie iOS developer, that can mean fewer repetitive checks and less manual release work. A script can tell you when a build is ready, a CI job can distribute it to TestFlight, and a release tool can pull reviews or upload release notes. The API does not replace App Store Connect, but it makes App Store Connect data available wherever you already work.

This guide explains what the App Store Connect API covers, how authentication works, how to make your first request, and where automation provides the most value.

## What is the App Store Connect API?

The App Store Connect API is Apple's REST API for automating tasks you would otherwise perform in App Store Connect. Requests use standard HTTPS methods, and responses follow the JSON:API format.

The base URL is:

```text
https://api.appstoreconnect.apple.com
```

Most resources are available below a versioned path such as `/v1/apps`, `/v1/builds`, or `/v1/customerReviews`.

The API covers several parts of the app lifecycle:

- Apps, App Store versions, localizations, and metadata
- Builds and build processing state
- TestFlight builds, groups, testers, and beta review
- In-app purchases and auto-renewable subscriptions
- Customer reviews and developer responses
- App Analytics, sales, and financial reports
- App Clips and Game Center
- Xcode Cloud workflows and builds
- Users and team access
- Bundle IDs, certificates, devices, and provisioning profiles
- App Store webhooks

Not every key can access every resource. The endpoints available to you depend on whether you use a team or individual API key, the role assigned to that key, and any app-level access restrictions.

Apple maintains the complete list in the [App Store Connect API documentation](https://developer.apple.com/documentation/appstoreconnectapi).

## When should you use the App Store Connect API?

Use the API when a task is repetitive, depends on App Store Connect state, or needs to connect with another system.

Common use cases include:

- Checking whether a newly uploaded build has finished processing
- Listing builds available for a specific app version
- Adding testers to TestFlight groups
- Updating localized "What's New" text
- Reading customer reviews and posting approved responses
- Downloading sales or financial reports
- Pulling analytics into a private dashboard
- Starting or inspecting an Xcode Cloud build
- Notifying another tool when an app version changes state
- Validating release data before App Review submission

The API is less useful when you only ship occasionally and every action still needs a visual check. Screenshots, App Privacy answers, pricing changes, and final submission decisions often benefit from human review even when an endpoint is available.

A good rule is to automate status checks and drafts first. Add write operations only after the workflow is predictable.

## How App Store Connect API authentication works

The App Store Connect API does not use your Apple ID and password. Each request needs a short-lived JSON Web Token, or JWT, signed with an App Store Connect API private key.

You need three values:

- **Issuer ID:** Identifies your App Store Connect team
- **Key ID:** Identifies the API key
- **Private key:** The `.p8` file used to sign the JWT

The JWT header uses your Key ID and the ES256 signing algorithm. Its payload includes the Issuer ID, issue time, expiration time, and the `appstoreconnect-v1` audience.

For most requests, Apple rejects tokens with a lifetime longer than 20 minutes. Generate tokens only when needed and keep their lifetime as short as practical. You can also include an optional scope claim to restrict a token to specific operations.

### Team keys and individual keys

Apple supports two relevant key types:

- **Team API keys** can work across the organization, subject to their assigned role and app access.
- **Individual API keys** inherit the access and permissions of the associated user.

Individual keys have additional limitations. For example, Apple states that they cannot use provisioning endpoints, access Sales and Finance, or use `notarytool`.

For a solo developer, an individual key may be enough for a focused integration. For CI or a shared release system, a dedicated team key with narrowly selected permissions is usually easier to manage. In either case, apply the least privilege required for the task.

## How to create an App Store Connect API key

The exact options you see depend on your App Store Connect role and team permissions.

To create a team key:

1. Sign in to [App Store Connect](https://appstoreconnect.apple.com/).
2. Open **Users and Access**.
3. Open the **Integrations** section and select **App Store Connect API**.
4. Generate a new key.
5. Give the key a descriptive name.
6. Select the lowest role that supports the intended workflow.
7. Download the private `.p8` key.
8. Record the Issuer ID and Key ID.

An individual key is generated from your user profile if a team Admin has granted permission to create one.

Apple lets you download the private key only once and does not keep a copy. Store it in a password manager or secrets service immediately. Never commit it to Git, paste it into source code, or include it in an app bundle.

If a private key is lost or exposed, revoke it in App Store Connect and create a replacement.

## Make your first App Store Connect API request

After generating a valid JWT, test the connection by listing the apps your key can access:

```bash
curl --request GET \
  --url "https://api.appstoreconnect.apple.com/v1/apps?limit=10" \
  --header "Authorization: Bearer $ASC_JWT"
```

A successful response contains a `data` array:

```json
{
  "data": [
    {
      "type": "apps",
      "id": "1234567890",
      "attributes": {
        "name": "Example App",
        "bundleId": "com.example.app",
        "sku": "EXAMPLE"
      }
    }
  ]
}
```

Save the app's opaque API resource ID. Many later requests use it to filter builds, versions, reviews, and reports.

For example, this request lists App Store versions related to one app:

```bash
curl --request GET \
  --url "https://api.appstoreconnect.apple.com/v1/apps/1234567890/appStoreVersions" \
  --header "Authorization: Bearer $ASC_JWT"
```

Treat these examples as a connection test, not a token-generation solution. In production, create JWTs in trusted server-side code, CI secret storage, or a tool that manages App Store Connect credentials securely.

## Understand the JSON:API response format

App Store Connect responses are consistent, but they can feel unfamiliar if you expect a flat JSON object.

A typical response contains:

- `data`: The requested resources
- `attributes`: Values that belong directly to each resource
- `relationships`: Links to related resources
- `links`: URLs for the current or related request
- `included`: Related resources requested with the `include` parameter
- `meta`: Additional information such as pagination totals
- `errors`: Structured error details when a request fails

Resource IDs are not always the values you see in the App Store Connect interface. Fetch and store the API IDs instead of assuming an app's bundle ID, SKU, version string, or build number can be used in every path.

Use query parameters to reduce extra requests:

- `filter[...]` narrows results.
- `fields[...]` returns only selected fields.
- `include` returns supported related resources.
- `limit` controls page size.
- `sort` orders results on endpoints that support it.

Follow pagination links rather than assuming the first response contains every record.

## App Store Connect API endpoints that matter most

The API is large. Most indie developers can start with a small group of resources.

### Apps and App Store versions

App and version resources provide the backbone of a release integration. They let you find an app, inspect its App Store versions, read version state, and navigate to localizations, builds, and submission details.

This is useful for answering:

- Which version is being prepared?
- Is the version editable?
- Which build is attached?
- Is the version waiting for review, in review, approved, or live?
- Are required localized fields complete?

### Builds and TestFlight

Build and TestFlight resources help automate beta distribution and release-candidate checks. You can inspect builds, manage beta groups and testers, update beta details, submit builds for external beta review, and notify testers when a build is available.

The API can tell you that a build exists and has processed. Your release plan still needs to explain whether it is the correct build and whether feedback has been resolved.

For a structured beta process, read [TestFlight release management](/blog/testflight-release-management/).

### Metadata and localizations

Version localizations contain fields such as the description, keywords, promotional text, and "What's New" copy. API access makes it possible to keep localized metadata in source control, validate fields, and publish approved updates across several locales.

Metadata automation needs guardrails. Check character limits, localization quality, and every product claim before writing changes to App Store Connect. A script can update the wrong locale just as efficiently as the right one.

See the [App Store metadata management guide](/blog/app-store-metadata-management/) for a safer field-by-field workflow.

### Customer reviews and responses

Customer review resources let you retrieve App Store reviews and manage developer responses. This can support a shared inbox, issue triage, sentiment analysis, or a workflow that turns recurring complaints into backlog tasks.

Public responses should still be reviewed. Do not automatically publish an AI-generated reply that promises a fix, discusses private account details, or misunderstands the review.

LaunchBuddy uses App Store Connect integration to bring reviews into a release-management workflow, draft replies with app context, and turn feedback into tasks.

### Analytics, sales, and financial reports

The API can provide App Analytics reports as well as sales and financial data. These resources are useful for private dashboards, launch comparisons, subscription tracking, and post-release analysis.

Report APIs do not all behave like ordinary list endpoints. Some involve report requests, generated instances, downloadable segments, or compressed files. Individual API keys also cannot access Sales and Finance. Check the documentation for the specific report before designing the integration.

### In-app purchases and subscriptions

The API includes resources for managing in-app purchases and auto-renewable subscriptions. These endpoints can help teams keep product configuration consistent across apps and storefronts.

Pricing and subscription changes have direct business impact. Use explicit review and approval steps before applying them.

### Webhooks

Webhooks let App Store Connect notify your server about supported events instead of requiring constant polling. Apple supports events including app version state changes and TestFlight feedback events.

Your webhook endpoint should verify requests, handle duplicate delivery safely, and record enough information to connect an event to the correct app and release. A webhook is a signal that something changed, not proof that the release is ready.

Read [App Store Connect webhooks](/blog/app-store-connect-webhooks/) for a practical event-driven workflow.

## Common App Store Connect API errors

Most integration problems fall into a few categories.

### 401 Unauthorized

The JWT is missing, expired, signed incorrectly, or contains invalid claims.

Check:

- The token uses ES256.
- The `kid` header matches the private key.
- The `iss` claim matches the Issuer ID.
- The `aud` claim is `appstoreconnect-v1`.
- The server clock is accurate.
- The token lifetime is accepted for the endpoint.

### 403 Forbidden

The token is valid, but the key does not have permission to perform the operation. Review the key's role, app access, and key type. Do not solve every 403 by granting Admin access.

### 404 Not Found

The resource ID may be wrong, the resource may not be visible to the key, or the relationship may not exist in the expected state. Confirm that you are using the API resource ID rather than a bundle ID or version string.

### 409 Conflict

The requested change conflicts with the current resource state. App Store versions and submissions move through state machines, so an operation that worked during preparation may be invalid after submission.

### 429 Too Many Requests

The key has exceeded an API rate limit. Apple includes an `X-Rate-Limit` header with the hourly limit and remaining request count. Limits apply on a rolling-hour basis and can vary.

Throttle polling, cache stable data, watch the response headers, and retry later with backoff instead of sending the same request immediately.

## App Store Connect API security best practices

An App Store Connect API private key can change public app information and, depending on its role, access sensitive business data. Treat it like a production credential.

Use this checklist:

- Create separate keys for separate services.
- Assign the lowest practical role and restrict app access.
- Store `.p8` files in a secrets manager or protected keychain.
- Generate short-lived JWTs on a trusted machine or server.
- Never ship the private key inside an iOS, macOS, or web client.
- Do not log private keys or complete bearer tokens.
- Rotate keys and revoke keys that are unused or exposed.
- Keep read and write operations separate when possible.
- Require confirmation for submissions, pricing, subscriptions, and public copy.
- Record which automation made each write.

Do not proxy an unrestricted API key through a public endpoint. If a client app needs selected App Store Connect data, expose only the minimum data and actions through your own authenticated backend.

## API, command-line tool, Fastlane, or release manager?

You do not always need to call the REST API directly.

- **Use the API directly** when you need a custom integration or unsupported workflow.
- **Use Fastlane** when the work belongs in an established build, metadata, signing, or delivery pipeline.
- **Use a command-line client** when you want convenient terminal access without maintaining authentication and request code.
- **Use CI** when an action should run predictably after a build, tag, or merge.
- **Use a release manager** when the harder problem is connecting App Store Connect state to tasks, feedback, copy, checklists, and decisions.

These options can work together. CI can build and upload. Fastlane or an API client can perform specific App Store Connect actions. LaunchBuddy can organize the release context around those actions.

## A safe first App Store Connect API workflow

Start with a small read-only integration:

```text
1. Create a narrowly scoped API key.
2. List the apps available to the key.
3. Select the app by its API resource ID.
4. Read the current App Store version.
5. Read recent builds and processing state.
6. Compare the result with the release checklist.
7. Report what is ready, blocked, or missing.
```

Once that is reliable, add low-risk writes such as uploading approved release notes. Keep final review, submission, pricing, privacy, and release timing behind explicit confirmation.

For a broader system that connects builds, TestFlight feedback, metadata, and release tasks, see the [App Store Connect API workflow guide](/blog/app-store-connect-api-workflow/) and the [App Store Connect release checklist](/blog/app-store-connect-release-checklist/).

## How LaunchBuddy uses App Store Connect

LaunchBuddy is a release manager for indie iOS developers on iPhone, iPad, and Mac. Its App Store Connect integration helps bring API data into the place where release decisions already live.

With LaunchBuddy Pro, you can:

- Read and reply to App Store reviews
- Turn low-star feedback into backlog tasks
- View downloads, revenue, and subscription metrics
- Upload release notes to App Store Connect
- Keep tasks, versions, and reusable submission checklists together
- Draft release notes and review responses with AI

App Store Connect remains the source of truth for Apple's app records. LaunchBuddy provides the planning and release context around them, so an API status or review becomes a clear next action instead of another disconnected data point.

## Start with one useful request

The App Store Connect API can automate a large part of the app lifecycle, but the best integration usually begins with one repeated question.

Maybe you want to know whether a build is ready. Maybe you want customer reviews beside your backlog. Maybe you need approved release notes uploaded without another round of copying and pasting.

Create a narrowly scoped key, make one read-only request, and build from there. Keep credentials server-side, observe rate limits, and add human approval before high-impact writes. That gives you the speed of automation without losing control of the release.

<a href="https://apple.co/3iFcjjW">Download LaunchBuddy on the App Store</a>
