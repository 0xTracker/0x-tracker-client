import PropTypes from 'prop-types';
import React from 'react';

import Paginator from '../../../components/paginator';
import tokensPropTypes from '../prop-types';
import TokenListItem from './token-list-item';

const TokenList = ({
  onPageChange,
  page,
  pageCount,
  pageSize,
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
            <th>Type</th>
            <th css="text-align: right;">Last Price</th>
            <th css="text-align: right;">Fills</th>
            <th css="text-align: right;">Volume</th>
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
  recordCount: PropTypes.number.isRequired,
  tokens: PropTypes.arrayOf(tokensPropTypes.tokenWithStats),
};

TokenList.defaultProps = {
  tokens: undefined,
};

export default TokenList;
