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
      <form className='login-form' onSubmit={this.handleSubmit}>
        <input 
          className='login-form__input'
          value={this.props.username}
          id='username'
          ref='username' 
          type='text'
          required={true}
          onChange={this.handleChange} />
        <input
          className='login-form__input'
          value={this.props.password}
          id='password'
          ref='password' 
          type='password'
          required={true}
          onChange={this.handleChange} />
        <button 
          className='login-form__input login-form__submit'
          type='submit'>Login</button>
      </form>
    );
  }
}

export default LoginForm;