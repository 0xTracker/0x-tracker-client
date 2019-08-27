import formatTokenAmount from './format-token-amount';

it('should return "0" when amount is 0', () => {
  expect(formatTokenAmount(0)).toBe('0');
});

it('should return "0" when amount is "0"', () => {
  expect(formatTokenAmount('0')).toBe('0');
});

it('should return "150" when amount is 150.000', () => {
  expect(formatTokenAmount(150.0)).toBe('150');
});

it('should return "150,000" when amount is 150000.000', () => {
  expect(formatTokenAmount(150000.0)).toBe('150,000');
});

it('should return "0.0000003" when amount is 0.000000287323296172', () => {
  expect(formatTokenAmount(0.000000287323296172)).toBe('0.0000003');
});

it('should return "0.001" when amount is 0.001', () => {
  expect(formatTokenAmount(0.001)).toBe('0.001');
});

it('should return "0.0000001" when amount is 0.000000087323296172', () => {
  expect(formatTokenAmount(0.000000087323296172)).toBe('0.0000001');
});

it('should return "0.000000003" when amount is 0.000000003323296172', () => {
  expect(formatTokenAmount(0.000000003323296172)).toBe('0.000000003');
});

it('should return null when amount is null', () => {
  expect(formatTokenAmount(null)).toBeNull();
});

it('should return null when amount is undefined', () => {
  expect(formatTokenAmount(undefined)).toBeNull();
});

it('should return null when amount is "fubar"', () => {
  expect(formatTokenAmount('fubar')).toBeNull();
});
