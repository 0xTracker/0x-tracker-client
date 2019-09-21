import _ from 'lodash';

import buildUrl from './build-url';

const endpoint = process.env.REACT_APP_API_ENDPOINT;

const buildApiUrl = (method, params, opts) => {
  const options = _.defaults({}, opts, { version: 1 });
  const path = options.version === 1 ? method : `v${options.version}/${method}`;
  const url = buildUrl(path, params);

  return `${endpoint}/${url}`;
};

export default buildApiUrl;
