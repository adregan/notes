import React from 'react';

class NotesList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ul className="notes-list">
        {this.props.data.map((note, i) => {
          return (
            <li key={i}>{note.get('title', 'Untitled')}</li>
          );
        })}
      </ul>
    );
  }
}

export default NotesList; 