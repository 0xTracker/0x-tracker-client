import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { media } from '../styles/util';
import Hidden from './hidden';
import PageTitleBlock from './page-title-block';
import TopBanner from '../features/advertising/components/top-banner';

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
  padding: 1.25rem;

  ${media.greaterThan('lg')`
    padding: 2rem;
  `}
`;

const PageLayout = ({ centered, children, filter, showBanner, title }) => (
  <StyledPageLayout>
    {title ? <PageTitleBlock title={title}>{filter}</PageTitleBlock> : null}
    {showBanner && (
      <Hidden above="lg">
        <TopBanner />
      </Hidden>
    )}
    <PageBody centered={centered}>{children}</PageBody>
  </StyledPageLayout>
);

PageLayout.propTypes = {
  centered: PropTypes.bool,
  children: PropTypes.node.isRequired,
  filter: PropTypes.node,
  showBanner: PropTypes.bool,
  title: PropTypes.node,
};

PageLayout.defaultProps = {
  centered: false,
  filter: undefined,
  showBanner: true,
  title: undefined,
};

export default PageLayout;
