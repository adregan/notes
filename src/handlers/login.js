import React from 'react';
import LoginForm from '../components/loginForm';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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
    console.log(username, password)
  }
  render() {
    return (
      <article className="login">
        <p>You must have a Keybase.io account to use this app</p>
        <LoginForm 
          username={this.state.username} 
          password={this.state.password}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit} />
      </article>
    );
  }
}


export default Login;