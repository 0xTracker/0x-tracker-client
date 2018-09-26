import buildSearchUrl from './build-search-url';

it('should build url for search', () => {
  const url = buildSearchUrl('fancy hank');

  expect(url).toBe('/search?q=fancy%20hank');
});
