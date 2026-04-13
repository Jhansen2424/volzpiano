/**
 * Serialize a JSON-LD object for inlining inside an HTML <script> tag.
 *
 * The JSON spec allows the literal substring "</script>" inside string values,
 * but the HTML spec doesn't — the browser would terminate the script tag early
 * and parse the rest as HTML, which is an XSS vector if any field is ever
 * sourced from user content. Always escape the angle brackets at this boundary.
 */
export function serializeJsonLd(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
