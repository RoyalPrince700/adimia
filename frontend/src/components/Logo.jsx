import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="inline-block shrink-0">
      <span className="select-none text-2xl font-extrabold tracking-tight text-slate-950">
        Adimia
      </span>
    </Link>
  );
};

export default Logo;
