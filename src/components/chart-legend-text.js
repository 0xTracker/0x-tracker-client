import React from 'react';

import { COLORS } from '../styles/constants';

const ChartLegendText = (value) => (
  <span
    css={`
      color: ${COLORS.NEUTRAL.MYSTIC_800};
      font-size: 0.7rem;
      font-weight: 500;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    `}
  >
    {value}
  </span>
);

export default ChartLegendText;
