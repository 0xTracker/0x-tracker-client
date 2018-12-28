import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { media } from '../styles/util';
import Breadcrumb from './breadcrumb';
import Container from './container';
import { colors } from '../styles/constants';

const StyledContentHeader = styled.div`
  padding: 30px 0;
  border-radius: 0px 2px 4px rgba(126, 142, 177, 0.12);
`;

const TitleContainer = styled(Col).attrs({ xs: 12, md: 6 })`
  order: 2;
  text-align: center;
  ${media.greaterThan('md')`
    order: initial;
    text-align:left;
  `};
`;

const Title = styled.h1`
  display: inline;
  font-size: 1.2em;
  margin: 0;
`;

const SubTitle = styled.h2`
  color: ${colors.stormGray};
  display: inline;
  font-size: 1em;
  font-weight: normal;
  margin: 0 0 0 1em;
`;

const BreadcrumbContainer = styled(Col).attrs({ xs: 12, md: 6 })`
  display: none;

  ${media.greaterThan('md')`
    display: flex;
    justify-content: flex-end;
  `};
`;

const ContentHeader = ({ breadcrumbItems, subTitle, title }) => (
  <StyledContentHeader>
    <Container>
      <Row>
        <TitleContainer>
          <Title>{title}</Title>
          {subTitle ? <SubTitle>{subTitle}</SubTitle> : null}
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
  subTitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

ContentHeader.defaultProps = {
  subTitle: undefined,
};

export default ContentHeader;
