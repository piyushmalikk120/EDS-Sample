/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-gallery. Base: cards.
 * Source: https://wknd-trendsetters.site
 * Selector: main > section:nth-of-type(2) .grid-layout.desktop-4-column
 * Structure: 4x2 grid of 8 square images (image-only gallery cards).
 * Generated: 2026-03-25
 */
export default function parse(element, { document }) {
  // element is .grid-layout.desktop-4-column containing 8 child divs
  // Each child: <div class="utility-aspect-1x1"><img class="cover-image"></div>
  const items = Array.from(element.querySelectorAll(':scope > div'));
  const cells = [];

  items.forEach((item) => {
    const img = item.querySelector('img');
    if (img) {
      // Single column per row: image only (gallery-style cards)
      cells.push([img]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-gallery', cells });
  element.replaceWith(block);
}
