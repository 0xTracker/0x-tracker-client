import { render } from '@testing-library/react';
import React from 'react';

import PageLayout from './page-layout';

describe('page layout component', () => {
  it('should render with children', () => {
    const { container } = render(<PageLayout>Hello World</PageLayout>);

    expect(container.firstChild).toMatchSnapshot();
  });
});
