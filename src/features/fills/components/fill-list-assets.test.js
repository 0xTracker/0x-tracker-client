import { render } from 'react-testing-library';
import React from 'react';

import FillListAssets from './fill-list-assets';

const erc20Asset = {
  amount: '150',
  tokenAddress: '0x12345',
  tokenSymbol: 'WETH',
  tokenType: 'Wrapped Ether',
  type: 'erc-20',
};

const erc721Asset = {
  amount: '1',
  tokenAddress: '0x12345',
  tokenId: 999,
  tokenSymbol: 'CK',
  tokenType: 'CryptoKitties',
  type: 'erc-721',
};

describe('fill list assets component', () => {
  it('should render for multiple assets', () => {
    const assets = [erc20Asset, erc721Asset];
    const { container } = render(<FillListAssets assets={assets} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render for ERC-20 asset', () => {
    const assets = [erc20Asset];
    const { container } = render(<FillListAssets assets={assets} />);

    expect(container).toMatchSnapshot();
  });

  it('should render for ERC-721 asset', () => {
    const assets = [erc721Asset];
    const { container } = render(<FillListAssets assets={assets} />);

    expect(container).toMatchSnapshot();
  });
});
