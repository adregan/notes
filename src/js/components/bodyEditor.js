import React from 'react';
import ReactDom from 'react-dom';
import { updateNote } from '../actions/notes';
import { connect } from 'react-redux';

const BodyEditor = ({id, value, autoSave, className, dispatch}) => {
  return (
    <textarea
      value={value}
      onChange={e => {
        dispatch(updateNote(id, {body: e.target.value}));
        autoSave();
      }}
      className={className} />
  );
}

export default connect()(BodyEditor);