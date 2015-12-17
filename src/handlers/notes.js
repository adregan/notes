import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from '../components/sidebar';

class Notes extends React.Component {
  render() {
    return (
      <article className="notes">
        <Sidebar />
        {this.props.children || <div className="no-note"><p>No Note Selected</p></div>}
      </article>
    );
  }
}

export default Notes;