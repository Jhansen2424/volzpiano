import { FilterXSS, escapeAttrValue, safeAttrValue } from "xss";

/**
 * Sanitizes blog post HTML before it's rendered with dangerouslySetInnerHTML.
 *
 * Why not DOMPurify: isomorphic-dompurify needs jsdom on the server, and Next
 * 16 always loads jsdom as an *external* package through a hashed symlink
 * under .next/node_modules. On Vercel that symlink isn't available at
 * runtime, so every on-demand render of the blog route crashed with "Failed
 * to load external module jsdom-<hash>": every unknown URL returned a 500,
 * and scheduled posts couldn't render when their date arrived.
 *
 * Whatever replaces it must not be on Next's always-external list either
 * (node_modules/next/dist/lib/server-external-packages.jsonc). That rules out
 * sanitize-html, which needs postcss. js-xss is plain CommonJS and bundles
 * normally.
 *
 * The allowlist reproduces what DOMPurify kept for this site's posts,
 * verified post by post on all 235 posts when switching:
 * - Ordinary article markup stays.
 * - Removed: scripts, event handlers, iframes, forms, document-level tags
 *   (<meta>, <title>, along with their text), target attributes and
 *   javascript: URLs.
 * - One deliberate difference: DOMPurify stripped id="method" (a
 *   DOM-clobbering guard), which broke seven posts' own table-of-contents
 *   links. It's kept now.
 */

const TAGS = [
  "p", "a", "strong", "b", "em", "i", "u", "span", "div", "br", "hr",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "ul", "ol", "li", "details", "summary", "blockquote", "code", "pre",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption",
  "figure", "figcaption", "img", "article", "section", "nav", "aside", "header", "footer",
  "sup", "sub", "small", "mark", "abbr", "cite", "q", "s", "del", "ins",
];

/** Attributes allowed on specific tags, in addition to the global ones below. */
const TAG_ATTRS: Record<string, string[]> = {
  a: ["href", "name", "rel"],
  img: ["src", "srcset", "alt", "width", "height", "loading"],
  ol: ["start", "type", "reversed"],
  td: ["colspan", "rowspan"],
  th: ["colspan", "rowspan", "scope"],
};

/** Allowed on every allowed tag. */
const GLOBAL_ATTRS = new Set(["class", "id", "style", "title", "role", "dir", "lang"]);

const filter = new FilterXSS({
  whiteList: Object.fromEntries(TAGS.map((t) => [t, TAG_ATTRS[t] ?? []])),
  // Drop tags that aren't allowed; for these, drop their contents too.
  stripIgnoreTag: true,
  stripIgnoreTagBody: ["script", "style", "title", "textarea", "option", "noscript", "iframe", "object", "embed", "svg", "math"],
  allowCommentTag: false,
  // Keep inline style attributes exactly as written, as DOMPurify did (the
  // WordPress imports use them for spacing). The content is first-party.
  css: false,
  onIgnoreTagAttr(tag, name, value) {
    if (!TAGS.includes(tag)) return undefined;
    if (GLOBAL_ATTRS.has(name) || name.startsWith("aria-")) {
      return `${name}="${escapeAttrValue(value)}"`;
    }
    // Returning an empty string removes the attribute (event handlers, target, …).
    return "";
  },
  // href/src: js-xss's default check removes javascript:, data: and similar
  // URLs; everything else is escaped.
  safeAttrValue(tag, name, value, cssFilter) {
    return safeAttrValue(tag, name, value, cssFilter);
  },
});

export function sanitizePostHtml(html: string): string {
  return filter.process(html);
}
