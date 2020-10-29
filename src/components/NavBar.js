import React from 'react';
import { NavLink } from 'react-router-dom';

/***
 * @function component  NavBar
***/
const NavBar = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink to="/mountains">Mountains</NavLink></li>
        <li><NavLink to="/rivers">Rivers</NavLink></li>
        <li><NavLink to="/clouds">Clouds</NavLink></li>
      </ul>
    </nav>
  );
}

export default NavBar;