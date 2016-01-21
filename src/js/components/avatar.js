import React from 'react';

const Avatar = ({userPhoto, onClick}) => {
  return (
    <button className="user" onClick={onClick}>
      Account
      {userPhoto && <img src={userPhoto} className="user__photo" />}
    </button>
  );
}

export default Avatar;