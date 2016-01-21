import React from 'react';
import { userPanelToggle, logout } from '../actions/user';
import history from '../routes/history';

const UserPanel = ({dispatch, name}) => {
  return (
    <div className="modal-container" onClick={() => dispatch(userPanelToggle())}>
      <div className="user-panel" onClick={e => e.stopPropagation()}>
        <h1 className="user-panel__header">Hello {name}</h1>
        <ul className="user-panel__items">
          <li className="user-panel__settings" onClick={() => {dispatch(userPanelToggle()); history.push('/settings/')}} >Settings</li>
          <li><button className="user-panel__log-out" onClick={() => dispatch(logout())}>Log out</button></li>
        </ul>
      </div>
    </div>
  );
}

export default UserPanel;
