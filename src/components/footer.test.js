import { getByText } from 'react-testing-library';
import React from 'react';
import timekeeper from 'timekeeper';

import { renderWithRouter } from '../../test-utils/react';
import Footer from './footer';

beforeAll(() => {
  timekeeper.freeze('2019-10-07');
});

afterAll(() => {
  timekeeper.reset();
});

it('should render without props', () => {
  const { container } = renderWithRouter(<Footer />);

  expect(container.firstChild).toMatchSnapshot();
});

it('should render with the current year', () => {
  const { container } = renderWithRouter(<Footer />);

  getByText(container, 'Copyright © 0x Tracker 2019');
});
