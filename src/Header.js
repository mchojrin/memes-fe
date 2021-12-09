import React, { Component } from 'react';
import { getUser } from './Utils/Common.js';

function Header(props) {
  const currentUrl = window.location.pathname.toLowerCase();
  const logoutLink = <p><a href="/logout">Logout</a></p>;
  const loginLink = <a href="Login">Login</a>;
  const signupLink = <a href="Signup">Sign up</a>;

  return <div>
    {!(['/login', '/signup'].includes(currentUrl)) ? ( !getUser() ? <p>{loginLink} - {signupLink} </p> : '' ) : ''}
  </div>
}

export default Header;
