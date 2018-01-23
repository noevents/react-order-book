import React from 'react';
import { hydrate } from 'react-dom';

import App from './client/App';

hydrate(
  <App orders={window.__PRELOADED_STATE__}/>, 
  document.getElementById('root')
);
