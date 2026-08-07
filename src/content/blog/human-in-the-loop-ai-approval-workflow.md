---
title: "How to Build a Human-in-the-Loop AI Approval Workflow"
description: "Build a human-in-the-loop AI approval workflow that separates observation, proposals, decisions, execution, and verification without creating approval fatigue."
pubDate: 2026-08-07
---

A **human-in-the-loop AI approval workflow** lets AI prepare useful work while a person keeps authority over consequential actions. The practical pattern is:

```text
Read → Draft → Propose → Review → Approve or reject → Apply → Verify
```

The approval gate belongs before the system changes data, publishes content, sends a message, or triggers another side effect. A proposal is not a completed action, and approval is not proof that execution succeeded. Keeping those states separate is the foundation of a reliable workflow.

The steps below show how to design that boundary, test both approval outcomes, and verify the eventual result. An indie iOS release provides the worked example, followed by LaunchBuddy's implementation across AI, Shortcut, and MCP write actions.

## What human-in-the-loop approval actually means

Human-in-the-loop is not a label for any workflow where a person eventually looks at AI output. The person needs a meaningful decision point before the relevant side effect.

Three similar processes have different controls:

| Process | Human decision | Main limitation |
| --- | --- | --- |
| AI drafts, person copies the result manually | The person decides whether to use the draft | The surrounding app does not enforce the decision |
| AI acts, person audits afterward | The person can respond after the change | Review cannot prevent the original action |
| AI proposes, system waits for approval | The person approves or rejects before execution | The gate is effective only if the proposal is specific and reviewable |

The third pattern is an approval workflow. It turns review from advice into a state transition.

That doesn't mean every model output needs approval. A private summary and a public customer reply have different consequences. The goal is to gate actions according to what they can change, not to add a confirmation dialog to every AI interaction.

This risk-based approach matches the [NIST AI Risk Management Framework Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/), which calls for defined roles and responsibilities in human-AI configurations and for human-oversight processes to be defined, assessed, and documented. NIST also notes that configurations can range from fully manual to fully autonomous. There isn't a single gate that fits every use case.

## Step 1: Classify each AI action by consequence

List the actions in the workflow before deciding where approval belongs. Use four categories:

1. **Read:** Retrieve data without changing it.
2. **Draft:** Generate content or a plan that remains private and editable.
3. **Propose:** Package a requested change for review without applying it.
4. **Execute:** Change stored data, publish content, contact someone, or invoke another system.

For an app release, the list might look like this:

| Action | Category | Approval before action? |
| --- | --- | --- |
| Read incomplete release tasks | Read | Usually no |
| Summarize completed work | Draft | Usually no |
| Draft App Store release notes | Draft | Review before publication, not necessarily before drafting |
| Propose marking a release task complete | Propose | No change should occur yet |
| Apply the task update | Execute | Yes |
| Send a public App Store review reply | Execute | Yes |
| Upload or submit an app binary | Execute | Use the controls of the separate build and distribution system |

The qualifier matters. Reading sensitive data can still require access controls even when it doesn't need per-request approval. Approval is only one part of a security design.

Write the rule in terms of side effects:

```text
No approval required:
- read authorized context
- create a private, editable draft

Approval required:
- change project or release data
- publish user-facing text
- send a message or reply
- write to an external system

Not allowed:
- actions outside the tool's documented capabilities
- actions the reviewer cannot understand from the available context
```

This keeps the model from deciding whether its own action is risky. The workflow defines the boundary first.

## Step 2: Build a reviewable proposal

A vague “Allow AI action?” prompt doesn't support informed review. The proposal should make the pending change understandable without forcing the reviewer to reconstruct the conversation.

For each proposal, preserve:

- **Target:** the exact app, release, task, document, account, or external record
- **Current state:** the relevant value observed before the proposal
- **Requested change:** the smallest complete description of what will change
- **Source:** the facts or instruction that led to the proposal
- **Consequence:** whether the change is private, public, reversible, or external
- **Decision:** approve or reject, without treating a timeout as consent

Here is a compact proposal record:

```text
Target: Trail Notes / release 2.3 / task "Verify onboarding events"
Observed state: Incomplete
Requested change: Mark the task complete
Evidence: Test run reference supplied by the developer
Not included: Release-status change, changelog update, App Store action
Decision: Approve or reject
```

The “not included” line is useful. It exposes scope creep before approval. If a request to complete one task also changes the release status, split it into separate proposals.

NIST's [human-AI interaction guidance](https://airc.nist.gov/airmf-resources/airmf/appendices/app-c-ai-risk-management-and-human-ai-interaction/) stresses that human roles in decision-making and oversight should be clearly defined. In a solo workflow, one person may be requester, reviewer, and operator, but the states should still be distinct. You are reviewing a specific proposed action, not endorsing every conclusion the model produced.

## Step 3: Make approval a real pause

The execution path must stop while the proposal is pending. If work continues and the system merely asks for confirmation later, the gate is an audit notification, not approval.

A useful state model is:

```text
drafted
  ↓
pending approval
  ├─→ rejected
  └─→ approved
        ↓
      applying
        ├─→ failed
        └─→ applied
              ↓
            verified
```

These labels prevent several misleading shortcuts:

- **Pending** does not mean approved.
- **Approved** does not mean applied.
- **Applied** does not mean correct.
- **Rejected** is a valid end state, not an error that should trigger automatic retries.

If the underlying data can change during review, recheck the relevant precondition before applying the approved action. A proposal based on an incomplete task may be stale if someone already completed, renamed, or moved that task.

## Step 4: Give the reviewer useful choices

At minimum, provide **approve** and **reject**. Do not make approval visually dominant or describe rejection as a failure.

When a proposal is close but wrong, two safe patterns are available:

