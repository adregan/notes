import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './components/sidebar';
import Editor from './components/editor';

class App extends React.Component {
  render() {
    return (
      <div>
        <Sidebar />
        <Editor />
      </div>
    );
  }
}

export default App;