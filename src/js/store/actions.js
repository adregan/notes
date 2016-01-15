import Immutable from 'immutable';
import { ADD_NOTE, SELECT_NOTE, UPDATE_NOTE, DELETE_NOTE, LOGGING_IN, STORE_USER, LOG_OUT, ADD_PRIVATE_KEY, SEARCH, ADD_MESSAGE, DISMISS_MESSAGE} from './actionTypes';
import { api } from '../../../config';
import fetch from '../utils/fetch';

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
    dispatch({
      type: UPDATE_NOTE,
      index,
      note
    });
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

    return fetch(`${api}/logintest`, {method: 'post', body: {username, password}})
      .then(resp => {
        dispatch(storeUser(resp));
      })
      .catch(err => {
        let error = (!err.detail) ? 'So sorry. Something went wrong.' : err.detail;
        dispatch(loggingIn());
        return dispatch(addMessage(
          {title: 'Uh Oh. Error during login.', body: error, type: 'ERROR'}));
      })
  }
}

export const storeUser = ({ name, publicKey, apiToken }) => {
  let user = Immutable.Map({loggingIn: false, name, publicKey, apiToken});
  return {type: STORE_USER, user};
}

export const logOut = () => {
  return dispatch => {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('privateKey');
    }
    dispatch({type: LOG_OUT});
  }
}

export const addPrivateKey = (privateKey) => {
  return dispatch => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('privateKey', privateKey);
    }
    dispatch({type: ADD_PRIVATE_KEY, privateKey});
  }
}

export const search = (searchTerm) => {
  return {type: SEARCH, searchTerm};
}

export const addMessage = ({title, body, type, action}) => {
  return dispatch => {
    if (!action) {
      action = () => dispatch(dismissMessage());
    }

    let message = Immutable.Map({title, body, type, action})
    return dispatch({type: ADD_MESSAGE, message: message});
  }
}

export const dismissMessage = () => {
  return {type: DISMISS_MESSAGE};
}

