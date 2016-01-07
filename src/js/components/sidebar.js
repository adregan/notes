import React from 'react';
import NotesList from './notes';
import Header from './header';

const Sidebar = ({onSearch, notes}) => {
  return (
    <section className="sidebar">
      <Header onSearch={onSearch} />
      <NotesList data={notes} />
    </section>
  );
}

export default Sidebar;