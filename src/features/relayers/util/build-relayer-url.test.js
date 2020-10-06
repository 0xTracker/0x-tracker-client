import buildRelayerUrl from './build-relayer-url';

it('should build url for radar relay', () => {
  const url = buildRelayerUrl('radar-relay');

  expect(url).toBe('/apps/radar-relay');
});
