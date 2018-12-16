import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/constants';

const StyledDashboardMetric = styled.dl`
  background-color: ${colors.white};
  border-radius: 3px;
  margin: 0;
  padding: 16px;
  border-radius: 0px 2px 4px rgba(126, 142, 177, 0.12);
`;

const DashboardMetricTitle = styled.dt`
  color: ${colors.dustyGray};
  font-size: 0.8em;
  font-weight: normal;
  margin: 0;
  text-transform: uppercase;
`;

const DashboardMetricValue = styled.dd`
  display: flex;
  align-items: center;
  font-size: 1.2em;
  font-weight: bold;
  margin: 0;
`;

const DashboardMetric = ({ title, children }) => (
  <StyledDashboardMetric>
    <DashboardMetricTitle>{title}</DashboardMetricTitle>
    <DashboardMetricValue>{children}</DashboardMetricValue>
  </StyledDashboardMetric>
);

DashboardMetric.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default DashboardMetric;
