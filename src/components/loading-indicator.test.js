import { act, render } from '@testing-library/react';
import React from 'react';

import LoadingIndicator from './loading-indicator';

beforeAll(() => {
  jest.useFakeTimers();
});

it('should render after 300ms', () => {
  const { container } = render(<LoadingIndicator />);

  act(() => {
    jest.advanceTimersByTime(299);
  });

  expect(container.firstChild).toBeNull();

  act(() => {
    jest.advanceTimersByTime(1);
  });

  expect(container.firstChild).not.toBeNull();
});

it('renders spinner by default', () => {
  const { container } = render(<LoadingIndicator />);

  act(() => {
    jest.runAllTimers();
  });

  expect(container.firstChild).toMatchSnapshot();
});

it('renders cylon', () => {
  const { container } = render(<LoadingIndicator type="cylon" />);

  act(() => {
    jest.runAllTimers();
  });

  expect(container.firstChild).toMatchSnapshot();
});

it('renders centered indicator', () => {
  const { container } = render(<LoadingIndicator centered />);

  act(() => {
    jest.runAllTimers();
  });

  expect(container.firstChild).toMatchSnapshot();
});
