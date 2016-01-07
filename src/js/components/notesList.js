import React from 'react';
import classnames from 'classnames';

const NotesList = ({ notes, onSelect }) => {
  return (
    <ul className="notes-list">
      {(!notes.count()) ? 
          <li className="no-results">No Results (enter to create)</li> :
          notes.map((note, index) => {
            let title = note.get('title');
            let classes = classnames(
              'notes-list__note',
              {'notes-list__note--unsaved': note.get('unsaved')}
            );
            return (
              <li className={classes}
                key={index}
                onClick={() => onSelect(index, title, note.get('body'))} >
                { title }
              </li>
            )})
      }
    </ul>
  );
}

export default NotesList; 