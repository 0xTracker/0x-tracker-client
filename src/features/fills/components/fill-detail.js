import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { media } from '../../../styles/util';

const Title = styled.dt`
  ${media.greaterThan('md')`
    width: 20%;
  `};
`;

const Value = styled.dd`
  overflow: hidden;
  text-overflow: ellipsis;

  ${media.greaterThan('md')`
    width: 80%;
  `};
`;

const FillDetail = ({ children, title }) => (
  <>
    <Title>{title}</Title>
    <Value>{children}</Value>
  </>
);

FillDetail.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default FillDetail;
