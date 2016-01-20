import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from '../components/sidebar';
import Editor from '../components/editor';
import { connect } from 'react-redux';
import { addNote } from '../actions/notes';
import { renewSession } from '../actions/login';

class NotesApp extends React.Component {
  componentWillMount() {
    if (this.props.user.isEmpty()) {
      this.props.dispatch(renewSession())
    }
  }
  render () {
    let currentNote = this.props.currentNote;
    let dispatch = this.props.dispatch;

    return (
      <article className="notes-app">
        <Sidebar />
        <Editor currentNote={currentNote} dispatch={dispatch} /> 
        {this.props.children}
      </article>
    );
  }
}

function select(state) {
  return {
    currentNote: state.currentNote,
    user: state.user
  };
}

export default connect(select)(NotesApp);
