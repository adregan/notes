import React from 'react';
import Immutable from 'immutable';
import data from '../dummyData';
import NotesList from './notes';
import Header from './header';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      notes: data
    };
  }
  handleSearch(searchTerm) {
    let results = Immutable.List(
      this.state.data.filter(
        note => note.get('title')
                    .toLowerCase()
                    .indexOf(searchTerm.toLowerCase()) !== -1
    ));

    this.setState(
      {notes: results}
    );
  }
  handleCreate(title) {
    let date = new Date();
    title = title || `Untitled-${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

    let newNote = Immutable.Map({title});
    // TODO: Add data store with actions
    let data = this.state.data.unshift(newNote);
    this.setState(
      {data, notes: data}
    );
  }
  render() {
    return (
      <section ref="sidebar" className="sidebar">
        <Header 
          onSearch={this.handleSearch.bind(this)} 
          onCreate={this.handleCreate.bind(this)} />
        <NotesList data={this.state.notes} />
      </section>
    );
  }
}

export default Sidebar;