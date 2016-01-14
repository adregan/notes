import React from 'react';

const LoginForm = ({onSubmit, loggingIn}) => {
  return (
    <form className='login-form' onSubmit={e => {e.preventDefault(); onSubmit(e.target[0].value, e.target[1].value);}}>
      <label className="login-form__label" htmlFor="username">Email or username</label>
      <input className="login-form__input" id="username" required={true} />
      
      <label className="login-form__label" htmlFor="password">Passphrase</label>
      <input className="login-form__input" type="password" id="password" required={true} />
      
      <button className="login-form__input login-form__submit" type="submit" disabled={loggingIn} >
        {loggingIn ? 'Logging In' : 'Login'}
      </button>
    </form>

  );
}

export default LoginForm;