import _ from 'lodash';

import useApi from '../../../hooks/use-api';

const useTokenRelayers = (tokenAddress, options = {}) => {
  const [response, loading] = useApi(`tokens/${tokenAddress}/relayers`, {
    autoReload: options.autoReload,
    params: _.pick(options, ['limit', 'sortBy', 'statsPeriod']),
  });

  const { limit, relayers, sortBy, statsPeriod } = response || {};

  return [{ items: relayers, limit, sortBy, statsPeriod }, loading];
};

export default useTokenRelayers;
