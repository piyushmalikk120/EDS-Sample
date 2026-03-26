/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS - All parsers needed for the fashion-trends template
import heroLandingParser from './parsers/hero-landing.js';
import columnsFeatureParser from './parsers/columns-feature.js';
import cardsTrendParser from './parsers/cards-trend.js';
import cardsGalleryParser from './parsers/cards-gallery.js';

// TRANSFORMER IMPORTS - All transformers for WKND Trendsetters site
import cleanupTransformer from './transformers/wknd-trendsetters-cleanup.js';
import sectionsTransformer from './transformers/wknd-trendsetters-sections.js';

// PARSER REGISTRY - Map parser names to functions
const parsers = {
  'hero-landing': heroLandingParser,
  'columns-feature': columnsFeatureParser,
  'cards-trend': cardsTrendParser,
  'cards-gallery': cardsGalleryParser,
};

// TRANSFORMER REGISTRY - Array of transformer functions (cleanup only; sections handled separately)
const transformers = [
  cleanupTransformer,
];

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'fashion-trends',
  description: 'Interior content page about fashion trends of the season',
  urls: [
    'https://wknd-trendsetters.site/fashion-trends-of-the-season',
  ],
  blocks: [
    {
      name: 'hero-landing',
      instances: ['header.section.secondary-section .grid-layout'],
    },
    {
      name: 'columns-feature',
      instances: ['section#trends .grid-layout.tablet-1-column.grid-gap-lg'],
    },
    {
      name: 'cards-trend',
      instances: ['main > section:nth-of-type(2) .grid-layout.desktop-3-column'],
    },
    {
      name: 'cards-gallery',
      instances: ['main > section:nth-of-type(3) .grid-layout.desktop-3-column'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero',
      selector: 'header.section.secondary-section',
      style: null,
      blocks: ['hero-landing'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Trend Alert',
      selector: 'section.section#trends',
      style: null,
      blocks: ['columns-feature'],
      defaultContent: [
        'section#trends .utility-text-align-center h2',
        'section#trends .utility-text-align-center p',
      ],
    },
    {
      id: 'section-3',
      name: 'Trends That Turn Heads',
      selector: 'main > section:nth-of-type(2)',
      style: 'secondary',
      blocks: ['cards-trend'],
      defaultContent: [
        'main > section:nth-of-type(2) .utility-text-align-center h2',
      ],
    },
    {
      id: 'section-4',
      name: 'Style in Every Snapshot',
      selector: 'main > section:nth-of-type(3)',
      style: null,
      blocks: ['cards-gallery'],
      defaultContent: [
        'main > section:nth-of-type(3) .utility-text-align-center h2',
        'main > section:nth-of-type(3) .utility-text-align-center p',
      ],
    },
    {
      id: 'section-5',
      name: 'CTA Newsletter',
      selector: 'section.section.accent-section',
      style: 'accent',
      blocks: [],
      defaultContent: [
        'section.accent-section .utility-text-align-center h2',
        'section.accent-section .utility-text-align-center p',
        'section.accent-section .button-group',
      ],
    },
  ],
};

/**
 * Execute all page transformers for a specific hook
 * @param {string} hookName - 'beforeTransform' or 'afterTransform'
 * @param {Element} element - The DOM element to transform
 * @param {Object} payload - The payload containing { document, url, html, params }
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Execute section transformer separately (runs in afterTransform only)
 * @param {Element} element - The DOM element
 * @param {Object} payload - The payload
 */
function executeSectionTransformer(element, payload) {
  if (PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1) {
    const enhancedPayload = {
      ...payload,
      template: PAGE_TEMPLATE,
    };
    try {
      sectionsTransformer.call(null, 'afterTransform', element, enhancedPayload);
    } catch (e) {
      console.error('Section transformer failed:', e);
    }
  }
}

/**
 * Find all blocks on the page based on the embedded template configuration
 * @param {Document} document - The DOM document
 * @param {Object} template - The embedded PAGE_TEMPLATE object
 * @returns {Array} Array of block instances found on the page
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (cleanup)
    executeTransformers('afterTransform', main, payload);

    // 5. Execute section transformer (adds <hr> and Section Metadata blocks)
    executeSectionTransformer(main, payload);

    // 6. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 7. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname
        .replace(/\/$/, '')
        .replace(/\.html$/, '') || '/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
