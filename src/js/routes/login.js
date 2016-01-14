import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from '../components/loginForm';
import Logo from '../components/logo';
import fetch from '../utils/fetch';
import { connect } from 'react-redux';
import { logIn } from '../store/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }
  handleSubmit() {
    let { username, password } = this.state;

  }
  render() {
    return (
      <div>
        <Logo color="light" className="login-logo"/>
        <article className="login">
          <p>You must have a Keybase.io account to use this app</p>
          {this.state.error ? <p className='login-error'>{this.state.error}</p> : null}
          <LoginForm 
            username={this.state.username} 
            password={this.state.password}
            loggingIn={this.props.user.loggingIn}
            onChange={(change) => this.setState(change)}
            onSubmit={this.handleSubmit.bind(this)} />
        </article>
      </div>
    );
  }
}

function select(state) {
  return {
    user: state.user,
  };
}

export default connect(select)(Login);