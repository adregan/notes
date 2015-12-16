import React from 'react';
import ReactDOM from 'react-dom';
import { Route, IndexRoute } from 'react-router';
import App from './handlers/app';
import Login from './handlers/login';
import Notes from './handlers/notes';
import Editor from './handlers/editor';

function checkIfLoggedIn(nextState, replaceState) {
  // if (sessionStorage.privateKey) {
  //   replaceState({ nextPathname: nextState.location.pathname }, '/notes');
  // }
}


const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Login} onEnter={checkIfLoggedIn}/>
    <Route path='notes' component={Notes}>
      <Route path=':id' component={Editor} />
    </Route>
  </Route>
);

export default routes;