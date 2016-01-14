import React from 'react';
import Messages from './messages';

const MessageCenter = ({messages}) => {
  let classes = '';
  let message = false;
  if (messages.count()) {
    classes = 'modal-container';
    message = messages.first();
  }
  return (
    <div className={classes}>
      {message ? <Messages title={message.get('title')}
          body={message.get('body')}
          messageType={message.get('type')}
          onClick={message.get('action')}
          onCancel={message.get('cancel') || false} /> : null }
    </div>
  );
}

export default MessageCenter;