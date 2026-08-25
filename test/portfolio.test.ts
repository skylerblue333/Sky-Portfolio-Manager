import assert from "node:assert/strict";
import test from "node:test";
import { summarizePortfolio } from "../src/index.js";

test("calculates deterministic values and weights from caller prices", () => {
  const result = summarizePortfolio([
    { symbol: "AAA", quantity: 2, unitPrice: 25 },
    { symbol: "BBB", quantity: 1, unitPrice: 50 }
  ]);
  assert.equal(result.totalValue, 100);
  assert.deepEqual(result.holdings.map((h) => [h.symbol, h.weight]), [["AAA", 0.5], ["BBB", 0.5]]);
  assert.equal(result.livePricingPerformed, false);
  assert.equal(result.recommendationPerformed, false);
});

test("zero-value portfolios have zero weights", () => {
  const result = summarizePortfolio([{ symbol: "AAA", quantity: 0, unitPrice: 10 }]);
  assert.equal(result.holdings[0]?.weight, 0);
});

test("rejects duplicates and malformed values", () => {
  assert.throws(() => summarizePortfolio([{ symbol: "bad symbol", quantity: 1, unitPrice: 1 }]));
  assert.throws(() => summarizePortfolio([{ symbol: "AAA", quantity: -1, unitPrice: 1 }]));
  assert.throws(() => summarizePortfolio([{ symbol: "AAA", quantity: 1, unitPrice: 1 }, { symbol: "AAA", quantity: 1, unitPrice: 2 }]));
});
