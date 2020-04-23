import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { media } from '../../../styles/util';
import { COLORS } from '../../../styles/constants';
import HelpWidget from '../../../components/help-widget';

const Title = styled.dt`
  font-weight: 500;
  margin: 0.6rem 0 0;
  padding: 0 0 0.6rem;

  &:last-of-type {
    border: none;
    padding: 0;
  }

  ${media.greaterThan('md')`
    border-bottom: 1px solid ${COLORS.NEUTRAL.MYSTIC_200};
    width: 20%;
  `};
`;

const Value = styled.dd`
  border-bottom: 1px solid ${COLORS.NEUTRAL.MYSTIC_200};
  overflow: hidden;
  padding: 0 0 0.6rem;
  text-overflow: ellipsis;

  &:last-of-type {
    border: none;
    padding: 0;
  }

  ${media.greaterThan('md')`
    margin: 0.6rem 0 0;
    width: 80%;
  `};
`;

const FillDetail = ({ children, title, tooltip }) => (
  <>
    <Title>
      {tooltip !== undefined && (
        <HelpWidget
          css={`
            color: currentColor;
            margin-right: 0.5rem;
          `}
        >
          {tooltip}
        </HelpWidget>
      )}
      {title}:
    </Title>
    <Value>{children}</Value>
  </>
);

FillDetail.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  tooltip: PropTypes.node.isRequired,
};

export default FillDetail;
