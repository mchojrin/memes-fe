import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Upload from './Upload';
import { getUser, removeUserSession } from './Utils/Common';
import Header from './Header';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

const user = getUser();

// handle click event of logout button
const handleLogout = () => {
	console.log('Logging out');
	removeUserSession();
	window.location.href = "/";
}

const userMenu = <NavDropdown title={user ? user.name : ''} id="basic-nav-dropdown">
	<NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
	<NavDropdown.Item href="/upload">Upload new Meme</NavDropdown.Item>
	<NavDropdown.Divider />
	<NavDropdown.Item href="#" onClick={handleLogout}>Logout</NavDropdown.Item>
</NavDropdown>;

const publicMenu = <Nav className='me-auto'>
	<Nav.Link href="/login">Login</Nav.Link>
	<Nav.Link href="/signup">Signup</Nav.Link>
</Nav>

const routing = (
	<>
		<Navbar bg="light" expand="lg">
			<Container>
				<Navbar.Brand href="#home">Leeway Academy</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/">Home</Nav.Link>
						{getUser() ? userMenu : publicMenu}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
		<BrowserRouter>
			<div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/dashboard" element={
						<RequireAuth redirectTo="/login">
							<Dashboard />
						</RequireAuth>
					} />
					<Route path="/upload" element={
						<RequireAuth redirectTo="/login">
							<Upload />
						</RequireAuth>
					} />
				</Routes>
			</div>
		</BrowserRouter>
	</>
)

function RequireAuth({ children, redirectTo }) {
	return getUser() ? children : <Navigate to={redirectTo} />;
}

ReactDOM.render(routing, document.getElementById('root'));