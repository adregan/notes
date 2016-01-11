import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

const Settings = (props) => {
  let user = props.user;
  return (
    <article className="settings">
      <p>Hello {user.name}</p>
    </article>
  );
}


function select(state) {
  return {
    user: state.user
  };
}

export default connect(select)(Settings);
