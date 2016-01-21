import Immutable from 'immutable';
import { api } from '../../../config';
import fetch from '../utils/fetch';
import history from '../routes/history';
import localforage from 'localforage';
import Key from '../utils/keybase';
import {addMessage} from './messages';

/*ACTION TYPES*/
export const LOGGING_IN = 'LOGGING_IN'
export const LOG_OUT = 'LOG_OUT';
export const DISCONNECT = 'DISCONNECT';
export const STORE_USER = 'STORE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const UNLOCK_KEY = 'UNLOCK_KEY';
export const USER_PANEL_TOGGLE = 'USER_PANEL_TOGGLE';

/*ACTION CREATORS*/
export const checkForCurrentSession = () => {
  return dispatch => {
    Promise.all([
      localforage.getItem('user'),
      localforage.getItem('notes')
    ])
      .then(resp => {
        let [user, notes] = resp;
        if (!user || !notes) {return history.replace('/login');}

        let { armoredKey } = user;

        Key.create(armoredKey)
          .then(key => {
            dispatch(storeUser(user, notes, key))
            if (window.location.pathname.replace(/\//g, '') === 'login') {
              return history.replace('/notes')
            }
          })
          .catch(err => {
            console.error(err);
            localforage.clear();
            return history.replace('/login');})
      })
  } 
}

export const updateUser = (data) => {
  return {type: UPDATE_USER, data}
}

export const storeUser = (user) => {
  return dispatch => {
    localforage.setItem('user', user)
      .then(() => {
        console.log('User successfully stored. Forwarding.')
        history.replace('/notes/')
      })
      .catch(err => console.error(`Error storing user: ${err}`))
  }
}

export const unlock = (passphrase) => {
  return (dispatch, getState) => {
    let {key} = getState();
    key.unlock(passphrase)
      .then(key => {
        return dispatch({type: UNLOCK_KEY, key});
      })
      .catch(err => {
        console.error(err);
        return dispatch(addMessage({
          title: 'Couldn\'t unlock key.',
          body: 'Check your passphrase and try again.',
          type: 'error'
        }))
      })
  }
} 

export const disconnect = () => {
  return dispatch => {
    localforage.clear()
      .then(() => dispatch(action))
      .catch(err => {
        console.error(err);
        dispatch({type: LOG_OUT});
      })
  }
}

export const userPanelToggle = () => {
  return {type: USER_PANEL_TOGGLE}
}
