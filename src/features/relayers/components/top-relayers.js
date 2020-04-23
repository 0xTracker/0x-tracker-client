import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import TopRelayersTable from './top-relayers-table';
import useRelayers from '../hooks/use-relayers';

const TopRelayers = ({ period }) => {
  const [relayers, loadingRelayers] = useRelayers({
    autoReload: true,
    limit: 4,
    statsPeriod: period,
  });

  if (loadingRelayers) {
    return <LoadingIndicator centered />;
  }

  return <TopRelayersTable relayers={relayers.items} />;
};

TopRelayers.propTypes = {
  period: PropTypes.string,
};

TopRelayers.defaultProps = {
  period: undefined,
};

export default TopRelayers;
