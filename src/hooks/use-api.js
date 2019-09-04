import _ from 'lodash';
import { useEffect, useState } from 'react';

import callApi from '../util/call-api';
import AutoReload from '../util/auto-reload';

const useApi = (method, options = {}) => {
  const [state, setState] = useState({ loading: true });

  const opts = _.defaults({}, options, {
    autoReload: false,
    params: {},
    version: 1,
  });

  useEffect(() => {
    setState({ loading: true });

    const fetchData = async () => {
      const response = await callApi(method, opts.params, {
        version: opts.version,
      });

      setState({ loading: false, response });
    };

    fetchData()
      .then(() => {
        if (opts.autoReload) {
          AutoReload.addListener(fetchData);
        }
      })
      .catch(error => {
        // Stash the error so that it can be rethrown in render scope
        setState({ error, loading: false });
      });

    // Ensure auto-reload stops when the component unmounts
    return () => AutoReload.removeListener(fetchData);
  }, [method, opts.version, opts.autoReload, ...Object.values(opts.params)]);

  // Bail out if the API call failed
  if (state.error) {
    throw state.error;
  }

  return [state.response, state.loading];
};

export default useApi;
