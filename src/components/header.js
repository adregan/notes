import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.state = {
      value: ''
    }
  }
  handleKey(event) {
    if (event.keyCode === 13) {
      this.props.onCreate(event.target.value);
      this.setState({value: ''});
      return false;
    }
  }
  handleChange(event) {
    event.preventDefault();
    let value = event.target.value;
    this.setState({value});
    this.props.onSearch(value);
  }
  render() {
    return (
      <header>
        <h1>Notes</h1>
        <input type="text" 
          value={this.state.value}
          onChange={this.handleChange}
          onKeyDown={this.handleKey} />
      </header>
    );
  }
}

export default Header;