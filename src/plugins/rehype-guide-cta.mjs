/**
 * Inserts an App Store call-out halfway through featured guides (posts with `featured` in
 * frontmatter). The call-out goes before the middle H2 so it never splits a section, and never
 * lands on the FAQ, which has to stay a plain heading-and-paragraph list for extractFaq().
 *
 * @param {{ href: string, label: string, body: string }} options
 */
export default function rehypeGuideCta({ href, label, body }) {
  const element = (tagName, className, children, properties = {}) => ({
    type: 'element',
    tagName,
    properties: { className: [className], ...properties },
    children,
  });
  const text = (value) => ({ type: 'text', value });
  const headingText = (node) =>
    node.children.map((child) => (child.type === 'text' ? child.value : '')).join('');

  return (tree, file) => {
    const frontmatter = file.data.astro?.frontmatter ?? {};
    if (!frontmatter.featured) return;

    const h2Indexes = tree.children.flatMap((node, index) =>
      node.type === 'element' &&
      node.tagName === 'h2' &&
      !/^frequently asked questions$/i.test(headingText(node).trim())
        ? [index]
        : [],
    );
    if (h2Indexes.length < 3) return;

    const target = h2Indexes[Math.floor(h2Indexes.length / 2)];
    const title = frontmatter.cta ?? 'Plan your next release in LaunchBuddy';

    tree.children.splice(
      target,
      0,
      element('aside', 'guide-cta', [
        element('p', 'guide-cta__kicker', [text('LaunchBuddy for iPhone, iPad, and Mac')]),
        element('p', 'guide-cta__title', [text(title)]),
        element('p', 'guide-cta__body', [text(body)]),
        element('a', 'guide-cta__button', [text(label)], { href }),
      ], { ariaLabel: 'Try LaunchBuddy' }),
    );
  };
}
