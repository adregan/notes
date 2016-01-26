import React from 'react';
import LoginForm from '../components/loginForm';
import Logo from '../components/logo';
import { startDemo } from '../actions/demo';
import { connect } from 'react-redux';
import history from './history';

const Login = ({dispatch}) => {
  return (
    <div>
      <Logo color="light" className="login-logo"/>
      <article className="login">
        <p>You must have a Keybase.io account to use this app.</p>
        <p>However, you can <a href='/demo' onClick={e => {e.preventDefault(); history.push('/demo/')}}>demo it here</a>.</p>
        <LoginForm />
      </article>
    </div>
  );
}

export default connect()(Login);