import { render } from 'react-testing-library';
import React from 'react';

import PageLayout from './page-layout';

describe('page layout component', () => {
  it('should render with children', () => {
    const { container } = render(<PageLayout>Hello World</PageLayout>);

    expect(container.firstChild).toMatchSnapshot();
  });
});
