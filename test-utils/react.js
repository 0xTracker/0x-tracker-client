import { createMemoryHistory } from 'history';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-testing-library';
import { Router } from 'react-router-dom';
import React from 'react';

import reducer from '../src/redux/reducer';

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
    initialState,
    store = createStore(reducer, initialState),
  } = {},
) => ({
  ...render(
    <Provider store={store}>
      <Router history={history}>{component}</Router>
    </Provider>,
  ),
  history,
});

export { renderWithAppContext, renderWithRouter };
