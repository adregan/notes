import { ADD_NOTE, SELECT_NOTE, UPDATE_NOTE, DELETE_NOTE, LOG_IN, LOG_OUT, ADD_PRIVATE_KEY, SEARCH } from './actionTypes';
import { combineReducers } from 'redux'
import Immutable from 'immutable';

/* Diagram of the store
Store = {
  notes: [{title, body}...],
  user: {name, publicKey, privateKey, apiToken}
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
    case LOG_OUT:
      return state.clear();
    default:
      return state;
  }
}

const user = (state = Immutable.Map(), action) => {
  switch (action.type) {
    case LOG_IN:
      return action.user;
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
    default:
      return state;
  }
}

export const notesApp = combineReducers({notes, user, searchTerm, currentNote});
