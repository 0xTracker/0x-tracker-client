import _ from 'lodash';
import { flow, join, keys, map, omitBy } from 'lodash/fp';

const buildApiUrl = (method, params, opts) => {
  const options = _.defaults({}, opts, { version: 1 });
  const endpoint = process.env.REACT_APP_API_ENDPOINT;
  const querystring = flow([
    omitBy(value => value === undefined),
    keys,
    map(key => `${key}=${params[key]}`),
    join('&'),
  ])(params);
  const url = `${endpoint}/v${options.version}/${method}?${querystring}`;

  return url;
};

export default buildApiUrl;
