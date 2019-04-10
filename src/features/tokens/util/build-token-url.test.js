import buildTokenUrl from './build-token-url';

it('should build url for WETH', () => {
  const tokenAddress = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
  const url = buildTokenUrl(tokenAddress);

  expect(url).toBe('/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2');
});
