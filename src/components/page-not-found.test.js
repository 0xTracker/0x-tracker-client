import React from 'react';

import { renderWithRouter } from '../test-util/react';
import PageNotFound from './page-not-found';

describe('page not found component', () => {
  it('should render without props', () => {
    const { container } = renderWithRouter(<PageNotFound />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
