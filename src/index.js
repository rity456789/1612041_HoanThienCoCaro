import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import * as serviceWorker from './serviceWorker';
import CoCaroApp from './Reducers/index';
import CoCaro from './Containers/CoCaro';
import './index.css';

const store = createStore(CoCaroApp);

ReactDOM.render(
  <Provider store={store}>
    <CoCaro />
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
