import React from 'react';

const Messages = ({title, body, type, actionText, onOK, onCancel}) => {
  let modifier = type.toLowerCase();
  return (
    <article className={`popup popup--${modifier}`}>
      <h1 className={`popup__title popup__title--${modifier}`}>{title}</h1>
      <p className={`popup__body popup__body--${modifier}`}>{body}</p>
      <div className={`popup__buttons popup__buttons--${modifier}`}>
        <button onClick={onOK}
          className={`popup__button popup__button--ok popup__button--ok-${modifier}`}>
          {actionText}
        </button>
        {onCancel ?
          <button onClick={onCancel} className={`popup__button popup__button--cancel popup__button--cancel-${modifier}`}>
            Cancel
          </button> :
          null}
      </div>
    </article>
  );
}

export default Messages;