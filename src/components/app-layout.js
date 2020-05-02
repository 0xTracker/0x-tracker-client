import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../styles/constants';
import Footer from './footer';
import Header from '../features/header/components/header';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const AppBody = styled.div`
  background-color: ${COLORS.NEUTRAL.MYSTIC_200};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 500px;
`;

const AppLayout = ({ children }) => (
  <AppContainer>
    <div className="header-215ea67e6e9422c229" />
    <Header />
    <AppBody>{children}</AppBody>
    <Footer />
  </AppContainer>
);

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
