import React, { Component } from 'react';
import { getUser } from './Utils/Common.js';

class Header extends Component {
  render() {
    return <div>
      { getUser() ? <p><a href="/logout">Logout</a></p> : <p><a href="Login">Login</a></p> }
    </div>
  }
}

export default Header;
