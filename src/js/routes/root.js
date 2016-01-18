import React from 'react';
import { connect } from 'react-redux';
import MessageCenter from '../components/MessageCenter';
import { checkForCurrentSession } from '../actions/user';

class Root extends React.Component {
  componentWillMount() {
    this.props.dispatch(checkForCurrentSession());
  }
  componentDidMount() {
    window.onbeforeunload = (e) => {
      if (this.props.notes.filter(n => n.get('unsaved')).count()){
        return 'You have unsaved changes. If you leave, your changes will be lost.';
      }
    }
  }
  render() {
    return (
      <div className="app-window">
        {this.props.children}
        <MessageCenter messages={this.props.messages} dispatch={this.props.dispatch} /> 
      </div>
    );
  }
}

function select(state) {
  return {
    notes: state.notes,
    messages: state.messages
  };
}

export default connect(select)(Root);