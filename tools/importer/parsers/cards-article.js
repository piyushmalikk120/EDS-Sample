/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-article. Base: cards.
 * Source: https://wknd-trendsetters.site
 * Selector: main > section:nth-of-type(4) .grid-layout.desktop-4-column
 * Structure: 4 article cards, each with image, category tag, date, and h3 heading with link.
 * Generated: 2026-03-25
 */
export default function parse(element, { document }) {
  // element is .grid-layout.desktop-4-column containing 4 article card links
  // Each card: <a class="article-card card-link" href="...">
  const cards = Array.from(element.querySelectorAll('a.article-card'));
  const cells = [];

  cards.forEach((card) => {
    // Image (found: <img class="cover-image"> inside .article-card-image)
    const img = card.querySelector('.article-card-image img, img');

    // Heading (found: <h3 class="h4-heading">)
    const heading = card.querySelector('h3, .h4-heading');

    // Category tag (found: <span class="tag">)
    const tag = card.querySelector('.tag');

    // Date (found: <span class="paragraph-sm utility-text-secondary"> inside .article-card-meta)
    const dateMeta = card.querySelector('.article-card-meta .paragraph-sm');

    // Article link from parent <a> element
    const href = card.getAttribute('href');

    // Build text content cell
    const textContent = [];

    // Add heading with link to article
    if (heading && href) {
      const link = document.createElement('a');
      link.setAttribute('href', href);
      link.textContent = heading.textContent.trim();
      const h3 = document.createElement('h3');
      h3.append(link);
      textContent.push(h3);
    } else if (heading) {
      textContent.push(heading);
    }

    if (tag) textContent.push(tag);
    if (dateMeta) textContent.push(dateMeta);

    cells.push([img || '', textContent]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}
