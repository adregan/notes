import Immutable from 'immutable';
import { ADD_NOTE, SELECT_NOTE, UPDATE_NOTE, DELETE_NOTE, LOG_IN, LOG_OUT, ADD_PRIVATE_KEY, SEARCH } from './actionTypes';

export const selectNote = (index, title, body) => {
  let currentNote = Immutable.Map({index, title, body});
  return {type: SELECT_NOTE, currentNote};
}

export const updateNote = (index, title, body) => {
  let note = Immutable.Map({title, body});
  return { type: UPDATE_NOTE, index, note }
}

export const deleteNote = (index) => {
  return { type: DELETE_NOTE, index }
}

export const logIn = ({ name, publicKey, apiToken }) => {
  let user = Immutable.Map({name, publicKey, apiToken});
  return {type: LOG_IN, user}
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
