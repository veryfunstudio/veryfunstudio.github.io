import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const file = join(process.cwd(), "node_modules/@react-router/dev/dist/typegen-9e9g0hnu.js");

const before = `const traverse = _traverse.default;
const generate = _generate.default;`;
const after = `const traverse = _traverse.default ?? _traverse;
const generate = _generate.default ?? _generate;`;

try {
  const source = readFileSync(file, "utf8");
  if (source.includes(after)) {
    process.exit(0);
  }
  if (!source.includes(before)) {
    console.warn("React Router dev patch skipped: target lines not found.");
    process.exit(0);
  }
  writeFileSync(file, source.replace(before, after));
  console.log("Patched @react-router/dev Babel default interop.");
} catch (error) {
  console.warn(`React Router dev patch skipped: ${error instanceof Error ? error.message : error}`);
}
