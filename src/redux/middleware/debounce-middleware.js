const debounceMiddleware = () => {
  const timers = {};

  const middleware = () => dispatch => action => {
    const { meta = {}, type } = action;

    if (!meta) {
      return dispatch(action);
    }

    const { debounce = {} } = meta;

    const {
      time,
      key = type,
      cancel = false,
      leading = true,
      trailing = false,
    } = debounce;

    const shouldDebounce =
      ((time && key) || (cancel && key)) && (trailing || leading);
    const dispatchNow = leading && !timers[key];

    const later = resolve => () => {
      if (trailing && !dispatchNow) {
        resolve(dispatch(action));
      }
      timers[key] = null;
    };

    if (!shouldDebounce) {
      return dispatch(action);
    }

    if (timers[key]) {
      clearTimeout(timers[key]);
      timers[key] = null;
    }

    if (!cancel) {
      return new Promise(resolve => {
        if (dispatchNow) {
          resolve(dispatch(action));
        }
        timers[key] = setTimeout(later(resolve), time);
      });
    }

    return undefined;
  };

  middleware._timers = timers; // eslint-disable-line no-underscore-dangle

  return middleware;
};

export default debounceMiddleware;
