import { fireEvent, cleanup } from 'react-testing-library';
import React from 'react';

import { renderWithRouter } from '../test-util/react';
import NavLink from './nav-link';

afterEach(() => {
  cleanup();
});

it('should render with url', () => {
  const { container } = renderWithRouter(
    <NavLink href="/trades/">Trades</NavLink>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

it('should render with active class when url matches current url', () => {
  const { container } = renderWithRouter(
    <NavLink href="/relayers">Relayers</NavLink>,
    { route: '/relayers' },
  );

  expect(container.firstChild).toHaveClass('active');
});

it('should call onClick handler when link is clicked', () => {
  const handleClick = jest.fn();
  const { getByText } = renderWithRouter(
    <NavLink onClick={handleClick}>Relayers</NavLink>,
  );

  fireEvent.click(getByText('Relayers'));

  expect(handleClick).toHaveBeenCalledTimes(1);
});
