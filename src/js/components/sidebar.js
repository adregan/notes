import React from 'react';
import Notes from './notes';
import Header from './header';

const Sidebar = ({onCreate}) => {
  return (
    <section className="sidebar">
      <Header onCreate={onCreate} />
      <Notes />
    </section>
  );
}

export default Sidebar;