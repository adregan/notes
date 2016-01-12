import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from '../components/loginForm';
import Logo from '../components/logo';
import { api } from '../../../config';
import fetch from '../utils/fetch';
import { connect } from 'react-redux';
import { logIn } from '../store/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: false,
      loggingIn: false
    }
  }
  handleSubmit() {
    let { username, password } = this.state;
    let apiUrl = (window.location.hostname === 'localhost') ? api.dev : api.production;
    let loginUrl = `${apiUrl}/login`;

    this.setState({loggingIn: true});

    fetch(loginUrl, {method: 'post', body: {username, password}})
      .then(resp => {
        this.props.dispatch(logIn(resp));
        this.setState({error: false, loggingIn: false, username: '', password: ''});
      })
      .catch(err => {
        console.error(err);
        // Assign this conditionally on err.response
        let error = (!err.response) ? 'So sorry. Something went wrong.' : err.response.body.errorMessage;
        this.setState({loggingIn: false, error});
      })
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
            loggingIn={this.state.loggingIn}
            onChange={(change) => this.setState(change)}
            onSubmit={this.handleSubmit.bind(this)} />
        </article>
      </div>
    );
  }
}

export default connect()(Login);