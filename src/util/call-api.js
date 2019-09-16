import axios from 'axios';

import { API_CALL_TIMEOUT } from '../constants';
import buildApiUrl from './build-api-url';

const callApi = async (method, params, opts) => {
  const url = buildApiUrl(method, params, opts);
  const response = await axios.get(url, { timeout: API_CALL_TIMEOUT });

  return response.data;
};

export default callApi;
