import Immutable from 'immutable';

/*ACTION TYPES*/
export const ADD_NOTE = 'ADD_NOTE';
export const SELECT_NOTE = 'SELECT_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

/*ACTION CREATORS*/
export const addNote = (title) => {
  let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = crypto.getRandomValues(new Uint8Array(1))[0]%16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });

  let note = Immutable.Map({
    saved: false,
    content: '',
    decrypted: Immutable.Map({title, body: ''}),
    id
  });

  return { type: ADD_NOTE, note};
}

export const selectNote = (index, note) => {
  return {type: SELECT_NOTE, note: note.set('index', index)};
}

export const updateNote = (index, title, body) => {
  let note = Immutable.Map({
    saved: false,
    decrypted: Immutable.Map({title, body})
  });
  return { type: UPDATE_NOTE, index, note };
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

export const deleteNote = (index) => {
  return { type: DELETE_NOTE, index };
}
