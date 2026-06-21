var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-fashion-trends.js
  var import_fashion_trends_exports = {};
  __export(import_fashion_trends_exports, {
    default: () => import_fashion_trends_default
  });

  // tools/importer/parsers/hero-landing.js
  function parse(element, { document }) {
    const textCol = element.querySelector(":scope > div:first-child");
    const imageCol = element.querySelector(":scope > div:last-child");
    const heading = textCol ? textCol.querySelector("h1, h2, .h1-heading") : null;
    const description = textCol ? textCol.querySelector("p.subheading, p") : null;
    const buttons = textCol ? Array.from(textCol.querySelectorAll(".button-group a")) : [];
    const images = imageCol ? Array.from(imageCol.querySelectorAll("img")) : [];
    if (!heading && !description && images.length === 0 && buttons.length === 0) {
      element.remove();
      return;
    }
    const cells = [];
    if (images.length > 0) {
      cells.push([images]);
    }
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description) contentCell.push(description);
    contentCell.push(...buttons);
    if (contentCell.length > 0) {
      cells.push([contentCell]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-landing", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-feature.js
  function parse2(element, { document }) {
    const col1 = element.querySelector(":scope > div:first-child");
    const col2 = element.querySelector(":scope > div:last-child");
    const image = col1 ? col1.querySelector("img") : null;
    const heading = col2 ? col2.querySelector("h3, .h3-heading, h2") : null;
    const description = col2 ? col2.querySelector("p, .paragraph-lg") : null;
    const ctaLinks = col2 ? Array.from(col2.querySelectorAll(".button-group a, a.button")) : [];
    const col1Content = [];
    if (image) col1Content.push(image);
    const col2Content = [];
    if (heading) col2Content.push(heading);
    if (description) col2Content.push(description);
    col2Content.push(...ctaLinks);
    const cells = [];
    cells.push([col1Content, col2Content]);
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-trend.js
  function parse3(element, { document }) {
    const items = Array.from(element.querySelectorAll(":scope > div"));
    const cells = [];
    items.forEach((item) => {
      const img = item.querySelector("img");
      const heading = item.querySelector("h3, .h4-heading, h4");
      const description = item.querySelector("p, .paragraph-sm");
      const imageCell = [];
      if (img) imageCell.push(img);
      const textCell = [];
      if (heading) textCell.push(heading);
      if (description) textCell.push(description);
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-trend", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-gallery.js
  function parse4(element, { document }) {
    const items = Array.from(element.querySelectorAll(":scope > div"));
    const cells = [];
    items.forEach((item) => {
      const img = item.querySelector("img");
      if (img) {
        cells.push([img]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-gallery", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/wknd-trendsetters-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, ["a.skip-link"]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        "div.navbar",
        "footer.footer",
        "footer",
        "noscript",
        "link"
      ]);
    }
  }

  // tools/importer/transformers/wknd-trendsetters-sections.js
  function transform2(hookName, element, payload) {
    if (hookName === "afterTransform") {
      const template = payload && payload.template;
      if (!template || !template.sections || template.sections.length < 2) return;
      const { sections } = template;
      const document = element.ownerDocument;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const selector = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selector) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) continue;
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.append(metaBlock);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-fashion-trends.js
  var parsers = {
    "hero-landing": parse,
    "columns-feature": parse2,
    "cards-trend": parse3,
    "cards-gallery": parse4
  };
  var transformers = [
    transform
  ];
  var PAGE_TEMPLATE = {
    name: "fashion-trends",
    description: "Interior content page about fashion trends of the season",
    urls: [
      "https://wknd-trendsetters.site/fashion-trends-of-the-season"
    ],
    blocks: [
      {
        name: "hero-landing",
        instances: ["header.section.secondary-section .grid-layout"]
      },
      {
        name: "columns-feature",
        instances: ["section#trends .grid-layout.tablet-1-column.grid-gap-lg"]
      },
      {
        name: "cards-trend",
        instances: ["main > section:nth-of-type(2) .grid-layout.desktop-3-column"]
      },
      {
        name: "cards-gallery",
        instances: ["main > section:nth-of-type(3) .grid-layout.desktop-3-column"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: "header.section.secondary-section",
        style: null,
        blocks: ["hero-landing"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Trend Alert",
        selector: "section.section#trends",
        style: null,
        blocks: ["columns-feature"],
        defaultContent: [
          "section#trends .utility-text-align-center h2",
          "section#trends .utility-text-align-center p"
        ]
      },
      {
        id: "section-3",
        name: "Trends That Turn Heads",
        selector: "main > section:nth-of-type(2)",
        style: "secondary",
        blocks: ["cards-trend"],
        defaultContent: [
          "main > section:nth-of-type(2) .utility-text-align-center h2"
        ]
      },
      {
        id: "section-4",
        name: "Style in Every Snapshot",
        selector: "main > section:nth-of-type(3)",
        style: null,
        blocks: ["cards-gallery"],
        defaultContent: [
          "main > section:nth-of-type(3) .utility-text-align-center h2",
          "main > section:nth-of-type(3) .utility-text-align-center p"
        ]
      },
      {
        id: "section-5",
        name: "CTA Newsletter",
        selector: "section.section.accent-section",
        style: "accent",
        blocks: [],
        defaultContent: [
          "section.accent-section .utility-text-align-center h2",
          "section.accent-section .utility-text-align-center p",
          "section.accent-section .button-group"
        ]
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function executeSectionTransformer(element, payload) {
    if (PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1) {
      const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
        template: PAGE_TEMPLATE
      });
      try {
        transform2.call(null, "afterTransform", element, enhancedPayload);
      } catch (e) {
        console.error("Section transformer failed:", e);
      }
    }
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_fashion_trends_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      executeSectionTransformer(main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_fashion_trends_exports);
})();
