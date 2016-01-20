import Immutable from 'immutable';
import uuid from 'node-uuid';

/*ACTION TYPES*/
export const ADD_NOTE = 'ADD_NOTE';
export const SELECT_NOTE = 'SELECT_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

/*ACTION CREATORS*/
export const addNote = () => {
  const now = new Date().toISOString();
  const note = Immutable.Map({
    id: uuid.v4(),
    saved: false,
    content: '',
    decrypted: Immutable.Map({
      title: 'Untitled',
      body: '',
      created: now,
      updated: now
    })
  })

  return { type: ADD_NOTE, note };
}

export const selectNote = (id) => {
  return (dispatch, getState) => {
    const { notes } = getState();
    const note = notes.find(note => note.get('id') === id);
    return dispatch({type: SELECT_NOTE, note});
  }
}

export const updateNote = (id, {title, body, saved, content, updated}) => {
  return (dispatch, getState) => {
    let {notes} = getState();
    const index = notes.findIndex(note => note.get('id') === id);
    const note = notes.get(index);
    updated = updated || new Date().toISOString();

    const changes = Immutable.Map({
      content: content,
      saved: saved,
      decrypted: Immutable.Map({
        title: title,
        body: body,
        updated: updated
      })
    })

    const update = note.mergeDeepWith((prev, next) => {
      if (!next) {
        return prev;
      }
      return next;
    }, changes);

    return dispatch({ type: UPDATE_NOTE, index, update });
  }
}

export const saveNote = (id) => {
  return (dispatch, getState) => {
    const {key, notes} = getState();
    const note = notes.find(note => note.get('id') === id);

    const title = note.getIn(['decrypted', 'title']);
    const body = note.getIn(['decrypted', 'body']);
    const created = note.getIn(['decrypted', 'created']);
    const updated = (new Date()).toISOString();

    key.encrypt({title, body, created, updated})
      .then(content => {
        // Send encrypted note to server
        return dispatch(updateNote(id, {saved: true, content, updated}));
      })
      .catch(err => console.error(err))
  }
}

export const deleteNote = (id) => {
  return (dispatch, getState) => {
    let {notes} = getState();
    const index = notes.findIndex(note => note.get('id') === id);
    return dispatch({ type: DELETE_NOTE, index });
  }
}
