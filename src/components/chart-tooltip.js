import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';

const ChartTooltipWrapper = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.mischka};
  padding: 1rem;
  text-align: left;
`;

const ChartTooltipTitle = styled.h1`
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 1.2rem;
  text-align: center;
`;

const ChartTooltipItemTitle = styled.dt`
  display: inline-block;
  font-weight: normal;
`;

const ChartTooltipItemValue = styled.dd`
  display: inline-block;
  margin-left: 0.25rem;
`;

const ChartTooltip = ({ title, items }) => (
  <ChartTooltipWrapper>
    <ChartTooltipTitle>{title}</ChartTooltipTitle>
    <dl>
      {items.map(item => (
        <div key={item.label}>
          <ChartTooltipItemTitle>{item.label}:</ChartTooltipItemTitle>
          <ChartTooltipItemValue>{item.value}</ChartTooltipItemValue>
        </div>
      ))}
    </dl>
  </ChartTooltipWrapper>
);

ChartTooltip.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default ChartTooltip;
