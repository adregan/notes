import Immutable from 'immutable';
import { ADD_NOTE, UPDATE_NOTE, DELETE_NOTE, LOG_IN, LOG_OUT, ADD_PRIVATE_KEY } from './actionTypes';

export const addNote = (title, body) => {
  let note = Immutable.Map({title, body});
  return { type: ADD_NOTE, note}
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
