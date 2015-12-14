import React from 'react';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    event.preventDefault();
    this.props.onChange(
      {key: event.target.id, value: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    this.props.onSubmit({username, password});
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          value={this.props.username}
          id="username" 
          ref='username' 
          type='text'
          required={true}
          onChange={this.handleChange} />
        <input 
          value={this.props.password}
          id="password" 
          ref='password' 
          type='password'
          required={true}
          onChange={this.handleChange} />
        <button type='submit'>Log in</button>
      </form>
    );
  }
}

export default LoginForm;