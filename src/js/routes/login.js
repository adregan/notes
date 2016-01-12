import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from '../components/loginForm';
import Logo from '../components/logo';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: false
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
            onChange={(change) => this.setState(change)}
            onSubmit={this.handleSubmit.bind(this)} />
        </article>
      </div>
    );
  }
}

export default Login;