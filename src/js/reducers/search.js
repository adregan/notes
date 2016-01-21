import Immutable from 'immutable';
import {SEARCH} from '../actions/search';
import {ADD_NOTE} from '../actions/notes';
import {LOG_OUT} from '../actions/user';

/*
=====================================
      DIAGRAM OF THE SEARCH STORE
=====================================

search: {
  term: <string>,
}

*/

const search = (state = Immutable.Map({term: ''}), action) => {
  switch (action.type) {
    case SEARCH:
      return state.set('term', action.term);
    case LOG_OUT:
      return Immutable.Map({term: ''});
    default:
      return state;
  }
}

export default search;
