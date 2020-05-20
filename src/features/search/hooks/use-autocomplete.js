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

      const relayersUrl = buildApiUrl('relayer-lookup', {
        limit: searchTerm === '' ? 5 : 10,
        q: searchTerm,
      });

      // eslint-disable-next-line compat/compat
      const [tokensResponse, relayersResponse] = await Promise.all([
        axios.get(tokensUrl, {
          cancelToken: source.token,
          timeout: API_CALL_TIMEOUT,
        }),
        axios.get(relayersUrl, {
          cancelToken: source.token,
          timeout: API_CALL_TIMEOUT,
        }),
      ]);

      const { tokens } = tokensResponse.data;
      const relayers =
        searchTerm === ''
          ? _.take(
              relayersResponse.data.relayers.filter((r) => r.id !== 'unknown'),
              5,
            )
          : relayersResponse.data.relayers;

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

      const relayersSection =
        relayers.length > 0
          ? {
              suggestions: relayers.map((relayer) => ({
                imageUrl: relayer.imageUrl,
                name: relayer.name,
                slug: relayer.slug,
                type: 'relayer',
              })),
              title: 'Relayers',
            }
          : null;

      const newSuggestions = [relayersSection, tokensSection].filter(
        (x) => x !== null,
      );

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
