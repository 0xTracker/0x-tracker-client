import _ from 'lodash';
import { useEffect, useState } from 'react';
import axios, { CancelToken } from 'axios';

import AutoReload from '../util/auto-reload';
import buildApiUrl from '../util/build-api-url';

const useApi = (method, options = {}) => {
  const [state, setState] = useState({
    cancelRequest: _.noop,
    loading: true,
  });

  const opts = _.defaults({}, options, {
    autoReload: false,
    params: {},
    version: 1,
  });

  const url = buildApiUrl(method, opts.params, { version: opts.version });

  useEffect(
    () => {
      // Cancel any previous in-flight requests
      state.cancelRequest();

      const source = CancelToken.source();

      setState({
        ...state,
        cancelRequest: source.cancel,
        loading: true,
        response: undefined,
      });

      const fetchData = async () => {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });

        setState({ ...state, loading: false, response: response.data });
      };

      fetchData()
        .then(() => {
          // Only subscribe to auto-reload once the first fetch was successful
          if (opts.autoReload) {
            AutoReload.addListener(fetchData);
          }
        })
        .catch(error => {
          if (axios.isCancel(error)) {
            // Ignore cancellation errors because they're deliberate
          } else {
            // Stash the error so that it can be rethrown in render scope
            setState({ ...state, error });
          }
        });

      // Ensure auto-reload stops when the component unmounts
      return () => AutoReload.removeListener(fetchData);
    },

    // Re-run the effect if any of these parameters change
    [opts.autoReload, url],
  );

  // Bail out if the API call failed
  if (state.error) {
    throw state.error;
  }

  return [state.response, state.loading];
};

export default useApi;
