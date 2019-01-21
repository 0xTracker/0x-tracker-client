import React from 'react';

import { renderWithAppContext } from '../test-util/react';
import PageNotFound from './page-not-found';

describe('page not found component', () => {
  it('should render without props', () => {
    const { container } = renderWithAppContext(<PageNotFound />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
