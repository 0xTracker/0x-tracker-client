import { act, render } from '@testing-library/react';
import React from 'react';

import LoadingPage from './loading-page';

beforeAll(() => {
  jest.useFakeTimers();
});

it('should render loading page', () => {
  const { container } = render(<LoadingPage />);

  act(() => {
    jest.runAllTimers();
  });

  expect(container.firstChild).toMatchSnapshot();
});
