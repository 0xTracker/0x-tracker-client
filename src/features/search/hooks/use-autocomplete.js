import _ from 'lodash';
import { useState, useEffect } from 'react';
import axios, { CancelToken } from 'axios';

import { buildApiUrl } from '../../../util';
import { API_CALL_TIMEOUT } from '../../../constants';

const useAutocomplete = () => {
  const [state, setState] = useState({
    cancelRequest: _.noop,
    searchTerm: null,
    suggestions: [],
  });

  const { cancelRequest, fetchError, searchTerm, suggestions } = state;

  const setSearchTerm = (newTerm) => {
    setState((prevState) => ({ ...prevState, searchTerm: newTerm }));
  };

  useEffect(() => {
    cancelRequest();

    if (searchTerm === null) {
      setState((prevState) => ({ ...prevState, suggestions: [] }));
      return;
    }

    const source = CancelToken.source();

    const fetchData = async () => {
      const tokensUrl = buildApiUrl('token-lookup', {
        limit: searchTerm === '' ? 5 : 10,
        q: searchTerm,
      });

      const appsUrl = buildApiUrl('app-lookup', {
        limit: searchTerm === '' ? 5 : 10,
        q: searchTerm,
      });

      const tradersUrl = buildApiUrl('trader-lookup', {
        limit: searchTerm === '' ? 5 : 10,
        q: searchTerm,
      });

      /* eslint-disable compat/compat */
      const [tokensResponse, appsResponse, tradersResponse] = await Promise.all(
        [
          axios.get(tokensUrl, {
            cancelToken: source.token,
            timeout: API_CALL_TIMEOUT,
          }),
          axios.get(appsUrl, {
            cancelToken: source.token,
            timeout: API_CALL_TIMEOUT,
          }),
          axios.get(tradersUrl, {
            cancelToken: source.token,
            timeout: API_CALL_TIMEOUT,
          }),
        ],
      );
      /* eslint-enable compat/compat */

      const { tokens } = tokensResponse.data;
      const { traders } = tradersResponse.data;
      const { apps } = appsResponse.data;

      const tokensSection =
        tokens.length > 0
          ? {
              suggestions: tokens.map((token) => ({
                address: token.address,
                imageUrl: token.imageUrl,
                name: token.name,
                symbol: token.symbol,
                type: 'token',
              })),
              title: 'Tokens',
            }
          : null;

      const appsSection =
        apps.length > 0
          ? {
              suggestions: apps.map((app) => ({
                imageUrl: app.logoUrl,
                name: app.name,
                type: 'app',
                urlSlug: app.urlSlug,
              })),
              title: 'Apps',
            }
          : null;

      const tradersSection =
        traders.length > 0
          ? {
              suggestions: traders.map((trader) => ({
                address: trader.address,
                imageUrl: trader.imageUrl,
                name: trader.name,
                type: 'trader',
              })),
              title: 'Traders',
            }
          : null;

      const newSuggestions = [
        appsSection,
        tokensSection,
        tradersSection,
      ].filter((x) => x !== null);

      setState((prevState) => ({
        ...prevState,
        suggestions: newSuggestions,
      }));
    };

    setState((prevState) => ({
      ...prevState,
      cancelRequest: source.cancel,
      fetchError: undefined,
    }));

    fetchData().catch((error) => {
      if (axios.isCancel(error) || error.message === 'Request aborted') {
        // Ignore cancellation errors because they're deliberate
      } else {
        // Stash the error so that it can be rethrown in render scope
        setState((prevState) => ({
          ...prevState,
          fetchError: error,
        }));
      }
    });
  }, [searchTerm]);

  if (fetchError) {
    throw fetchError;
  }

  return [suggestions, setSearchTerm];
};

export default useAutocomplete;
