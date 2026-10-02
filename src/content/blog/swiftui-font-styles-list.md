---
title: "SwiftUI Font Styles List: A Semantic Type Reference"
description: "Use this complete SwiftUI font styles list to choose semantic text roles, handle the visionOS-only styles, preserve Dynamic Type, and test your layout."
pubDate: 2026-10-02
---

SwiftUI has **11 standard semantic font styles for iOS**: `.largeTitle`, `.title`, `.title2`, `.title3`, `.headline`, `.subheadline`, `.body`, `.callout`, `.footnote`, `.caption`, and `.caption2`. SwiftUI also defines `.extraLargeTitle` and `.extraLargeTitle2` for visionOS.

For most text, start with a semantic style instead of a fixed point size:

```swift
Text("Sync complete")
    .font(.body)
```

Apple defines [`Font.TextStyle`](https://developer.apple.com/documentation/swiftui/font/textstyle) as a dynamic text style. The style gives the text a role, lets the system preserve hierarchy, and participates in Dynamic Type. It isn't merely a named font size.

## Complete SwiftUI font styles list

The “starting role” column is a practical selection guide, not a rule that overrides the surrounding interface or platform conventions.

| SwiftUI style | Good starting role | Example |
| --- | --- | --- |
| `.largeTitle` | The most prominent title in a screen or major section | `.font(.largeTitle)` |
| `.title` | First-level title below the largest heading | `.font(.title)` |
| `.title2` | Second-level title | `.font(.title2)` |
| `.title3` | Third-level title | `.font(.title3)` |
| `.headline` | Emphasized heading or primary label near body content | `.font(.headline)` |
| `.subheadline` | Secondary heading or supporting label | `.font(.subheadline)` |
| `.body` | Primary reading text and ordinary content | `.font(.body)` |
| `.callout` | Short supporting or attention-worthy text | `.font(.callout)` |
| `.footnote` | Supplementary details, qualifications, or notes | `.font(.footnote)` |
| `.caption` | Captions and compact supporting labels | `.font(.caption)` |
| `.caption2` | A second, less prominent caption level | `.font(.caption2)` |

These names describe hierarchy, not a guaranteed number of points. The rendered font depends on the platform, environment, and the person's text-size setting. A point-size chart can be useful for inspecting one configuration, but it shouldn't become a hard-coded replacement for the semantic styles.

### The two visionOS-only styles

Apple's current SwiftUI documentation also lists:

| SwiftUI style | Platform | Intended hierarchy |
| --- | --- | --- |
| `.extraLargeTitle` | visionOS 1.0+ | Extra-large title |
| `.extraLargeTitle2` | visionOS 1.0+ | Second-level extra-large title |

Don't add these cases to shared iOS or macOS source without isolating the visionOS code:

```swift
#if os(visionOS)
Text("Immersive workspace")
    .font(.extraLargeTitle)
#endif
```

The `Font.TextStyle` type itself is available on multiple Apple platforms, which can make an unqualified list look as though every case is cross-platform. The availability belongs to each case. For an iOS-only app, the working list remains the 11 standard styles in the first table.

## Choose a style by job, not by appearance

A useful type hierarchy begins with the content's function:

1. **Name the role.** Is this the screen title, a section heading, primary content, or supporting metadata?
2. **Choose the nearest semantic style.** Use `.body` for ordinary reading, for example, rather than selecting a size that happens to look similar.
3. **Preview the whole hierarchy.** A title is meaningful only in relation to the headings and content around it.
4. **Add weight or design only when it improves that role.** Don't make every level bold to manufacture hierarchy.
5. **Test at larger text sizes before adjusting.** A style that looks quiet at the default setting may become dominant when space is constrained.

This avoids a common mistake: treating the list as a ladder where every item must be used once. A compact settings screen might need `.title2`, `.headline`, `.body`, and `.footnote` but no `.largeTitle`. Repeating fewer roles consistently is clearer than filling every available level.

### A small selection map

Use this map when two styles seem plausible:

```text
Screen identity or major destination
└─ largeTitle, title, title2, or title3

Section or row emphasis near ordinary content
└─ headline or subheadline

Primary readable content
└─ body

Short supporting message
└─ callout

Qualification, metadata, or compact label
└─ footnote, caption, or caption2
```

The difference between `.headline` and `.body`, for instance, is semantic emphasis. Don't switch to `.headline` just to solve a spacing problem; fix the layout instead.

## Apply a style in SwiftUI

The shortest form uses a standard `Font` value:

```swift
VStack(alignment: .leading, spacing: 8) {
    Text("Release 2.4")
        .font(.title2)

    Text("Ready for final verification")
        .font(.headline)

    Text("Check the upgrade path and App Store metadata before submitting.")
        .font(.body)

    Text("Updated 10 minutes ago")
        .font(.caption)
}
```

When you need a system design or weight, use Apple's current [`system(_:design:weight:)`](https://developer.apple.com/documentation/swiftui/font/system(_:design:weight:)) overload and keep the semantic style:

```swift
Text("Release 2.4")
    .font(.system(.title2, design: .rounded, weight: .semibold))
```

This is different from `.system(size:)`, which specifies a size but doesn't express whether the text is a title, body, or caption. Prefer the semantic overload when the content has one of those roles.

## Keep custom fonts tied to Dynamic Type

A custom typeface doesn't require abandoning semantic scaling. Apple's [custom-font guidance](https://developer.apple.com/documentation/swiftui/applying-custom-fonts-to-text) documents the `relativeTo` parameter:

```swift
Text("Account summary")
    .font(.custom("ExampleSans-Regular", size: 17, relativeTo: .body))
```

Here, `17` is the custom font's starting size and `.body` supplies the scaling reference. Use the font's actual PostScript name and make sure its license permits app distribution.

The reference style should match the text's job. Scaling a screen title relative to `.caption` or tiny metadata relative to `.largeTitle` can distort the hierarchy as the text-size setting changes.

Related dimensions may need to scale too. Apple recommends `@ScaledMetric` for values such as meaningful image dimensions or custom spacing:

```swift
struct StatusRow: View {
    @ScaledMetric(relativeTo: .body) private var rowSpacing: CGFloat = 8

    var body: some View {
        HStack(spacing: rowSpacing) {
            Image(systemName: "checkmark.circle.fill")
            Text("Upload complete")
                .font(.body)
        }
    }
}
```

Scaling every decorative value can consume space without helping comprehension. Apple's [Dynamic Type guidance](https://developer.apple.com/videos/play/wwdc2024/10074/) recommends prioritizing essential content and adapting the layout when larger text needs more room.

## Preview all 11 styles together

This reference view makes hierarchy changes visible in one Xcode preview:

```swift
import SwiftUI

struct FontStylesReference: View {
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 12) {
                Text(".largeTitle").font(.largeTitle)
                Text(".title").font(.title)
                Text(".title2").font(.title2)
                Text(".title3").font(.title3)
                Text(".headline").font(.headline)
                Text(".subheadline").font(.subheadline)
                Text(".body").font(.body)
                Text(".callout").font(.callout)
                Text(".footnote").font(.footnote)
                Text(".caption").font(.caption)
                Text(".caption2").font(.caption2)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding()
        }
    }
}

#Preview("Default") {
    FontStylesReference()
}

#Preview("Accessibility 3") {
    FontStylesReference()
        .environment(\.dynamicTypeSize, .accessibility3)
}
```

The sample is a reference, not a suggested hierarchy for one screen. Real content should use only the roles it needs.

## Test the hierarchy, not just the font

Apple's WWDC Dynamic Type walkthrough recommends Xcode's Dynamic Type preview variants for finding truncation and fixed-container clipping. Run that check with representative content, then cover these cases:

- the default text size and at least one accessibility size;
- the longest supported localization, not only short English placeholders;
- narrow and wide layouts on every supported device family;
- multiline headings, validation errors, and data-loaded states;
- buttons, rows, and custom controls with fixed frames;
- layouts that may need to change from horizontal to vertical;
- VoiceOver order after text wraps or the layout changes.

Passing a preview doesn't establish that the complete task supports Larger Text. Test the actual interaction on a device or simulator, and include typography changes in the evidence matrix described by the [Accessibility Nutrition Labels checklist](/blog/app-store-accessibility-nutrition-labels-checklist/).

For release work, attach the typography check to the version that changed the interface. That keeps the result with the relevant build instead of leaving it as an undated design note; the [iOS release management guide](/blog/ios-app-release-management/) shows how to keep checks version-specific.

## Use the LaunchBuddy menu-bar list as a lookup

LaunchBuddy Pro includes a dedicated SwiftUI font list in the macOS menu bar. It is a quick reference while you're coding; it doesn't inspect your views, edit source code, choose a hierarchy, or test Dynamic Type.

The boundary is useful:

```text
LaunchBuddy menu bar: recall the available SwiftUI style names
Xcode: implement, preview, and test the interface
Your design review: decide whether the hierarchy communicates clearly
```

The font list is macOS-only and requires Pro. The broader [LaunchBuddy Free vs Pro comparison](/blog/launchbuddy-free-vs-pro/) covers current plan pricing and limits.

If you want the SwiftUI font-style reference one click away while working on your Mac, <a href="https://apple.co/3iFcjjW">download LaunchBuddy and try the Pro menu-bar font list</a>.
