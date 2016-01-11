import React from 'react';
import Notes from './notes';
import Header from './header';

const search = (note, searchTerm) => {
  return note.get('title').toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
}

const Sidebar = ({onSearch, onSelect, onCreate, notes, searchTerm}) => {
  return (
    <section className="sidebar">
      <Header onCreate={onCreate} />
      <Notes
        onSelect={onSelect} 
        onCreate={onCreate}
        onSearch={onSearch} 
        searchTerm={searchTerm} 
        notes={ notes.filter(note => search(note, searchTerm)) } />
    </section>
  );
}

export default Sidebar;