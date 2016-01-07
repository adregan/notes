import React from 'react';

const NotesList = ({ notes, onSelect }) => {
  return (
    <ul className="notes-list">
      {(!notes.count()) ? 
          <li className="no-results">No Results (enter to create)</li> :
          notes.map((note, index) => {
            let title = note.get('title');
            return (
              <li className="notes-list__note"
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