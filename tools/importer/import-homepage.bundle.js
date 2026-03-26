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

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
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

  // tools/importer/parsers/columns-article.js
  function parse2(element, { document }) {
    const col1 = element.querySelector(":scope > div:first-child");
    const col2 = element.querySelector(":scope > div:last-child");
    const image = col1 ? col1.querySelector("img") : null;
    const breadcrumbs = col2 ? col2.querySelector(".breadcrumbs") : null;
    const heading = col2 ? col2.querySelector("h2, .h2-heading") : null;
    const metaInfo = col2 ? col2.querySelector(":scope > div:last-child") : null;
    const col1Content = [];
    if (image) col1Content.push(image);
    const col2Content = [];
    if (breadcrumbs) col2Content.push(breadcrumbs);
    if (heading) col2Content.push(heading);
    if (metaInfo) col2Content.push(metaInfo);
    const cells = [];
    cells.push([col1Content, col2Content]);
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-gallery.js
  function parse3(element, { document }) {
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

  // tools/importer/parsers/tabs-testimonial.js
  function parse4(element, { document }) {
    const panes = Array.from(element.querySelectorAll(".tab-pane"));
    const menuLinks = Array.from(element.querySelectorAll(".tab-menu-link"));
    const cells = [];
    panes.forEach((pane, index) => {
      const menuLink = menuLinks[index];
      const labelStrong = menuLink ? menuLink.querySelector("strong") : null;
      const label = labelStrong ? labelStrong.textContent.trim() : `Tab ${index + 1}`;
      const content = pane.querySelector(".grid-layout") || pane;
      cells.push([label, content]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-testimonial", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse5(element, { document }) {
    const cards = Array.from(element.querySelectorAll("a.article-card"));
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector(".article-card-image img, img");
      const heading = card.querySelector("h3, .h4-heading");
      const tag = card.querySelector(".tag");
      const dateMeta = card.querySelector(".article-card-meta .paragraph-sm");
      const href = card.getAttribute("href");
      const textContent = [];
      if (heading && href) {
        const link = document.createElement("a");
        link.setAttribute("href", href);
        link.textContent = heading.textContent.trim();
        const h3 = document.createElement("h3");
        h3.append(link);
        textContent.push(h3);
      } else if (heading) {
        textContent.push(heading);
      }
      if (tag) textContent.push(tag);
      if (dateMeta) textContent.push(dateMeta);
      cells.push([img || "", textContent]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse6(element, { document }) {
    const items = Array.from(element.querySelectorAll("details.faq-item, details"));
    const cells = [];
    items.forEach((item) => {
      const questionSpan = item.querySelector("summary span");
      const question = questionSpan ? questionSpan.textContent.trim() : item.querySelector("summary") ? item.querySelector("summary").textContent.trim() : "";
      const answerDiv = item.querySelector(".faq-answer");
      const answerElements = answerDiv ? Array.from(answerDiv.querySelectorAll("p, ul, ol")) : [];
      cells.push([question, answerElements.length > 0 ? answerElements : ""]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-banner.js
  function parse7(element, { document }) {
    const bgImage = element.querySelector("img.cover-image");
    const heading = element.querySelector(".card-body h2, .card-body h1, h2, h1");
    const description = element.querySelector(".card-body p.subheading, .card-body p, p.subheading");
    const buttons = Array.from(
      element.querySelectorAll(".button-group a, a.button")
    );
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description) contentCell.push(description);
    contentCell.push(...buttons);
    if (contentCell.length > 0) {
      cells.push([contentCell]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-banner", cells });
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

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-landing": parse,
    "columns-article": parse2,
    "cards-gallery": parse3,
    "tabs-testimonial": parse4,
    "cards-article": parse5,
    "accordion-faq": parse6,
    "hero-banner": parse7
  };
  var transformers = [
    transform
  ];
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Homepage template for WKND Trendsetters site",
    urls: [
      "https://wknd-trendsetters.site"
    ],
    blocks: [
      {
        name: "hero-landing",
        instances: ["header.section.secondary-section .grid-layout"]
      },
      {
        name: "columns-article",
        instances: ["main > section:nth-of-type(1) .grid-layout"]
      },
      {
        name: "cards-gallery",
        instances: ["main > section:nth-of-type(2) .grid-layout.desktop-4-column"]
      },
      {
        name: "tabs-testimonial",
        instances: ["main > section:nth-of-type(3) .tabs-wrapper"]
      },
      {
        name: "cards-article",
        instances: ["main > section:nth-of-type(4) .grid-layout.desktop-4-column"]
      },
      {
        name: "accordion-faq",
        instances: ["main > section:nth-of-type(5) .faq-list"]
      },
      {
        name: "hero-banner",
        instances: ["section.inverse-section .utility-position-relative"]
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
        name: "Featured Article",
        selector: "main > section:nth-of-type(1)",
        style: null,
        blocks: ["columns-article"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Image Gallery",
        selector: "main > section:nth-of-type(2)",
        style: "secondary",
        blocks: ["cards-gallery"],
        defaultContent: [
          "main > section:nth-of-type(2) .utility-text-align-center h2",
          "main > section:nth-of-type(2) .utility-text-align-center p"
        ]
      },
      {
        id: "section-4",
        name: "Testimonials",
        selector: "main > section:nth-of-type(3)",
        style: null,
        blocks: ["tabs-testimonial"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Latest Articles",
        selector: "main > section:nth-of-type(4)",
        style: "secondary",
        blocks: ["cards-article"],
        defaultContent: [
          "main > section:nth-of-type(4) .utility-text-align-center h2",
          "main > section:nth-of-type(4) .utility-text-align-center p"
        ]
      },
      {
        id: "section-6",
        name: "FAQ",
        selector: "main > section:nth-of-type(5)",
        style: null,
        blocks: ["accordion-faq"],
        defaultContent: [
          "main > section:nth-of-type(5) h2.h2-heading",
          "main > section:nth-of-type(5) p.subheading"
        ]
      },
      {
        id: "section-7",
        name: "CTA Banner",
        selector: "section.inverse-section",
        style: null,
        blocks: ["hero-banner"],
        defaultContent: []
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
  var import_homepage_default = {
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
  return __toCommonJS(import_homepage_exports);
})();
