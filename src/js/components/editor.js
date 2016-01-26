import React from 'react';
import BodyEditor from './bodyEditor';
import EncryptionViewer from './encryptionViewer';
import { updateNote, saveNote, closeNote, renameNote, deleteNote } from '../actions/notes';
import CloseButton from './closeButton';


class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      encryptionViewer: false
    }
  }
  render() {
    let { currentNote, dispatch } = this.props;

    if (currentNote.isEmpty()) {
      return <div className="no-note"><p>No Note Selected</p></div>;
    }

    let id = currentNote.get('id');
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
          <button className="editor-button editor-button--save" type="submit">
            Save
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

        <BodyEditor className="editor__body" value={body} onChange={(body) => dispatch(updateNote(id, {body}))} />
        {this.state.encryptionViewer && encrypted.length && <EncryptionViewer onClose={e => this.setState({encryptionViewer: false})} id={id} content={encrypted} />}
      </form>
    );
  }
}

export default Editor;
