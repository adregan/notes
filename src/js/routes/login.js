import React from 'react';
import LoginForm from '../components/loginForm';
import Logo from '../components/logo';
import { startDemo } from '../actions/demo';
import { connect } from 'react-redux';

const Login = ({dispatch}) => {
  return (
    <div>
      <Logo color="light" className="login-logo"/>
      <article className="login">
        <p>You must have a Keybase.io account to use this app</p>
        <LoginForm />

        <button className="demo-button" onClick={() => dispatch(startDemo())}>Demo</button>
      </article>
    </div>
  );
}

export default connect()(Login);