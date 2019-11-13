import React from 'react';

import { renderWithRouter } from '../test-util/react';
import Footer from './footer';

it('should render without props', () => {
  const { container } = renderWithRouter(<Footer />);

  expect(container.firstChild).toMatchSnapshot();
});
