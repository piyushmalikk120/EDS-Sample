/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-trend. Base: cards.
 * Source: https://wknd-trendsetters.site/fashion-trends-of-the-season
 * Selector: main > section:nth-of-type(2) .grid-layout.desktop-3-column
 * Structure: 3-column grid of cards, each with image + h3 heading + paragraph description.
 * Generated: 2026-03-26
 */
export default function parse(element, { document }) {
  // element is .grid-layout.desktop-3-column containing 3 child divs
  // Each child: <div><img class="cover-image"><h3 class="h4-heading">...</h3><p>...</p></div>
  const items = Array.from(element.querySelectorAll(':scope > div'));
  const cells = [];

  items.forEach((item) => {
    const img = item.querySelector('img');
    const heading = item.querySelector('h3, .h4-heading, h4');
    const description = item.querySelector('p, .paragraph-sm');

    // Cards block: row = [image_cell, text_cell]
    const imageCell = [];
    if (img) imageCell.push(img);

    const textCell = [];
    if (heading) textCell.push(heading);
    if (description) textCell.push(description);

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-trend', cells });
  element.replaceWith(block);
}
