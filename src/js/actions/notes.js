import Immutable from 'immutable';
import uuid from 'node-uuid';

/*ACTION TYPES*/
export const ADD_NOTE = 'ADD_NOTE';
export const SELECT_NOTE = 'SELECT_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

/*ACTION CREATORS*/
export const addNote = () => {

  const note = {
    id: uuid.v4(),
    saved: false,
    content: '',
    decrypted: {
      title: 'Untitled',
      body: ''
    }
  }

  return { type: ADD_NOTE, note };
}

export const selectNote = (id) => {
  return (dispatch, getState) => {
    const { notes } = getState();
    const note = notes.find(note => note.get('id') === id);
    return dispatch({type: SELECT_NOTE, note});
  }
}

export const updateNote = (id, changes) => {
  return (dispatch, getState) => {
    let {notes} = getState();
    let note = {};
    Object.keys(changes).forEach(key => note[key] = changes[key]);
    const index = notes.findIndex(note => note.get('id') === id);
    return dispatch({ type: UPDATE_NOTE, index, note });
  }
}

export const saveNote = (index, note) => {
  let title = note.get('decrypted').get('title');
  let body = note.get('decrypted').get('body');
  return (dispatch, getState) => {
    let {key} = getState();
    key.encrypt({title, body})
      .then(encrypted => {
        // Send encrypted note to server
        let note = Immutable.Map({
          saved: true,
          contents: encrypted
        });
        return { type: UPDATE_NOTE, index, note };
      })
      .catch(err => console.error(err))
  }
}

export const deleteNote = (id) => {
  return (dispatch, getState) => {
    let {notes} = getState();
    const index = notes.findIndex(note => note.get('id') === id);
    return dispatch({ type: DELETE_NOTE, index, id });
  }
}

/* UTILITIES */
export const makeImmutable = (note) => {
  const decrypted = Immutable.Map(note.decrypted)
  return Immutable.Map(note).set('decrypted', decrypted)
}
