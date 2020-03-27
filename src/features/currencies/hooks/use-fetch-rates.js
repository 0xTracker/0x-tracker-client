import _ from 'lodash';
import { useEffect, useState } from 'react';
import axios, { CancelToken } from 'axios';

import { API_CALL_TIMEOUT } from '../../../constants';
import { BASE_CURRENCY, CURRENCIES } from '../constants';

const useFetchRates = () => {
  const [{ cancelRequest, fetchError, rates }, setState] = useState({
    cancelRequest: _.noop,
  });

  useEffect(() => {
    const source = CancelToken.source();
    const toSymbols = Object.values(CURRENCIES)
      .map(currency => currency.symbol)
      .join(',');

    axios
      .get(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${BASE_CURRENCY}&tsyms=${toSymbols}`,
        {
          cancelToken: source.token,
          timeout: API_CALL_TIMEOUT,
        },
      )
      .then(response => {
        setState(prevState => ({
          ...prevState,
          fetchError: undefined,
          rates: response.data[BASE_CURRENCY],
        }));
      })
      .catch(error => {
        if (axios.isCancel(error) || error.message === 'Request aborted') {
          // Ignore cancellation errors because they're deliberate
        } else {
          // Stash the error so that it can be rethrown in render scope
          setState(prevState => ({
            ...prevState,
            fetchError: error,
          }));
        }
      });

    setState(prevState => ({
      ...prevState,
      cancelRequest: source.cancel,
    }));

    return () => cancelRequest();
  }, []);

  if (fetchError) {
    throw fetchError;
  }

  return rates;
};

export default useFetchRates;
