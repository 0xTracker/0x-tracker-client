import _ from 'lodash';

let listeners = [];
let interval;

const addListener = (listener) => {
  listeners.push(listener);
};

const getListeners = () => listeners;

const removeListener = (listenerToRemove) => {
  listeners = _.without(listeners, listenerToRemove);
};

const start = (ms) => {
  interval = setInterval(() => {
    if (document.hidden) {
      console.info('skipped automatic reloading of data');
    } else {
      console.info('automatically reloading data');
      listeners.forEach((listener) => {
        listener();
      });
    }
  }, ms);
};

const clearListeners = () => {
  listeners = [];
};

const stop = () => {
  clearInterval(interval);
};

const AutoReload = {
  addListener,
  clearListeners,
  getListeners,
  removeListener,
  start,
  stop,
};

export default AutoReload;
