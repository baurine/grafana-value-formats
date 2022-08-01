import { toFixed, getValueFormat, scaledUnits } from './valueFormats';

describe('valueFormats', () => {
  describe('normal cases', () => {
    it('toFixed should handle number correctly if decimal is null', () => {
      expect(toFixed(100)).toBe('100');

      expect(toFixed(100.4)).toBe('100');
      expect(toFixed(100.5)).toBe('101');
    });

    it('toFixed should handle number correctly if decimal is not null', () => {
      expect(toFixed(100, 1)).toBe('100.0');

      expect(toFixed(100.37, 1)).toBe('100.4');
      expect(toFixed(100.63, 1)).toBe('100.6');

      expect(toFixed(100.4, 2)).toBe('100.40');
      expect(toFixed(100.5, 2)).toBe('100.50');
    });

    it('scaledUnit should handle number correctly if scaledDecimals is not null', () => {
      const units = ['', 'K', 'M', 'B', 'T'];
      const scaler = scaledUnits(1000, units);

      expect(scaler(765, 0, 2)).toBe('765');
      expect(scaler(765, 0, 3)).toBe('765');

      // expect(scaler(98765, 0, 0)).toBe('98.765K');
      // expect(scaler(98765, 0, -1)).toBe('98.77K');
      expect(scaler(98765, 0, 2)).toBe('98.77K');
      expect(scaler(98765, 0, 3)).toBe('98.765K');

      // expect(scaler(9876543, 0, 0)).toBe('9.876543M');
      // expect(scaler(9876543, 0, -1)).toBe('9.87654M');
    });

    it('scaledUnit should handle number correctly if scaledDecimals is null', () => {
      const units = ['', 'K', 'M', 'B', 'T'];
      const scaler = scaledUnits(1000, units);

      expect(scaler(98765, 0, null)).toBe('99K');
      expect(scaler(98765, 1, null)).toBe('98.8K');
      expect(scaler(98765, 2, null)).toBe('98.77K');

      expect(scaler(9876543, 0, null)).toBe('10M');
      expect(scaler(9876543, 1, null)).toBe('9.9M');
      expect(scaler(9876543, 2, null)).toBe('9.88M');
      expect(scaler(9876543, 3, null)).toBe('9.877M');
    });
  });

  describe('format edge cases', () => {
    const negInf = Number.NEGATIVE_INFINITY.toLocaleString();
    const posInf = Number.POSITIVE_INFINITY.toLocaleString();

    it('toFixed should handle non number input gracefully', () => {
      expect(toFixed(NaN)).toBe('NaN');
      expect(toFixed(Number.NEGATIVE_INFINITY)).toBe(negInf);
      expect(toFixed(Number.POSITIVE_INFINITY)).toBe(posInf);
    });

    it('scaledUnits should handle non number input gracefully', () => {
      const disp = scaledUnits(5, ['a', 'b', 'c']);
      expect(disp(NaN)).toBe('NaN');
      expect(disp(Number.NEGATIVE_INFINITY)).toBe(negInf);
      expect(disp(Number.POSITIVE_INFINITY)).toBe(posInf);
    });
  });

  describe('toFixed and negative decimals', () => {
    it('should treat as zero decimals', () => {
      const str = toFixed(186.123, -2);
      expect(str).toBe('186');
    });
  });

  describe('ms format when scaled decimals is null do not use it', () => {
    it('should use specified decimals', () => {
      const str1 = getValueFormat('ms')(10000086.123, 0, null);
      expect(str1).toBe('3 hour');

      const str2 = getValueFormat('ms')(10000086.123, 1, null);
      expect(str2).toBe('2.8 hour');
    });
  });

  describe('kbytes format when scaled decimals is null do not use it', () => {
    it('should use specified decimals', () => {
      const str = getValueFormat('kbytes')(10000000, 3, null);
      expect(str).toBe('9.537 GiB');
    });
  });

  describe('deckbytes format when scaled decimals is null do not use it', () => {
    it('should use specified decimals', () => {
      const str = getValueFormat('deckbytes')(10000000, 3, null);
      expect(str).toBe('10.000 GB');
    });
  });

  describe('ms format when scaled decimals is 0', () => {
    it('should use scaledDecimals and add 3', () => {
      const str = getValueFormat('ms')(1200, 0, 0);
      expect(str).toBe('1.200 s');
    });
  });

  describe('Data Rate (IEC) format ', () => {
    it('Bps should format number correctly if decimal is null', () => {
      expect(getValueFormat('Bps')(1000)).toBe('1000 Bs');
      expect(getValueFormat('Bps')(1024)).toBe('1 KiBs');
      expect(getValueFormat('Bps')(100000)).toBe('98 KiBs');
    });

    it('Bps should handle number correctly if decimal is not null', () => {
      expect(getValueFormat('Bps')(1024.38, 2)).toBe('1.00 KiBs');
      expect(getValueFormat('Bps')(1000.41, 1)).toBe('1000.4 Bs');
    });

    it('Bps should handle number correctly if scaledDecimals is not null', () => {
      expect(getValueFormat('Bps')(1024.33, 2, 3)).toBe('1.000 KiBs');
    });

    it('Bps should handle number correctly if scaledDecimals is null', () => {
      expect(getValueFormat('Bps')(1024.33, 2, null)).toBe('1.00 KiBs');
    });
  });

  describe('Data Rate (Metric) format ', () => {
    it('decBps should format number correctly if decimal is null', () => {
      expect(getValueFormat('decBps')(1000)).toBe('1 kBs');
      expect(getValueFormat('decBps')(1050)).toBe('1 kBs');
      expect(getValueFormat('decBps')(100000)).toBe('100 kBs');

      console.log(getValueFormat('decBps')(1024), getValueFormat('decBps')(100000))
    });

    it('decBps should handle number correctly if decimal is not null', () => {
      expect(getValueFormat('decBps')(1024.38, 2)).toBe('1.02 kBs');
      expect(getValueFormat('decBps')(1000.41, 1)).toBe('1.0 kBs');
    });

    it('decBps should handle number correctly if scaledDecimals is not null', () => {
      expect(getValueFormat('decBps')(1024.33, 2, 3)).toBe('1.024 kBs');
    });

    it('decBps should handle number correctly if scaledDecimals is null', () => {
      expect(getValueFormat('decBps')(1024.33, 2, null)).toBe('1.02 kBs');
    });
  });
});
