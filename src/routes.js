import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import App from './handlers/app';

const routes = (
  <Route path='app' component={App} />
);

export default routes;