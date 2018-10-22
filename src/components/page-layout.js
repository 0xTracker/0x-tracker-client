import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import ContentHeader from './content-header';
import ContentSection from './content-section';

const PageBody = styled(ContentSection)`
  height: 100%;
`;

const PageLayout = ({ breadcrumbItems, children, subTitle, title }) => (
  <React.Fragment>
    {breadcrumbItems.length > 0 && (
      <ContentHeader
        breadcrumbItems={breadcrumbItems}
        subTitle={subTitle}
        title={title}
      />
    )}
    <PageBody>{children}</PageBody>
  </React.Fragment>
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
