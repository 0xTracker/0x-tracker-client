import axios from 'axios';

import buildApiUrl from './build-api-url';

const callApi = async (method, params, opts) => {
  const url = buildApiUrl(method, params, opts);
  const response = await axios.get(url);

  return response.data;
};

export default callApi;
