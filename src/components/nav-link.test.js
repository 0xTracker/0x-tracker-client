import { Simulate } from 'react-testing-library';
import React from 'react';

import { renderWithRouter } from '../../test-utils/react';
import NavLink from './nav-link';

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
  const onClick = jest.fn();
  const { queryByText } = renderWithRouter(
    <NavLink currentUrl="/relayers" onClick={onClick}>
      Relayers
    </NavLink>,
  );

  Simulate.click(queryByText('Relayers'));

  expect(onClick).toHaveBeenCalledTimes(1);
});
