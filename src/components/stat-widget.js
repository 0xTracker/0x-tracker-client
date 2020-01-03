import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import Card from './card';
import CardBody from './card-body';
import prettyPeriod from '../util/pretty-period';
import sharedPropTypes from '../prop-types';

const StatWidgetTitle = styled.dt`
  color: ${colors.stormGray};
  font-size: 0.8rem;
  font-weight: normal;
  margin: 0;
  text-transform: uppercase;
`;

const StatWidgetValue = styled.dd`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
`;

const StatWidget = ({ className, period, title, children }) => (
  <Card className={className}>
    <CardBody padded>
      <dl css="margin: 0;">
        <StatWidgetTitle>
          {period ? `${title} (${prettyPeriod(period)})` : title}
        </StatWidgetTitle>
        <StatWidgetValue>{children}</StatWidgetValue>
      </dl>
    </CardBody>
  </Card>
);

StatWidget.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  period: sharedPropTypes.timePeriod,
  title: PropTypes.string.isRequired,
};

StatWidget.defaultProps = {
  className: undefined,
  period: undefined,
};

export default StatWidget;
