/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-article. Base: columns.
 * Source: https://wknd-trendsetters.site
 * Selector: main > section:nth-of-type(1) .grid-layout
 * Structure: 2 columns - left: large image; right: breadcrumbs, h2, author, date, read time.
 * Generated: 2026-03-25
 */
export default function parse(element, { document }) {
  // element is the .grid-layout div with two direct child divs
  const col1 = element.querySelector(':scope > div:first-child');
  const col2 = element.querySelector(':scope > div:last-child');

  // Col 1: Image (found: <img class="cover-image utility-aspect-3x2">)
  const image = col1 ? col1.querySelector('img') : null;

  // Col 2: Breadcrumbs + heading + author/date metadata
  const breadcrumbs = col2 ? col2.querySelector('.breadcrumbs') : null;
  const heading = col2 ? col2.querySelector('h2, .h2-heading') : null;
  const metaInfo = col2 ? col2.querySelector(':scope > div:last-child') : null;

  // Build column content arrays
  const col1Content = [];
  if (image) col1Content.push(image);

  const col2Content = [];
  if (breadcrumbs) col2Content.push(breadcrumbs);
  if (heading) col2Content.push(heading);
  if (metaInfo) col2Content.push(metaInfo);

  const cells = [];
  cells.push([col1Content, col2Content]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-article', cells });
  element.replaceWith(block);
}
