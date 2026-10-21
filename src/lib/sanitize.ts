import sanitizeHtml from "sanitize-html";

/**
 * Sanitizes blog post HTML before it's rendered with dangerouslySetInnerHTML.
 *
 * Why not DOMPurify: isomorphic-dompurify needs jsdom on the server, and Next
 * 16 loads jsdom as an *external* package through a hashed symlink under
 * .next/node_modules. On Vercel that symlink isn't available at runtime, so
 * every on-demand render of the blog route crashed with "Failed to load
 * external module jsdom-<hash>" — every unknown URL returned a 500, and
 * scheduled posts couldn't render when their date arrived. sanitize-html is
 * plain JavaScript and is bundled normally, so there's nothing external to
 * lose.
 *
 * The allowlist reproduces what DOMPurify kept for this site's posts —
 * verified post by post on all 235 posts when switching. Ordinary article
 * markup stays; scripts, event handlers, iframes, forms, document-level tags
 * (<meta>, <title>), target attributes and javascript: URLs are removed. One
 * deliberate difference: DOMPurify stripped id="method" (a DOM-clobbering
 * guard), which broke seven posts' own table-of-contents links; it's kept now.
 */
const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "p", "a", "strong", "b", "em", "i", "u", "span", "div", "br", "hr",
    "h1", "h2", "h3", "h4", "h5", "h6",
    "ul", "ol", "li", "details", "summary", "blockquote", "code", "pre",
    "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption",
    "figure", "figcaption", "img", "article", "section", "nav", "aside", "header", "footer",
    "sup", "sub", "small", "mark", "abbr", "cite", "q", "s", "del", "ins",
  ],
  allowedAttributes: {
    "*": ["class", "id", "style", "title", "aria-*", "role", "dir", "lang"],
    a: ["href", "name", "rel"],
    img: ["src", "srcset", "alt", "width", "height", "loading"],
    ol: ["start", "type", "reversed"],
    td: ["colspan", "rowspan"],
    th: ["colspan", "rowspan", "scope"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesAppliedToAttributes: ["href", "src"],
  allowProtocolRelative: true,
  // Keep inline style attributes exactly as written, as DOMPurify did (the
  // WordPress imports use them for spacing). They're not parsed or filtered:
  // the content is first-party, and modern browsers don't execute CSS.
  parseStyleAttributes: false,
  disallowedTagsMode: "discard",
  // Drop these with their text, as DOMPurify did (a few WordPress imports
  // carry a stray <title> whose words would otherwise show in the post).
  nonTextTags: ["script", "style", "textarea", "option", "noscript", "title"],
};

export function sanitizePostHtml(html: string): string {
  return sanitizeHtml(html, OPTIONS);
}
