import Immutable from 'immutable';
import {ADD_NOTE, SELECT_NOTE, UPDATE_NOTE, DELETE_NOTE, CLOSE_NOTE} from '../actions/notes';
import {LOG_OUT} from '../actions/user';

const currentNote = (state = Immutable.Map(), action) => {
  switch(action.type) {
    case ADD_NOTE:
      return action.note;
    case UPDATE_NOTE:
      if (state.get('id') === action.update.get('id')) {
        return state.merge(action.update);
      }
      return state;
    case SELECT_NOTE:
      return action.note;
    case CLOSE_NOTE:
      return Immutable.Map();
    case DELETE_NOTE:
      if (state.get('id') === action.id) {
        return Immutable.Map();
      }
      return state;
    case LOG_OUT:
      return state.clear();
    default:
      return state;
  }
}

export default currentNote;