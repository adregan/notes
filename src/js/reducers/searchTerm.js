import {SEARCH} from '../actions/search';
import {ADD_NOTE} from '../actions/notes';
import {LOG_OUT} from '../actions/user';

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

export default searchTerm;