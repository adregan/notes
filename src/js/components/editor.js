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
  let encrypted = currentNote.get('contents');

  return (
    <form className="editor"
      onSubmit={(e) => {e.preventDefault(); dispatch(saveNote(index, currentNote))}}>
      
      <div className="editor__header">
        <TitleEditor className="editor__title"  value={title} limit={50}
          onChange={(newTitle) => dispatch(updateNote(id, {decrypted: {title: newTitle, body}}))}/>
      </div>

      <BodyEditor className="editor__body" value={body}
        onChange={(newBody) => dispatch(updateNote(id, {decrypted: {body: newBody, title}}))} />

      <button type="submit" className="editor__button">Save</button>
      <div className="encrypted">{encrypted}</div>
    </form>
  );
}

export default Editor;
