import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from '../components/sidebar';
import { connect } from 'react-redux';
import { addNote, search } from '../store/actions';

const Notes = (props) => {
  let notes = props.notes;
  let searchTerm = props.searchTerm;
  return (
    <article className="notes">
      <Sidebar
        onSearch={(term) => {props.dispatch(search(term))}}
        notes={ (searchTerm) ? searchResults(notes, searchTerm) : notes } />
      {props.children || <div className="no-note"><p>No Note Selected</p></div>}
    </article>
  );
}

function searchResults(notes, searchTerm) {
  return notes.filter(note => note.get('title')
    .toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
}

function select(state) {
  return {
    notes: state.notes,
    searchTerm: state.searchTerm
  };
}

export default connect(select)(Notes);
