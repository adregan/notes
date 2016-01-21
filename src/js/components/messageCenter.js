import React from 'react';
import Message from './message';
import { connect } from 'react-redux';
import { dismissMessage } from '../actions/messages';
import classnames from 'classnames';


const MessageCenter = ({messages, dispatch}) => {
  let message = messages.first();
  let classes = classnames({'modal-container': message});

  return (
    <div className={classes}>
      {message ? <Message message={message} dispatch={dispatch} dismiss={dismissMessage} /> : null}
    </div>
  );
}

function select(state) {
  return {
    messages: state.messages
  };
}

export default connect(select)(MessageCenter);