import getRelayers from './get-relayers';

it('should return relayers as an array', () => {
  const state = {
    relayers: {
      ddex: {
        id: 'ddex',
        volume: 25000,
      },
      radarRelay: {
        id: 'radarRelay',
        volume: 50000,
      },
    },
  };

  const relayers = getRelayers(state);

  expect(relayers).toEqual([
    {
      id: 'ddex',
      volume: 25000,
    },
    {
      id: 'radarRelay',
      volume: 50000,
    },
  ]);
});
