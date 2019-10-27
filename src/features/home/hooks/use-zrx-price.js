import _ from 'lodash';

import useApi from '../../../hooks/use-api';

const useZrxPrice = options => {
  const { autoReload } = _.defaults({}, options, { autoReload: false });

  return useApi('zrx-price', { autoReload });
};

export default useZrxPrice;
