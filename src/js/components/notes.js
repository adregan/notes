import React from 'react';

const NotesList = ({data}) => {
  return (
    <ul className="notes-list">
      {data.map((note, i) => {
        return (
          <li key={i}>{note.get('title', 'Untitled')}</li>
        );
      })}
    </ul>
  );
}

export default NotesList; 