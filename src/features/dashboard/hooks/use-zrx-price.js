import _ from 'lodash';

import useApi from '../../../hooks/use-api';

const useZrxPrice = options => {
  const { autoReload } = _.defaults({}, options, { autoReload: false });
  const { error, loading, response } = useApi('zrx-price', { autoReload }, [
    autoReload,
  ]);

  if (error) {
    throw error;
  }

  return [response, loading];
};

export default useZrxPrice;
