import _ from 'lodash';
import { useEffect, useState } from 'react';
import axios, { CancelToken } from 'axios';

import { API_CALL_TIMEOUT } from '../constants';
import AutoReload from '../util/auto-reload';
import buildApiUrl from '../util/build-api-url';

const useApi = (method, options = {}) => {
  const [
    { cancelRequest, data, fetchError, listener, loading },
    setState,
  ] = useState({
    cancelRequest: _.noop,
    loading: true,
  });

  // Merge options with default values. User specified options take precedence.
  const { autoReload, params, version } = _.defaults({}, options, {
    autoReload: false,
    params: {},
    version: 1,
  });

  // Build the url that will be used to fetch data
  const url = buildApiUrl(method, params, { version });

  // Effect for handling initial data fetch
  useEffect(
    () => {
      cancelRequest();

      const source = CancelToken.source();

      const fetchData = async () => {
        const response = await axios.get(url, {
          cancelToken: source.token,
          timeout: API_CALL_TIMEOUT,
        });

        setState((prevState) => ({
          ...prevState,
          data: response.data,
          error: undefined,
          loading: false,
        }));
      };

      setState((prevState) => ({
        ...prevState,
        cancelRequest: source.cancel,
        data: undefined,
        error: undefined,
        listener: fetchData,
        loading: true,
      }));

      fetchData().catch((error) => {
        if (axios.isCancel(error) || error.message === 'Request aborted') {
          // Ignore cancellation errors because they're deliberate
        } else {
          // Stash the error so that it can be rethrown in render scope
          setState((prevState) => ({
            ...prevState,
            fetchError: error,
            loading: false,
          }));
        }
      });
    },

    // Re-run initial fetch if the url changes
    [url],
  );

  // Effect for enabling and disabling auto reload
  useEffect(
    () => {
      if (data === undefined) {
        // Only subscribe to auto-reload once the first fetch was successful
        return undefined;
      }

      if (autoReload) {
        AutoReload.addListener(listener);
      } else {
        AutoReload.removeListener(listener);
      }

      // Ensure auto-reload stops when the component unmounts
      return () => AutoReload.removeListener(listener);
    },

    // Re-run initial fetch if any of the following conditions are satisfied:
    // - autoReload option has changed
    // - initial fetch was successful
    // - listener has been created
    [autoReload, data, listener],
  );

  // Bail out if the API call failed
  if (fetchError) {
    throw fetchError;
  }

  return [data, loading];
};

export default useApi;
