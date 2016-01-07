import React from 'react';
import ReactDOM from 'react-dom';
import { Route, IndexRoute } from 'react-router';
import App from './app';
import Login from './login';
import Notes from './notes';
import Editor from './editor';

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Login} />
    <Route path='login' component={Login} />
    <Route path='notes' component={Notes}>
      <Route path=':id' component={Editor} />
    </Route>
  </Route>
);

export default routes;