import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import routes from './routes/routes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { store } from './store/store';
import history from './routes/history';

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={history}/>
  </Provider>,
  document.getElementById('load')
);