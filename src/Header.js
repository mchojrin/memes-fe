import React, { Component } from 'react';
import { getUser } from './Utils/Common.js';

class Header extends Component {
  render() {
      return <div>
        { !(['/login', '/signup'].includes(window.location.pathname.toLowerCase())) ? (getUser() ? <p><a href="/logout">Logout</a></p> : <p><a href="Login">Login</a> - <a href="Signup">Sign up</a></p> ) : '' }
      </div>
  }
}

export default Header;
