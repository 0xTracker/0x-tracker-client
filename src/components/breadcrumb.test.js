import React from 'react';

import { renderWithRouter } from '../../test-utils/react';
import Breadcrumb from './breadcrumb';

it('should render with items', () => {
  const { container } = renderWithRouter(
    <Breadcrumb
      items={[
        { title: 'Tokens', url: '/tokens' },
        { title: 'Ether', url: '/tokens/eth' },
      ]}
    />,
  );

  expect(container.firstChild).toMatchSnapshot();
});
