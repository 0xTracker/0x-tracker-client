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

const PageLayout = ({
  actions,
  centered,
  children,
  icon,
  showBanner,
  subTitle,
  title,
}) => (
  <StyledPageLayout>
    {title && (
      <PageTitleBlock
        actions={actions}
        icon={icon}
        subTitle={subTitle}
        title={title}
      />
    )}
    {showBanner && (
      <Hidden above="lg">
        <TopBanner />
      </Hidden>
    )}
    <PageBody centered={centered}>{children}</PageBody>
  </StyledPageLayout>
);

PageLayout.propTypes = {
  actions: PropTypes.node,
  centered: PropTypes.bool,
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
  showBanner: PropTypes.bool,
  subTitle: PropTypes.string,
  title: PropTypes.node,
};

PageLayout.defaultProps = {
  actions: undefined,
  centered: false,
  icon: undefined,
  showBanner: true,
  subTitle: undefined,
  title: undefined,
};

export default PageLayout;
