# Grafana Value Formats

Extract code about value formats from grafana repo and did some slight changes.

## How to use

### Install

```sh
$ npm install @baurine/grafana-value-formats
// or
$ yarn add @baurine/grafana-value-formats
```

(I publish this package to npm registry and GitHub Packages both.)

### Use

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
// if scaledDecimals is null, use decimals
const str = getValueFormat('ms')(10000086.123, 0, null)
expect(str).toBe('3 hour')

const str = getValueFormat('ms')(10000086.123, 1, null)
expect(str).toBe('2.8 hour')

const str = getValueFormat('kbytes')(10000000, 3, null)
expect(str).toBe('9.537 GiB')

const str = getValueFormat('deckbytes')(10000000, 3, null)
expect(str).toBe('10.000 GB')

// if scaledDecimals is not null, use scaledDecimals, ignore decimals
const str = getValueFormat('ms')(1200, 0, 0)
expect(str).toBe('1.200 s')
```

You can find all `unitFormat` we can use in the `categories.ts`, or exported `getValueFormats()` function.

## Release Notes

### 1.0.2

- Nothing changes, just bump version

### 1.0.1

- Add "qps" unit ([#4](https://github.com/baurine/grafana-value-formats/pull/4))

### 1.0.0

#### Breaking Changes

1. Change a part implementation of `scaledUnits()` method in `src/valueFormats/valueFormats.ts` line 126:

   ```ts
   if (steps > 0 && scaledDecimals !== null && scaledDecimals !== undefined) {
     // old logic
     // decimals = scaledDecimals + 3 * steps; // 为什么是乘以 3，大概是以 factor = 1000 为准，1000 表示 3 个小数点

     // current logic
     // related issue: https://github.com/grafana/grafana/issues/23561
     decimals = scaledDecimals
   }
   ```

   So at before

   ```ts
   expect(scaler(98765, 0, 2)).toBe('98.76500K')
   // because the decimals = 1*3 + 2
   ```

   and now

   ```ts
   expect(scaler(98765, 0, 2)).toBe('98.77K')
   // because the decimals = 2
   ```
