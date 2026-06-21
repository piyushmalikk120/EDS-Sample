/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters cleanup.
 * Removes non-authorable site chrome. Selectors from captured DOM.
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove skip-link (found: <a href="#main-content" class="skip-link">)
    WebImporter.DOMUtils.remove(element, ['a.skip-link']);
  }

  if (hookName === H.after) {
    // Remove non-authorable site chrome (from captured DOM)
    // Navigation bar: <div class="navbar">
    // Footer: <footer class="footer inverse-footer">
    WebImporter.DOMUtils.remove(element, [
      'div.navbar',
      'footer.footer',
      'footer',
      'noscript',
      'link',
    ]);
  }
}
