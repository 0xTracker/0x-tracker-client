import { rgba } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';

const ChartTooltipWrapper = styled.div`
  background-color: ${colors.martinique};
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px 0 ${rgba(colors.black, 0.2)};
  color: ${colors.white};
  padding: 1rem;
  text-align: left;
`;

const ChartTooltipItemTitle = styled.dt`
  color: ${colors.santasGray};
  display: inline-block;
  font-size: 0.7rem;
  font-weight: bold;
  margin: 0;
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
