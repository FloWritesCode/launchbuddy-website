---
title: "iPhone Duo App Update Checklist for Indie Developers (Xcode 27.1)"
description: "What changes when iPhone Duo ships on October 23, how to build and test with Xcode 27.1, and a copy-paste checklist for layouts, vertical bars, the fold, and Duo screenshots."
pubDate: 2026-10-19
---

To get your app ready for iPhone Duo, build it with Xcode 27.1 and the iOS 27.1 SDK. Replace screen-size, orientation, and idiom checks with size classes and view geometry, use system bars with an icon and a title for every toolbar item, keep custom UI out of the fold and camera areas, and test every pose in Device Hub before you submit.

Every existing app runs on iPhone Duo, but only apps built with the iOS 27.1 SDK use the full inner display. Duo screenshots become a submission requirement in April 2027.

## What changes on October 23

iPhone Duo goes on sale on Friday, October 23. Apple opened App Store Connect submissions for Duo-optimized apps on October 5 ([Apple Developer News](https://developer.apple.com/news/?id=kkphp5qo)). The SDK you build with decides how your app appears on the inner display:

| Built with | How the app appears on the inner display |
| --- | --- |
| iOS 26 SDK or earlier | Runs centered, with empty space around it |
| iOS 27 SDK | Fills most of the display, but stops short of the status bar edge |
| iOS 27.1 SDK | Uses the full display, and toolbars and tab bars can move into a vertical bar |

There's no separate opt-in switch. As soon as you build with the iOS 27.1 SDK, your bars can become vertical, so don't recompile and submit without testing.

## 1. Build with Xcode 27.1

Install Xcode 27.1, which requires macOS Tahoe 26.6 or later ([Xcode 27.1 release notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-27_1-release-notes)). Choose iPhone Duo as the run destination and the app opens in Device Hub, where you can open, close, rotate, and fold the simulated device.

Two known issues are worth expecting:

- The first simulator launch can take several minutes. It isn't stuck.
- Most app extensions can't run or be debugged in the Duo simulator, so test widgets and other extensions on a real device.

Xcode 27.1 also ships an agent skill for this job, called App Resizability. Ask the coding assistant to "get my app ready for iPhone Duo" and it scans the project, explains each issue, and suggests a fix. If you work in another agent, export Apple's skills with `xcrun agent skills export`. Apple says the skill finds most issues but not all of them, so treat the rest of this checklist as your manual pass.

## 2. Replace screen, orientation, and idiom checks with size classes

Folding or unfolding resizes your app mid-session, and the app's size doesn't always match the screen. Search the project for these patterns:

- **`UIScreen.main`.** Read the size from the view, the window, `GeometryReader`, or `onGeometryChange`, and the scale from the trait collection. Apple's guidance is to replace every use.
- **Size read once.** Re-run size-dependent layout whenever the size changes, not only at launch or in `viewIsAppearing`.
- **Orientation checks.** On Duo, the device's orientation doesn't tell you the shape of your app. Compare its width and height instead.
- **Idiom checks.** The inner display has regular width and height, so "regular width" no longer means iPad. Use size classes rather than `userInterfaceIdiom`.
- **Hardcoded sizes.** A check like `bounds.height == 844` won't match any Duo layout.
- **Mirrored safe areas.** Vertical bars can sit on either side, so handle each inset on its own instead of copying the left inset to the right.

The scale replacement is usually the quickest fix:

```swift
// Before
let screenScale = UIScreen.main.scale

// After (UIKit)
let screenScale = traitCollection.displayScale

// After (SwiftUI)
@Environment(\.displayScale) private var displayScale
```

## 3. Get vertical toolbars and tab bars right

On the closed outer display, and on the inner display in landscape, navigation bars, toolbars, and tab bars move to the side. The system handles this for you as long as you follow its rules:

- **Use system bars.** Put `.toolbar` inside a `NavigationStack` or `NavigationSplitView`, or add toolbar items to a view controller inside a navigation controller. Custom bars don't move.
- **Give every item an icon and a title.** Vertical bars show icons, and the overflow menu shows both. An item with a title but no icon isn't presented vertically at all.
- **Order items deliberately.** Back or Close goes first, followed by prominent actions such as Done.
- **Decide what overflows first.** Set priorities with `visibilityPriority(_:)`, and move actions from your own "more" menu into the system overflow menu with `ToolbarOverflowMenu`.

```swift
.toolbar {
    ToolbarItem(placement: .cancellationAction) {
        Button("Close", systemImage: "xmark") { dismiss() }
    }
    ToolbarItem(placement: .topBarPinnedTrailing) {
        Button("Done", systemImage: "checkmark") { save() }
    }
}
```

You can opt a screen out with `toolbarVerticalBehavior(_:)`, but Apple's [design guidance](https://developer.apple.com/design/human-interface-guidelines/designing-for-iphone-duo) is to keep the default placement in general. Save the opt-out for immersive screens that don't need bars, and apply it consistently. Bars that flip between horizontal and vertical on similar screens make people relearn where actions live.

## 4. Keep content clear of the fold and cameras

Alerts, context menus, and sheets move away from the fold automatically. On the inner display, centered and leading sheets get a horizontal toolbar, while trailing sheets get a vertical one. Use `presentationPlacement(_:)` to choose, and check each sheet in every pose.

Custom UI needs your attention. iOS represents the fold and the front cameras as reserved regions, and custom views should stay out of them (`ReservedRegion` in SwiftUI and UIKit). For a screen that is really two related panes, such as an editor and an inspector, `ArrangementView` handles the fold for you. Apple also recommends an even number of columns in grid layouts so content divides cleanly at the fold.

Duo also brings Split View multitasking to iPhone. Each app places its controls along its outer edge, so the app on the left has its bar on the left. Test your app on both sides.

## 5. Test every pose in Device Hub

Before submitting, work through this matrix in Device Hub and note anything clipped, overlapping, or misplaced:

| Pose | What to check |
| --- | --- |
| Closed, portrait | Vertical bars, toolbar order, overflow menu |
| Closed, landscape | Safe areas on both sides |
| Open, portrait | Full-display layout, fold and camera areas, grid columns |
| Open, landscape | Vertical bars on the inner display, sheets |
| Folding while in use | Layout updates after the size change, no lost state |
| Split View, left and right | Controls on the outer edge, no overlap with the other app |

Once you have a Duo build in TestFlight, the [TestFlight test examples guide](/blog/testflight-what-to-test-examples/) shows how to turn a matrix like this into tasks for external testers.

## 6. Add Duo screenshots before April 2027

Apple's [screenshot specifications](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/) add two iPhone Duo sizes:

- **Outer display:** 1398 × 2034 px, or 2034 × 1398 px in landscape
- **Inner display:** 2007 × 2853 px, or 2853 × 2007 px in landscape

Apple's announcement says that "starting April 2027, any apps or games submitted will need to include screenshots for iPhone Duo." The specifications page is narrower: it says screenshots will be required for any app using the iOS 27.1 SDK or later. Either way, assume your spring updates are affected. Apple hasn't published the exact date or said whether both sizes will be mandatory, so check the page again before you release.

There's also a reason not to wait. When you submit Duo screenshots, your product page shows a badge saying the app is optimized for iPhone Duo. App Store Connect has a preview tool that shows your product page on Duo, and its new Asset Library lets you upload screenshots ahead of time. For every other device size, see the [App Store screenshot requirements](/blog/app-store-screenshot-requirements/).

## 7. Tell people the app is ready

A Duo-optimized update is a good reason to talk about your app:

- Mention Duo support plainly in the release notes, and describe what changed for the user rather than listing APIs. The [AI release notes guide](/blog/ai-release-notes-for-ios-apps/) has a workflow for drafting them.
- Consider an In-App Event for the update if you have something new to show on the bigger display.
- Submit a [featuring nomination](/blog/app-store-featuring-nomination/). Apple's Duo guide suggests using the Helpful Details section to say the app is optimized for iPhone Duo, including support for all device poses. Only claim that once you've tested every pose.

## Copy-paste iPhone Duo checklist

Before October 23:

```text
[ ] Install Xcode 27.1 and run "get my app ready for iPhone Duo"
[ ] Replace every UIScreen.main reference
[ ] Remove orientation, idiom, and hardcoded size checks
[ ] Handle asymmetric safe areas
[ ] Use system bars with an icon and a title for every toolbar item
[ ] Check every sheet in every pose
[ ] Keep custom UI out of the fold and camera areas
[ ] Test Split View on both sides and every pose in Device Hub
[ ] Test widgets and extensions on a real device
[ ] Build with the iOS 27.1 SDK and submit
[ ] Mention Duo support in the release notes
```

Before April 2027:

```text
[ ] Add Duo screenshots (outer 1398 × 2034, inner 2007 × 2853)
[ ] Preview the product page on Duo in App Store Connect
[ ] Re-check the exact screenshot deadline once Apple announces it
```

## Further reading

- [Preparing your app for iPhone Duo](https://developer.apple.com/documentation/technologyoverviews/preparing-your-app-for-iphone-duo), Apple's developer documentation
- [Designing for iPhone Duo](https://developer.apple.com/design/human-interface-guidelines/designing-for-iphone-duo), the Human Interface Guidelines chapter
- [Three steps to make your app shine on iPhone Duo](https://developer.apple.com/iphone-duo/prepare/), Apple's overview
- [The free iPhone Duo agent skill](https://github.com/FloWritesCode/fwc-swiftui-skills), which works alongside Apple's own skill in Cursor, Claude Code, or Codex

## Track your Duo update in LaunchBuddy

LaunchBuddy can hold the Duo update as a release, with each checklist item as a task and your project notes alongside it. The April screenshot work can sit in a later release. Release planning, taskboards, and the default App Store submission checklists are on the Free plan, within its limit of two apps and two releases. Custom reusable checklists require Pro.

LaunchBuddy doesn't build, test, or submit your app, and it doesn't check whether your layouts work on Duo. Xcode, Device Hub, and App Store Connect remain the sources of truth.

Paste the checklist above into your next release and <a href="https://apple.co/3iFcjjW">plan your iPhone Duo update in LaunchBuddy</a>.
