---
title: "App Store Connect API Key: How to Create and Use One Safely"
description: "Learn how to create an App Store Connect API key, find your Key ID and Issuer ID, choose the right role, protect the .p8 file, and fix common setup errors."
pubDate: 2026-07-10
---

An **App Store Connect API key** lets a trusted tool or automation access App Store Connect without using your Apple Account password. It is the standard way to connect release tools, CI services, analytics dashboards, metadata scripts, and AI-assisted workflows to your apps.

Creating a key only takes a few minutes, but three decisions matter: whether to use a team or individual key, which role to assign, and how to protect the private `.p8` file Apple gives you.

This guide walks through the complete setup and explains what the Key ID, Issuer ID, and private key are used for.

## What is an App Store Connect API key?

An App Store Connect API key is a credential used to authorize requests to the App Store Connect API. Instead of sending the key itself with every request, your tool uses the private key to sign a short-lived JSON Web Token, or JWT. That token is then sent to Apple as proof that the request is authorized.

An API key setup usually consists of:

- **Key ID:** Identifies the API key you created
- **Issuer ID:** Identifies your App Store Connect team when using a team key
- **Private key:** A `.p8` file used to sign authentication tokens
- **Role:** Controls what the key is allowed to do

The key can support workflows such as:

- Reading app and version information
- Checking build processing and TestFlight status
- Reading customer reviews
- Downloading sales and analytics reports
- Updating App Store metadata
- Uploading release notes
- Managing beta testers and groups
- Automating parts of an App Store submission

The exact actions available depend on the key type, assigned role, and API endpoint.

## Team API key vs. individual API key

Apple offers two types of App Store Connect API keys.

### Team API key

A team key belongs to the App Store Connect team rather than one person. Its access is based on the role selected when the key is created.

Team keys can access all apps in the account. Apple does not currently let you restrict a team key to one specific app, so the role should be no broader than the integration requires.

You need an Admin account in App Store Connect to generate a team key.

### Individual API key

An individual key is tied to a specific App Store Connect user. It inherits that user's roles and app access, making it useful when the integration should only see the apps assigned to that person.

Individual keys have some limitations. Apple states that they cannot use Provisioning endpoints, access Sales and Finance, or use `notaryTool`. The user's team Admin must also grant permission to generate individual API keys before the option appears.

Use a team key when a shared release service needs stable team-level access. Use an individual key when you want access to follow a person's existing app permissions.

## How to create an App Store Connect API key

The steps differ slightly for team and individual keys.

### Create a team API key

