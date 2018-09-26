import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

const FillStatusLabel = ({ status }) => {
  const className = {
    pending: 'text-warning',
    failed: 'text-danger',
    successful: 'text-success',
  }[status];

  return <span className={className}>{_.startCase(status)}</span>;
};

FillStatusLabel.propTypes = {
  status: PropTypes.string.isRequired,
};

export default FillStatusLabel;