1. Reject it and request a new, narrower proposal.
2. Edit the draft before submitting a separate final action, when the product supports an editable artifact.

Don't silently reinterpret rejection as “try again until accepted.” A rejected proposal should stop. Any replacement needs a new rationale and, if it still causes a side effect, a new decision.

The review itself should answer four questions:

1. Is the target unambiguous?
2. Does the current state match what I know?
3. Is the requested change limited to what I intended?
4. Can I verify the result afterward?

If any answer is no, reject or defer the proposal. Approval should not be used to fill missing context with optimism.

## Step 5: Verify after execution

Post-action verification closes a gap that approval alone cannot cover. The action may fail, hit the wrong version, or return success before another system displays the update.

Choose a verification method before approval:

- Re-read the changed record through a supported read operation.
- Open the authoritative screen and inspect the final value.
- For public text, view the published result rather than relying on the draft.
- For external systems, check the external source of truth.

Record the outcome in plain language:

```text
Observed: Task was incomplete.
Proposed: Mark task complete.
Decision: Approved.
Execution: Tool reported that the action was applied.
Verified: Task now appears complete in release 2.3.
```

When verification isn't available, say so. “Approved, not independently verified” is more accurate than “done.”

## A worked AI release-note workflow

Consider an AI assistant preparing “What's New” copy for an iOS update.

### Read

Collect the named release, completed user-facing tasks, confirmed fixes, and explicit exclusions. Do not infer features from branch names or unfinished backlog items.

### Draft

Generate private copy from that source material. At this point, no App Store field has changed.

### Propose

Present the exact release-note text, target app and version, and the external destination. Flag claims such as “faster” or “more reliable” when the evidence does not support them.

### Review

Compare every sentence with the selected build and release scope. Remove internal implementation details and unsupported outcomes.

### Approve or reject

Approve only the final text for the intended version. Rejecting the draft should not publish an earlier version or create a new draft automatically.

### Apply

Send the approved text through the documented App Store Connect workflow. This step is separate from building, signing, uploading, or submitting the binary.

### Verify

Open the version in App Store Connect and confirm that the correct field contains the approved text. The [AI release-notes workflow](/blog/ai-release-notes-for-ios-apps/) covers the writing checks in more detail.

This example adds two gates where they matter: factual human review before publication and verification in the external source of truth afterward. It doesn't require approval for each private draft.

## How LaunchBuddy uses approval-gated actions

LaunchBuddy separates read access from write proposals across its supported automation surfaces:

- LaunchBuddy AI pauses before supported actions change local data or write to App Store Connect.
- Shortcut and Siri read actions are available without Pro, while write actions require Pro and use the approval flow.
- The macOS-only local MCP server provides read tools without Pro. Its write tools require Pro and create proposals before changes are applied.
- Pending AI, Shortcut, and MCP changes share an automation approval queue. Viewing approval status is free; creating write-action proposals requires Pro.

Supported AI actions include creating a release, creating or updating tasks, changing release status, drafting or updating a changelog, pushing approved release notes, sending an approved review reply, and creating ideas, experiments, or feedback. These are defined capabilities, not permission for autonomous writes.

The App Store Connect features involved in reviews, analytics, release-note uploads, and AI review replies require LaunchBuddy Pro and App Store Connect API credentials. LaunchBuddy doesn't build, sign, upload, or submit app binaries. Use Xcode, Transporter, Fastlane, or CI for that work, and treat App Store Connect as the authoritative Apple record.

The [LaunchBuddy MCP server guide](/blog/launchbuddy-mcp-server/) covers its localhost and bearer-token boundaries. The [iOS Shortcuts guide](/blog/ios-shortcuts-for-app-developers/) shows the equivalent read-first pattern on Apple devices.

## Common approval-workflow failures

### Treating a proposal as completed work

Tool acceptance only establishes that a proposal entered the workflow. Keep “proposed,” “approved,” “applied,” and “verified” in status messages.

### Asking a person to approve hidden scope

If the reviewer cannot see the target and requested change, the UI transfers responsibility without transferring enough information to make a decision.

### Approving every low-risk output

Too many prompts encourage reflexive approval. Gate side effects and sensitive decisions, while leaving authorized reads and private drafts outside the per-action queue when appropriate.

### Skipping the rejection path

Test rejection before relying on approval. Confirm that underlying data remains unchanged and that the system does not retry until it gets a yes.

### Forgetting stale state

A correct proposal can become wrong while waiting. Recheck relevant state immediately before execution when concurrent changes are possible.

### Assuming human review removes AI risk

People can miss errors, defer to confident wording, or lack necessary context. NIST notes that human-AI interaction can produce varying results and that people need clear roles. A gate improves control only when the reviewer has evidence, authority, and a usable decision.

## Test the workflow before trusting it

Run one low-impact action through every branch:

```text
- A read returns the intended target.
- A draft does not change stored or external data.
- A proposal shows the target, current state, and requested change.
- Pending work cannot execute.
- Rejection leaves the target unchanged.
- Approval applies only the displayed scope.
- A failed execution is not labeled complete.
- Verification reads from the authoritative destination.
- Status language distinguishes proposed, approved, applied, and verified.
```

For tool-based AI systems, the official [MCP tools specification](https://modelcontextprotocol.io/specification/2025-11-25/server/tools) recommends a human in the loop who can deny tool invocations, confirmation prompts for operations, visible tool inputs, and audit logging. Those controls reinforce the same principle: a reviewer needs to know what the system is about to do before allowing it.

If you want approval-gated AI, Shortcut, and MCP changes connected to your iOS release plan, <a href="https://apple.co/3iFcjjW">download LaunchBuddy on the App Store</a> and start with one read-first workflow.
