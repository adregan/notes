import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import { notesApp } from './reducers';

const store = createStore(notesApp)

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} />
  </Provider>,
  document.getElementById('load')
);