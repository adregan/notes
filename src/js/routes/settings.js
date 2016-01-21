import React from 'react';
import history from './history';
import CloseButton from '../components/closeButton'
import { connect } from 'react-redux';
import { deleteAccount } from '../actions/user';
import { addMessage } from '../actions/messages';

const Settings = ({user, dispatch}) => {
  let confirmDelete = {
    title: 'Are you sure?',
    body: 'You are about to delete your account. In order to confirm this action, please type \'delete\'.',
    type: 'error',
    action: {type: 'prompt', label: 'Delete', after: deleteAccount}
  }
  return (
    <article className="modal-container">
      <section className="settings">
        <header className="settings__header">
          <h1 className="title">Settings</h1>
          <CloseButton onClose={() => history.push('/notes/')} />
        </header>
        <dl className="settings__list">
          <dt>Sync Notes</dt>
          <dd className="settings__coming-soon">Coming Soon</dd>

          <dt>Export Notes</dt>
          <dd className="settings__coming-soon">Coming Soon</dd>

          <dt>Delete Accout</dt>
          <dd>
            <button onClick={() => dispatch(addMessage(confirmDelete))}
              className="settings__button">Delete</button>
          </dd>

        </dl>
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
