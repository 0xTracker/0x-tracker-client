import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';
import ReduxContext from './components/redux-context';

ReactDOM.render(
  <ReduxContext>
    <App />
  </ReduxContext>,
  document.getElementById('root'),
);
