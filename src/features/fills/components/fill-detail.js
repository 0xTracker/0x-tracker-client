import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';

import { media } from '../../../styles/util';
import { colors } from '../../../styles/constants';

const Title = styled.dt`
  font-weight: normal;
  margin: 0.6rem 0 0;

  ${media.greaterThan('md')`
    ${props =>
      props.last
        ? ''
        : css`
            border-bottom: 1px solid ${colors.athensGray};
            padding: 0 0 0.6rem;
          `};
    
    
    width: 20%;
  `};
`;

const Value = styled.dd`
  overflow: hidden;
  text-overflow: ellipsis;

  ${props =>
    props.last
      ? ''
      : css`
          border-bottom: 1px solid ${colors.athensGray};
          padding: 0 0 0.6rem;
        `};

  ${media.greaterThan('md')`
    margin: 0.6rem 0 0;
    width: 80%;
  `};
`;

const FillDetail = ({ children, last, title }) => (
  <>
    <Title last={last}>{title}:</Title>
    <Value last={last}>{children}</Value>
  </>
);

FillDetail.propTypes = {
  children: PropTypes.node.isRequired,
  last: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

FillDetail.defaultProps = {
  last: false,
};

export default FillDetail;
