import buildAppUrl from './build-app-url';

it('should build url for radar relay', () => {
  const url = buildAppUrl('radar-relay');

  expect(url).toBe('/apps/radar-relay');
});
