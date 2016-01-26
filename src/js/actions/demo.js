import Immutable from 'immutable';
import { addMessage } from './messages';
import { loginAttempt, loginSuccess } from './login';
import localforage from 'localforage';
import Key from '../utils/keybase';
import uuid from 'node-uuid';

import history from '../routes/history';

export const createDemoUser = (passphrase) => {
  return dispatch => {
    dispatch(loginAttempt())
    Key.demo(passphrase)
      .then(({armoredKey, key}) => {
        const username = uuid.v4();
        const name = 'Demo User';
        const apiToken = null;
        const user = {username, name, armoredKey, apiToken};
        return dispatch(loginSuccess(user, key));
      })
  }
}

export const startDemo = () => {
  return dispatch => {
    const message = {
      title: 'Demo Account',
      body: 'Create a passphrase for your demo keypair. Please be patient, this can take a while.',
      type: 'message',
      action: {
        type: 'secretPrompt',
        after: createDemoUser,
        label: 'Let\'s Go!'
      }
    }
    dispatch(addMessage(message))
  }
}