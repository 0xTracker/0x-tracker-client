import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../styles/constants';
import Card from './card';
import CardBody from './card-body';
import HelpWidget from './help-widget';
import LoadingIndicator from './loading-indicator';
import prettyPeriod from '../util/pretty-period';
import sharedPropTypes from '../prop-types';

const StatWidgetTitle = styled.dt`
  align-items: center;
  color: ${COLORS.NEUTRAL.MYSTIC_600};
  display: flex;
  font-size: 11px;
  font-weight: 500;
  justify-content: space-between;
  letter-spacing: 0.05em;
  margin: 0;
  text-transform: uppercase;
`;

const StatWidgetValue = styled.dd`
  display: flex;
  flex-grow: 1;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
`;

const StatWidget = ({
  className,
  loading,
  period,
  showPeriod,
  tooltip,
  title,
  children,
}) => (
  <Card className={className} css="min-height: 80px;">
    <CardBody padded>
      <dl css="display: flex; flex-grow: 1; flex-direction: column; margin: 0;">
        <StatWidgetTitle>
          {period && showPeriod ? `${title} (${prettyPeriod(period)})` : title}
          {tooltip !== undefined && <HelpWidget>{tooltip}</HelpWidget>}
        </StatWidgetTitle>
        {loading ? (
          <LoadingIndicator css="margin: 16px 0 0;" size="small" type="cylon" />
        ) : (
          <StatWidgetValue>{children}</StatWidgetValue>
        )}
      </dl>
    </CardBody>
  </Card>
);

StatWidget.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  loading: PropTypes.bool,
  period: sharedPropTypes.timePeriod,
  showPeriod: PropTypes.bool,
  title: PropTypes.string.isRequired,
  tooltip: PropTypes.node,
};

StatWidget.defaultProps = {
  children: undefined,
  className: undefined,
  loading: false,
  period: undefined,
  showPeriod: true,
  tooltip: undefined,
};

export default StatWidget;
