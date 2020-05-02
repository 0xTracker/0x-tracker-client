import _ from 'lodash';

import useSearchParam from './use-search-param';

const usePageParam = () => {
  const value = useSearchParam('page', 1);

  if (_.isFinite(value)) {
    return _.toNumber(value);
  }

  return 1;
};

export default usePageParam;
