import React from 'react';
import { connect } from 'react-redux';

class App extends React.Component {
  componentDidMount() {
    window.onbeforeunload = () => {
      if (this.props.notes.filter(n => n.get('unsaved')).count()){
        return 'If you leave, your changes will be lost.';
      }
    }
  }
  render() {
    return (
      <div className="app-window">
        {this.props.children}
      </div>
    );
  }
}

function select(state) {
  return {
    notes: state.notes,
  };
}

export default connect(select)(App);
