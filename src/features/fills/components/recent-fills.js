import React from 'react';
import PropTypes from 'prop-types';

import CardPlaceholder from '../../../components/card-placeholder';
import LoadingIndicator from '../../../components/loading-indicator';
import RecentFillsList from './recent-fills-list';
import useFills from '../hooks/use-fills';

const RecentFills = ({ filter, limit, placeholder, showRelayer }) => {
  const [fills, loading] = useFills({
    autoReload: true,
    filter,
    limit,
  });

  if (loading) {
    return <LoadingIndicator centered />;
  }

  if (fills.items.length === 0) {
    return <CardPlaceholder>{placeholder}</CardPlaceholder>;
  }

  return <RecentFillsList fills={fills.items} showRelayer={showRelayer} />;
};

RecentFills.propTypes = {
  filter: PropTypes.shape({
    address: PropTypes.string,
    apps: PropTypes.arrayOf(PropTypes.string.isRequired),
    token: PropTypes.string,
  }),
  limit: PropTypes.number,
  placeholder: PropTypes.string,
  showRelayer: PropTypes.bool,
};

RecentFills.defaultProps = {
  filter: {},
  limit: 8,
  placeholder: undefined,
  showRelayer: undefined,
};

export default RecentFills;
