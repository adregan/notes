import { sideEffects, ADD_NOTE, UPDATE_NOTE, DELETE_NOTE, LOG_IN, LOG_OUT, ADD_PRIVATE_KEY } from './actions';
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
      return state.push(action.note);
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

function user(state = Immutable.Map(), action) {
  switch (action.type) {
    case LOG_IN:
      return action.user;
    case LOG_OUT:
      sideEffects.logOut();
      return state.clear();
    case ADD_PRIVATE_KEY:
      sideEffects.addPrivateKey(action.privateKey);
      return state.set('privateKey', action.privateKey);
    default:
      return state;
  }
}

export const notesApp = combineReducers({notes, user});
