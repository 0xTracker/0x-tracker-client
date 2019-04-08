import React from 'react';

import { renderWithRouter } from '../../../test-util/react';
import AssetLabel from './asset-label';

describe('asset label component', () => {
  it('should render for ERC-20 asset', () => {
    const { container } = renderWithRouter(
      <AssetLabel
        asset={{
          tokenAddress: '0x12345',
          tokenSymbol: 'WETH',
          tokenType: 'Wrapped Ether',
          type: 'erc-20',
        }}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render for ERC-721 asset', () => {
    const { container } = renderWithRouter(
      <AssetLabel
        asset={{
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

  it('should render for unknown token', () => {
    const { container } = renderWithRouter(
      <AssetLabel
        asset={{
          tokenAddress: '0x12345',
          tokenId: 999,
          type: 'erc-721',
        }}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
