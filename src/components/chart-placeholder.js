import PropTypes from 'prop-types';
import React from 'react';

import { COLORS } from '../styles/constants';

const ChartPlaceholder = ({ children }) => (
  <div
    css={`
      align-items: center;
      color: ${COLORS.NEUTRAL.MYSTIC_600};
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
