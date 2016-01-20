import React from 'react';
import { login } from '../actions/login';
import { connect } from 'react-redux';

const LoginForm = ({loginStatus, dispatch}) => {
  return (
    <form className='login-form' onSubmit={e => {
      e.preventDefault();
      dispatch(login(e.target[0].value, e.target[1].value));
    }}>
      <label className="login-form__label" htmlFor="username">Email or username</label>
      <input className="login-form__input" id="username" required={true} />
      
      <label className="login-form__label" htmlFor="password">Passphrase</label>
      <input className="login-form__input" type="password" id="password" required={true} />
      
      <button className="login-form__input login-form__submit" type="submit" disabled={loginStatus === 'LOGGING_IN'} >
        {loginStatus === 'LOGGING_IN' ? 'Logging In' : 'Login'}
      </button>
    </form>

  );
}

function select(state) {
  return {
    loginStatus: state.loginStatus
  };
}

export default connect(select)(LoginForm);