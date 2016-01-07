import React from 'react';

const TitleEditor = ({value, onChange, className, limit}) => {
  return (
    <input
      type="text" 
      className={className}
      value={value}
      onChange={e => onChange(e.target.value.substr(0, limit))} />
  );
}

export default TitleEditor;