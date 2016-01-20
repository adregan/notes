import React from 'react';
import TitleEditor from './titleEditor';
import BodyEditor from './bodyEditor';
import { updateNote, saveNote} from '../actions/notes';

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
        <TitleEditor className="editor__title"  value={title} limit={50}
          onChange={(title) => dispatch(updateNote(id, {title}))}/>
      </div>

      <BodyEditor className="editor__body" value={body}
        onChange={(body) => dispatch(updateNote(id, {body}))} />

      <button type="submit" className="editor__button">Save</button>
      <pre className="encrypted">{encrypted}</pre>
    </form>
  );
}

export default Editor;
