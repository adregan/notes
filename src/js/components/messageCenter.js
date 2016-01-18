import React from 'react';
import Message from './message';
import { dismissMessage } from '../actions/messages';
import classnames from 'classnames';


const MessageCenter = ({messages, dispatch}) => {
  const dismiss = () => dispatch(dismissMessage());
  let message = messages.first();
  let classes = classnames({'modal-container': message});

  return (
    <div className={classes}>
      {message ? <Message message={message} dismiss={dismiss} /> : null}
    </div>
  );
}

export default MessageCenter;