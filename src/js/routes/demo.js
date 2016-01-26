import React from 'react';
import Logo from '../components/logo';
import { createDemoUser } from '../actions/demo';
import { connect } from 'react-redux';

const Demo = ({dispatch, loginStatus}) => {
  return (
    <div>
      <Logo color="light" className="login-logo"/>
      <article className="login">
        <p>Create a passphrase for your demo account. Please be patient, it can take a while to generate the keypair.</p>
        <form className='login-form' onSubmit={e => {
          e.preventDefault();
          dispatch(createDemoUser(e.target[0].value));
        }}>
          <label className="login-form__label" htmlFor="password">Passphrase</label>
          <input className="login-form__input" type="password" id="password" required={true} />
          
          <button className="login-form__input login-form__submit" type="submit" disabled={loginStatus === 'LOGGING_IN'} >
            {loginStatus === 'LOGGING_IN' ? 'Creating Demo' : 'Start Demo'}
          </button>
        </form>
      </article>
    </div>
  );
}

function select(state) {
  return {
    loginStatus: state.loginStatus
  };
}

export default connect(select)(Demo);