import React from 'react';
import classnames from 'classnames';
import { selectNote } from '../actions/notes';
import { addMessage } from '../actions/messages';
import { connect } from 'react-redux';

const filterSearch = (note, searchTerm) => {
  let title = note.getIn(['decrypted', 'title']) || '';
  return title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
}

const Note = ({note, dispatch}) => {
  let encrypted = note.get('decrypted').isEmpty();
  let title = note.getIn(['decrypted', 'title'], 'Encrypted');
  let classes = classnames(
    'notes-list__note',
    {
      'notes-list__note--unsaved': !note.get('saved'),
      'notes-list__note--encrypted': encrypted
    }
  );

  const encryptedMessage = {
    title: 'This note is encrypted',
    body: 'To unlock your key and open encrypted notes, click on the lock icon in the top left corner.',
  }

  let action = (encrypted) ? () => dispatch(addMessage(encryptedMessage)) : () => dispatch(selectNote(note.get('id')))

  return (
    <li className={classes} onClick={action}>
      {title}
    </li>
  )
}

const Notes = ({ dispatch, notes, searchTerm}) => {
  let noResult = (searchTerm.length) ? 'No Results' : 'No Notes';
  notes = notes.filter(note => filterSearch(note, searchTerm));

  return (
    <ul className="notes-list">
      {(!notes.count()) ?
        <li className="no-results">{noResult}</li> :
        notes.map((note, i) => <Note key={i} note={note} dispatch={dispatch} />)}
    </ul>
  );
}

function select(state) {
  return {
    notes: state.notes,
  };
}

export default connect(select)(Notes);
