import React from 'react';

const Message = ({message, dismiss}) => {
  let {title, body, type, action} = message.toJS();
  let ok, hasCancel;

  switch (action.type) {
    default:
      ok = dismiss;
      hasCancel = false;
  }

  return (
    <article className={`popup popup--${type}`}>
      <h1 className="popup__title">{title}</h1>
      <p className="popup__body">{body}</p>
      <div className="popup__buttons">
        <button onClick={ok} className="popup__button popup__button--ok">{action.label}</button>
        {hasCancel ? <button onClick={dismiss} className="popup__button">Cancel</button> : null}
      </div>
    </article>
  );
}

export default Message;