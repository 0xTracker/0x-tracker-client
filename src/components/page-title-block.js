import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { media } from '../styles/util';

const Inner = styled.div`
  align-items: center;
  border-radius: 1px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  ${media.greaterThan('lg')`
  margin-bottom: 2rem;
  `};
`;

const Title = styled.h1`
  flex-basis: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  font-size: 18px;
  font-family: Cabin, -apple-system, BlinkMacSystemFont, segoe ui, roboto,
    oxygen, ubuntu, cantarell, fira sans, droid sans, helvetica neue, sans-serif;
  font-weight: 600;
  margin: 0;
  word-break: break-all;
`;

const FilterContainer = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
`;

const PageTitleBlock = ({ children, title }) => (
  <Inner>
    <Title>{title}</Title>
    {children ? <FilterContainer>{children}</FilterContainer> : null}
  </Inner>
);

PageTitleBlock.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node.isRequired,
};

PageTitleBlock.defaultProps = {
  children: undefined,
};

export default PageTitleBlock;
