import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.less';
import { createHashHistory } from 'history';
import configureStore from './configureStore';

const history = createHashHistory();

const initialState: any = {};

const store = configureStore(history, initialState);

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById('app'),
);

/** Hot Module Replacement */
if (process.env.NODE_ENV == 'development' && module.hot) {
  module.hot.accept();
}
