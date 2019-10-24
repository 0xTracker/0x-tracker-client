import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { media } from '../../../styles/util';
import { colors } from '../../../styles/constants';

const Title = styled.dt`
  border-bottom: 1px solid ${colors.athensGray};
  font-weight: normal;
  margin: 0.6rem 0 0;
  padding: 0 0 0.6rem;

  &:last-of-type {
    border: none;
    padding: 0;
  }

  ${media.greaterThan('md')`
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

const FillDetail = ({ children, title }) => (
  <>
    <Title>{title}:</Title>
    <Value>{children}</Value>
  </>
);

FillDetail.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default FillDetail;
