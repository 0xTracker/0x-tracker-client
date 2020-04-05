import _ from 'lodash';
import { flow, join, keys, map, omitBy } from 'lodash/fp';

const buildUrl = (path, params) => {
  const queryParams = flow([
    omitBy(_.isNil),
    keys,
    map((key) => `${key}=${params[key]}`),
    join('&'),
  ])(params);
  const query = queryParams.length > 0 ? `?${queryParams}` : '';

  return `${path}${query}`;
};

export default buildUrl;
