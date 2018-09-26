import { render } from 'react-testing-library';
import React from 'react';

import LoadingIndicator from './loading-indicator';

it('renders spinner by default', () => {
  const { container } = render(<LoadingIndicator />);

  expect(container.firstChild).toMatchSnapshot();
});

it('renders cylon', () => {
  const { container } = render(<LoadingIndicator type="cylon" />);

  expect(container.firstChild).toMatchSnapshot();
});

it('renders centered indicator', () => {
  const { container } = render(<LoadingIndicator isCentered />);

  expect(container.firstChild).toMatchSnapshot();
});
