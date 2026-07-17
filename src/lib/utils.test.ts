import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatDate } from "./utils";

describe("formatDate", () => {
  it("formats YYYY-MM-DD without timezone day-shift", () => {
    assert.strictEqual(formatDate("2026-04-10"), "April 10, 2026");
    assert.strictEqual(formatDate("2026-01-01"), "January 1, 2026");
    assert.strictEqual(formatDate("2026-12-31"), "December 31, 2026");
  });
});
