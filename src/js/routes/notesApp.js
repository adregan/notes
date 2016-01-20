import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from '../components/sidebar';
import Editor from '../components/editor';
import { connect } from 'react-redux';
import { addNote } from '../actions/notes';

const NotesApp = (props) => {
  let currentNote = props.currentNote;
  let dispatch = props.dispatch;

  return (
    <article className="notes-app">
      <Sidebar onCreate={ title => dispatch(addNote(title || 'Untitled Note')) } />
      <Editor currentNote={currentNote} dispatch={dispatch} /> 
    </article>
  );
}

function select(state) {
  return {
    currentNote: state.currentNote,
  };
}

export default connect(select)(NotesApp);
