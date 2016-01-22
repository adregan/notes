import Immutable from 'immutable';
import { api } from '../../../config';
import fetch from '../utils/fetch';
import history from '../routes/history';
import localforage from 'localforage';
import Key from '../utils/keybase';
import {addMessage} from './messages';
import {lockNotes, saveAll, unlockNotes} from './notes';

/*ACTION TYPES*/
export const LOGGING_IN = 'LOGGING_IN'
export const LOG_OUT = 'LOG_OUT';
export const DISCONNECT = 'DISCONNECT';
export const STORE_USER = 'STORE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const LOCK_KEY = 'LOCK_KEY';
export const UNLOCK_KEY = 'UNLOCK_KEY';
export const USER_PANEL_TOGGLE = 'USER_PANEL_TOGGLE';

/*ACTION CREATORS*/
export const storeUser = (user) => {
  return dispatch => {
    localforage.setItem('user', user)
      .then(() => {
        console.log('User successfully stored. Forwarding.')
        history.replace('/notes/')
      })
      .catch(err => console.error(`Error storing user: ${err}`))
  }
}

export const lock = () => {
  return (dispatch, getState) => {
    let { notes } = getState();
    let unsaved = notes.filter(note => !note.get('saved'))

    if (!unsaved.count()) {
      console.log('Locking application')    
      dispatch(lockingAll())
    }
    else {
      dispatch(addMessage({
        title: 'Do you want to save your notes?',
        body: 'Your changes will be lost if you don\'t save them',
        type: 'message',
        action: {
          type: 'confirm',
          label: 'Save & Lock',
          after: lockWithSave,
          compromise: lockingAll,
          compromiseLabel: 'Lock'
        }
      }))
    }
  }
}

export const unlock = () => {
  return (dispatch, getState) => {
    return dispatch(addMessage({
      title: 'Please enter your passphrase.',
      body: 'In order to unlock your key and notes, please enter your passphrase.',
      type: 'message',
      action: {
        type: 'secretPrompt',
        label: 'Unlock',
        after: unlockKey,
      }

    }))
  }
} 


export const lockWithSave = () => {
  return dispatch => {
    console.log('Locking with save')
    dispatch(lockKey());
    dispatch(saveAll(true))
  }
}

export const lockingAll = () => {
  return dispatch => {
    console.log('Locking All');  
    dispatch(lockNotes());
    dispatch(lockKey());
  }
}

export const lockKey = () => {
  return (dispatch, getState) => {
    let {user} = getState();
    Key.create(user.get('armoredKey')).then(key => {
      console.log('Locked Key')
      dispatch({type: LOCK_KEY, key})
    })
    .catch(err => console.error(err))
  }
}

export const unlockKey = (passphrase) => {
  console.log('Unlocking key');
  return (dispatch, getState) => {
    let {key} = getState();
    key.unlock(passphrase)
      .then(key => {
        console.log('Unlocked key');
        dispatch({type: UNLOCK_KEY, key});
        dispatch(unlockNotes())
      })
      .catch(err => {
        console.error(err);
        return dispatch(addMessage({
          title: 'Couldn\'t unlock key.',
          body: 'Check your passphrase and try again.',
          type: 'error'
        }))
      })
  }
}

export const userPanelToggle = () => {
  return {type: USER_PANEL_TOGGLE}
}

export const logout = () => {
  return dispatch => {
    localforage.clear()
      .then(() => {
        console.log('User has been removed from local storage.')
        dispatch({type: LOG_OUT})
        history.push('/login/')
      })
  }
}

export const deleteAccount = (confirm) => {
  return (dispatch, getState) => {
    if (confirm !== 'delete') {
      return dispatch(addMessage({
        title: 'Cannot Delete Account',
        body: `Your confirmation must read: delete.`,
        type: 'error'
      }))
    }
    let {notesStore} = getState();
    notesStore.clear()
      .then(() => {
        console.log('Notes have been deleted.')
        dispatch(logout())
        dispatch(addMessage({
          title: 'Account Deleted',
          body: 'Your account has been deleted.',
          type: 'message'
        }))
      })
      .catch(err => {
        console.error(err)
        dispatch(addMessage({
          title: 'Uh Oh',
          body: 'There was an error completing your request.',
          type: 'error'
        }))
      })
  }
}

export const disconnect = () => {
  return dispatch => {
    localforage.clear()
      .then(() => dispatch(action))
      .catch(err => {
        console.error(err);
        dispatch({type: LOG_OUT});
      })
  }
}
