import buildRelayerUrl from './build-relayer-url';

it('should build url for radar relay', () => {
  const relayer = {
    slug: 'radar-relay',
  };
  const url = buildRelayerUrl(relayer);

  expect(url).toBe('/relayers/radar-relay');
});
