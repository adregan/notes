import React from 'react';
import { connect } from 'react-redux';

class Root extends React.Component {
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

export default Root;
