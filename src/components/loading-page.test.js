import { render } from 'react-testing-library';
import React from 'react';

import LoadingPage from './loading-page';

it('should render loading page', () => {
  const { container } = render(<LoadingPage />);

  expect(container.firstChild).toMatchSnapshot();
});
