import React from 'react';
import classnames from 'classnames';

const CloseButton = ({onClose, light, text}) => {
  light = light || false;
  text = text || false;
  const classes = classnames('close-button', {
    'close-button--light': light,
    'close-button--text': text
  })
  return (
    <button onClick={onClose} className={classes}>Close</button>
  );
}

export default CloseButton;