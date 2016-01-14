import Immutable from 'immutable';
import { ADD_NOTE, SELECT_NOTE, UPDATE_NOTE, DELETE_NOTE, LOG_IN, STORE_USER, LOG_OUT, ADD_PRIVATE_KEY, SEARCH, ADD_MESSAGE, DISMISS_MESSAGE} from './actionTypes';
import { api } from '../../../config';

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

export const logIn = (username, password) => {
  return dispatch => {
    fetch(`${api}/login`, {method: 'post', body: {username, password}})
      .then(resp => {
        dispatch(storeUser(resp));
      })
      .catch(err => {        
        let error = (!err.response) ? 'So sorry. Something went wrong.' : err.response.body.errorMessage;
        dispatch({title: 'Error on log in', message: error, type: 'ERROR'})
      })

  }
}

export const storeUser = ({ name, publicKey, apiToken }) => {
  let user = Immutable.Map({name, publicKey, apiToken});
  return {type: LOG_IN, user};
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

export const addMessage = ({title, body, type}) => {
  let message = Immutable.Map({title, body, type})
  return {type: ADD_MESSAGE, message: message};
}

export const dismissMessage = () => {
  return {type: DISMISS_MESSAGE};
}

