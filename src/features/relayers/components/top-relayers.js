import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { AsteriskIcon } from '../../../components/icons';
import { colors } from '../../../styles/constants';
import LoadingIndicator from '../../../components/loading-indicator';
import TopRelayersTable from './top-relayers-table';
import useRelayers from '../hooks/use-relayers';

const TopRelayersContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const TopRelayersFooter = styled.p`
  align-items: center;
  border-top: 1px solid ${colors.athensGray};
  color: ${colors.stormGray};
  display: flex;
  font-size: 0.9rem;
  justify-content: flex-end;
  margin: 1rem 0 0;
  padding-top: 0.5rem;
`;

const TopRelayers = ({ period }) => {
  const [relayers, loadingRelayers] = useRelayers({
    autoReload: true,
    limit: 4,
    statsPeriod: period,
  });

  if (loadingRelayers) {
    return <LoadingIndicator centered />;
  }

  return (
    <TopRelayersContainer>
      <TopRelayersTable relayers={relayers.items} />
      <TopRelayersFooter>
        Top relayers by trade volume
        <AsteriskIcon css="margin-left: 0.5rem; opacity: 0.7;" size="12" />
      </TopRelayersFooter>
    </TopRelayersContainer>
  );
};

TopRelayers.propTypes = {
  period: PropTypes.string,
};

TopRelayers.defaultProps = {
  period: undefined,
};

export default TopRelayers;
