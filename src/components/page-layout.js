import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Container from './container';
import PageHeader from './page-header';

const PageBody = styled(Container)`
  align-items: ${props => (props.centered ? 'center' : 'initial')};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: ${props => (props.centered ? 'center' : 'initial')};
  padding-bottom: 2.5rem;
`;

const StyledPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const PageLayout = ({ breadcrumbItems, centered, children, filter, title }) => (
  <StyledPageLayout>
    {title ? (
      <PageHeader
        breadcrumbItems={breadcrumbItems}
        filter={filter}
        title={title}
      />
    ) : null}
    <PageBody centered={centered}>{children}</PageBody>
  </StyledPageLayout>
);

PageLayout.propTypes = {
  breadcrumbItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ),
  centered: PropTypes.bool,
  children: PropTypes.node.isRequired,
  filter: PropTypes.node,
  title: PropTypes.string,
};

PageLayout.defaultProps = {
  breadcrumbItems: [],
  centered: false,
  filter: undefined,
  title: undefined,
};

export default PageLayout;
