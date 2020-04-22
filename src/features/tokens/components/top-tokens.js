import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { AsteriskIcon } from '../../../components/icons';
import { COLORS } from '../../../styles/constants';
import LoadingIndicator from '../../../components/loading-indicator';
import TopTokensTable from './top-tokens-table';
import useTokens from '../hooks/use-tokens';
import verbosePeriod from '../../../util/verbose-period';

const TopTokensContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const TopTokensFooter = styled.p`
  align-items: center;
  border-top: 1px solid ${COLORS.NEUTRAL.MYSTIC_200};
  color: ${COLORS.NEUTRAL.MYSTIC_700};
  display: flex;
  font-size: 0.9rem;
  justify-content: flex-end;
  margin: 1rem 0 0;
  padding-top: 0.5rem;
`;

const TopTokens = ({ period }) => {
  const [tokens, loading] = useTokens({
    limit: 4,
    resolved: true,
    statsPeriod: period,
  });

  if (loading) {
    return <LoadingIndicator centered />;
  }

  return (
    <TopTokensContainer>
      <TopTokensTable statsPeriod={period} tokens={tokens.items} />
      <TopTokensFooter>
        Top tokens by {verbosePeriod(period)} volume
        <AsteriskIcon css="margin-left: 0.5rem; opacity: 0.7;" size="12" />
      </TopTokensFooter>
    </TopTokensContainer>
  );
};

TopTokens.propTypes = {
  period: PropTypes.string.isRequired,
};

export default TopTokens;
