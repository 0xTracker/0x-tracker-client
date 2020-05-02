import { useHistory } from 'react-router';

import { buildUrl } from '../util';

const useNavigator = () => {
  const history = useHistory();

  const navigateTo = (path, params) => {
    history.push(buildUrl(path, params));
  };

  return { navigateTo };
};

export default useNavigator;
