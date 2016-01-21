import Immutable from 'immutable';
import uuid from 'node-uuid';
import * as date from '../utils/date';
import localforage from 'localforage';

/*ACTION TYPES*/
export const ADD_NOTE = 'ADD_NOTE';
export const SELECT_NOTE = 'SELECT_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const CLOSE_NOTE = 'CLOSE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const FETCHING_NOTES = 'FETCHING_NOTES';
export const LOADED_NOTES = 'LOADED_NOTES';

/*ACTION CREATORS*/
export const fetchingNotes = () => {
  return {type: FETCHING_NOTES}
}
export const fetchNotes = (username) => {
  return dispatch => {
    dispatch(fetchingNotes())
    let notes = Immutable.List();
    let decrypted = Immutable.Map();

    const notesStore = localforage.createInstance({
      name: username
    });

    notesStore.length((err, number) => {
      if (!number) {
        return dispatch({
          type: LOADED_NOTES,
          store: notesStore,
          notes 
        })
      }
      else {
        notesStore.iterate((content, id, i) => {
          let note = Immutable.Map({
            saved: true, id, content, decrypted
          })
          notes = notes.push(note);
        })
        .then(() => {
          return dispatch({
            type: LOADED_NOTES,
            store: notesStore,
            notes 
          })
        })
      }
    })
  }
}

export const addNote = () => {
  const now = date.now();
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

export const closeNote = () => {
  return {type: CLOSE_NOTE}
}

export const updateNote = (id, {title, body, saved, content, updated}) => {
  return (dispatch, getState) => {
    let {notes} = getState();
    const index = notes.findIndex(note => note.get('id') === id);
    const note = notes.get(index);
    saved = saved || false;
    updated = updated || date.now();

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
      if (typeof next === 'undefined') {
        return prev;
      }
      return next;
    }, changes);

    return dispatch({ type: UPDATE_NOTE, index, update });
  }
}

export const saveAll = () => {
  return (dispatch, getState) => {
    let { notes } = getState();
    notes.filter(note => !note.get('saved'))
         .forEach(note => {dispatch(saveNote(note.get('id')))})

    console.log('Saved all the unsaved notes');
  }
}

export const saveNote = (id) => {
  return (dispatch, getState) => {
    const {key, notes, notesStore} = getState();
    const note = notes.find(note => note.get('id') === id);

    const title = note.getIn(['decrypted', 'title']);
    const body = note.getIn(['decrypted', 'body']);
    const created = note.getIn(['decrypted', 'created']);
    const updated = date.now();

    key.encrypt({title, body, created, updated})
      .then(content => {
        notesStore.setItem(id, content).then(() => {
          console.log('Successfully Saved Note');
          dispatch(updateNote(id, {saved: true, content, updated}));
        })
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
