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
import usePreferences from '../features/preferences/hooks/use-preferences';

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
`;

const Scrollport = styled.div`
  ${media.greaterThan('lg')`
    max-height: 100vh;
    overflow: auto;
  `}
`;

const AppLayout = ({ children }) => {
  const preferences = usePreferences();

  return (
    <AppContainer>
      <Visible at={['lg']}>
        <CompactSidebar />
      </Visible>
      <Visible above="lg">
        {preferences.values.sidebar === 'compact' ? (
          <CompactSidebar />
        ) : (
          <Sidebar />
        )}
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
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
