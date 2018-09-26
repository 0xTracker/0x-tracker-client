import { BrowserRouter as Router } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import React from 'react';

import 'react-select/dist/react-select.css';
import 'bootstrap/dist/css/bootstrap.css';

import Footer from './footer';
import Nav from './nav';
import Routes from './routes';
import ScrollToTop from './scroll-to-top';
import TopBarContainer from './top-bar-container';

import '../styles/global.css';

const App = () => (
  <Router>
    <ScrollToTop>
      <TopBarContainer />
      <Nav />
      <Routes />
      <Footer />
    </ScrollToTop>
  </Router>
);

export default hot(module)(App);
