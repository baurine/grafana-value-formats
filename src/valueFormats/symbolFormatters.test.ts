import { currency } from './symbolFormatters';

describe('Currency', () => {
  it('should format as usd', () => {
    // expect(currency('$')(1532.82, 1, -1)).toEqual('$1.53K');
    expect(currency('$')(1532, 0, 2)).toEqual('$1.53K')
    expect(currency('$')(532, 0, 2)).toEqual('$532')
  })
})
