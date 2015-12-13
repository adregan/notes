import React from 'react';
import data from '../dummyData'
import Notes from './notes';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: data
    };
  }
  render() {
    return (
      <section ref="sidebar" className="sidebar">
        <header className="sidebar__header"><h1>Notes</h1></header>
        <Notes data={this.state.notes} />
      </section>
    );
  }
}

export default Sidebar;