import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { media } from '../styles/util';
import Breadcrumb from './breadcrumb';
import Container from './container';

const StyledContentHeader = styled.div`
  padding: 2rem 0;
  border-radius: 0px 2px 4px rgba(126, 142, 177, 0.12);
`;

const TitleContainer = styled(Col).attrs({ md: 6, xs: 12 })`
  order: 2;
  ${media.greaterThan('md')`
    order: initial;
    text-align:left;
  `};
`;

const Title = styled.h1`
  display: inline;
  font-size: 1.2rem;
  margin: 0;
`;

const BreadcrumbContainer = styled(Col).attrs({ md: 6, xs: 12 })`
  display: none;

  ${media.greaterThan('md')`
    display: flex;
    justify-content: flex-end;
  `};
`;

const ContentHeader = ({ breadcrumbItems, title }) => (
  <StyledContentHeader>
    <Container>
      <Row>
        <TitleContainer>
          <Title>{title}</Title>
        </TitleContainer>
        <BreadcrumbContainer>
          <Breadcrumb items={breadcrumbItems} />
        </BreadcrumbContainer>
      </Row>
    </Container>
  </StyledContentHeader>
);

ContentHeader.propTypes = {
  breadcrumbItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default ContentHeader;
