import React from 'react';
import PropTypes from 'prop-types';

import LoadingIndicator from '../../../components/loading-indicator';
import RecentFillsList from './recent-fills-list';
import useFills from '../hooks/use-fills';

const RecentFills = ({ filter }) => {
  const [fills, loading] = useFills({ autoReload: true, filter, limit: 8 });

  return loading ? (
    <LoadingIndicator centered />
  ) : (
    <RecentFillsList fills={fills.items} />
  );
};

RecentFills.propTypes = {
  filter: PropTypes.shape({
    address: PropTypes.string,
    relayer: PropTypes.string,
    token: PropTypes.string,
  }),
};

RecentFills.defaultProps = {
  filter: {},
};

export default RecentFills;
