import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

import App from './components/app';
import ReduxContext from './components/redux-context';

if (process.env.REACT_APP_GA_TRACKING_ID) {
  ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
}

ReactDOM.render(
  <ReduxContext>
    <App />
  </ReduxContext>,
  document.getElementById('root'),
);
