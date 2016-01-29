import React from 'react';
import { connect } from 'react-redux';
import MessageCenter from '../components/MessageCenter';
import { checkForCurrentSession } from '../actions/user';

class Root extends React.Component {
  componentDidMount() {
    window.onbeforeunload = (e) => {
      if (this.props.notes.filter(n => !n.get('saved')).count()){
        return 'You have unsaved changes. If you leave, your changes will be lost.';
      }
    }
  }
  render() {
    return (
      <div className="app-window">
        {this.props.children}
        <MessageCenter /> 
      </div>
    );
  }
}

function select(state) {
  return {
    notes: state.notes,
  };
}

export default connect(select)(Root);