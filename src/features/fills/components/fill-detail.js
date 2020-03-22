import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Tooltip from '@tippyjs/react';

import { media } from '../../../styles/util';
import { colors } from '../../../styles/constants';
import { HelpIcon } from '../../../components/icons';

const Title = styled.dt`
  font-weight: normal;
  margin: 0.6rem 0 0;
  padding: 0 0 0.6rem;

  &:last-of-type {
    border: none;
    padding: 0;
  }

  ${media.greaterThan('md')`
    border-bottom: 1px solid ${colors.athensGray};
    width: 20%;
  `};
`;

const Value = styled.dd`
  border-bottom: 1px solid ${colors.athensGray};
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
        <Tooltip content={tooltip}>
          <HelpIcon
            css={`
              color: ${colors.stormGray};
              margin-right: 0.5rem;
            `}
            height={20}
            width={20}
          />
        </Tooltip>
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
