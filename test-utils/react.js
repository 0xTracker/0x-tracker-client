import { createMemoryHistory } from 'history';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-testing-library';
import { Router } from 'react-router-dom';
import React from 'react';

import reducer from '../src/redux/reducer';

const withRedux = (
  component,
  { initialState, store = createStore(reducer, initialState) } = {},
) => ({
  component: <Provider store={store}>{component}</Provider>,
  store,
});

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

function renderWithRedux(component, options) {
  const wrappedComponent = withRedux(component, options);

  return {
    ...render(wrappedComponent.component),
    store: wrappedComponent.store,
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

export { renderWithAppContext, renderWithRedux, renderWithRouter, withRedux };
