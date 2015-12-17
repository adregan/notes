import {ADD_NOTE, UPDATE_NOTE, DELETE_NOTE} from './actions';
import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router';

const initialState = {
  notes: []
}

function notes(state = [], action) {
  switch (action.type) {
    case ADD_NOTE:
      return [...state, action.note]
    case UPDATE_NOTE:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, action.note),
        ...state.slice(action.index + 1)
      ]
    case DELETE_NOTE:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ]
    default:
      return state;
  }
}

const notesApp = combineReducers({
  router: routerStateReducer,
  notes
});

export default notesApp;

