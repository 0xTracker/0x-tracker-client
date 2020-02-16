import PropTypes from 'prop-types';
import React from 'react';

import ResetChartButton from './reset-chart-button';

const BrushableChartContainer = ({ brushActive, children, onBrushReset }) => (
  <div css="display: flex; flex-grow: 1; position: relative;">
    {brushActive && (
      <ResetChartButton
        css="position: absolute; right: 0; z-index: 10;"
        onClick={onBrushReset}
      />
    )}
    {children}
  </div>
);

BrushableChartContainer.propTypes = {
  brushActive: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onBrushReset: PropTypes.func.isRequired,
};

export default BrushableChartContainer;
