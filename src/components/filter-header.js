import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { media } from '../styles/util';
import { colors } from '../styles/constants';
import Container from './container';

const StyledContentHeader = styled.div`
  padding: 1.5rem 0;
  border-radius: 0px 2px 4px rgba(126, 142, 177, 0.12);
`;

const TitleContainer = styled(Col).attrs({ sm: 6, xs: 12 })`
  align-items: center;
  display: flex;
  margin: 0 0 1.25rem;

  ${media.greaterThan('sm')`
    margin: 0;
    text-align:left;
  `};
`;

const Title = styled.h1`
  border-bottom: 1px solid ${colors.mischka};
  font-size: 1.2rem;
  margin: 0;
  padding: 0 0 1.25rem;
  width: 100%;

  ${media.greaterThan('sm')`
    border: none;
    padding: 0;
  `};
`;

const FilterContainer = styled(Col).attrs({
  lg: { offset: 3, size: 3 },
  md: { offset: 2, size: 4 },
  sm: { offset: 1, size: 5 },
  xs: 12,
})`
  display: flex;
  justify-content: flex-end;
`;

const FilterHeader = ({ filter, title }) => (
  <StyledContentHeader>
    <Container>
      <Row>
        <TitleContainer>
          <Title>{title}</Title>
        </TitleContainer>
        <FilterContainer>{filter}</FilterContainer>
      </Row>
    </Container>
  </StyledContentHeader>
);

FilterHeader.propTypes = {
  filter: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default FilterHeader;
