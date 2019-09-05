import buildApiUrl from './build-api-url';

describe('build api url', () => {
  it('should build V1 api url by default', () => {
    const url = buildApiUrl('relayers');

    expect(url).toBe('https://api.0xtracker.com/relayers');
  });

  it('should build V1 api url without parameters', () => {
    const url = buildApiUrl('relayers', undefined, { version: 1 });

    expect(url).toBe('https://api.0xtracker.com/relayers');
  });

  it('should build V1 api url with a single parameter', () => {
    const url = buildApiUrl(
      'relayers',
      { statsPeriod: 'week' },
      { version: 1 },
    );

    expect(url).toBe('https://api.0xtracker.com/relayers?statsPeriod=week');
  });

  it('should build V1 api url with multiple parameters', () => {
    const url = buildApiUrl(
      'relayers',
      {
        excludeInactive: true,
        statsPeriod: 'week',
      },
      { version: 1 },
    );

    expect(url).toBe(
      'https://api.0xtracker.com/relayers?excludeInactive=true&statsPeriod=week',
    );
  });

  it('should build V2 api url without parameters', () => {
    const url = buildApiUrl('tokens', undefined, { version: 2 });

    expect(url).toBe('https://api.0xtracker.com/v2/tokens');
  });

  it('should build V2 api url with a single parameter', () => {
    const url = buildApiUrl('tokens', { statsPeriod: 'week' }, { version: 2 });

    expect(url).toBe('https://api.0xtracker.com/v2/tokens?statsPeriod=week');
  });

  it('should build V2 api url with multiple parameters', () => {
    const url = buildApiUrl(
      'tokens',
      {
        statsPeriod: 'week',
        type: 'erc-20',
      },
      { version: 2 },
    );

    expect(url).toBe(
      'https://api.0xtracker.com/v2/tokens?statsPeriod=week&type=erc-20',
    );
  });
});
