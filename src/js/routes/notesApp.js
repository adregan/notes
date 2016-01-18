import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from '../components/sidebar';
import Editor from '../components/editor';
import { connect } from 'react-redux';
import { addNote, selectNote } from '../actions/notes';
import { search } from '../actions/search';

const NotesApp = (props) => {
  let notes = props.notes;
  let searchTerm = props.searchTerm;
  let currentNote = props.currentNote;
  let dispatch = props.dispatch;
  let messages = props.messages;

  return (
    <article className="notes-app">
      <Sidebar
        onSearch={ term => dispatch(search(term)) }
        onCreate={ title => dispatch(addNote(title || 'Untitled Note')) }
        onSelect={ (index, title, body) => dispatch(selectNote(index, title, body)) }
        searchTerm={ searchTerm }
        notes={ notes } />
      <Editor currentNote={currentNote} dispatch={dispatch} /> 
    </article>
  );
}

function select(state) {
  return {
    notes: state.notes,
    searchTerm: state.searchTerm,
    currentNote: state.currentNote,
    messages: state.messages
  };
}

export default connect(select)(NotesApp);
