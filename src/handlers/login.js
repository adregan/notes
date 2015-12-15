import React from 'react';
import LoginForm from '../components/loginForm';
import fetch from '../utils/fetch';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      password: this.props.password,
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
    fetch('https://keybase.io/_/api/1.0/getsalt.json', {
      query: {email_or_username: username}})
      .then(resp => console.log(resp))
  }
  render() {
    return (
      <article className="login">
        <p>You must have a Keybase.io account to use this app</p>
        <LoginForm 
          username={this.state.username} 
          password={this.state.password}
          onChange={this.handleChange.bind(this)}
          onSubmit={this.handleSubmit.bind(this)} />
      </article>
    );
  }
}


export default Login;