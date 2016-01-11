import React from 'react';

const Header = ({onSearch, onCreate, searchTerm}) => {
  return (
    <header className="header">
      <button 
        className="header__button header__button--settings" 
        onClick={e => console.log('SETTINGS')}>Settings</button>
      <object type="image/svg+xml" data="/logo.svg" className="header__logo">
        <img src="/logo.png" alt="Notes" />
      </object>
      <button 
        className="header__button header__button--create" 
        onClick={e => onCreate()}>Create</button>
    </header>
  );
}

export default Header;