// src/components/Header.js

import React from 'react';

const Header = ({ text, logoSrc, altText }) => {
  return (
    <div className="header">
      <img src={logoSrc} alt={altText} className="logo" />
      <h1 className="header-text">{text}</h1>
    </div>
  );
};

export default Header;
