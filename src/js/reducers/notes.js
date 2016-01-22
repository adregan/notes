import Immutable from 'immutable';
import { ADD_NOTE, UPDATE_NOTE, DELETE_NOTE, LOADED_NOTES, FETCHING_NOTES, LOCK_NOTES, UNLOCKED_NOTES } from '../actions/notes';
import { STORE_USER, LOG_OUT } from '../actions/user';
import { LOGIN_SUCCESS } from '../actions/login';
import localforage from 'localforage';

export const notes = (state = Immutable.List(), action) => {
  switch (action.type) {
    case LOADED_NOTES:
      return action.notes
    case ADD_NOTE:
      return state.unshift(action.note);
    case UPDATE_NOTE:
      return state.set(action.index, action.update);
    case DELETE_NOTE:
      return state.delete(action.index);
    case LOG_OUT:
      return state.clear();
    case LOCK_NOTES:
      return action.notes
    case UNLOCKED_NOTES:
      return action.notes;
    default:
      return state;
  }
}

export const notesStatus = (state = 'NO_NOTES', action) => {
  switch (action.type) {
    case FETCHING_NOTES:
      return FETCHING_NOTES
    case LOADED_NOTES:
      return LOADED_NOTES
    case LOG_OUT:
      return 'NO_NOTES'
    case UNLOCKED_NOTES:
      return LOADED_NOTES
    default:
      return state
  }
}

export const notesStore = (state = localforage.createInstance({name: 'notes'}), action) => {
  switch (action.type) {
    case LOADED_NOTES:
      return action.store;
    case LOG_OUT:
      return localforage.createInstance({name: 'notes'})
    default:
      return state
  }
}