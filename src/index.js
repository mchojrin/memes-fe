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
import MainMenu from './MainMenu';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Provider, useSelector } from 'react-redux';
import { createStore } from 'redux';

const userReducer = (state, action) => {
	switch (action.type) {
		case 'user/login':
			return {
				user: action.payload.user,
				token: action.payload.token
			}
		case 'user/logout':
			return {
				user: null,
				token: null
			}
		default:
			return {
				user: state ? state.user : null,
				token: state ? state.token : null
			}
	}
};

let store = createStore(userReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const routing = (
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<Navbar bg="light" expand="lg">
					<Container>
						<Navbar.Brand href="#home">Leeway Academy</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="me-auto">
								<Nav.Link href="/">Home</Nav.Link>
								<MainMenu />
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
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
	</Provider>
)

function RequireAuth({ children, redirectTo }) {
	const user = useSelector(state => state.user);

	return user ? children : <Navigate to={redirectTo} />;
}

ReactDOM.render(routing, document.getElementById('root'));