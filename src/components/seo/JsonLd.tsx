import { memo } from "react";

interface JsonLdProps {
  /** Schema.org object (will be JSON-stringified). */
  schema: object;
}

/**
 * Renders a single `<script type="application/ld+json">` tag with the
 * given schema. React 19 automatically hoists these into the document
 * head, so structured data lands in the static HTML output.
 *
 * Multiple JsonLd components can be rendered on the same page; each
 * produces its own script tag, which is valid per schema.org spec.
 */
const JsonLdBase = ({ schema }: JsonLdProps) => (
  <script type="application/ld+json">{JSON.stringify(schema)}</script>
);

export const JsonLd = memo(JsonLdBase);
