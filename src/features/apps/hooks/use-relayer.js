import useApi from '../../../hooks/use-api';

const useRelayer = (slug, options = {}) =>
  useApi(`relayers/${slug}`, {
    autoReload: true,
    params: { statsPeriod: options.statsPeriod },
  });

export default useRelayer;
