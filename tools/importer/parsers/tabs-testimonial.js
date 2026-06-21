/* eslint-disable */
/* global WebImporter */

/**
 * Parser for tabs-testimonial. Base: tabs.
 * Source: https://wknd-trendsetters.site
 * Selector: main > section:nth-of-type(3) .tabs-wrapper
 * Structure: 4 tabbed panels with person image, name, role, and testimonial quote.
 * Tab navigation with avatar thumbnails below.
 * Generated: 2026-03-25
 */
export default function parse(element, { document }) {
  // element is .tabs-wrapper containing .tabs-content and .tab-menu
  const panes = Array.from(element.querySelectorAll('.tab-pane'));
  const menuLinks = Array.from(element.querySelectorAll('.tab-menu-link'));

  const cells = [];

  panes.forEach((pane, index) => {
    // Tab label: person's name from the tab menu button
    const menuLink = menuLinks[index];
    const labelStrong = menuLink ? menuLink.querySelector('strong') : null;
    const label = labelStrong
      ? labelStrong.textContent.trim()
      : `Tab ${index + 1}`;

    // Tab content: the grid-layout inside the pane contains image + text
    const content = pane.querySelector('.grid-layout') || pane;

    cells.push([label, content]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-testimonial', cells });
  element.replaceWith(block);
}
