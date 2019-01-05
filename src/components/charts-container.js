import { Card, CardBody, CardHeader, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';

const StyledChartsContainer = styled(Card)`
  border-radius: none;
  border: none;
  box-shadow: 0px 2px 4px rgba(126, 142, 177, 0.12);
`;

const ChartsContainerHeader = styled(CardHeader)`
  background: none;
  border-bottom: 1px solid ${colors.athensGray};
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

const ChartsContainerBody = styled(CardBody)`
  align-items: center;
  display: flex;
  height: 265px;
  justify-content: center;
  padding: 1rem;
`;

const ChartLink = styled(NavLink)`
  &&& {
    color: ${props => (props.active ? 'inherit' : colors.stormGray)};
    cursor: pointer;
    border: none;
    margin-right: 1rem;
    padding: 0;
  }
`;

const PeriodLink = styled(NavLink)`
  cursor: pointer;
  padding: 0.2rem 0.7rem;

  &&.active {
    background-color: ${colors.athensGray};
    color: inherit;
  }
`;

const Periods = styled(Nav).attrs({ pills: true })`
  align-self: flex-end;
  font-size: 0.8rem;
  margin-bottom: -0.2rem;
`;

class ChartsContainer extends PureComponent {
  constructor(props) {
    super(props);

    const { charts, defaultPeriod } = props;

    this.state = {
      selectedChart: charts[0].title,
      selectedPeriod: defaultPeriod,
    };
  }

  render() {
    const { charts, className, periods } = this.props;
    const { selectedPeriod, selectedChart } = this.state;

    const Chart = charts.find(chart => chart.title === selectedChart).component;
    const chartProps = { period: selectedPeriod };

    return (
      <StyledChartsContainer className={className}>
        <ChartsContainerHeader>
          {charts.length === 1 ? (
            charts[0].title
          ) : (
            <Nav card css="margin: 0;" tabs>
              {charts.map(chart => (
                <NavItem key={chart.title}>
                  <ChartLink
                    active={selectedChart === chart.title}
                    onClick={() =>
                      this.setState({ selectedChart: chart.title })
                    }
                  >
                    {chart.title}
                  </ChartLink>
                </NavItem>
              ))}
            </Nav>
          )}
          {periods && (
            <Periods>
              {periods.map(period => (
                <NavItem key={period.value}>
                  <PeriodLink
                    active={selectedPeriod === period.value}
                    onClick={() =>
                      this.setState({ selectedPeriod: period.value })
                    }
                  >
                    {period.label}
                  </PeriodLink>
                </NavItem>
              ))}
            </Periods>
          )}
        </ChartsContainerHeader>
        <ChartsContainerBody>
          {React.isValidElement(Chart) ? (
            React.cloneElement(Chart, chartProps)
          ) : (
            <Chart {...chartProps} />
          )}
        </ChartsContainerBody>
      </StyledChartsContainer>
    );
  }
}

ChartsContainer.propTypes = {
  charts: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
        .isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  defaultPeriod: PropTypes.string.isRequired,
  periods: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
};

ChartsContainer.defaultProps = {
  periods: undefined,
};

export default ChartsContainer;
