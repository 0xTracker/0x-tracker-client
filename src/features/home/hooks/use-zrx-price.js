import _ from 'lodash';

import { ZRX_TOKEN } from '../../../constants';
import useApi from '../../../hooks/use-api';

const useZrxPrice = (options) => {
  const { autoReload } = _.defaults({}, options, { autoReload: false });
  const [zrxToken, loading] = useApi(`tokens/${ZRX_TOKEN.address}`, {
    autoReload,
  });

  return zrxToken === undefined
    ? [undefined, loading]
    : [zrxToken.price, loading];
};

export default useZrxPrice;
