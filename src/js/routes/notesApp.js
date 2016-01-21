import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from '../components/sidebar';
import Editor from '../components/editor';
import Avatar from '../components/avatar';
import UserPanel from '../components/userPanel';
import { connect } from 'react-redux';
import { addNote } from '../actions/notes';
import { renewSession } from '../actions/login';
import { userPanelToggle } from '../actions/user';

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
        <Avatar userPhoto={this.props.user.get('photoUrl')} onClick={() => dispatch(userPanelToggle())} />
        {this.props.userPanel && <UserPanel name={this.props.user.get('name')} dispatch={dispatch}/>}
        {this.props.children}
      </article>
    );
  }
}

function select(state) {
  return {
    currentNote: state.currentNote,
    user: state.user,
    userPanel: state.userPanel
  };
}

export default connect(select)(NotesApp);
