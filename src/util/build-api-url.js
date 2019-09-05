import _ from 'lodash';
import { flow, join, keys, map, omitBy } from 'lodash/fp';

const buildApiUrl = (method, params, opts) => {
  const options = _.defaults({}, opts, { version: 1 });
  const endpoint = process.env.REACT_APP_API_ENDPOINT;
  const queryParams = flow([
    omitBy(value => value === undefined),
    keys,
    map(key => `${key}=${params[key]}`),
    join('&'),
  ])(params);
  const query = queryParams.length > 0 ? `?${queryParams}` : '';

  if (options.version === 1) {
    return `${endpoint}/${method}${query}`;
  }

  return `${endpoint}/v${options.version}/${method}${query}`;
};

export default buildApiUrl;
