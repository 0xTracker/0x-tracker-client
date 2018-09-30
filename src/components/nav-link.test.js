import { fireEvent, cleanup } from 'react-testing-library';
import React from 'react';

import { renderWithRouter } from '../../test-utils/react';
import NavLink from './nav-link';

afterEach(() => {
  cleanup();
});

it('should render with url', () => {
  const { container } = renderWithRouter(
    <NavLink currentUrl="/" url="/trades/">
      Trades
    </NavLink>,
  );

  expect(container.firstChild).toMatchSnapshot();
});

it('should render with active class when url matches current url', () => {
  const { container } = renderWithRouter(
    <NavLink currentUrl="/relayers" url="/relayers">
      Relayers
    </NavLink>,
  );

  expect(container.firstChild).toHaveClass('active');
});

it('should call onClick handler when link is clicked', () => {
  const handleClick = jest.fn();
  const { getByText } = renderWithRouter(
    <NavLink currentUrl="/relayers" onClick={handleClick}>
      Relayers
    </NavLink>,
  );

  fireEvent.click(getByText('Relayers'));

  expect(handleClick).toHaveBeenCalledTimes(1);
});
