import { storiesOf } from '@storybook/react';
import React from 'react';

import Card from '../../../components/card';
import FillDetails from './fill-details';

const simpleFill = {
  assets: [
    {
      amount: '0.96955',
      price: { USD: 190.08 },
      tokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      tokenSymbol: 'WETH',
      tokenType: 'Wrapped Ether',
      traderType: 'maker',
      type: 'erc-20',
    },
    {
      amount: '5000',
      price: { USD: 0.036858412800000004 },
      tokenAddress: '0x4946fcea7c692606e8908002e55a582af44ac121',
      tokenSymbol: 'FOAM',
      tokenType: 'FOAM Token',
      traderType: 'taker',
      type: 'erc-20',
    },
  ],
  date: '2019-10-10T09:13:48.000Z',
  feeRecipient: '0xa258b39954cef5cb142fd567a46cddb31a670124',
  id: '5d9ef747e3fcbb000467cbf5',
  makerAddress: '0x2cfb4faaece38d5d03ef1ec9dfdf34964d6ab1b3',
  makerFee: { USD: 0.1, ZRX: '0.3' },
  orderHash:
    '0x8104d4c4a32da7f1df357779fe6b8fc11dc6f4287de54566fe22eb35a74b0c71',
  protocolVersion: 1,
  relayer: {
    imageUrl: 'https://0xtracker.com/assets/logos/radar-relay.png',
    name: 'Radar Relay',
    slug: 'radar-relay',
  },
  status: 'successful',
  takerAddress: '0x0dc411b17d337af85d83ea5a3577d09132aae866',
  takerFee: { USD: 0.2, ZRX: '0.6' },
  totalFees: { USD: 0.3, ZRX: '0.9' },
  transactionHash:
    '0x68e018d2c97cf76af6bae65297e6f5b6bc9680b95b828bdea5eb03a0b36ebc77',
  value: { USD: 184.292064 },
};

const screenSize = { lessThan: { sm: false } };

storiesOf('Fills|FillDetails', module)
  .addDecorator(getStory => <Card padded>{getStory()}</Card>)
  .add('v1', () => <FillDetails fill={simpleFill} screenSize={screenSize} />)
  .add('v2', () => (
    <FillDetails
      fill={{
        ...simpleFill,
        protocolVersion: 2,
        senderAddress: '0x0dc411b17d337af85d83ea5a3577d09132aae866',
      }}
      screenSize={screenSize}
    />
  ))
  .add('v3', () => (
    <FillDetails
      fill={{
        ...simpleFill,
        fees: [
          {
            amount: { USD: 0.3, token: '0.005' },
            token: {
              address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
              id: undefined,
              name: 'Wrapped Ether',
              symbol: 'WETH',
              type: 'erc-20',
            },
            traderType: 'maker',
          },
          {
            amount: { USD: undefined, token: '1' },
            token: {
              address: '0xf5b0a3efb8e8e4c201e2a935f110eaaf3ffecb8d',
              id: 58,
              name: 'Axie',
              symbol: 'AXIE',
              type: 'erc-721',
            },
            traderType: 'taker',
          },
        ],
        makerFee: undefined,
        protocolFee: { ETH: '0.00109933', USD: 0.2 },
        protocolVersion: 3,
        senderAddress: '0x0dc411b17d337af85d83ea5a3577d09132aae866',
        takerFee: undefined,
      }}
      screenSize={screenSize}
    />
  ))
  .add('with multiple maker fees', () => (
    <FillDetails
      fill={{
        ...simpleFill,
        fees: [
          {
            amount: { USD: 0.3, token: '0.005' },
            token: {
              address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
              id: undefined,
              name: 'Wrapped Ether',
              symbol: 'WETH',
              type: 'erc-20',
            },
            traderType: 'maker',
          },
          {
            amount: { USD: undefined, token: '1' },
            token: {
              address: '0xf5b0a3efb8e8e4c201e2a935f110eaaf3ffecb8d',
              id: 58,
              name: 'Axie',
              symbol: 'AXIE',
              type: 'erc-721',
            },
            traderType: 'taker',
          },
          {
            amount: { USD: 0.5, token: '0.01' },
            token: {
              address: '0x0dc411b17d337af85d83ea5a3577d09132aae866',
              name: 'Wrapped Fubar',
              symbol: 'FUBAR',
              type: 'erc-20',
            },
            traderType: 'maker',
          },
        ],
        makerFee: undefined,
        protocolFee: { ETH: '0.00109933', USD: 0.2 },
        protocolVersion: 3,
        senderAddress: '0x0dc411b17d337af85d83ea5a3577d09132aae866',
        takerFee: undefined,
      }}
      screenSize={screenSize}
    />
  ))
  .add('without fees', () => (
    <FillDetails
      fill={{
        ...simpleFill,
        makerFee: { USD: 0, ZRX: '0' },
        takerFee: { USD: 0, ZRX: '0' },
        totalFees: { USD: 0, ZRX: '0' },
      }}
      screenSize={screenSize}
    />
  ))
  .add('with unknown relayer', () => (
    <FillDetails
      fill={{
        ...simpleFill,
        relayer: undefined,
      }}
      screenSize={screenSize}
    />
  ))
  .add('without relayer', () => (
    <FillDetails
      fill={{
        ...simpleFill,
        feeRecipient: '0x0000000000000000000000000000000000000000',
        relayer: undefined,
      }}
      screenSize={screenSize}
    />
  ))
  .add('without value', () => (
    <FillDetails
      fill={{
        ...simpleFill,
        value: undefined,
      }}
      screenSize={screenSize}
    />
  ))
  .add('without derived prices', () => (
    <FillDetails
      fill={{
        ...simpleFill,
        assets: simpleFill.assets.map(asset => ({
          ...asset,
          price: undefined,
        })),
      }}
      screenSize={screenSize}
    />
  ))
  .add('with unrecognised assets', () => (
    <FillDetails
      fill={{
        ...simpleFill,
        assets: simpleFill.assets.map(asset => ({
          ...asset,
          amount: undefined,
          price: undefined,
          tokenSymbol: undefined,
          tokenType: undefined,
        })),
      }}
      screenSize={screenSize}
    />
  ));
