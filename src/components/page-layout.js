import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { media } from '../styles/util';
import PageTitleBlock from './page-title-block';

const PageBody = styled.div`
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
  padding: 1rem;

  ${media.greaterThan('md')`
    padding: 2rem 1.5rem;
  `}

  ${media.greaterThan('xl')`
    padding: 2rem;
  `}
`;

const PageLayout = ({ actions, centered, children, icon, subTitle, title }) => (
  <StyledPageLayout>
    {title && (
      <PageTitleBlock
        actions={actions}
        icon={icon}
        subTitle={subTitle}
        title={title}
      />
    )}
    <PageBody centered={centered}>{children}</PageBody>
  </StyledPageLayout>
);

PageLayout.propTypes = {
  actions: PropTypes.node,
  centered: PropTypes.bool,
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
  subTitle: PropTypes.string,
  title: PropTypes.node,
};

PageLayout.defaultProps = {
  actions: undefined,
  centered: false,
  icon: undefined,
  subTitle: undefined,
  title: undefined,
};

export default PageLayout;
