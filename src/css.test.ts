import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";

/* studio-relaunch.css 与 index.css 的类选择器必须有真实消费方。
   BEM 动态修饰符（`studio-game-row--${index % 3}`、`studio-hero__stage--${TONES[...]}`）
   以模板字面量生成，静态语料中不存在完整类名——判定规则：完整名命中，或
   「基名--」以模板插值形式出现，两者都命不中才算孤儿。
   首轮扫描曾把 5 个动态修饰符误报为孤儿，本测试把这条区分规则固化。 */

const CSS_FILES = ["src/studio-relaunch.css", "src/index.css"];

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(path));
    else out.push(path);
  }
  return out;
}

function classSelectors(css: string): string[] {
  const noComments = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const names = new Set<string>();
  const rule = /(^|[{};])\s*([^{};]+)\{/g;
  let match = rule.exec(noComments);
  while (match) {
    for (const m of match[2].matchAll(/\.([a-zA-Z][a-zA-Z0-9_-]*)/g)) names.add(m[1]);
    match = rule.exec(noComments);
  }
  return [...names];
}

describe("css selector liveness", () => {
  it("every class selector has a consumer, counting BEM template modifiers as alive", () => {
    const corpus = ["src", "app", "scripts", "e2e"]
      .flatMap((dir) => walk(dir))
      .filter((f) => /\.(tsx?|jsx?|mjs|html)$/.test(f))
      .map((f) => readFileSync(f, "utf8"))
      .join("\n");
    const orphans: string[] = [];
    for (const file of CSS_FILES) {
      for (const name of classSelectors(readFileSync(file, "utf8"))) {
        if (new RegExp(`(?<![\\w-])${name}(?![\\w-])`).test(corpus)) continue;
        // BEM 动态修饰符：`基名--${` 模式出现在模板字面量中即为生成态。
        const dashAt = name.indexOf("--");
        if (dashAt > 0 && corpus.includes(`${name.slice(0, dashAt)}--${"$"}{`)) continue;
        orphans.push(`${file}: .${name}`);
      }
    }
    assert.deepEqual(orphans, []);
  });
});
