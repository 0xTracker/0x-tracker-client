import _ from 'lodash';

const listeners = [];

const addListener = listener => {
  listeners.push(listener);
};

const removeListener = listener => {
  // eslint-disable-next-line lodash/prefer-immutable-method
  _.pull(listeners, listener);
};

const initialize = interval => {
  setInterval(() => {
    listeners.forEach(listener => {
      listener();
    });
  }, interval);
};

const AutoReload = {
  addListener,
  initialize,
  removeListener,
};

export default AutoReload;
