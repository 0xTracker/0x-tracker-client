import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Tippy from '@tippyjs/react';

import { colors } from '../styles/constants';
import { HelpIcon } from './icons';
import Card from './card';
import CardBody from './card-body';
import prettyPeriod from '../util/pretty-period';
import sharedPropTypes from '../prop-types';

const StatWidgetTitle = styled.dt`
  align-items: center;
  color: ${colors.stormGray};
  display: flex;
  font-size: 0.8rem;
  font-weight: normal;
  justify-content: space-between;
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

const StatWidget = ({
  className,
  period,
  showPeriod,
  tooltip,
  title,
  children,
}) => (
  <Card className={className}>
    <CardBody padded>
      <dl css="margin: 0;">
        <StatWidgetTitle>
          {period && showPeriod ? `${title} (${prettyPeriod(period)})` : title}
          {tooltip !== undefined && (
            <Tippy content={tooltip}>
              <HelpIcon height={20} width={20} />
            </Tippy>
          )}
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
  showPeriod: PropTypes.bool,
  title: PropTypes.string.isRequired,
  tooltip: PropTypes.node,
};

StatWidget.defaultProps = {
  className: undefined,
  period: undefined,
  showPeriod: true,
  tooltip: undefined,
};

export default StatWidget;
