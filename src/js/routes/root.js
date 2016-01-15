import React from 'react';
import { connect } from 'react-redux';
import MessageCenter from '../components/MessageCenter'

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
        <MessageCenter messages={this.props.messages} dispatch={this.props.dispatch} /> 
      </div>
    );
  }
}

function select(state) {
  return {
    messages: state.messages
  };
}

export default connect(select)(Root);