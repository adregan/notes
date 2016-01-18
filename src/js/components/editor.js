import React from 'react';
import TitleEditor from './titleEditor';
import BodyEditor from './bodyEditor';
import { updateNote, saveNote} from '../actions/notes';

const Editor = ({currentNote, dispatch}) => {
  if (currentNote.isEmpty()) {
    return <div className="no-note"><p>No Note Selected</p></div>;
  }

  let index = currentNote.get('index');
  let title = currentNote.get('title');
  let body = currentNote.get('body');

  return (
    <form
      className="editor"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: Send Data to Server
        dispatch(saveNote(index, title, body))
      }}>
      <div className="editor__header">
        <TitleEditor
          placeholder="Untitled"
          value={title}
          onChange={(newTitle) => dispatch(updateNote(index, newTitle, body))}
          limit={100}
          className="editor__title" />

        <button type="submit" className="editor__button">Save</button>
      </div>
      <BodyEditor
        value={body}
        onChange={(newBody) => dispatch(updateNote(index, title, newBody))}
        className="editor__body" />
    </form>
  );
}

export default Editor;