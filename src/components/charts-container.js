import { css, StyleSheet } from 'aphrodite';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import Link from './link';

const styles = StyleSheet.create({
  activePeriod: {
    backgroundColor: '#EBEBEB',
    color: 'inherit',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '0.5rem',
  },
  periods: {
    alignSelf: 'flex-end',
    fontSize: '12px',
    marginBottom: '-.2rem',
  },
  period: {
    padding: '.2rem .7rem',
  },
  wrapper: {
    borderRadius: 'none',
  },
});

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
    const { charts, chartsHeight, periods } = this.props;
    const { selectedPeriod, selectedChart } = this.state;

    const CardBody = charts.find(chart => chart.title === selectedChart)
      .component;

    const bodyProps = { period: selectedPeriod };

    return (
      <div className={classNames('card', css(styles.wrapper))}>
        <div className={classNames('card-header', css(styles.header))}>
          {charts.length === 1 ? (
            charts[0].title
          ) : (
            <ul className="nav nav-tabs card-header-tabs">
              {charts.map(chart => (
                <li className="nav-item" key={chart.title}>
                  <Link
                    className={classNames({
                      'nav-link': true,
                      active: selectedChart === chart.title,
                    })}
                    onClick={() =>
                      this.setState({ selectedChart: chart.title })
                    }
                  >
                    {chart.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {periods && (
            <ul className={classNames('nav', 'nav-pills', css(styles.periods))}>
              {periods.map(period => (
                <li className="nav-item" key={period.value}>
                  <Link
                    className={classNames({
                      'nav-link': true,
                      active: selectedPeriod === period.value,
                      [css(styles.activePeriod)]:
                        selectedPeriod === period.value,
                      [css(styles.period)]: true,
                    })}
                    onClick={() =>
                      this.setState({ selectedPeriod: period.value })
                    }
                  >
                    {period.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div
          className="card-body"
          style={{
            alignItems: 'center',
            display: 'flex',
            height: `${chartsHeight}px`,
            justifyContent: 'center',
          }}
        >
          {React.isValidElement(CardBody) ? (
            React.cloneElement(CardBody, bodyProps)
          ) : (
            <CardBody {...bodyProps} />
          )}
        </div>
      </div>
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
  chartsHeight: PropTypes.number.isRequired,
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
