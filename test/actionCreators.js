/* These are synchronous action creators without side effects
*/

import expect from 'expect';
import Immutable from 'immutable';
import uuid from 'node-uuid';
import jsdom from 'jsdom-global';

import * as search from '../src/js/actions/search';
import * as messages from '../src/js/actions/messages';
import * as notes from '../src/js/actions/notes';

describe('Action Creators', () => {
  describe('search', () => {
    describe('search()', () => {
      it('should create an action to add search term', () => {
        const term = 'note 23'
        const expectedAction = {type: search.SEARCH, term}
        expect(search.search(term)).toEqual(expectedAction)
      })
    })
  })
  describe('messages', () => {
    describe('addMessage()', () => {
      it('should create an action to add a message', () => {
        const title = 'greeting'
        const body = 'yo'
        const type = 'error'
        const action = {type: 'dismiss', label: 'wowow'}

        const expectedAction1 = {
          type: messages.ADD_MESSAGE,
          message: {
            type: 'message',
            action: {type: 'dismiss', label: 'OK'},
            title,
            body
          }
        }
        const expectedAction2 = {
          type: messages.ADD_MESSAGE,
          message: {
            action: {type: 'dismiss', label: 'OK'},
            title,
            body,
            type
          }
        }
        const expectedAction3 = {
          type: messages.ADD_MESSAGE, 
          message: {title, body, type, action}
        }

        expect(messages.addMessage({title, body})).toEqual(expectedAction1)
        expect(messages.addMessage({title, body, type})).toEqual(expectedAction2)
        expect(messages.addMessage({title, body, type, action})).toEqual(expectedAction3)
      })
    })
    describe('dismissMessage()', () => {
      it('should create an action to dismiss a message', () => {
        expect(messages.dismissMessage()).toEqual({'type': messages.DISMISS_MESSAGE})
      })
    })
  })
  describe('notes', () => {
    describe('addNote()', () => {
      it('should create an action to add a note', () => {
        expect.spyOn(uuid, 'v4');

        const note = {
          id: uuid.v4(),
          saved: false,
          content: '',
          decrypted: {
            title: 'Untitled',
            body: ''
          }
        }

        expect(notes.addNote()).toEqual({'type': notes.ADD_NOTE, note})
      })
    })
  })
  describe('user', () => {
    describe('updateUser()', () => {
      let UPDATE_USER;
      let updateUser;
      jsdom(() => {
        UPDATE_USER = require('../src/js/actions/user').UPDATE_USER;
        updateUser = require('../src/js/actions/user').updateUser;
      })
      it('should create an action to update a user', () => {
        const data = {username: 'hello', photoUrl: 'http://greatphoto.com/great.jpg'}
        expect(updateUser(data)).toEqual({type: UPDATE_USER, data})
      })
    })
  })
})

describe('Action Utilities', () => {
  describe('notes', () => {
    describe('makeImmutable()', () => {
      it('should make a note immutable', () => {
        const id = uuid.v4();
        const note = {
          id: id,
          saved: false,
          content: '',
          decrypted: {
            title: 'Untitled',
            body: ''
          }
        }

        let decrypted = Immutable.Map({title: 'Untitled', body: ''})
        let immutableNote = Immutable.Map({id: id, saved: false, content: '', decrypted})

        expect(notes.makeImmutable(note)).toEqual(immutableNote)
      })
    })
  })
})