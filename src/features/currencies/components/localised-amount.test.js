import React from 'react';

import { renderWithAppContext } from '../../../../test-utils/react';
import LocalisedAmount from './localised-amount';

it('should render USD amount without conversion rates loaded', () => {
  const { container } = renderWithAppContext(
    <LocalisedAmount amount={500.2} />,
  );

  expect(container).toMatchSnapshot();
});

it('should render CNY amount when conversion rate is known', () => {
  const { container } = renderWithAppContext(
    <LocalisedAmount amount={500.2} />,
    {
      initialState: { preferences: { currency: 'CNY' }, rates: { CNY: 6.86 } },
    },
  );

  expect(container).toMatchSnapshot();
});

it('should render loading indicator when display currency is CNY and conversion rate is unknown', () => {
  const { container } = renderWithAppContext(
    <LocalisedAmount amount={500.2} />,
    {
      initialState: { preferences: { currency: 'CNY' } },
    },
  );

  expect(container).toMatchSnapshot();
});
