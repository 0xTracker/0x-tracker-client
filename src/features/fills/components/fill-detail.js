import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { media } from '../../../styles/util';
import { COLORS } from '../../../styles/constants';
import HelpWidget from '../../../components/help-widget';
import Visible from '../../../components/visible';

const Title = styled.dt`
  font-weight: 500;
  margin: 1rem 0 0;
  padding: 0 0 1rem;
  white-space: nowrap;

  &:last-of-type {
    border: none;
  }

  ${media.greaterThan('md')`
    border-bottom: 1px solid ${COLORS.NEUTRAL.MYSTIC_200};
    width: 30%;

    &:last-of-type {
      padding: 0;
    }
  `};

  ${media.greaterThan('lg')`
    width: 20%;
  `};
`;

const Value = styled.dd`
  align-items: center;
  display: flex;
  border-bottom: 1px solid ${COLORS.NEUTRAL.MYSTIC_200};
  overflow: hidden;
  padding: 0 0 0.75rem;
  text-overflow: ellipsis;

  &:last-of-type {
    border: none;
    padding-bottom: 0;
  }

  ${media.greaterThan('md')`
    margin: 0.6rem 0 0;
    width: 70%;

    &:last-of-type {
      padding: 0;
    }
  `};

  ${media.greaterThan('lg')`
    width: 80%;
  `};
`;

const FillDetail = ({ children, title, tooltip }) => (
  <>
    <Title>
      {tooltip !== undefined && (
        <Visible above="sm">
          <HelpWidget
            css={`
              color: ${COLORS.NEUTRAL.MYSTIC_700};
              margin-right: 0.5rem;
            `}
          >
            {tooltip}
          </HelpWidget>
        </Visible>
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
