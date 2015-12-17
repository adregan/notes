/*
 * action types
 */

export const ADD_NOTE = 'ADD_NOTE'
export const UPDATE_NOTE = 'UPDATE_NOTE'
export const DELETE_NOTE = 'DELETE_NOTE'

/*
 * action creators
 */

export function addNote(title, body) {
  let note = {title, body};
  return { type: ADD_NOTE, note}
}

export function updateNote(index, title, body) {
  let note = {title, body};
  return { type: UPDATE_NOTE, index, note }
}

export function deleteNote(index) {
  return { type: DELETE_NOTE, index }
}
