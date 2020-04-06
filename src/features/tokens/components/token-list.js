import PropTypes from 'prop-types';
import React from 'react';

import HelpWidget from '../../../components/help-widget';
import Paginator from '../../../components/paginator';
import tokensPropTypes from '../prop-types';
import TokenListItem from './token-list-item';

const TokenList = ({
  onPageChange,
  page,
  pageCount,
  pageSize,
  recordCount,
  statsPeriod,
  tokens,
}) => {
  const offset = (page - 1) * pageSize + 1;

  return (
    <>
      <table className="table table-responsive">
        <thead>
          <tr>
            <th>#</th>
            <th colSpan="2">Token</th>
            <th className="text-right">
              Price{' '}
              <HelpWidget css="margin-left: 0.25rem;">
                The most recent price for a token plus the 24h change in price.
                Only displayed for fungible tokens which have been traded on
                known relayers.
              </HelpWidget>
            </th>
            <th className="text-right">
              Trades
              <HelpWidget css="margin-left: 0.25rem;">
                {statsPeriod === 'all'
                  ? 'The total number of trades a token has been involved with since it was first traded on 0x. Only trades on known relayers are included in this metric.'
                  : `The total number of trades a token has been involved with in the last ${statsPeriod}. Only trades on known relayers are included in this metric.`}
              </HelpWidget>
            </th>
            <th className="text-right">
              Volume{' '}
              <HelpWidget css="margin-left: 0.25rem;">
                {statsPeriod === 'all'
                  ? 'The total trading volume for a token since it was first traded on 0x. Only trades on known relayers are included in this metric.'
                  : `The total trade volume for a token in the last ${statsPeriod}. Only trades on known relayers are included in this metric.`}
              </HelpWidget>
            </th>
            <th className="text-right">Volume Graph</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <TokenListItem
              key={token.address}
              position={index + offset}
              statsPeriod={statsPeriod}
              token={token}
            />
          ))}
        </tbody>
      </table>
      <Paginator
        onPageChange={onPageChange}
        page={page}
        pageCount={pageCount}
        pageSize={pageSize}
        recordCount={recordCount}
      />
    </>
  );
};

TokenList.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  recordCount: PropTypes.number.isRequired,
  statsPeriod: PropTypes.string.isRequired,
  tokens: PropTypes.arrayOf(tokensPropTypes.tokenWithStats),
};

TokenList.defaultProps = {
  tokens: undefined,
};

export default TokenList;
