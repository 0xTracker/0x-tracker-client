import PropTypes from 'prop-types';
import React from 'react';

import { colors } from '../styles/constants';

const ChartPlaceholder = ({ children }) => (
  <div
    css={`
      align-items: center;
      color: ${colors.santasGray};
      display: flex;
      height: 100%;
      justify-content: center;
      width: 100%;
    `}
  >
    {children}
  </div>
);

ChartPlaceholder.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ChartPlaceholder;
