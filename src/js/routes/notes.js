import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from '../components/sidebar';
import Immutable from 'immutable';
import notes from '../dummyData';

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: notes,
      search: Immutable.List()
    }
  }
  handleSearch(searchTerm) {
    let search = Immutable.List(
      this.state.notes.filter(
        note => note.get('title')
                    .toLowerCase()
                    .indexOf(searchTerm.toLowerCase()) !== -1
    ));

    this.setState({search});
  }
  handleCreate(title) {
    let newNote = Immutable.Map({title});
    let notes = this.state.notes.unshift(newNote);
    this.setState({notes});
  }
  render() {
    return (
      <article className="notes">
        <Sidebar
          notes={(!this.state.search.size) ? this.state.notes: this.state.search}
          onSearch={this.handleSearch.bind(this)}
          onCreate={this.handleCreate.bind(this)} />
        {this.props.children || <div className="no-note"><p>No Note Selected</p></div>}
      </article>
    );
  }
}

export default Notes;