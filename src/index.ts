export interface HoldingInput {
  symbol: string;
  quantity: number;
  unitPrice: number;
}

export interface HoldingSummary extends HoldingInput {
  value: number;
  weight: number;
}

export interface PortfolioSummary {
  totalValue: number;
  holdings: readonly HoldingSummary[];
  livePricingPerformed: false;
  recommendationPerformed: false;
}

const SYMBOL_RE = /^[A-Z0-9][A-Z0-9._-]{0,15}$/;
const MAX_HOLDINGS = 1_000;

export function summarizePortfolio(inputs: readonly HoldingInput[]): PortfolioSummary {
  if (inputs.length > MAX_HOLDINGS) throw new Error("holding capacity exceeded");
  const seen = new Set<string>();
  const valued = inputs.map((holding) => {
    if (!SYMBOL_RE.test(holding.symbol)) throw new Error("invalid symbol");
    if (seen.has(holding.symbol)) throw new Error("duplicate symbol");
    seen.add(holding.symbol);
    if (!Number.isFinite(holding.quantity) || holding.quantity < 0) throw new Error("invalid quantity");
    if (!Number.isFinite(holding.unitPrice) || holding.unitPrice < 0) throw new Error("invalid unit price");
    const value = holding.quantity * holding.unitPrice;
    if (!Number.isFinite(value) || !Number.isSafeInteger(Math.round(value * 100))) throw new Error("holding value out of range");
    return { ...holding, value };
  });
  const totalValue = valued.reduce((sum, holding) => sum + holding.value, 0);
  const holdings = valued
    .map((holding) => ({ ...holding, weight: totalValue === 0 ? 0 : holding.value / totalValue }))
    .sort((a, b) => a.symbol.localeCompare(b.symbol));
  return Object.freeze({
    totalValue,
    holdings: Object.freeze(holdings),
    livePricingPerformed: false,
    recommendationPerformed: false
  });
}
