import React from 'react';

const Logo = ({color, className}) => {
  let svg = (color === 'light') ? 'logolight.svg' : 'logo.svg'
  let fallback = (color === 'light') ? 'logolight.png' : 'logo.png'
  return (
    <object type="image/svg+xml" data={svg} className={className}>
      <img src={fallback} alt="Notes" />
    </object>
  );
}

export default Logo;