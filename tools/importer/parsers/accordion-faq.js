/* eslint-disable */
/* global WebImporter */

/**
 * Parser for accordion-faq. Base: accordion.
 * Source: https://wknd-trendsetters.site
 * Selector: main > section:nth-of-type(5) .faq-list
 * Structure: 4 expandable FAQ items using details/summary elements.
 * Generated: 2026-03-25
 */
export default function parse(element, { document }) {
  // element is .faq-list containing 4 <details class="faq-item"> elements
  const items = Array.from(element.querySelectorAll('details.faq-item, details'));
  const cells = [];

  items.forEach((item) => {
    // Question: text from <summary> > <span> (ignoring the SVG icon)
    const questionSpan = item.querySelector('summary span');
    const question = questionSpan
      ? questionSpan.textContent.trim()
      : (item.querySelector('summary') ? item.querySelector('summary').textContent.trim() : '');

    // Answer: paragraphs from <div class="faq-answer">
    const answerDiv = item.querySelector('.faq-answer');
    const answerElements = answerDiv
      ? Array.from(answerDiv.querySelectorAll('p, ul, ol'))
      : [];

    cells.push([question, answerElements.length > 0 ? answerElements : '']);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
