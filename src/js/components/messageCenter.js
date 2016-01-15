import React from 'react';
import Messages from './messages';
import {dismissMessage} from '../store/actions';

const MessageCenter = ({messages, dispatch}) => {
  let classes = '';
  let message = false;
  let onCancel = false;
  if (messages.count()) {
    classes = 'modal-container';
    message = messages.first();
    onCancel = message.get('cancel') && function(){dispatch(dismissMessage())}; 
  }

  return (
    <div className={classes}>
      {message && 
        <Messages title={message.get('title')}
          body={message.get('body')}
          type={message.get('type')}
          actionText={message.get('actionText')}
          hasCancel={message.get('hasCancel')}
          onOK={() => dispatch(message.get('action')())}
          onCancel={onCancel} /> }
    </div>
  );
}

export default MessageCenter;