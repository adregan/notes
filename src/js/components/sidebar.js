import React from 'react';
import NotesList from './NotesList';
import Header from './header';

const search = (note, searchTerm) => {
  return note.get('title').toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
}

const Sidebar = ({onSearch, onSelect, onCreate, notes, searchTerm}) => {
  return (
    <section className="sidebar">
      <Header searchTerm={searchTerm} onCreate={onCreate} onSearch={onSearch} />
      <NotesList onSelect={onSelect} notes={ notes.filter(note => search(note, searchTerm)) } />
    </section>
  );
}

export default Sidebar;