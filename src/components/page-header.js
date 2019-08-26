import PropTypes from 'prop-types';
import React from 'react';

import ContentHeader from './content-header';
import FilterHeader from './filter-header';

const PageHeader = ({ breadcrumbItems, filter, title }) => {
  if (filter) {
    return <FilterHeader filter={filter} title={title} />;
  }

  return <ContentHeader breadcrumbItems={breadcrumbItems} title={title} />;
};

PageHeader.propTypes = {
  breadcrumbItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ),
  filter: PropTypes.node,
  title: PropTypes.string.isRequired,
};

PageHeader.defaultProps = {
  breadcrumbItems: undefined,
  filter: undefined,
};

export default PageHeader;
