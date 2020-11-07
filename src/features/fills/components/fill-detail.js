import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { media } from '../../../styles/util';
import { COLORS } from '../../../styles/constants';
import HelpWidget from '../../../components/help-widget';

const Title = styled.dt`
  font-weight: 500;
  margin: 0.75rem 0 0;
  padding: 0 0 0.75rem;

  &:last-of-type {
    border: none;
    padding: 0;
  }

  ${media.greaterThan('md')`
    border-bottom: 1px solid ${COLORS.NEUTRAL.MYSTIC_300};
    width: 20%;
  `};
`;

const Value = styled.dd`
  align-items: center;
  display: flex;
  border-bottom: 1px solid ${COLORS.NEUTRAL.MYSTIC_300};
  overflow: hidden;
  padding: 0 0 0.75rem;
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
            color: ${COLORS.NEUTRAL.MYSTIC_700};
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
