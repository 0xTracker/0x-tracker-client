import numeral from 'numeral';
import PropTypes from 'prop-types';
import React from 'react';

const formatNumber = value => numeral(value).format('0,0');

const PagingSummary = ({ className, page, pageSize, recordType, total }) => {
  const endIndex = page * pageSize;
  const startIndex = endIndex - pageSize + 1;

  return (
    <p className={className} css="margin: 0;">
      Displaying {formatNumber(startIndex)} to {formatNumber(endIndex)} of{' '}
      {formatNumber(total)} {recordType}
    </p>
  );
};

PagingSummary.propTypes = {
  className: PropTypes.string,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  recordType: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

PagingSummary.defaultProps = {
  className: undefined,
};

export default PagingSummary;
