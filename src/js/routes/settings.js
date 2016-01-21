import React from 'react';
import history from './history';
import CloseButton from '../components/closeButton'
import { connect } from 'react-redux';

const Settings = ({user, dispatch}) => {
  return (
    <article className="modal-container">
      <section className="settings">
        <header className="settings__header">
          <h1 className="title">Settings</h1>
          <CloseButton onClose={() => history.push('/notes/')} />
        </header>
      </section>
    </article>
  );
}

function select(state) {
  return {
    user: state.user
  };
}

export default connect(select)(Settings);
