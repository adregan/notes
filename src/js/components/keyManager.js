import React from 'react';
import { lock, unlock } from '../actions/user';
import { addMessage } from '../actions/messages';
import classnames from 'classnames';

const KeyManager = ({dispatch, keyStatus}) => {
  const lockKey = () => dispatch(lock());
  const unlockKey = () => dispatch(unlock());

  let handleClick = (keyStatus === 'LOCKED') ? unlockKey : lockKey
  let classes = classnames('header__button', {
    'header__button--unlock': keyStatus === 'LOCKED',
    'header__button--lock': keyStatus === 'UNLOCKED'
  })

  return (
    <button className={classes} onClick={handleClick}>
      {(keyStatus === 'LOCKED') ? 'Unlock' : 'Lock'}
    </button>
  );
}

export default KeyManager;