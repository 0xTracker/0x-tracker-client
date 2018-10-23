import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import Footer from './footer';
import Nav from './nav';
import TopBarContainer from './top-bar-container';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const AppBody = styled.div`
  flex-grow: 1;
`;

const AppLayout = ({ children }) => (
  <AppContainer>
    <TopBarContainer />
    <Nav />
    <AppBody>{children}</AppBody>
    <Footer />
  </AppContainer>
);

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
