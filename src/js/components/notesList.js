import React from 'react';

const NotesList = ({data}) => {
  return (
    <ul className="notes-list">
      {(data.count()) ? 
        data.map((note, i) => {
          return (
            <li key={i}>{note.get('title', 'Untitled')}</li>
          );
        }) : <li className="no-results">No Results (enter to create)</li>}
    </ul>
  );
}

export default NotesList; 