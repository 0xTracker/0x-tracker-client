import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { media } from '../styles/util';
import Container from './container';
import PageTitleBlock from './page-title-block';

const PageBody = styled(Container)`
  align-items: ${(props) => (props.centered ? 'center' : 'initial')};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: ${(props) => (props.centered ? 'center' : 'initial')};
`;

const StyledPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 1.25rem 0;

  ${media.greaterThan('md')`
    padding: 2rem 0;
  `}
`;

const PageLayout = ({ centered, children, filter, title }) => (
  <StyledPageLayout>
    {title ? <PageTitleBlock title={title}>{filter}</PageTitleBlock> : null}
    <PageBody centered={centered}>{children}</PageBody>
  </StyledPageLayout>
);

PageLayout.propTypes = {
  centered: PropTypes.bool,
  children: PropTypes.node.isRequired,
  filter: PropTypes.node,
  title: PropTypes.node,
};

PageLayout.defaultProps = {
  centered: false,
  filter: undefined,
  title: undefined,
};

export default PageLayout;
