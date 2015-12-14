import React from 'react';
import ReactDOM from 'react-dom';
import Login from './handlers/login';

document.addEventListener('DOMContentLoaded', function (event) {
  ReactDOM.render(
    <Login 
      username={document.getElementById('username').value}
      password={document.getElementById('password').value}/>,
    document.getElementById('app')
  );
});
