import React from 'react';

class Notes extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ul>
        {this.props.data.map((note, i) => {
          return (
            <li key={i}>{note.get('title', 'Untitled')}</li>
          );
        })}
      </ul>
    );
  }
}

export default Notes; 