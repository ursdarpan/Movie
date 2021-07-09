import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import { Provider } from 'react-redux';
import Controller from './screens/Controller';
import store from './common/Store/MovieStore';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    {' '}
    <Controller />
  </Provider>, document.getElementById('root'),
);
registerServiceWorker();
