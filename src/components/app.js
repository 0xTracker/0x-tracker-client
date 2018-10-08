import { hot } from 'react-hot-loader';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import Footer from './footer';
import Nav from './nav';
import Router from './router';
import Routes from './routes';
import TopBarContainer from './top-bar-container';

import '../styles/global.css';

const App = () => (
  <Router>
    <TopBarContainer />
    <Nav />
    <Routes />
    <Footer />
  </Router>
);

export default hot(module)(App);
