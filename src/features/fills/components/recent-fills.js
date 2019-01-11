import React from 'react';
import PropTypes from 'prop-types';

import FillsProvider from './fills-provider';
import LoadingIndicator from '../../../components/loading-indicator';
import FillList from './fill-list';

const RecentFills = ({ filter }) => (
  <FillsProvider filter={filter} limit={15}>
    {({ fills, loading }) =>
      loading ? <LoadingIndicator centered /> : <FillList fills={fills} />
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
