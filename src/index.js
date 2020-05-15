import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';
import AutoReload from './util/auto-reload';

import 'tippy.js/dist/tippy.css';

OfflinePluginRuntime.install({
  onUpdateReady: () => {
    console.log('[SW]: Update ready');
    OfflinePluginRuntime.applyUpdate();
  },
  onUpdated: () => {
    console.log('[SW]: Update applied');
    // window.location.reload();
  },
});

ReactDOM.render(<App />, document.getElementById('root'));
AutoReload.start(process.env.REACT_APP_AUTO_RELOAD_INTERVAL);
