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

/*ACTION CREATORS*/
export const loggingIn = () => {
  return {type: LOGGING_IN}
}

export const logIn = (username, password) => {
  return dispatch => {
    dispatch(loggingIn());
    return fetch(`${api}/login`, {method: 'post', body: {username, password}})
      .then(resp => {
        let {armoredKey} = resp;
        let user = {username, ...resp};

        Key.create(armoredKey, password)
          .then(key => {
            dispatch(storeUser(user, [], key));
            return history.replace('/notes');            
          })
          .catch(err => {
            console.error(err);
            dispatch(loggingIn())
            return dispatch(addMessage({
              title: 'So Sorry',
              body: 'Something went wrong.',
              type: 'error',
              action: {type: 'dismiss', label: 'OK'}}))
          })

        // dispatch(addMessage({title: 'Welcome', body: 'Glad to have you', action: {type: 'dismiss', label: 'Next'}}))
        // dispatch(addMessage({title: 'How to', body: 'This is how to'}))

      })
      .catch(err => {
        console.log(err)
        let error = (!err.detail) ? 'So sorry. Something went wrong.' : err.detail;
        dispatch(loggingIn());
        return dispatch(addMessage(
          {title: 'Uh Oh. Error during login.', body: error, type: 'error'}));
      })
  }
}

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
  return {type: UPDATE_USER, data: Immutable.Map(data)}
}

export const storeUser = (user, notes, key) => {
  const action = {
    type: STORE_USER,
    user: Immutable.Map({loggingIn: false, ...user}),
    notes: Immutable.List(notes.map(note => {
      return Immutable.Map({decrypted: Immutable.Map(), ...note})
    })),
    key
  }

  return dispatch => {
    Promise.all([
      localforage.setItem('user', user),
      localforage.setItem('notes', notes)
    ])
      .then(() => dispatch(action))
      .catch(err => {
        console.error(err);
        return dispatch(action);
      })
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
          title: 'Couldn\'t unlock key.'
          body: 'Check your passphrase and try again.',
          type: 'error'
        }))
      })
  }
} 

export const disconnect = () => {
  const action = {type: LOG_OUT};
  return dispatch => {
    sessionStorage.clear();
    localforage.clear()
      .then(() => dispatch(action))
      .catch(err => {
        console.error(err);
        dispatch(action);
      })
  }
}
