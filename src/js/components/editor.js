import React from 'react';
import BodyEditor from './bodyEditor';
import EncryptionViewer from './encryptionViewer';
import { saveNote, closeNote, renameNote, deleteNote } from '../actions/notes';
import CloseButton from './closeButton';
import throttle from 'lodash.throttle';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      encryptionViewer: false
    }
    this.autoSave = throttle(() => this.props.dispatch(saveNote(this.props.currentNote.get('id'))), 2000)
  }
  render() {
    let { currentNote, dispatch } = this.props;

    if (currentNote.isEmpty()) {
      return <div className="no-note"><p>No Note Selected</p></div>;
    }

    let id = currentNote.get('id');
    let saved = currentNote.get('saved');
    let saveClass = (!saved) ? 'editor-button--saving' : 'editor-button--save' 
    let title = currentNote.getIn(['decrypted', 'title']);
    let body = currentNote.getIn(['decrypted', 'body']);
    let encrypted = currentNote.get('content');

    return (
      <form className="editor" onSubmit={(e) => {e.preventDefault(); dispatch(saveNote(id))}}>
        
        <div className="editor__header">
          <h2 className="note-title">{title}</h2>
          <CloseButton text={false} light={true} onClose={(e) => {e.preventDefault(); dispatch(closeNote())}} />
        </div>

        <div className="editor__controls">
          <button className={`editor-button ${saveClass}`} type="submit">
            {(!saved) ? 'Saving' : 'Save'}
          </button>
          <button className="editor-button editor-button--rename" onClick={e => {e.preventDefault(); dispatch(renameNote(id))}}>
            Rename...
          </button>
          <button className={`editor-button editor-button--export ${!encrypted.length && 'editor-button--disabled'}`} onClick={e => {e.preventDefault(); if (encrypted.length) {this.setState({encryptionViewer: true})}}}>
            View/Export
          </button>
          <button className="editor-button editor-button--delete" onClick={e => {e.preventDefault(); dispatch(deleteNote(id))}}>
            Delete
          </button>
        </div>

        <BodyEditor className="editor__body" 
          id={id}
          value={body}
          autoSave={this.autoSave} />

        {this.state.encryptionViewer && encrypted.length && <EncryptionViewer onClose={e => this.setState({encryptionViewer: false})} id={id} content={encrypted} />}
      </form>
    );
  }
}

export default Editor;
