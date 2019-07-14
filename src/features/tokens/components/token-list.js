import PropTypes from 'prop-types';
import React from 'react';

import { TIME_PERIOD } from '../../../constants';
import Paginator from '../../../components/paginator';
import prettyPeriod from '../../../util/pretty-period';
import sharedPropTypes from '../../../prop-types';
import tokensPropTypes from '../prop-types';
import TokenListItem from './token-list-item';

const DEFAULT_PERIOD = TIME_PERIOD.DAY;

const TokenList = ({
  onPageChange,
  page,
  pageCount,
  pageSize,
  period,
  recordCount,
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
            <th css="text-align: right;">Last Price</th>
            <th css="text-align: right;">
              Fill Count ({prettyPeriod(period)})
            </th>
            <th css="text-align: right;">
              Fill Volume ({prettyPeriod(period)})
            </th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <TokenListItem
              key={token.address}
              period
              position={index + offset}
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
  period: sharedPropTypes.timePeriod,
  recordCount: PropTypes.number.isRequired,
  tokens: PropTypes.arrayOf(tokensPropTypes.tokenWithStats),
};

TokenList.defaultProps = {
  period: DEFAULT_PERIOD,
  tokens: undefined,
};

export default TokenList;
