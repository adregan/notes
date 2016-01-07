import Immutable from 'immutable';
 
/*
 * action types
 */

export const ADD_NOTE = 'ADD_NOTE'
export const UPDATE_NOTE = 'UPDATE_NOTE'
export const DELETE_NOTE = 'DELETE_NOTE'
export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
export const ADD_PRIVATE_KEY = 'ADD_PRIVATE_KEY'

/*
 * action creators
 */

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
  return {type: LOG_OUT}
}

export const addPrivateKey = (privateKey) => {
  return {type: ADD_PRIVATE_KEY, privateKey}
}

export const sideEffects = {
  addPrivateKey(privateKey) {
    return (
      typeof localStorage !== 'undefined'
      && localStorage.setItem('privateKey', privateKey)
    );
  },
  logOut() {
    return (
      typeof localStorage !== 'undefined'
      && localStorage.removeItem('privateKey')
    );
  }
}
