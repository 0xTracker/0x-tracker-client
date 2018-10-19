import { Breadcrumb as BootstrapBreadcrumb, BreadcrumbItem } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Link from './link';

const StyledBreadcrumb = styled(BootstrapBreadcrumb)`
  .breadcrumb {
    background: none;
    margin: 0;
    padding: 0;
  }
`;

const Breadcrumb = ({ items }) => (
  <StyledBreadcrumb>
    <BreadcrumbItem>
      <Link href="/">Home</Link>
    </BreadcrumbItem>

    {items.map((item, index) => {
      if (index === items.length - 1) {
        return (
          <BreadcrumbItem active aria-current="page" key={item.url}>
            {item.title}
          </BreadcrumbItem>
        );
      }

      return (
        <BreadcrumbItem key={item.url}>
          <Link href={item.url}>{item.title}</Link>
        </BreadcrumbItem>
      );
    })}
  </StyledBreadcrumb>
);

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
    }),
  ).isRequired,
};

export default Breadcrumb;
