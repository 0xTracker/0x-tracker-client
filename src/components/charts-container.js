import _ from 'lodash';
import { Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import { useCurrentBreakpoint } from '../responsive-utils';
import Card from './card';
import CardBody from './card-body';
import CardHeader from './card-header';
import verbosePeriod from '../util/verbose-period';

const ChartLink = styled(NavLink)`
  &&& {
    color: ${(props) => (props.active ? 'inherit' : colors.santasGray)};
    font-weight: ${(props) => (props.active ? '500' : 'initial')};
    cursor: pointer;
    border: none;
    margin-right: 1rem;
    padding: 0;

    &:hover,
    &:active {
      color: ${(props) => (props.active ? 'inherit' : colors.stormGray)};
    }
  }
`;

const PeriodLink = styled(NavLink)`
  cursor: pointer;
  margin: 0 0.25rem;
  padding: 0.2rem 0.5rem;

  &&.active {
    background-color: ${colors.athensGrayer};
    color: inherit;
  }

  &:hover,
  &&.active:hover {
    background-color: ${colors.mystic};
  }
`;

const Periods = styled(Nav).attrs({ pills: true })`
  align-self: flex-end;
  font-size: 0.8rem;
  margin-bottom: -0.2rem;
`;

const ChartsContainer = ({
  charts,
  defaultPeriod,
  className,
  height,
  periods,
}) => {
  const [selectedChart, setSelectedChart] = useState(charts[0].title);
  const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriod);
  const currentBreakpoint = useCurrentBreakpoint();

  const Chart = charts.find((chart) => chart.title === selectedChart).component;
  const chartProps = { period: selectedPeriod };

  return (
    <Card
      className={className}
      css={`
        height: ${height};
      `}
    >
      <CardHeader>
        {charts.length === 1 ? (
          charts[0].title
        ) : (
          <Nav card css="margin: 0;" tabs>
            {charts.map((chart) => (
              <NavItem key={chart.title}>
                <ChartLink
                  active={selectedChart === chart.title}
                  onClick={() => setSelectedChart(chart.title)}
                >
                  {chart.title}
                </ChartLink>
              </NavItem>
            ))}
          </Nav>
        )}
        {currentBreakpoint.greaterThan('xs') && periods && (
          <Periods>
            {periods.map((period) => (
              <NavItem key={period.value}>
                <PeriodLink
                  active={selectedPeriod === period.value}
                  onClick={() => setSelectedPeriod(period.value)}
                  title={_.startCase(verbosePeriod(period.value))}
                >
                  {period.label}
                </PeriodLink>
              </NavItem>
            ))}
          </Periods>
        )}
      </CardHeader>
      <CardBody padded>
        {React.isValidElement(Chart) ? (
          React.cloneElement(Chart, chartProps)
        ) : (
          <Chart {...chartProps} />
        )}
      </CardBody>
    </Card>
  );
};

ChartsContainer.propTypes = {
  charts: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node,
        PropTypes.object,
      ]).isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  className: PropTypes.string,
  defaultPeriod: PropTypes.string.isRequired,
  height: PropTypes.string,
  periods: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
};

ChartsContainer.defaultProps = {
  className: undefined,
  height: '352px',
  periods: undefined,
};

export default ChartsContainer;
