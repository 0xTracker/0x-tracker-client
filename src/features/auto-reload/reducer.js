import Immutable from 'seamless-immutable';
import uuid from 'uuid/v1';

import { RELOAD_DATA } from './actions';

const initialState = {
  key: null,
};

const reducer = (state = initialState, action = {}) => {
  const reducers = {
    [RELOAD_DATA]: () => Immutable.set(state, 'key', uuid()),
  };

  return reducers[action.type] !== undefined ? reducers[action.type]() : state;
};

export default reducer;
