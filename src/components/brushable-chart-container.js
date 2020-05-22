import PropTypes from 'prop-types';
import React from 'react';

import ChartContainer from './chart-container';
import ResetChartButton from './reset-chart-button';

const BrushableChartContainer = ({ children, data }) => {
  const defaultBrushIndexes = {
    endIndex: data.length - 1,
    startIndex: 0,
  };

  const [brushIndexes, setBrushIndexes] = React.useState(defaultBrushIndexes);
  const [brushActive, setBrushActive] = React.useState(false);
  const [brushableData, updateData] = React.useState(data);

  const handleResetClick = () => {
    setBrushIndexes(defaultBrushIndexes);
    setBrushActive(false);
    updateData([...data]); // This is a hack to force the Recharts brush to reset
  };

  const handleBrushChange = (newIndexes) => {
    if (
      newIndexes.startIndex !== brushIndexes.startIndex ||
      newIndexes.endIndex !== brushIndexes.endIndex
    ) {
      setBrushIndexes(newIndexes);
      setBrushActive(
        newIndexes.startIndex !== defaultBrushIndexes.startIndex ||
          newIndexes.endIndex !== defaultBrushIndexes.endIndex,
      );
    }
  };

  return (
    <div css="display: flex; flex-grow: 1; position: relative;">
      {brushActive && (
        <ResetChartButton
          css="position: absolute; right: 0; z-index: 10;"
          onClick={handleResetClick}
        />
      )}
      <ChartContainer>
        {children({ brushIndexes, brushableData, handleBrushChange })}
      </ChartContainer>
    </div>
  );
};

BrushableChartContainer.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.array.isRequired,
};

export default BrushableChartContainer;
