import React from 'react';

import { renderWithRouter } from '../../../../test-utils/react';
import FillRelayerLink from './fill-relayer-link';

it('returns relayer link when trade has a relayer', () => {
  const fill = {
    relayer: {
      name: 'Google',
      slug: 'google',
      url: 'https://google.com',
    },
  };
  const { container } = renderWithRouter(<FillRelayerLink fill={fill} />);

  expect(container.firstChild).toMatchSnapshot();
});

it('returns "None" when the trade does not have a fee recipient', () => {
  const fill = {
    feeRecipient: '0x0000000000000000000000000000000000000000',
  };
  const { container } = renderWithRouter(<FillRelayerLink fill={fill} />);

  expect(container.firstChild).toMatchSnapshot();
});

it('returns a fee recipient link when the trade does not have a relayer but does have a fee recipient', () => {
  const fill = {
    feeRecipient: '0x004e344251110fa1cb09aa31c95c6598ed07dce6',
  };
  const { container } = renderWithRouter(<FillRelayerLink fill={fill} />);

  expect(container.firstChild).toMatchSnapshot();
});
