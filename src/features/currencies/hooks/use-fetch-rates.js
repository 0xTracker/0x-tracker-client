import { useEffect, useState } from 'react';
import axios, { CancelToken } from 'axios';

import { API_CALL_TIMEOUT } from '../../../constants';
import { BASE_CURRENCY, CURRENCIES } from '../constants';

const useFetchRates = () => {
  const [rates, setRates] = useState();
  const [error, setError] = useState();
  const [cancelRequest, setCancelRequest] = useState();

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
        setRates(response.data[BASE_CURRENCY]);
      })
      .catch(caughtError => {
        if (
          axios.isCancel(caughtError) ||
          caughtError.message === 'Request aborted'
        ) {
          // Ignore cancellation errors because they're deliberate
        } else {
          // Stash the error so that it can be rethrown in render scope
          setError(caughtError);
        }
      });

    setCancelRequest(source.cancel);

    return () => cancelRequest();
  }, []);

  if (error) {
    throw error;
  }

  return rates;
};

export default useFetchRates;
