import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { media } from '../styles/util';
import { colors } from '../styles/constants';
import Container from './container';

const StyledContentHeader = styled.div`
  align-items: center;
  display: flex;
  min-height: 38px;

  ${media.greaterThan('sm')`
    margin: 0 0 1.5rem;
  `};
`;

const TitleContainer = styled(Col)`
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
  word-break: break-all;

  ${media.greaterThan('sm')`
    border: none;
    padding: 0;
  `};
`;

const ChildrenContainer = styled(Col).attrs({
  lg: { offset: 3, size: 3 },
  md: { offset: 2, size: 4 },
  sm: { offset: 1, size: 5 },
  xs: 12,
})`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;

  ${media.greaterThan('sm')`
    margin-bottom: 0;
  `};
`;

const PageTitleBlock = ({ children, title }) => (
  <StyledContentHeader>
    <Container>
      <Row>
        <TitleContainer>
          <Title>{title}</Title>
        </TitleContainer>
        {children ? <ChildrenContainer>{children}</ChildrenContainer> : null}
      </Row>
    </Container>
  </StyledContentHeader>
);

PageTitleBlock.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

PageTitleBlock.defaultProps = {
  children: undefined,
};

export default PageTitleBlock;
