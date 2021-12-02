import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import App from './App';
import About from './About';
import Contact from './Contact';
import Login from './Login';
import Dashboard from './Dashboard';
import getUser from './Utils/Common';

const routing = (
  <BrowserRouter>
    <div>
	 <Routes>
        	<Route path="/" element={<App />} />
        	<Route path="/about" element={<About />} />
        	<Route path="/contact" element={<Contact />} />
		<Route path="/login" element={<Login />} />
		<Route path="/dashboard" element={
			<RequireAuth redirectTo="/login">
				<Dashboard />
			</RequireAuth>
		} />
      	  </Routes>
    </div>
  </BrowserRouter>
)

function RequireAuth({ children, redirectTo }) {
  let isAuthenticated = getUser();
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

ReactDOM.render(routing, document.getElementById('root'));
