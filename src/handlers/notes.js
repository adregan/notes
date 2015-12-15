import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from '../components/sidebar';
//import Editor from '../components/editor';

class Notes extends React.Component {
  // componentDidMount() {
  //   // TODO: Connect this to unsaved changes
  //   window.onbeforeunload = () => 'Are you sure?';
  // }
  render() {
    return (
      <article className="notes">
        <Sidebar />
        {this.props.children}
      </article>
    );
  }
}

export default Notes;