import { useHistory, useLocation } from 'react-router';

import useSearchParam from './use-search-param';

const useSortOptions = (defaultSortBy, defaultSortDirection) => {
  const history = useHistory();
  const { pathname, search } = useLocation();

  const sortBy = useSearchParam('sortBy', defaultSortBy);
  const sortDirection = useSearchParam('sortDirection', defaultSortDirection);

  const setSortOptions = (newSortBy, newSortDirection) => {
    const params = new URLSearchParams(search);

    params.set('sortBy', newSortBy);
    params.set('sortDirection', newSortDirection);
    history.push(`${pathname}?${params.toString()}`);
  };

  return { setSortOptions, sortBy, sortDirection };
};

export default useSortOptions;
