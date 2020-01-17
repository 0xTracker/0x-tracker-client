import PropTypes from 'prop-types';
import React from 'react';

const ChartPlaceholder = ({ children }) => (
  <div css="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
    {children}
  </div>
);

ChartPlaceholder.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ChartPlaceholder;
