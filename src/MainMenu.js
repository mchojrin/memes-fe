import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function MainMenu(props) {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({
            type: 'user/logout'
        });
        navigate('/');
    };

    const logedInMenu = (<NavDropdown title={user ? user.name : ''} id="basic-nav-dropdown">
        <NavDropdown.Item>
            <Link to="/Dashboard" className="nav-link">
                Dashboard
            </Link>
        </NavDropdown.Item>
        <NavDropdown.Item>
            <Link to="/Upload" className='nav-link'>
                Upload new Meme
            </Link>
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#" onClick={handleLogout}>Logout</NavDropdown.Item>
    </NavDropdown>);

    const publicMenu = (<Nav className='me-auto'>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/signup">Signup</Nav.Link>
    </Nav>);

    // return logedInMenu;
    return user ? logedInMenu : publicMenu;
}

export default MainMenu;