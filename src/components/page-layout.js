import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Container from './container';
import PageTitleBlock from './page-title-block';

const PageBody = styled(Container)`
  align-items: ${props => (props.centered ? 'center' : 'initial')};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: ${props => (props.centered ? 'center' : 'initial')};
  padding-bottom: 1rem;
`;

const StyledPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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
  title: PropTypes.string,
};

PageLayout.defaultProps = {
  centered: false,
  filter: undefined,
  title: undefined,
};

export default PageLayout;
