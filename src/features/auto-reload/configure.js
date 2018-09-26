import initSubscriber from 'redux-subscriber';
import ms from 'ms';

import { reloadData } from './actions';

let timer = null;

const setTimer = store => {
  timer = setTimeout(() => {
    store.dispatch(reloadData());
    setTimer(store);
  }, ms(process.env.REACT_APP_AUTO_RELOAD_INTERVAL));
};

const configure = store => {
  const state = store.getState();
  const subscribe = initSubscriber(store);

  if (state.preferences.autoReload.enabled) {
    setTimer(store);
  }

  subscribe('preferences.autoReload.enabled', newState => {
    if (newState.preferences.autoReload.enabled) {
      setTimer(store);
    } else {
      clearTimeout(timer);
    }
  });
};

export default configure;
