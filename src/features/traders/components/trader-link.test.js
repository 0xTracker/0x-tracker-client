import React from 'react';

import { renderWithRouter } from '../../../test-util/react';
import TraderLink from './trader-link';

it('should render a trader link', () => {
  const { container } = renderWithRouter(
    <TraderLink address="0xb14232b0204b2f7bb6ba5aff59ef36030f7fe38b">
      Hello World
    </TraderLink>,
  );

  expect(container.firstChild).toMatchSnapshot();
});
