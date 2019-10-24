import React from 'react';
import PropTypes from 'prop-types';

import LoadingIndicator from '../../../components/loading-indicator';
import RecentFillsItem from './recent-fills-item';
import useFills from '../hooks/use-fills';

const RecentFills = ({ filter }) => {
  const [fills, loading] = useFills({ autoReload: true, filter, limit: 8 });

  return loading ? (
    <LoadingIndicator centered />
  ) : (
    <div css="overflow-x: scroll">
      {fills.items.map(fill => (
        <RecentFillsItem fill={fill} key={fill.id} />
      ))}
    </div>
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
