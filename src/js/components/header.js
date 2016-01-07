import React from 'react';

const Header = ({onSearch, searchTerm}) => {
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
          value={searchTerm}
          onChange={(e) => {onSearch(e.target.value)}}/>
      </div>
    </header>
  );
}

export default Header;