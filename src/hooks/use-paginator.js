import _ from 'lodash';
import { useHistory, useLocation } from 'react-router';

import useSearchParam from './use-search-param';

const usePaginator = () => {
  const history = useHistory();
  const { pathname, search } = useLocation();

  const rawPage = useSearchParam('page', 1);
  const page = _.toNumber(rawPage);

  const setPage = (newPage) => {
    const params = new URLSearchParams(search);

    params.set('page', newPage);
    history.push(`${pathname}?${params.toString()}`);
  };

  return { page, setPage };
};

export default usePaginator;
