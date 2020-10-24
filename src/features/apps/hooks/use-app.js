import useApi from '../../../hooks/use-api';

const useApp = (slug, options = {}) =>
  useApi(`apps/${slug}`, {
    autoReload: true,
    params: { statsPeriod: options.statsPeriod },
  });

export default useApp;
