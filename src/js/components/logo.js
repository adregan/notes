import React from 'react';
import { staticPath } from '../../../config';

const Logo = ({color, className}) => {
  let svg = (color === 'light') ? 'logolight.svg' : 'logo.svg'
  let fallback = (color === 'light') ? 'logolight.png' : 'logo.png'
  return (
    <object type="image/svg+xml" data={staticPath + svg} className={className}>
      <img src={staticPath + fallback} alt="Notes" />
    </object>
  );
}

export default Logo;