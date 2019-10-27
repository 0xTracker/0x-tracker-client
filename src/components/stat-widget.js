import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import Card from './card';
import LoadingIndicator from './loading-indicator';

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

const loadingIndicator = <LoadingIndicator size="small" type="cylon" />;

const StatWidget = ({ className, title, children }) => (
  <Card className={className} css="min-height: 77px;" padded>
    <dl css="margin: 0;">
      <StatWidgetTitle>{title}</StatWidgetTitle>
      <StatWidgetValue>{children || loadingIndicator}</StatWidgetValue>
    </dl>
  </Card>
);

StatWidget.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
};

StatWidget.defaultProps = {
  children: undefined,
  className: undefined,
};

export default StatWidget;
