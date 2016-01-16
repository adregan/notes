import Immutable from 'immutable';
import { ADD_NOTE, SELECT_NOTE, UPDATE_NOTE, DELETE_NOTE, LOGGING_IN, STORE_USER, UPDATE_USER, LOG_OUT, DISCONNECT, ADD_PRIVATE_KEY, SEARCH, ADD_MESSAGE, DISMISS_MESSAGE} from './actionTypes';
import { api } from '../../../config';
import fetch from '../utils/fetch';
import history from '../routes/history';
import localforage from 'localforage';

export const addNote = (title) => {
  let note = Immutable.Map({title, body: '', unsaved: true});
  return { type: ADD_NOTE, note};
}

export const selectNote = (index, title, body) => {
  let currentNote = Immutable.Map({index, title, body});
  return {type: SELECT_NOTE, currentNote};
}

export const updateNote = (index, title, body) => {
  let note = Immutable.Map({title, body, unsaved: true});
  return { type: UPDATE_NOTE, index, note };
}

export const saveNote = (index, title, body) => {
  return dispatch => {
    // TODO: Encrypt and save note to server
    let note = Immutable.Map({title, body, unsaved: false});
    dispatch({type: UPDATE_NOTE, index, note});
  }
}

export const deleteNote = (index) => {
  return { type: DELETE_NOTE, index };
}

export const loggingIn = () => {
  return {type: LOGGING_IN}
}

export const logIn = (username, password) => {
  return dispatch => {
    dispatch(loggingIn());
    return fetch(`${api}/login`, {method: 'post', body: {username, password}})
      .then(resp => {
        let user = {username, ...resp};
        dispatch(storeUser(user, []));
        // .push('notes') to retain back button to login
        return history.replace('/notes');
      })
      .catch(err => {
        let error = (!err.detail) ? 'So sorry. Something went wrong.' : err.detail;
        dispatch(loggingIn());
        return dispatch(addMessage(
          {title: 'Uh Oh. Error during login.', body: error, type: 'error'}));
      })
  }
}

export const checkForCurrentSession = () => {
  return dispatch => {
    let user = sessionStorage.getItem('user');
    let notes = sessionStorage.getItem('notes');

    if (!user || !notes) {
      return history.replace('/login');
    }

    return dispatch(storeUser(JSON.parse(user), JSON.parse(notes)));
  } 
}

export const checkForReturningUser = () => {
  return dispatch => {
    localforage.getItem('username')
      .then(username => {
        username && dispatch(updateUser({username}));
      })
      .catch(err => console.error(err))
  }
}

export const updateUser = (data) => {
  return {type: UPDATE_USER, data: Immutable.Map(data)}
}

export const storeUser = (userData, notesData) => {
  let { username } = userData;
  let user = Immutable.Map({loggingIn: false, ...userData});
  let notes = Immutable.List(notesData.map(note => Immutable.Map(note)));

  const action = {type: STORE_USER, user, notes}
  return dispatch => {
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('notes', JSON.stringify(notes));
    localforage.setItem('username', username)
      .then(() => dispatch(action))
      .catch(err => {
        console.error(err);
        dispatch(action);
      })
  }
}

export const disconnect = () => {
  const action = {type: LOG_OUT};
  return dispatch => {
    localforage.clear()
      .then(() => dispatch(action))
      .catch(err => {
        console.error(err);
        dispatch(action);
      })
  }
}

export const addPrivateKey = (privateKey) => {
  const action = {type: ADD_PRIVATE_KEY, privateKey};
  return dispatch => {
    localforage.setItem('privateKey', privateKey)
      .then(() => dispatch(action))
      .catch(err => {
        console.error(err);
        dispatch(action)
      })
  }
}

export const search = (searchTerm) => {
  return {type: SEARCH, searchTerm};
}

export const addMessage = ({title, body, type, action}) => {
  type = type || 'message';
  action = action || {type: 'dismiss', label: 'OK'};
  let message = Immutable.Map({title, body, type, action})

  return dispatch => {
    return dispatch({type: ADD_MESSAGE, message: message});
  }
}

export const dismissMessage = () => {
  return {type: DISMISS_MESSAGE};
}

