import _ from 'lodash';
import { flow, join, keys, map, omitBy } from 'lodash/fp';
import axios from 'axios';

const callApi = async (method, params, opts) => {
  const options = _.defaults({}, opts, { version: 1 });
  const endpoint = process.env.REACT_APP_API_ENDPOINT;
  const querystring = flow([
    omitBy(value => value === undefined),
    keys,
    map(key => `${key}=${params[key]}`),
    join('&'),
  ])(params);
  const url = `${endpoint}/v${options.version}/${method}?${querystring}`;
  const response = await axios.get(url);

  return response.data;
};

export default callApi;
