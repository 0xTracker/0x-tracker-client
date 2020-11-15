import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../styles/constants';
import { truncateAddress } from '../../../util';
import LocalisedAmount from '../../currencies/components/localised-amount';
import Number from '../../../components/number';
import TokenAmount from '../../tokens/components/token-amount';
import TokenImage from '../../tokens/components/token-image';
import Tooltip from '../../../components/tooltip';
import { HelpIcon } from '../../../components/icons';
import EntityList from '../../../components/entity-list';
import EntityListItem from '../../../components/entity-list-item';
import buildTokenUrl from '../../tokens/util/build-token-url';

const SecondaryText = styled.span`
  color: ${COLORS.NEUTRAL.MYSTIC_800};
  font-size: 0.9rem;
`;

const AppTokensTable = ({ appName, tokens }) => (
  <EntityList>
    {tokens.map((token) => (
      <EntityListItem
        complement={
          <Tooltip
            content={
              <>
                <p>
                  There were{' '}
                  <strong>
                    <Number summarize>{token.stats.tradeCount}</Number> trades
                  </strong>{' '}
                  involving {token.name} on {appName} in the selected period,
                  totalling{' '}
                  <strong>
                    <TokenAmount
                      amount={token.stats.tradeVolume.token}
                      linked={false}
                      summarize
                      token={token}
                    />{' '}
                    (
                    <LocalisedAmount
                      amount={token.stats.tradeVolume.USD}
                      summarize
                    />
                    )
                  </strong>
                  .
                </p>
                <p>
                  The average size of trades on {appName} involving {token.name}{' '}
                  for this period was{' '}
                  <strong>
                    <TokenAmount
                      amount={
                        token.stats.tradeVolume.token / token.stats.tradeCount
                      }
                      linked={false}
                      summarize
                      token={token}
                    />{' '}
                    (
                    <LocalisedAmount
                      amount={
                        token.stats.tradeVolume.USD / token.stats.tradeCount
                      }
                      summarize
                    />
                    )
                  </strong>
                  .
                </p>
              </>
            }
            placement="bottom"
          >
            <span css="display: flex; align-items: center; justify-content: flex-end;">
              <span>
                <span css="display: block; line-height: 1; margin-bottom: 0.2rem;">
                  {token.stats.tradeVolume.USD === 0 ? (
                    'Unknown'
                  ) : (
                    <LocalisedAmount
                      amount={token.stats.tradeVolume.USD}
                      summarize
                    />
                  )}
                </span>
                <SecondaryText>
                  <TokenAmount
                    amount={token.stats.tradeVolume.token}
                    linked={false}
                    summarize
                    token={token}
                  />
                </SecondaryText>
              </span>
              <HelpIcon
                color={COLORS.NEUTRAL.MYSTIC_500}
                css="margin-left: 0.75rem;"
                size={18}
              />
            </span>
          </Tooltip>
        }
        image={<TokenImage imageUrl={token.imageUrl} size="40px" />}
        key={token.address}
        metadata={[
          { label: 'Address', value: truncateAddress(token.address, 20) },
        ]}
        title={token.name || 'Unknown Token'}
        url={buildTokenUrl(token.address)}
      />
    ))}
  </EntityList>
);

AppTokensTable.propTypes = {
  appName: PropTypes.string.isRequired,
  tokens: PropTypes.array.isRequired,
};

export default AppTokensTable;
