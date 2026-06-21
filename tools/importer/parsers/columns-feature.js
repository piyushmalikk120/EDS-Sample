/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-feature. Base: columns.
 * Source: https://wknd-trendsetters.site/fashion-trends-of-the-season
 * Selector: section#trends .grid-layout.tablet-1-column.grid-gap-lg
 * Structure: 2 columns - left: image (cover-image); right: h3 heading, paragraph, CTA button.
 * Generated: 2026-03-26
 */
export default function parse(element, { document }) {
  // element is the .grid-layout div with two direct child divs
  const col1 = element.querySelector(':scope > div:first-child');
  const col2 = element.querySelector(':scope > div:last-child');

  // Col 1: Image (found: <img class="cover-image utility-aspect-3x2">)
  const image = col1 ? col1.querySelector('img') : null;

  // Col 2: Heading + description + CTA
  const heading = col2 ? col2.querySelector('h3, .h3-heading, h2') : null;
  const description = col2 ? col2.querySelector('p, .paragraph-lg') : null;
  const ctaLinks = col2 ? Array.from(col2.querySelectorAll('.button-group a, a.button')) : [];

  // Build column content arrays
  const col1Content = [];
  if (image) col1Content.push(image);

  const col2Content = [];
  if (heading) col2Content.push(heading);
  if (description) col2Content.push(description);
  col2Content.push(...ctaLinks);

  const cells = [];
  cells.push([col1Content, col2Content]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-feature', cells });
  element.replaceWith(block);
}
