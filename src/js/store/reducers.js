import { ADD_NOTE, SELECT_NOTE, UPDATE_NOTE, DELETE_NOTE, LOGGING_IN, STORE_USER, UPDATE_USER, LOG_OUT, DISCONNECT, ADD_PRIVATE_KEY, SEARCH, ADD_MESSAGE, DISMISS_MESSAGE } from './actionTypes';
import { combineReducers } from 'redux'
import Immutable from 'immutable';

// TODO UPDATE THIS DIAGRAM

/* Diagram of the store
Store = {
  notes: [{title, body}...],
  user: {name, publicKey, privateKey, apiToken}
  searchTerm: '',
  currentNote: {title, body, index},
  messages: [{title, body, type, action: {type, label}}]
}
*/

const notes = (state = Immutable.List(), action) => {
  switch (action.type) {
    case ADD_NOTE:
      return state.unshift(action.note);
    case UPDATE_NOTE:
      return state.set(action.index, action.note);
    case DELETE_NOTE:
      return state.delete(action.index);
    case STORE_USER:
      return state.push(...action.notes);
    case LOG_OUT:
      return state.clear();
    default:
      return state;
  }
}

const user = (state = Immutable.Map({loggingIn: false, username: ''}), action) => {
  switch (action.type) {
    case LOGGING_IN:
      return state.set('loggingIn', !state.get('loggingIn'));
    case STORE_USER:
      return state.merge(action.user);
    case UPDATE_USER:
      return state.merge(action.data);
    case LOG_OUT:
      return state.clear();
    case ADD_PRIVATE_KEY:
      return state.set('privateKey', action.privateKey);
    default:
      return state;
  }
}

const searchTerm = (state = '', action) => {
  switch (action.type) {
    case SEARCH:
      return action.searchTerm;
    case ADD_NOTE:
      return '';
    case LOG_OUT:
      return '';
    default:
      return state;
  }
}

const currentNote = (state = Immutable.Map(), action) => {
  switch(action.type) {
    case ADD_NOTE:
      return action.note.set('index', 0);
    case UPDATE_NOTE:
      return action.note.set('index', action.index);
    case SELECT_NOTE:
      return action.currentNote;
    case LOG_OUT:
      state.clear();
    default:
      return state;
  }
}

const messages = (state = Immutable.List(), action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return state.push(action.message);
    case DISMISS_MESSAGE:
      return state.shift();
    case LOG_OUT:
      state.clear();
    default:
      return state;
  }
}

const key = (state = {}, action) => {
  switch (action.type) {
    case STORE_USER:
      return action.key;
    default:
      return state;
  }
}


export const notesApp = combineReducers({notes, user, searchTerm, currentNote, messages, key});
