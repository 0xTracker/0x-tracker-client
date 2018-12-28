import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Container from './container';
import ContentHeader from './content-header';

const ContentBody = styled(Container)`
  flex-grow: 1;
  padding-bottom: 36px;
`;

const StyledPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const PageLayout = ({ breadcrumbItems, children, subTitle, title }) => (
  <StyledPageLayout>
    {breadcrumbItems.length > 0 ? (
      <ContentHeader
        breadcrumbItems={breadcrumbItems}
        subTitle={subTitle}
        title={title}
      />
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
  subTitle: PropTypes.string,
  title: PropTypes.string,
};

PageLayout.defaultProps = {
  breadcrumbItems: [],
  subTitle: undefined,
  title: undefined,
};

export default PageLayout;
