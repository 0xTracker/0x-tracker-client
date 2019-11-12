import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import React from 'react';

function renderWithRouter(
  element,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {},
) {
  return {
    ...render(<Router history={history}>{element}</Router>),
    history,
  };
}

export { renderWithRouter };
