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
export const SAVE_ALL = 'SAVE_ALL';
export const LOCK_NOTES = 'LOCK_NOTES';
export const UNLOCKED_NOTES = 'UNLOCKED_NOTES';

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

export const saveAll = (lock = false) => {
  return (dispatch, getState) => {
    let { notes } = getState();

    if (lock) {
      notes.forEach(note => {dispatch(saveAndLockNote(note.get('id')))})
    }
    else {
      notes.filter(note => !note.get('saved'))
           .forEach(note => {dispatch(saveNote(note.get('id')))})
    }


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

export const saveAndLockNote = (id) => {
  return (dispatch, getState) => {
    const {key, notes, notesStore} = getState();
    const index = notes.findIndex(note => note.get('id') === id);
    const note = notes.get(index);

    if (note.saved) {
      let update = Immutable.Map({
        saved: true,
        decrypted: Immutable.Map(),
        content: note.get('content'),
        id
      })
      return dispatch({ type: UPDATE_NOTE, index, update });
    }

    const title = note.getIn(['decrypted', 'title']);
    const body = note.getIn(['decrypted', 'body']);
    const created = note.getIn(['decrypted', 'created']);
    const updated = date.now();

    key.encrypt({title, body, created, updated})
      .then(content => {
        notesStore.setItem(id, content).then(() => {
          console.log('Successfully Saved Note');
          let update = Immutable.Map({
            saved: true, decrypted: Immutable.Map(), id, content
          })
          dispatch({ type: UPDATE_NOTE, index, update });
        })
      })
      .catch(err => console.error(err))
  }
}

export const lockNotes = () => {
  return (dispatch, getState) => {
    let { notes } = getState();
    notes = notes.map(n => n.set('saved', true).set('decrypted', Immutable.Map()))
    console.log('Locked Notes')
    dispatch({type: LOCK_NOTES, notes})
  }
}


const decrypt = (note, key) => {
  return new Promise((resolve, reject) => {
    let {id, content} = note.toJS();
    key.decrypt(content)
      .then(decrypted => {

        let decryptedNote = Immutable.Map({
          decrypted: Immutable.Map(decrypted)
        })

        return resolve(note.merge(decryptedNote))
      })
  })
}

export const unlockNotes = () => {
  return (dispatch, getState) => {
    let {key, notes} = getState();

    let decryptedNotes = Promise.all(
      notes.map(note => {return decrypt(note, key)})
    ).then(notes => {
      let decryptedNotes = Immutable.List(notes);
      return dispatch({type: UNLOCKED_NOTES, notes: decryptedNotes})
    }) 

  }
}

export const deleteNote = (id) => {
  return (dispatch, getState) => {
    let {notes} = getState();
    const index = notes.findIndex(note => note.get('id') === id);
    return dispatch({ type: DELETE_NOTE, index });
  }
}
