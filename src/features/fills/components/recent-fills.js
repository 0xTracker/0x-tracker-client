import React from 'react';
import PropTypes from 'prop-types';

import FillsProvider from './fills-provider';
import LoadingIndicator from '../../../components/loading-indicator';
import RecentFillsItem from './recent-fills-item';

const RecentFills = ({ filter }) => (
  <FillsProvider filter={filter} limit={8}>
    {({ fills, loading }) =>
      loading ? (
        <LoadingIndicator centered />
      ) : (
        <div css="overflow-x: scroll">
          {fills.map(fill => (
            <RecentFillsItem fill={fill} key={fill.id} />
          ))}
        </div>
      )
    }
  </FillsProvider>
);

RecentFills.propTypes = {
  filter: PropTypes.shape({
    address: PropTypes.string,
    relayer: PropTypes.string,
    token: PropTypes.string,
  }),
};

RecentFills.defaultProps = {
  filter: undefined,
};

export default RecentFills;
