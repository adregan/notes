import React from 'react';
import classnames from 'classnames';
import { selectNote } from '../actions/notes';
import { connect } from 'react-redux';

const filterSearch = (note, searchTerm) => {
  let title = note.getIn(['decrypted', 'title']) || '';
  return title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
}

const Note = ({note, onClick}) => {
  let title = note.getIn(['decrypted', 'title'], 'Encrypted');
  let classes = classnames(
    'notes-list__note',
    {'notes-list__note--unsaved': !note.get('saved')}
  );
  return (
    <li className={classes} onClick={onClick} >
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
        notes.map((note, i) => <Note key={i} note={note} onClick={() => dispatch(selectNote(note.get('id')))} />)}
    </ul>
  );
}

function select(state) {
  return {
    notes: state.notes,
  };
}

export default connect(select)(Notes);
