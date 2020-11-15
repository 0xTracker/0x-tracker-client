import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import EntityList from '../../../components/entity-list';
import EntityListItem from '../../../components/entity-list-item';
import LoadingIndicator from '../../../components/loading-indicator';
import PercentageChange from '../../../components/percentage-change';
import LocalisedAmount from '../../currencies/components/localised-amount';
import useTokens from '../hooks/use-tokens';
import buildTokenUrl from '../util/build-token-url';
import TokenImage from './token-image';

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
    <EntityList>
      {tokens.items.map((token) => (
        <EntityListItem
          complement={
            <>
              <LocalisedAmount
                amount={token.stats.tradeVolume.USD}
                css="font-weight: 500; display: block; line-height: 1;"
                summarize
              />
              {_.isNumber(token.stats.tradeVolumeChange.USD) && (
                <PercentageChange css="display: block;">
                  {token.stats.tradeVolumeChange.USD}
                </PercentageChange>
              )}
            </>
          }
          image={<TokenImage imageUrl={token.imageUrl} size="40px" />}
          key={token.address}
          metadata={[{ label: 'Symbol', value: token.symbol }]}
          title={token.name}
          url={buildTokenUrl(token.address)}
        />
      ))}
    </EntityList>
  );
};

TopTokens.propTypes = {
  period: PropTypes.string.isRequired,
};

export default TopTokens;
