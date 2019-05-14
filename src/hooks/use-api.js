import { useEffect, useState } from 'react';

import callApi from '../util/call-api';
import AutoReload from '../util/auto-reload';

const useApi = (method, options = {}, deps = []) => {
  const [state, setState] = useState({ loading: true });

  useEffect(() => {
    setState({ loading: true });

    const performApiCall = () =>
      callApi(method, options.params, { version: options.version });

    const reload = () => {
      performApiCall()
        // eslint-disable-next-line promise/prefer-await-to-then
        .then(response => {
          setState({ loading: false, response });

          return undefined;
        })
        .catch(error => {
          console.error(error);
          // TODO: Log error
        });
    };

    performApiCall()
      // eslint-disable-next-line promise/prefer-await-to-then
      .then(response => {
        setState({ loading: false, response });

        if (options.autoReload) {
          AutoReload.addListener(reload);
        }

        return undefined;
      })
      .catch(error => {
        setState({ error, loading: false });
      });

    if (options.autoReload) {
      return () => {
        AutoReload.removeListener(reload);
      };
    }

    return undefined;
  }, deps);

  return state;
};

export default useApi;
