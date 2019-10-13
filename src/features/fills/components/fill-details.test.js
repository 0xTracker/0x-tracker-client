import _ from 'lodash';
import React from 'react';

import { renderWithRouter } from '../../../test-util/react';
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
  makerFee: { USD: 0, ZRX: '0' },
  orderHash:
    '0x8104d4c4a32da7f1df357779fe6b8fc11dc6f4287de54566fe22eb35a74b0c71',
  protocolVersion: 2,
  relayer: {
    imageUrl: 'https://0xtracker.com/assets/logos/radar-relay.png',
    name: 'Radar Relay',
    slug: 'radar-relay',
  },
  senderAddress: '0x0dc411b17d337af85d83ea5a3577d09132aae866',
  status: 'successful',
  takerAddress: '0x0dc411b17d337af85d83ea5a3577d09132aae866',
  takerFee: { USD: 0, ZRX: '0' },
  totalFees: { USD: 0, ZRX: '0' },
  transactionHash:
    '0x68e018d2c97cf76af6bae65297e6f5b6bc9680b95b828bdea5eb03a0b36ebc77',
  value: { USD: 184.292064 },
};

const simpleScreenSize = { lessThan: { sm: false } };

beforeAll(() => {
  // eslint-disable-next-line no-extend-native
  Date.prototype.getTimezoneOffset = _.constant(180); // Mock timezone as UTC-3
});

describe('fillDetails component', () => {
  it('should render V2 fill', () => {
    const { asFragment } = renderWithRouter(
      <FillDetails fill={simpleFill} screenSize={simpleScreenSize} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render V3 fill', () => {
    const fill = {
      ...simpleFill,
      makerFee: undefined,
      protocolFee: {
        ETH: '0.0001',
        USD: 0.2,
      },
      takerFee: undefined,
    };

    const { asFragment } = renderWithRouter(
      <FillDetails fill={fill} screenSize={simpleScreenSize} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
