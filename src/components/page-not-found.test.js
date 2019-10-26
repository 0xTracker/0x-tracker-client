import React from 'react';

import { renderWithRouter } from '../test-util/react';
import { MockBreakpointProvider } from '../responsive-utils';
import PageNotFound from './page-not-found';

describe('page not found component', () => {
  it('should render without props', () => {
    const { container } = renderWithRouter(
      <MockBreakpointProvider value="xl">
        <PageNotFound />
      </MockBreakpointProvider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
