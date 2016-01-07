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

  // componentDidMount() {
  //   ReactDom.findDOMNode(this).focus();
  // }

export default BodyEditor;