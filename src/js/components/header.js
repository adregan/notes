import React from 'react';

const Header = ({onSearch, onCreate, searchTerm}) => {
  return (
    <header className="sidebar-header">
      <object type="image/svg+xml" data="/logo.svg" className="sidebar-header__logo">
        <img src="/logo.png" alt="Notes" />
      </object>
      <form
        className="search"
        onSubmit={(e) => {
          e.preventDefault();
          onCreate(searchTerm);
        }}>
        <input 
          placeholder="Search or Create"
          className="search__input"
          name="search"
          type="text" 
          value={searchTerm}
          onChange={e => onSearch(e.target.value) }/>
      </form>
    </header>
  );
}

export default Header;