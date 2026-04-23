import React from 'react';
import { Link } from 'react-router-dom';
import adimiaLogo from '../assets/adimialogo.png';

const defaultImgClass =
  'h-8 w-auto max-w-[140px] object-contain object-left sm:h-9 sm:max-w-[160px]';

const Logo = ({ className = '', imgClassName, onClick }) => {
  return (
    <Link to="/" className={`inline-block shrink-0 ${className}`} onClick={onClick}>
      <img
        src={adimiaLogo}
        alt="Adimia"
        className={imgClassName ?? defaultImgClass}
        draggable={false}
      />
    </Link>
  );
};

export default Logo;
