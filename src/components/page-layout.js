import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Container from './container';
import FilterHeader from './filter-header';

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
    {title ? <FilterHeader filter={filter} title={title} /> : null}
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
