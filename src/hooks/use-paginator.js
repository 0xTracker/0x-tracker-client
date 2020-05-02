import _ from 'lodash';
import { useLocation } from 'react-router';

import useNavigator from './use-navigator';
import useSearchParam from './use-search-param';

const usePaginator = () => {
  const { pathname } = useLocation();
  const { navigateTo } = useNavigator();

  const rawPage = useSearchParam('page', 1);
  const page = _.toNumber(rawPage);

  const setPage = (newPage) => {
    navigateTo(pathname, { page: newPage });
  };

  return { page, setPage };
};

export default usePaginator;
