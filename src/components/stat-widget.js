import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import Card from './card';

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

const StatWidget = ({ className, title, children }) => (
  <Card className={className} padded>
    <dl css="margin: 0;">
      <StatWidgetTitle>{title}</StatWidgetTitle>
      <StatWidgetValue>{children}</StatWidgetValue>
    </dl>
  </Card>
);

StatWidget.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
};

StatWidget.defaultProps = {
  className: undefined,
};

export default StatWidget;
