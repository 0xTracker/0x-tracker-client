import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';
import { AsteriskIcon } from '../../../components/icons';
import AsyncTopProtocolsChart from './async-top-protocols-chart';
import LoadingIndicator from '../../../components/loading-indicator';
import sharedPropTypes from '../../../prop-types';
import useProtocols from '../hooks/use-protocols';
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
  const [protocols, loading] = useProtocols({
    limit: 3,
    page: 1,
    sortBy: 'fillCount',
    statsPeriod: period,
  });

  if (loading) {
    return <LoadingIndicator centered />;
  }

  const stats = _.sortBy(
    protocols.items.map((protocol) => ({
      fillCount: protocol.stats.fillCount,
      protocolVersion: protocol.version,
      tradeVolume: protocol.stats.tradeVolume,
    })),
    'protocolVersion',
  );

  return (
    <>
      <AsyncTopProtocolsChart data={stats} />
      <TopProtocolsFooter>
        Protocol share by {verbosePeriod(period)} fill count
        <AsteriskIcon css="margin-left: 0.5rem; opacity: 0.7;" size="12" />
      </TopProtocolsFooter>
    </>
  );
};

TopProtocols.propTypes = {
  period: sharedPropTypes.timePeriod.isRequired,
};

export default TopProtocols;
