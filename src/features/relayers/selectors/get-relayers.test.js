import getRelayers from './get-relayers';

it('should return relayers as an array', () => {
  const state = {
    relayers: {
      radarRelay: {
        id: 'radarRelay',
        volume: 50000,
      },
      ddex: {
        id: 'ddex',
        volume: 25000,
      },
    },
  };

  const relayers = getRelayers(state);

  expect(relayers).toEqual([
    {
      id: 'radarRelay',
      volume: 50000,
    },
    {
      id: 'ddex',
      volume: 25000,
    },
  ]);
});
