import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Container from './container';
import ContentHeader from './content-header';

const ContentBody = styled(Container)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-bottom: 2.5rem;
`;

const StyledPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const PageLayout = ({ breadcrumbItems, children, title }) => (
  <StyledPageLayout>
    {breadcrumbItems.length > 0 ? (
      <ContentHeader breadcrumbItems={breadcrumbItems} title={title} />
    ) : null}
    <ContentBody>{children}</ContentBody>
  </StyledPageLayout>
);

PageLayout.propTypes = {
  breadcrumbItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ),
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

PageLayout.defaultProps = {
  breadcrumbItems: [],
  title: undefined,
};

export default PageLayout;
