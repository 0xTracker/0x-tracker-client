import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import tokenPropTypes from '../prop-types';
import TokenRelayersTable from './token-relayers-table';
import useTokenRelayers from '../hooks/use-token-relayers';

const TokenRelayers = ({ limit, statsPeriod, token }) => {
  const [relayers, loadingRelayers] = useTokenRelayers(token.address, {
    autoReload: true,
    limit,
    sortBy: 'tradeVolumeUSD',
    statsPeriod,
  });

  if (loadingRelayers) {
    return <LoadingIndicator centered />;
  }

  return <TokenRelayersTable relayers={relayers.items} token={token} />;
};

TokenRelayers.propTypes = {
  limit: PropTypes.number,
  statsPeriod: PropTypes.string.isRequired,
  token: tokenPropTypes.token.isRequired,
};

TokenRelayers.defaultProps = {
  limit: 6,
};

export default TokenRelayers;
