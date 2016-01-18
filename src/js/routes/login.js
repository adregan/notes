import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from '../components/loginForm';
import Logo from '../components/logo';
import fetch from '../utils/fetch';
import { connect } from 'react-redux';
import { logIn } from '../actions/user';

const Login = ({user, dispatch}) => {
  return (
    <div>
      <Logo color="light" className="login-logo"/>
      <article className="login">
        <p>You must have a Keybase.io account to use this app</p>
        <LoginForm
          loggingIn={user.get('loggingIn')}
          onSubmit={(username, password) => dispatch(logIn(username, password))} />
      </article>
    </div>
  );
}

function select(state) {
  return {
    user: state.user
  };
}

export default connect(select)(Login);