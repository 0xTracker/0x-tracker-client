import { render, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';

import RelayerTokensCard from './relayer-tokens-card';

const firstPageFixture = {
  limit: 5,
  page: 1,
  pageCount: 3,
  sortBy: 'tradeVolumeUSD',
  statsPeriod: 'month',
  tokens: [
    {
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      imageUrl:
        'https://cdn.staticaly.com/gh/TrustWallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png',
      name: 'Dai Stablecoin',
      stats: {
        fillCount: 186,
        fillVolume: {
          USD: 245139.60284753318,
          token: 243135.25799914755,
        },
        tradeCount: 186,
        tradeVolume: {
          USD: 245139.60284753318,
          token: 243135.25799914755,
        },
      },
      symbol: 'DAI',
    },
    {
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      imageUrl:
        'https://cdn.staticaly.com/gh/TrustWallet/tokens/master/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
      name: 'Wrapped Ether',
      stats: {
        fillCount: 254,
        fillVolume: { USD: 235336.5038340606, token: 1142.7720893341211 },
        tradeCount: 254,
        tradeVolume: {
          USD: 235336.5038340606,
          token: 1142.7720893341211,
        },
      },
      symbol: 'WETH',
    },
    {
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      imageUrl:
        'https://cdn.staticaly.com/gh/TrustWallet/tokens/master/tokens/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png',
      name: 'USD Coin',
      stats: {
        fillCount: 103,
        fillVolume: { USD: 95918.67831562021, token: 95915.88443742646 },
        tradeCount: 103,
        tradeVolume: { USD: 95918.67831562021, token: 95915.88443742646 },
      },
      symbol: 'USDC',
    },
    {
      address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      imageUrl:
        'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png',
      name: 'Wrapped BTC',
      stats: {
        fillCount: 33,
        fillVolume: { USD: 31074.65473106969, token: 3.361475805486066 },
        tradeCount: 33,
        tradeVolume: { USD: 31074.65473106969, token: 3.361475805486066 },
      },
      symbol: 'WBTC',
    },
    {
      address: '0x0000000000085d4780b73119b644ae5ecd22b376',
      imageUrl:
        'https://cdn.staticaly.com/gh/TrustWallet/tokens/master/tokens/0x0000000000085d4780b73119b644ae5ecd22b376.png',
      name: 'TrueUSD',
      stats: {
        fillCount: 29,
        fillVolume: { USD: 27481.19657944888, token: 27482.028551455587 },
        tradeCount: 29,
        tradeVolume: {
          USD: 27481.19657944888,
          token: 27482.028551455587,
        },
      },
      symbol: 'TUSD',
    },
  ],
  total: 15,
};

const secondPageFixture = {
  limit: 5,
  page: 2,
  pageCount: 3,
  sortBy: 'tradeVolumeUSD',
  statsPeriod: 'month',
  tokens: [
    {
      address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      imageUrl:
        'https://cdn.staticaly.com/gh/TrustWallet/tokens/master/tokens/0xdac17f958d2ee523a2206206994597c13d831ec7.png',
      name: 'Tether USD',
      stats: {
        fillCount: 6,
        fillVolume: { USD: 10689.739242553711, token: 10691.000434875488 },
        tradeCount: 6,
        tradeVolume: { USD: 10689.739242553711, token: 10691.000434875488 },
      },
      symbol: 'USDT',
    },
    {
      address: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
      imageUrl:
        'https://cdn.staticaly.com/gh/TrustWallet/tokens/master/tokens/0x0d8775f648430679a709e98d2b0cb6250d2887ef.png',
      name: 'Basic Attention Token',
      stats: {
        fillCount: 16,
        fillVolume: { USD: 7127.229595541954, token: 32564.098303318024 },
        tradeCount: 16,
        tradeVolume: { USD: 7127.229595541954, token: 32564.098303318024 },
      },
      symbol: 'BAT',
    },
    {
      address: '0x58b6a8a3302369daec383334672404ee733ab239',
      imageUrl:
        'https://cdn.staticaly.com/gh/TrustWallet/tokens/master/tokens/0x58b6a8a3302369daec383334672404ee733ab239.png',
      name: 'Livepeer Token',
      stats: {
        fillCount: 24,
        fillVolume: { USD: 6457.807775579509, token: 3175.7171789224376 },
        tradeCount: 24,
        tradeVolume: { USD: 6457.807775579509, token: 3175.7171789224376 },
      },
      symbol: 'LPT',
    },
    {
      address: '0x514910771af9ca656af840dff83e8264ecf986ca',
      imageUrl:
        'https://cdn.staticaly.com/gh/TrustWallet/tokens/master/tokens/0x514910771af9ca656af840dff83e8264ecf986ca.png',
      name: 'ChainLink Token',
      stats: {
        fillCount: 6,
        fillVolume: { USD: 6215.98365098238, token: 1619.2568177506328 },
        tradeCount: 6,
        tradeVolume: { USD: 6215.98365098238, token: 1619.2568177506328 },
      },
      symbol: 'LINK',
    },
    {
      address: '0xe41d2489571d322189246dafa5ebde1f4699f498',
      imageUrl:
        'https://cdn.staticaly.com/gh/TrustWallet/tokens/master/tokens/0xe41d2489571d322189246dafa5ebde1f4699f498.png',
      name: '0x Protocol Token',
      stats: {
        fillCount: 60,
        fillVolume: { USD: 4572.230743514374, token: 16027.991282400617 },
        tradeCount: 60,
        tradeVolume: { USD: 4572.230743514374, token: 16027.991282400617 },
      },
      symbol: 'ZRX',
    },
  ],
  total: 15,
};

// eslint-disable-next-line jest/lowercase-name
describe('RelayerTokensCard', () => {
  it('should render first page of results', async () => {
    const mock = new MockAdapter(axios);

    mock
      .onGet(
        'https://api.0xtracker.com/relayers/radar-relay/tokens?limit=5&page=1&sortBy=tradeVolumeUSD&statsPeriod=month',
      )
      .reply(200, firstPageFixture);

    const { asFragment } = render(
      <RelayerTokensCard
        limit={5}
        relayerSlug="radar-relay"
        statsPeriod="month"
      />,
    );

    await waitFor(() => expect(mock.history.get).toHaveLength(1));

    expect(asFragment()).toMatchSnapshot();
  });

  it('should navigate to second page of results', async () => {
    const mock = new MockAdapter(axios);

    mock
      .onGet(
        'https://api.0xtracker.com/relayers/radar-relay/tokens?limit=5&page=1&sortBy=tradeVolumeUSD&statsPeriod=month',
      )
      .reply(200, firstPageFixture);

    mock
      .onGet(
        'https://api.0xtracker.com/relayers/radar-relay/tokens?limit=5&page=2&sortBy=tradeVolumeUSD&statsPeriod=month',
      )
      .reply(200, secondPageFixture);

    const { asFragment, findByTitle } = render(
      <RelayerTokensCard
        limit={5}
        relayerSlug="radar-relay"
        statsPeriod="month"
      />,
    );

    const nextPageButton = await findByTitle('Move to next page');

    fireEvent.click(nextPageButton);

    await waitFor(() => expect(mock.history.get).toHaveLength(2));

    expect(asFragment()).toMatchSnapshot();
  });
});
