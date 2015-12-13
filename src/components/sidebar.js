import React from 'react';
import notes from '../dummyData'

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes
    };
  }
  render() {
    console.log(this.state.notes)
    return (
      <section ref="sidebar" className="sidebar">
        <header className="sidebar__header"><h1>Notes</h1></header>
        <ul>
          {this.state.notes.map((note, i) => {
            return (
              <li key={i}>{note.get('title', 'Untitled')}</li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default Sidebar;