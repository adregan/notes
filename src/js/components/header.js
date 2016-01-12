import React from 'react';
import Logo from '../components/logo';

const Header = ({onSearch, onCreate, searchTerm}) => {
  return (
    <header className="header">
      <button 
        className="header__button header__button--settings" 
        onClick={e => console.log('SETTINGS')}>Settings</button>
        <Logo color="dark" className="header__logo" />
      <button 
        className="header__button header__button--create" 
        onClick={e => onCreate()}>Create</button>
    </header>
  );
}

export default Header;