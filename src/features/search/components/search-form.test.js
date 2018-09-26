import React from 'react';

import SearchForm from './search-form';
import { renderWithRouter } from '../../../../test-utils/react';

it('should render without props', () => {
  const { container } = renderWithRouter(<SearchForm />);

  expect(container.firstChild).toMatchSnapshot();
});
