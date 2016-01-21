import React from 'react';

const CloseButton = ({onClose}) => {
  return (
    <button onClick={onClose} className="close-button">Close</button>
  );
}

export default CloseButton;