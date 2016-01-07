import React from 'react';
import ReactDom from 'react-dom';

const BodyEditor = ({value, onChange, className}) => {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      className={className} />
  );
}

export default BodyEditor;