# Grafana Value Formats

Extract code about value formats from grafana repo and dis some slight changes.

## How to use

I publish this package to GitHub Packages. (TODO: how to use package from GitHub Packages)

The main function is `function getValueFormat(unitFormat: string): string {...}`, it will return a function whose signature is below:

```ts
export type ValueFormatter = (
  value: number,
  decimals?: DecimalCount,
  scaledDecimals?: DecimalCount,
  isUtc?: boolean
) => string
```

Samples: (copy from valueForamts.test.ts)

```ts
const str = getValueFormat("ms")(10000086.123, 1, null);
expect(str).toBe("2.8 hour");

const str = getValueFormat("kbytes")(10000000, 3, null);
expect(str).toBe("9.537 GiB");

const str = getValueFormat("deckbytes")(10000000, 3, null);
expect(str).toBe("10.000 GB");

const str = getValueFormat("ms")(1200, 0, 0);
expect(str).toBe("1.200 s");
```
