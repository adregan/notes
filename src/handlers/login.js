import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from '../components/loginForm';
import fetch from '../utils/fetch';
import cookie from 'react-cookie';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      password: this.props.password,
      error: false
    }
  }
  handleChange(options) {
    this.setState({
      [options.key]: options.value
    })
  }
  handleSubmit(options) {
    event.preventDefault();
    let { username, password } = options;
    // this.props.history.transitionTo('/notes')
    fetch('/login', {method: 'post', body: {username, password}})
      .then(resp => {
        let privateKey = resp.privateKey;
        let publicKey = resp.publicKey;
        let sessionCookie = resp.sessionCookie;
        sessionStorage.privateKey = JSON.stringify(privateKey);
        sessionStorage.publicKey = JSON.stringify(publicKey);
        cookie.save(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.options
        );
        cookie.save('notes', resp.notesCookie);
      })
      .catch(err => {
        console.error(err);
        // Assign this conditionally on err.response
        let error = (!err.response) ? 'So sorry. Something went wrong.' : err.response.body.error;
        this.setState({error});
      })
  }
  render() {
    return (
      <div>
        <object type="image/svg+xml" data="logolight.svg" className="login-logo">
          <img src="logolight.png" alt="Notes" />
        </object>
        <article className="login">
          <p>You must have a Keybase.io account to use this app</p>
          {this.state.error ? <p className='login-error'>{this.state.error}</p> : null}
          <LoginForm 
            username={this.state.username} 
            password={this.state.password}
            onChange={this.handleChange.bind(this)}
            onSubmit={this.handleSubmit.bind(this)} />
        </article>
      </div>
    );
  }
}

export default Login;