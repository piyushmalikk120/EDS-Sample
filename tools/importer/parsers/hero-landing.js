/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-landing. Base: hero.
 * Source: https://wknd-trendsetters.site
 * Selector: header.section.secondary-section .grid-layout
 * Structure: Two-column layout with h1 + paragraph + 2 CTAs on left; 3 images on right.
 * Generated: 2026-03-25
 */
export default function parse(element, { document }) {
  // element is the outer .grid-layout div
  // First direct child: text content (heading, paragraph, buttons)
  // Second direct child: image grid (3 images)
  const textCol = element.querySelector(':scope > div:first-child');
  const imageCol = element.querySelector(':scope > div:last-child');

  // Extract heading (found: <h1 class="h1-heading">)
  const heading = textCol ? textCol.querySelector('h1, h2, .h1-heading') : null;

  // Extract subheading (found: <p class="subheading">)
  const description = textCol ? textCol.querySelector('p.subheading, p') : null;

  // Extract CTA buttons (found: <a class="button"> inside .button-group)
  const buttons = textCol
    ? Array.from(textCol.querySelectorAll('.button-group a'))
    : [];

  // Extract hero images (found: 3x <img class="cover-image"> in nested .grid-layout)
  const images = imageCol
    ? Array.from(imageCol.querySelectorAll('img'))
    : [];

  // Guard: skip if element has no meaningful content (handles nested .grid-layout match)
  if (!heading && !description && images.length === 0 && buttons.length === 0) {
    element.remove();
    return;
  }

  const cells = [];

  // Row 1: Hero images (visual row)
  if (images.length > 0) {
    cells.push([images]);
  }

  // Row 2: Content (heading + subheading + CTAs)
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (description) contentCell.push(description);
  contentCell.push(...buttons);
  if (contentCell.length > 0) {
    cells.push([contentCell]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-landing', cells });
  element.replaceWith(block);
}
