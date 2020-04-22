import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../styles/constants';

const ChartTooltipWrapper = styled.div`
  background-color: ${COLORS.PRIMARY.SCAMPI_800};
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  color: white;
  padding: 1rem;
  text-align: left;
`;

const ChartTooltipItemTitle = styled.dt`
  color: ${COLORS.PRIMARY.SCAMPI_200};
  display: inline-block;
  font-size: 0.7rem;
  font-weight: bold;
  margin: 0;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const ChartTooltipItemValue = styled.dd`
  display: inline-block;
  font-size: 0.8rem;
  margin: 0 0 0 0.25rem;
`;

const ChartTooltip = ({ items }) => (
  <ChartTooltipWrapper>
    <dl css="margin: 0; padding: 0;">
      {items.map((item) => (
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
      value: PropTypes.node.isRequired,
    }),
  ).isRequired,
};

export default ChartTooltip;
