import PropTypes from 'prop-types';
import React from 'react';

import LoadingIndicator from '../../../components/loading-indicator';
import TopTokensTable from './top-tokens-table';
import useTokens from '../hooks/use-tokens';

const TopTokens = ({ period }) => {
  const [tokens, loading] = useTokens({
    limit: 4,
    resolved: true,
    statsPeriod: period,
  });

  if (loading) {
    return <LoadingIndicator centered />;
  }

  return <TopTokensTable statsPeriod={period} tokens={tokens.items} />;
};

TopTokens.propTypes = {
  period: PropTypes.string.isRequired,
};

export default TopTokens;
