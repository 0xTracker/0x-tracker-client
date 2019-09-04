import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import AsyncTopTokensChart from './async-top-tokens-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import useTokens from '../hooks/use-tokens';

const TopTokens = ({ period }) => {
  const [tokens, loading] = useTokens({
    limit: 5,
    resolved: true,
    statsPeriod: period,
  });

  if (loading) {
    return <LoadingIndicator centered />;
  }

  return (
    <AsyncTopTokensChart
      data={tokens.items.map(token => ({
        share: _.get(token, 'stats.fillVolumeShare', 0),
        token,
        tokenVolume: _.get(token, 'stats.fillVolume.token', '0'),
        volume: _.get(token, 'stats.fillVolume.USD', 0),
      }))}
    />
  );
};

TopTokens.propTypes = {
  period: PropTypes.string.isRequired,
};

export default TopTokens;
