import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import { AsteriskIcon } from '../../../components/icons';
import AsyncTopProtocolsChart from './async-top-protocols-chart';
import sharedPropTypes from '../../../prop-types';
import verbosePeriod from '../../../util/verbose-period';

const TopProtocolsFooter = styled.p`
  align-items: center;
  border-top: 1px solid ${colors.athensGray};
  color: ${colors.stormGray};
  display: flex;
  font-size: 0.9rem;
  justify-content: flex-end;
  margin: 1rem 0 0;
  padding-top: 0.5rem;
`;

const TopProtocols = ({ period }) => {
  const stats = [
    {
      protocolVersion: 2,
      share: 79.4,
      tradeCount: 573,
      tradeVolume: 5000000,
    },
    {
      protocolVersion: 2.1,
      share: 19,
      tradeCount: 333,
      tradeVolume: 1200000,
    },
    { protocolVersion: 1, share: 1.6, tradeCount: 120, tradeVolume: 100000 },
  ];

  return (
    <>
      <AsyncTopProtocolsChart data={stats} />
      <TopProtocolsFooter>
        Top protocols by {verbosePeriod(period)} trade count
        <AsteriskIcon css="margin-left: 0.5rem; opacity: 0.7;" size="12" />
      </TopProtocolsFooter>
    </>
  );
};

TopProtocols.propTypes = {
  period: sharedPropTypes.timePeriod.isRequired,
};

export default TopProtocols;
