import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import './NavBar.css';

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="navbar shadow-lg">
            <Container>
                <Navbar.Brand as={Link} to="/" className="navbar-brand fw-bold">
                    SpendWise
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={NavLink} to="/" className="nav-link px-3" activeClassName="active">
                            Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/expenses" className="nav-link px-3" activeClassName="active">
                            Expenses
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/add-expense" className="nav-link px-3" activeClassName="active">
                            Add Expense
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/categories" className="nav-link px-3" activeClassName="active">
                            Categories
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/admin" className="nav-link px-3" activeClassName="active">
                            Admin
                        </Nav.Link>
                        {!user ? (
                            <Nav.Link as={NavLink} to="/login" className="nav-link px-3" activeClassName="active">
                                Login
                            </Nav.Link>
                        ) : (
                            <Button variant="outline-warning" size="sm" className="logout-btn ms-3" onClick={logout}>
                                Logout
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;