1. Sign in to [App Store Connect](https://appstoreconnect.apple.com/).
2. Open **Users and Access**.
3. Select the **Integrations** tab.
4. Choose **App Store Connect API** in the sidebar.
5. Open the **Team Keys** tab.
6. Click **Generate API Key** or the plus button.
7. Enter a descriptive name, such as `LaunchBuddy` or `Release CI`.
8. Select the role required by the integration.
9. Click **Generate**.

The new key appears with its name, Key ID, role, and download link.

If you cannot see the option, check that your App Store Connect account has the Admin role. Creating team API keys is separate from simply having access to apps.

### Create an individual API key

1. Sign in to App Store Connect.
2. Open your user profile.
3. Scroll to **Individual API Key**.
4. Click **Generate API Key**.
5. Download the key when it appears.

If the button is missing, ask a team Admin to grant you the **Generate Individual API Keys** permission.

## Download the .p8 private key immediately

After creating the key, click **Download API Key** to save the private key. The filename normally looks similar to:

```text
AuthKey_AB12C3DE45.p8
```

Apple lets you download this file only once and does not keep a copy that you can retrieve later. Store it securely as soon as it is downloaded.

If the file is lost, you cannot download it again. Revoke the old key, create a replacement, update every service that uses it, and then test the connection.

Treat the `.p8` file like a password:

- Do not commit it to Git
- Do not place it in a public repository
- Do not include it in an app bundle or client-side website
- Do not paste it into support tickets, screenshots, or chat messages
- Do not send it over unencrypted channels
- Store it in a password manager, secret manager, or secure credential store

If you suspect the private key has been exposed, revoke it in App Store Connect immediately.

## Where to find the Key ID and Issuer ID

Most integrations ask for three values: the private key, Key ID, and Issuer ID.

### Key ID

The **Key ID** appears in the API key list next to the key you generated. It is also commonly included in the `.p8` filename.

The Key ID tells Apple which public key should be used to verify the JWT signed by your private key. It is an identifier, not a secret, but it should still be stored with the rest of the integration configuration.

### Issuer ID

For team keys, the **Issuer ID** appears on the App Store Connect API page above or near the list of team keys. It identifies the team that issued the key.

Copy the value exactly, including hyphens. Do not use your Team ID, Apple ID, bundle ID, or vendor number in its place; they identify different things.

Individual API keys use a different token format and do not use the team Issuer ID in the same way. Confirm that the tool you are connecting supports individual keys before choosing one.

### Private key

The private key is the complete content of the downloaded `.p8` file, including the `BEGIN PRIVATE KEY` and `END PRIVATE KEY` lines. Some tools ask you to select the file, while others provide a secure field where you paste its contents.

Never remove line breaks unless the integration specifically instructs you to encode the value for an environment variable.

## Which App Store Connect API role should you choose?

Choose the lowest-privilege role that supports the workflow. A key used only to read app information should not automatically receive broad administrative access.

The correct role depends on the endpoints and actions a tool uses:

- A reporting integration may need access to sales or finance data.
- A metadata tool may need permission to edit app information.
- A release tool may need to read versions, builds, reviews, and analytics or upload release notes.
- A user-management automation may require Admin access, which carries much greater risk.

Do not select Admin only because it is more likely to make an integration work. Admin keys have broad permissions, including sensitive team-management actions.

If setup fails with an authorization error, check the integration's documentation for its required role. Create a dedicated key with the appropriate role instead of expanding an unrelated production key.

## How authentication works

The `.p8` file is not normally sent directly to the App Store Connect API. Your tool uses it to sign a JWT with the ES256 algorithm.

For a team key, the token typically contains:

- `kid`: The Key ID in the JWT header
- `iss`: The Issuer ID
- `iat`: The token creation time
- `exp`: The expiration time
- `aud`: `appstoreconnect-v1`

Apple generally requires these tokens to expire within 20 minutes. The signed token is sent with API requests as a bearer token:

```text
Authorization: Bearer YOUR_SIGNED_JWT
```

Most apps and CI services generate these tokens automatically. You normally provide the Key ID, Issuer ID, and `.p8` private key once, then the integration creates fresh tokens when needed.

If you are building your own integration, read Apple's current documentation for [creating API keys](https://developer.apple.com/documentation/appstoreconnectapi/creating-api-keys-for-app-store-connect-api) and [generating tokens](https://developer.apple.com/documentation/appstoreconnectapi/generating-tokens-for-api-requests). Do not hard-code a long-lived token; generate short-lived JWTs from credentials stored in a secret manager.

## How to connect an API key to LaunchBuddy

LaunchBuddy uses App Store Connect integration to bring release work closer to the project and version you are preparing. Depending on the available features, that can include reviews, analytics, and release note uploads without repeatedly switching to the App Store Connect website.

The connection requires the API key details created in App Store Connect. Use a dedicated key with the role required by the integration, then enter the Key ID, Issuer ID, and private key through LaunchBuddy's App Store Connect setup.

After connecting:

1. Confirm that the expected apps appear.
2. Verify that reviews and analytics load.
3. Test a low-risk read operation before uploading or changing data.
4. Keep the key name documented so you know which integration uses it.
5. Revoke the key if you stop using the integration.

The App Store Connect API is most useful when its data stays connected to release tasks, checklists, metadata, and launch decisions. For a broader process, read the [App Store Connect API workflow](/blog/app-store-connect-api-workflow/) and [App Store Connect release checklist](/blog/app-store-connect-release-checklist/).

## Common App Store Connect API key errors

### "Authentication credentials are missing or invalid"

This usually means the JWT could not be verified. Check that:

- The Key ID matches the downloaded private key
- The Issuer ID belongs to the correct team
- The full `.p8` content was provided
- The token uses ES256
- The audience is `appstoreconnect-v1`
- The token has not expired
- The system clock generating the token is accurate

### "Forbidden" or "The resource does not exist"

Authentication may have succeeded, but the key may not have permission to access the requested resource. Check the assigned role, app access, team, and endpoint.

Apple sometimes avoids revealing whether an inaccessible resource exists, so a permission problem can look like a missing-resource error.

### The download link is missing

The private key was probably already downloaded. Apple only provides the `.p8` file once. Search your secure downloads or credential storage first. If it is gone, revoke the key and create a new one.

### The API key option is missing

For team keys, confirm that your account has the Admin role. For individual keys, confirm that a team Admin granted permission to generate individual API keys.

### The integration can see the wrong apps

Verify that you used credentials for the correct App Store Connect team. Remember that team keys can access all apps in their team, while individual keys follow the associated user's app access.

### The token works briefly and then fails

That is expected if an integration reuses a JWT instead of generating a new one. App Store Connect tokens are short-lived. Fix the token-generation process rather than increasing the lifetime beyond Apple's allowed limit.

## App Store Connect API key security checklist

Before using a key in production, check the following:

```text
- The key has a descriptive integration-specific name
- The least-privileged suitable role is assigned
- The .p8 file is stored in a secure credential store
- The private key is excluded from Git and backups you do not control
- Production and development credentials are separated when practical
- The integration has been tested with a read-only action first
- Team members know which service uses the key
- Unused and replaced keys are revoked
- A process exists for rotating a compromised key
```

Also review credentials when a team member leaves, a vendor relationship ends, or an integration is retired. API keys are easy to forget because they keep working without an interactive login.

## Frequently asked questions

### Is an App Store Connect API key free?

Apple does not charge a separate fee to generate an App Store Connect API key. You need access to an App Store Connect account and the permissions required to create the chosen key type.

### Can I download an App Store Connect API key twice?

No. Apple makes the `.p8` private key available for download one time. If it is lost, revoke the key and generate a new one.

### Can one API key access multiple apps?

A team API key can access all apps in its App Store Connect team, subject to its role. It cannot be restricted to a single app. An individual key follows the app access and permissions of its associated user.

### Is the Key ID secret?

The Key ID and Issuer ID are identifiers rather than private signing material. The `.p8` private key is the sensitive credential. Keep all three values organized, but protect the private key most carefully.

### Can I use the same key for Fastlane, CI, and another app?

It may work, but separate keys are safer and easier to audit. A dedicated key lets you revoke one integration without interrupting every other workflow.

### What should I do if my .p8 file is committed to Git?

Revoke the key immediately, even if you delete the file in a later commit. The private key may still exist in Git history, caches, forks, or logs. Create a replacement key and update the affected integration.

## Create the key, then build a safer release workflow

An App Store Connect API key removes the need to share an Apple Account password and gives release tools a supported way to work with App Store Connect. The important parts are straightforward: choose the right key type, assign the smallest suitable role, download the `.p8` file once, and protect it like any other production secret.

Once connected, start with read access. Confirm the correct team and apps, then add write actions only when the workflow is understood and reviewed. That approach gives you the convenience of App Store Connect automation without giving a new integration more authority than it needs.

If you want API data, release tasks, App Store reviews, analytics, and release notes in one workflow, <a href="https://apple.co/3iFcjjW">download LaunchBuddy on the App Store</a>.
