import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { media } from '../styles/util';

const StyledTopBarStat = styled.div`
  font-size: 13px;
  text-transform: uppercase;

  ${media.greaterThan('lg')`
    margin-right: 50px;

    &:last-child {
      margin-right: 0;
    }
  `};
`;

const TopBarStatValue = styled.div`
  color: rgb(136, 135, 135);
`;

const TopBarStat = ({ children, title }) => (
  <StyledTopBarStat>
    <strong>{title}</strong>
    <br />
    <TopBarStatValue>{children}</TopBarStatValue>
  </StyledTopBarStat>
);

TopBarStat.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default TopBarStat;
