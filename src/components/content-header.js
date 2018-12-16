import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import { media } from '../styles/util';
import Breadcrumb from './breadcrumb';
import Container from './container';

const StyledContentHeader = styled.div`
  background: ${colors.white};
  padding: 20px 0;
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
  font-size: 1.2em;
  margin: 0;
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
          <Title>
            {title}
            {subTitle && <small className="text-muted"> {subTitle}</small>}
          </Title>
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
