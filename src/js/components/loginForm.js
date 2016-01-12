import React from 'react';

const LoginForm = ({username, password, onChange, onSubmit}) => {
  return (
    <form className='login-form' onSubmit={e => {e.preventDefault(); onSubmit();}}>
      <label className="login-form__label" htmlFor="username">
        Email or username
      </label>
      <input className='login-form__input'
        value={username}
        id='username'
        required={true}
        onChange={e => {onChange({'username': e.target.value})}} />
      <label className="login-form__label" htmlFor="password">
        Passphrase
      </label>
      <input className='login-form__input'
        value={password}
        id='password'
        type='password'
        required={true}
        onChange={e => {onChange({'password': e.target.value})}} />
      <button className='login-form__input login-form__submit' type='submit'>
        Login
      </button>
    </form>

  );
}

export default LoginForm;