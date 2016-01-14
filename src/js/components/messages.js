import React from 'react';

const Messages = ({title, body, messageType, onClick, onCancel}) => {
  return (
    <div className={`${messageType}-popup`}>
      <h1 className={`${messageType}-popup__title`}>{title}</h1>
      <p className={`${messageType}-popup__body`}>{body}</p>
      <button onClick={e => onClick()} className="popup__ok">OK</button>
    </div>
  );
}

export default Messages;