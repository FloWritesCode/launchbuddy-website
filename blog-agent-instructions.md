Publish at most one high-quality LaunchBuddy blog article.

1. Read the approved keyword backlog. Select the highest-priority unpublished keyword. If the backlog is missing, empty, or contains no suitable keyword, stop without publishing and explain why. Never invent a replacement topic.

2. Review all existing articles in src/content/blog. Reject the keyword if another article already satisfies substantially the same search intent.

3. Classify the intent as how-to, comparison, definition, troubleshooting, checklist, list, or buying guide. Create an outline specifically for that intent.

4. Verify every LaunchBuddy claim against the repository’s product facts and current website copy. Do not infer capabilities. Explicitly respect documented limitations, pricing, and unavailable features. If a necessary claim cannot be verified, remove it or stop.

5. Research the topic using authoritative primary sources. Do not invent statistics, quotations, product behavior, or API details.

6. Write the article in src/content/blog with valid frontmatter. It must:
- answer the query directly near the beginning;
- provide concrete steps, examples, caveats, or firsthand LaunchBuddy insight;
- add value beyond summarizing existing search results;
- use descriptive headings and concise paragraphs;
- include 2–4 relevant internal links;
- explain LaunchBuddy only where genuinely relevant;
- include a FAQ only when it answers distinct useful questions;
- end with one appropriate CTA.

7. Add screenshots only when they clarify a real UI or workflow in the article:
- Read public/screenshots/catalog.yml and prefer those existing assets. Do not invent, download, or generate replacement screenshots.
- Use 0–2 images. Skip screenshots entirely when none fit the topic (for example pure concept, keyword-field theory, or API-key setup with no matching UI).
- Place each image immediately after the heading or short paragraph it illustrates, using Markdown:
  ![Descriptive alt text](/screenshots/...)
- Write accurate alt text. Never claim the image shows metrics, fields, or capabilities it does not show. Respect catalog caveats (including redacted App Store Connect values).
- Prefer LaunchBuddy screenshots for LaunchBuddy product sections and App Store Connect screenshots for Apple UI explanations. Do not force a product screenshot into an unrelated section.

8. Perform two editing passes:
- Accuracy pass: remove unsupported claims, generic filler, hype, repetition, forced product promotion, and decorative or mismatched screenshots.
- Natural-language pass: improve sentence variation, contractions, transitions, paragraph length, and clarity. Avoid repetitive openings and excessive em dashes.

9. Score the result out of 100:
- Product accuracy: 25
- Original value: 20
- Search-intent satisfaction: 15
- Usefulness and completeness: 15
- Natural editing: 10
- SEO and structure: 10
- Technical validity: 5

Publishing requires at least 85/100, full marks for product accuracy and technical validity, and at least 12/20 for original value. Revise no more than twice. If it still fails, keep it unpublished and report the failed criteria.

10. Run the production build and verify the generated article route, metadata, internal links, and any embedded screenshot paths. Only after every gate passes:
- mark the backlog item as published;
- commit the article and backlog update;
- push the changes;
- report the keyword, intent, score, URL, screenshots used (or “none”), and commit.

A skipped publication is a successful outcome when the quality gates are not met.
