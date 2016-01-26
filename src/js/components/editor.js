import React from 'react';
import TitleEditor from './titleEditor';
import BodyEditor from './bodyEditor';
import { updateNote, saveNote, closeNote} from '../actions/notes';
import CloseButton from './closeButton';

const Editor = ({currentNote, dispatch}) => {
  if (currentNote.isEmpty()) {
    return <div className="no-note"><p>No Note Selected</p></div>;
  }

  let id = currentNote.get('id');
  let title = currentNote.getIn(['decrypted', 'title']);
  let body = currentNote.getIn(['decrypted', 'body']);
  let encrypted = currentNote.get('content');

  return (
    <form className="editor"
      onSubmit={(e) => {e.preventDefault(); dispatch(saveNote(id))}}>
      
      <div className="editor__header">
        <h2 className="note-title">{title}</h2>
        <CloseButton text={false} light={true}
          onClose={(e) => {e.preventDefault(); dispatch(closeNote())}} />
      </div>

      <BodyEditor className="editor__body" value={body}
        onChange={(body) => dispatch(updateNote(id, {body}))} />
    </form>
  );
}

export default Editor;
