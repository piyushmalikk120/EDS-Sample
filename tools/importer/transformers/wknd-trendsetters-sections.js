/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters sections.
 * Adds section breaks (<hr>) and Section Metadata blocks from template sections.
 * Runs in afterTransform only. Selectors from page-templates.json.
 */
export default function transform(hookName, element, payload) {
  if (hookName === 'afterTransform') {
    const template = payload && payload.template;
    if (!template || !template.sections || template.sections.length < 2) return;

    const { sections } = template;
    const document = element.ownerDocument;

    // Process in reverse order to preserve nth-of-type selectors
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const selector = Array.isArray(section.selector) ? section.selector : [section.selector];

      let sectionEl = null;
      for (const sel of selector) {
        sectionEl = element.querySelector(sel);
        if (sectionEl) break;
      }
      if (!sectionEl) continue;

      // Add Section Metadata block if section has a style
      if (section.style) {
        const metaBlock = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.append(metaBlock);
      }

      // Add <hr> before non-first sections
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
