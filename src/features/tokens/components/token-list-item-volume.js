import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { formatTokenAmount, prettyPeriod } from '../../../util';
import LocalisedAmount from '../../currencies/components/localised-amount';
import Number from '../../../components/number';
import PercentageChange from '../../../components/percentage-change';
import Tooltip from '../../../components/tooltip';
import TokenAmount from './token-amount';
import tokenPropTypes from '../prop-types';
import useDisplayCurrency from '../../preferences/hooks/use-display-currency';

const TokenListItemVolume = ({ statsPeriod, token }) => {
  const displayCurrency = useDisplayCurrency();
  const volume = _.get(token, 'stats.tradeVolume');
  const volumeChange = _.get(token, 'stats.tradeVolumeChange');
  const symbol = token.symbol !== null ? token.symbol : 'TKN';

  return (
    <Tooltip
      content={
        <dl>
          <div>
            <dt>{symbol}:</dt>
            <dd>{formatTokenAmount(volume.token)}</dd>
          </div>
          <div>
            <dt>
              {symbol} Change ({prettyPeriod(statsPeriod)}):
            </dt>
            <dd>
              {_.isNumber(volumeChange.token) && (
                <>
                  <Number precision={2}>{volumeChange.token}</Number>%
                </>
              )}
              {volumeChange.token === null && volume.token > 0 && 'n/a'}
              {volumeChange.token === null && volume.token === 0 && 'Unknown'}
            </dd>
          </div>
          <div css="margin-top: 8px;">
            <dt>{displayCurrency}:</dt>
            <dd>
              {volume.USD === 0 && 'Unknown'}
              {volume.USD > 0 && <LocalisedAmount amount={volume.USD} />}
            </dd>
          </div>
          <div>
            <dt>
              {displayCurrency} Change ({prettyPeriod(statsPeriod)}):
            </dt>
            <dd>
              {volumeChange.USD !== null && volume.USD > 0 && (
                <>
                  <Number precision={2}>{volumeChange.USD}</Number>%
                </>
              )}
              {volumeChange.USD === null && volume.USD > 0 && 'n/a'}
              {volumeChange.USD === null && volume.USD === 0 && 'Unknown'}
            </dd>
          </div>
        </dl>
      }
    >
      <span>
        <span css="display: block; line-height: 1; margin-bottom: 4px;">
          {volume.USD > 0 && (
            <LocalisedAmount amount={volume.USD} summarize title={false} />
          )}
          {volume.USD === 0 && volume.token > 0 && (
            <TokenAmount
              amount={volume.token}
              linked={false}
              summarize
              token={token}
            />
          )}
        </span>
        {_.isNumber(volumeChange.USD) && volume.USD > 0 && (
          <PercentageChange css="display: block; font-size: 14px;">
            {volumeChange.USD}
          </PercentageChange>
        )}
        {_.isNumber(volumeChange.token) && volume.USD === 0 && (
          <PercentageChange css="display: block; font-size: 14px;">
            {volumeChange.token}
          </PercentageChange>
        )}
      </span>
    </Tooltip>
  );
};

TokenListItemVolume.propTypes = {
  statsPeriod: PropTypes.string.isRequired,
  token: tokenPropTypes.tokenWithStats.isRequired,
};

export default TokenListItemVolume;
