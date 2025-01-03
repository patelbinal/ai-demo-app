import React, { useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">
                Expense Tracker
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {user ? (
                        <>
                            <Navbar.Text className="mr-3">Welcome, {user.Name}</Navbar.Text>
                            <Button variant="outline-danger" onClick={logout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/login">
                                Login
                            </Nav.Link>
                            <Nav.Link as={Link} to="/register">
                                Register
                            </Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
