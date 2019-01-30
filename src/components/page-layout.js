import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Container from './container';
import ContentHeader from './content-header';

const ContentBody = styled(Container)`
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

const PageLayout = ({ breadcrumbItems, centered, children, title }) => (
  <StyledPageLayout>
    {breadcrumbItems.length > 0 ? (
      <ContentHeader breadcrumbItems={breadcrumbItems} title={title} />
    ) : null}
    <ContentBody centered={centered}>{children}</ContentBody>
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
  title: PropTypes.string,
};

PageLayout.defaultProps = {
  breadcrumbItems: [],
  centered: false,
  title: undefined,
};

export default PageLayout;
