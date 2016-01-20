import React from 'react';
import ReactDOM from 'react-dom';
import { Route, IndexRoute } from 'react-router';
import Root from './root';
import Login from './login';
import NotesApp from './notesApp';
import Settings from './settings';
import localforage from 'localforage';

const checkForPreviousSession = (next, replace, callback) => {
  console.log('You don\'t want to see me more that once really');
  let path = next.location.pathname.replace(/\//g, '');
  localforage.getItem('user')
    .then(user => {
      if (!user) {
        if (path !== 'login') {replace('/login/')}
        callback();
      }
      else {
        if (path === 'login') {replace('/')}
        callback();
      }
    })
}

const routes = (
  <Route path='/' component={Root}>
    <IndexRoute onEnter={checkForPreviousSession} component={NotesApp}/>
    <Route path='login' onEnter={checkForPreviousSession} component={Login} />
    <Route path='notes' onEnter={checkForPreviousSession} component={NotesApp}>
      <Route path='/settings' component={Settings} />
    </Route>
  </Route>
);

export default routes;