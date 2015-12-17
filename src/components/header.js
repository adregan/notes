import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }
  handleClick(event) {
    this.props.onCreate('New Note');
  }
  handleChange(event) {
    event.preventDefault();
    let value = event.target.value;
    this.setState({value});
    this.props.onSearch(value);
  }
  render() {
    return (
      <header className="sidebar-header">
        <object type="image/svg+xml" data="/logo.svg" className="sidebar-header__logo">
          <img src="/logo.png" alt="Notes" />
        </object>
        <div className="search">
          <input 
            placeholder="Search"
            className="search__input"
            name="search"
            type="text" 
            value={this.state.value}
            onChange={this.handleChange.bind(this)}/>
          <button 
            className="new-note"
            onClick={this.handleClick.bind(this)}>＋</button>
        </div>
      </header>
    );
  }
}

export default Header;