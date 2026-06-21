/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-banner. Base: hero.
 * Source: https://wknd-trendsetters.site
 * Selector: section.inverse-section .utility-position-relative
 * Structure: Full-width background image with dark overlay, h2 heading, paragraph, and CTA button.
 * Generated: 2026-03-25
 */
export default function parse(element, { document }) {
  // element is .utility-position-relative containing bg image, overlay, and text content
  // Background image (found: <img class="cover-image utility-overlay">)
  const bgImage = element.querySelector('img.cover-image');

  // Heading (found: <h2 class="h1-heading"> inside .card-body)
  const heading = element.querySelector('.card-body h2, .card-body h1, h2, h1');

  // Description (found: <p class="subheading"> inside .card-body)
  const description = element.querySelector('.card-body p.subheading, .card-body p, p.subheading');

  // CTA button (found: <a class="button inverse-button"> inside .button-group)
  const buttons = Array.from(
    element.querySelectorAll('.button-group a, a.button')
  );

  const cells = [];

  // Row 1: Background image
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 2: Content (heading + description + CTA)
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (description) contentCell.push(description);
  contentCell.push(...buttons);
  if (contentCell.length > 0) {
    cells.push([contentCell]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
