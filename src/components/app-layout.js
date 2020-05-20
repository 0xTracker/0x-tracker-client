import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../styles/constants';
import { media } from '../styles/util';
import CompactSidebar from './compact-sidebar';
import Footer from './footer';
import Header from '../features/header/components/header';
import Hidden from './hidden';
import MobileHeader from '../features/header/components/mobile-header';
import Sidebar from './sidebar';
import Visible from './visible';

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
`;

const AppBody = styled.div`
  background-color: ${COLORS.NEUTRAL.MYSTIC_200};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 500px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex-shrink: 1;
  max-width: 100%;

  ${media.greaterThan('lg')`
    max-width: calc(100vw - 72px);
  `}

  ${media.greaterThan('xl')`
    max-width: calc(100vw - 250px);
  `}
`;

const Scrollport = styled.div`
  overflow: auto;
  max-height: 100vh;
`;

const AppLayout = ({ children }) => (
  <AppContainer>
    <Visible at={['lg']}>
      <CompactSidebar />
    </Visible>
    <Visible above="lg">
      <Sidebar />
    </Visible>
    <Main>
      <Scrollport>
        <Hidden above="md">
          <MobileHeader />
        </Hidden>
        <Visible above="md">
          <Header />
        </Visible>
        <AppBody>{children}</AppBody>
        <Footer />
      </Scrollport>
    </Main>
  </AppContainer>
);

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
