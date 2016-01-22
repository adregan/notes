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
          <CloseButton light={true} onClose={() => history.push('/notes/')} />
        </header>
        <ul className="settings__list">
          <li className="setting">
            <h2 className="setting__title">Sync Notes</h2>
            <p className="setting__coming-soon">Coming Soon</p>
          </li>
          <li className="setting">
            <h2 className="setting__title">Export Notes</h2>
            <p className="setting__coming-soon">Coming Soon</p>
          </li>
          <li className="setting">
            <h2 className="setting__title">Delete Accout</h2>
            <div className="setting__description">
              <p>When you delete your account, the notes stored on your device and your account information will be removed.</p>
              <p>If you'd like to delete your account: 
              <button onClick={() => dispatch(addMessage(confirmDelete))}
                className="setting__button">Delete</button></p>
            </div>
          </li>

        </ul>
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
