# Sky Portfolio Core

**Status: engineering beta / calculation library.** This repository calculates portfolio values and allocation weights from prices supplied by the caller.

## Supported today

- bounded symbol, quantity and unit-price validation;
- duplicate-symbol rejection;
- deterministic holding values and allocation weights;
- zero-value handling;
- explicit `livePricingPerformed: false` and `recommendationPerformed: false` signals;
- strict TypeScript checks and tests.

## Not claimed

This library does not fetch market prices, connect to brokers/exchanges, hold assets or keys, execute trades, predict returns, assess suitability/risk, provide tax calculations, or provide investment advice. Caller-supplied prices may be stale or incorrect.

## Development

```bash
npm install
npm run check
npm test
```

## Integration

SKYCOIN4444 can use `summarizePortfolio` after a separately verified price/data provider supplies inputs. Financial decisions require independent validation and appropriate professional review where applicable.

## License

See `LICENSE`.
