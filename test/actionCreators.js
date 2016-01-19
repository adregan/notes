import expect from 'expect';
import Immutable from 'immutable';
import uuid from 'node-uuid';
import jsdom from 'jsdom-global';

import * as search from '../src/js/actions/search';
import * as messages from '../src/js/actions/messages';
import * as notes from '../src/js/actions/notes';

describe('actions', () => {
  describe('search.search()', () => {
    it('should create an action to add search term', () => {
      const term = 'note 23'
      const expectedAction = {type: search.SEARCH, term}
      expect(search.search(term)).toEqual(expectedAction)
    })
  })
  describe('messages.addMessage()', () => {
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
  describe('messages.dismissMessage()', () => {
    it('should create an action to dismiss a message', () => {
      expect(messages.dismissMessage()).toEqual({'type': messages.DISMISS_MESSAGE})
    })
  })
  describe('notes.addNote()', () => {
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
  describe('notes.makeImmutable()', () => {
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
  describe('user.updateUser()', () => {
    it('should create an action to update a user', () => {
      let UPDATE_USER;
      let updateUser;
      jsdom(() => {
        UPDATE_USER = require('../src/js/actions/user').UPDATE_USER;
        updateUser = require('../src/js/actions/user').updateUser;
      })

      const data = {username: 'hello', photoUrl: 'http://greatphoto.com/great.jpg'}
      expect(updateUser(data)).toEqual({type: UPDATE_USER, data})
    })
  })

})