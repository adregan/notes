import Immutable from 'immutable';
import { api } from '../../../config';
import Key from '../utils/keybase';
import history from '../routes/history';
import fetch from '../utils/fetch';
import {addMessage} from './messages';
import { storeUser } from './user';
import { fetchNotes } from './notes';

/*ACTION TYPES*/
export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT';
export const LOGIN_FAILED = 'LOGGED_FAILED';
export const LOGIN_SUCCESS = 'LOGGED_SUCCESS';
export const LOG_OUT = 'LOG_OUT';

/*ACTION CREATORS*/
export const loginAttempt = () => {
  return {type: LOGIN_ATTEMPT}
}

export const loginSuccess = (user, key) => {
  return dispatch => {
    dispatch(storeUser(user));
    dispatch(fetchNotes(user.username));
    dispatch({
      type: LOGIN_SUCCESS,
      user: Immutable.Map({user}),
      key
    });
    history.replace('/notes');
  }
}

export const loginError = (error) => {
  const loginError = {
    title: 'Uh Oh. Error during login.',
    body: error,
    type: 'error'
  }
  return dispatch => {
    dispatch(addMessage(loginError));
    dispatch({type: LOGIN_FAILED})
  }
}

export const login = (username, password) => {
  return dispatch => {
    dispatch(loginAttempt());

    fetch(`${api}/login`, {
      method: 'post',
      body: {username, password}
    })
    .then(user => {
      const {armoredKey} = user;
      user.username = username;
      Key.create(armoredKey, password).then(key => {
        dispatch(loginSuccess(user, key));
      })
      .catch(err => console.error(err))
    })
    .catch(err => {
      const error = err.detail || 'So sorry. Something went wrong.';
      dispatch(loginError(error));
    })
  }
}