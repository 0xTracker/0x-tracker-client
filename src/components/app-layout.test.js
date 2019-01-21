import React from 'react';

import { renderWithAppContext } from '../test-util/react';
import AppLayout from './app-layout';

describe('app layout component', () => {
  it('should render with children', () => {
    const { container } = renderWithAppContext(
      <AppLayout>Hello World</AppLayout>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
