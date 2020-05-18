import { useHistory as useRouterHistory } from 'react-router';

import { buildUrl } from '../util';

const useNavigator = () => {
  const routerHistory = useRouterHistory();

  const navigateTo = (path, params, options = { clientSide: true }) => {
    const url = buildUrl(path, params);

    if (options.clientSide) {
      routerHistory.push(url);
    } else {
      window.location.href = url;
    }
  };

  return { navigateTo };
};

export default useNavigator;
