import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import { AsteriskIcon } from '../../../components/icons';
import AsyncTraderBreakdownChart from './async-trader-breakdown-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import sharedPropTypes from '../../../prop-types';
import useTraderStats from '../../stats/hooks/use-trader-stats';
import verbosePeriod from '../../../util/verbose-period';

const TraderBreakdownFooter = styled.p`
  align-items: center;
  border-top: 1px solid ${colors.athensGray};
  color: ${colors.stormGray};
  display: flex;
  font-size: 0.9rem;
  justify-content: flex-end;
  margin: 1rem 0 0;
  padding-top: 0.5rem;
`;

const TraderBreakdown = ({ period }) => {
  const [traderStats, loading] = useTraderStats({ period });

  if (loading) {
    return <LoadingIndicator centered />;
  }
  const stats = [
    {
      count: traderStats.makerCount,
      traderType: 'maker',
    },
    {
      count: traderStats.takerCount,
      traderType: 'taker',
    },
  ];

  return (
    <>
      <AsyncTraderBreakdownChart data={stats} />
      <TraderBreakdownFooter>
        {verbosePeriod(period)} unique trader count by type
        <AsteriskIcon css="margin-left: 0.5rem; opacity: 0.7;" size="12" />
      </TraderBreakdownFooter>
    </>
  );
};

TraderBreakdown.propTypes = {
  period: sharedPropTypes.timePeriod,
};

TraderBreakdown.defaultProps = {
  period: undefined,
};

export default TraderBreakdown;
