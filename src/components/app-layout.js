import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles/constants';
import Footer from './footer';
import Header from '../features/header/components/header';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const AppBody = styled.div`
  background-color: ${colors.athensGray};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 1.5rem 0;
`;

const AppLayout = ({ children }) => (
  <AppContainer>
    <Header />
    <AppBody>{children}</AppBody>
    <Footer />
  </AppContainer>
);

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
