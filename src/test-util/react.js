import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { render } from 'react-testing-library';
import { Router } from 'react-router-dom';
import React from 'react';

import storeFactory from '../redux/store-factory';

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

const renderWithAppContext = (
  component,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {},
) => {
  const { store } = storeFactory();

  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{component}</Router>
      </Provider>,
    ),
    history,
  };
};

export { renderWithAppContext, renderWithRouter };
