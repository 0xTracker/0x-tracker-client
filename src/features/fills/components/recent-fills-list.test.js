import React from 'react';
import timekeeper from 'timekeeper';

import { renderWithRouter } from '../../../test-util/react';
import RecentFillsList from './recent-fills-list';

beforeAll(() => {
  timekeeper.freeze('2019-11-23T17:57:00Z');
});

afterAll(() => {
  timekeeper.reset();
});

it('should render an assortment of fills', () => {
  const fills = [
    {
      assets: [
        {
          amount: '1',
          price: {
            USD: 29.2429,
          },
          tokenAddress: '0x0e3a2a1f2146d86a604adc220b4967a898d7fe07',
          tokenId: 41011762,
          tokenSymbol: 'CARD',
          tokenType: 'Gods Unchained Cards',
          traderType: 'maker',
          type: 'erc-721',
        },
        {
          amount: '0.19',
          price: {
            USD: 153.91,
          },
          tokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          tokenSymbol: 'WETH',
          tokenType: 'Wrapped Ether',
          traderType: 'taker',
          type: 'erc-20',
        },
      ],
      date: '2019-11-23T17:38:44.000Z',
      feeRecipient: '0x0d056bb17ad4df5593b93a1efc29cb35ba4aa38d',
      id: '5dd96f9d250aa512ae416656',
      makerAddress: '0x5161e1380cd661d7d993c8a3b3e57b059ad8d7a4',
      status: 'successful',
      takerAddress: '0x76481caa104b5f6bccb540dae4cefaf1c398ebea',
      value: {
        USD: 29.2429,
      },
    },
    {
      assets: [
        {
          tokenAddress: '0x0e3a2a1f2146d86a604adc220b4967a898d7fe07',
          tokenId: 122150411,
          traderType: 'maker',
          type: 'erc-721',
        },
        {
          amount: '0.975',
          price: {
            USD: 153.91,
          },
          tokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          tokenSymbol: 'WETH',
          tokenType: 'Wrapped Ether',
          traderType: 'taker',
          type: 'erc-20',
        },
      ],
      date: '2019-11-23T17:38:01.000Z',
      feeRecipient: '0x0d056bb17ad4df5593b93a1efc29cb35ba4aa38d',
      id: '5dd96f6d250aa512ae40bad3',
      makerAddress: '0x55a9c5180dcafc98d99d3f3e4b248e9156b12ac1',
      status: 'successful',
      takerAddress: '0x76481caa104b5f6bccb540dae4cefaf1c398ebea',
      value: {
        USD: 150.06225,
      },
    },
    {
      assets: [
        {
          amount: '0.04030042144',
          price: {
            USD: 153.87,
          },
          tokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          tokenSymbol: 'WETH',
          tokenType: 'Wrapped Ether',
          traderType: 'maker',
          type: 'erc-20',
        },
        {
          amount: '2693',
          price: {
            USD: 0.002302646062745191,
          },
          tokenAddress: '0x503f9794d6a6bb0df8fbb19a2b3e2aeab35339ad',
          tokenSymbol: 'SBT',
          tokenType: 'Star Bit Token',
          traderType: 'taker',
          type: 'erc-20',
        },
      ],
      date: '2019-11-23T17:37:28.000Z',
      feeRecipient: '0x8124071f810d533ff63de61d0c98db99eeb99d64',
      id: '5dd96f3f250aa512ae3fb34a',
      makerAddress: '0x49cb7cedb65fcfeabb4d1dcb24d8da202d370eda',
      status: 'successful',
      takerAddress: '0x0681e844593a051e2882ec897ecd5444efe19ff2',
      value: {
        USD: 6.2010258469728,
      },
    },
    {
      assets: [
        {
          amount: '2693',
          price: {
            USD: 0.0022505749888953757,
          },
          tokenAddress: '0x503f9794d6a6bb0df8fbb19a2b3e2aeab35339ad',
          tokenSymbol: 'SBT',
          tokenType: 'Star Bit Token',
          traderType: 'maker',
          type: 'erc-20',
        },
        {
          tokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          traderType: 'taker',
          type: 'erc-20',
        },
      ],
      date: '2019-11-23T17:37:28.000Z',
      feeRecipient: '0x8124071f810d533ff63de61d0c98db99eeb99d64',
      id: '5dd96f3f250aa512ae3fb34d',
      makerAddress: '0x3997d0f55d1daa549e95c240bc6353636f4cf974',
      status: 'successful',
      takerAddress: '0x0681e844593a051e2882ec897ecd5444efe19ff2',
      value: {
        USD: 6.060798445095247,
      },
    },
  ];
  const { asFragment } = renderWithRouter(<RecentFillsList fills={fills} />);

  expect(asFragment()).toMatchSnapshot();
});
