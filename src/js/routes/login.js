import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from '../components/loginForm';
import Logo from '../components/logo';
import fetch from '../utils/fetch';
import { connect } from 'react-redux';
import { logIn, checkForReturningUser, updateUser } from '../store/actions';

export class Login extends React.Component {
  componentWillMount(){
    this.props.dispatch(checkForReturningUser());
  }
  render() {
    let user = this.props.user;
    let dispatch = this.props.dispatch;
    return (
      <div>
        <Logo color="light" className="login-logo"/>
        <article className="login">
          <p>You must have a Keybase.io account to use this app</p>
          <LoginForm
            username={user.get('username')}
            loggingIn={user.get('loggingIn')}
            onChange={username => dispatch(updateUser({username}))}
            onSubmit={(username, password) => dispatch(logIn(username, password))} />
        </article>
      </div>
    );
  }
}

function select(state) {
  return {
    user: state.user
  };
}

export default connect(select)(Login);