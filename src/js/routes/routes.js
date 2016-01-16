import React from 'react';
import ReactDOM from 'react-dom';
import { Route, IndexRoute } from 'react-router';
import Root from './root';
import Login from './login';
import NotesApp from './notesApp';
import Settings from './settings';

const routes = (
  <Route path='/' component={Root}>
    <IndexRoute component={NotesApp} />
    <Route path='login' component={Login} />
    <Route path='notes' component={NotesApp} />
    <Route path='settings' component={Settings} />
  </Route>
);

export default routes;