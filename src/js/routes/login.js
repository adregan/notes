import React from 'react';
import LoginForm from '../components/loginForm';
import Logo from '../components/logo';

const Login = () => {
  return (
    <div>
      <Logo color="light" className="login-logo"/>
      <article className="login">
        <p>You must have a Keybase.io account to use this app</p>
        <LoginForm />
      </article>
    </div>
  );
}

export default Login;