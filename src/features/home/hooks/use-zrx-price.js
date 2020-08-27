import _ from 'lodash';

import useApi from '../../../hooks/use-api';

const useZrxPrice = (options) =>
  useApi('zrx-price', _.defaults({}, options, { autoReload: false }));

export default useZrxPrice;
