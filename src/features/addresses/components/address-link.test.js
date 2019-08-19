import React from 'react';

import { renderWithRouter } from '../../../test-util/react';
import AddressLink from './address-link';

it('should render an address link', () => {
  const { container } = renderWithRouter(
    <AddressLink address="0xb14232b0204b2f7bb6ba5aff59ef36030f7fe38b">
      Hello World
    </AddressLink>,
  );

  expect(container.firstChild).toMatchSnapshot();
});
