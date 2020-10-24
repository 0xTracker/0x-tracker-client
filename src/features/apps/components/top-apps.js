import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import TopAppsTable from './top-apps-table';
import useApps from '../hooks/use-apps';

const TopApps = ({ period }) => {
  const [apps, loading] = useApps({
    autoReload: true,
    limit: 4,
    statsPeriod: period,
  });

  if (loading) {
    return <LoadingIndicator centered />;
  }

  return <TopAppsTable apps={apps.items} />;
};

TopApps.propTypes = {
  period: PropTypes.string,
};

TopApps.defaultProps = {
  period: undefined,
};

export default TopApps;
