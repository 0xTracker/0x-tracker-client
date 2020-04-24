import { render } from '@testing-library/react';
import React from 'react';

import AssetAmount from './asset-amount';

describe('asset amount component', () => {
  it('should render amount for ERC-721 asset', () => {
    const { container } = render(
      <AssetAmount
        asset={{
          amount: '1',
          tokenAddress: '0x12345',
          tokenId: 999,
          tokenSymbol: 'CK',
          tokenType: 'CryptoKitties',
          type: 'erc-721',
        }}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render amount for ERC-20 asset', () => {
    const { container } = render(
      <AssetAmount
        asset={{
          amount: '150',
          tokenAddress: '0x12345',
          tokenSymbol: 'WETH',
          tokenType: 'Wrapped Ether',
          type: 'erc-20',
        }}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render null for unknown ERC-20 asset', () => {
    const { container } = render(
      <AssetAmount
        asset={{
          amount: null,
          tokenAddress: '0x12345',
          type: 'erc-20',
        }}
      />,
    );

    expect(container.firstChild).toBeNull();
  });
});
